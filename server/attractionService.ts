import { AttractionItem } from '../src/types.js';
import { photoService } from './photoService.js';
import { CURATED_TEMPLES } from './curatedData/temples.js';
import { CURATED_MUSEUMS } from './curatedData/museums.js';
import { CURATED_MONUMENTS } from './curatedData/monuments.js';
import { CURATED_LANDMARKS } from './curatedData/landmarks.js';

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Curated verified heritage & top attractions database with rich taxonomy
const CURATED_ATTRACTIONS: AttractionItem[] = [
  // 1. Agra / Taj Mahal area
  {
    id: 'attr-taj-mahal',
    name: 'Taj Mahal',
    category: 'Mausoleum & UNESCO World Heritage',
    lat: 27.1751448,
    lng: 78.0421422,
    address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001',
    shortDescription: 'An ivory-white marble mausoleum on the south bank of Yamuna river, commissioned by Mughal emperor Shah Jahan in 1631.',
    photos: [
      {
        id: 'p-taj-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/400px-Taj_Mahal_%28Edited%29.jpeg',
        title: 'Taj Mahal ivory marble dome and reflecting pond',
        author: 'Muhammad Mahdi Karim',
        license: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: 'Sunrise to Sunset (Closed Fridays)',
    officialWebsite: 'https://www.tajmahal.gov.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.1751448,78.0421422',
    ticketPrice: {
      amount: 50,
      currency: 'INR',
      pricingType: 'official',
      details: '₹50 Indian citizens, ₹1100 foreign tourists, additional ₹200 for main mausoleum'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '17th Century (1632–1653 CE)',
      architecturalStyle: 'Indo-Islamic Mughal Architecture',
      culture: 'Mughal / Indian',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 120,
      walkingDistanceMeters: 1200,
      accessibility: 'partially_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Early morning sunrise (06:00–08:30)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Archaeological Survey of India (ASI)',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-agra-fort',
    name: 'Agra Fort',
    category: 'Historic Citadel & UNESCO Site',
    lat: 27.179532,
    lng: 78.021111,
    address: 'Agra Fort, Rakabganj, Agra, Uttar Pradesh 282003',
    shortDescription: 'Massive red sandstone fortress that served as the primary residence of the Mughal emperors until 1638.',
    photos: [
      {
        id: 'p-agra-fort',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Agra_03-2016_16_Agra_Fort.jpg/960px-Agra_03-2016_16_Agra_Fort.jpg',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Agra_03-2016_16_Agra_Fort.jpg/960px-Agra_03-2016_16_Agra_Fort.jpg',
        title: 'Agra Fort battlements and red sandstone ramparts',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:00 - 18:00 daily',
    officialWebsite: 'https://asi.nic.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.179532,78.021111',
    ticketPrice: {
      amount: 50,
      currency: 'INR',
      pricingType: 'official',
      details: '₹50 Indians, ₹650 Foreign tourists'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '16th Century (Emperor Akbar)',
      architecturalStyle: 'Mughal Red Sandstone with White Marble palaces',
      culture: 'Mughal',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 90,
      walkingDistanceMeters: 1800,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Late afternoon (15:30–17:30)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'moderate',
    },
    source: 'Archaeological Survey of India',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-mehtab-bagh',
    name: 'Mehtab Bagh (Moonlight Garden)',
    category: 'Mughal Charbagh Garden & Taj Sunset Viewpoint',
    lat: 27.1798,
    lng: 78.0421,
    address: 'Nagla Devjit, Across Yamuna River, Agra, Uttar Pradesh 282001',
    shortDescription: 'A 25-acre symmetrical Charbagh complex situated directly north of the Taj Mahal across the Yamuna River, famous for the best sunset view of the Taj.',
    photos: [
      {
        id: 'p-mehtab-bagh',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Mehtab_Bagh_facing_Taj_Mahal.JPG/960px-Mehtab_Bagh_facing_Taj_Mahal.JPG',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Mehtab_Bagh_facing_Taj_Mahal.JPG/960px-Mehtab_Bagh_facing_Taj_Mahal.JPG',
        title: 'Mehtab Bagh garden reflection facing the Taj Mahal',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:00 - 18:00 daily (Sunrise to Sunset)',
    officialWebsite: 'https://asi.nic.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.1798,78.0421',
    ticketPrice: {
      amount: 25,
      currency: 'INR',
      pricingType: 'official',
      details: '₹25 Indians, ₹300 Foreign tourists'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: 'Early 16th Century (Emperor Babur & Shah Jahan)',
      architecturalStyle: 'Persian Charbagh (Four Garden) Layout',
      culture: 'Mughal / Persian',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 60,
      walkingDistanceMeters: 800,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'outdoor',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Sunset hour (16:30–18:30)',
      weatherSuitability: 'sunny_only',
      crowdLevel: 'moderate',
    },
    source: 'Archaeological Survey of India',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-itimad-ud-daulah',
    name: "Tomb of I'timad-ud-Daulah (Baby Taj)",
    category: 'Mausoleum & White Marble Inlay Precursor',
    lat: 27.1928,
    lng: 78.0311,
    address: 'Moti Bagh, Agra, Uttar Pradesh 282006',
    shortDescription: 'Often described as a "jewel box" or "Baby Taj", this tomb commissioned by Nur Jahan for her father is renowned for the first extensive use of pietra dura in white marble.',
    photos: [
      {
        id: 'p-itimad',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/I%27tim%C4%81d-ud-Daulah%2C_Agra.jpg/960px-I%27tim%C4%81d-ud-Daulah%2C_Agra.jpg',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/I%27tim%C4%81d-ud-Daulah%2C_Agra.jpg/960px-I%27tim%C4%81d-ud-Daulah%2C_Agra.jpg',
        title: 'Intricate marble lattice and pietra dura inlay at Baby Taj',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:00 - 18:00 daily',
    officialWebsite: 'https://asi.nic.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.1928,78.0311',
    ticketPrice: {
      amount: 30,
      currency: 'INR',
      pricingType: 'official',
      details: '₹30 Indians, ₹310 Foreign tourists'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '1622–1628 CE (Empress Nur Jahan)',
      architecturalStyle: 'Mughal Marble with Pietra Dura Inlay',
      culture: 'Mughal / Persian',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 75,
      walkingDistanceMeters: 600,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning (09:00–11:30)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'low',
    },
    source: 'Archaeological Survey of India',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-akbar-tomb',
    name: "Akbar's Tomb, Sikandra",
    category: 'Imperial Mausoleum & Mughal Monument',
    lat: 27.2206,
    lng: 77.9506,
    address: 'Tomb of Akbar, Sikandra, Agra, Uttar Pradesh 282007',
    shortDescription: 'The magnificent resting place of Emperor Akbar the Great, blending Hindu, Christian, and Islamic styles with five tiers, false minarets, and roaming deer.',
    photos: [
      {
        id: 'p-akbar-tomb',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Akbar%27s_Tomb_in_Sikandra_15.jpg/960px-Akbar%27s_Tomb_in_Sikandra_15.jpg',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Akbar%27s_Tomb_in_Sikandra_15.jpg/960px-Akbar%27s_Tomb_in_Sikandra_15.jpg',
        title: 'Grand red sandstone and marble entrance gate of Akbar tomb',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:00 - 18:30 daily',
    officialWebsite: 'https://asi.nic.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.2206,77.9506',
    ticketPrice: {
      amount: 30,
      currency: 'INR',
      pricingType: 'official',
      details: '₹30 Indians, ₹310 Foreigners'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '1605–1613 CE (Emperor Jahangir)',
      architecturalStyle: 'Tiered Mughal Red Sandstone & Marble',
      culture: 'Syncretic Mughal / Rajput',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 90,
      walkingDistanceMeters: 1400,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning or late afternoon',
      weatherSuitability: 'all_weather',
      crowdLevel: 'moderate',
    },
    source: 'Archaeological Survey of India',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-chini-ka-rauza',
    name: 'Chini Ka Rauza',
    category: 'Glazed Polychrome Tile Mausoleum',
    lat: 27.2005,
    lng: 78.0384,
    address: 'Katra Wazir Khan, Agra, Uttar Pradesh 282006',
    shortDescription: 'Mausoleum of Allama Afzal Khan Mullah, prime minister to Shah Jahan, famous for its extraordinary Persian glazed tilework (chini) and acoustic dome.',
    photos: [
      {
        id: 'p-chini-rauza',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Chini_ki_Rauza_4.jpg/960px-Chini_ki_Rauza_4.jpg',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Chini_ki_Rauza_4.jpg/960px-Chini_ki_Rauza_4.jpg',
        title: 'Chini Ka Rauza intricate blue and yellow glazed tiles',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:00 - 18:00 daily',
    officialWebsite: 'https://asi.nic.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.2005,78.0384',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free public entry'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '1635 CE (Emperor Shah Jahan era)',
      architecturalStyle: 'Persian Tile Mosaic Architecture',
      culture: 'Persian / Mughal',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 40,
      walkingDistanceMeters: 300,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning (08:00–11:00)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'low',
    },
    source: 'Archaeological Survey of India',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-jama-masjid-agra',
    name: 'Jama Masjid, Agra',
    category: '17th-Century Congregational Mosque',
    lat: 27.1824,
    lng: 78.0163,
    address: 'Subhash Bazar, Kinari Bazar, Agra, Uttar Pradesh 282003',
    shortDescription: 'Built in 1648 by Emperor Shah Jahan for his favorite daughter Jahanara Begum, situated opposite Agra Fort overlooking the historic Kinari Bazaar.',
    photos: [
      {
        id: 'p-jama-agra',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Jami_Masjid_-Agra_-Uttar_Pradesh_-IMG_0282.jpg/960px-Jami_Masjid_-Agra_-Uttar_Pradesh_-IMG_0282.jpg',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Jami_Masjid_-Agra_-Uttar_Pradesh_-IMG_0282.jpg/960px-Jami_Masjid_-Agra_-Uttar_Pradesh_-IMG_0282.jpg',
        title: 'Jama Masjid Agra red sandstone courtyard and onion domes',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '05:00 - 21:00 daily (except prayer hours)',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.1824,78.0163',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free entry for all visitors'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '1648 CE (Princess Jahanara Begum)',
      architecturalStyle: 'Mughal Red Sandstone with White Inlay',
      culture: 'Islamic / Mughal',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 45,
      walkingDistanceMeters: 400,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning or post-noon',
      weatherSuitability: 'all_weather',
      crowdLevel: 'moderate',
    },
    source: 'Agra Heritage Trust',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-ram-bagh',
    name: 'Ram Bagh (Aram Bagh)',
    category: 'Oldest Mughal Garden in India',
    lat: 27.2142,
    lng: 78.0435,
    address: 'Firozabad Road, Ram Bagh, Agra, Uttar Pradesh 282006',
    shortDescription: 'The oldest Mughal garden in India, originally laid out in 1528 by Emperor Babur on the banks of Yamuna with stepped cascade fountains and water pavilions.',
    photos: [
      {
        id: 'p-ram-bagh',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Chhatri_at_Arambagh_2.jpg/960px-Chhatri_at_Arambagh_2.jpg',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Chhatri_at_Arambagh_2.jpg/960px-Chhatri_at_Arambagh_2.jpg',
        title: 'Stone pavilion chhatri and water channels at Ram Bagh',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:00 - 18:00 daily',
    officialWebsite: 'https://asi.nic.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.2142,78.0435',
    ticketPrice: {
      amount: 25,
      currency: 'INR',
      pricingType: 'official',
      details: '₹25 Indians, ₹300 Foreign tourists'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '1528 CE (Emperor Babur)',
      architecturalStyle: 'Early Charbagh Terrace Garden',
      culture: 'Timurid / Mughal',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 50,
      walkingDistanceMeters: 700,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'outdoor',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning (07:00–10:00)',
      weatherSuitability: 'sunny_only',
      crowdLevel: 'low',
    },
    source: 'Archaeological Survey of India',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-mankameshwar-temple',
    name: 'Mankameshwar Temple',
    category: 'Ancient Heritage Hindu Temple',
    lat: 27.1852,
    lng: 78.0142,
    address: 'Rawatpara, Sheo Charra, Mantola, Agra, Uttar Pradesh 282003',
    shortDescription: 'One of the four ancient Shiva temples guarding the four corners of Agra, situated near Rawatpara spice bazaar, dating back to mythological antiquity.',
    photos: [
      {
        id: 'p-mankameshwar',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/IAshishTripathi_Mankameshwar_Temple_Agra.jpg/960px-IAshishTripathi_Mankameshwar_Temple_Agra.jpg',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/IAshishTripathi_Mankameshwar_Temple_Agra.jpg/960px-IAshishTripathi_Mankameshwar_Temple_Agra.jpg',
        title: 'Mankameshwar Temple shrine entrance and bells',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '05:00 - 22:00 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.1852,78.0142',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free entry for darshan'
    },
    taxonomy: {
      era: 'Ancient Indian Heritage',
      historicalPeriod: 'Ancient Era (Consecrated by Lord Shiva in legend)',
      architecturalStyle: 'North Indian Nagara Temple Architecture',
      culture: 'Hindu / Shaivite',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 40,
      walkingDistanceMeters: 300,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'indoor',
      childSuitability: true,
      educationalValue: 'medium',
      photographyValue: 'medium',
      budgetCategory: 'budget',
      bestVisitingTime: 'Evening Aarti (18:30–20:00)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Agra Heritage Tourism',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-mariam-tomb',
    name: "Mariam's Tomb",
    category: 'Mausoleum of Mariam-uz-Zamani',
    lat: 27.2185,
    lng: 77.9405,
    address: 'Near Sikandra, Agra, Uttar Pradesh 282007',
    shortDescription: 'The serene mausoleum of Mariam-uz-Zamani (Jodha Bai), Rajput Empress of Akbar and mother of Jahangir, built inside a repurposed Baradari pavilion.',
    photos: [
      {
        id: 'p-mariam',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Mariam%27s_Tomb%2C_Sikandra%2C_Agra.JPG/960px-Mariam%27s_Tomb%2C_Sikandra%2C_Agra.JPG',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Mariam%27s_Tomb%2C_Sikandra%2C_Agra.JPG/960px-Mariam%27s_Tomb%2C_Sikandra%2C_Agra.JPG',
        title: "Mariam's Tomb red sandstone pavilion at Sikandra",
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:00 - 18:00 daily',
    officialWebsite: 'https://asi.nic.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.2185,77.9405',
    ticketPrice: {
      amount: 25,
      currency: 'INR',
      pricingType: 'official',
      details: '₹25 Indians, ₹300 Foreign tourists'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '1623–1627 CE (Emperor Jahangir)',
      architecturalStyle: 'Mughal Baradari & Sandstone Inlay',
      culture: 'Rajput / Mughal',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 45,
      walkingDistanceMeters: 500,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning or late afternoon',
      weatherSuitability: 'all_weather',
      crowdLevel: 'low',
    },
    source: 'Archaeological Survey of India',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-fatehpur-sikri',
    name: 'Fatehpur Sikri & Buland Darwaza',
    category: 'UNESCO World Heritage Imperial City',
    lat: 27.0945,
    lng: 77.6679,
    address: 'Fatehpur Sikri, Agra District, Uttar Pradesh 283110',
    shortDescription: 'The fortified 16th-century royal capital founded by Emperor Akbar, featuring the monumental 54-meter Buland Darwaza, Jama Masjid, and Panch Mahal.',
    photos: [
      {
        id: 'p-fatehpur-sikri',
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg/960px-Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg',
        thumbnailUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg/960px-Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg',
        title: 'Buland Darwaza massive gateway of Fatehpur Sikri',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:00 - 18:00 daily',
    officialWebsite: 'https://asi.nic.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=27.0945,77.6679',
    ticketPrice: {
      amount: 50,
      currency: 'INR',
      pricingType: 'official',
      details: '₹50 Indians, ₹610 Foreign tourists'
    },
    taxonomy: {
      era: 'Mughal Empire',
      historicalPeriod: '1571–1585 CE (Emperor Akbar)',
      architecturalStyle: 'Imperial Mughal Red Sandstone City',
      culture: 'Mughal / Indian',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 180,
      walkingDistanceMeters: 2500,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning (08:00–12:00)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Archaeological Survey of India',
    lastUpdated: new Date().toISOString()
  },

  // 2. Manali & Kullu Valley
  {
    id: 'attr-hidimba-temple',
    name: 'Hidimba Devi Temple',
    category: 'Ancient Wooden Temple & Forest Sanctuary',
    lat: 32.2477,
    lng: 77.1818,
    address: 'Dhungri Forest, Manali, Himachal Pradesh 175131',
    shortDescription: 'Ancient cave temple built in 1553 CE surrounded by towering deodar cedar forests, dedicated to Hidimbi Devi from Mahabharata.',
    photos: [
      {
        id: 'p-hidimba-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Hidimba_Devi_Temple_-_North-east_View_-_Manali_2014-05-11_2648-2649.TIF/lossy-page1-1280px-Hidimba_Devi_Temple_-_North-east_View_-_Manali_2014-05-11_2648-2649.TIF.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Hidimba_Devi_Temple_-_North-east_View_-_Manali_2014-05-11_2648-2649.TIF/lossy-page1-400px-Hidimba_Devi_Temple_-_North-east_View_-_Manali_2014-05-11_2648-2649.TIF.jpg',
        title: 'Hidimba Devi Temple pagoda roof',
        author: 'Biswarup Ganguly',
        license: 'CC BY 3.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '08:00 - 18:00 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=32.2477,77.1818',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free public entry'
    },
    taxonomy: {
      era: 'Medieval Kullu Kingdom',
      historicalPeriod: '1553 CE (Maharaja Bahadur Singh)',
      architecturalStyle: 'Kath Kuni Wood & Stone Pagoda Style',
      culture: 'Himachali Folk & Hindu',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 60,
      walkingDistanceMeters: 400,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning (08:30–11:00)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'moderate',
    },
    source: 'Himachal Tourism & Archeological Registry',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-solang-valley',
    name: 'Solang Valley',
    category: 'Alpine Valley & Adventure Sports',
    lat: 32.3167,
    lng: 77.1567,
    address: 'Solang Valley Road, Manali, Himachal Pradesh 175103',
    shortDescription: 'Picturesque side valley at the top of Kullu Valley famous for summer paragliding, zorbing, and winter skiing with snow-covered Himalayan peaks.',
    photos: [
      {
        id: 'p-solang-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/1280px-Manali_City.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/400px-Manali_City.jpg',
        title: 'Solang Valley alpine snow peaks',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '09:00 - 18:00 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=32.3167,77.1567',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free entry to valley; adventure sports like paragliding priced ₹1500–₹3200'
    },
    taxonomy: {
      era: 'Natural Geological Formation',
      historicalPeriod: 'Himalayan Orogeny',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 180,
      walkingDistanceMeters: 1500,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'outdoor',
      childSuitability: true,
      educationalValue: 'medium',
      photographyValue: 'high',
      budgetCategory: 'moderate',
      bestVisitingTime: '10:00 - 15:00',
      weatherSuitability: 'sunny_only',
      crowdLevel: 'high',
    },
    source: 'Himachal Tourism',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-vashisht-springs',
    name: 'Vashisht Hot Water Springs & Temple',
    category: 'Natural Sulphur Springs & Ancient Temple',
    lat: 32.2612,
    lng: 77.1895,
    address: 'Vashisht Village, Manali, Himachal Pradesh 175131',
    shortDescription: 'Natural therapeutic geothermal sulphur hot springs and wooden pyramidal temple dedicated to Sage Vashishta with scenic Beas River valley views.',
    photos: [
      {
        id: 'p-vashisht-1',
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Vashisht_temple.jpg/1280px-Vashisht_temple.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Vashisht_temple.jpg/400px-Vashisht_temple.jpg',
        title: 'Vashisht Temple & Village',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '07:00 - 21:00 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=32.2612,77.1895',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free public entry to springs and temple'
    },
    taxonomy: {
      era: 'Vedic Tradition',
      historicalPeriod: 'Ancient Sage Shrine',
      architecturalStyle: 'Himachali Timber Framing',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 60,
      walkingDistanceMeters: 500,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning or late afternoon',
      weatherSuitability: 'all_weather',
      crowdLevel: 'moderate',
    },
    source: 'Himachal Tourism',
    lastUpdated: new Date().toISOString()
  },

  // 3. Goa Heritage & Beaches
  {
    id: 'attr-basilica-bom-jesus',
    name: 'Basilica of Bom Jesus',
    category: 'UNESCO World Heritage Baroque Church',
    lat: 15.5008,
    lng: 73.9116,
    address: 'Old Goa Road, Bainguinim, Goa 403402',
    shortDescription: 'World Heritage baroque landmark completed in 1605 holding the sacred mortal remains of St. Francis Xavier.',
    photos: [
      {
        id: 'p-bom-jesus',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Basilica_of_Bom_Jesus%2C_Goa.jpg/1280px-Basilica_of_Bom_Jesus%2C_Goa.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Basilica_of_Bom_Jesus%2C_Goa.jpg/400px-Basilica_of_Bom_Jesus%2C_Goa.jpg',
        title: 'Façade of Basilica of Bom Jesus',
        author: 'P.K.Niyogi',
        license: 'CC BY-SA 3.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '09:00 - 18:30 (Sundays 10:30 - 18:30)',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=15.5008,73.9116',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free entry; museum entry ₹10'
    },
    taxonomy: {
      era: 'Portuguese Colonial Era',
      historicalPeriod: '1594–1605 CE',
      architecturalStyle: 'Portuguese Baroque & Mannerist Architecture',
      culture: 'Goan Catholic / Portuguese',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 75,
      walkingDistanceMeters: 600,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'indoor',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning (09:30–11:30)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Archaeological Survey of India & Goa Tourism',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-fort-aguada',
    name: 'Fort Aguada & Lighthouse',
    category: '17th-Century Portuguese Coastal Fortress',
    lat: 15.4922,
    lng: 73.7735,
    address: 'Aguada Fort Area, Candolim, Goa 403515',
    shortDescription: 'Well-preserved 17th-century Portuguese coastal fort standing on Sinquerim Beach overlooking the Arabian Sea, featuring a historic 4-storey lighthouse.',
    photos: [
      {
        id: 'p-aguada-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/1280px-BeachFun.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/BeachFun.jpg/400px-BeachFun.jpg',
        title: 'Fort Aguada coastal ramparts',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '09:30 - 18:00 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=15.4922,73.7735',
    ticketPrice: {
      amount: 50,
      currency: 'INR',
      pricingType: 'official',
      details: '₹50 Indian citizens, ₹300 foreigners'
    },
    taxonomy: {
      era: 'Portuguese India',
      historicalPeriod: '1612 CE',
      architecturalStyle: 'Military Bastion Laterite Architecture',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 90,
      walkingDistanceMeters: 1100,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'outdoor',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Sunset hour (16:30–18:00)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Goa Tourism Development Corporation (GTDC)',
    lastUpdated: new Date().toISOString()
  },

  // 4. Ayodhya Sacred Heritage
  {
    id: 'attr-ram-mandir',
    name: 'Shri Ram Janmabhoomi Mandir',
    category: 'Grand Traditional Hindu Temple Complex',
    lat: 26.7995,
    lng: 82.1998,
    address: 'Sai Nagar, Ayodhya, Uttar Pradesh 224123',
    shortDescription: 'Magnificent Nagara-style pink Bansi Paharpur sandstone temple complex commemorating the sacred birthplace of Lord Rama.',
    photos: [
      {
        id: 'p-ayodhya-ram',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg/1280px-Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg/400px-Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg',
        title: 'Shri Ram Janmabhoomi Mandir, Ayodhya',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:30 - 12:00, 14:00 - 21:30 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.7995,82.1998',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free general darshan; special pass options via trust portal'
    },
    taxonomy: {
      era: 'Modern Classical Revival',
      historicalPeriod: '2024 CE Consecration',
      architecturalStyle: 'Traditional Nagara Style Hindu Temple Architecture',
      culture: 'Hindu Sanatana Dharma',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 120,
      walkingDistanceMeters: 1400,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning Aarti (06:30) or Evening Sandhya (18:30)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Shri Ram Janmbhoomi Teerth Kshetra Trust',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-hanuman-garhi',
    name: 'Hanuman Garhi Temple',
    category: '10th-Century Hilltop Fort Temple',
    lat: 26.7937,
    lng: 82.2033,
    address: 'Hanuman Garhi, Sai Nagar, Ayodhya, Uttar Pradesh 224123',
    shortDescription: '10th-century fort-temple atop 76 stone steps where Lord Hanuman is revered as the guardian protector of Ayodhya.',
    photos: [
      {
        id: 'p-hanuman-garhi',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg/1280px-Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg/400px-Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg',
        title: 'Hanuman Garhi Temple Gateway',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '05:00 - 22:00 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.7937,82.2033',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free entry'
    },
    taxonomy: {
      era: 'Medieval Awadh',
      historicalPeriod: '10th Century CE',
      architecturalStyle: 'Fortified Temple Citadel',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 60,
      walkingDistanceMeters: 400,
      accessibility: 'inaccessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning 07:00–09:00',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'UP Tourism',
    lastUpdated: new Date().toISOString()
  },

  // 5. Kedarnath Pilgrimage
  {
    id: 'attr-kedarnath-temple',
    name: 'Kedarnath Temple',
    category: 'Himalayan Jyotirlinga & High Altitude Shrine',
    lat: 30.734839,
    lng: 79.066706,
    address: 'Kedarnath, Rudraprayag, Uttarakhand 246445',
    shortDescription: 'One of the twelve Jyotirlingas, dedicated to Lord Shiva situated at 3,583m elevation against the snowbound Kedarnath massif.',
    photos: [
      {
        id: 'p-kedarnath-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/1280px-Kedarnath_Temple_in_Rainy_season.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/400px-Kedarnath_Temple_in_Rainy_season.jpg',
        title: 'Kedarnath Temple in Garhwal Himalayas',
        author: 'Shivam Kumar',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '05:00 - 21:00 (May to November pilgrimage season)',
    officialWebsite: 'https://badrinath-kedarnath.gov.in',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=30.734839,79.066706',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free darshan; biometric Yatra registration required'
    },
    taxonomy: {
      era: 'Ancient / Adi Shankaracharya',
      historicalPeriod: '8th Century CE reconstruction',
      architecturalStyle: 'Katyuri Ashlar Grey Stone Architecture',
      culture: 'Himalayan Shaivism',
      difficultyLevel: 'strenuous',
      estimatedDurationMinutes: 180,
      walkingDistanceMeters: 2200,
      accessibility: 'inaccessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'mixed',
      childSuitability: false,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'moderate',
      bestVisitingTime: 'Morning 06:00 - 11:00',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Shri Badrinath-Kedarnath Temple Committee (BKTC)',
    lastUpdated: new Date().toISOString()
  },

  // 6. Amritsar Golden Temple
  {
    id: 'attr-golden-temple',
    name: 'Sri Harmandir Sahib (Golden Temple)',
    category: 'Spiritual Center of Sikhism & Sacred Pool',
    lat: 31.6200,
    lng: 74.8765,
    address: 'Golden Temple Road, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab 143006',
    shortDescription: 'The preeminent spiritual site of Sikhism, adorned with gold foil leafing and surrounded by the sacred Amrit Sarovar lake.',
    photos: [
      {
        id: 'p-golden-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amritsar_2.jpg/1280px-The_Golden_Temple_of_Amritsar_2.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amritsar_2.jpg/400px-The_Golden_Temple_of_Amritsar_2.jpg',
        title: 'Golden Temple illuminated across the sacred pool',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: 'Open 24 hours daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=31.6200,74.8765',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free entry for all; free communal Langar meals served 24/7'
    },
    taxonomy: {
      era: 'Sikh Guru Period',
      historicalPeriod: 'Designed by Guru Arjan in 1581 CE',
      architecturalStyle: 'Sikh Architecture with Gold Leaf and Marble Inlay',
      culture: 'Sikhism',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 120,
      walkingDistanceMeters: 1000,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Early morning Amrit Vela (04:00) or Night Palki Sahib (21:30)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Shiromani Gurdwara Parbandhak Committee (SGPC)',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-jallianwala-bagh',
    name: 'Jallianwala Bagh National Memorial',
    category: 'Historic Memorial & Freedom Struggle Park',
    lat: 31.6206,
    lng: 74.8801,
    address: 'Golden Temple Road, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab 143006',
    shortDescription: 'Historic public garden and national memorial commemorating the victims of the 1919 massacre, featuring the Martyrs Well and preserved bullet marks.',
    photos: [
      {
        id: 'p-jallianwala-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amritsar_2.jpg/1280px-The_Golden_Temple_of_Amritsar_2.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amritsar_2.jpg/400px-The_Golden_Temple_of_Amritsar_2.jpg',
        title: 'Jallianwala Bagh Memorial Flame',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '06:30 - 19:30 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=31.6206,74.8801',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free public entry'
    },
    taxonomy: {
      era: 'Indian Independence Movement',
      historicalPeriod: '1919 CE',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 60,
      walkingDistanceMeters: 600,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'outdoor',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning or late afternoon',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Ministry of Culture, Govt of India',
    lastUpdated: new Date().toISOString()
  },

  // 7. Varanasi Sacred Ghats
  {
    id: 'attr-dashashwamedh-ghat',
    name: 'Dashashwamedh Ghat',
    category: 'Sacred Riverfront Ghat & Grand Ganga Aarti',
    lat: 25.3075841,
    lng: 83.0104869,
    address: 'Bangali Tola, Varanasi, Uttar Pradesh 221001',
    shortDescription: 'The main and most prominent ghat on the Ganges in Varanasi, renowned for the spectacular evening Maha Ganga Aarti rituals.',
    photos: [
      {
        id: 'p-varanasi-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/1280px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/400px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg',
        title: 'Dashashwamedh Ghat during Ganga Aarti',
        author: 'Marcell Sgier',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: 'Open 24 hours (Ganga Aarti: 18:30 in summer, 18:00 in winter)',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.3075841,83.0104869',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free viewing from ghat steps; boat rides ₹300-₹800'
    },
    taxonomy: {
      era: 'Ancient Kashi & Maratha Era',
      historicalPeriod: 'Rebuilt 1748 CE by Peshwa Balaji Baji Rao',
      architecturalStyle: 'Stone Stepped Ghat Architecture',
      culture: 'Vedic Hindu Culture',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 90,
      walkingDistanceMeters: 800,
      accessibility: 'inaccessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'outdoor',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Evening Sunset Aarti (17:30–19:30)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Varanasi Tourism & Municipal Board',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-kashi-vishwanath',
    name: 'Kashi Vishwanath Temple & Corridor',
    category: 'Sacred Jyotirlinga & Grand Cultural Corridor',
    lat: 25.3109,
    lng: 83.0107,
    address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001',
    shortDescription: 'One of the most revered Hindu temples dedicated to Lord Shiva on the western bank of the Ganges, featuring a magnificent golden spire and expanded river corridor.',
    photos: [
      {
        id: 'p-kashi-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/1280px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/400px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg',
        title: 'Kashi Vishwanath Corridor to River Ganges',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '03:00 - 23:00 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.3109,83.0107',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free general entry; Sugam Darshan available'
    },
    taxonomy: {
      era: 'Ancient & Modern Expansion',
      historicalPeriod: 'Reconstructed 1780 CE by Ahilyabai Holkar',
      architecturalStyle: 'Nagari Temple & Red Sandstone River Corridor',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 90,
      walkingDistanceMeters: 1000,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Early morning Mangla Aarti or Afternoon (14:00–16:00)',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Shri Kashi Vishwanath Special Area Development Board',
    lastUpdated: new Date().toISOString()
  },

  // 8. Jaipur Heritage
  {
    id: 'attr-hawa-mahal',
    name: 'Hawa Mahal (Palace of Winds)',
    category: 'Crown-shaped Palace of Winds',
    lat: 26.9239363,
    lng: 75.8267438,
    address: 'Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002',
    shortDescription: 'Five-storey palace built in 1799 from red and pink sandstone with 953 ornate honeycomb jharokha windows allowing royal women to observe street life.',
    photos: [
      {
        id: 'p-hawa-mahal',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Hawa_Mahal_2011.jpg/1280px-Hawa_Mahal_2011.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Hawa_Mahal_2011.jpg/400px-Hawa_Mahal_2011.jpg',
        title: 'Hawa Mahal Iconic Pink Sandstone Honeycomb Façade',
        author: 'Fankex / Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        source: 'Wikimedia Commons',
      },
      {
        id: 'p-hawa-mahal-2',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/400px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg',
        title: 'Hawa Mahal East Façade at Ground Level',
        author: 'Wikimedia Commons Contributor',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '09:00 - 17:00 daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=26.9239363,75.8267438',
    ticketPrice: {
      amount: 50,
      currency: 'INR',
      pricingType: 'official',
      details: '₹50 Indians, ₹200 Foreigners'
    },
    taxonomy: {
      era: 'Kachhwaha Rajput Kingdom',
      historicalPeriod: '1799 CE (Maharaja Sawai Pratap Singh)',
      architecturalStyle: 'Rajput & Mughal Pink Sandstone Architecture',
      culture: 'Rajputana',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 60,
      walkingDistanceMeters: 600,
      accessibility: 'partially_accessible',
      wheelchairSuitability: false,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Morning sunrise when sunlight glows on façade',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Department of Archaeology & Museums Rajasthan',
    lastUpdated: new Date().toISOString()
  },

  // 9. Mumbai Waterfront
  {
    id: 'attr-gateway-mumbai',
    name: 'Gateway of India',
    category: 'Indo-Saracenic Triumphal Arch & Waterfront',
    lat: 18.9219841,
    lng: 72.8346539,
    address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
    shortDescription: 'Iconic 26-metre basalt triumphal arch facing the Arabian Sea, constructed to commemorate the 1911 landing of King George V in India.',
    photos: [
      {
        id: 'p-gateway-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gateway_of_India_in_Mumbai.jpg/1280px-Gateway_of_India_in_Mumbai.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gateway_of_India_in_Mumbai.jpg/400px-Gateway_of_India_in_Mumbai.jpg',
        title: 'Gateway of India at sunset',
        author: 'Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: 'Open 24 hours daily',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=18.9219841,72.8346539',
    ticketPrice: {
      amount: 0,
      currency: 'INR',
      pricingType: 'official',
      details: 'Free public access'
    },
    taxonomy: {
      era: 'British Colonial Era',
      historicalPeriod: 'Completed 1924 CE',
      architecturalStyle: 'Indo-Saracenic Basalt Architecture',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 60,
      walkingDistanceMeters: 500,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'outdoor',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'budget',
      bestVisitingTime: 'Evening sunset or early morning breeze',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Maharashtra Tourism (MTDC)',
    lastUpdated: new Date().toISOString()
  },

  // 10. Paris & Rome icons
  {
    id: 'attr-eiffel-tower',
    name: 'Eiffel Tower (Tour Eiffel)',
    category: 'Wrought-Iron Monument & World Icon',
    lat: 48.8583701,
    lng: 2.2944813,
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris, France',
    shortDescription: 'Iconic 330m wrought-iron lattice tower built for the 1889 Exposition Universelle by Gustave Eiffel.',
    photos: [
      {
        id: 'p-eiffel',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1280px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/400px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
        title: 'Eiffel Tower Paris',
        author: 'Benh LIEU SONG',
        license: 'CC BY-SA 3.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '09:00 - 23:45 daily',
    officialWebsite: 'https://www.toureiffel.paris',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=48.8583701,2.2944813',
    ticketPrice: {
      amount: 29.4,
      currency: 'EUR',
      pricingType: 'official',
      details: '€29.40 lift to top, €18.80 lift to 2nd floor'
    },
    taxonomy: {
      era: 'Modern Industrial Era',
      historicalPeriod: '1887–1889 CE',
      architecturalStyle: 'Puddled Iron Lattice Truss Structure',
      culture: 'French Republic',
      difficultyLevel: 'easy',
      estimatedDurationMinutes: 120,
      walkingDistanceMeters: 900,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'moderate',
      bestVisitingTime: 'Twilight sunset to see the hourly sparkle',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'SETE Tour Eiffel Official',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'attr-colosseum',
    name: 'The Colosseum (Flavian Amphitheatre)',
    category: 'Ancient Roman Amphitheatre & Wonder',
    lat: 41.8902102,
    lng: 12.4922309,
    address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
    shortDescription: 'The largest ancient amphitheatre ever built, constructed of travertine limestone, tuff, and brick-faced concrete in 70–80 CE.',
    photos: [
      {
        id: 'p-colosseum-1',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg',
        thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/400px-Colosseo_2020.jpg',
        title: 'Colosseum in Rome',
        author: 'Nicholas Gemini',
        license: 'CC BY-SA 4.0',
        source: 'Wikimedia Commons',
      }
    ],
    openingHours: '08:30 - 19:15 (varies by season)',
    officialWebsite: 'https://parcocolosseo.it',
    directionUrl: 'https://www.google.com/maps/dir/?api=1&destination=41.8902102,12.4922309',
    ticketPrice: {
      amount: 18,
      currency: 'EUR',
      pricingType: 'official',
      details: '€18 standard adult entry including Forum and Palatine Hill'
    },
    taxonomy: {
      era: 'Roman Empire',
      historicalPeriod: '70–80 CE (Flavian Dynasty)',
      architecturalStyle: 'Classical Roman Travertine Amphitheatre',
      culture: 'Ancient Roman',
      difficultyLevel: 'moderate',
      estimatedDurationMinutes: 150,
      walkingDistanceMeters: 2500,
      accessibility: 'verified_accessible',
      wheelchairSuitability: true,
      indoorOutdoor: 'mixed',
      childSuitability: true,
      educationalValue: 'high',
      photographyValue: 'high',
      budgetCategory: 'moderate',
      bestVisitingTime: 'Early morning 08:30',
      weatherSuitability: 'all_weather',
      crowdLevel: 'high',
    },
    source: 'Parco Archeologico del Colosseo',
    lastUpdated: new Date().toISOString()
  },
  ...CURATED_TEMPLES,
  ...CURATED_MUSEUMS,
  ...CURATED_MONUMENTS,
  ...CURATED_LANDMARKS,
];

export const attractionService = {
  async getAttractionsNear(lat: number, lng: number, radiusKm: number = 45): Promise<AttractionItem[]> {
    // 1. Calculate distances from curated list
    const nearbyCurated: AttractionItem[] = CURATED_ATTRACTIONS.map(item => {
      const distance = calculateDistanceKm(lat, lng, item.lat, item.lng);
      return {
        ...item,
        distanceKm: distance,
      };
    }).filter(item => item.distanceKm !== undefined && item.distanceKm <= radiusKm);

    if (nearbyCurated.length >= 4) {
      nearbyCurated.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
      return nearbyCurated.slice(0, 15);
    }

    const liveAttractions: AttractionItem[] = [];

    // 2. Fetch live via Wikipedia GeoSearch for ANY location on Earth (fast & reliable)
    try {
      // Wikipedia max radius is 10000m (10km)
      const geoRadius = Math.min(Math.round(radiusKm * 1000), 10000);
      const wikiGeoUrl = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}|${lng}&gsradius=${geoRadius}&gslimit=8&format=json&origin=*`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(wikiGeoUrl, {
        headers: { 'User-Agent': 'HeritAR-Discovery/1.0' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const items = data.query?.geosearch || [];
        if (items.length > 0) {
          const pageIds = items.map((i: any) => i.pageid).join('|');
          const detailsUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageIds}&prop=pageimages|extracts|info&inprop=url&exintro=1&explaintext=1&pithumbsize=800&format=json&origin=*`;

          const detailsRes = await fetch(detailsUrl, {
            headers: { 'User-Agent': 'HeritAR-Discovery/1.0' }
          });

          if (detailsRes.ok) {
            const detailsData = await detailsRes.json();
            const pages = detailsData.query?.pages || {};

            for (const item of items) {
              const p = pages[item.pageid];
              if (!p) continue;

              const dist = calculateDistanceKm(lat, lng, item.lat, item.lon);
              const thumbUrl = p.thumbnail?.source;
              const originalUrl = thumbUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/1280px-Manali_City.jpg';

              // If Wikipedia thumbnail doesn't exist, retrieve via photoService
              let photos = [];
              if (thumbUrl && !thumbUrl.endsWith('.svg')) {
                photos.push({
                  id: `wiki-attr-${item.pageid}`,
                  url: originalUrl,
                  thumbnailUrl: thumbUrl,
                  title: p.title,
                  author: 'Wikimedia / Wikipedia Contributors',
                  license: 'CC BY-SA 4.0',
                  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
                  source: 'Wikipedia',
                  sourceUrl: p.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(p.title)}`,
                });
              } else {
                photos = await photoService.getPhotosForPlace(p.title);
              }

              const extract = p.extract ? p.extract.split('. ')[0] + '.' : 'Historical tourist attraction and local heritage site.';
              const isVillageOrAdministrative = /\b(village|gram panchayat|administrative block|tehsil|census town|electoral)\b/i.test(p.title + ' ' + (p.extract || ''));
              if (isVillageOrAdministrative) continue;

              liveAttractions.push({
                id: `wiki-poi-${item.pageid}`,
                name: p.title,
                category: 'Heritage Sight & Point of Interest',
                lat: item.lat,
                lng: item.lon,
                address: `${p.title}, Local Area`,
                shortDescription: extract.length > 180 ? extract.slice(0, 180) + '...' : extract,
                distanceKm: dist,
                photos,
                directionUrl: `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lon}`,
                ticketPrice: {
                  amount: 0,
                  currency: 'INR',
                  pricingType: 'official',
                  details: 'Public sight / Standard local tariff'
                },
                taxonomy: {
                  difficultyLevel: 'easy',
                  estimatedDurationMinutes: 60,
                  walkingDistanceMeters: 600,
                  accessibility: 'partially_accessible',
                  wheelchairSuitability: true,
                  indoorOutdoor: 'mixed',
                  childSuitability: true,
                  educationalValue: 'high',
                  photographyValue: 'high',
                  budgetCategory: 'budget',
                  bestVisitingTime: 'Morning or late afternoon',
                  weatherSuitability: 'all_weather',
                  crowdLevel: 'moderate',
                },
                source: 'Wikipedia Geosearch Registry',
                lastUpdated: new Date().toISOString()
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn('Wikipedia geosearch query timed out or failed:', e);
    }

    // Combine curated and live attractions, deduplicate
    const combined = [...nearbyCurated];
    for (const attr of liveAttractions) {
      const exists = combined.some(c => 
        c.name.toLowerCase() === attr.name.toLowerCase() ||
        (Math.abs(c.lat - attr.lat) < 0.005 && Math.abs(c.lng - attr.lng) < 0.005)
      );
      if (!exists) {
        combined.push(attr);
      }
    }

    if (combined.length > 0) {
      combined.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
      return combined.slice(0, 15);
    }

    // Fallback to nearest curated items with calculated distance
    const sortedAll = CURATED_ATTRACTIONS.map(item => ({
      ...item,
      distanceKm: calculateDistanceKm(lat, lng, item.lat, item.lng),
    })).sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

    return sortedAll.slice(0, 12);
  },

  getCuratedById(id: string): AttractionItem | undefined {
    return CURATED_ATTRACTIONS.find(a => a.id === id);
  }
};
