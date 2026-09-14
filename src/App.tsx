import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { SearchHeader } from './components/SearchHeader';
import { LeafletMap } from './components/LeafletMap';
import { PhotoGallery } from './components/PhotoGallery';
import { RecommendationsSection } from './components/RecommendationsSection';
import { TransportComparison } from './components/TransportComparison';
import { HotelSection } from './components/HotelSection';
import { TripCostWidget } from './components/TripCostWidget';
import { OnboardingModal } from './components/OnboardingModal';
import { ItineraryGeneratorModal } from './components/ItineraryGeneratorModal';
import { ProviderStatusModal } from './components/ProviderStatusModal';
import { ProviderBadgeBar } from './components/ProviderBadgeBar';
import { PersonaSwitcher } from './components/PersonaSwitcher';
import { PersonaShowcase } from './components/PersonaShowcase';
import { NavigationTabs } from './components/NavigationTabs';
import { DistanceMeterSection } from './components/DistanceMeterSection';
import { WeatherSection } from './components/WeatherSection';
import { AIGuideSection } from './components/AIGuideSection';
import { ARVisionSection } from './components/ARVisionSection';
import { VirtualTourSection } from './components/VirtualTourSection';
import { OralArchiveSection } from './components/OralArchiveSection';
import { ImagesSection } from './components/ImagesSection';
import { ItinerarySection } from './components/ItinerarySection';
import { PersonalizationSection } from './components/PersonalizationSection';
import { SupportedLanguage } from './utils/translations';
import {
  LocationItem,
  AttractionItem,
  PhotoItem,
  WeatherInfo,
  TransportOption,
  HotelItem,
  UserProfile,
  RecommendationSections,
  GeneratedItinerary,
  PersonaType,
  MainTabType,
} from './types';
import { Loader2, Sparkles, MapPin, Compass, ShieldCheck } from 'lucide-react';

const DEFAULT_ORIGIN: LocationItem = {
  id: 'delhi-origin-1',
  name: 'New Delhi Railway Station',
  displayName: 'Paharganj, New Delhi, Delhi 110055, India',
  lat: 28.6431,
  lng: 77.2197,
  type: 'station',
  country: 'India',
  countryCode: 'in',
};

const DEFAULT_DESTINATION: LocationItem = {
  id: 'taj-mahal-agra',
  name: 'Taj Mahal',
  displayName: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
  lat: 27.1751,
  lng: 78.0421,
  type: 'monument',
  country: 'India',
  countryCode: 'in',
};

