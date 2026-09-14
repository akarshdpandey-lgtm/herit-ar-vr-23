import React, { useState } from 'react';
import { AttractionItem, PersonaType } from '../types';
import { PERSONA_CONFIGS } from './PersonaSwitcher';
import { convertTextCurrency } from '../utils/currency';
import { findCuratedItinerary, ItinerarySlot } from '../data/destinationItineraries';
import {
  Calendar,
  Clock,
  Navigation,
  Footprints,
  Car,
  CheckCircle2,
  Printer,
  Sparkles,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface ItinerarySectionProps {
  locationName: string;
  attractions: AttractionItem[];
  activePersona: PersonaType;
  onSelectAttraction?: (attraction: AttractionItem) => void;
  currency?: string;
}

export function ItinerarySection({
  locationName,
  attractions,
  activePersona,
  onSelectAttraction,
  currency = 'INR',
}: ItinerarySectionProps) {
  const currentPersona = PERSONA_CONFIGS[activePersona];
  const [durationPreset, setDurationPreset] = useState<'2_hours' | 'half_day' | 'full_day'>('2_hours');

  // Generate structured slots dynamically for the selected location
  const getSlots = (): ItinerarySlot[] => {
    // 1. Check if we have curated itineraries for this destination
    const curated = findCuratedItinerary(locationName);
    if (curated) {
      if (durationPreset === '2_hours') return curated.slots2Hours;
      if (durationPreset === 'half_day') return curated.slotsHalfDay;
      return curated.slotsFullDay;
    }

    // 2. Dynamic generation based on live attractions of this destination
    const list = attractions.slice(0, 4);
    const cleanCity = locationName.split(',')[0].trim();

    if (durationPreset === '2_hours') {
      return [
        {
          time: '08:00 AM - 09:00 AM',
          title: list[0]?.name || `${cleanCity} Main Monument & Grand Gateway`,
          category: list[0]?.category || 'Iconic Cultural Highlight',
          duration: '1 hr',
          transport: 'Step-free paved approach / Walking',
          cost: list[0]?.ticketPrice?.amount ? `₹${list[0].ticketPrice.amount} (${list[0].ticketPrice.details || 'Official rate'})` : 'Free entry / Standard entry',
          tip: list[0]?.shortDescription || `Arrive early to admire the intricate architecture of ${cleanCity} before peak visiting hours.`,
        },
        {
          time: '09:00 AM - 10:00 AM',
          title: list[1]?.name || `${cleanCity} Inner Sanctum & Heritage Courtyard`,
          category: list[1]?.category || 'Architectural Landmark',
          duration: '1 hr',
          transport: 'Pedestrian marble or stone walkway',
          cost: list[1]?.ticketPrice?.amount ? `₹${list[1].ticketPrice.amount}` : 'Included in main entry ticket',
          tip: list[1]?.shortDescription || 'Observe the ornate artisanal craftsmanship and take in the panoramic historic surroundings.',
        },
      ];
    }

    if (durationPreset === 'half_day') {
      return [
        {
          time: '08:30 AM - 10:30 AM',
          title: list[0]?.name || `${cleanCity} Heritage Complex & Main Sight`,
          category: list[0]?.category || 'Primary Historical Site',
          duration: '2 hrs',
          transport: 'Pedestrian avenues / Local transit',
          cost: list[0]?.ticketPrice?.amount ? `₹${list[0].ticketPrice.amount}` : '₹50 Standard entry',
          tip: list[0]?.shortDescription || `Explore the monumental complex and ancient architectural motifs.`,
        },
        {
          time: '10:45 AM - 12:15 PM',
          title: list[1]?.name || `${cleanCity} Historical Gallery & Museum`,
          category: list[1]?.category || 'Heritage & Antiquities',
          duration: '1 hr 30 mins',
          transport: 'Local Auto-rickshaw / Cab (10 mins)',
          cost: list[1]?.ticketPrice?.amount ? `₹${list[1].ticketPrice.amount}` : '₹30 Entry',
          tip: list[1]?.shortDescription || 'View preserved royal antiquities, miniature artworks, and historic inscriptions.',
        },
        {
          time: '12:30 PM - 01:45 PM',
          title: `Traditional ${cleanCity} Gastronomy & Regional Lunch`,
          category: 'Authentic Local Flavors',
          duration: '1 hr 15 mins',
          transport: 'Short walk to heritage food street',
          cost: '₹200 - ₹500 per person',
          tip: `Taste traditional culinary specialties, freshly made local flatbreads, and signature local desserts.`,
        },
      ];
    }

    // Full day
    return [
      {
        time: '08:00 AM - 10:30 AM',
        title: list[0]?.name || `${cleanCity} Sunrise at Primary Monument`,
        category: list[0]?.category || 'Dawn Exploration',
        duration: '2 hrs 30 mins',
        transport: 'Early morning step-free walking',
        cost: list[0]?.ticketPrice?.amount ? `₹${list[0].ticketPrice.amount}` : 'Standard Ticket',
        tip: list[0]?.shortDescription || `Capture the dramatic morning sunlight over ${cleanCity}.`,
      },
      {
        time: '11:00 AM - 01:00 PM',
        title: list[1]?.name || `${cleanCity} Royal Citadel & Historic Courtyards`,
        category: list[1]?.category || 'Historic Palace & Fort',
        duration: '2 hrs',
        transport: 'Pre-paid Auto or Taxi (15 mins)',
        cost: list[1]?.ticketPrice?.amount ? `₹${list[1].ticketPrice.amount}` : '₹50 Entry',
        tip: list[1]?.shortDescription || 'Notice the defensive battlements and ornate royal chambers.',
      },
      {
        time: '01:15 PM - 02:45 PM',
        title: `Authentic Regional Lunch & Local Delicacies of ${cleanCity}`,
        category: 'Culinary Heritage',
        duration: '1 hr 30 mins',
        transport: 'Short stroll in old bazaar',
        cost: '₹300 - ₹650 per person',
        tip: `Enjoy slow-cooked regional delicacies, cooling traditional drinks, and local sweets.`,
      },
      {
        time: '03:15 PM - 05:00 PM',
        title: list[2]?.name || `${cleanCity} Artisan Guilds & Heritage Craft Bazaars`,
        category: list[2]?.category || 'Living Artisan Traditions',
        duration: '1 hr 45 mins',
        transport: 'E-rickshaw / Walking',
        cost: list[2]?.ticketPrice?.amount ? `₹${list[2].ticketPrice.amount}` : 'Free stroll',
        tip: list[2]?.shortDescription || 'Discover master artisans practicing centuries-old weaving, stone sculpting, or metalcraft.',
      },
      {
        time: '05:30 PM - 07:00 PM',
        title: list[3]?.name || `${cleanCity} Scenic Sunset Viewpoint`,
        category: list[3]?.category || 'Sunset Golden Hour',
        duration: '1 hr 30 mins',
        transport: 'Auto / Cab to vantage point',
        cost: 'Free access / Nominal entry',
        tip: `Enjoy the twilight breeze and sunset panorama overlooking ${cleanCity}.`,
      },
    ];
  };

  const slots = getSlots();

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Personalized Itinerary & Circuit Builder
              </h2>
              <p className="text-xs text-stone-600">
                Synchronized for {locationName.split(',')[0]} • Tailored for {currentPersona.label}
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 cursor-pointer w-fit"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Itinerary</span>
          </button>
        </div>

        {/* Duration Preset Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1.5">
            <button
              onClick={() => setDurationPreset('2_hours')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                durationPreset === '2_hours'
                  ? 'bg-stone-900 text-amber-400 shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              ⏱️ 2-Hour Express
            </button>
            <button
              onClick={() => setDurationPreset('half_day')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                durationPreset === 'half_day'
                  ? 'bg-stone-900 text-amber-400 shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              🌤️ Half-Day Tour (4-5 hrs)
            </button>
            <button
              onClick={() => setDurationPreset('full_day')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                durationPreset === 'full_day'
                  ? 'bg-stone-900 text-amber-400 shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              ☀️ Full-Day Immersion
            </button>
          </div>

          <div className="text-xs text-stone-600 font-medium">
            Personalization Mode: <strong className="text-stone-900">{currentPersona.label}</strong>
          </div>
        </div>

        {/* Timeline Slots */}
        <div className="space-y-3 pt-2">
          {slots.map((slot, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-colors space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-stone-900">{slot.title}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                    {slot.time}
                  </span>
                  <span className="text-stone-500 font-medium">({slot.duration})</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 pt-1">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span><strong>Transit:</strong> {convertTextCurrency(slot.transport, currency)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Cost:</strong> {convertTextCurrency(slot.cost, currency)}</span>
                </div>
              </div>

              <div className="text-xs text-stone-600 bg-white p-2 rounded-lg border border-stone-200">
                💡 <strong>Guide Tip:</strong> {slot.tip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
