import { WeatherInfo, DetailedWeatherInfo, HourlyWeather, DailyWeather } from '../src/types.js';

interface WeatherCacheEntry {
  data: DetailedWeatherInfo;
  timestamp: number;
}

const weatherCache = new Map<string, WeatherCacheEntry>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

function getWeatherConditionText(code: number): { text: string; isRainy: boolean } {
  // WMO Weather interpretation codes (WW)
  if (code === 0) return { text: 'Clear sky', isRainy: false };
  if (code === 1) return { text: 'Mainly clear', isRainy: false };
  if (code === 2) return { text: 'Partly cloudy', isRainy: false };
  if (code === 3) return { text: 'Overcast', isRainy: false };
  if (code === 45 || code === 48) return { text: 'Foggy / Hazy', isRainy: false };
  if (code >= 51 && code <= 55) return { text: 'Light drizzle', isRainy: true };
  if (code >= 61 && code <= 65) return { text: 'Rain', isRainy: true };
  if (code >= 71 && code <= 77) return { text: 'Snow', isRainy: true };
  if (code >= 80 && code <= 82) return { text: 'Rain showers', isRainy: true };
  if (code >= 95) return { text: 'Thunderstorm', isRainy: true };
  return { text: 'Pleasant weather', isRainy: false };
}

