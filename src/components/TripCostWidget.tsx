import React, { useState, useEffect } from 'react';
import { Calculator, Users, Calendar, DollarSign, ArrowRight, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { TripCostBreakdown, TransportOption, HotelItem } from '../types';
import { formatPrice } from '../utils/currency';

interface TripCostWidgetProps {
  selectedTransport: TransportOption | null;
  selectedHotel: HotelItem | null;
  targetCurrency: string;
}

export const TripCostWidget: React.FC<TripCostWidgetProps> = ({
  selectedTransport,
  selectedHotel,
  targetCurrency,
}) => {
  const [travellers, setTravellers] = useState(2);
  const [days, setDays] = useState(2);
  const [hotelNights, setHotelNights] = useState(1);
  const [foodPerPersonPerDay, setFoodPerPersonPerDay] = useState(600);
  const [entryTicketBudget, setEntryTicketBudget] = useState(400);
  const [miscBudget, setMiscBudget] = useState(500);
  const [breakdown, setBreakdown] = useState<TripCostBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Recalculate whenever inputs or selected transport/hotel change
  useEffect(() => {
    const fetchCost = async () => {
      setIsCalculating(true);
      try {
        const transportMin = selectedTransport
          ? (selectedTransport.fareMin !== undefined
              ? selectedTransport.fareMin
              : (selectedTransport.minFare !== undefined ? selectedTransport.minFare : 150))
          : 150;
        const transportMax = selectedTransport
          ? (selectedTransport.fareMax !== undefined
              ? selectedTransport.fareMax
              : (selectedTransport.maxFare !== undefined ? selectedTransport.maxFare : 450))
          : 450;
        const hotelMin = selectedHotel ? (Number(selectedHotel.pricePerNight) || 2500) : 2500;
        const hotelMax = selectedHotel ? Math.round((Number(selectedHotel.pricePerNight) || 4500) * 1.15) : 4500;

        const payload = {
          travellers,
          days,
          hotelNights,
          hotelPricePerNightMin: hotelMin,
          hotelPricePerNightMax: hotelMax,
          transportFareMin: transportMin,
          transportFareMax: transportMax,
          transportRoundsPerDay: 2,
          foodBudgetPerPersonPerDay: foodPerPersonPerDay,
          entryTicketBudget: entryTicketBudget,
          miscBudget: miscBudget,
          baseCurrency: 'INR',
          targetCurrency: targetCurrency,
        };

        const res = await fetch('/api/trips/calculate-cost', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          setBreakdown(json.data);
        }
      } catch (err) {
        console.error('Failed to calculate trip cost', err);
      } finally {
        setIsCalculating(false);
      }
    };

    fetchCost();
  }, [
    travellers,
    days,
    hotelNights,
    foodPerPersonPerDay,
    entryTicketBudget,
    miscBudget,
    selectedTransport,
    selectedHotel,
    targetCurrency,
  ]);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-900">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-stone-900">
              Total Trip Cost Estimation & Budget Calculator
            </h3>
            <p className="text-xs text-stone-700">
              Transparent rollup of transport, accommodation, meals, tickets, and exchange conversion.
            </p>
          </div>
        </div>
      </div>

      {/* Input Adjusters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 rounded-xl bg-stone-50 p-3 border border-stone-100 text-xs">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 block mb-1">
            Travellers
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={travellers}
            onChange={(e) => setTravellers(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 font-bold text-stone-900 outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 block mb-1">
            Days
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => {
              const d = Math.max(1, Number(e.target.value));
              setDays(d);
              setHotelNights(Math.max(0, d - 1));
            }}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 font-bold text-stone-900 outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 block mb-1">
            Hotel Nights
          </label>
          <input
            type="number"
            min={0}
            max={30}
            value={hotelNights}
            onChange={(e) => setHotelNights(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 font-bold text-stone-900 outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 block mb-1">
            Food/Day/Person
          </label>
          <input
            type="number"
            step={50}
            min={100}
            value={foodPerPersonPerDay}
            onChange={(e) => setFoodPerPersonPerDay(Number(e.target.value))}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 font-bold text-stone-900 outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 block mb-1">
            Tickets Budget
          </label>
          <input
            type="number"
            step={50}
            min={0}
            value={entryTicketBudget}
            onChange={(e) => setEntryTicketBudget(Number(e.target.value))}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 font-bold text-stone-900 outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 block mb-1">
            Misc / Contingency
          </label>
          <input
            type="number"
            step={100}
            min={0}
            value={miscBudget}
            onChange={(e) => setMiscBudget(Number(e.target.value))}
            className="w-full rounded-lg border border-stone-200 bg-white p-1.5 font-bold text-stone-900 outline-none"
          />
        </div>
      </div>

      {/* Grand Total Summary Display */}
      {breakdown && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-amber-200/60 pb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 block">
                Estimated Total Trip Budget ({breakdown.travellers} {breakdown.travellers === 1 ? 'traveler' : 'travelers'}, {breakdown.days} {breakdown.days === 1 ? 'day' : 'days'})
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {formatPrice(breakdown.grandTotalMin, targetCurrency)} – {formatPrice(breakdown.grandTotalMax, targetCurrency)}
                </span>
                <span className="rounded-md bg-amber-200 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                  Estimated Range
                </span>
              </div>
            </div>

            {/* Currency Converted Output / Base Reference */}
            {targetCurrency !== 'INR' && (
              <div className="rounded-lg bg-white p-2.5 border border-stone-200 text-right">
                <span className="text-[10px] font-semibold uppercase text-stone-700 block">
                  Base in Indian Rupee (INR)
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-stone-800 block">
                  ₹{(breakdown.grandTotalMin ?? 0).toLocaleString()} – ₹{(breakdown.grandTotalMax ?? 0).toLocaleString()}
                </span>
                {breakdown.exchangeRate && (
                  <span className="text-[9px] text-stone-600 block mt-0.5">
                    1 {targetCurrency} ≈ ₹{Math.round(1 / breakdown.exchangeRate)} (Live benchmark)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Breakdown Items List */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <div className="rounded-lg bg-white p-2 border border-stone-100">
              <span className="text-stone-700 block text-[11px]">
                Transport ({selectedTransport ? (selectedTransport.name || selectedTransport.vehicleType || selectedTransport.provider) : 'Local'})
              </span>
              <span className="font-bold text-stone-900">
                {formatPrice(breakdown.transportTotalMin, targetCurrency)} – {formatPrice(breakdown.transportTotalMax, targetCurrency)}
              </span>
            </div>

            <div className="rounded-lg bg-white p-2 border border-stone-100">
              <span className="text-stone-700 block text-[11px]">Hotels ({breakdown.hotelNights} {breakdown.hotelNights === 1 ? 'night' : 'nights'})</span>
              <span className="font-bold text-stone-900">
                {formatPrice(breakdown.hotelTotalMin, targetCurrency)} – {formatPrice(breakdown.hotelTotalMax, targetCurrency)}
              </span>
            </div>

            <div className="rounded-lg bg-white p-2 border border-stone-100">
              <span className="text-stone-700 block text-[11px]">Food & Dining</span>
              <span className="font-bold text-stone-900">
                {formatPrice(breakdown.foodBudgetTotal, targetCurrency)}
              </span>
            </div>

            <div className="rounded-lg bg-white p-2 border border-stone-100">
              <span className="text-stone-700 block text-[11px]">Entry Tickets</span>
              <span className="font-bold text-stone-900">
                {formatPrice(breakdown.ticketsTotal, targetCurrency)}
              </span>
            </div>

            <div className="rounded-lg bg-white p-2 border border-stone-100">
              <span className="text-stone-700 block text-[11px]">Miscellaneous</span>
              <span className="font-bold text-stone-900">
                {formatPrice(breakdown.miscBudgetTotal, targetCurrency)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
