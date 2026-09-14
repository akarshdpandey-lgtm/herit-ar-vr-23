import React from 'react';
import { Compass, User, Sliders, ShieldCheck, Sparkles, Globe, Coins } from 'lucide-react';
import { UserProfile } from '../types';
import { SUPPORTED_CURRENCIES } from '../utils/currency';
import { SUPPORTED_LANGUAGES, SupportedLanguage, getTranslation } from '../utils/translations';

interface NavbarProps {
  profile: UserProfile;
  selectedCurrency: string;
  onSelectCurrency: (curr: string) => void;
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onOpenProfile: () => void;
  onOpenProviders: () => void;
  onOpenItinerary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  selectedCurrency,
  onSelectCurrency,
  selectedLanguage,
  onSelectLanguage,
  onOpenProfile,
  onOpenProviders,
  onOpenItinerary,
}) => {
  const t = getTranslation(selectedLanguage);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-amber-700 text-white shadow-sm shadow-amber-900/10 shrink-0">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900">
                {t.appName}
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-amber-900">
                Travel Discovery
              </span>
            </div>
            <p className="hidden text-xs text-stone-600 md:block max-w-md truncate">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language selector */}
          <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 px-2 sm:px-2.5 py-1.5 text-xs shadow-2xs hover:border-amber-400 transition-colors">
            <Globe className="h-3.5 w-3.5 text-stone-500 mr-1 shrink-0" />
            <select
              value={selectedLanguage}
              onChange={(e) => onSelectLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent font-semibold text-stone-800 outline-none cursor-pointer text-xs"
              title="Select Interface Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* Currency selector */}
          <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 px-2 sm:px-2.5 py-1.5 text-xs shadow-2xs hover:border-amber-400 transition-colors">
            <Coins className="h-3.5 w-3.5 text-amber-600 mr-1 shrink-0" />
            <select
              value={selectedCurrency}
              onChange={(e) => onSelectCurrency(e.target.value)}
              className="bg-transparent font-semibold text-stone-800 outline-none cursor-pointer text-xs"
              title="Select Currency for all prices"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* AI Itinerary Generator Trigger */}
          <button
            onClick={onOpenItinerary}
            className="flex items-center gap-1.5 rounded-xl bg-stone-900 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span className="hidden sm:inline">{t.aiItinerary}</span>
          </button>

          {/* User Profile & Preferences */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            title={t.editPreferences}
          >
            <User className="h-3.5 w-3.5 text-amber-700" />
            <span className="hidden md:inline capitalize font-semibold">{profile.ageGroup}</span>
            <Sliders className="h-3 w-3 text-stone-500 ml-0.5" />
          </button>

          {/* Providers Status */}
          <button
            onClick={onOpenProviders}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            title={t.dataProviders}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
