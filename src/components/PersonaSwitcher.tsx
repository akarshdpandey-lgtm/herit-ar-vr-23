import React from 'react';
import { PersonaType } from '../types';
import { Sparkles, BookOpen, Camera, Globe, Accessibility, Clock, Check } from 'lucide-react';

interface PersonaSwitcherProps {
  activePersona: PersonaType;
  destinationName: string;
  onSelectPersona: (persona: PersonaType) => void;
}

export const PERSONA_CONFIGS: Record<
  PersonaType,
  {
    label: string;
    shortName: string;
    icon: React.ComponentType<{ className?: string }>;
    whatPlatformShows: string;
    accentColor: string;
    activeBadge: string;
  }
> = {
  child: {
    label: '8-Year-Old Child',
    shortName: 'Child (8yo)',
    icon: Sparkles,
    whatPlatformShows: 'Animated stories, treasure hunt AR game, simple explanations',
    accentColor: 'text-amber-600 bg-amber-50 border-amber-300',
    activeBadge: 'bg-amber-600 text-white',
  },
  historian: {
    label: 'History Professor',
    shortName: 'History Professor',
    icon: BookOpen,
    whatPlatformShows: 'Primary sources, archaeological details, research papers',
    accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-300',
    activeBadge: 'bg-indigo-600 text-white',
  },
  photographer: {
    label: 'Photography Enthusiast',
    shortName: 'Photographer',
    icon: Camera,
    whatPlatformShows: 'Best angles, lighting times, composition guides',
    accentColor: 'text-rose-600 bg-rose-50 border-rose-300',
    activeBadge: 'bg-rose-600 text-white',
  },
  japanese_tourist: {
    label: 'Foreign Tourist (Japanese)',
    shortName: 'Japanese Tourist',
    icon: Globe,
    whatPlatformShows: 'Cultural connections to Japanese history, Japanese audio',
    accentColor: 'text-red-600 bg-red-50 border-red-300',
    activeBadge: 'bg-red-600 text-white',
  },
  wheelchair_user: {
    label: 'Wheelchair User',
    shortName: 'Wheelchair User',
    icon: Accessibility,
    whatPlatformShows: 'Only accessible routes, ground-floor exhibits, ramp info',
    accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-300',
    activeBadge: 'bg-emerald-600 text-white',
  },
  budget_traveler: {
    label: 'Budget Traveler (2 hours)',
    shortName: 'Budget (2 hrs)',
    icon: Clock,
    whatPlatformShows: 'Top 3 must-see highlights, fastest route',
    accentColor: 'text-sky-600 bg-sky-50 border-sky-300',
    activeBadge: 'bg-sky-600 text-white',
  },
};

export function PersonaSwitcher({ activePersona, destinationName, onSelectPersona }: PersonaSwitcherProps) {
  const current = PERSONA_CONFIGS[activePersona];
  const IconComponent = current.icon;

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 p-3 sm:p-4 shadow-xs space-y-3">
      {/* Header with Title and Mode Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-base font-serif font-bold text-stone-900 flex items-center gap-1.5">
            <span>🎯</span>
            <span>Personalization Mode</span>
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-stone-100 text-stone-600 border border-stone-200">
            6 Tailored Profiles
          </span>
        </div>
        <div className="text-xs text-stone-700 font-medium flex items-center gap-1.5">
          <span className="text-stone-700">Currently tailored for:</span>
          <span className="font-semibold text-amber-800">{destinationName.split(',')[0]}</span>
          <span className="text-stone-700">as</span>
          <span className="font-semibold text-stone-900 underline decoration-amber-500 decoration-2">
            {current.label}
          </span>
        </div>
      </div>

      {/* Pill Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {(Object.keys(PERSONA_CONFIGS) as PersonaType[]).map((pKey) => {
          const cfg = PERSONA_CONFIGS[pKey];
          const Icon = cfg.icon;
          const isActive = activePersona === pKey;

          return (
            <button
              key={pKey}
              onClick={() => onSelectPersona(pKey)}
              className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                isActive
                  ? `${cfg.activeBadge} shadow-xs font-semibold border-transparent ring-2 ring-offset-1 ring-stone-900`
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white text-stone-700 border border-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold truncate leading-tight">{cfg.shortName}</div>
                <div
                  className={`text-[10px] truncate ${
                    isActive ? 'text-white/80' : 'text-stone-700'
                  }`}
                >
                  {pKey === 'child' && 'AR stories & hunt'}
                  {pKey === 'historian' && 'Primary sources'}
                  {pKey === 'photographer' && 'Angles & light'}
                  {pKey === 'japanese_tourist' && '日本語 & history'}
                  {pKey === 'wheelchair_user' && 'Step-free only'}
                  {pKey === 'budget_traveler' && 'Top 3 in 2 hrs'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Persona Capabilities Banner ("What Platform Shows") */}
      <div className="rounded-xl bg-stone-50 border border-stone-200 p-2.5 sm:p-3 flex items-start gap-2.5 text-xs">
        <div className="p-1 rounded-md bg-amber-100 text-amber-800 shrink-0 mt-0.5">
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-stone-900">{current.label}:</span>
            <span className="text-stone-700 font-medium">What Platform Shows &rarr;</span>
            <span className="font-semibold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">
              {current.whatPlatformShows}
            </span>
          </div>
          <p className="text-[11px] text-stone-700">
            {activePersona === 'child' && 'Kid-friendly language, interactive AR quest, animated story episodes, and fun trivia.'}
            {activePersona === 'historian' && 'Epigraphical records, ASI excavation data, mortar chemistry, and academic research papers.'}
            {activePersona === 'photographer' && 'Calculated golden/blue hour, composition guides, camera settings (f/8, ISO), and vantage GPS coordinates.'}
            {activePersona === 'japanese_tourist' && 'Buddhism transmission links to Nara/Kyoto, Japanese voice audio guide, and temple etiquette.'}
            {activePersona === 'wheelchair_user' && 'Verified step-free circuits, ramp gradients (<1:12), ground-floor exhibits, and battery buggy info.'}
            {activePersona === 'budget_traveler' && 'Top 3 must-see highlights, 120-min fastest route circuit, and zero-cost vantage hacks.'}
          </p>
        </div>
      </div>
    </div>
  );
}
