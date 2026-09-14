import { AttractionItem, UserProfile, UserInteraction, WeatherInfo } from '../src/types.js';

export interface ScoringWeights {
  interestMatch: number;      // default 0.25
  expertiseMatch: number;     // default 0.15
  ageSuitability: number;     // default 0.15
  timeCompatibility: number;  // default 0.15
  accessibilityMatch: number; // default 0.15
  weatherSuitability: number; // default 0.10
  behaviorBonus: number;      // default 0.05
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  interestMatch: 0.25,
  expertiseMatch: 0.15,
  ageSuitability: 0.15,
  timeCompatibility: 0.15,
  accessibilityMatch: 0.15,
  weatherSuitability: 0.10,
  behaviorBonus: 0.05,
};

export interface ScoredAttraction {
  attraction: AttractionItem;
  score: number;
  reasons: string[];
  primaryReason: string;
}

export const recommendationEngine = {
  scoreAttractions(
    attractions: AttractionItem[],
    profile: UserProfile,
    interactions: UserInteraction[],
    weather?: WeatherInfo,
    weights: ScoringWeights = DEFAULT_WEIGHTS
  ): ScoredAttraction[] {
    // If personalization disabled, return natural proximity order
    if (!profile.personalizationEnabled) {
      return attractions.map(a => ({
        attraction: a,
        score: 50,
        reasons: ['Standard distance ranking (Personalization disabled)'],
        primaryReason: 'Standard distance ranking',
      }));
    }

    // Get rejected content IDs and reasons
    const rejectedEvents = interactions.filter(i => i.eventType === 'recommendation_rejected');
    const rejectedIds = new Set(rejectedEvents.map(i => i.contentId));

    // Get liked / saved IDs
    const likedOrSavedIds = new Set(
      interactions
        .filter(i => i.eventType === 'attraction_liked' || i.eventType === 'attraction_saved')
        .map(i => i.contentId)
    );

    const scored = attractions.map(attraction => {
      // If user specifically rejected this attraction, heavily penalize or skip
      if (rejectedIds.has(attraction.id)) {
        return {
          attraction,
          score: 5,
          reasons: ['Previously dismissed by you'],
          primaryReason: 'Previously dismissed',
        };
      }

      let subScores: Record<string, number> = {
        interest: 0,
        expertise: 0,
        age: 0,
        time: 0,
        accessibility: 0,
        weather: 0,
        behavior: 0,
      };

      const reasons: string[] = [];

      // 1. Interest Match
      const userInterests = profile.interests || [];
      const categoryLower = (attraction.category || '').toLowerCase();
      const styleLower = (attraction.taxonomy?.architecturalStyle || '').toLowerCase();
      const descLower = (attraction.shortDescription || '').toLowerCase();

      let matchedInterests: string[] = [];
      userInterests.forEach(interest => {
        const intLower = interest.toLowerCase();
        if (
          categoryLower.includes(intLower) ||
          styleLower.includes(intLower) ||
          descLower.includes(intLower) ||
          (intLower === 'history' && (attraction.taxonomy?.era || categoryLower.includes('historic') || categoryLower.includes('fort') || categoryLower.includes('palace') || categoryLower.includes('monument'))) ||
          (intLower === 'architecture' && attraction.taxonomy?.architecturalStyle) ||
          (intLower === 'photography' && attraction.taxonomy?.photographyValue === 'high') ||
          (intLower === 'spirituality' && (categoryLower.includes('temple') || categoryLower.includes('ghat') || categoryLower.includes('mosque') || categoryLower.includes('church'))) ||
          (intLower === 'nature' && (categoryLower.includes('garden') || categoryLower.includes('park') || categoryLower.includes('river')))
        ) {
          matchedInterests.push(interest);
        }
      });

      if (matchedInterests.length > 0) {
        subScores.interest = Math.min(100, 50 + (matchedInterests.length * 25));
        reasons.push(`Recommended because you selected ${matchedInterests.join(', ')}`);
      } else {
        subScores.interest = 40;
      }

      // 2. Expertise Match
      if (profile.expertiseLevel === 'expert') {
        if (attraction.taxonomy?.educationalValue === 'high' || attraction.taxonomy?.era) {
          subScores.expertise = 95;
          reasons.push('Features deep archaeological & historical context suited for experts');
        } else {
          subScores.expertise = 60;
        }
      } else if (profile.expertiseLevel === 'beginner') {
        if (attraction.taxonomy?.difficultyLevel === 'easy') {
          subScores.expertise = 95;
          reasons.push('Beginner-friendly guided layout and clear historical markers');
        } else {
          subScores.expertise = 70;
        }
      } else {
        subScores.expertise = 85;
      }

      // 3. Age Suitability
      if (profile.ageGroup === 'child') {
        if (attraction.taxonomy?.childSuitability) {
          subScores.age = 100;
          reasons.push('Child-friendly spaces with interactive visual discovery');
        } else {
          subScores.age = 30;
        }
      } else if (profile.ageGroup === 'senior') {
        if (attraction.taxonomy?.walkingDistanceMeters <= 1000 && attraction.taxonomy?.difficultyLevel !== 'strenuous') {
          subScores.age = 95;
          reasons.push('Senior-friendly comfortable walking path with ample resting points');
        } else {
          subScores.age = 45;
        }
      } else {
        subScores.age = 85;
      }

      // 4. Available Time Match
      const estMinutes = attraction.taxonomy?.estimatedDurationMinutes || 90;
      let timeLimitMinutes = 120;
      if (profile.availableTime === '1_hour') timeLimitMinutes = 60;
      if (profile.availableTime === '2_hours') timeLimitMinutes = 120;
      if (profile.availableTime === 'half_day') timeLimitMinutes = 240;
      if (profile.availableTime === 'full_day') timeLimitMinutes = 480;
      if (profile.availableTime === 'multiple_days') timeLimitMinutes = 1200;

      if (estMinutes <= timeLimitMinutes) {
        subScores.time = 95;
        reasons.push(`Optimal visit duration (${estMinutes} min) fits your ${profile.availableTime.replace('_', ' ')} schedule`);
      } else {
        subScores.time = 40;
      }

      // 5. Accessibility & Mobility Need
      if (profile.mobilityNeed === 'wheelchair_friendly' || profile.mobilityNeed === 'step_free') {
        if (attraction.taxonomy?.wheelchairSuitability || attraction.taxonomy?.accessibility === 'verified_accessible') {
          subScores.accessibility = 100;
          reasons.push('Wheelchair-friendly step-free ramp access verified');
        } else if (attraction.taxonomy?.accessibility === 'partially_accessible') {
          subScores.accessibility = 60;
          reasons.push('Partially accessible route (some assistance required)');
        } else {
          subScores.accessibility = 10;
        }
      } else if (profile.mobilityNeed === 'low_walking' || profile.mobilityNeed === 'frequent_rest') {
        if (attraction.taxonomy?.walkingDistanceMeters <= 800) {
          subScores.accessibility = 95;
          reasons.push('Short walking distance (<800m) with seating areas');
        } else {
          subScores.accessibility = 40;
        }
      } else {
        subScores.accessibility = 85;
      }

      // 6. Weather Suitability
      if (weather && weather.isRainy) {
        if (attraction.taxonomy?.indoorOutdoor === 'indoor' || attraction.taxonomy?.weatherSuitability === 'indoor_safe') {
          subScores.weather = 100;
          reasons.push('Sheltered indoor heritage safe from rain');
        } else {
          subScores.weather = 35;
        }
      } else {
        if (attraction.taxonomy?.photographyValue === 'high') {
          subScores.weather = 90;
          reasons.push('Excellent natural daylight conditions for photography');
        } else {
          subScores.weather = 80;
        }
      }

      // 7. Behavioral Tracking Bonus
      if (likedOrSavedIds.has(attraction.id)) {
        subScores.behavior = 100;
        reasons.push('Recommended because you saved or liked this item');
      } else {
        subScores.behavior = 50;
      }

      // Weighted combination
      const finalScore = Math.round(
        (subScores.interest * weights.interestMatch) +
        (subScores.expertise * weights.expertiseMatch) +
        (subScores.age * weights.ageSuitability) +
        (subScores.time * weights.timeCompatibility) +
        (subScores.accessibility * weights.accessibilityMatch) +
        (subScores.weather * weights.weatherSuitability) +
        (subScores.behavior * weights.behaviorBonus)
      );

      const primaryReason = reasons[0] || 'Matches your travel preference profile';

      return {
        attraction: {
          ...attraction,
          score: finalScore,
          recommendationReason: primaryReason,
        },
        score: finalScore,
        reasons,
        primaryReason,
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);
    return scored;
  },

  categorizeSections(scored: ScoredAttraction[], profile: UserProfile, weather?: WeatherInfo) {
    const all = scored.map(s => s.attraction);

    // 1. Best for you: top overall recommendation score match
    const bestForYou = [...all].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 8);

    // 2. Best within available time: sorted strictly by fastest visiting duration (shortest time first)
    const withinTime = [...all]
      .sort((a, b) => (a.taxonomy?.estimatedDurationMinutes || 60) - (b.taxonomy?.estimatedDurationMinutes || 60))
      .slice(0, 8);

    // 3. Nearby and accessible: sorted by closest distance, prioritizing verified wheelchair & step-free access
    const accessible = [...all]
      .filter(a => a.taxonomy?.wheelchairSuitability || a.taxonomy?.accessibility === 'verified_accessible' || (a.taxonomy?.walkingDistanceMeters || 1000) <= 800)
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0))
      .slice(0, 8);

    // 4. Weather-friendly places today: high photography score, sheltered pavilions or shaded gardens
    const weatherFriendly = [...all]
      .filter(a => {
        if (weather?.isRainy) return a.taxonomy?.indoorOutdoor === 'indoor' || a.taxonomy?.weatherSuitability === 'indoor_safe';
        return a.taxonomy?.photographyValue === 'high' || a.taxonomy?.indoorOutdoor === 'outdoor';
      })
      .sort((a, b) => {
        const scoreA = (a.taxonomy?.photographyValue === 'high' ? 2 : 1) + (a.taxonomy?.indoorOutdoor === 'mixed' ? 1 : 0);
        const scoreB = (b.taxonomy?.photographyValue === 'high' ? 2 : 1) + (b.taxonomy?.indoorOutdoor === 'mixed' ? 1 : 0);
        return scoreB - scoreA;
      })
      .slice(0, 8);

    // 5. Must-see highlights for budget: lowest ticket price first (Free ₹0 sights first, then lowest official tariffs)
    const budgetHighlights = [...all]
      .sort((a, b) => (a.ticketPrice?.amount ?? 0) - (b.ticketPrice?.amount ?? 0))
      .slice(0, 8);

    return {
      bestForYou,
      withinTime: withinTime.length > 0 ? withinTime : bestForYou,
      accessible: accessible.length > 0 ? accessible : bestForYou,
      weatherFriendly: weatherFriendly.length > 0 ? weatherFriendly : bestForYou,
      budgetHighlights: budgetHighlights.length > 0 ? budgetHighlights : bestForYou,
    };
  }
};
