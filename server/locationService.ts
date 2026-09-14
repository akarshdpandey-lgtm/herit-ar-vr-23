import { LocationItem } from '../src/types.js';

// Curated verified global & Indian heritage database for instant fallbacks & offline resilience
const CURATED_LOCATIONS: LocationItem[] = [
  {
    id: 'taj-mahal-agra',
    name: 'Taj Mahal, Agra',
    displayName: 'Taj Mahal, Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh, 282001, India',
    lat: 27.1751448,
    lng: 78.0421422,
    city: 'Agra',
    state: 'Uttar Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'manali-himachal',
    name: 'Manali, Himachal Pradesh',
    displayName: 'Manali, Kullu District, Himachal Pradesh, 175131, India',
    lat: 32.243177,
    lng: 77.189246,
    city: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'hill_station',
  },
  {
    id: 'varanasi-ghats',
    name: 'Varanasi Ghats & Kashi Vishwanath',
    displayName: 'Dashashwamedh Ghat & Kashi Vishwanath, Varanasi, Uttar Pradesh, 221001, India',
    lat: 25.3075841,
    lng: 83.0104869,
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'heritage_site',
  },
  {
    id: 'goa-heritage',
    name: 'Goa Beaches & Heritage Churches',
    displayName: 'Old Goa & Calangute Coastal Belt, North Goa, Goa, 403001, India',
    lat: 15.498863,
    lng: 73.827827,
    city: 'Panaji',
    state: 'Goa',
    country: 'India',
    countryCode: 'in',
    type: 'coastal_heritage',
  },
  {
    id: 'ayodhya-ram-mandir',
    name: 'Ayodhya Shri Ram Janmabhoomi',
    displayName: 'Shri Ram Janmabhoomi Mandir, Ayodhya, Uttar Pradesh, 224123, India',
    lat: 26.7995,
    lng: 82.1998,
    city: 'Ayodhya',
    state: 'Uttar Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'kedarnath-temple',
    name: 'Kedarnath Temple, Uttarakhand',
    displayName: 'Kedarnath Temple, Rudraprayag, Garhwal Himalayas, Uttarakhand, 246445, India',
    lat: 30.734839,
    lng: 79.066706,
    city: 'Kedarnath',
    state: 'Uttarakhand',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'amritsar-golden-temple',
    name: 'Golden Temple, Amritsar',
    displayName: 'Sri Harmandir Sahib, Golden Temple Road, Amritsar, Punjab, 143006, India',
    lat: 31.6200,
    lng: 74.8765,
    city: 'Amritsar',
    state: 'Punjab',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'jaipur-hawa-mahal',
    name: 'Hawa Mahal & Amber Palace, Jaipur',
    displayName: 'Hawa Mahal, Badi Choupad, Pink City, Jaipur, Rajasthan, 302002, India',
    lat: 26.9239363,
    lng: 75.8267438,
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    countryCode: 'in',
    type: 'palace',
  },
  {
    id: 'delhi-red-fort',
    name: 'Red Fort & Qutub Minar, Delhi',
    displayName: 'Red Fort, Chandni Chowk, Old Delhi, Delhi, 110006, India',
    lat: 28.6561592,
    lng: 77.2410203,
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    countryCode: 'in',
    type: 'fort',
  },
  {
    id: 'mumbai-gateway',
    name: 'Gateway of India, Mumbai',
    displayName: 'Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra, 400001, India',
    lat: 18.9219841,
    lng: 72.8346539,
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'udaipur-city-palace',
    name: 'City Palace & Lake Pichola, Udaipur',
    displayName: 'City Palace Complex, Old City, Udaipur, Rajasthan, 313001, India',
    lat: 24.5764,
    lng: 73.6835,
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India',
    countryCode: 'in',
    type: 'palace',
  },
  {
    id: 'shimla-ridge',
    name: 'The Ridge & Mall Road, Shimla',
    displayName: 'The Ridge, Mall Road, Shimla, Himachal Pradesh, 171001, India',
    lat: 31.1048,
    lng: 77.1734,
    city: 'Shimla',
    state: 'Himachal Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'hill_station',
  },
  {
    id: 'rishikesh-ganga',
    name: 'Triveni Ghat & Laxman Jhula, Rishikesh',
    displayName: 'Triveni Ghat, Rishikesh, Dehradun, Uttarakhand, 249201, India',
    lat: 30.1033,
    lng: 78.2947,
    city: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    countryCode: 'in',
    type: 'heritage_site',
  },
  {
    id: 'hampi-karnataka',
    name: 'Virupaksha Temple, Hampi',
    displayName: 'Virupaksha Temple, Hampi, Vijayanagara, Karnataka, 583239, India',
    lat: 15.3350285,
    lng: 76.4600244,
    city: 'Hampi',
    state: 'Karnataka',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  // --- USER ADDED MAJOR TEMPLES ---
  {
    id: 'kashi-vishwanath-varanasi',
    name: 'Kashi Vishwanath Temple, Varanasi',
    displayName: 'Shri Kashi Vishwanath Dham, Lahori Tola, Varanasi, Uttar Pradesh, 221001, India',
    lat: 25.3109,
    lng: 83.0107,
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'meenakshi-amman-madurai',
    name: 'Meenakshi Amman Temple, Madurai',
    displayName: 'Arulmigu Meenakshi Sundareswarar Temple, Madurai, Tamil Nadu, 625001, India',
    lat: 9.9195,
    lng: 78.1193,
    city: 'Madurai',
    state: 'Tamil Nadu',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'brihadeeswarar-temple-thanjavur',
    name: 'Brihadeeswarar Temple, Thanjavur',
    displayName: 'Brihadisvara Temple (Big Temple), Thanjavur, Tamil Nadu, 613007, India',
    lat: 10.7828,
    lng: 79.1318,
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'konark-sun-temple-odisha',
    name: 'Konark Sun Temple, Odisha',
    displayName: 'Konark Sun Temple Complex, Konark, Puri District, Odisha, 752111, India',
    lat: 19.8876,
    lng: 86.0945,
    city: 'Konark',
    state: 'Odisha',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'jagannath-temple-puri',
    name: 'Jagannath Temple, Puri',
    displayName: 'Shree Jagannath Temple, Grand Road, Puri, Odisha, 752001, India',
    lat: 19.8049,
    lng: 85.8179,
    city: 'Puri',
    state: 'Odisha',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'badrinath-temple-chamoli',
    name: 'Badrinath Temple, Uttarakhand',
    displayName: 'Badrinath Temple, Chamoli District, Garhwal Himalayas, Uttarakhand, 246422, India',
    lat: 30.7433,
    lng: 79.4938,
    city: 'Badrinath',
    state: 'Uttarakhand',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'somnath-temple-gujarat',
    name: 'Somnath Temple, Gujarat',
    displayName: 'Shree Somnath Jyotirlinga Temple, Prabhas Patan, Veraval, Gujarat, 362268, India',
    lat: 20.8880,
    lng: 70.4013,
    city: 'Somnath',
    state: 'Gujarat',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'dilwara-temples-mount-abu',
    name: 'Dilwara Temples, Mount Abu',
    displayName: 'Dilwara Jain Temples, Mount Abu, Sirohi District, Rajasthan, 307501, India',
    lat: 24.6017,
    lng: 72.7233,
    city: 'Mount Abu',
    state: 'Rajasthan',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'mahabodhi-temple-bodhgaya',
    name: 'Mahabodhi Temple, Bodh Gaya',
    displayName: 'Mahabodhi Temple Complex & Bodhi Tree, Bodh Gaya, Gaya, Bihar, 824231, India',
    lat: 24.6960,
    lng: 84.9914,
    city: 'Bodh Gaya',
    state: 'Bihar',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },

  // --- USER ADDED MAJOR MUSEUMS ---
  {
    id: 'indian-museum-kolkata',
    name: 'Indian Museum, Kolkata',
    displayName: 'Indian Museum, 27 Jawaharlal Nehru Rd, Park Street area, Kolkata, West Bengal, 700016, India',
    lat: 22.5579,
    lng: 88.3511,
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'national-museum-delhi',
    name: 'National Museum, Delhi',
    displayName: 'National Museum, Janpath, Rajpath Area, New Delhi, Delhi, 110011, India',
    lat: 28.6118,
    lng: 77.2193,
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'csmvs-museum-mumbai',
    name: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai',
    displayName: 'CSMVS Museum, 159-161 MG Road, Fort, Mumbai, Maharashtra, 400023, India',
    lat: 18.9269,
    lng: 72.8327,
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'salar-jung-museum-hyderabad',
    name: 'Salar Jung Museum, Hyderabad',
    displayName: 'Salar Jung Museum, Salar Jung Marg, Darulshifa, Hyderabad, Telangana, 500002, India',
    lat: 17.3713,
    lng: 78.4804,
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'albert-hall-museum-jaipur',
    name: 'Albert Hall Museum, Jaipur',
    displayName: 'Albert Hall Museum, Ram Niwas Garden, Kailash Puri, Jaipur, Rajasthan, 302004, India',
    lat: 26.9116,
    lng: 75.8195,
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'government-museum-chennai',
    name: 'Government Museum, Chennai',
    displayName: 'Government Museum Egmore, Pantheon Road, Egmore, Chennai, Tamil Nadu, 600008, India',
    lat: 13.0732,
    lng: 80.2570,
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'bihar-museum-patna',
    name: 'Bihar Museum, Patna',
    displayName: 'Bihar Museum, Bailey Road, Jawaharlal Nehru Marg, Patna, Bihar, 800001, India',
    lat: 25.6093,
    lng: 85.1235,
    city: 'Patna',
    state: 'Bihar',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'partition-museum-amritsar',
    name: 'Partition Museum, Amritsar',
    displayName: 'Partition Museum, Town Hall, Heritage Street, Amritsar, Punjab, 143006, India',
    lat: 31.6253,
    lng: 74.8778,
    city: 'Amritsar',
    state: 'Punjab',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'bhau-daji-lad-museum-mumbai',
    name: 'Dr. Bhau Daji Lad Museum, Mumbai',
    displayName: 'Dr. Bhau Daji Lad Museum, Byculla East, Mumbai, Maharashtra, 400027, India',
    lat: 18.9789,
    lng: 72.8354,
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },
  {
    id: 'calico-museum-ahmedabad',
    name: 'Calico Museum of Textiles, Ahmedabad',
    displayName: 'Calico Museum of Textiles, The Retreat, Shahibaug, Ahmedabad, Gujarat, 380004, India',
    lat: 23.0573,
    lng: 72.5936,
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    countryCode: 'in',
    type: 'museum',
  },

  // --- USER ADDED MAJOR MONUMENTS ---
  {
    id: 'qutub-minar-delhi',
    name: 'Qutub Minar, Delhi',
    displayName: 'Qutub Minar, Seth Sarai, Mehrauli, New Delhi, Delhi, 110030, India',
    lat: 28.5245,
    lng: 77.1855,
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'india-gate-delhi',
    name: 'India Gate, Delhi',
    displayName: 'India Gate & Kartavya Path, Central Secretariat, New Delhi, Delhi, 110001, India',
    lat: 28.6129,
    lng: 77.2295,
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'charminar-hyderabad',
    name: 'Charminar, Hyderabad',
    displayName: 'Charminar, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana, 500002, India',
    lat: 17.3616,
    lng: 78.4747,
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'sanchi-stupa-madhya-pradesh',
    name: 'Sanchi Stupa, Madhya Pradesh',
    displayName: 'Buddhist Monuments at Sanchi, Raisen District, Madhya Pradesh, 464661, India',
    lat: 23.4793,
    lng: 77.7397,
    city: 'Sanchi',
    state: 'Madhya Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'ajanta-caves-maharashtra',
    name: 'Ajanta Caves, Maharashtra',
    displayName: 'Ajanta Caves, Chhatrapati Sambhaji Nagar, Maharashtra, 431117, India',
    lat: 20.5519,
    lng: 75.7033,
    city: 'Ajanta',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'ellora-caves-maharashtra',
    name: 'Ellora Caves, Maharashtra',
    displayName: 'Ellora Caves & Kailash Temple, Chhatrapati Sambhaji Nagar, Maharashtra, 431102, India',
    lat: 20.0268,
    lng: 75.1790,
    city: 'Ellora',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },

  // --- USER ADDED SPECIFIC LANDMARKS (51-60) ---
  {
    id: 'rajwada-palace-indore',
    name: 'Rajwada Palace, Indore',
    displayName: 'Rajwada Palace, MG Road, Rajwada Circle, Indore, Madhya Pradesh, 452002, India',
    lat: 22.7186,
    lng: 75.8550,
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'palace',
  },
  {
    id: 'lal-bagh-palace-indore',
    name: 'Lal Bagh Palace, Indore',
    displayName: 'Lal Bagh Palace, Revenue Colony, Indore, Madhya Pradesh, 452007, India',
    lat: 22.6975,
    lng: 75.8450,
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    countryCode: 'in',
    type: 'palace',
  },
  {
    id: 'vidhana-soudha-bengaluru',
    name: 'Vidhana Soudha, Bengaluru',
    displayName: 'Vidhana Soudha, Ambedkar Bheedhi, Sampangi Rama Nagara, Bengaluru, Karnataka, 560001, India',
    lat: 12.9797,
    lng: 77.5907,
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    countryCode: 'in',
    type: 'landmark',
  },
  {
    id: 'howrah-bridge-kolkata',
    name: 'Howrah Bridge, Kolkata',
    displayName: 'Howrah Bridge (Rabindra Setu), Howrah, Kolkata, West Bengal, 700001, India',
    lat: 22.5851,
    lng: 88.3468,
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    countryCode: 'in',
    type: 'landmark',
  },
  {
    id: 'bandra-worli-sea-link-mumbai',
    name: 'Bandra-Worli Sea Link, Mumbai',
    displayName: 'Bandra-Worli Sea Link, Mahim Bay, Mumbai, Maharashtra, 400050, India',
    lat: 19.0365,
    lng: 72.8172,
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'in',
    type: 'landmark',
  },
  {
    id: 'victoria-memorial-kolkata',
    name: 'Victoria Memorial, Kolkata',
    displayName: 'Victoria Memorial, 1 Queen’s Way, Maidan, Kolkata, West Bengal, 700071, India',
    lat: 22.5448,
    lng: 88.3426,
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'rashtrapati-bhavan-delhi',
    name: 'Rashtrapati Bhavan, Delhi',
    displayName: 'Rashtrapati Bhavan & Amrit Udyan, Raisina Hill, New Delhi, Delhi, 110004, India',
    lat: 28.6143,
    lng: 77.1994,
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    countryCode: 'in',
    type: 'palace',
  },
  {
    id: 'lotus-temple-delhi',
    name: 'Lotus Temple, Delhi',
    displayName: 'Lotus Temple (Baháʼí House of Worship), Kalkaji, New Delhi, Delhi, 110019, India',
    lat: 28.5535,
    lng: 77.2588,
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    countryCode: 'in',
    type: 'temple',
  },
  {
    id: 'vivekananda-rock-memorial-kanyakumari',
    name: 'Vivekananda Rock Memorial, Kanyakumari',
    displayName: 'Vivekananda Rock Memorial, Kanyakumari, Tamil Nadu, 629702, India',
    lat: 8.0780,
    lng: 77.5552,
    city: 'Kanyakumari',
    state: 'Tamil Nadu',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'statue-of-unity-kevadia',
    name: 'Statue of Unity, Gujarat',
    displayName: 'Statue of Unity, Sardar Sarovar Dam, Ekta Nagar, Kevadia, Gujarat, 393155, India',
    lat: 21.8380,
    lng: 73.7191,
    city: 'Kevadia',
    state: 'Gujarat',
    country: 'India',
    countryCode: 'in',
    type: 'monument',
  },
  {
    id: 'paris-eiffel-tower',
    name: 'Eiffel Tower, Paris',
    displayName: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    lat: 48.8583701,
    lng: 2.2944813,
    city: 'Paris',
    state: 'Île-de-France',
    country: 'France',
    countryCode: 'fr',
    type: 'monument',
  },
  {
    id: 'rome-colosseum',
    name: 'Colosseum, Rome',
    displayName: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
    lat: 41.8902102,
    lng: 12.4922309,
    city: 'Rome',
    state: 'Lazio',
    country: 'Italy',
    countryCode: 'it',
    type: 'monument',
  },
  {
    id: 'london-big-ben',
    name: 'Big Ben & Westminster, London',
    displayName: 'Westminster, London SW1A 0AA, United Kingdom',
    lat: 51.500729,
    lng: -0.124625,
    city: 'London',
    state: 'England',
    country: 'United Kingdom',
    countryCode: 'gb',
    type: 'monument',
  },
  {
    id: 'tokyo-sensoji',
    name: 'Senso-ji Temple & Asakusa, Tokyo',
    displayName: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan',
    lat: 35.714765,
    lng: 139.796655,
    city: 'Tokyo',
    state: 'Tokyo',
    country: 'Japan',
    countryCode: 'jp',
    type: 'temple',
  },
  {
    id: 'dubai-burj-khalifa',
    name: 'Burj Khalifa, Dubai',
    displayName: '1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, Dubai, United Arab Emirates',
    lat: 25.197197,
    lng: 55.274376,
    city: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'ae',
    type: 'landmark',
  },
  {
    id: 'new-york-statue-liberty',
    name: 'Statue of Liberty & Manhattan, New York',
    displayName: 'Statue of Liberty National Monument, New York, NY 10004, USA',
    lat: 40.689249,
    lng: -74.044500,
    city: 'New York',
    state: 'New York',
    country: 'United States',
    countryCode: 'us',
    type: 'monument',
  }
];

export const locationService = {
  async search(query: string): Promise<LocationItem[]> {
    if (!query || query.trim().length === 0) {
      return CURATED_LOCATIONS.slice(0, 8);
    }

    const cleanQ = query.trim();
    const lowerQ = cleanQ.toLowerCase();

    // 1. Check curated matches first for speed & guaranteed accuracy
    const curatedMatches = CURATED_LOCATIONS.filter(item =>
      item.name.toLowerCase().includes(lowerQ) ||
      item.displayName.toLowerCase().includes(lowerQ) ||
      (item.city && item.city.toLowerCase().includes(lowerQ)) ||
      (item.state && item.state.toLowerCase().includes(lowerQ)) ||
      item.country.toLowerCase().includes(lowerQ)
    );

    const apiResults: LocationItem[] = [];

    // 2. Fetch from OpenStreetMap Nominatim
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanQ)}&format=jsonv2&addressdetails=1&limit=8`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'HeritAR-Travel-Discovery-App/1.0 (contact: support@heritar.travel)',
          'Accept-Language': 'en',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item: any) => {
            const addr = item.address || {};
            const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || '';
            const state = addr.state || addr.region || '';
            const country = addr.country || '';
            const countryCode = addr.country_code || '';

            apiResults.push({
              id: `osm-${item.osm_type || 'n'}-${item.osm_id || Math.random().toString(36).substring(7)}`,
              name: item.name || item.display_name.split(',')[0],
              displayName: item.display_name,
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              city,
              state,
              country,
              countryCode,
              type: item.type || item.category || 'place',
              osmId: String(item.osm_id),
            });
          });
        }
      }
    } catch (err) {
      console.warn('Nominatim search timed out or failed:', err);
    }

    // 3. If Nominatim returned few or zero results, use Wikipedia Geosearch fallback
    if (apiResults.length === 0) {
      try {
        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(cleanQ)}&gsrlimit=5&prop=coordinates|description&format=json&origin=*`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch(wikiUrl, {
          headers: {
            'User-Agent': 'HeritAR-Travel-Discovery-App/1.0',
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const pages = data.query?.pages;
          if (pages) {
            for (const p of Object.values(pages) as any[]) {
              if (p.coordinates && p.coordinates[0]) {
                const coord = p.coordinates[0];
                apiResults.push({
                  id: `wiki-loc-${p.pageid}`,
                  name: p.title,
                  displayName: `${p.title}${p.description ? ' - ' + p.description : ''}`,
                  lat: coord.lat,
                  lng: coord.lon,
                  country: 'Global Destination',
                  type: 'landmark',
                });
              }
            }
          }
        }
      } catch (err) {
        console.warn('Wikipedia fallback geosearch failed:', err);
      }
    }

    // Combine curated and live results, deduplicating by proximity
    const combined = [...curatedMatches];
    for (const res of apiResults) {
      const isDuplicate = combined.some(c => 
        (Math.abs(c.lat - res.lat) < 0.05 && Math.abs(c.lng - res.lng) < 0.05) ||
        c.name.toLowerCase() === res.name.toLowerCase()
      );
      if (!isDuplicate) {
        combined.push(res);
      }
    }

    return combined.length > 0 ? combined.slice(0, 10) : CURATED_LOCATIONS.slice(0, 6);
  },

  async reverseGeocode(lat: number, lng: number): Promise<LocationItem | null> {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&addressdetails=1`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'HeritAR-Travel-Discovery-App/1.0',
          'Accept-Language': 'en',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const addr = data.address || {};
        return {
          id: `osm-rev-${data.osm_id || 'coords'}`,
          name: data.name || addr.suburb || addr.city || addr.town || 'Your Location',
          displayName: data.display_name,
          lat,
          lng,
          city: addr.city || addr.town || addr.village || '',
          state: addr.state || '',
          country: addr.country || '',
          countryCode: addr.country_code || '',
          type: 'current_location',
        };
      }
    } catch (e) {
      console.warn('Reverse geocode failed, returning coordinates fallback', e);
    }

    return {
      id: `coord-${lat.toFixed(4)}-${lng.toFixed(4)}`,
      name: `Location (${lat.toFixed(3)}, ${lng.toFixed(3)})`,
      displayName: `Coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      lat,
      lng,
      country: 'Current Area',
      type: 'current_location',
    };
  },

  getCurated(): LocationItem[] {
    return CURATED_LOCATIONS;
  }
};
