import React, { useState } from 'react';
import {
  Clock,
  Compass,
  Accessibility,
  Heart,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  XCircle,
  Sparkles,
  Ticket
} from 'lucide-react';
import { AttractionItem } from '../types';
import { formatPrice } from '../utils/currency';
import { getAuthenticMonumentPhoto, handleMonumentImageError } from '../utils/monumentImages';

interface AttractionCardProps {
  attraction: AttractionItem;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  isLiked?: boolean;
  isSaved?: boolean;
  currency?: string;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({
  attraction,
  onLike,
  onSave,
  onReject,
  isLiked = false,
  isSaved = false,
  currency = 'INR',
}) => {
  const [showTaxonomy, setShowTaxonomy] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const photo = attraction.photos && attraction.photos.length > 0 ? attraction.photos[0] : null;
  const tax = attraction.taxonomy;

  const REJECT_REASONS = [
    { key: 'too_far', label: 'Too far away' },
    { key: 'too_expensive', label: 'Too expensive' },
    { key: 'already_visited', label: 'Already visited' },
    { key: 'not_interested', label: 'Not interested in this category' },
    { key: 'inaccessible', label: 'Not accessible for my mobility' },
  ];

  return (
    <div className="relative flex flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-xs hover:border-stone-300 hover:shadow-md transition-all">
      {/* Top Tag & Recommendation Reason */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-700">
          {attraction.category}
        </span>

        {attraction.score !== undefined && (
          <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900">
            <Sparkles className="h-3 w-3 text-amber-700" />
            {attraction.score}% match
          </span>
        )}
      </div>

      {/* Primary recommendation explanation */}
      {attraction.recommendationReason && (
        <div className="mb-3 rounded-xl bg-amber-50/80 px-3 py-1.5 text-[11px] font-medium text-amber-900 border border-amber-200/60">
          💡 {attraction.recommendationReason}
        </div>
      )}

      {/* Title & Photo Row */}
      <div className="flex gap-3.5 items-start">
        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-stone-100 border border-stone-200 shadow-2xs group">
          <img
            src={getAuthenticMonumentPhoto(attraction.name, attraction.category, photo?.thumbnailUrl || photo?.url)}
            alt={attraction.name}
            onError={(e) => {
              handleMonumentImageError(e, attraction.name, attraction.category);
            }}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {photo?.source && (
            <div className="absolute bottom-0 inset-x-0 bg-black/60 px-1 py-0.5 text-[9px] text-white/90 truncate text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {photo.source}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-base font-bold text-stone-900 leading-snug">{attraction.name}</h4>
          <p className="text-xs text-stone-700 line-clamp-2 mt-1">{attraction.shortDescription}</p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-stone-700">
            {attraction.distanceKm !== undefined && (
              <span className="font-semibold text-amber-800">
                {attraction.distanceKm} km from center
              </span>
            )}
            {tax?.estimatedDurationMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-stone-600" />
                ~{tax.estimatedDurationMinutes} min
              </span>
            )}
            {tax?.wheelchairSuitability && (
              <span className="flex items-center gap-0.5 text-emerald-700 font-medium">
                <Accessibility className="h-3.5 w-3.5" />
                Wheelchair Accessible
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Price & Opening Hours */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs">
        <div className="flex items-center gap-2">
          {attraction.ticketPrice ? (
            <div className="flex items-center gap-1.5">
              <Ticket className="h-3.5 w-3.5 text-amber-700" />
              <span className="font-bold text-stone-900">
                {formatPrice(attraction.ticketPrice.amount, currency)}
              </span>
              <span className="rounded bg-stone-100 px-1.5 py-0.2 text-[10px] text-stone-600 capitalize">
                {attraction.ticketPrice.pricingType}
              </span>
            </div>
          ) : (
            <span className="text-stone-600 text-[11px]">Free / Public Monument</span>
          )}

          {attraction.openingHours && (
            <span className="text-[11px] text-stone-700 hidden sm:inline">
              • {attraction.openingHours}
            </span>
          )}
        </div>

        {/* Action Buttons: Like, Save, Reject, Directions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onLike(attraction.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLiked ? 'text-red-600 bg-red-50' : 'text-stone-600 hover:text-red-600 hover:bg-stone-50'
            }`}
            title="Like attraction"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => onSave(attraction.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isSaved ? 'text-amber-600 bg-amber-50' : 'text-stone-600 hover:text-amber-600 hover:bg-stone-50'
            }`}
            title="Save to Wishlist"
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setShowRejectModal(true)}
            className="p-1.5 rounded-lg text-stone-600 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Dismiss / Reject Recommendation"
          >
            <XCircle className="h-4 w-4" />
          </button>

          <a
            href={attraction.directionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-stone-900 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-stone-800 transition-colors ml-1"
          >
            <Compass className="h-3 w-3" />
            <span>Directions</span>
          </a>
        </div>
      </div>

      {/* Expandable Taxonomy Details */}
      {tax && (
        <div className="mt-2 border-t border-stone-100 pt-2">
          <button
            type="button"
            onClick={() => setShowTaxonomy(!showTaxonomy)}
            className="flex items-center justify-between w-full text-[11px] font-medium text-stone-700 hover:text-stone-900 cursor-pointer"
          >
            <span>Cultural Taxonomy & Accessibility Notes</span>
            {showTaxonomy ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showTaxonomy && (
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-stone-50 p-2.5 text-[11px] text-stone-700 border border-stone-200/60">
              {tax.era && (
                <div>
                  <span className="font-semibold text-stone-800">Era:</span> {tax.era}
                </div>
              )}
              {tax.architecturalStyle && (
                <div>
                  <span className="font-semibold text-stone-800">Architecture:</span> {tax.architecturalStyle}
                </div>
              )}
              {tax.walkingDistanceMeters && (
                <div>
                  <span className="font-semibold text-stone-800">Walking:</span> ~{tax.walkingDistanceMeters}m inside
                </div>
              )}
              {tax.bestVisitingTime && (
                <div>
                  <span className="font-semibold text-stone-800">Best Time:</span> {tax.bestVisitingTime}
                </div>
              )}
              {tax.accessibility && (
                <div className="col-span-2">
                  <span className="font-semibold text-stone-800">Accessibility:</span>{' '}
                  <span className={tax.accessibility === 'verified_accessible' ? 'text-emerald-700 font-semibold' : 'text-stone-700'}>
                    {tax.accessibility.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Reject Reason Popover Modal */}
      {showRejectModal && (
        <div className="absolute inset-0 z-20 flex flex-col justify-center rounded-2xl bg-white/95 p-4 backdrop-blur-xs border border-stone-300 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-semibold text-xs text-stone-900">Why reject this recommendation?</h5>
            <button
              onClick={() => setShowRejectModal(false)}
              className="text-stone-600 hover:text-stone-800 text-xs font-bold"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-stone-700 mb-2">This tunes recommendations in your current session.</p>
          <div className="space-y-1.5">
            {REJECT_REASONS.map((r) => (
              <button
                key={r.key}
                onClick={() => {
                  onReject(attraction.id, r.key);
                  setShowRejectModal(false);
                }}
                className="w-full text-left rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs text-stone-800 hover:bg-amber-50 hover:border-amber-300 transition-colors"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
