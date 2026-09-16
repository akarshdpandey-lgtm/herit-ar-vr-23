import React, { useState } from 'react';
import {
  Hotel,
  Star,
  ExternalLink,
  Filter,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  BedDouble,
  ShieldCheck,
  Search
} from 'lucide-react';
import { HotelItem } from '../types';
import { formatPrice, convertTextCurrency } from '../utils/currency';

interface HotelSectionProps {
  hotels: HotelItem[];
  destinationName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
  onUpdateSearchParams: (params: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    rooms?: number;
    minRating?: number;
    maxBudget?: number;
    refundable?: boolean;
  }) => void;
  currency?: string;
}

export const HotelSection: React.FC<HotelSectionProps> = ({
  hotels,
  destinationName,
  checkInDate,
  checkOutDate,
  guests,
  rooms,
  onUpdateSearchParams,
  currency = 'INR',
}) => {
  const [minRating, setMinRating] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(15000);
  const [refundableOnly, setRefundableOnly] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredHotels = hotels.filter((h) => {
    if (minRating > 0 && h.rating < minRating) return false;
    if (maxBudget < 15000 && h.pricePerNight > maxBudget) return false;
    if (refundableOnly && !h.cancellationPolicy.toLowerCase().includes('free')) return false;
    return true;
  });

  const getAvailabilityBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
            Rooms Available
          </span>
        );
      case 'few_left':
      case 'few_rooms_left':
        return (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
            Few Rooms Left
          </span>
        );
      case 'sold_out':
        return (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800">
            Sold Out
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-700">
            Check Live Status
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Hotel className="h-5 w-5 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Hotels & Accommodation in {destinationName}
            </h3>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
              {filteredHotels.length} places
            </span>
          </div>
          <p className="text-xs text-stone-700">
            Public benchmark rates with verified booking links to confirm live checkout pricing.
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
        >
          <Filter className="h-3.5 w-3.5 text-stone-500" />
          <span>Filters</span>
          {(minRating > 0 || maxBudget < 15000 || refundableOnly) && (
            <span className="h-2 w-2 rounded-full bg-amber-600" />
          )}
        </button>
      </div>

      {/* Date & Guest Inputs Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-2xl bg-stone-50 p-3 border border-stone-200 text-xs">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1 mb-1">
            <Calendar className="h-3 w-3" /> Check-in
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => onUpdateSearchParams({ checkIn: e.target.value })}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 text-xs text-stone-900 outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1 mb-1">
            <Calendar className="h-3 w-3" /> Check-out
          </label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => onUpdateSearchParams({ checkOut: e.target.value })}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 text-xs text-stone-900 outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1 mb-1">
            <Users className="h-3 w-3" /> Guests
          </label>
          <select
            value={guests}
            onChange={(e) => onUpdateSearchParams({ guests: Number(e.target.value) })}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 text-xs text-stone-900 outline-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1 mb-1">
            <BedDouble className="h-3 w-3" /> Rooms
          </label>
          <select
            value={rooms}
            onChange={(e) => onUpdateSearchParams({ rooms: Number(e.target.value) })}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 text-xs text-stone-900 outline-none cursor-pointer"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Room' : 'Rooms'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {showFilters && (
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-semibold text-stone-700 block mb-1">Minimum Rating:</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 p-2 text-stone-800 outline-none"
            >
              <option value={0}>Any Rating</option>
              <option value={4.0}>4.0+ Very Good</option>
              <option value={4.5}>4.5+ Excellent</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-stone-700 block mb-1">
              Max Budget / Night (₹{maxBudget}):
            </label>
            <input
              type="range"
              min={1000}
              max={25000}
              step={500}
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-amber-700"
            />
          </div>

          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              id="refundable-toggle"
              checked={refundableOnly}
              onChange={(e) => setRefundableOnly(e.target.checked)}
              className="h-4 w-4 accent-amber-600 rounded cursor-pointer"
            />
            <label htmlFor="refundable-toggle" className="font-semibold text-stone-700 cursor-pointer">
              Free Cancellation Only
            </label>
          </div>
        </div>
      )}

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs hover:border-stone-300 hover:shadow-md transition-all"
          >
            {/* Hotel Photo */}
            {hotel.photoUrl && (
              <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                <img
                  src={hotel.photoUrl}
                  alt={hotel.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/640px-Manali_City.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5">
                  {getAvailabilityBadge(hotel.availabilityStatus)}
                </div>
              </div>
            )}

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                {/* Hotel Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">{hotel.name}</h4>
                    <div className="mt-1 flex items-center gap-1 text-xs">
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{hotel.rating}</span>
                      </div>
                      {hotel.reviewCount && (
                        <span className="text-stone-700 text-[11px]">({hotel.reviewCount} reviews)</span>
                      )}
                    </div>
                  </div>
                  {!hotel.photoUrl && getAvailabilityBadge(hotel.availabilityStatus)}
                </div>

              {/* Room Type & Distance */}
              <div className="mt-3 flex items-center justify-between text-xs text-stone-700">
                <span className="font-medium">{hotel.roomType}</span>
                {hotel.distanceFromCenterKm !== undefined && (
                  <span className="text-[11px] text-stone-700">
                    {hotel.distanceFromCenterKm} km from center
                  </span>
                )}
              </div>

              {/* Price per night */}
              <div className="mt-3 rounded-xl bg-stone-50 p-2.5 border border-stone-100">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-stone-700 font-medium block">Publicly Listed Price</span>
                    <span className="font-serif text-lg font-bold text-stone-900">
                      {formatPrice(hotel.pricePerNight, currency)}
                    </span>
                    <span className="text-[11px] text-stone-700"> / night</span>
                  </div>
                  <span className="rounded bg-white px-2 py-0.5 text-[10px] font-medium text-stone-700 border border-stone-200">
                    {hotel.pricingType === 'public' ? 'Public Listed' : 'Estimated'}
                  </span>
                </div>
                {hotel.taxesAndFees && (
                  <div className="mt-1 text-[10px] text-stone-700">
                    {convertTextCurrency(hotel.taxesAndFees, currency)}
                  </div>
                )}
              </div>

              {/* Amenities */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {hotel.amenities.map((am) => (
                  <span
                    key={am}
                    className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600"
                  >
                    {am}
                  </span>
                ))}
              </div>

              {/* Cancellation Policy */}
              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>{hotel.cancellationPolicy}</span>
              </div>
            </div>

            {/* Direct Booking Link Button */}
            <div className="mt-4 border-t border-stone-100 pt-3 flex items-center justify-between">
              <span className="text-[10px] text-stone-700">Source: {hotel.source}</span>
              <a
                href={hotel.bookingUrl || hotel.officialBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-800 transition-colors cursor-pointer"
              >
                <span>Check latest price</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
