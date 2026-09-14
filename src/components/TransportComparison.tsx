import React, { useState } from 'react';
import {
  Car,
  Footprints,
  Bike,
  Navigation,
  Train,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { TransportOption } from '../types';
import { formatPrice } from '../utils/currency';

interface TransportComparisonProps {
  options: TransportOption[];
  originName: string;
  destinationName: string;
  selectedOption?: TransportOption | null;
  onSelectOption?: (opt: TransportOption) => void;
  currency?: string;
}

export const TransportComparison: React.FC<TransportComparisonProps> = ({
  options,
  originName,
  destinationName,
  selectedOption,
  onSelectOption,
  currency = 'INR',
}) => {
  const [expandedTariffId, setExpandedTariffId] = useState<string | null>(null);

  if (!options || options.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 p-6 text-center text-xs text-stone-700">
        Select a starting point and destination to view real-time distance and transport comparisons.
      </div>
    );
  }

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'walking':
        return <Footprints className="h-5 w-5 text-emerald-600" />;
      case 'bicycle':
        return <Bike className="h-5 w-5 text-teal-600" />;
      case 'auto':
      case 'auto_rickshaw':
        return <Navigation className="h-5 w-5 text-amber-600" />;
      case 'cab':
      case 'taxi_cab':
      case 'uber':
        return <Car className="h-5 w-5 text-indigo-600" />;
      case 'public_transit':
        return <Train className="h-5 w-5 text-blue-600" />;
      default:
        return <Car className="h-5 w-5 text-stone-600" />;
    }
  };

  const getPricingBadge = (pricingType: string) => {
    switch (pricingType) {
      case 'official':
        return (
          <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
            Govt Tariff
          </span>
        );
      case 'estimated':
        return (
          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
            Estimated Range
          </span>
        );
      case 'unavailable':
        return (
          <span className="rounded-md bg-stone-200 px-2 py-0.5 text-[10px] font-bold text-stone-700">
            Unavailable
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Transport & Route Comparison
          </h3>
          <p className="text-xs text-stone-700">
            From <span className="font-semibold text-stone-800">{originName}</span> to{' '}
            <span className="font-semibold text-stone-800">{destinationName}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-stone-700">
          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
          <span>Fares vary with live traffic & surcharges</span>
        </div>
      </div>

      {/* Transport Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((opt, idx) => {
          const optId = opt.id || `transport-opt-${opt.mode || 'mode'}-${idx}`;
          const isExpanded = expandedTariffId === optId;
          const name = opt.name || opt.vehicleType || opt.provider;
          const pricingType = opt.pricingType || opt.fareType || 'estimated';
          const distanceKm = opt.distanceKm ?? opt.estimatedDistanceKm ?? 0;
          const durationMinutes = opt.durationMinutes ?? opt.estimatedDurationMinutes ?? 0;
          const fareMin = opt.fareMin ?? opt.minFare ?? 0;
          const fareMax = opt.fareMax ?? opt.maxFare ?? 0;
          const tariffRules = opt.tariffRules || (opt.tariffBreakdown ? {
            baseFare: opt.tariffBreakdown.baseFare,
            perKmRate: opt.tariffBreakdown.perKmRate,
            notes: opt.tariffBreakdown.notes,
          } : undefined);
          const source = opt.source || opt.dataSource || 'Transport Registry';
          const isSelected = selectedOption && (
            (selectedOption.id && selectedOption.id === opt.id) ||
            selectedOption.mode === opt.mode
          );

          return (
            <div
              key={optId}
              className={`flex flex-col justify-between rounded-2xl border bg-white p-4 transition-all ${
                isSelected
                  ? 'border-amber-500 shadow-md ring-2 ring-amber-400/40 bg-amber-50/20'
                  : opt.mode === 'auto' || opt.mode === 'auto_rickshaw'
                  ? 'border-amber-300 shadow-xs ring-1 ring-amber-400/20'
                  : 'border-stone-200 shadow-xs hover:border-stone-300'
              }`}
            >
              <div>
                {/* Mode Title & Pricing Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100">
                      {getModeIcon(opt.mode)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">{name}</h4>
                      <span className="text-[11px] text-stone-700">{opt.provider}</span>
                    </div>
                  </div>
                  {getPricingBadge(pricingType)}
                </div>

                {/* Distance & Time Metrics */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-stone-50 p-2.5 text-xs text-stone-700">
                  <div className="flex items-center gap-1">
                    <Navigation className="h-3.5 w-3.5 text-stone-600" />
                    <span className="font-semibold">{distanceKm} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-stone-600" />
                    <span className="font-semibold">~{durationMinutes} min</span>
                  </div>
                </div>

                {/* Fare Summary */}
                <div className="mt-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 block">
                    Estimated Cost
                  </span>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    {fareMin === 0 && fareMax === 0 ? (
                      <span className="font-serif text-xl font-bold text-emerald-700">Free</span>
                    ) : (
                      <>
                        <span className="font-serif text-xl font-bold text-stone-900">
                          {formatPrice(fareMin, currency)}
                        </span>
                        {fareMax > fareMin && (
                          <span className="font-serif text-lg font-bold text-stone-600">
                            – {formatPrice(fareMax, currency)}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Suitability Note */}
                {opt.suitability && (
                  <p className="mt-2 text-[11px] text-stone-700 leading-snug">
                    {opt.suitability}
                  </p>
                )}

                {/* Night Surcharge Notice if any */}
                {(tariffRules?.nightSurcharge || opt.surgeIndicator) && (
                  <div className="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-[10px] text-amber-900 border border-amber-200">
                    🌙 {tariffRules?.nightSurcharge || opt.surgeIndicator}
                  </div>
                )}
              </div>

              {/* Card Footer: Booking / Deep link + Selection + Breakdown toggle */}
              <div className="mt-4 border-t border-stone-100 pt-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  {opt.bookingUrl ? (
                    <a
                      href={opt.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-stone-800 transition-colors"
                    >
                      <span>Open in {opt.provider.split(' ')[0]}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-stone-600">Standard direct hire</span>
                  )}

                  {onSelectOption && (
                    <button
                      type="button"
                      onClick={() => onSelectOption(opt)}
                      className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : 'Use in Plan'}
                    </button>
                  )}
                </div>

                {tariffRules && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setExpandedTariffId(isExpanded ? null : optId)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                    >
                      <span>Tariff rules</span>
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  </div>
                )}

                {/* Tariff Formula Expansion */}
                {isExpanded && tariffRules && (
                  <div className="rounded-xl bg-stone-50 p-2.5 text-[11px] text-stone-700 space-y-1 border border-stone-200">
                    <div className="font-semibold text-stone-900 border-b border-stone-200 pb-1">
                      Tariff Breakdown
                    </div>
                    {tariffRules.baseFare !== undefined && (
                      <div className="flex justify-between">
                        <span>Base Fare:</span>
                        <span className="font-semibold">{formatPrice(tariffRules.baseFare, currency)}</span>
                      </div>
                    )}
                    {tariffRules.perKmRate !== undefined && (
                      <div className="flex justify-between">
                        <span>Rate per km:</span>
                        <span className="font-semibold">{formatPrice(tariffRules.perKmRate, currency)}/km</span>
                      </div>
                    )}
                    {tariffRules.waitingChargePerHour !== undefined && (
                      <div className="flex justify-between">
                        <span>Waiting charge:</span>
                        <span className="font-semibold">{formatPrice(tariffRules.waitingChargePerHour, currency)}/hr</span>
                      </div>
                    )}
                    {tariffRules.notes && (
                      <div className="text-[10px] text-stone-700 pt-1">
                        {tariffRules.notes}
                      </div>
                    )}
                    <div className="text-[10px] text-stone-700 mt-1 italic">
                      Source: {source} ({new Date(opt.lastUpdated).toLocaleDateString()})
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
