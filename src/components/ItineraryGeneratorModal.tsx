import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Clock,
  Compass,
  Accessibility,
  CloudSun,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  AlertTriangle,
  Coffee,
  Ticket,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { GeneratedItinerary, UserProfile, AttractionItem } from '../types';

interface ItineraryGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationName: string;
  profile: UserProfile;
  attractions: AttractionItem[];
  itinerary: GeneratedItinerary | null;
  onGenerate: (days: number) => Promise<void>;
  isGenerating: boolean;
}

export const ItineraryGeneratorModal: React.FC<ItineraryGeneratorModalProps> = ({
  isOpen,
  onClose,
  destinationName,
  profile,
  attractions,
  itinerary,
  onGenerate,
  isGenerating,
}) => {
  const [daysCount, setDaysCount] = useState(profile.availableTime === 'multiple_days' ? 2 : 1);
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFeedback = async (type: 'like' | 'dislike') => {
    if (!itinerary) return;
    try {
      await fetch('/api/itinerary/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: profile.id,
          itineraryId: itinerary.id,
          feedbackType: type,
        }),
      });
      setFeedbackSent(type === 'like' ? 'Thank you! Saved as preference.' : 'Feedback noted to refine future slots.');
    } catch (e) {
      console.error(e);
    }
  };

  // Group slots by day
  const slotsByDay = itinerary
    ? itinerary.slots.reduce((acc, slot) => {
        acc[slot.dayNumber] = acc[slot.dayNumber] || [];
        acc[slot.dayNumber].push(slot);
        return acc;
      }, {} as Record<number, typeof itinerary.slots>)
    : {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative flex flex-col w-full max-w-3xl max-h-[88vh] rounded-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="border-b border-stone-100 bg-stone-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900 text-amber-300 shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Personalized AI Itinerary Planner
                </h3>
                {itinerary?.generatedBy === 'gemini_ai' ? (
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-900">
                    Gemini 3.8 Flash AI
                  </span>
                ) : (
                  <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[10px] font-bold text-stone-700">
                    Rule-Based Archetype
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-700">
                Tailored for {profile.ageGroup} traveler • {profile.interests.slice(0, 2).join(', ')} • {profile.mobilityNeed.replace('_', ' ')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-200 hover:text-stone-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-700">Days:</span>
            <select
              value={daysCount}
              onChange={(e) => setDaysCount(Number(e.target.value))}
              disabled={isGenerating}
              className="rounded-lg border border-stone-200 bg-white px-2 py-1 font-semibold text-stone-900 outline-none"
            >
              <option value={1}>1 Day Plan</option>
              <option value={2}>2 Days Plan</option>
              <option value={3}>3 Days Plan</option>
            </select>
          </div>

          <button
            onClick={() => onGenerate(daysCount)}
            disabled={isGenerating}
            className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-amber-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing...' : 'Regenerate Itinerary'}</span>
          </button>
        </div>

        {/* Itinerary Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {!itinerary && !isGenerating && (
            <div className="py-12 text-center space-y-3">
              <Sparkles className="h-10 w-10 text-amber-600 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Ready to plan your time in {destinationName}?
              </h4>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Our AI considers visit duration, walking distance, accessibility ramps, current weather, and transit options.
              </p>
              <button
                onClick={() => onGenerate(daysCount)}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>Generate Itinerary Now</span>
              </button>
            </div>
          )}

          {isGenerating && (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="h-8 w-8 text-amber-600 animate-spin mx-auto" />
              <p className="font-serif text-base font-bold text-stone-900">
                Synthesizing Day-wise Heritage Plan...
              </p>
              <p className="text-xs text-stone-600">
                Matching architectural chronology, ticket gates, walking intervals, and weather suitability.
              </p>
            </div>
          )}

          {itinerary && !isGenerating && (
            <div className="space-y-6">
              {Object.keys(slotsByDay).map((dayKey) => {
                const dayNum = Number(dayKey);
                const daySlots = slotsByDay[dayNum];

                return (
                  <div key={dayNum} className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-stone-900 text-xs font-bold text-amber-300">
                        {dayNum}
                      </span>
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        Day {dayNum} Schedule
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {daySlots.map((slot, sIdx) => (
                        <div
                          key={sIdx}
                          className="relative rounded-2xl border border-stone-200 bg-stone-50/40 p-4 space-y-3 hover:bg-white hover:border-stone-300 transition-all shadow-2xs"
                        >
                          {/* Slot Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-stone-200 px-2 py-0.5 font-mono text-xs font-bold text-stone-800">
                                {slot.timeSlot}
                              </span>
                              <h5 className="font-bold text-sm text-stone-900">{slot.attractionName}</h5>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-stone-700">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-stone-600" />
                                {slot.visitDurationMinutes} min visit
                              </span>
                              <span className="flex items-center gap-1">
                                <Compass className="h-3 w-3 text-stone-600" />
                                {slot.transportMode} (~{slot.travelTimeMinutes}m)
                              </span>
                            </div>
                          </div>

                          {/* Recommendation Reason */}
                          <div className="text-xs text-amber-900 bg-amber-50/80 rounded-xl px-3 py-1.5 border border-amber-200/50">
                            💡 {slot.reasonForRecommendation}
                          </div>

                          {/* Notes row: Accessibility + Weather */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700">
                            <div className="flex items-start gap-1.5 rounded-lg bg-white p-2 border border-stone-100">
                              <Accessibility className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{slot.accessibilityNotes}</span>
                            </div>
                            <div className="flex items-start gap-1.5 rounded-lg bg-white p-2 border border-stone-100">
                              <CloudSun className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>{slot.weatherSuitability}</span>
                            </div>
                          </div>

                          {/* Alternative Attraction in case of closure/rain */}
                          {slot.alternativeAttraction && (
                            <div className="flex items-start gap-1.5 rounded-lg bg-stone-100/70 p-2 text-[11px] text-stone-700 border border-stone-200/60">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-stone-900">
                                  Backup Alternative ({slot.alternativeAttraction.name}):
                                </span>{' '}
                                {slot.alternativeAttraction.reason}
                              </div>
                            </div>
                          )}

                          {/* Meal / Rest Break */}
                          {slot.mealOrRestBreak && (
                            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2 text-xs font-medium text-emerald-900 border border-emerald-200">
                              <Coffee className="h-4 w-4 text-emerald-700 shrink-0" />
                              <span>{slot.mealOrRestBreak}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with Feedback Controls */}
        {itinerary && (
          <div className="border-t border-stone-100 bg-stone-50 px-6 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-700 font-medium">Was this itinerary helpful?</span>
              <button
                onClick={() => handleFeedback('like')}
                className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <ThumbsUp className="h-3.5 w-3.5" /> Helpful
              </button>
              <button
                onClick={() => handleFeedback('dislike')}
                className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-stone-700 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <ThumbsDown className="h-3.5 w-3.5" /> Needs Changes
              </button>
              {feedbackSent && (
                <span className="text-emerald-700 font-medium ml-2">{feedbackSent}</span>
              )}
            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-stone-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-stone-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
