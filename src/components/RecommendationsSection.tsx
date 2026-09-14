import React, { useState, useMemo } from 'react';
import { Sparkles, Clock, Accessibility, CloudSun, DollarSign, Landmark, ArrowUpDown } from 'lucide-react';
import { AttractionItem, RecommendationSections } from '../types';
import { AttractionCard } from './AttractionCard';

interface RecommendationsSectionProps {
  sections: RecommendationSections | null;
  allAttractions: AttractionItem[];
  destinationName: string;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  likedIds: Set<string>;
  savedIds: Set<string>;
  currency?: string;
}

export type TabType = 'bestForYou' | 'withinTime' | 'accessible' | 'weatherFriendly' | 'budgetHighlights' | 'all';

interface TabMeta {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  subtitle: string;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  sections,
  allAttractions,
  destinationName,
  onLike,
  onSave,
  onReject,
  likedIds,
  savedIds,
  currency = 'INR',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('bestForYou');

  // Compute specific sorted and filtered lists for each tab so tab switching visibly re-orders items!
  const computedLists = useMemo(() => {
    const base = [...allAttractions];

    // 1. Best for You: Ranked by match score descending
    const bestForYou = sections?.bestForYou?.length
      ? [...sections.bestForYou]
      : [...base].sort((a, b) => (b.score || 0) - (a.score || 0));

    // 2. Within Time Limit: Ranked by fastest visit duration (quickest express sights first)
    const withinTime = [...base].sort((a, b) => {
      const durA = a.taxonomy?.estimatedDurationMinutes || 60;
      const durB = b.taxonomy?.estimatedDurationMinutes || 60;
      return durA - durB;
    });

    // 3. Nearby & Accessible: Verified step-free & wheelchair accessible, ranked closest first
    const accessible = [...base]
      .filter((a) => a.taxonomy?.wheelchairSuitability || a.taxonomy?.accessibility === 'verified_accessible' || (a.taxonomy?.walkingDistanceMeters || 1000) <= 800)
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

    // 4. Weather Friendly: Covered pavilions, shaded Charbagh gardens and top photography light
    const weatherFriendly = [...base]
      .filter((a) => a.taxonomy?.photographyValue === 'high' || a.taxonomy?.indoorOutdoor === 'mixed' || a.taxonomy?.indoorOutdoor === 'indoor' || a.taxonomy?.weatherSuitability === 'indoor_safe')
      .sort((a, b) => {
        const pScoreA = (a.taxonomy?.photographyValue === 'high' ? 2 : 1) + (a.taxonomy?.indoorOutdoor !== 'outdoor' ? 1 : 0);
        const pScoreB = (b.taxonomy?.photographyValue === 'high' ? 2 : 1) + (b.taxonomy?.indoorOutdoor !== 'outdoor' ? 1 : 0);
        return pScoreB - pScoreA;
      });

    // 5. Budget Highlights: Ranked by lowest admission tariff (Free ₹0 first, then lowest fees)
    const budgetHighlights = [...base].sort((a, b) => {
      const pA = a.ticketPrice?.amount ?? 0;
      const pB = b.ticketPrice?.amount ?? 0;
      return pA - pB;
    });

    // 6. All Places: Ranked by proximity from monument center
    const all = [...base].sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

    return {
      bestForYou,
      withinTime,
      accessible: accessible.length > 0 ? accessible : all,
      weatherFriendly: weatherFriendly.length > 0 ? weatherFriendly : all,
      budgetHighlights,
      all,
    };
  }, [allAttractions, sections]);

  const activeItems = computedLists[activeTab];

  const TABS: TabMeta[] = [
    {
      id: 'bestForYou',
      label: 'Best for You',
      icon: <Sparkles className="h-3.5 w-3.5 text-amber-600" />,
      subtitle: 'Ranked by personalized match score with your cultural profile and interests.',
    },
    {
      id: 'withinTime',
      label: 'Within Time Limit',
      icon: <Clock className="h-3.5 w-3.5 text-blue-600" />,
      subtitle: 'Ranked by shortest visit duration — express visits (30–60 min) first for tight schedules.',
    },
    {
      id: 'accessible',
      label: 'Nearby & Accessible',
      icon: <Accessibility className="h-3.5 w-3.5 text-emerald-600" />,
      subtitle: 'Ranked by proximity to center with verified step-free wheelchair & comfortable walking paths.',
    },
    {
      id: 'weatherFriendly',
      label: 'Weather Friendly',
      icon: <CloudSun className="h-3.5 w-3.5 text-amber-500" />,
      subtitle: 'Optimum daylight photography, shaded Charbagh gardens, and sheltered historical halls.',
    },
    {
      id: 'budgetHighlights',
      label: 'Budget Highlights',
      icon: <DollarSign className="h-3.5 w-3.5 text-green-600" />,
      subtitle: 'Ranked by lowest official entry tariff — starting with 100% free public heritage sites.',
    },
    {
      id: 'all',
      label: 'All Places',
      icon: <Landmark className="h-3.5 w-3.5 text-stone-500" />,
      subtitle: `Complete catalog of all ${allAttractions.length} verified historical monuments in this destination.`,
    },
  ];

  const currentTabMeta = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="space-y-4">
      {/* Header & Section Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Heritage & Attractions in {destinationName}
            </h3>
            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700">
              {allAttractions.length} verified monuments
            </span>
          </div>
          <p className="text-xs text-stone-700 mt-0.5">
            Transparently scored matching your age group, interests, mobility needs, and live conditions.
          </p>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-stone-200">
        {TABS.map((tab) => {
          const count = computedLists[tab.id]?.length || 0;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'border-b-2 border-amber-700 text-stone-900 bg-amber-50/60 shadow-2xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isSelected ? 'bg-amber-200/80 text-amber-950' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Sort Explanation Banner */}
      <div className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 px-3.5 py-2 text-xs border border-stone-200/80 text-stone-700">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-amber-700 shrink-0" />
          <span>{currentTabMeta.subtitle}</span>
        </div>
        <span className="shrink-0 font-semibold text-stone-900 text-[11px]">
          Showing {activeItems.length} places
        </span>
      </div>

      {/* Attractions Grid */}
      {activeItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center">
          <p className="text-xs text-stone-600">No attractions matched this specific filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeItems.map((attr) => (
            <AttractionCard
              key={`${activeTab}-${attr.id}`}
              attraction={attr}
              onLike={onLike}
              onSave={onSave}
              onReject={onReject}
              isLiked={likedIds.has(attr.id)}
              isSaved={savedIds.has(attr.id)}
              currency={currency}
            />
          ))}
        </div>
      )}
    </div>
  );
};
