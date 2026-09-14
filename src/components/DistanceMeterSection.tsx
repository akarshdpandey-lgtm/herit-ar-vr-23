import React, { useState, useEffect } from 'react';
import { DistanceCalculationResult, AttractionItem } from '../types';
import {
  Route,
  Navigation,
  Footprints,
  Flame,
  Leaf,
  Car,
  Bike,
  Bus,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface DistanceMeterSectionProps {
  currentLocationName: string;
  currentCoords: { lat: number; lng: number };
  attractions: AttractionItem[];
  selectedAttraction: AttractionItem | null;
  onSelectAttraction?: (attraction: AttractionItem) => void;
}

export function DistanceMeterSection({
  currentLocationName,
  currentCoords,
  attractions,
  selectedAttraction,
  onSelectAttraction,
}: DistanceMeterSectionProps) {
  const [originType, setOriginType] = useState<'station' | 'airport' | 'current' | 'custom'>('station');
  const [originName, setOriginName] = useState<string>('City Main Railway Station');
  const [originCoords, setOriginCoords] = useState<{ lat: number; lng: number }>({
    lat: currentCoords.lat + 0.04,
    lng: currentCoords.lng - 0.03,
  });

  const targetAttraction = selectedAttraction || attractions[0];
  const destName = targetAttraction ? targetAttraction.name : 'Central Heritage Site';
  const destCoords = targetAttraction
    ? { lat: targetAttraction.lat, lng: targetAttraction.lng }
    : { lat: currentCoords.lat, lng: currentCoords.lng };

  const [result, setResult] = useState<DistanceCalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync origin presets based on destination
  useEffect(() => {
    if (originType === 'station') {
      setOriginName(`${currentLocationName.split(',')[0]} Railway Station`);
      setOriginCoords({ lat: currentCoords.lat + 0.035, lng: currentCoords.lng - 0.025 });
    } else if (originType === 'airport') {
      setOriginName(`${currentLocationName.split(',')[0]} Airport Terminal`);
      setOriginCoords({ lat: currentCoords.lat + 0.12, lng: currentCoords.lng + 0.09 });
    } else if (originType === 'current') {
      setOriginName('Your Current GPS Position');
      setOriginCoords({ lat: currentCoords.lat + 0.015, lng: currentCoords.lng + 0.01 });
    }
  }, [originType, currentLocationName, currentCoords]);

  // Compute distance calculation via API
  const calculateDistance = () => {
    setLoading(true);
    fetch('/api/distance/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originName,
        originLat: originCoords.lat,
        originLng: originCoords.lng,
        destinationName: destName,
        destLat: destCoords.lat,
        destLng: destCoords.lng,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setResult(res.data);
        }
      })
      .catch((err) => console.warn('Distance calculation failed:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    calculateDistance();
  }, [originName, originCoords.lat, originCoords.lng, destName, destCoords.lat, destCoords.lng]);

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
              <Route className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Precision Distance Meter & Routing Matrix
              </h2>
              <p className="text-xs text-stone-600">
                Powered by OSRM (Open Source Routing Machine) and OpenStreetMap road vectors.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OSRM Network Active</span>
          </div>
        </div>

        {/* Origin & Destination Configurator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Origin Card */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="text-xs font-bold text-stone-700 flex items-center justify-between">
              <span>📍 Step 1: Starting Point (Origin)</span>
              <span className="text-[11px] text-stone-500 font-normal">Select preset or GPS</span>
            </div>

            {/* Quick origin presets */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setOriginType('station')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center cursor-pointer transition-colors ${
                  originType === 'station'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                🚉 Railway Stn
              </button>
              <button
                onClick={() => setOriginType('airport')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center cursor-pointer transition-colors ${
                  originType === 'airport'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                ✈️ Airport
              </button>
              <button
                onClick={() => setOriginType('current')}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center cursor-pointer transition-colors ${
                  originType === 'current'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                📡 GPS Position
              </button>
            </div>

            <div className="text-xs font-semibold text-stone-900 bg-white p-2 rounded-lg border border-stone-200">
              {originName}
            </div>
          </div>

          {/* Destination Card */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="text-xs font-bold text-stone-700 flex items-center justify-between">
              <span>🏁 Step 2: Target Destination</span>
              <span className="text-[11px] text-stone-500 font-normal">Choose monument</span>
            </div>

            {/* Destination Selector */}
            <select
              value={targetAttraction?.id || ''}
              onChange={(e) => {
                const found = attractions.find((a) => a.id === e.target.value);
                if (found && onSelectAttraction) onSelectAttraction(found);
              }}
              className="w-full bg-white text-stone-900 text-xs font-medium p-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {attractions.slice(0, 15).map((att) => (
                <option key={att.id} value={att.id}>
                  {att.name} ({att.address?.split(',')[0] || 'Heritage Site'})
                </option>
              ))}
            </select>

            <div className="text-xs text-stone-600 truncate">
              Coordinates: {destCoords.lat.toFixed(4)}° N, {destCoords.lng.toFixed(4)}° E
            </div>
          </div>
        </div>

        {/* Results Matrix */}
        {loading ? (
          <div className="p-8 text-center space-y-2">
            <div className="inline-block animate-spin w-6 h-6 border-3 border-amber-600 border-t-transparent rounded-full" />
            <div className="text-xs text-stone-600">Querying OSRM road graph & calculating metrics...</div>
          </div>
        ) : result ? (
          <div className="space-y-4 pt-2">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                  Road Route (OSRM)
                </div>
                <div className="text-2xl font-bold text-stone-900">
                  {result.roadDistanceKm}{' '}
                  <span className="text-xs font-normal text-stone-500">km</span>
                </div>
                <div className="text-[11px] text-stone-600">
                  Straight-line: {result.straightLineKm} km
                </div>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1">
                  <Footprints className="w-3.5 h-3.5 text-stone-700" />
                  <span>Human Steps</span>
                </div>
                <div className="text-2xl font-bold text-stone-900">
                  {result.estimatedSteps.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-500">~1,312 steps per km</div>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                  <span>Calorie Burn</span>
                </div>
                <div className="text-2xl font-bold text-stone-900">
                  {result.estimatedCaloriesBurned}{' '}
                  <span className="text-xs font-normal text-stone-500">kcal</span>
                </div>
                <div className="text-[11px] text-stone-500">Active walking burn</div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Eco Savings</span>
                </div>
                <div className="text-2xl font-bold text-emerald-900">
                  {result.carbonSavingsKg}{' '}
                  <span className="text-xs font-normal text-stone-500">kg CO₂</span>
                </div>
                <div className="text-[11px] text-emerald-700">Saved if walking / cycling</div>
              </div>
            </div>

            {/* Travel Mode Breakdown Table */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3">
              <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                <span>⏱️ Travel Time & Commute Modes Comparison</span>
                <span className="text-[11px] text-stone-500">
                  Source: {result.routingProvider}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {/* Walking */}
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Footprints className="w-4 h-4 text-amber-600" />
                      <span>Walking</span>
                    </span>
                    <span className="text-amber-700">{result.modes.walking.durationMinutes} min</span>
                  </div>
                  <div className="text-xs text-stone-600">
                    {result.modes.walking.distanceKm} km • 4.5 km/h
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {result.modes.walking.details}
                  </div>
                </div>

                {/* Cycling */}
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Bike className="w-4 h-4 text-emerald-600" />
                      <span>Bicycle</span>
                    </span>
                    <span className="text-emerald-700">{result.modes.cycling.durationMinutes} min</span>
                  </div>
                  <div className="text-xs text-stone-600">
                    {result.modes.cycling.distanceKm} km • 13 km/h
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {result.modes.cycling.details}
                  </div>
                </div>

                {/* Auto-Rickshaw */}
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Navigation className="w-4 h-4 text-yellow-600" />
                      <span>Auto</span>
                    </span>
                    <span className="text-yellow-700">{result.modes.auto.durationMinutes} min</span>
                  </div>
                  <div className="text-xs text-stone-600 font-semibold text-emerald-700">
                    Est Fare: ₹{result.modes.auto.estFareInr}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {result.modes.auto.details}
                  </div>
                </div>

                {/* Driving / Cab */}
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-blue-600" />
                      <span>Cab / Car</span>
                    </span>
                    <span className="text-blue-700">{result.modes.driving.durationMinutes} min</span>
                  </div>
                  <div className="text-xs text-stone-600">
                    {result.modes.driving.distanceKm} km • Traffic buffer
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {result.modes.driving.details}
                  </div>
                </div>

                {/* Public Transit */}
                <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Bus className="w-4 h-4 text-purple-600" />
                      <span>Public Transit</span>
                    </span>
                    <span className="text-purple-700">{result.modes.transit.durationMinutes} min</span>
                  </div>
                  <div className="text-xs text-stone-600">
                    City feeder connection
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {result.modes.transit.details}
                  </div>
                </div>
              </div>

              {/* Road routing summary note */}
              <div className="text-xs text-stone-500 pt-1">
                ℹ️ {result.roadGeometrySummary}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
