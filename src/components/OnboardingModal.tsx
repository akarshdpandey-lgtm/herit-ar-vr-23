import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Shield, User, Heart, Clock, Accessibility, Sparkles } from 'lucide-react';
import { UserProfile, AgeGroup, ExpertiseLevel, AvailableTime, MobilityNeed, BudgetTier, TransportPreference } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
  isInitialOnboarding?: boolean;
}

const INTERESTS_OPTIONS = [
  'History',
  'Architecture',
  'Art & Museums',
  'Culture & Folklore',
  'Photography',
  'Spirituality & Temples',
  'Food & Culinary',
  'Nature & Gardens',
  'Adventure',
  'Shopping & Crafts',
  'Local Experiences'
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  isInitialOnboarding = false,
}) => {
  const [step, setStep] = useState(1);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(profile.ageGroup || 'adult');
  const [interests, setInterests] = useState<string[]>(profile.interests || ['History', 'Architecture']);
  const [expertiseLevel, setExpertiseLevel] = useState<ExpertiseLevel>(profile.expertiseLevel || 'enthusiast');
  const [availableTime, setAvailableTime] = useState<AvailableTime>(profile.availableTime || 'half_day');
  const [mobilityNeed, setMobilityNeed] = useState<MobilityNeed>(profile.mobilityNeed || 'none');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>(profile.budgetTier || 'moderate');
  const [preferredTransport, setPreferredTransport] = useState<TransportPreference>(profile.preferredTransport || 'any');
  const [indoorOutdoorPref, setIndoorOutdoorPref] = useState<'all' | 'indoor' | 'outdoor'>(profile.indoorOutdoorPref || 'all');
  const [personalizationEnabled, setPersonalizationEnabled] = useState(profile.personalizationEnabled ?? true);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleFinish = () => {
    onSaveProfile({
      ageGroup,
      interests: interests.length > 0 ? interests : ['History'],
      expertiseLevel,
      availableTime,
      mobilityNeed,
      budgetTier,
      preferredTransport,
      indoorOutdoorPref,
      personalizationEnabled,
      onboardingCompleted: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-stone-100 bg-stone-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-700 text-xs font-bold text-white">
                {step}/5
              </span>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                {isInitialOnboarding ? 'Personalize Your HeritAR Journey' : 'Traveler Profile & Preferences'}
              </h2>
            </div>
            {!isInitialOnboarding && (
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-200 hover:text-stone-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-amber-600 transition-all duration-300 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Body Content */}
        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: AGE GROUP */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <User className="h-4 w-4" />
                <span>Question 1 of 5: Who is traveling?</span>
              </div>
              <p className="text-sm text-stone-600">
                Select your age demographic to calibrate story depth, walking routes, and pace.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'child', label: 'Child (Under 13)', desc: 'Treasure hunts, animated visual stories, safe routes' },
                  { id: 'teenager', label: 'Teenager (13–18)', desc: 'Interactive highlights, photography spots, dynamic pacing' },
                  { id: 'adult', label: 'Adult (19–60)', desc: 'Comprehensive historical context, monuments & culture' },
                  { id: 'senior', label: 'Senior (60+)', desc: 'Paced walking, shaded rest pavilions, accessible pathways' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAgeGroup(item.id as AgeGroup)}
                    className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                      ageGroup === item.id
                        ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/20'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-semibold text-sm text-stone-900">{item.label}</span>
                    <span className="text-xs text-stone-700 mt-1 leading-snug">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: INTERESTS */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <Heart className="h-4 w-4" />
                <span>Question 2 of 5: What inspires your travel?</span>
              </div>
              <p className="text-sm text-stone-600">
                Pick as many topics as you enjoy. Recommendations will adapt based on your choices.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {INTERESTS_OPTIONS.map((interest) => {
                  const selected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                        selected
                          ? 'bg-amber-700 text-white shadow-xs'
                          : 'border border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {selected && <Check className="h-3.5 w-3.5" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: EXPERTISE LEVEL */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Question 3 of 5: What is your heritage expertise level?</span>
              </div>
              <p className="text-sm text-stone-600">
                We adjust the depth of archaeological details, architectural terms, and descriptions.
              </p>
              <div className="space-y-2.5 pt-2">
                {[
                  {
                    id: 'beginner',
                    title: 'Beginner / First-Time Explorer',
                    desc: 'Clear visual overviews, famous legends, easy-to-understand explanations'
                  },
                  {
                    id: 'enthusiast',
                    title: 'Cultural Enthusiast',
                    desc: 'Balanced context: dynasties, architectural styles, cultural heritage traditions'
                  },
                  {
                    id: 'expert',
                    title: 'Historian / Academic Expert',
                    desc: 'Primary historical sources, archaeological inscriptions, conservation details'
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setExpertiseLevel(item.id as ExpertiseLevel)}
                    className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      expertiseLevel === item.id
                        ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/20'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex-1">
                      <span className="font-semibold text-sm text-stone-900">{item.title}</span>
                      <p className="text-xs text-stone-700 mt-0.5">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: AVAILABLE TIME */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <Clock className="h-4 w-4" />
                <span>Question 4 of 5: How much time do you have?</span>
              </div>
              <p className="text-sm text-stone-600">
                Prevents exhausting itineraries by strictly respecting your available schedule.
              </p>
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {[
                  { id: '1_hour', title: '1 Hour Quick Stop', desc: 'Top single highlight + iconic viewpoint' },
                  { id: '2_hours', title: '2 Hours (Short Visit)', desc: 'Top 2 must-see landmarks + shortest route' },
                  { id: 'half_day', title: 'Half Day (~4-5 Hours)', desc: 'Core monuments + tea/coffee break' },
                  { id: 'full_day', title: 'Full Day (8+ Hours)', desc: 'Deep dive, lunch stop, sunset viewpoint' },
                  { id: 'multiple_days', title: 'Multiple Days (2–4 Days)', desc: 'Comprehensive regional discovery' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAvailableTime(item.id as AvailableTime)}
                    className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all ${
                      availableTime === item.id
                        ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/20'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-semibold text-sm text-stone-900">{item.title}</span>
                    <span className="text-xs text-stone-700 mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: MOBILITY, BUDGET & ADVANCED PREFERENCES */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                <Accessibility className="h-4 w-4" />
                <span>Question 5 of 5: Mobility & Accessibility Needs</span>
              </div>
              <p className="text-sm text-stone-600">
                We ensure routes prioritize wheelchair ramps, avoid arduous steps, and note rest areas.
              </p>
              <div className="space-y-2 pt-1">
                {[
                  { id: 'none', label: 'Standard Route (No special requirement)', desc: 'Standard stairways and walking distances' },
                  { id: 'low_walking', label: 'Low Walking Distance (<800m)', desc: 'Prioritizes shortest pedestrian distance' },
                  { id: 'wheelchair_friendly', label: 'Wheelchair-Friendly & Step-Free', desc: 'Ramps, verified wide doorways, elevator access' },
                  { id: 'step_free', label: 'Step-Free Route (Stroller / Crutches)', desc: 'Gentle gradients, no tall stone plinths' },
                  { id: 'frequent_rest', label: 'Frequent Rest Points & Shaded Benches', desc: 'Breaks every 20-30 minutes' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMobilityNeed(item.id as MobilityNeed)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                      mobilityNeed === item.id
                        ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/20'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-xs text-stone-900">{item.label}</span>
                      <p className="text-[11px] text-stone-700 mt-0.5">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Extra Preferences */}
              <div className="border-t border-stone-200 pt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Budget Tier:</label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value as BudgetTier)}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 p-2 text-stone-800 outline-none"
                  >
                    <option value="budget">Budget Traveler</option>
                    <option value="moderate">Moderate / Value</option>
                    <option value="premium">Premium Heritage</option>
                    <option value="luxury">Luxury Heritage</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Transport Preference:</label>
                  <select
                    value={preferredTransport}
                    onChange={(e) => setPreferredTransport(e.target.value as TransportPreference)}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 p-2 text-stone-800 outline-none"
                  >
                    <option value="any">Any Available Mode</option>
                    <option value="auto">Auto-Rickshaw</option>
                    <option value="cab">Taxi / App Cab</option>
                    <option value="walking">Walking / Eco</option>
                    <option value="public_transit">Metro / Transit</option>
                  </select>
                </div>
              </div>

              {/* Privacy & Personalization toggle */}
              <div className="flex items-center justify-between rounded-xl bg-stone-50 p-3 border border-stone-200 text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <div>
                    <span className="font-semibold text-stone-800">Anonymous Personalization</span>
                    <p className="text-[11px] text-stone-700">No private tracking. Anonymized recommendations.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={personalizationEnabled}
                  onChange={(e) => setPersonalizationEnabled(e.target.checked)}
                  className="h-4 w-4 accent-amber-600 rounded cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-stone-100 bg-stone-50 px-6 py-4 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-800 transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-stone-800 transition-colors"
            >
              <Check className="h-3.5 w-3.5 text-amber-400" />
              <span>Save & Discover</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
