import React, { useState, useEffect } from 'react';
import { AttractionItem, PhotoItem } from '../types';
import { SupportedLanguage } from '../utils/translations';
import { getAuthenticMonumentPhoto, handleMonumentImageError } from '../utils/monumentImages';
import {
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  X,
  Camera,
  Search,
  MapPin,
  Sparkles,
  Loader2,
  RefreshCw,
  Compass,
  ArrowRight,
  Sun,
  Moon,
  Building2,
  ZoomIn,
} from 'lucide-react';

interface ImagesSectionProps {
  locationName: string;
  attractions: AttractionItem[];
  selectedAttraction: AttractionItem | null;
  onSelectAttraction?: (attraction: AttractionItem) => void;
  language?: SupportedLanguage;
}

interface FrameTab {
  id: 'all' | 'sunset' | 'architecture' | 'details' | 'night' | 'surroundings';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface NearbyWikiSpot {
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

export function ImagesSection({
  locationName,
  attractions,
  selectedAttraction,
  onSelectAttraction,
  language = 'hi',
}: ImagesSectionProps) {
  const nearbyCopy: Record<SupportedLanguage, { title: string; count: string; description: string; empty: string }> = {
    en: { title: 'Nearby Heritage Sites', count: 'nearby sites found', description: 'Real photos and distance information for heritage attractions near', empty: 'Nearby heritage attractions are loading or none were found within 50 km.' },
    hi: { title: 'आस-पास के विरासत स्थल', count: 'आस-पास के स्थल मिले', description: 'आस-पास के ऐतिहासिक स्थलों की असली तस्वीरें और दूरी की जानकारी:', empty: '50 किमी के अंदर आस-पास के विरासत स्थल लोड हो रहे हैं या नहीं मिले।' },
    ja: { title: '近隣の文化遺産', count: '近隣の名所が見つかりました', description: '周辺の文化遺産の実際の写真と距離情報:', empty: '50km以内の近隣の文化遺産を読み込んでいます。' },
    es: { title: 'Sitios patrimoniales cercanos', count: 'sitios cercanos encontrados', description: 'Fotos reales e información de distancia de los sitios cercanos a', empty: 'Cargando sitios cercanos o no se encontraron en 50 km.' },
    fr: { title: 'Sites patrimoniaux proches', count: 'sites proches trouvés', description: 'Photos réelles et distances des sites proches de', empty: 'Chargement des sites proches ou aucun site trouvé dans un rayon de 50 km.' },
    de: { title: 'Nahegelegene Kulturerbestätten', count: 'nahe Orte gefunden', description: 'Echte Fotos und Entfernungen der Sehenswürdigkeiten nahe', empty: 'Nahegelegene Orte werden geladen oder wurden im Umkreis von 50 km nicht gefunden.' },
    bn: { title: 'কাছাকাছি ঐতিহ্যবাহী স্থান', count: 'কাছাকাছি স্থান পাওয়া গেছে', description: 'কাছাকাছি ঐতিহ্যবাহী স্থানের বাস্তব ছবি ও দূরত্বের তথ্য:', empty: 'কাছাকাছি স্থান লোড হচ্ছে অথবা ৫০ কিমির মধ্যে পাওয়া যায়নি।' },
    ta: { title: 'அருகிலுள்ள பாரம்பரிய தளங்கள்', count: 'அருகிலுள்ள தளங்கள் கிடைத்தன', description: 'அருகிலுள்ள பாரம்பரிய தளங்களின் உண்மையான படங்கள் மற்றும் தூரத் தகவல்:', empty: 'அருகிலுள்ள தளங்கள் ஏற்றப்படுகின்றன அல்லது 50 கி.மீ.க்குள் எதுவும் கிடைக்கவில்லை.' },
  };
  const copy = nearbyCopy[language];
  // Initial default target
  const defaultSpot = selectedAttraction ? selectedAttraction.name : locationName.split(',')[0] || 'Taj Mahal';

  const [searchQuery, setSearchQuery] = useState<string>(defaultSpot);
  const [activeSpotName, setActiveSpotName] = useState<string>(defaultSpot);
  const [activeFrame, setActiveFrame] = useState<
    'all' | 'sunset' | 'architecture' | 'details' | 'night' | 'surroundings'
  >('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [photosByFrame, setPhotosByFrame] = useState<{
    all: PhotoItem[];
    sunset: PhotoItem[];
    architecture: PhotoItem[];
    details: PhotoItem[];
    night: PhotoItem[];
    surroundings: PhotoItem[];
  }>({
    all: [],
    sunset: [],
    architecture: [],
    details: [],
    night: [],
    surroundings: [],
  });

  const [nearbySpots, setNearbySpots] = useState<NearbyWikiSpot[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Popular quick spots across India (15 iconic destinations requested)
  const popularIndianSpots = [
    { name: 'Taj Mahal', city: 'Agra', lat: 27.1751, lng: 78.0421 },
    { name: 'Golden Temple', city: 'Amritsar', lat: 31.6200, lng: 74.8765 },
    { name: 'Kashi Vishwanath', city: 'Varanasi', lat: 25.3109, lng: 83.0107 },
    { name: 'Meenakshi Temple', city: 'Madurai', lat: 9.9195, lng: 78.1193 },
    { name: 'Konark Sun Temple', city: 'Konark', lat: 19.8876, lng: 86.0945 },
    { name: 'Statue of Unity', city: 'Kevadia', lat: 21.8380, lng: 73.7191 },
    { name: 'Charminar', city: 'Hyderabad', lat: 17.3616, lng: 78.4747 },
    { name: 'Victoria Memorial', city: 'Kolkata', lat: 22.5448, lng: 88.3426 },
    { name: 'Qutub Minar', city: 'Delhi', lat: 28.5244, lng: 77.1855 },
    { name: 'Ajanta & Ellora', city: 'Aurangabad', lat: 20.5519, lng: 75.7033 },
    { name: 'Jagannath Puri', city: 'Puri', lat: 19.8049, lng: 85.8179 },
    { name: 'Brihadeeswarar', city: 'Thanjavur', lat: 10.7828, lng: 79.1318 },
    { name: 'Lotus Temple', city: 'Delhi', lat: 28.5535, lng: 77.2588 },
    { name: 'Manali', city: 'Manali', lat: 32.2432, lng: 77.1892 },
    { name: 'Goa Beaches', city: 'Goa', lat: 15.4989, lng: 73.8278 },
  ];

  // Fetch photos from Wikipedia & Wikimedia API for the selected spot
  const fetchSpotGallery = async (spot: string, lat?: number, lng?: number) => {
    setLoading(true);
    try {
      // Find coordinates from popularIndianSpots, attractions, or location search
      let targetLat = lat;
      let targetLng = lng;

      if (!targetLat || !targetLng) {
        const spotLower = spot.toLowerCase().trim();
        const foundPop = popularIndianSpots.find(
          (p) =>
            spotLower.includes(p.name.toLowerCase()) ||
            p.name.toLowerCase().includes(spotLower) ||
            (p.city && spotLower.includes(p.city.toLowerCase()))
        );
        if (foundPop) {
          targetLat = foundPop.lat;
          targetLng = foundPop.lng;
        } else {
          const foundAtt = attractions.find(
            (a) => a.name.toLowerCase().includes(spotLower) || spotLower.includes(a.name.toLowerCase())
          );
          if (foundAtt) {
            targetLat = foundAtt.lat;
            targetLng = foundAtt.lng;
          } else {
            // Check major Indian cities by keyword
            if (spotLower.includes('jaipur') || spotLower.includes('hawa mahal') || spotLower.includes('amber')) {
              targetLat = 26.9239;
              targetLng = 75.8267;
            } else if (spotLower.includes('delhi') || spotLower.includes('qutub') || spotLower.includes('lotus') || spotLower.includes('red fort')) {
              targetLat = 28.5244;
              targetLng = 77.1855;
            } else if (spotLower.includes('mumbai') || spotLower.includes('gateway')) {
              targetLat = 18.9220;
              targetLng = 72.8347;
            } else if (spotLower.includes('amritsar') || spotLower.includes('golden temple')) {
              targetLat = 31.6200;
              targetLng = 74.8765;
            } else if (spotLower.includes('varanasi') || spotLower.includes('kashi')) {
              targetLat = 25.3109;
              targetLng = 83.0107;
            } else if (spotLower.includes('kolkata') || spotLower.includes('victoria')) {
              targetLat = 22.5448;
              targetLng = 88.3426;
            } else if (spotLower.includes('hyderabad') || spotLower.includes('charminar')) {
              targetLat = 17.3616;
              targetLng = 78.4747;
            } else if (spotLower.includes('madurai') || spotLower.includes('meenakshi')) {
              targetLat = 9.9195;
              targetLng = 78.1193;
            } else if (spotLower.includes('konark') || spotLower.includes('sun temple')) {
              targetLat = 19.8876;
              targetLng = 86.0945;
            } else if (spotLower.includes('puri') || spotLower.includes('jagannath')) {
              targetLat = 19.8049;
              targetLng = 85.8179;
            } else if (spotLower.includes('kevadia') || spotLower.includes('statue of unity')) {
              targetLat = 21.8380;
              targetLng = 73.7191;
            } else if (spotLower.includes('thanjavur') || spotLower.includes('brihadeeswarar')) {
              targetLat = 10.7828;
              targetLng = 79.1318;
            } else if (spotLower.includes('ajanta') || spotLower.includes('ellora')) {
              targetLat = 20.5519;
              targetLng = 75.7033;
            } else if (spotLower.includes('manali')) {
              targetLat = 32.2432;
              targetLng = 77.1892;
            } else if (spotLower.includes('goa')) {
              targetLat = 15.4989;
              targetLng = 73.8278;
            } else {
              targetLat = 27.1751;
              targetLng = 78.0421;
            }
          }
        }
      }

      const res = await fetch(
        `/api/photos/spot-gallery?query=${encodeURIComponent(spot)}&lat=${targetLat}&lng=${targetLng}&radius=50`
      );
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setPhotosByFrame(json.data.frames);
          setNearbySpots(json.data.nearbySpots || []);
          setActiveSpotName(spot);
        }
      }
    } catch (err) {
      console.warn('Failed to load spot gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger load when component mounts, locationName changes, or selectedAttraction changes
  useEffect(() => {
    if (selectedAttraction) {
      setSearchQuery(selectedAttraction.name);
      fetchSpotGallery(selectedAttraction.name, selectedAttraction.lat, selectedAttraction.lng);
    } else if (locationName) {
      const spot = locationName.split(',')[0].trim();
      setSearchQuery(spot);
      fetchSpotGallery(spot);
    } else {
      fetchSpotGallery(defaultSpot);
    }
  }, [locationName, selectedAttraction]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    fetchSpotGallery(searchQuery.trim());
  };

  const handleSelectQuickSpot = (spot: { name: string; lat: number; lng: number }) => {
    setSearchQuery(spot.name);
    fetchSpotGallery(spot.name, spot.lat, spot.lng);
  };

  const handleSelectNearbySpot = (nearby: NearbyWikiSpot) => {
    setSearchQuery(nearby.name);
    fetchSpotGallery(nearby.name);
    // Also notify parent if matched
    const matched = attractions.find((a) => a.name.toLowerCase() === nearby.name.toLowerCase());
    if (matched && onSelectAttraction) {
      onSelectAttraction(matched);
    }
  };

  const frameTabs: FrameTab[] = [
    {
      id: 'all',
      label: 'All Real Photos',
      icon: ImageIcon,
      description: 'Complete high-resolution collection from Wikipedia & Wikimedia Commons',
    },
    {
      id: 'sunset',
      label: '🌅 Sunset & Golden Hour',
      icon: Sun,
      description: 'Dawn, dusk, warm golden lighting & dramatic horizon silhouettes',
    },
    {
      id: 'architecture',
      label: '🏛️ Grand Façade & Symmetrical',
      icon: Building2,
      description: 'Central axial view, domes, spires, minarets & monumental geometry',
    },
    {
      id: 'details',
      label: '🔍 Inlay, Pietra Dura & Carvings',
      icon: ZoomIn,
      description: 'Macro stone carvings, marble jali screens & semi-precious stone inlays',
    },
    {
      id: 'night',
      label: '🌙 Twilight & Reflections',
      icon: Moon,
      description: 'Mirror pool reflections, dusk illumination & ambient night vistas',
    },
    {
      id: 'surroundings',
      label: '🌿 Riverfront & Gardens',
      icon: Compass,
      description: 'Overlooking gardens, riverbanks, aerial views & surrounding landscape',
    },
  ];

  const currentPhotos = photosByFrame[activeFrame] || [];

  return (
    <div className="space-y-6">
      {/* Search & Location Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-xs">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Wikipedia Real Image Explorer
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Authentic Wikipedia / Wikimedia Media</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Search any heritage spot in India to view real multi-angle frames (Sunset, Architecture, Details, Night) & all surrounding places!
              </p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any Indian destination (e.g. Taj Mahal, Konark, Golden Temple, Hawa Mahal...)"
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-xs sm:text-sm font-medium text-stone-900 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 sm:px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs shrink-0 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Search Spot</span>
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-1">
            Popular Spots:
          </span>
          {popularIndianSpots.map((spot) => (
            <button
              key={spot.name}
              type="button"
              onClick={() => handleSelectQuickSpot(spot)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeSpotName.toLowerCase().includes(spot.name.toLowerCase())
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {spot.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Selected Spot & Frame Perspectives */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Spot Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Active Landmark
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">{activeSpotName}</h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Select different frame perspectives to see how this monument looks at sunset, night, or in macro details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">
              Showing <strong className="text-stone-900">{currentPhotos.length}</strong> authentic photos
            </span>
            <button
              type="button"
              onClick={() => fetchSpotGallery(activeSpotName)}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
              title="Refresh Wikimedia Images"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Frame Perspective Selector Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {frameTabs.map((tab) => {
            const Icon = tab.icon;
            const count = (photosByFrame[tab.id] || []).length;
            const isActive = activeFrame === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveFrame(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-stone-900 text-amber-400 shadow-xs ring-1 ring-stone-900'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-stone-500">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            <p className="text-sm font-medium">Fetching real photos from Wikipedia & Wikimedia Commons API...</p>
          </div>
        ) : currentPhotos.length === 0 ? (
          <div className="py-12 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-6 space-y-2">
            <ImageIcon className="w-8 h-8 mx-auto text-stone-400" />
            <p className="text-sm font-bold text-stone-700">No photos in this frame category yet.</p>
            <p className="text-xs text-stone-500">Switch to &ldquo;All Real Photos&rdquo; to view all available Wikipedia images.</p>
            <button
              onClick={() => setActiveFrame('all')}
              className="mt-2 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold cursor-pointer"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentPhotos.map((photo, idx) => (
              <div
                key={photo.id || idx}
                onClick={() => setSelectedPhoto(photo)}
                className="group bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                  <img
                    src={getAuthenticMonumentPhoto(photo.title || activeSpotName, undefined, photo.thumbnailUrl || photo.url)}
                    alt={photo.title || activeSpotName}
                    onError={(e) => handleMonumentImageError(e, photo.title || activeSpotName)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white text-xs">
                    <div className="flex justify-end">
                      <span className="p-1 rounded-lg bg-black/60 backdrop-blur-xs text-white">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="font-semibold text-[11px] line-clamp-2">
                      Click to view full high-res image & Wikipedia license
                    </div>
                  </div>
                </div>

                <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {photo.title}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
                    <span className="truncate max-w-[120px]">© {photo.author || 'Wikimedia Contributor'}</span>
                    <span className="text-amber-700 font-semibold shrink-0">
                      {photo.license ? photo.license.slice(0, 12) : 'Wikimedia CC'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nearby heritage sites with real Wikimedia images */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
              <MapPin className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                  {copy.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-stone-100 text-stone-700">
                  {nearbySpots.length} {copy.count}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                {copy.description} {activeSpotName}. Click any to view its full photo gallery.
              </p>
            </div>
          </div>
        </div>

        {nearbySpots.length === 0 ? (
          <p className="text-xs text-stone-500 py-4 italic">
            {copy.empty}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {nearbySpots.map((spot) => (
              <div
                key={spot.id}
                onClick={() => handleSelectNearbySpot(spot)}
                className="group bg-stone-50 hover:bg-amber-50/40 rounded-2xl border border-stone-200 hover:border-amber-300 p-3 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-200 mb-2.5">
                    <img
                      src={getAuthenticMonumentPhoto(spot.name, spot.category, spot.thumbnailUrl || spot.photoUrl)}
                      alt={spot.name}
                      onError={(e) => handleMonumentImageError(e, spot.name, spot.category)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold">
                      {spot.distanceKm ? `${spot.distanceKm} km door` : 'Aas-paas'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                        {spot.name}
                      </h4>
                    </div>
                    <span className="inline-block text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      {spot.category}
                    </span>
                    <p className="text-[11px] text-stone-600 line-clamp-2">
                      {spot.shortDescription || spot.address}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Wikipedia Image</span>
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Iski Images Dekhein</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="relative bg-stone-950 text-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-stone-800 shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-800">
              <div className="flex items-center gap-2 truncate mr-3">
                <Camera className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm font-bold truncate">{selectedPhoto.title}</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="relative bg-black flex items-center justify-center max-h-[62vh] overflow-hidden p-2">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Modal Metadata & Attribution */}
            <div className="p-4 sm:p-5 space-y-3 bg-stone-900 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-300">
                <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Photographer / Author</div>
                  <div className="font-semibold text-white">{selectedPhoto.author || 'Wikimedia Contributor'}</div>
                </div>

                <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-stone-400">Authentic License</div>
                  <div className="font-semibold text-amber-400">{selectedPhoto.license || 'Creative Commons CC-BY-SA'}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-800">
                <span className="text-[11px] text-stone-400">
                  Source: Wikipedia & Wikimedia Commons Repository
                </span>
                <a
                  href={
                    selectedPhoto.sourceUrl ||
                    `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(activeSpotName)}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
                >
                  <span>Open Full Wikipedia/Wikimedia File Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
