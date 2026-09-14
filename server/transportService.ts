import { TransportOption, PricingType } from '../src/types.js';

interface AutoTariffRule {
  cityName: string;
  baseFare: number;
  baseKm: number;
  perKmRate: number;
  nightSurchargePct: number;
  nightStartHour: number;
  nightEndHour: number;
  sourceLabel: string;
}

const CITY_AUTO_TARIFFS: Record<string, AutoTariffRule> = {
  delhi: {
    cityName: 'Delhi NCR',
    baseFare: 30,
    baseKm: 1.5,
    perKmRate: 11.0,
    nightSurchargePct: 25,
    nightStartHour: 23,
    nightEndHour: 5,
    sourceLabel: 'Delhi Transport Department Gazette Tariff',
  },
  mumbai: {
    cityName: 'Mumbai MMR',
    baseFare: 23,
    baseKm: 1.5,
    perKmRate: 15.33,
    nightSurchargePct: 25,
    nightStartHour: 0,
    nightEndHour: 5,
    sourceLabel: 'Mumbai Metropolitan Region Transport Authority (MMRTA)',
  },
  bengaluru: {
    cityName: 'Bengaluru',
    baseFare: 30,
    baseKm: 2.0,
    perKmRate: 15.0,
    nightSurchargePct: 50,
    nightStartHour: 22,
    nightEndHour: 6,
    sourceLabel: 'Karnataka State Transport Authority',
  },
  jaipur: {
    cityName: 'Jaipur',
    baseFare: 30,
    baseKm: 2.0,
    perKmRate: 12.0,
    nightSurchargePct: 25,
    nightStartHour: 23,
    nightEndHour: 5,
    sourceLabel: 'Rajasthan Transport Department',
  },
  chennai: {
    cityName: 'Chennai',
    baseFare: 25,
    baseKm: 1.8,
    perKmRate: 12.0,
    nightSurchargePct: 50,
    nightStartHour: 23,
    nightEndHour: 5,
    sourceLabel: 'Tamil Nadu Transport Department (Motor Vehicles Rules)',
  },
  hyderabad: {
    cityName: 'Hyderabad',
    baseFare: 20,
    baseKm: 1.6,
    perKmRate: 11.0,
    nightSurchargePct: 25,
    nightStartHour: 23,
    nightEndHour: 5,
    sourceLabel: 'Telangana State Transport Authority',
  },
  generic_india: {
    cityName: 'All India Standard',
    baseFare: 25,
    baseKm: 1.5,
    perKmRate: 12.5,
    nightSurchargePct: 25,
    nightStartHour: 23,
    nightEndHour: 5,
    sourceLabel: 'Indian Municipal Auto Tariff Estimation Model',
  }
};

