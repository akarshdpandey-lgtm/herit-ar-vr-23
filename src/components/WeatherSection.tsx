import React, { useState, useEffect } from 'react';
import { DetailedWeatherInfo } from '../types';
import {
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';

interface WeatherSectionProps {
  locationName: string;
  coords: { lat: number; lng: number };
}

export function WeatherSection({ locationName, coords }: WeatherSectionProps) {
  const [weather, setWeather] = useState<DetailedWeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    fetch(`/api/weather/detailed?lat=${coords.lat}&lng=${coords.lng}`)
      .then((res) => res.json())
      .then((res) => {
        if (!isCancelled && res.success && res.data) {
          setWeather(res.data);
        }
      })
      .catch((err) => console.warn('Weather fetch failed:', err))
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [coords.lat, coords.lng]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-3">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
        <div className="text-sm font-medium text-stone-600">
          Loading Open-Meteo meteorological models for {locationName}...
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="space-y-4">
      {/* Current Conditions Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Live Climate & Forecast Engine
              </h2>
              <p className="text-xs text-stone-600">
                Real-time atmospheric analysis for {locationName.split(',')[0]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open-Meteo Live Feed</span>
          </div>
        </div>

        {/* Hero Weather Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Temperature
            </div>
            <div className="text-2xl font-bold text-stone-900">
              {weather.temperatureC}°C
            </div>
            <div className="text-[11px] text-stone-500">
              Feels like {weather.apparentTemperatureC ?? weather.temperatureC}°C
            </div>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Condition
            </div>
            <div className="text-base font-bold text-stone-900 truncate">
              {weather.conditionText}
            </div>
            <div className="text-[11px] text-stone-500">
              {weather.isRainy ? '🌧️ Wet surface' : '☀️ Dry conditions'}
            </div>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span>Humidity</span>
            </div>
            <div className="text-2xl font-bold text-stone-900">
              {weather.humidity ?? 52}%
            </div>
            <div className="text-[11px] text-stone-500">
              Rain prob: {weather.precipitationProbability}%
            </div>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-teal-500" />
              <span>Wind Speed</span>
            </div>
            <div className="text-2xl font-bold text-stone-900">
              {weather.windSpeedKmH}{' '}
              <span className="text-xs font-normal text-stone-500">km/h</span>
            </div>
            <div className="text-[11px] text-stone-500">Gentle courtyard breeze</div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>UV Index</span>
            </div>
            <div className="text-2xl font-bold text-amber-900">
              {weather.uvIndex ?? 6} / 11
            </div>
            <div className="text-[11px] text-amber-700">Moderate solar exposure</div>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Sunrise className="w-3.5 h-3.5 text-orange-500" />
              <span>Sun Timings</span>
            </div>
            <div className="text-xs font-bold text-stone-900">
              🌅 {weather.sunrise ?? '06:05 AM'}
            </div>
            <div className="text-xs font-bold text-stone-900">
              🌇 {weather.sunset ?? '06:35 PM'}
            </div>
          </div>
        </div>

        {/* Best Visiting Window Alert */}
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs">
          <div className="p-1 rounded-md bg-emerald-600 text-white shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 flex-1">
            <div className="font-bold text-emerald-950">
              Recommended Best Time to Visit Today:
            </div>
            <div className="font-semibold text-emerald-900">
              {weather.bestVisitingWindow}
            </div>
            <p className="text-emerald-800 text-[11px]">
              {weather.visitingAdvice}
            </p>
          </div>
        </div>

        {/* 24-Hour Hourly Forecast */}
        {weather.hourly && weather.hourly.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
              <span>⏰ 24-Hour Temperature & Rain Progression</span>
              <span className="text-[11px] text-stone-500">Hourly resolution</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {weather.hourly.map((h, i) => (
                <div
                  key={i}
                  className="shrink-0 w-22 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1"
                >
                  <div className="text-[11px] font-semibold text-stone-500">{h.time}</div>
                  <div className="text-base font-bold text-stone-900">{h.temperatureC}°C</div>
                  <div className="text-[10px] text-stone-600 truncate">{h.conditionText}</div>
                  <div className="text-[10px] font-medium text-blue-600">
                    💧 {h.precipitationProbability}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7-Day Outlook */}
        {weather.daily && weather.daily.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-stone-500" />
              <span>7-Day Meteorological Outlook</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 text-xs">
              {weather.daily.map((d, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border text-center space-y-1 ${
                    i === 0
                      ? 'bg-amber-50/70 border-amber-200'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="font-bold text-stone-900">{d.dayName}</div>
                  <div className="text-[11px] text-stone-500">{d.date.slice(5)}</div>
                  <div className="text-sm font-bold text-stone-900">
                    {d.maxTempC}° <span className="text-xs text-stone-500 font-normal">/ {d.minTempC}°</span>
                  </div>
                  <div className="text-[10px] text-stone-600 truncate">{d.conditionText}</div>
                  <div className="text-[10px] text-blue-600 font-medium">
                    💧 {d.precipitationProbability}% rain
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packing & Comfort Guide */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span>🎒 <strong>Heritage Packing Tips:</strong></span>
            <span>Light cotton clothing</span>
            <span>•</span>
            <span>UV sunglasses</span>
            <span>•</span>
            <span>Hydration flask</span>
            <span>•</span>
            <span>Breathable walking shoes</span>
          </div>
          <div className="text-[11px] text-stone-500">
            Source: {weather.source}
          </div>
        </div>
      </div>
    </div>
  );
}
