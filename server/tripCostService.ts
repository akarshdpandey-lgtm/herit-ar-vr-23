import { TripCostBreakdown, PricingType } from '../src/types.js';
import { currencyService } from './currencyService.js';

interface TripCostInput {
  travellers: number;
  days: number;
  hotelNights: number;
  hotelPricePerNightMin: number;
  hotelPricePerNightMax: number;
  transportFareMin: number;
  transportFareMax: number;
  transportRoundsPerDay?: number;
  foodBudgetPerPersonPerDay: number;
  entryTicketBudget: number;
  miscBudget: number;
  baseCurrency?: string;
  targetCurrency?: string;
}

export const tripCostService = {
  calculate(input: TripCostInput): TripCostBreakdown {
    const travellers = Math.max(1, Number(input.travellers) || 1);
    const days = Math.max(1, Number(input.days) || 1);
    const hotelNights = Math.max(0, input.hotelNights !== undefined ? Number(input.hotelNights) : Math.max(0, days - 1));
    const rounds = Number(input.transportRoundsPerDay) || 2; // e.g. 2 trips/day

    // 1. Transport cost (all travellers, over the days)
    // Note: cab/auto typically shared up to 3-4 pax
    const transportVehiclesNeeded = Math.ceil(travellers / 3.5);
    const transportFareMin = Number.isFinite(input.transportFareMin) ? input.transportFareMin : 150;
    const transportFareMax = Number.isFinite(input.transportFareMax) ? input.transportFareMax : 450;
    const transportTotalMin = Math.round(transportFareMin * rounds * days * transportVehiclesNeeded);
    const transportTotalMax = Math.round(transportFareMax * rounds * days * transportVehiclesNeeded);

    // 2. Hotel rooms needed (approx 2 guests per room)
    const roomsNeeded = Math.ceil(travellers / 2);
    const hotelPriceMin = Number.isFinite(input.hotelPricePerNightMin) ? input.hotelPricePerNightMin : 2500;
    const hotelPriceMax = Number.isFinite(input.hotelPricePerNightMax) ? input.hotelPricePerNightMax : 4500;
    const hotelTotalMin = Math.round(hotelPriceMin * hotelNights * roomsNeeded);
    const hotelTotalMax = Math.round(hotelPriceMax * hotelNights * roomsNeeded);

    // 3. Food total
    const foodBudgetPerPerson = Number.isFinite(input.foodBudgetPerPersonPerDay) ? input.foodBudgetPerPersonPerDay : 600;
    const foodBudgetTotal = Math.round(foodBudgetPerPerson * travellers * days);

    // 4. Tickets total
    const entryTicketBudget = Number.isFinite(input.entryTicketBudget) ? input.entryTicketBudget : 400;
    const ticketsTotal = Math.round(entryTicketBudget * travellers);

    // 5. Misc total
    const miscBudget = Number.isFinite(input.miscBudget) ? input.miscBudget : 500;
    const miscBudgetTotal = Math.round(miscBudget);

    // Grand totals
    const grandTotalMin = (transportTotalMin || 0) + (hotelTotalMin || 0) + (foodBudgetTotal || 0) + (ticketsTotal || 0) + (miscBudgetTotal || 0);
    const grandTotalMax = (transportTotalMax || 0) + (hotelTotalMax || 0) + (foodBudgetTotal || 0) + (ticketsTotal || 0) + (miscBudgetTotal || 0);

    const baseCurrency = input.baseCurrency || 'INR';
    const targetCurrency = input.targetCurrency || 'USD';

    let convertedTotalMin: number | undefined;
    let convertedTotalMax: number | undefined;
    let exchangeRate: number | undefined;
    let exchangeRateTimestamp: string | undefined;

    if (targetCurrency && targetCurrency !== baseCurrency) {
      const convMin = currencyService.convert(grandTotalMin, baseCurrency, targetCurrency);
      const convMax = currencyService.convert(grandTotalMax, baseCurrency, targetCurrency);
      convertedTotalMin = convMin.convertedAmount;
      convertedTotalMax = convMax.convertedAmount;
      exchangeRate = convMin.rate;
      exchangeRateTimestamp = convMin.timestamp;
    }

    const pricingStatus: PricingType = (hotelTotalMin > 0 && transportFareMin > 0) ? 'estimated' : 'estimated';

    return {
      travellers,
      days,
      hotelNights,
      transportTotalMin,
      transportTotalMax,
      hotelTotalMin,
      hotelTotalMax,
      foodBudgetTotal,
      ticketsTotal,
      miscBudgetTotal,
      grandTotalMin,
      grandTotalMax,
      currency: baseCurrency,
      convertedTotalMin,
      convertedTotalMax,
      targetCurrency,
      exchangeRate,
      exchangeRateTimestamp,
      pricingStatus,
    };
  }
};
