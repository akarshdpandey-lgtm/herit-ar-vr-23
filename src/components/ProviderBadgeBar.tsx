import React from 'react';
import { Database, ExternalLink, CheckCircle2, Shield } from 'lucide-react';

interface ProviderBadgeBarProps {
  onOpenDetails?: () => void;
}

export function ProviderBadgeBar({ onOpenDetails }: ProviderBadgeBarProps) {
  const providers = [
    { name: 'OpenStreetMap', label: 'OpenStreetMap', role: 'Geocoding & Map Data' },
    { name: 'OSRM', label: 'OSRM', role: 'Road Routing' },
    { name: 'Open-Meteo', label: 'Open-Meteo', role: 'Live Weather' },
    { name: 'Groq AI', label: 'Groq AI', role: 'Personalized AI' },
    { name: 'Wikimedia', label: 'Wikimedia', role: 'Verified Media' },
  ];

  return (
    <div className="w-full bg-stone-900 text-stone-300 py-2 px-3 sm:px-6 text-xs border-b border-stone-800 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Active Data Pipeline */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-stone-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Live Data Pipeline:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-stone-300 font-medium">
            {providers.map((p, idx) => (
              <React.Fragment key={p.name}>
                <span
                  title={p.role}
                  className="hover:text-amber-300 transition-colors cursor-help px-1 rounded hover:bg-stone-800"
                >
                  {p.label}
                </span>
                {idx < providers.length - 1 && <span className="text-stone-600">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right: Verification Guarantee & Inspect */}
        <div className="flex items-center gap-3 text-stone-400">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-stone-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Zero Fabricated Tariffs • Public Standard Benchmark
          </span>
          {onOpenDetails && (
            <button
              onClick={onOpenDetails}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 underline cursor-pointer"
            >
              <span>Inspect API Feed</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
