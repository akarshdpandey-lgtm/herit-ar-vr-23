import { GoogleGenAI } from '@google/genai';
import { GeneratedItinerary, ItinerarySlot, UserProfile, AttractionItem, WeatherInfo } from '../src/types.js';

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

export const itineraryService = {
  async generate(
    destinationName: string,
    profile: UserProfile,
    attractions: AttractionItem[],
    weather?: WeatherInfo,
    daysCount: number = 1
  ): Promise<GeneratedItinerary> {
    const ai = getGenAI();

    // 1. Try Gemini AI generation first if API key is available
    if (ai) {
      try {
        const prompt = `
You are the AI Heritage Tour Architect for HeritAR Travel Discovery.
Plan a personalized, realistic, high-fidelity day-by-day travel itinerary.

DESTINATION: ${destinationName}
TOTAL DAYS: ${daysCount}
USER PROFILE:
- Age group: ${profile.ageGroup}
- Interests: ${profile.interests.join(', ')}
- Expertise level: ${profile.expertiseLevel}
- Available time: ${profile.availableTime}
- Mobility needs: ${profile.mobilityNeed}
- Preferred transport: ${profile.preferredTransport}
- Budget tier: ${profile.budgetTier}
CURRENT WEATHER: ${weather?.conditionText || 'Clear'}, Temp: ${weather?.temperatureC || 25}°C, Rain probability: ${weather?.precipitationProbability || 10}%

AVAILABLE ATTRACTIONS TO SCHEDULE:
${attractions.map(a => `- ID: "${a.id}", Name: "${a.name}", Est Duration: ${a.taxonomy?.estimatedDurationMinutes || 90}m, Walking: ${a.taxonomy?.walkingDistanceMeters || 800}m, Accessibility: ${a.taxonomy?.accessibility || 'partially_accessible'}, Ticket: ${a.ticketPrice?.amount || 'Free'}`).join('\n')}

RULES:
1. Return ONLY valid JSON matching the requested structure. Do not wrap in markdown quotes if possible, or provide pure JSON.
2. Structure by dayNumber (1 to ${daysCount}).
3. For each slot:
   - dayNumber: integer
   - timeSlot: e.g. "09:00 - 11:30"
   - attractionId: exact ID from provided list or descriptive ID
   - attractionName: exact attraction name
   - visitDurationMinutes: integer
   - travelTimeMinutes: integer
   - transportMode: e.g. "Walking", "Auto-Rickshaw", "Cab", "Metro"
   - estimatedCost: { amount: number, currency: "INR" or destination currency, pricingType: "official" or "estimated" }
   - reasonForRecommendation: concise string tailored to user profile
   - accessibilityNotes: specific notes regarding steps, wheelchair ramps, elevators, or rest points
   - weatherSuitability: e.g. "Optimal in morning light" or "Safe from rain"
   - alternativeAttraction: { name: string, reason: string }
   - mealOrRestBreak: optional description of lunch/tea/rest break if mid-day
4. Never invent fake live data or claim unverified accessibility.

Return JSON in this schema:
{
  "destinationName": "${destinationName}",
  "totalDays": ${daysCount},
  "targetProfileSummary": "Tailored for ${profile.ageGroup} traveler interested in ${profile.interests.slice(0, 2).join(', ')}",
  "slots": [
    ...
  ]
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          }
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          if (parsed && Array.isArray(parsed.slots) && parsed.slots.length > 0) {
            return {
              id: `itin-ai-${Date.now()}`,
              destinationName,
              totalDays: daysCount,
              targetProfileSummary: parsed.targetProfileSummary || `Custom itinerary for ${profile.ageGroup} traveler`,
              slots: parsed.slots,
              generatedBy: 'gemini_ai',
              createdAt: new Date().toISOString(),
            };
          }
        }
      } catch (err) {
        console.warn('Gemini itinerary generation encountered error, invoking deterministic fallback engine:', err);
      }
    }

    // 2. Deterministic Template-Based Engine Fallback
    return this.generateDeterministic(destinationName, profile, attractions, weather, daysCount);
  },

  generateDeterministic(
    destinationName: string,
    profile: UserProfile,
    attractions: AttractionItem[],
    weather?: WeatherInfo,
    daysCount: number = 1
  ): GeneratedItinerary {
    const slots: ItinerarySlot[] = [];
    const items: AttractionItem[] = attractions.length > 0 ? attractions : [
      {
        id: 'attr-def-1',
        name: `${destinationName} Central Landmark`,
        category: 'Heritage Landmark',
        lat: 0,
        lng: 0,
        address: destinationName,
        shortDescription: 'Historical cultural landmark in the heart of the destination.',
        photos: [],
        directionUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationName)}`,
        ticketPrice: {
          amount: 50,
          currency: 'INR',
          pricingType: 'official',
          details: 'Standard admission'
        },
        taxonomy: {
          difficultyLevel: 'easy',
          estimatedDurationMinutes: 120,
          walkingDistanceMeters: 800,
          accessibility: 'verified_accessible',
          wheelchairSuitability: true,
          indoorOutdoor: 'mixed',
          childSuitability: true,
          educationalValue: 'high',
          photographyValue: 'high',
          budgetCategory: 'budget',
        },
        source: 'HeritAR Catalog',
        lastUpdated: new Date().toISOString()
      }
    ];

    let itemIndex = 0;
    const timeSlotsPerDay = [
      { slot: '09:00 - 11:30', period: 'Morning Highlight' },
      { slot: '12:00 - 14:00', period: 'Mid-day & Cultural Exploration', meal: 'Authentic local regional lunch & rest break' },
      { slot: '15:30 - 18:00', period: 'Afternoon & Sunset Viewpoint' },
    ];

    for (let day = 1; day <= daysCount; day++) {
      for (const timeInfo of timeSlotsPerDay) {
        const attraction = items[itemIndex % items.length];
        const nextAttraction = items[(itemIndex + 1) % items.length];
        itemIndex++;

        const isWheelchair = profile.mobilityNeed === 'wheelchair_friendly' || profile.mobilityNeed === 'step_free';
        const isSenior = profile.ageGroup === 'senior';
        const isChild = profile.ageGroup === 'child';

        let accessibilityNotes = 'Step-free path available with wide visitor corridors.';
        if (!attraction.taxonomy.wheelchairSuitability) {
          accessibilityNotes = 'Historic stone steps present; assistance may be required for step-free access.';
        }

        let reason = `Recommended because you enjoy ${profile.interests[0] || 'heritage exploration'}.`;
        if (isChild) reason = 'Engaging open heritage space with visual storytelling.';
        if (isSenior) reason = 'Relaxed pacing with comfortable seating and shaded pavilions.';

        slots.push({
          dayNumber: day,
          timeSlot: timeInfo.slot,
          attractionId: attraction.id,
          attractionName: attraction.name,
          visitDurationMinutes: attraction.taxonomy.estimatedDurationMinutes || 120,
          travelTimeMinutes: 20,
          transportMode: profile.preferredTransport === 'auto' ? 'Auto-Rickshaw' :
                         profile.preferredTransport === 'cab' ? 'Cab / Taxi' :
                         profile.preferredTransport === 'walking' ? 'Walking' : 'Auto / Cab',
          estimatedCost: {
            amount: attraction.ticketPrice?.amount || 50,
            currency: attraction.ticketPrice?.currency || 'INR',
            pricingType: attraction.ticketPrice?.pricingType || 'official',
          },
          reasonForRecommendation: reason,
          accessibilityNotes,
          weatherSuitability: weather?.isRainy ? 'Sheltered pavilions safe from rain' : 'Golden daylight suitable for photography',
          alternativeAttraction: {
            name: nextAttraction.name,
            reason: 'Sheltered indoor alternative with minimal walking in case of weather change or crowd.',
          },
          mealOrRestBreak: timeInfo.meal,
        });
      }
    }

    return {
      id: `itin-det-${Date.now()}`,
      destinationName,
      totalDays: daysCount,
      targetProfileSummary: `Deterministic itinerary matched to ${profile.ageGroup} profile (${profile.availableTime.replace('_', ' ')})`,
      slots,
      generatedBy: 'deterministic_engine',
      createdAt: new Date().toISOString(),
    };
  }
};
