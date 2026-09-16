import React from 'react';
import { MainTabType } from '../types';
import {
  Compass,
  Scan,
  Eye,
  Bot,
  Archive,
  Route,
  CloudSun,
  Calendar,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../utils/translations';

interface NavigationTabsProps {
  activeTab: MainTabType;
  onChangeTab: (tab: MainTabType) => void;
  language?: SupportedLanguage;
}

export function NavigationTabs({ activeTab, onChangeTab, language = 'hi' }: NavigationTabsProps) {
  const t = getTranslation(language);

  const tabs: { id: MainTabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'explore', label: t.tabExplore, icon: Compass },
    { id: 'ar_vision', label: t.tabArVision, icon: Scan },
    { id: 'virtual_tour', label: t.tabVirtualTour, icon: Eye },
    { id: 'ai_guide', label: t.tabAiGuide, icon: Bot },
    { id: 'oral_archive', label: t.tabOralArchive, icon: Archive },
    { id: 'distance_meter', label: t.tabDistanceMeter, icon: Route },
    { id: 'weather', label: t.tabWeather, icon: CloudSun },
    { id: 'itinerary', label: t.tabItinerary, icon: Calendar },
    { id: 'images', label: t.tabImages, icon: ImageIcon },
    { id: 'personalization', label: t.tabPersonalization, icon: Sparkles },
  ];

  return (
    <div className="sticky top-0 z-30 w-full border-b border-stone-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-amber-300 shadow-lg shadow-stone-900/15 ring-1 ring-stone-900'
                    : 'text-stone-600 hover:-translate-y-0.5 hover:bg-amber-50 hover:text-stone-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
