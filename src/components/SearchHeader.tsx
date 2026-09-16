import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, CloudRain, Sun, Cloud, Loader2, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { LocationItem, WeatherInfo } from '../types';
import { SupportedLanguage, getTranslation } from '../utils/translations';

interface SearchHeaderProps {
  origin: LocationItem | null;
  destination: LocationItem | null;
  weather: WeatherInfo | null;
  onSelectOrigin: (loc: LocationItem) => void;
  onSelectDestination: (loc: LocationItem) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
  language?: SupportedLanguage;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  origin,
  destination,
  weather,
  onSelectOrigin,
  onSelectDestination,
  onUseCurrentLocation,
  isLocating,
  language = 'hi' as SupportedLanguage,
}) => {
  const t = getTranslation(language as SupportedLanguage);
  const [destQuery, setDestQuery] = useState(destination ? destination.name : '');
  const [originQuery, setOriginQuery] = useState(origin ? origin.name : '');
  const [destSuggestions, setDestSuggestions] = useState<LocationItem[]>([]);
  const [originSuggestions, setOriginSuggestions] = useState<LocationItem[]>([]);
  const [isSearchingDest, setIsSearchingDest] = useState(false);
  const [isSearchingOrigin, setIsSearchingOrigin] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);

  const destDebounceRef = useRef<any>(null);
  const originDebounceRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (destination) setDestQuery(destination.name);
  }, [destination]);

  useEffect(() => {
    if (origin) setOriginQuery(origin.name);
  }, [origin]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
        setShowOriginDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDestInputChange = (text: string) => {
    setDestQuery(text);
    setShowDestDropdown(true);

    if (destDebounceRef.current) clearTimeout(destDebounceRef.current);
    destDebounceRef.current = setTimeout(async () => {
      setIsSearchingDest(true);
      try {
        const res = await fetch(`/api/locations/search?q=${encodeURIComponent(text)}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setDestSuggestions(json.data);
        }
      } catch (e) {
        console.error('Destination search failed', e);
      } finally {
        setIsSearchingDest(false);
      }
    }, 250);
  };

  const handleDestKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (destSuggestions.length > 0) {
        onSelectDestination(destSuggestions[0]);
        setDestQuery(destSuggestions[0].name);
        setShowDestDropdown(false);
      } else if (destQuery.trim().length > 0) {
        setIsSearchingDest(true);
        try {
          const res = await fetch(`/api/locations/search?q=${encodeURIComponent(destQuery.trim())}`);
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            onSelectDestination(json.data[0]);
            setDestQuery(json.data[0].name);
            setShowDestDropdown(false);
          }
        } catch (err) {
          console.error('Direct enter search failed', err);
        } finally {
          setIsSearchingDest(false);
        }
      }
    }
  };

  const handleSelectQuickPick = async (searchTerm: string) => {
    setDestQuery(searchTerm);
    setIsSearchingDest(true);
    try {
      const res = await fetch(`/api/locations/search?q=${encodeURIComponent(searchTerm)}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        onSelectDestination(json.data[0]);
        setDestQuery(json.data[0].name);
        setShowDestDropdown(false);
      }
    } catch (e) {
      console.error('Quick pick failed', e);
    } finally {
      setIsSearchingDest(false);
    }
  };

  const handleOriginInputChange = (text: string) => {
    setOriginQuery(text);
    setShowOriginDropdown(true);

    if (originDebounceRef.current) clearTimeout(originDebounceRef.current);
    originDebounceRef.current = setTimeout(async () => {
      setIsSearchingOrigin(true);
      try {
        const res = await fetch(`/api/locations/search?q=${encodeURIComponent(text)}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOriginSuggestions(json.data);
        }
      } catch (e) {
        console.error('Origin search failed', e);
      } finally {
        setIsSearchingOrigin(false);
      }
    }, 280);
  };

  const QUICK_HERITAGE_DESTS = [
    { label: 'Taj Mahal', q: 'Taj Mahal, Agra' },
    { label: 'Golden Temple', q: 'Golden Temple, Amritsar' },
    { label: 'Kashi Vishwanath', q: 'Kashi Vishwanath Temple, Varanasi' },
    { label: 'Meenakshi Temple', q: 'Meenakshi Amman Temple, Madurai' },
    { label: 'Konark Sun Temple', q: 'Konark Sun Temple, Odisha' },
    { label: 'Statue of Unity', q: 'Statue of Unity, Gujarat' },
    { label: 'Charminar', q: 'Charminar, Hyderabad' },
    { label: 'Victoria Memorial', q: 'Victoria Memorial, Kolkata' },
    { label: 'Qutub Minar', q: 'Qutub Minar, Delhi' },
    { label: 'Ajanta & Ellora', q: 'Ajanta Caves, Maharashtra' },
    { label: 'Jagannath Puri', q: 'Jagannath Temple, Puri' },
    { label: 'Brihadeeswarar', q: 'Brihadeeswarar Temple, Thanjavur' },
    { label: 'Lotus Temple', q: 'Lotus Temple, Delhi' },
    { label: 'Manali', q: 'Manali, Himachal Pradesh' },
    { label: 'Goa Beaches', q: 'Goa Beaches & Heritage Churches' },
  ];

  return (
    <div ref={containerRef} className="border-b border-stone-200/90 bg-white/70 backdrop-blur-xs py-4 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-3">
        <div className="flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-stone-950 px-4 py-4 text-white shadow-xl shadow-stone-900/10 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-stone-950">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">Your heritage trail</p>
              <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">Discover the story behind the place.</h1>
              <p className="mt-1 text-xs text-stone-300">Search a destination to unlock its people, architecture, routes, and hidden details.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-stone-200 sm:self-auto">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live destination intelligence
            <ArrowRight className="h-3.5 w-3.5 text-amber-300" />
          </div>
        </div>
        {/* Search Bars Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Origin Picker (Columns 1-5) */}
          <div className="relative md:col-span-5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
              {t.startLocation}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-stone-600">
                <Navigation className="h-4 w-4 text-blue-600" />
              </div>
              <input
                type="text"
                value={originQuery}
                onChange={(e) => handleOriginInputChange(e.target.value)}
                onFocus={() => {
                  setShowOriginDropdown(true);
                  if (originSuggestions.length === 0) handleOriginInputChange(originQuery);
                }}
                placeholder="Starting location or station..."
                className="w-full rounded-xl border border-stone-300 bg-white pl-9 pr-24 py-2.5 text-xs sm:text-sm font-medium text-stone-900 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={onUseCurrentLocation}
                disabled={isLocating}
                className="absolute right-1.5 flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1.5 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
                title={t.useMyLocation}
              >
                {isLocating ? (
                  <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                ) : (
                  <MapPin className="h-3 w-3 text-blue-600" />
                )}
                <span>GPS</span>
              </button>
            </div>

            {/* Origin Dropdown */}
            {showOriginDropdown && (originSuggestions.length > 0 || isSearchingOrigin) && (
              <div className="absolute left-0 right-0 top-full mt-1 z-40 max-h-60 overflow-y-auto rounded-xl border border-stone-200 bg-white shadow-xl">
                {isSearchingOrigin && (
                  <div className="flex items-center gap-2 p-3 text-xs text-stone-700">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-stone-600" /> Searching locations...
                  </div>
                )}
                {originSuggestions.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      onSelectOrigin(loc);
                      setShowOriginDropdown(false);
                    }}
                    className="w-full px-3 py-2.5 text-left text-xs hover:bg-stone-50 border-b border-stone-100 last:border-0"
                  >
                    <div className="font-semibold text-stone-900">{loc.name}</div>
                    <div className="text-[11px] text-stone-700 truncate">{loc.displayName}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination Picker (Columns 6-10) */}
          <div className="relative md:col-span-5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-1">
              {t.destinationLocation}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-stone-600">
                <Search className="h-4 w-4 text-amber-700" />
              </div>
              <input
                type="text"
                value={destQuery}
                onChange={(e) => handleDestInputChange(e.target.value)}
                onKeyDown={handleDestKeyDown}
                onFocus={() => {
                  setShowDestDropdown(true);
                  if (destSuggestions.length === 0) handleDestInputChange(destQuery);
                }}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-stone-300 bg-white pl-9 pr-10 py-2.5 text-xs sm:text-sm font-medium text-stone-900 shadow-xs focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
              {isSearchingDest && (
                <div className="absolute right-3 text-stone-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
            </div>

            {/* Destination Dropdown */}
            {showDestDropdown && (destSuggestions.length > 0 || isSearchingDest) && (
              <div className="absolute left-0 right-0 top-full mt-1 z-40 max-h-64 overflow-y-auto rounded-xl border border-stone-200 bg-white shadow-xl">
                {destSuggestions.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      onSelectDestination(loc);
                      setShowDestDropdown(false);
                    }}
                    className="w-full px-3 py-2.5 text-left text-xs hover:bg-amber-50/50 border-b border-stone-100 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">{loc.name}</span>
                      <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-600 uppercase">
                        {loc.country || loc.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-700 truncate mt-0.5">{loc.displayName}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Weather Widget (Columns 11-12) */}
          <div className="md:col-span-2 flex items-center justify-end">
            {weather ? (
              <div className="w-full flex items-center justify-between rounded-xl border border-stone-200 bg-white p-2.5 shadow-xs">
                <div className="flex items-center gap-2">
                  {weather.isRainy ? (
                    <CloudRain className="h-5 w-5 text-blue-600 shrink-0" />
                  ) : weather.weatherCode <= 1 ? (
                    <Sun className="h-5 w-5 text-amber-500 shrink-0" />
                  ) : (
                    <Cloud className="h-5 w-5 text-stone-500 shrink-0" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-stone-900">{weather.temperatureC}°C</div>
                    <div className="text-[10px] text-stone-700 truncate max-w-[80px]">{weather.conditionText}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-stone-700 block font-medium">Rain prob:</span>
                  <span className="text-[11px] font-bold text-stone-700">{weather.precipitationProbability}%</span>
                </div>
              </div>
            ) : (
              <div className="w-full rounded-xl border border-dashed border-stone-200 p-2.5 text-center text-[11px] text-stone-600">
                Live weather
              </div>
            )}
          </div>
        </div>

        {/* Quick Picks for Instant Exploration */}
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl border border-stone-200/80 bg-white/70 p-2 pb-2 text-xs shadow-sm no-scrollbar">
          <span className="text-stone-700 font-medium text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-600" /> Popular:
          </span>
          {QUICK_HERITAGE_DESTS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleSelectQuickPick(item.q)}
              className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-700 hover:border-amber-400 hover:bg-amber-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
