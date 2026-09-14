export type AgeGroup = 'child' | 'teenager' | 'adult' | 'senior';

export type PersonaType =
  | 'child'
  | 'historian'
  | 'photographer'
  | 'japanese_tourist'
  | 'wheelchair_user'
  | 'budget_traveler';

export type MainTabType =
  | 'explore'
  | 'ar_vision'
  | 'virtual_tour'
  | 'ai_guide'
  | 'oral_archive'
  | 'distance_meter'
  | 'weather'
  | 'itinerary'
  | 'images'
  | 'personalization';

export interface ARDetectionBoundingBox {
  id: string;
  label: string;
  hindiLabel: string;
  confidence: number;
  topPercent: number;
  leftPercent: number;
  widthPercent: number;
  heightPercent: number;
  historicalContext: string;
  architecturalTerm: string;
  audioNarrationSnippet: string;
}

export interface VirtualTourHotspot {
  id: string;
  title: string;
  xPercent: number;
  yPercent: number;
  description: string;
  historicalEra: string;
  category: 'architecture' | 'engineering' | 'culture' | 'restoration' | 'history';
  audioClip?: string;
}

export interface VirtualTourScene {
  id: string;
  monumentName: string;
  location: string;
  panoramaImageUrl: string;
  audioGuideTitle: string;
  audioGuideText: string;
  hotspots: VirtualTourHotspot[];
  photogrammetryStats: {
    pointsCount: string;
    meshResolution: string;
    preservationScore: number;
    lastLidarScan: string;
  };
}

export interface CommunityOralRecord {
  id: string;
  monumentId: string;
  monumentName: string;
  contributorName: string;
  contributorRole: 'Elder Local' | 'Historian' | 'Master Craftsman' | 'Heritage Enthusiast';
  title: string;
  storyText: string;
  language: string;
  audioDurationSeconds: number;
  timestamp: string;
  hash: string;
  verifiedByASI: boolean;
  dynastyTag: string;
  era: string;
  tags: string[];
}

export interface FrameCategory {
  id: 'all' | 'sunset' | 'architecture' | 'details' | 'night' | 'surroundings';
  label: string;
  icon: string;
  description: string;
}

export interface NearbySpotItem {
  id: string;
  name: string;
  distanceKm: number;
  category: string;
  address: string;
  shortDescription: string;
  photoUrl: string;
  thumbnailUrl: string;
  photoCount: number;
  license: string;
  wikiUrl?: string;
}

export interface SpotGalleryData {
  spotName: string;
  displayName: string;
  activeFrame: string;
  frames: {
    all: PhotoItem[];
    sunset: PhotoItem[];
    architecture: PhotoItem[];
    details: PhotoItem[];
    night: PhotoItem[];
    surroundings: PhotoItem[];
  };
  nearbySpots: NearbySpotItem[];
}

export type ExpertiseLevel = 'beginner' | 'enthusiast' | 'expert';

export type AvailableTime = '1_hour' | '2_hours' | 'half_day' | 'full_day' | 'multiple_days';

export type MobilityNeed = 
  | 'none'
  | 'low_walking'
  | 'wheelchair_friendly'
  | 'step_free'
  | 'frequent_rest';

export type BudgetTier = 'budget' | 'moderate' | 'premium' | 'luxury';

export type TravelGroup = 'solo' | 'couple' | 'family' | 'friends';

export type TransportPreference = 'any' | 'walking' | 'auto' | 'cab' | 'public_transit';

export type PricingType = 'live' | 'official' | 'public' | 'estimated' | 'unavailable';

