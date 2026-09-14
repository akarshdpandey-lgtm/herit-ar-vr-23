import React from 'react';
import { PersonaType, UserProfile } from '../types';
import {
  Sparkles,
  Baby,
  GraduationCap,
  Camera,
  Languages,
  Accessibility,
  Clock,
  CheckCircle2,
  Gamepad2,
  BookOpen,
  SunMedium,
  Volume2,
  ShieldCheck,
  Zap,
  Sliders,
  ChevronRight,
} from 'lucide-react';

interface PersonalizationSectionProps {
  activePersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onNavigateToTab?: (tab: any) => void;
}

interface PersonaDetail {
  id: PersonaType;
  title: string;
  badge: string;
  color: string;
  borderColor: string;
  bgColor: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  whatPlatformShows: string;
  keyFeatures: string[];
  sampleExperience: {
    aiPrompt: string;
    sampleOutput: string;
  };
}

export function PersonalizationSection({
  activePersona,
  onSelectPersona,
  profile,
  onUpdateProfile,
  onNavigateToTab,
}: PersonalizationSectionProps) {
  const personas: PersonaDetail[] = [
    {
      id: 'child',
      title: '8-Year-Old Child',
      badge: 'Gamified & Fun',
      color: 'text-amber-700',
      borderColor: 'border-amber-300',
      bgColor: 'bg-amber-50',
      icon: Baby,
      headline: 'Interactive quests, cartoon AR models & exciting mysteries',
      whatPlatformShows: 'Animated stories, treasure hunt AR game, simple explanations',
      keyFeatures: [
        'Treasure hunt AR mini-game with collectible gold coins & discovery badges',
        'Animated folklore stories & exciting fairy-tale architectural narrations',
        'Fun trivia quizzes ("Find the hidden floral carvings in the marble wall!")',
        'Simple, jargon-free explanations with child-safe UI interactions',
      ],
      sampleExperience: {
        aiPrompt: 'Explain why Taj Mahal was built in simple fun words:',
        sampleOutput:
          '🏰 Imagine a king named Shah Jahan who loved his queen Mumtaz so much that he decided to build the world’s most magical white marble castle for her! Over 20,000 royal artists and 1,000 elephants brought sparkling crystals from faraway lands!',
      },
    },
    {
      id: 'historian',
      title: 'History Professor',
      badge: 'Academic & Rigorous',
      color: 'text-indigo-700',
      borderColor: 'border-indigo-300',
      bgColor: 'bg-indigo-50',
      icon: GraduationCap,
      headline: 'Inscriptions, archival manuscripts & archaeological excavation papers',
      whatPlatformShows: 'Primary sources, archaeological details, research papers',
      keyFeatures: [
        'Primary source epigraphy & court chronicle citations (Badshahnama, Tuzk-e-Babri)',
        'Archaeological Survey of India (ASI) restoration survey documentation',
        'Structural engineering analysis: well foundations, hydraulic water lift systems',
        'Comparative Indo-Islamic & Persian Timurid stylistic taxonomy',
      ],
      sampleExperience: {
        aiPrompt: 'Structural foundations of the Yamuna riverfront plinth:',
        sampleOutput:
          '📜 Historical analysis: To counter alluvial soil subsidence along the Yamuna basin, architect Ustad Ahmad Lahori engineered a matrix of deep masonry caisson wells encased in decay-resistant sal/teak timber caissons, functioning as an expansive hydraulic load-bearing raft slab.',
      },
    },
    {
      id: 'photographer',
      title: 'Photography Enthusiast',
      badge: 'Lighting & Composition',
      color: 'text-rose-700',
      borderColor: 'border-rose-300',
      bgColor: 'bg-rose-50',
      icon: Camera,
      headline: 'Precise azimuth angles, sun paths, framing spots & lens exposure tips',
      whatPlatformShows: 'Best angles, lighting times, composition guides',
      keyFeatures: [
        'Real-time golden hour, blue hour & civil twilight azimuth recommendations',
        'Composition grids: Leading line reflecting pools, arched doorway natural framing',
        'Recommended camera settings (ISO 100, f/8-f/11, 24-70mm lens focal length)',
        'Uncrowded secret vantage points (Mehtab Bagh sunset bank, East Gate alleyways)',
      ],
      sampleExperience: {
        aiPrompt: 'Best frame for Taj Mahal sunset shot:',
        sampleOutput:
          '📷 Setup at Mehtab Bagh (27.1800° N, 78.0420° E) at 17:42. Use a circular polarizer to balance river glare. Frame the ivory dome between two cypress trees for negative space balance, shoot at 50mm, f/8, 1/125s, ISO 100 with -0.7 EV exposure compensation.',
      },
    },
    {
      id: 'japanese_tourist',
      title: 'Foreign Tourist (Japanese)',
      badge: 'Bilingual & Cultural',
      color: 'text-red-700',
      borderColor: 'border-red-300',
      bgColor: 'bg-red-50',
      icon: Languages,
      headline: 'Japanese-Indian Buddhist heritage links, Japanese voice audio & etiquette',
      whatPlatformShows: 'Cultural connections to Japanese history, Japanese audio',
      keyFeatures: [
        'Cultural parallels with Japanese Buddhist aesthetics (Wabi-sabi, Zen garden symmetry)',
        'Japanese language text and natural pronunciation audio synthesis',
        'Visitor etiquette briefing: shoe removal rules, camera restrictions & temple customs',
        'Curated Japanese tourist assistance with verified local translation helpers',
      ],
      sampleExperience: {
        aiPrompt: 'Japanese Cultural Bridge Commentary:',
        sampleOutput:
          '🏯 インドのタージ・マハルへようこそ！日本の金閣寺や法隆寺に見られる木造の左右対称美と同様に、この建築はイスラム・ペルシャ美術とインドの石工技術が見事に調和した人類の至宝です。水面に映る「逆さタージ」の静寂をご堪能ください。',
      },
    },
    {
      id: 'wheelchair_user',
      title: 'Wheelchair User',
      badge: '100% Accessible Routes',
      color: 'text-teal-700',
      borderColor: 'border-teal-300',
      bgColor: 'bg-teal-50',
      icon: Accessibility,
      headline: 'Ramp gradients (<1:12), elevator locations, tactile paths & disabled facilities',
      whatPlatformShows: 'Only accessible routes, ground-floor exhibits, ramp info',
      keyFeatures: [
        'Strict filtering to step-free paved pathways with zero stair obstacles',
        'Ramp gradient compliance warnings & golf cart / battery vehicle drop-off zones',
        'Accessible restroom locations with grab bars & wide entry doors',
        'Complimentary wheelchair booth locations at ticketing gates',
      ],
      sampleExperience: {
        aiPrompt: 'Accessible path to central mausoleum:',
        sampleOutput:
          '♿ Route advisory: Enter through the VIP West Gate ramp (slope 1:14). Take the electric battery golf cart directly to the main red sandstone plinth. Dedicated wooden ramp leads to the lower circumambulatory terrace with zero step impediments. Accessible restrooms are located beside the cloakroom.',
      },
    },
    {
      id: 'budget_traveler',
      title: 'Budget Traveler (2 Hours)',
      badge: 'Fast & High-Value',
      color: 'text-emerald-700',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-emerald-50',
      icon: Clock,
      headline: 'Top 3 highlights, fastest circular loop, queue hacks & exact transit tariffs',
      whatPlatformShows: 'Top 3 must-see highlights, fastest route',
      keyFeatures: [
        'Curated Top 3 Must-See Highlights prioritizing maximum aesthetic impact',
        'Time-boxed 2-hour circular itinerary avoiding backtrack fatigue',
        'Cheapest transport route (E-rickshaw ₹20/share or local bus ₹10)',
        'Official online QR ticket booking tips to skip 45-minute ticket counter queues',
      ],
      sampleExperience: {
        aiPrompt: '2-hour express circuit for Taj Mahal:',
        sampleOutput:
          '⚡ Express 2-Hour Plan: (1) 0-25m: Fast entry via East Gate QR e-ticket; (2) 25-65m: Walk central waterway axis directly to main plinth for iconic symmetry photo; (3) 65-90m: Royal cenotaphs interior; (4) 90-120m: Riverfront Yamuna terrace view. Transport out: Shared electric auto for ₹15 to Agra Cantt.',
      },
    },
  ];

  const currentPersona = personas.find((p) => p.id === activePersona) || personas[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-amber-600 text-white shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Personalization Mode Studio
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  Active: {currentPersona.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Choose your traveler persona below. The entire platform (AI Guide narrations, Images,
                Itineraries, Distance routes & Audio guides) immediately customizes to match your exact needs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToTab?.('ai_guide')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Test in AI Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateToTab?.('images')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Images</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
          {personas.map((item) => {
            const Icon = item.icon;
            const isSelected = activePersona === item.id;

            return (
              <div
                key={item.id}
                onClick={() => onSelectPersona(item.id)}
                className={`group relative rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? `${item.borderColor} ${item.bgColor} shadow-md ring-2 ring-amber-500/30`
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/70 shadow-xs'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-amber-700" />
                    <span>Active Now</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected ? 'bg-white text-stone-900 shadow-xs' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">{item.title}</h3>
                      <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-stone-100/70 text-[11px] font-medium text-stone-700 mb-3">
                    <span className="font-bold text-stone-900">What Platform Shows: </span>
                    {item.whatPlatformShows}
                  </div>

                  <ul className="space-y-1.5 text-xs text-stone-600 mb-4">
                    {item.keyFeatures.slice(0, 2).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-stone-900 text-amber-400 shadow-xs'
                      : 'bg-stone-100 group-hover:bg-amber-600 group-hover:text-white text-stone-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mode Activated</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Switch to this Persona</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Live Simulation for the Active Persona */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-stone-900 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Live Output Preview for: {currentPersona.title}
              </h3>
              <p className="text-xs text-stone-600">
                See how AI Guide, Wikipedia Gallery & Audio Engine adapt for this traveler
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
            {currentPersona.badge}
          </span>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Customized Platform Features
            </div>
            <ul className="space-y-2 text-xs text-stone-700">
              {currentPersona.keyFeatures.map((kf, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{kf}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Live AI Prompt & Output Response
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-800 font-semibold">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Synced</span>
              </div>
            </div>
            <div className="p-2.5 bg-white/90 rounded-lg border border-amber-200 text-xs text-stone-600 italic">
              &ldquo;{currentPersona.sampleExperience.aiPrompt}&rdquo;
            </div>
            <div className="p-3 bg-white rounded-lg border border-amber-300 text-xs text-stone-800 leading-relaxed font-sans shadow-xs">
              {currentPersona.sampleExperience.sampleOutput}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