export const weatherService = {
  async getWeather(lat: number, lng: number): Promise<WeatherInfo> {
    const detailed = await this.getDetailedWeather(lat, lng);
    return {
      temperatureC: detailed.temperatureC,
      weatherCode: detailed.weatherCode,
      conditionText: detailed.conditionText,
      precipitationProbability: detailed.precipitationProbability,
      windSpeedKmH: detailed.windSpeedKmH,
      isRainy: detailed.isRainy,
      source: detailed.source,
      lastUpdated: detailed.lastUpdated,
    };
  },

  async getDetailedWeather(lat: number, lng: number): Promise<DetailedWeatherInfo> {
    const cacheKey = `${lat.toFixed(2)},${lng.toFixed(2)}`;
    const cached = weatherCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      return cached.data;
    }

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset&timezone=auto`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        const json = await res.json();
        const current = json.current || {};
        const weatherCode = current.weather_code ?? 0;
        const condition = getWeatherConditionText(weatherCode);

        // Hourly: next 24 entries
        const hourlyData: HourlyWeather[] = [];
        if (json.hourly?.time && Array.isArray(json.hourly.time)) {
          const currentHourStr = new Date().toISOString().slice(0, 13);
          let startIndex = json.hourly.time.findIndex((t: string) => t.startsWith(currentHourStr));
          if (startIndex < 0) startIndex = 0;

          for (let i = startIndex; i < Math.min(startIndex + 24, json.hourly.time.length); i++) {
            const timeRaw = json.hourly.time[i];
            const dateObj = new Date(timeRaw);
            const hourFormatted = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            const hCode = json.hourly.weather_code?.[i] ?? 0;
            hourlyData.push({
              time: hourFormatted,
              temperatureC: Math.round(json.hourly.temperature_2m?.[i] ?? 24),
              precipitationProbability: Math.round(json.hourly.precipitation_probability?.[i] ?? 0),
              weatherCode: hCode,
              conditionText: getWeatherConditionText(hCode).text,
            });
          }
        }

        // Daily: next 7 days
        const dailyData: DailyWeather[] = [];
        if (json.daily?.time && Array.isArray(json.daily.time)) {
          for (let i = 0; i < Math.min(7, json.daily.time.length); i++) {
            const dateStr = json.daily.time[i];
            const dObj = new Date(dateStr);
            const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dObj.toLocaleDateString([], { weekday: 'short' });
            const dCode = json.daily.weather_code?.[i] ?? 0;
            dailyData.push({
              date: dateStr,
              dayName,
              maxTempC: Math.round(json.daily.temperature_2m_max?.[i] ?? 28),
              minTempC: Math.round(json.daily.temperature_2m_min?.[i] ?? 18),
              weatherCode: dCode,
              conditionText: getWeatherConditionText(dCode).text,
              precipitationProbability: Math.round(json.daily.precipitation_probability_max?.[i] ?? 10),
            });
          }
        }

        const sunriseStr = json.daily?.sunrise?.[0] ? new Date(json.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : '05:45 AM';
        const sunsetStr = json.daily?.sunset?.[0] ? new Date(json.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : '06:35 PM';
        const uvMax = json.daily?.uv_index_max?.[0] ? Math.round(json.daily.uv_index_max[0]) : 6;
        const tempNow = Math.round(current.temperature_2m ?? 24);

        let bestVisitingWindow = '06:30 AM - 09:30 AM (Cool morning light & low crowd)';
        let visitingAdvice = 'Pleasant weather for exploring outdoor monuments. Carry drinking water and light sunglasses.';

        if (tempNow > 32) {
          bestVisitingWindow = 'Early morning (06:00 - 08:30) or late dusk (17:00 - 18:30)';
          visitingAdvice = 'High temperature expected. Avoid midday direct sun on open stone courtyards. Wear breathable cotton and carry hydration.';
        } else if (condition.isRainy) {
          bestVisitingWindow = 'Check afternoon rain break or visit covered galleries';
          visitingAdvice = 'Precipitation detected. Keep compact umbrella handy. Stone paths can be slippery; wear footwear with reliable traction.';
        }

        const info: DetailedWeatherInfo = {
          temperatureC: tempNow,
          apparentTemperatureC: Math.round(current.apparent_temperature ?? tempNow),
          humidity: Math.round(current.relative_humidity_2m ?? 55),
          weatherCode: weatherCode,
          conditionText: condition.text,
          precipitationProbability: current.precipitation_probability ?? 10,
          windSpeedKmH: Math.round(current.wind_speed_10m ?? 8),
          isRainy: condition.isRainy,
          uvIndex: uvMax,
          sunrise: sunriseStr,
          sunset: sunsetStr,
          hourly: hourlyData,
          daily: dailyData,
          bestVisitingWindow,
          visitingAdvice,
          source: 'Open-Meteo Live API',
          lastUpdated: new Date().toISOString(),
        };

        weatherCache.set(cacheKey, { data: info, timestamp: Date.now() });
        return info;
      }
    } catch (e) {
      console.warn('Detailed weather API failed or timed out, returning fallback:', e);
    }

    // Default fallback
    const fallback: DetailedWeatherInfo = {
      temperatureC: 25,
      apparentTemperatureC: 26,
      humidity: 50,
      weatherCode: 1,
      conditionText: 'Mainly clear',
      precipitationProbability: 10,
      windSpeedKmH: 10,
      isRainy: false,
      uvIndex: 5,
      sunrise: '06:00 AM',
      sunset: '06:30 PM',
      bestVisitingWindow: '07:00 AM - 10:00 AM',
      visitingAdvice: 'Pleasant temperature. Suitable for walking tours and outdoor monument viewing.',
      hourly: [
        { time: '08:00 AM', temperatureC: 22, precipitationProbability: 5, weatherCode: 1, conditionText: 'Clear' },
        { time: '11:00 AM', temperatureC: 27, precipitationProbability: 10, weatherCode: 1, conditionText: 'Sunny' },
        { time: '02:00 PM', temperatureC: 30, precipitationProbability: 15, weatherCode: 2, conditionText: 'Partly cloudy' },
        { time: '05:00 PM', temperatureC: 26, precipitationProbability: 10, weatherCode: 1, conditionText: 'Clear sky' },
        { time: '08:00 PM', temperatureC: 23, precipitationProbability: 5, weatherCode: 0, conditionText: 'Clear' },
      ],
      daily: [
        { date: new Date().toISOString().split('T')[0], dayName: 'Today', maxTempC: 30, minTempC: 19, weatherCode: 1, conditionText: 'Mainly clear', precipitationProbability: 10 },
        { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], dayName: 'Tomorrow', maxTempC: 31, minTempC: 20, weatherCode: 2, conditionText: 'Partly cloudy', precipitationProbability: 15 },
        { date: new Date(Date.now() + 172800000).toISOString().split('T')[0], dayName: 'Day 3', maxTempC: 29, minTempC: 18, weatherCode: 1, conditionText: 'Sunny', precipitationProbability: 5 },
      ],
      source: 'Open-Meteo Fallback Model',
      lastUpdated: new Date().toISOString(),
    };
    return fallback;
  }
};