export interface UserProfile {
  id: string;
  ageGroup: AgeGroup;
  interests: string[];
  expertiseLevel: ExpertiseLevel;
  availableTime: AvailableTime;
  mobilityNeed: MobilityNeed;
  language: string;
  budgetTier: BudgetTier;
  travelGroup: TravelGroup;
  preferredTransport: TransportPreference;
  indoorOutdoorPref: 'all' | 'indoor' | 'outdoor';
  personalizationEnabled: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserInteraction {
  id: string;
  userId: string;
  eventType: 
    | 'search'
    | 'attraction_opened'
    | 'time_spent'
    | 'audio_completed'
    | 'attraction_liked'
    | 'attraction_saved'
    | 'attraction_skipped'
    | 'attraction_visited'
    | 'route_started'
    | 'route_completed'
    | 'itinerary_item_removed'
    | 'recommendation_accepted'
    | 'recommendation_rejected';
  contentId?: string;
  durationSeconds?: number;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface LocationItem {
  id: string;
  name: string;
  displayName: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  country: string;
  countryCode?: string;
  type: string;
  boundingBox?: [number, number, number, number];
  osmId?: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  author: string;
  license: string;
  licenseUrl?: string;
  source: string;
  sourceUrl?: string;
}

export interface AttractionItem {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  shortDescription: string;
  distanceKm?: number;
  photos: PhotoItem[];
  openingHours?: string;
  officialWebsite?: string;
  directionUrl: string;
  ticketPrice?: {
    amount: number;
    currency: string;
    pricingType: PricingType;
    details?: string;
  };
  taxonomy: {
    era?: string;
    historicalPeriod?: string;
    architecturalStyle?: string;
    culture?: string;
    religion?: string;
    difficultyLevel: 'easy' | 'moderate' | 'strenuous';
    estimatedDurationMinutes: number;
    walkingDistanceMeters: number;
    accessibility: 'verified_accessible' | 'partially_accessible' | 'not_verified' | 'inaccessible';
    wheelchairSuitability: boolean;
    indoorOutdoor: 'indoor' | 'outdoor' | 'mixed';
    childSuitability: boolean;
    educationalValue: 'low' | 'medium' | 'high';
    photographyValue: 'low' | 'medium' | 'high';
    budgetCategory: BudgetTier;
    bestVisitingTime?: string;
    weatherSuitability?: 'all_weather' | 'sunny_only' | 'indoor_safe';
    crowdLevel?: 'low' | 'moderate' | 'high' | 'unavailable';
  };
  score?: number;
  recommendationReason?: string;
  source: string;
  lastUpdated: string;
}

export interface RecommendationSections {
  bestForYou: AttractionItem[];
  withinTime: AttractionItem[];
  accessible: AttractionItem[];
  weatherFriendly: AttractionItem[];
  budgetHighlights: AttractionItem[];
}

export interface TransportOption {
  id?: string;
  name?: string;
  provider: string;
  vehicleType: string;
  mode: 'walking' | 'bicycle' | 'auto_rickshaw' | 'auto' | 'taxi_cab' | 'cab' | 'uber' | 'public_transit';
  estimatedDistanceKm: number;
  estimatedDurationMinutes: number;
  distanceKm?: number;
  durationMinutes?: number;
  minFare: number;
  maxFare: number;
  fareMin?: number;
  fareMax?: number;
  currency: string;
  fareType: PricingType;
  pricingType?: PricingType;
  suitability?: string;
  surgeIndicator?: string;
  bookingUrl?: string;
  dataSource: string;
  source?: string;
  tariffBreakdown?: {
    baseFare: number;
    perKmRate: number;
    nightSurchargeApplied: boolean;
    nightSurcharge?: string;
    waitingChargePerHour?: number;
    notes: string;
  };
  tariffRules?: {
    baseFare?: number;
    perKmRate?: number;
    nightSurcharge?: string;
    waitingChargePerHour?: number;
    notes?: string;
  };
  lastUpdated: string;
}

export interface HotelItem {
  id: string;
  name: string;
  location: string;
  lat?: number;
  lng?: number;
  distanceKm?: number;
  distanceFromCenterKm?: number;
  rating: number;
  reviewCount: number;
  roomType: string;
  pricePerNight: number;
  currency: string;
  pricePeriod: 'per_night' | 'total';
  taxesIncluded: boolean;
  taxesAndFees?: string;
  cancellationPolicy?: string;
  pricingType: PricingType;
  availabilityStatus: 'available' | 'few_left' | 'check_live' | 'sold_out';
  amenities: string[];
  refundable: boolean;
  officialBookingUrl: string;
  bookingUrl?: string;
  photoUrl: string;
  source: string;
  lastUpdated: string;
}

export interface HourlyWeather {
  time: string;
  temperatureC: number;
  precipitationProbability: number;
  weatherCode: number;
  conditionText: string;
}

export interface DailyWeather {
  date: string;
  dayName: string;
  maxTempC: number;
  minTempC: number;
  weatherCode: number;
  conditionText: string;
  precipitationProbability: number;
}

export interface WeatherInfo {
  temperatureC: number;
  weatherCode: number;
  conditionText: string;
  precipitationProbability: number;
  windSpeedKmH: number;
  isRainy: boolean;
  source: string;
  lastUpdated: string;
}

export interface DetailedWeatherInfo extends WeatherInfo {
  humidity?: number;
  apparentTemperatureC?: number;
  uvIndex?: number;
  sunrise?: string;
  sunset?: string;
  hourly?: HourlyWeather[];
  daily?: DailyWeather[];
  bestVisitingWindow?: string;
  visitingAdvice?: string;
}

export interface DistanceModeEstimate {
  durationMinutes: number;
  distanceKm: number;
  details?: string;
}

export interface DistanceCalculationResult {
  originName: string;
  destinationName: string;
  originCoords: { lat: number; lng: number };
  destCoords: { lat: number; lng: number };
  straightLineKm: number;
  roadDistanceKm: number;
  estimatedSteps: number;
  estimatedCaloriesBurned: number;
  carbonSavingsKg: number;
  modes: {
    walking: DistanceModeEstimate;
    cycling: DistanceModeEstimate;
    auto: DistanceModeEstimate & { estFareInr?: number };
    driving: DistanceModeEstimate;
    transit: DistanceModeEstimate;
  };
  routingProvider: string;
  roadGeometrySummary?: string;
}

export interface PersonaStoryChapter {
  title: string;
  character: string;
  text: string;
  audioDuration: string;
  visualPrompt: string;
}

export interface PersonaTreasureClue {
  id: string;
  title: string;
  riddle: string;
  locationHint: string;
  solution: string;
  points: number;
  found?: boolean;
}

export interface PersonaShowcaseData {
  persona: PersonaType;
  title: string;
  badgeLabel: string;
  tagline: string;
  highlights: string[];
  childFeatures?: {
    animatedStories: PersonaStoryChapter[];
    treasureHunt: PersonaTreasureClue[];
    simpleExplanations: { question: string; answer: string; funFact: string }[];
  };
  historianFeatures?: {
    primarySources: { title: string; period: string; sourceArchive: string; textSnippet: string; significance: string }[];
    archaeologicalDetails: { feature: string; measurement: string; composition: string; notes: string }[];
    researchPapers: { title: string; author: string; journal: string; year: number; doiOrCitation: string }[];
  };
  photographerFeatures?: {
    bestAngles: { angleName: string; bestTime: string; focalLength: string; compositionNote: string; coordsHint: string }[];
    lightingTimes: { goldenHourMorning: string; blueHourMorning: string; goldenHourEvening: string; blueHourEvening: string; harshSunAvoidance: string };
    compositionGuides: { title: string; tip: string; recommendedSettings: string }[];
  };
  japaneseFeatures?: {
    culturalConnections: { topic: string; connection: string; parallelsWithJapan: string }[];
    japaneseAudioGuide: { titleJa: string; textJa: string; romaji: string; translationEn: string; audioScript: string };
    culturalEtiquette: { etiquetteRule: string; context: string; recommendation: string }[];
  };
  wheelchairFeatures?: {
    accessibleRoutes: { pathName: string; surfaceType: string; slopeGradient: string; stepFree: boolean; note: string }[];
    groundFloorExhibits: { name: string; location: string; accessibilityRating: string; restSeatingNearby: boolean }[];
    rampAndFacilities: { facility: string; status: string; details: string }[];
  };
  budgetTimeFeatures?: {
    top3Highlights: { rank: number; name: string; visitTimeMinutes: number; whyMustSee: string; cost: string }[];
    fastestRouteCircuit: { stepNumber: number; action: string; durationMinutes: number; tip: string }[];
    budgetHacks: { tip: string; savings: string }[];
  };
}

export interface TripCostBreakdown {
  travellers: number;
  days: number;
  hotelNights: number;
  transportTotalMin: number;
  transportTotalMax: number;
  hotelTotalMin: number;
  hotelTotalMax: number;
  foodBudgetTotal: number;
  ticketsTotal: number;
  miscBudgetTotal: number;
  grandTotalMin: number;
  grandTotalMax: number;
  currency: string;
  convertedTotalMin?: number;
  convertedTotalMax?: number;
  targetCurrency?: string;
  exchangeRate?: number;
  exchangeRateTimestamp?: string;
  pricingStatus: PricingType;
}

export interface ItinerarySlot {
  dayNumber: number;
  timeSlot: string;
  attractionId: string;
  attractionName: string;
  visitDurationMinutes: number;
  travelTimeMinutes: number;
  transportMode: string;
  estimatedCost: {
    amount: number;
    currency: string;
    pricingType: PricingType;
  };
  reasonForRecommendation: string;
  accessibilityNotes: string;
  weatherSuitability: string;
  alternativeAttraction?: {
    name: string;
    reason: string;
  };
  mealOrRestBreak?: string;
}

export interface GeneratedItinerary {
  id: string;
  destinationName: string;
  totalDays: number;
  targetProfileSummary: string;
  slots: ItinerarySlot[];
  generatedBy: 'gemini_ai' | 'deterministic_engine';
  createdAt: string;
}