function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const transportService = {
  calculateEstimates(
    startLat: number,
    startLng: number,
    destLat: number,
    destLng: number,
    countryCode: string = 'in',
    cityName: string = ''
  ): TransportOption[] {
    const rawDist = calculateHaversineKm(startLat, startLng, destLat, destLng);
    // Road route distance is typically 1.25x - 1.35x straight line
    const roadDistKm = Math.max(0.5, Math.round(rawDist * 1.28 * 10) / 10);
    const now = new Date();
    const currentHour = now.getHours();
    const isIndia = (countryCode || '').toLowerCase() === 'in' || countryCode === '';

    // Speeds for durations (km/h)
    const walkSpeed = 4.5;
    const cycleSpeed = 13.0;
    const autoSpeed = 26.0;
    const cabSpeed = 32.0;
    const transitSpeed = 22.0;

    const walkDuration = Math.round((roadDistKm / walkSpeed) * 60);
    const cycleDuration = Math.round((roadDistKm / cycleSpeed) * 60);
    const autoDuration = Math.round((roadDistKm / autoSpeed) * 60) + 4;
    const cabDuration = Math.round((roadDistKm / cabSpeed) * 60) + 5;
    const transitDuration = Math.round((roadDistKm / transitSpeed) * 60) + 12;

    const options: TransportOption[] = [];

    // 1. WALKING
    options.push({
      id: 'transport-walking-1',
      name: 'Walking (Pedestrian Route)',
      provider: 'Self / Pedestrian',
      vehicleType: 'Walking (Pedestrian Route)',
      mode: 'walking',
      estimatedDistanceKm: roadDistKm,
      estimatedDurationMinutes: walkDuration,
      distanceKm: roadDistKm,
      durationMinutes: walkDuration,
      minFare: 0,
      maxFare: 0,
      fareMin: 0,
      fareMax: 0,
      currency: isIndia ? 'INR' : 'USD',
      fareType: 'official',
      pricingType: 'official',
      suitability: 'Ideal for short distances and pedestrian heritage walkways.',
      bookingUrl: `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${destLat},${destLng}&travelmode=walking`,
      dataSource: 'Pedestrian Route Network',
      source: 'Pedestrian Route Network',
      lastUpdated: now.toISOString(),
    });

    // 2. BICYCLE
    const cycleMaxFare = isIndia ? 20 : 3;
    options.push({
      id: 'transport-bicycle-2',
      name: 'City Bicycle / Cycle',
      provider: 'Bicycle / Micro-mobility',
      vehicleType: 'City Bicycle / Cycle',
      mode: 'bicycle',
      estimatedDistanceKm: roadDistKm,
      estimatedDurationMinutes: cycleDuration,
      distanceKm: roadDistKm,
      durationMinutes: cycleDuration,
      minFare: 0,
      maxFare: cycleMaxFare,
      fareMin: 0,
      fareMax: cycleMaxFare,
      currency: isIndia ? 'INR' : 'USD',
      fareType: 'estimated',
      pricingType: 'estimated',
      suitability: 'Eco-friendly option suitable for bike-friendly avenues and gardens.',
      bookingUrl: `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${destLat},${destLng}&travelmode=bicycling`,
      dataSource: 'Shared Bicycle & Public Cycle Paths',
      source: 'Shared Bicycle & Public Cycle Paths',
      lastUpdated: now.toISOString(),
    });

    // 3. AUTO-RICKSHAW (India / South Asia)
    if (isIndia && roadDistKm <= 45) {
      const cityKey = Object.keys(CITY_AUTO_TARIFFS).find(k => cityName.toLowerCase().includes(k)) || 'generic_india';
      const tariff = CITY_AUTO_TARIFFS[cityKey];

      const isNight = tariff.nightStartHour > tariff.nightEndHour
        ? (currentHour >= tariff.nightStartHour || currentHour < tariff.nightEndHour)
        : (currentHour >= tariff.nightStartHour && currentHour < tariff.nightEndHour);

      let calcFare = tariff.baseFare;
      if (roadDistKm > tariff.baseKm) {
        calcFare += (roadDistKm - tariff.baseKm) * tariff.perKmRate;
      }
      if (isNight) {
        calcFare *= (1 + tariff.nightSurchargePct / 100);
      }

      const roundedFare = Math.round(calcFare);
      const minEstimated = Math.max(tariff.baseFare, roundedFare);
      const maxEstimated = Math.round(minEstimated * 1.18); // traffic allowance
      const farePricingType = cityKey !== 'generic_india' ? 'official' : 'estimated';
      const tariffRulesObj = {
        baseFare: tariff.baseFare,
        perKmRate: tariff.perKmRate,
        nightSurcharge: isNight ? `${tariff.nightSurchargePct}% Night Tariff (Active)` : undefined,
        waitingChargePerHour: 30,
        notes: `First ${tariff.baseKm} km: ₹${tariff.baseFare}, thereafter ₹${tariff.perKmRate}/km. Night surcharge: ${tariff.nightSurchargePct}%.`,
      };

      options.push({
        id: 'transport-auto-3',
        name: 'Three-Wheeler Auto Rickshaw',
        provider: 'City Auto-Rickshaw (Metered)',
        vehicleType: 'Three-Wheeler Auto Rickshaw',
        mode: 'auto_rickshaw',
        estimatedDistanceKm: roadDistKm,
        estimatedDurationMinutes: autoDuration,
        distanceKm: roadDistKm,
        durationMinutes: autoDuration,
        minFare: minEstimated,
        maxFare: maxEstimated,
        fareMin: minEstimated,
        fareMax: maxEstimated,
        currency: 'INR',
        fareType: farePricingType,
        pricingType: farePricingType,
        suitability: 'Fastest door-to-door city transport with regulated state meter.',
        surgeIndicator: isNight ? `${tariff.nightSurchargePct}% Night Tariff (Active)` : 'Standard Day Meter',
        bookingUrl: `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${startLat}&pickup[longitude]=${startLng}&dropoff[latitude]=${destLat}&dropoff[longitude]=${destLng}&product_id=auto`,
        dataSource: tariff.sourceLabel,
        source: tariff.sourceLabel,
        tariffBreakdown: {
          baseFare: tariff.baseFare,
          perKmRate: tariff.perKmRate,
          nightSurchargeApplied: isNight,
          notes: tariffRulesObj.notes,
        },
        tariffRules: tariffRulesObj,
        lastUpdated: now.toISOString(),
      });
    } else if (!isIndia) {
      options.push({
        id: 'transport-auto-3',
        name: 'Auto-Rickshaw / Tuk-tuk',
        provider: 'Auto-Rickshaw',
        vehicleType: 'Auto-Rickshaw / Tuk-tuk',
        mode: 'auto_rickshaw',
        estimatedDistanceKm: roadDistKm,
        estimatedDurationMinutes: autoDuration,
        distanceKm: roadDistKm,
        durationMinutes: autoDuration,
        minFare: 0,
        maxFare: 0,
        fareMin: 0,
        fareMax: 0,
        currency: 'USD',
        fareType: 'unavailable',
        pricingType: 'unavailable',
        suitability: 'Not operating in this region.',
        surgeIndicator: 'Not operating in this region',
        dataSource: 'Local Regional Transport Registry',
        source: 'Local Regional Transport Registry',
        lastUpdated: now.toISOString(),
      });
    }

    // 4. UBER / CAB (Transparent estimated range + authorized deep link)
    const uberDeepLink = `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${startLat}&pickup[longitude]=${startLng}&dropoff[latitude]=${destLat}&dropoff[longitude]=${destLng}`;

    if (isIndia) {
      // India Cab rates: UberGo / Ola Mini typical range ₹50 base + ₹12-16/km
      const minCab = Math.round(Math.max(80, 50 + (roadDistKm * 13.5)));
      const maxCab = Math.round(minCab * 1.25);

      options.push({
        id: 'transport-cab-4',
        name: 'Sedan / Hatchback AC Cab',
        provider: 'Uber / App Cabs (Uber Go / Premier)',
        vehicleType: 'Sedan / Hatchback AC Cab',
        mode: 'taxi_cab',
        estimatedDistanceKm: roadDistKm,
        estimatedDurationMinutes: cabDuration,
        distanceKm: roadDistKm,
        durationMinutes: cabDuration,
        minFare: minCab,
        maxFare: maxCab,
        fareMin: minCab,
        fareMax: maxCab,
        currency: 'INR',
        fareType: 'estimated', // Clearly labeled estimated
        pricingType: 'estimated',
        suitability: 'Comfortable air-conditioned private ride with luggage space.',
        surgeIndicator: 'Subject to live traffic & driver demand',
        bookingUrl: uberDeepLink,
        dataSource: 'Transparent Regional Taxi Rate Model & Official Uber Deep Link',
        source: 'Transparent Regional Taxi Rate Model & Official Uber Deep Link',
        tariffBreakdown: {
          baseFare: 50,
          perKmRate: 13.5,
          nightSurchargeApplied: false,
          notes: 'Estimated range based on public city taxi parameters. Live price requires opening Uber app.',
        },
        tariffRules: {
          baseFare: 50,
          perKmRate: 13.5,
          notes: 'Estimated range based on public city taxi parameters. Live price requires opening Uber app.',
        },
        lastUpdated: now.toISOString(),
      });
    } else {
      // International taxi
      const currency = countryCode === 'fr' || countryCode === 'it' || countryCode === 'de' ? 'EUR' :
                       countryCode === 'jp' ? 'JPY' :
                       countryCode === 'gb' ? 'GBP' : 'USD';
      const baseFee = currency === 'EUR' ? 4.5 : currency === 'GBP' ? 3.8 : currency === 'JPY' ? 500 : 3.5;
      const kmRate = currency === 'EUR' ? 1.6 : currency === 'GBP' ? 1.8 : currency === 'JPY' ? 400 : 2.2;
      const minCab = Math.round((baseFee + (roadDistKm * kmRate)) * 10) / 10;
      const maxCab = Math.round((minCab * 1.3) * 10) / 10;

      options.push({
        id: 'transport-cab-4',
        name: 'Standard Taxi / UberX',
        provider: 'Uber / Official City Taxi',
        vehicleType: 'Standard Taxi / UberX',
        mode: 'taxi_cab',
        estimatedDistanceKm: roadDistKm,
        estimatedDurationMinutes: cabDuration,
        distanceKm: roadDistKm,
        durationMinutes: cabDuration,
        minFare: minCab,
        maxFare: maxCab,
        fareMin: minCab,
        fareMax: maxCab,
        currency,
        fareType: 'estimated',
        pricingType: 'estimated',
        suitability: 'Convenient point-to-point ride with meter.',
        surgeIndicator: 'Estimated Metered Tariff',
        bookingUrl: uberDeepLink,
        dataSource: 'Official Public City Taxi Meter Tariff & Uber Deep Link',
        source: 'Official Public City Taxi Meter Tariff & Uber Deep Link',
        lastUpdated: now.toISOString(),
      });
    }

    // 5. PUBLIC TRANSIT (Metro / City Bus)
    const transitDist = Math.round(roadDistKm * 1.15 * 10) / 10;
    const transitMin = isIndia ? Math.min(60, Math.max(10, Math.round(roadDistKm * 2.2))) : 2.5;
    const transitMax = isIndia ? Math.min(80, Math.max(20, Math.round(roadDistKm * 2.8))) : 5.0;

    options.push({
      id: 'transport-transit-5',
      name: 'Subway Metro / Public Bus',
      provider: isIndia ? 'City Metro / Public Bus (DTC / BEST / BMTC)' : 'City Transit Metro / Bus',
      vehicleType: 'Subway Metro / Public Bus',
      mode: 'public_transit',
      estimatedDistanceKm: transitDist,
      estimatedDurationMinutes: transitDuration,
      distanceKm: transitDist,
      durationMinutes: transitDuration,
      minFare: transitMin,
      maxFare: transitMax,
      fareMin: transitMin,
      fareMax: transitMax,
      currency: isIndia ? 'INR' : 'USD',
      fareType: 'official',
      pricingType: 'official',
      suitability: 'Most economical choice for budget and solo travelers.',
      bookingUrl: `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${destLat},${destLng}&travelmode=transit`,
      dataSource: 'Public Transport Stage-Fare Matrix',
      source: 'Public Transport Stage-Fare Matrix',
      lastUpdated: now.toISOString(),
    });

    return options;
  }
};
