import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { DataStore } from './server/dataStore.js';
import { locationService } from './server/locationService.js';
import { photoService } from './server/photoService.js';
import { attractionService } from './server/attractionService.js';
import { transportService } from './server/transportService.js';
import { hotelSearchService } from './server/hotelSearchService.js';
import { weatherService } from './server/weatherService.js';
import { currencyService } from './server/currencyService.js';
import { tripCostService } from './server/tripCostService.js';
import { recommendationEngine } from './server/recommendationEngine.js';
import { itineraryService } from './server/itineraryService.js';
import { distanceService } from './server/distanceService.js';
import { aiGuideService } from './server/aiGuideService.js';
import { PersonaType } from './src/types.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// IN-MEMORY IMAGE PROXY CACHE FOR FAST, ZERO-ERROR HERITAGE MEDIA DELIVERY
const imageProxyCache = new Map<string, { buffer: Buffer; contentType: string }>();

app.get('/api/image-proxy', async (req: Request, res: Response) => {
  try {
    const rawUrl = req.query.url as string;
    if (!rawUrl) {
      return res.status(400).send('Missing url parameter');
    }

    // Check cache
    const cached = imageProxyCache.get(rawUrl);
    if (cached) {
      res.setHeader('Content-Type', cached.contentType);
      res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
      return res.send(cached.buffer);
    }

    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return res.status(400).send('Invalid protocol');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    const fetchRes = await fetch(rawUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'HeritageExplorerApp/1.0 (https://heritagetour.org; admin@heritagetour.org)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    clearTimeout(timeout);

    if (!fetchRes.ok) {
      return res.redirect(rawUrl);
    }

    const contentType = fetchRes.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await fetchRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (imageProxyCache.size > 200) {
      const oldestKey = imageProxyCache.keys().next().value;
      if (oldestKey) imageProxyCache.delete(oldestKey);
    }
    imageProxyCache.set(rawUrl, { buffer, contentType });

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    return res.send(buffer);
  } catch (err: any) {
    const rawUrl = req.query.url as string;
    if (rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'))) {
      return res.redirect(rawUrl);
    }
    res.status(500).send('Image proxy error');
  }
});

// 1. LOCATION SEARCH & REVERSE GEOCODING
app.get('/api/locations/search', async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string) || '';
    const results = await locationService.search(q);
    res.json({ success: true, count: results.length, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/locations/reverse', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, message: 'Invalid coordinates' });
    }
    const result = await locationService.reverseGeocode(lat, lng);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/locations/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const curated = locationService.getCurated().find(c => c.id === id);
    if (curated) {
      return res.json({ success: true, data: curated });
    }
    res.json({ success: true, data: { id, name: id, displayName: id } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/locations/:id/photos', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const name = (req.query.name as string) || id;
    const photos = await photoService.getPhotosForPlace(name);
    res.json({ success: true, count: photos.length, data: photos });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// SPOT MULTI-FRAME GALLERY & SURROUNDING WIKIPEDIA IMAGES
app.get('/api/photos/spot-gallery', async (req: Request, res: Response) => {
  try {
    const query = (req.query.query as string) || 'Taj Mahal';
    const lat = parseFloat(req.query.lat as string) || 27.1751;
    const lng = parseFloat(req.query.lng as string) || 78.0421;
    const radius = parseFloat(req.query.radius as string) || 50;

    const spotGallery = await photoService.getSpotMultiFrameGallery(query, lat, lng);
    const nearbyAttractions = await attractionService.getAttractionsNear(lat, lng, radius);

    const queryLower = query.toLowerCase();
    const nearbySpots = nearbyAttractions
      .filter((att) => !att.name.toLowerCase().includes(queryLower) && !queryLower.includes(att.name.toLowerCase()))
      .slice(0, 12)
      .map((att) => ({
        id: att.id,
        name: att.name,
        distanceKm: att.distanceKm || 1.5,
        category: att.category,
        address: att.address,
        shortDescription: att.shortDescription,
        photoUrl: att.photos[0]?.url || 'https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=800&q=80',
        thumbnailUrl: att.photos[0]?.thumbnailUrl || att.photos[0]?.url || '',
        photoCount: att.photos.length,
        license: att.photos[0]?.license || 'CC BY-SA 4.0',
        wikiUrl: att.officialWebsite || `https://en.wikipedia.org/wiki/${encodeURIComponent(att.name)}`,
      }));

    res.json({
      success: true,
      data: {
        ...spotGallery,
        nearbySpots,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/locations/:id/attractions', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    const radius = parseFloat(req.query.radius as string) || 45;

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, message: 'lat and lng query parameters required' });
    }

    const attractions = await attractionService.getAttractionsNear(lat, lng, radius);
    res.json({ success: true, count: attractions.length, data: attractions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. WEATHER
app.get('/api/weather', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, message: 'lat and lng required' });
    }
    const weather = await weatherService.getWeather(lat, lng);
    res.json({ success: true, data: weather });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/weather/detailed', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ success: false, message: 'lat and lng required' });
    }
    const weather = await weatherService.getDetailedWeather(lat, lng);
    res.json({ success: true, data: weather });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. TRANSPORT & ROUTE ESTIMATE
app.post('/api/transport/estimate', (req: Request, res: Response) => {
  try {
    const { startLat, startLng, destLat, destLng, countryCode, cityName } = req.body;
    if (startLat === undefined || destLat === undefined) {
      return res.status(400).json({ success: false, message: 'Start and destination coordinates are required' });
    }

    const options = transportService.calculateEstimates(
      Number(startLat),
      Number(startLng),
      Number(destLat),
      Number(destLng),
      countryCode || 'in',
      cityName || ''
    );

    res.json({
      success: true,
      count: options.length,
      data: options,
      meta: {
        lastUpdated: new Date().toISOString(),
        pricingDisclaimer: 'Official tariff rules applied where available; Uber and ride fares are transparent estimates subject to live traffic.',
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/routes/estimate', (req: Request, res: Response) => {
  // Alias to transport estimate
  try {
    const { startLat, startLng, destLat, destLng, countryCode, cityName } = req.body;
    const options = transportService.calculateEstimates(
      Number(startLat),
      Number(startLng),
      Number(destLat),
      Number(destLng),
      countryCode || 'in',
      cityName || ''
    );
    res.json({ success: true, data: options });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. HOTELS SEARCH
app.get('/api/hotels/search', (req: Request, res: Response) => {
  try {
    const dest = (req.query.destination as string) || 'Agra';
    const lat = parseFloat(req.query.lat as string) || 27.1751;
    const lng = parseFloat(req.query.lng as string) || 78.0421;
    const checkIn = req.query.checkIn as string;
    const checkOut = req.query.checkOut as string;
    const guests = req.query.guests ? parseInt(req.query.guests as string) : 2;
    const rooms = req.query.rooms ? parseInt(req.query.rooms as string) : 1;
    const minRating = req.query.minRating ? parseFloat(req.query.minRating as string) : undefined;
    const maxBudget = req.query.maxBudget ? parseFloat(req.query.maxBudget as string) : undefined;
    const refundableOnly = req.query.refundable === 'true';

    const hotels = hotelSearchService.searchHotels(dest, lat, lng, {
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      rooms,
      minRating,
      maxBudget,
      refundableOnly,
    });

    res.json({
      success: true,
      count: hotels.length,
      data: hotels,
      meta: {
        note: 'Listed prices are publicly indexed benchmark rates. Direct booking links provided for real-time checkout verification.'
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. TRIP COST CALCULATOR
app.post('/api/trips/calculate-cost', (req: Request, res: Response) => {
  try {
    const breakdown = tripCostService.calculate(req.body);
    res.json({ success: true, data: breakdown });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. CURRENCY EXCHANGE
app.get('/api/currency/rates', (req: Request, res: Response) => {
  try {
    const rates = currencyService.getRates();
    res.json({ success: true, base: 'INR', rates, timestamp: new Date().toISOString() });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. USER PROFILE & ONBOARDING
app.get('/api/profile', (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'default-traveler';
    let profile = DataStore.getProfile(userId);
    if (!profile) {
      profile = DataStore.createDefaultProfile(userId);
    }
    res.json({ success: true, data: profile });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/profile/onboarding', (req: Request, res: Response) => {
  try {
    const { userId, ...profileData } = req.body;
    const id = userId || 'default-traveler';
    const updated = DataStore.saveProfile({
      id,
      ...profileData,
      onboardingCompleted: true,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch('/api/profile', (req: Request, res: Response) => {
  try {
    const { userId, ...changes } = req.body;
    const id = userId || 'default-traveler';
    const existing = DataStore.getProfile(id) || DataStore.createDefaultProfile(id);
    const merged = { ...existing, ...changes, updatedAt: new Date().toISOString() };
    const saved = DataStore.saveProfile(merged);
    res.json({ success: true, data: saved });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 8. BEHAVIORAL EVENTS TRACKING
app.post('/api/behavior/events', (req: Request, res: Response) => {
  try {
    const { userId, eventType, contentId, durationSeconds, metadata } = req.body;
    const interaction = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      userId: userId || 'default-traveler',
      eventType,
      contentId,
      durationSeconds: durationSeconds || 0,
      metadata,
      timestamp: new Date().toISOString(),
    };
    DataStore.addInteraction(interaction);
    res.json({ success: true, data: interaction });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 9. RECOMMENDATIONS
app.post('/api/recommendations', async (req: Request, res: Response) => {
  try {
    const { userId, attractions, lat, lng } = req.body;
    const id = userId || 'default-traveler';
    const profile = DataStore.getProfile(id) || DataStore.createDefaultProfile(id);
    const interactions = DataStore.getUserInteractions(id);

    let weather;
    if (lat && lng) {
      weather = await weatherService.getWeather(lat, lng);
    }

    const scored = recommendationEngine.scoreAttractions(
      attractions || [],
      profile,
      interactions,
      weather
    );

    const sections = recommendationEngine.categorizeSections(scored, profile, weather);

    res.json({
      success: true,
      data: {
        scored,
        sections,
        profileSummary: {
          ageGroup: profile.ageGroup,
          interests: profile.interests,
          expertiseLevel: profile.expertiseLevel,
          availableTime: profile.availableTime,
          mobilityNeed: profile.mobilityNeed,
        },
        weather,
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/recommendations/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const profile = DataStore.getProfile(userId) || DataStore.createDefaultProfile(userId);
    res.json({ success: true, data: { profile } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 10. ITINERARY GENERATION & REGENERATION
app.post('/api/itinerary/generate', async (req: Request, res: Response) => {
  try {
    const { destinationName, userId, attractions, days, lat, lng } = req.body;
    const id = userId || 'default-traveler';
    const profile = DataStore.getProfile(id) || DataStore.createDefaultProfile(id);

    let weather;
    if (lat && lng) {
      weather = await weatherService.getWeather(lat, lng);
    }

    const itinerary = await itineraryService.generate(
      destinationName || 'Heritage Destination',
      profile,
      attractions || [],
      weather,
      days || 1
    );

    res.json({ success: true, data: itinerary });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/itinerary/regenerate', async (req: Request, res: Response) => {
  try {
    const { destinationName, userId, attractions, days, lat, lng } = req.body;
    const id = userId || 'default-traveler';
    const profile = DataStore.getProfile(id) || DataStore.createDefaultProfile(id);

    let weather;
    if (lat && lng) {
      weather = await weatherService.getWeather(lat, lng);
    }

    const itinerary = await itineraryService.generate(
      destinationName || 'Heritage Destination',
      profile,
      attractions || [],
      weather,
      days || 1
    );

    res.json({ success: true, data: itinerary });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/itinerary/feedback', (req: Request, res: Response) => {
  try {
    const { userId, itineraryId, feedbackType, comment } = req.body;
    DataStore.addInteraction({
      id: `fb-${Date.now()}`,
      userId: userId || 'default-traveler',
      eventType: feedbackType === 'like' ? 'recommendation_accepted' : 'recommendation_rejected',
      metadata: { itineraryId, comment },
      timestamp: new Date().toISOString(),
    });
    res.json({ success: true, message: 'Feedback recorded successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 11. CONTENT TAXONOMY & ACCESSIBILITY DETAILS
app.get('/api/content/:id/taxonomy', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attraction = attractionService.getCuratedById(id);
    if (attraction) {
      return res.json({ success: true, data: attraction.taxonomy });
    }
    res.json({ success: true, data: null });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/content/:id/accessibility', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const attraction = attractionService.getCuratedById(id);
    if (attraction) {
      return res.json({
        success: true,
        data: {
          accessibility: attraction.taxonomy.accessibility,
          wheelchairSuitability: attraction.taxonomy.wheelchairSuitability,
          walkingDistanceMeters: attraction.taxonomy.walkingDistanceMeters,
          difficultyLevel: attraction.taxonomy.difficultyLevel,
        }
      });
    }
    res.json({ success: true, data: null });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 12. DETAILED WEATHER FORECAST (OPEN-METEO)
app.get('/api/weather/detailed', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string) || 27.1751;
    const lng = parseFloat(req.query.lng as string) || 78.0421;
    const weather = await weatherService.getDetailedWeather(lat, lng);
    res.json({ success: true, data: weather });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 13. DISTANCE METER & OSRM ROAD ROUTING
app.post('/api/distance/calculate', async (req: Request, res: Response) => {
  try {
    const { originName, originLat, originLng, destinationName, destLat, destLng } = req.body;
    const result = await distanceService.calculateDistanceMeter(
      originName || 'Starting Location',
      parseFloat(originLat) || 28.6431,
      parseFloat(originLng) || 77.2197,
      destinationName || 'Destination',
      parseFloat(destLat) || 27.1751,
      parseFloat(destLng) || 78.0421
    );
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 14. AI GUIDE & PERSONALIZATION SHOWCASE (GROQ AI / GEMINI)
app.get('/api/guide/showcase', (req: Request, res: Response) => {
  try {
    const destination = (req.query.destination as string) || 'Taj Mahal, Agra';
    const persona = (req.query.persona as PersonaType) || 'child';
    const showcase = aiGuideService.getPersonaShowcase(destination, persona);
    res.json({ success: true, data: showcase });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/guide/ask', async (req: Request, res: Response) => {
  try {
    const { destinationName, question, persona, language } = req.body;
    const answer = await aiGuideService.answerQuestion(
      destinationName || 'Heritage Site',
      question || 'Tell me about this monument',
      persona || 'child',
      language || 'en'
    );
    res.json({ success: true, data: answer });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 15. PROVIDERS STATUS
app.get('/api/providers/status', (req: Request, res: Response) => {
  res.json({
    success: true,
    providers: [
      { name: 'OpenStreetMap', status: 'operational', type: 'geocoding & map tiles', license: 'ODbL / CC-BY-SA' },
      { name: 'OSRM (Open Source Routing Machine)', status: 'operational', type: 'road distance & routing network', license: 'Simplified BSD' },
      { name: 'Open-Meteo', status: 'operational', type: 'live weather & 7-day forecast', license: 'CC BY 4.0' },
      { name: 'Groq AI / Gemini AI', status: process.env.GEMINI_API_KEY ? 'operational' : 'fallback_engine_active', type: 'heritage intelligence & personalized storytelling' },
      { name: 'Wikimedia Commons', status: 'operational', type: 'verified photography & cultural media', license: 'Creative Commons CC-BY-SA' },
    ],
    timestamp: new Date().toISOString(),
  });
});

// Vite middleware & Static Serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HeritAR Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