export default function App() {
  // User Profile
  const [profile, setProfile] = useState<UserProfile>({
    id: 'default-traveler',
    ageGroup: 'adult',
    interests: ['History', 'Architecture', 'Culture & Folklore', 'Photography'],
    expertiseLevel: 'enthusiast',
    availableTime: 'full_day',
    mobilityNeed: 'none',
    preferredLanguage: 'en',
    budgetTier: 'moderate',
    travelGroupType: 'couple',
    preferredTransport: 'any',
    indoorOutdoorPref: 'all',
    personalizationEnabled: true,
    onboardingCompleted: true, // Default to ready, user can open anytime
  });

  // Selected Locations
  const [origin, setOrigin] = useState<LocationItem | null>(DEFAULT_ORIGIN);
  const [destination, setDestination] = useState<LocationItem | null>(DEFAULT_DESTINATION);
  const [isLocating, setIsLocating] = useState(false);

  // Data States
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [attractions, setAttractions] = useState<AttractionItem[]>([]);
  const [recommendationSections, setRecommendationSections] = useState<RecommendationSections | null>(null);
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>([]);
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<TransportOption | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<HotelItem | null>(null);

  // Hotel Search Parameters
  const [checkInDate, setCheckInDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Preferences & Modals
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('hi');
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [showProvidersModal, setShowProvidersModal] = useState(false);

  // New Personalization & Feature Navigation States
  const [activePersona, setActivePersona] = useState<PersonaType>('child');
  const [mainTab, setMainTab] = useState<MainTabType>('explore');
  const [selectedAttractionForGuide, setSelectedAttractionForGuide] = useState<AttractionItem | null>(null);

  const handleSelectPersona = (newPersona: PersonaType) => {
    setActivePersona(newPersona);
    // Align core profile settings with selected persona for synchronized engine recommendations
    setProfile((prev) => {
      const updated: UserProfile = { ...prev };
      if (newPersona === 'child') {
        updated.ageGroup = 'child';
        updated.interests = ['Culture & Folklore', 'Nature', 'Interactive'];
      } else if (newPersona === 'historian') {
        updated.expertiseLevel = 'expert';
        updated.interests = ['History', 'Architecture', 'Archaeology'];
      } else if (newPersona === 'photographer') {
        updated.interests = ['Photography', 'Architecture', 'Scenic Views'];
      } else if (newPersona === 'japanese_tourist') {
        updated.language = 'ja';
        updated.interests = ['Art & Heritage', 'Spiritual & Religious', 'Culture & Folklore'];
      } else if (newPersona === 'wheelchair_user') {
        updated.mobilityNeed = 'wheelchair_friendly';
      } else if (newPersona === 'budget_traveler') {
        updated.availableTime = '2_hours';
        updated.budgetTier = 'budget';
      }
      return updated;
    });
  };

  // Behavioral tracking
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Itinerary
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);

  // Loading States
  const [isLoadingAttractions, setIsLoadingAttractions] = useState(false);
  const [isLoadingTransport, setIsLoadingTransport] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);

  // 1. Fetch User Profile
  useEffect(() => {
    fetch('/api/profile?userId=default-traveler')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setProfile(json.data);
          // If first time, show onboarding
          if (!json.data.onboardingCompleted) {
            setShowOnboardingModal(true);
          }
        }
      })
      .catch((err) => console.error('Failed to load profile', err));
  }, []);

  // 2. Load Destination Data (Weather, Photos, Attractions, Hotels)
  const loadDestinationData = useCallback(async (dest: LocationItem) => {
    if (!dest) return;

    // A. Weather
    fetch(`/api/weather?lat=${dest.lat}&lng=${dest.lng}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setWeather(json.data);
      })
      .catch((e) => console.error('Weather load error', e));

    // B. Photos
    fetch(`/api/locations/${dest.id}/photos?name=${encodeURIComponent(dest.name)}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setPhotos(json.data);
        }
      })
      .catch((e) => console.error('Photos load error', e));

    // C. Attractions & Recommendations
    setIsLoadingAttractions(true);
    try {
      const attrRes = await fetch(`/api/locations/${dest.id}/attractions?lat=${dest.lat}&lng=${dest.lng}`);
      const attrJson = await attrRes.json();
      const rawAttractions = attrJson.success ? attrJson.data : [];
      setAttractions(rawAttractions);

      // Score with recommendation engine
      const recRes = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile.id,
          attractions: rawAttractions,
          lat: dest.lat,
          lng: dest.lng,
        }),
      });
      const recJson = await recRes.json();
      if (recJson.success) {
        setRecommendationSections(recJson.data.sections);
      }
    } catch (e) {
      console.error('Attractions load error', e);
    } finally {
      setIsLoadingAttractions(false);
    }

    // D. Hotels
    setIsLoadingHotels(true);
    fetch(
      `/api/hotels/search?destination=${encodeURIComponent(dest.name)}&lat=${dest.lat}&lng=${dest.lng}&checkIn=${checkInDate}&checkOut=${checkOutDate}&guests=${guests}&rooms=${rooms}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setHotels(json.data);
          if (json.data.length > 0) setSelectedHotel(json.data[0]);
        }
      })
      .catch((e) => console.error('Hotels load error', e))
      .finally(() => setIsLoadingHotels(false));
  }, [profile.id, checkInDate, checkOutDate, guests, rooms]);

  // 3. Load Transport Estimates between Origin and Destination
  const loadTransportData = useCallback(async (orig: LocationItem, dest: LocationItem) => {
    if (!orig || !dest) return;
    setIsLoadingTransport(true);
    try {
      const res = await fetch('/api/transport/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startLat: orig.lat,
          startLng: orig.lng,
          destLat: dest.lat,
          destLng: dest.lng,
          countryCode: dest.countryCode || 'in',
          cityName: dest.name,
        }),
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTransportOptions(json.data);
        // Default to auto or cab
        const auto = json.data.find((o: TransportOption) => o.mode === 'auto' || o.mode === 'auto_rickshaw') || json.data[0];
        setSelectedTransport(auto);
      }
    } catch (e) {
      console.error('Transport load error', e);
    } finally {
      setIsLoadingTransport(false);
    }
  }, []);

  // Trigger loads on location change
  useEffect(() => {
    if (destination) {
      loadDestinationData(destination);
    }
  }, [destination, loadDestinationData]);

  useEffect(() => {
    if (origin && destination) {
      loadTransportData(origin, destination);
    }
  }, [origin, destination, loadTransportData]);

  // 4. GPS Location Detection
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const res = await fetch(`/api/locations/reverse?lat=${lat}&lng=${lng}`);
          const json = await res.json();
          if (json.success && json.data) {
            setOrigin(json.data);
          }
        } catch (e) {
          console.error('Reverse geocode failed', e);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.warn('Geolocation error', err);
        setIsLocating(false);
        // Fallback to New Delhi Station
        setOrigin(DEFAULT_ORIGIN);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // 4b. Global Monument Selector (propagates monument selection across all tabs & loads real data)
  const handleSelectMonument = useCallback(async (name: string) => {
    try {
      const res = await fetch(`/api/locations/search?q=${encodeURIComponent(name)}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setDestination(json.data[0]);
        return;
      }
    } catch (e) {
      console.error('Failed to resolve monument location', e);
    }
    if (destination) {
      setDestination({ ...destination, name });
    }
  }, [destination]);

  // 5. User Profile Update
  const handleSaveProfile = async (updated: Partial<UserProfile>) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: profile.id, ...updated }),
      });
      const json = await res.json();
      if (json.success) {
        setProfile(json.data);
        // Re-score recommendations with new preferences
        if (destination && attractions.length > 0) {
          const recRes = await fetch('/api/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: json.data.id,
              attractions,
              lat: destination.lat,
              lng: destination.lng,
            }),
          });
          const recJson = await recRes.json();
          if (recJson.success) {
            setRecommendationSections(recJson.data.sections);
          }
        }
      }
    } catch (e) {
      console.error('Failed to update profile', e);
    }
  };

  // 6. Interaction Handlers (Like, Save, Reject)
  const handleLike = (id: string) => {
    const next = new Set(likedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setLikedIds(next);

    fetch('/api/behavior/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: profile.id,
        eventType: 'attraction_liked',
        contentId: id,
      }),
    }).catch(console.error);
  };

  const handleSave = (id: string) => {
    const next = new Set(savedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedIds(next);

    fetch('/api/behavior/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: profile.id,
        eventType: 'attraction_saved',
        contentId: id,
      }),
    }).catch(console.error);
  };

  const handleReject = (id: string, reason: string) => {
    fetch('/api/behavior/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: profile.id,
        eventType: 'recommendation_rejected',
        contentId: id,
        metadata: { reason },
      }),
    }).catch(console.error);

    // Filter out rejected attraction locally
    setAttractions((prev) => prev.filter((a) => a.id !== id));
    if (recommendationSections) {
      setRecommendationSections({
        bestForYou: recommendationSections.bestForYou.filter((a) => a.id !== id),
        withinTime: recommendationSections.withinTime.filter((a) => a.id !== id),
        accessible: recommendationSections.accessible.filter((a) => a.id !== id),
        weatherFriendly: recommendationSections.weatherFriendly.filter((a) => a.id !== id),
        budgetHighlights: recommendationSections.budgetHighlights.filter((a) => a.id !== id),
      });
    }
  };

  // 7. Generate AI Itinerary
  const handleGenerateItinerary = async (days: number = 1) => {
    if (!destination) return;
    setIsGeneratingItinerary(true);
    try {
      const res = await fetch('/api/itinerary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationName: destination.name,
          userId: profile.id,
          attractions,
          days,
          lat: destination.lat,
          lng: destination.lng,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setItinerary(json.data);
      }
    } catch (e) {
      console.error('Itinerary generation error', e);
    } finally {
      setIsGeneratingItinerary(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/60 font-sans text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Sticky Navigation */}
      <Navbar
        profile={profile}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onOpenProfile={() => setShowOnboardingModal(true)}
        onOpenProviders={() => setShowProvidersModal(true)}
        onOpenItinerary={() => {
          setShowItineraryModal(true);
          if (!itinerary) handleGenerateItinerary(1);
        }}
      />

      {/* Live Provider Attribution Status Bar */}
      <ProviderBadgeBar onOpenDetails={() => setShowProvidersModal(true)} />

      {/* Hero Search & Live Weather Header */}
      <SearchHeader
        origin={origin}
        destination={destination}
        weather={weather}
        onSelectOrigin={(loc) => setOrigin(loc)}
        onSelectDestination={(loc) => setDestination(loc)}
        onUseCurrentLocation={handleUseCurrentLocation}
        isLocating={isLocating}
        language={selectedLanguage}
      />

      {/* Feature Navigation Tabs: Explore, Distance Meter, Weather, AI Guide, Itinerary, Images */}
      <NavigationTabs activeTab={mainTab} onChangeTab={setMainTab} language={selectedLanguage} />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-8">
        {/* 1. EXPLORE TAB */}
        {mainTab === 'explore' && (
          <div className="space-y-8">
            {/* Section 1: Verified Destination Photography Gallery */}
            <section className="space-y-2">
              <PhotoGallery
                photos={photos}
                destinationName={destination ? destination.name : 'Destination'}
              />
            </section>

            {/* Section 2: Personalized Recommendations & Tourist Attractions */}
            <section className="space-y-4">
              {isLoadingAttractions ? (
                <div className="flex h-40 items-center justify-center rounded-2xl bg-white border border-stone-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-700" />
                    <span>Fetching verified heritage monuments and scoring recommendations...</span>
                  </div>
                </div>
              ) : (
                <RecommendationsSection
                  sections={recommendationSections}
                  allAttractions={attractions}
                  destinationName={destination ? destination.name : 'Destination'}
                  onLike={handleLike}
                  onSave={handleSave}
                  onReject={handleReject}
                  likedIds={likedIds}
                  savedIds={savedIds}
                  currency={selectedCurrency}
                />
              )}
            </section>

            {/* Section 3: Transport Comparison (Auto tariffs, Uber, Metro, Walking) */}
            <section className="space-y-4">
              {isLoadingTransport ? (
                <div className="flex h-32 items-center justify-center rounded-2xl bg-white border border-stone-200">
                  <Loader2 className="h-4 w-4 animate-spin text-amber-700" />
                </div>
              ) : (
                <TransportComparison
                  options={transportOptions}
                  originName={origin ? origin.name : 'Starting Location'}
                  destinationName={destination ? destination.name : 'Destination'}
                  selectedOption={selectedTransport}
                  onSelectOption={(opt) => setSelectedTransport(opt)}
                  currency={selectedCurrency}
                />
              )}
            </section>

            {/* Section 4: Hotels & Accommodation */}
            <section className="space-y-4">
              {isLoadingHotels ? (
                <div className="flex h-32 items-center justify-center rounded-2xl bg-white border border-stone-200">
                  <Loader2 className="h-4 w-4 animate-spin text-amber-700" />
                </div>
              ) : (
                <HotelSection
                  hotels={hotels}
                  destinationName={destination ? destination.name : 'Destination'}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  guests={guests}
                  rooms={rooms}
                  currency={selectedCurrency}
                  onUpdateSearchParams={(params) => {
                    if (params.checkIn) setCheckInDate(params.checkIn);
                    if (params.checkOut) setCheckOutDate(params.checkOut);
                    if (params.guests) setGuests(params.guests);
                    if (params.rooms) setRooms(params.rooms);
                  }}
                />
              )}
            </section>

            {/* Section 5: Total Trip Cost Estimation & Currency Conversion */}
            <section className="space-y-4">
              <TripCostWidget
                selectedTransport={selectedTransport}
                selectedHotel={selectedHotel}
                targetCurrency={selectedCurrency}
              />
            </section>

            {/* Section 6: Interactive Route & Heritage Map */}
            <section className="space-y-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-700" />
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Interactive Route & Heritage Map
                  </h2>
                </div>
                <span className="text-xs text-stone-700 font-medium">
                  {origin?.name || 'Origin'} &rarr; {destination?.name || 'Destination'} • Leaflet & OpenStreetMap
                </span>
              </div>
              <LeafletMap
                origin={origin}
                destination={destination}
                attractions={attractions}
              />
            </section>
          </div>
        )}

        {/* AR VISION TAB */}
        {mainTab === 'ar_vision' && (
          <div className="space-y-8">
            <ARVisionSection
              currentMonumentName={destination ? destination.name : 'Taj Mahal'}
              onSelectMonument={handleSelectMonument}
            />
          </div>
        )}

        {/* 360 VR VIRTUAL TOUR TAB */}
        {mainTab === 'virtual_tour' && (
          <div className="space-y-8">
            <VirtualTourSection
              currentMonument={destination ? destination.name : 'Taj Mahal'}
              onSelectMonument={handleSelectMonument}
            />
          </div>
        )}

        {/* ORAL HISTORY ARCHIVE TAB */}
        {mainTab === 'oral_archive' && (
          <div className="space-y-8">
            <OralArchiveSection />
          </div>
        )}

        {/* 2. DISTANCE METER TAB */}
        {mainTab === 'distance_meter' && (
          <div className="space-y-8">
            <DistanceMeterSection
              currentLocationName={destination ? destination.name : 'Agra'}
              currentCoords={{
                lat: destination?.lat || 27.1751,
                lng: destination?.lng || 78.0421,
              }}
              attractions={attractions}
              selectedAttraction={selectedAttractionForGuide}
              onSelectAttraction={setSelectedAttractionForGuide}
            />

            {/* Accompanying Map */}
            <section className="space-y-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-700" />
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    Spatial Route Map & Heritage Landmarks
                  </h3>
                </div>
                <span className="text-xs text-stone-500">Live Leaflet Canvas</span>
              </div>
              <LeafletMap
                origin={origin}
                destination={destination}
                attractions={attractions}
              />
            </section>
          </div>
        )}

        {/* 3. WEATHER TAB */}
        {mainTab === 'weather' && (
          <div className="space-y-8">
            <WeatherSection
              locationName={destination ? destination.name : 'Agra'}
              coords={{
                lat: destination?.lat || 27.1751,
                lng: destination?.lng || 78.0421,
              }}
            />
          </div>
        )}

        {/* 4. AI GUIDE TAB */}
        {mainTab === 'ai_guide' && (
          <div className="space-y-8">
            <AIGuideSection
              destinationName={destination ? destination.name : 'Heritage Site'}
              activePersona={activePersona}
            />
          </div>
        )}

        {/* 5. ITINERARY TAB */}
        {mainTab === 'itinerary' && (
          <div className="space-y-8">
            <ItinerarySection
              locationName={destination ? destination.name : 'Heritage Site'}
              attractions={attractions}
              activePersona={activePersona}
              onSelectAttraction={setSelectedAttractionForGuide}
              currency={selectedCurrency}
            />
          </div>
        )}

        {/* 6. IMAGES TAB */}
        {mainTab === 'images' && (
          <div className="space-y-8">
            <ImagesSection
              locationName={destination ? destination.name : 'Heritage Site'}
              attractions={attractions}
              selectedAttraction={selectedAttractionForGuide}
              onSelectAttraction={(att) => setSelectedAttractionForGuide(att)}
            />
          </div>
        )}

        {/* 7. PERSONALIZATION MODE TAB (Directly beside Images) */}
        {mainTab === 'personalization' && (
          <div className="space-y-8">
            <PersonaSwitcher
              activePersona={activePersona}
              onSelectPersona={handleSelectPersona}
            />
            <PersonaShowcase
              destinationName={destination ? destination.name : 'Heritage Site'}
              activePersona={activePersona}
            />
            <PersonalizationSection
              activePersona={activePersona}
              onSelectPersona={handleSelectPersona}
              profile={profile}
              onUpdateProfile={setProfile}
              onNavigateToTab={(tab) => setMainTab(tab)}
            />
          </div>
        )}

        {/* Legal & Data Integrity Notice Banner */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>
              All prices strictly categorized as <b>Govt Official Tariff</b>, <b>Public Benchmark</b>, or <b>Estimated Range</b>. Zero fabricated data.
            </span>
          </div>
          <button
            onClick={() => setShowProvidersModal(true)}
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline whitespace-nowrap cursor-pointer"
          >
            Inspect Data Providers & Sourcing Policy &rarr;
          </button>
        </div>
      </main>

      {/* Modals */}
      <OnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        isInitialOnboarding={!profile.onboardingCompleted}
      />

      <ItineraryGeneratorModal
        isOpen={showItineraryModal}
        onClose={() => setShowItineraryModal(false)}
        destinationName={destination ? destination.name : 'Destination'}
        profile={profile}
        attractions={attractions}
        itinerary={itinerary}
        onGenerate={handleGenerateItinerary}
        isGenerating={isGeneratingItinerary}
      />

      <ProviderStatusModal
        isOpen={showProvidersModal}
        onClose={() => setShowProvidersModal(false)}
      />
    </div>
  );
}
