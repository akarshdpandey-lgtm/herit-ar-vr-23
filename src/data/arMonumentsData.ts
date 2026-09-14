import { ARDetectionBoundingBox } from '../types';

export interface ARMonumentProfile {
  id: string;
  name: string;
  location: string;
  yearBuilt: string;
  dynasty: string;
  architecturalStyle: string;
  image: string;
  audioNarration: string;
  boundingBoxes: ARDetectionBoundingBox[];
}

export const MONUMENT_AR_DATABASE: ARMonumentProfile[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal Mausoleum',
    location: 'Agra, Uttar Pradesh',
    yearBuilt: '1632 - 1653 CE',
    dynasty: 'Mughal Empire (Emperor Shah Jahan)',
    architecturalStyle: 'Mughal High Classical with Makrana Marble',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg',
    audioNarration:
      'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river. Commissioned by Emperor Shah Jahan for his favorite wife Mumtaz Mahal, it combines Persian, Indian, and Islamic architectural idioms with flawless bilateral symmetry.',
    boundingBoxes: [
      {
        id: 'box-dome',
        label: 'Bulbous Marble Onion Dome (Amrud)',
        hindiLabel: 'मुख्य संगमरमर गुंबद',
        confidence: 99.1,
        topPercent: 14,
        leftPercent: 38,
        widthPercent: 24,
        heightPercent: 26,
        architecturalTerm: 'Double-Shelled Onion Dome',
        historicalContext:
          'Rises 35 meters high. The double-dome engineering creates ideal interior acoustics while presenting monumental exterior height.',
        audioNarrationSnippet:
          'The central marble dome is double-shelled, standing thirty-five meters tall, crowned by a gilded lotus finial.',
      },
      {
        id: 'box-iwan',
        label: 'Monumental Pishtaq (Iwan Arch)',
        hindiLabel: 'विशाल मेहराबदार द्वार (पिश्ताक़)',
        confidence: 97.4,
        topPercent: 44,
        leftPercent: 39,
        widthPercent: 22,
        heightPercent: 30,
        architecturalTerm: 'Cusped Pishtaq Vault with Thuluth Calligraphy',
        historicalContext:
          'Inscribed with Quranic verses designed by calligrapher Amanat Khan, carved in black marble inlay graduating in size so it appears uniform from ground level.',
        audioNarrationSnippet:
          'The calligraphy around this giant arch subtly increases in letter size towards the top, an optical illusion ensuring the text reads evenly from the floor.',
      },
      {
        id: 'box-minaret',
        label: 'Slightly Outward-Leaning Minaret',
        hindiLabel: 'बाहर की ओर झुकी मीनार',
        confidence: 96.8,
        topPercent: 28,
        leftPercent: 12,
        widthPercent: 10,
        heightPercent: 55,
        architecturalTerm: 'Tapering Minaret with Chhatri',
        historicalContext:
          'All four 40-meter minarets are deliberately angled slightly outward, ensuring that in the event of an earthquake, they would fall away from the sacred tomb.',
        audioNarrationSnippet:
          'Notice how each minaret leans outward by a fraction of a degree. This seismic engineering safeguard protects the central tomb.',
      },
    ],
  },
  {
    id: 'golden-temple',
    name: 'Golden Temple (Sri Harmandir Sahib)',
    location: 'Amritsar, Punjab',
    yearBuilt: '1581 - 1604 CE (Gold foil added 1830)',
    dynasty: 'Sikh Empire (Guru Arjan Dev Ji & Maharaja Ranjit Singh)',
    architecturalStyle: 'Sikh Architectural Synthesis (Indo-Islamic & Rajput)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg',
    audioNarration:
      'Sri Harmandir Sahib, known worldwide as the Golden Temple, stands in the center of the holy Amrit Sarovar. Guru Arjan Dev Ji designed the temple with four entrances open in all cardinal directions, symbolizing universal brotherhood regardless of caste or creed. Maharaja Ranjit Singh gilded the upper sanctum with pure gold leaf.',
    boundingBoxes: [
      {
        id: 'box-gold-dome',
        label: 'Gilded Fluted Sanctum Dome',
        hindiLabel: 'स्वर्ण मंडित केंद्रीय गुंबद',
        confidence: 99.4,
        topPercent: 20,
        leftPercent: 42,
        widthPercent: 18,
        heightPercent: 22,
        architecturalTerm: 'Fluted Lotus Dome with Chhatris',
        historicalContext:
          'Crowned with a Kalasa finial and copper sheets covered in 500 kilograms of pure gold leaf donated by Maharaja Ranjit Singh in 1830.',
        audioNarrationSnippet:
          'The gilded upper storeys reflect brilliance onto the surrounding holy waters, engineered with four miniature corner chhatris.',
      },
      {
        id: 'box-sarovar',
        label: 'Amrit Sarovar (Pool of Nectar)',
        hindiLabel: 'पवित्र अमृत सरोवर',
        confidence: 98.2,
        topPercent: 65,
        leftPercent: 10,
        widthPercent: 80,
        heightPercent: 30,
        architecturalTerm: 'Sacred Water Tank & Parikrama',
        historicalContext:
          'Excavated by Guru Ram Das Ji in 1577 CE. Pilgrims perform Parikrama along the white marble promenade around the nectar pool.',
        audioNarrationSnippet:
          'The holy pool of nectar, fed by the Ravi river, is encircled by a wide white marble Parikrama walk.',
      },
      {
        id: 'box-darshani-deori',
        label: 'Darshani Deori & Causeway',
        hindiLabel: 'दर्शनी ड्योढ़ी एवं सेतु मार्ग',
        confidence: 96.5,
        topPercent: 52,
        leftPercent: 24,
        widthPercent: 20,
        heightPercent: 25,
        architecturalTerm: 'Marble Bridge & Gateway',
        historicalContext:
          'The narrow bridge connects the Darshani Deori archway to the inner sanctum, symbolizing the solitary journey of the soul to the divine.',
        audioNarrationSnippet:
          'Pilgrims cross this narrow causeway over the water to enter the sanctum, where the Guru Granth Sahib is continuously recited.',
      },
    ],
  },
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    location: 'Konark, Puri District, Odisha',
    yearBuilt: '1250 CE',
    dynasty: 'Eastern Ganga Dynasty (King Narasimhadeva I)',
    architecturalStyle: 'Kalinga Architecture (Khondalite Stone Cosmic Chariot)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg',
    audioNarration:
      'The Konark Sun Temple is designed as a colossal cosmic chariot of Surya, the Sun God, pulled by seven galloping stone horses. It features 24 intricately carved stone wheels that function as accurate sundials, calculating precise time to the minute using solar shadow angles.',
    boundingBoxes: [
      {
        id: 'box-sundial-wheel',
        label: 'Astronomical Sundial Wheel',
        hindiLabel: 'सूर्य चक्र एवं धूपघड़ी (२४ पहिये)',
        confidence: 99.2,
        topPercent: 55,
        leftPercent: 18,
        widthPercent: 25,
        heightPercent: 32,
        architecturalTerm: 'Carved Chariot Chakra with 8 Major Spokes',
        historicalContext:
          'Each 3-meter wheel has 8 major spokes and 8 minor spokes. The shadow cast by the axle calculates exact solar time and seasonal equinoxes.',
        audioNarrationSnippet:
          'The 24 wheels symbolize the 24 fortnights of the solar year, while the spokes divide the day into eight 3-hour prahars.',
      },
      {
        id: 'box-jagamohana',
        label: 'Jagamohana (Assembly Audience Hall)',
        hindiLabel: 'जगमोहन मंडप शिखर',
        confidence: 97.6,
        topPercent: 18,
        leftPercent: 35,
        widthPercent: 36,
        heightPercent: 42,
        architecturalTerm: 'Pyramidal Pidha Deula Structure',
        historicalContext:
          'Surviving 39-meter assembly hall built of Khondalite stone with iron dowels, capped with three tiers of carved stone musicians and dancers.',
        audioNarrationSnippet:
          'Notice the three horizontal tiers decorated with life-size statues of female musicians playing cymbals, mridangams, and flutes.',
      },
      {
        id: 'box-horses',
        label: 'Galloping Cosmic Horses of Surya',
        hindiLabel: 'सूर्य देव के सात दिव्य अश्व',
        confidence: 95.8,
        topPercent: 58,
        leftPercent: 62,
        widthPercent: 24,
        heightPercent: 28,
        architecturalTerm: 'Sculptured Equine Torso & Plinth',
        historicalContext:
          'Seven spirited stone steeds represent the seven days of the week and the seven colors of sunlight refracted through prism.',
        audioNarrationSnippet:
          'Seven mighty horses are carved pulling the chariot towards the Bay of Bengal sunrise in the east.',
      },
    ],
  },
  {
    id: 'kashi-vishwanath',
    name: 'Kashi Vishwanath Temple Dham',
    location: 'Varanasi, Uttar Pradesh',
    yearBuilt: '1780 CE (Rebuilt by Maharani Ahilyabai Holkar)',
    dynasty: 'Holkar Marathas',
    architecturalStyle: 'Nagara Hindu Temple with 800kg Gold Spire',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/1280px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg',
    audioNarration:
      'Kashi Vishwanath is one of the twelve sacred Jyotirlingas, located on the western bank of the holy river Ganga in Varanasi. Reconstructed by Queen Ahilyabai Holkar of Indore in 1780, its golden dome and spire were adorned with 800 kilograms of pure gold by Maharaja Ranjit Singh.',
    boundingBoxes: [
      {
        id: 'box-gold-shikhara',
        label: 'Golden Spire (Swarna Shikhara)',
        hindiLabel: 'स्वर्ण शिखर एवं कलश',
        confidence: 98.9,
        topPercent: 12,
        leftPercent: 40,
        widthPercent: 22,
        heightPercent: 35,
        architecturalTerm: 'Gilded Nagara Shikhara with Trishul Finial',
        historicalContext:
          '15.5-meter spire covered in pure gold leaf, surmounted by Lord Shiva’s sacred trident (trishula) and golden kalasha.',
        audioNarrationSnippet:
          'The golden shikhara soars above the narrow Varanasi gallis, radiating sunlight down to the sacred sanctum below.',
      },
      {
        id: 'box-corridor',
        label: 'Ganga-Mandir Heritage Corridor',
        hindiLabel: 'काशी विश्वनाथ कॉरिडोर एवं घाट संपर्क',
        confidence: 96.1,
        topPercent: 48,
        leftPercent: 22,
        widthPercent: 55,
        heightPercent: 38,
        architecturalTerm: 'Chunar Sandstone Colonnade',
        historicalContext:
          'Connects the Manikarnika and Lalita Ghats on the Ganges directly to the sanctum sanctorum through broad pedestrian plazas.',
        audioNarrationSnippet:
          'Pilgrims carry holy Ganga water directly up from the river ghats through this sandstone colonnaded corridor to offer to the Jyotirlinga.',
      },
    ],
  },
  {
    id: 'meenakshi-temple',
    name: 'Madurai Meenakshi Amman Temple',
    location: 'Madurai, Tamil Nadu',
    yearBuilt: '1623 - 1655 CE (Ancient origins expanded by Nayakas)',
    dynasty: 'Madurai Nayak Dynasty (King Tirumala Nayaka)',
    architecturalStyle: 'Dravidian Architecture (Monumental Multi-Tier Gopurams)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg',
    audioNarration:
      'The historic Meenakshi Sundareswarar Temple in Madurai is dedicated to Goddess Meenakshi (Parvati) and her consort Sundareswarar (Shiva). The complex features 14 monumental gateway towers (gopurams), the tallest being the southern tower at 52 meters, adorned with over 1,500 vividly painted stucco sculptures of deities and mythical beings.',
    boundingBoxes: [
      {
        id: 'box-south-gopuram',
        label: 'Monumental South Gopuram',
        hindiLabel: 'दक्षिण गोपुरम (५२ मीटर ऊँचाई)',
        confidence: 99.5,
        topPercent: 8,
        leftPercent: 34,
        widthPercent: 32,
        heightPercent: 78,
        architecturalTerm: '11-Storey Dravidian Raja Gopuram',
        historicalContext:
          'The 52-meter South Tower is adorned with 1,511 colorful stucco sculptures depicting puranic legends, renovated every 12 years.',
        audioNarrationSnippet:
          'This soaring 11-storey gopuram acts as a spiritual lighthouse across the ancient planned city of Madurai.',
      },
      {
        id: 'box-potramarai',
        label: 'Golden Lotus Pond (Porthamarai Kulam)',
        hindiLabel: 'स्वर्ण कमल सरोवर',
        confidence: 97.2,
        topPercent: 68,
        leftPercent: 20,
        widthPercent: 60,
        heightPercent: 26,
        architecturalTerm: 'Sacred Temple Water Basin & Colonnade',
        historicalContext:
          'Ancient Sangam poets evaluated literary manuscripts here; legendary poems would float upon its sacred surface while unworthy ones sank.',
        audioNarrationSnippet:
          'The Golden Lotus Pond is surrounded by colonnades painted with 17th-century Nayak murals.',
      },
    ],
  },
  {
    id: 'statue-of-unity',
    name: 'Statue of Unity (Sardar Vallabhbhai Patel)',
    location: 'Kevadia, Narmada District, Gujarat',
    yearBuilt: '2013 - 2018 CE',
    dynasty: 'Modern Republic of India',
    architecturalStyle: 'Monumental Bronze-Clad Colossus (182 meters)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Statue_of_Unity.jpg/1280px-Statue_of_Unity.jpg',
    audioNarration:
      'The Statue of Unity is the world’s tallest statue with a height of 182 meters, honoring the Iron Man of India, Sardar Vallabhbhai Patel. Built overlooking the Narmada River and the Sardar Sarovar Dam, it is engineered with dual reinforced concrete cores and clad in 6,500 bronze panels designed to withstand severe earthquakes and category-4 hurricane winds.',
    boundingBoxes: [
      {
        id: 'box-bronze-torso',
        label: 'Bronze Panel Cladding & Shawl',
        hindiLabel: 'कांस्य आवरण एवं पारंपरिक वेशभूषा',
        confidence: 99.6,
        topPercent: 18,
        leftPercent: 36,
        widthPercent: 28,
        heightPercent: 42,
        architecturalTerm: 'Micro-Engineered Bronze Facade Plates',
        historicalContext:
          'Features 6,500 high-grade bronze panels cast using traditional artisan techniques to achieve natural facial likeness and draped khadi folds.',
        audioNarrationSnippet:
          'Over six thousand individual bronze tiles interlock with expansion joints to flex safely under high river gusts.',
      },
      {
        id: 'box-viewing-gallery',
        label: '153-Meter Chest Viewing Gallery',
        hindiLabel: '१५३ मीटर ऊँची दर्शक दीर्घा',
        confidence: 98.1,
        topPercent: 34,
        leftPercent: 42,
        widthPercent: 16,
        heightPercent: 12,
        architecturalTerm: 'High-Speed Elevators & Panoramic Deck',
        historicalContext:
          'High-speed twin elevators travel 4 meters per second to carry 200 visitors at a time to the panoramic deck inside the chest cavity.',
        audioNarrationSnippet:
          'Inside the chest at 153 meters, visitors gaze through panoramic glass at the Satpura and Vindhya mountain ranges.',
      },
      {
        id: 'box-plinth',
        label: 'Sadhu Bet River Island Plinth',
        hindiLabel: 'साधु बेट द्वीप आधार पीठ',
        confidence: 96.8,
        topPercent: 78,
        leftPercent: 25,
        widthPercent: 50,
        heightPercent: 18,
        architecturalTerm: 'Dual Reinforced Concrete Core Pedestal',
        historicalContext:
          'Anchor base engineered down to solid rock bed, housing an interactive museum celebrating India’s national integration in 1947.',
        audioNarrationSnippet:
          'The base pedestal rests on the bedrock of Sadhu Bet island, housing an expansive 3D audio-visual memorial museum.',
      },
    ],
  },
  {
    id: 'charminar',
    name: 'Charminar Monument & Mosque',
    location: 'Old City, Hyderabad, Telangana',
    yearBuilt: '1591 CE',
    dynasty: 'Qutb Shahi Dynasty (Muhammad Quli Qutb Shah)',
    architecturalStyle: 'Indo-Islamic with Persian & Qutb Shahi Accents',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/1280px-Charminar_Hyderabad_1.jpg',
    audioNarration:
      'Charminar, meaning "Four Minarets", is the defining landmark of Hyderabad. Built in 1591 by Sultan Muhammad Quli Qutb Shah to commemorate the end of a deadly plague and mark the founding of Hyderabad, it features four 56-meter stucco minarets with four grand pointed arches facing the four cardinal royal highways.',
    boundingBoxes: [
      {
        id: 'box-minarets-4',
        label: 'Four Grand 56m Stucco Minarets',
        hindiLabel: 'चार भव्य ५६ मीटर मीनारें',
        confidence: 99.3,
        topPercent: 8,
        leftPercent: 16,
        widthPercent: 68,
        heightPercent: 52,
        architecturalTerm: 'Four-Tier Minarets with Carved Balconies',
        historicalContext:
          'Each minaret contains 149 spiral stone steps winding up to the upper mosque terrace and royal watch gallery.',
        audioNarrationSnippet:
          'The four minarets soar 56 meters, detailed with delicate plaster rosettes and petalled balconies.',
      },
      {
        id: 'box-grand-arch',
        label: 'Monumental Pointed Archway',
        hindiLabel: 'विशाल नुकीला प्रवेश मेहराब',
        confidence: 97.8,
        topPercent: 48,
        leftPercent: 32,
        widthPercent: 36,
        heightPercent: 38,
        architecturalTerm: 'Persian-Style Ogee Grand Arch',
        historicalContext:
          'Built with granite, limestone, and crushed marble mortar. Once allowed royal elephants and royal cavalcades to pass through.',
        audioNarrationSnippet:
          'The four grand arches are 11 meters wide, opening into the historic bazaars of Laad Bazaar and Char Kaman.',
      },
    ],
  },
  {
    id: 'victoria-memorial',
    name: 'Victoria Memorial Hall',
    location: 'Maidan, Kolkata, West Bengal',
    yearBuilt: '1906 - 1921 CE',
    dynasty: 'British Raj (Designed by Sir William Emerson)',
    architecturalStyle: 'Indo-Saracenic & British Neoclassical with Makrana Marble',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/1280px-Victoria_Memorial_situated_in_Kolkata.jpg',
    audioNarration:
      'The Victoria Memorial is a monumental white marble palace set in 64 acres of manicured gardens in Kolkata. Designed by William Emerson using Makrana marble from the same quarries as the Taj Mahal, it fuses British classical architecture with Mughal domes and Italian Renaissance colonnades.',
    boundingBoxes: [
      {
        id: 'box-angel-dome',
        label: 'Central Dome & Angel of Victory',
        hindiLabel: 'केंद्रीय गुंबद एवं विजय की परी (एंजेल)',
        confidence: 98.8,
        topPercent: 14,
        leftPercent: 42,
        widthPercent: 16,
        heightPercent: 24,
        architecturalTerm: 'Neoclassical Dome with Revolving Bronze Angel',
        historicalContext:
          'Surmounted by a 16-foot revolving bronze Angel of Victory that rotates on ball bearings with the wind direction.',
        audioNarrationSnippet:
          'The central dome stands 56 meters tall, crowned by the famous revolving black bronze Angel of Victory.',
      },
      {
        id: 'box-marble-facade',
        label: 'White Makrana Marble Colonnade',
        hindiLabel: 'सफेद मकराना संगमरमर स्तंभ दीर्घा',
        confidence: 97.4,
        topPercent: 42,
        leftPercent: 25,
        widthPercent: 50,
        heightPercent: 35,
        architecturalTerm: 'Corinthian Portico & Corner Chhatris',
        historicalContext:
          'Constructed from pure white Makrana marble quarried in Rajasthan, identical to the stone used in the Taj Mahal.',
        audioNarrationSnippet:
          'The majestic facade blends Italian renaissance symmetry with Mughal-style corner chhatris overlooking the lotus lake.',
      },
    ],
  },
  {
    id: 'qutub-minar',
    name: 'Qutub Minar',
    location: 'Mehrauli, New Delhi',
    yearBuilt: '1199 - 1220 CE',
    dynasty: 'Delhi Sultanate (Mamluk Dynasty)',
    architecturalStyle: 'Afghano-Delhi Sultanate Fluted Minaret',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/1280px-Qutb_Minar_2022.jpg',
    audioNarration:
      'Qutub Minar is a 72.5-meter tapering victory tower and minaret in Mehrauli, Delhi. Begun by Qutb-ud-din Aibak and completed by Iltutmish, it is the tallest brick minaret in the world, constructed of red sandstone carved with geometric Arabic calligraphy and fluted stalactite brackets.',
    boundingBoxes: [
      {
        id: 'box-fluted-shaft',
        label: 'Fluted Red Sandstone Storeys',
        hindiLabel: 'नालीदार लाल बलुआ पत्थर की मंजिलें',
        confidence: 99.4,
        topPercent: 12,
        leftPercent: 38,
        widthPercent: 24,
        heightPercent: 68,
        architecturalTerm: 'Alternating Angular & Semicircular Flutings',
        historicalContext:
          'First three storeys are constructed of red sandstone with alternating fluted ribs; the top two storeys use white marble added by Firoz Shah Tughlaq.',
        audioNarrationSnippet:
          'The minaret tapers from a 14.3-meter base diameter to just 2.7 meters at the summit across 379 spiral stone steps.',
      },
      {
        id: 'box-balconies',
        label: 'Stalactite Muqarnas Balcony Brackets',
        hindiLabel: 'नक्काशीदार कंगूरे एवं बालकनी ब्रैकेट',
        confidence: 97.1,
        topPercent: 38,
        leftPercent: 36,
        widthPercent: 28,
        heightPercent: 12,
        architecturalTerm: 'Projecting Balconies with Arabic Inscriptions',
        historicalContext:
          'Ornate corbelled brackets support projecting balconies, band-inscribed with Quranic verses and praise of Sultan Iltutmish in Kufic script.',
        audioNarrationSnippet:
          'Observe the intricate stalactite honeycombing beneath each projecting balcony, creating delicate shadow gradients in desert sunlight.',
      },
    ],
  },
  {
    id: 'ajanta-ellora',
    name: 'Ajanta & Ellora Caves',
    location: 'Chhatrapati Sambhaji Nagar, Maharashtra',
    yearBuilt: '2nd Century BCE - 10th Century CE',
    dynasty: 'Satavahana, Vakataka, & Rashtrakuta Dynasties',
    architecturalStyle: 'Monolithic Rock-Cut Basalt Caves (Kailash Temple)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ajanta_Caves%2C_India%2C_Ajanta_basalt_cliffs_and_caves.jpg/1280px-Ajanta_Caves%2C_India%2C_Ajanta_basalt_cliffs_and_caves.jpg',
    audioNarration:
      'Ajanta and Ellora represent the pinnacle of ancient Indian rock-cut architecture. Ajanta features 30 Buddhist cave monuments adorned with world-renowned fresco paintings. Ellora Cave 16 houses the Kailash Temple—the largest monolithic rock excavation in the world, carved vertically downwards from a single basalt cliff without scaffolding.',
    boundingBoxes: [
      {
        id: 'box-kailash-vimana',
        label: 'Monolithic Kailash Temple (Cave 16)',
        hindiLabel: 'कैलाश एकाश्म मंदिर शिखर (गुफा १६)',
        confidence: 99.7,
        topPercent: 22,
        leftPercent: 32,
        widthPercent: 36,
        heightPercent: 52,
        architecturalTerm: 'Top-Down Monolithic Excavation in Basalt',
        historicalContext:
          'Carved from top to bottom by King Krishna I in 756–773 CE. Over 200,000 tonnes of volcanic rock were chiselled away by hand.',
        audioNarrationSnippet:
          'Kailash Temple was not built stone-by-stone; it was sculpted directly out of the mountain cliff from top to bottom with astonishing mathematical precision.',
      },
      {
        id: 'box-elephant-plinth',
        label: 'Life-Sized Elephant Caryatid Base',
        hindiLabel: 'हाथियों की पंक्ति पर आधारित मंदिर पीठिका',
        confidence: 97.5,
        topPercent: 68,
        leftPercent: 26,
        widthPercent: 48,
        heightPercent: 20,
        architecturalTerm: 'Continuous Rock-Carved Elephant Frieze',
        historicalContext:
          'A continuous herd of life-size rock elephants supports the entire multi-storey temple on their stone backs.',
        audioNarrationSnippet:
          'A procession of life-sized monolithic elephants appears to lift the holy mountain temple toward the heavens.',
      },
    ],
  },
  {
    id: 'jagannath-puri',
    name: 'Shree Jagannath Temple',
    location: 'Puri, Odisha',
    yearBuilt: '1161 CE',
    dynasty: 'Eastern Ganga Dynasty (King Anantavarman Chodaganga)',
    architecturalStyle: 'Kalinga Temple Architecture (Bada Deula Spire)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Shri_Jagannath_temple.jpg/1280px-Shri_Jagannath_temple.jpg',
    audioNarration:
      'Shree Jagannath Temple in Puri is one of the revered Char Dham pilgrimage sites of Hinduism, dedicated to Lord Jagannath, Balabhadra, and Subhadra. The central curvilinear tower rises 65 meters high, crowned with the sacred Neela Chakra wheel and the holy Patitapabana flag, which uniquely flutters opposite to the wind direction.',
    boundingBoxes: [
      {
        id: 'box-neela-chakra',
        label: 'Neela Chakra & Patitapabana Flag',
        hindiLabel: 'नीलचक्र एवं पतितपावन ध्वज',
        confidence: 99.0,
        topPercent: 8,
        leftPercent: 44,
        widthPercent: 12,
        heightPercent: 18,
        architecturalTerm: 'Ashtadhatu 8-Metal Wheel Finial',
        historicalContext:
          'A 20-foot alloy wheel weighing over one tonne sits atop the spire. The temple flag is changed daily by Chuna Sevaks scaling the bare stone exterior.',
        audioNarrationSnippet:
          'At the apex stands the divine Neela Chakra, forged of eight sacred metals, with the holy Patitapabana flag waving in the coastal winds.',
      },
      {
        id: 'box-puri-shikhara',
        label: 'Rekha Deula Spire (65m Height)',
        hindiLabel: 'रेखा देउल मुख्य शिखर (६५ मीटर)',
        confidence: 98.3,
        topPercent: 24,
        leftPercent: 36,
        widthPercent: 28,
        heightPercent: 54,
        architecturalTerm: 'Pancharatha Kalinga Curvilinear Spire',
        historicalContext:
          'The colossal tower casts zero visible shadow on the ground at midday, an optical marvel engineered by Kalinga stone masters in the 12th century.',
        audioNarrationSnippet:
          'Built atop a raised stone platform called Kurma Beda, this 65-meter spire dominates the Bay of Bengal coastline.',
      },
    ],
  },
  {
    id: 'brihadeeswarar',
    name: 'Brihadeeswarar Temple (Peruvudaiyar Kovil)',
    location: 'Thanjavur, Tamil Nadu',
    yearBuilt: '1010 CE',
    dynasty: 'Chola Dynasty (Emperor Raja Raja Chola I)',
    architecturalStyle: 'Chola Dravidian Architecture (All-Granite Great Living Temple)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/1280px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg',
    audioNarration:
      'Brihadeeswarar Temple, also known as the Big Temple of Thanjavur, celebrated its 1,000th anniversary in 2010. Built entirely of granite in a region with no nearby stone quarries, its 66-meter Vimana tower is crowned with an 80-tonne single-stone granite Kumbam dome brought to the top via a 6-kilometer earthen ramp.',
    boundingBoxes: [
      {
        id: 'box-granite-kumbam',
        label: '80-Tonne Monolithic Granite Kumbam',
        hindiLabel: '८० टन अखंड ग्रेनाइट कलश शिखर',
        confidence: 99.6,
        topPercent: 10,
        leftPercent: 42,
        widthPercent: 16,
        heightPercent: 18,
        architecturalTerm: 'Monolithic Granite Dome Capstone',
        historicalContext:
          'An 80-tonne single granite block was hauled 66 meters up to the top of the tower using an inclined earth embankment rolled by royal elephants.',
        audioNarrationSnippet:
          'The apex capstone weighs 80 tonnes, carved from a single piece of dense granite, placed without mortar.',
      },
      {
        id: 'box-chola-vimana',
        label: '16-Tier Soaring Vimana Tower',
        hindiLabel: '१६ मंजिला भव्य विमान गोपुरम (६६ मीटर)',
        confidence: 98.7,
        topPercent: 25,
        leftPercent: 32,
        widthPercent: 36,
        heightPercent: 55,
        architecturalTerm: 'Interlocking Granite Masonry Tower',
        historicalContext:
          'Unlike later Dravidian temples where gopurams are taller, here the sanctum Vimana itself towers over the entire landscape.',
        audioNarrationSnippet:
          'Constructed from 130,000 tonnes of granite, assembled using mortise-and-tenon interlocking stone joints that have survived a millennium of weather.',
      },
    ],
  },
  {
    id: 'lotus-temple',
    name: 'Lotus Temple (Baháʼí House of Worship)',
    location: 'Kalkaji, New Delhi',
    yearBuilt: '1986 CE',
    dynasty: 'Modern Baháʼí Faith (Architect Fariborz Sahba)',
    architecturalStyle: 'Expressionist Biomimetic Architecture in Greek Pentelic Marble',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/LotusDelhi.jpg',
    audioNarration:
      'The Lotus Temple is a Baháʼí House of Worship in New Delhi, notable for its flowerlike biomimetic form composed of 27 free-standing marble petals arranged in clusters of three to form nine doors opening onto a central hall. It welcomes visitors of all religions, with no idols, rituals, or clergy inside.',
    boundingBoxes: [
      {
        id: 'box-marble-petals',
        label: '27 Free-Standing Marble Petals',
        hindiLabel: 'संगमरमर की २७ खुली पंखुड़ियाँ',
        confidence: 99.1,
        topPercent: 20,
        leftPercent: 22,
        widthPercent: 56,
        heightPercent: 52,
        architecturalTerm: 'Double-Curved Thin-Shell Ferroconcrete Ribs',
        historicalContext:
          'Clad in pure white Penteli marble quarried in Greece, the same marble used to build the Parthenon in Athens.',
        audioNarrationSnippet:
          'The lotus blossom petals are engineered with self-supporting curved ferroconcrete ribs, admitting natural skylight into the silent prayer dome.',
      },
      {
        id: 'box-nine-ponds',
        label: 'Nine Surrounding Cooling Ponds',
        hindiLabel: 'नौ ज्यामितीय जल कुंड',
        confidence: 97.4,
        topPercent: 68,
        leftPercent: 12,
        widthPercent: 76,
        heightPercent: 25,
        architecturalTerm: 'Passive Geothermal Water Cooling Array',
        historicalContext:
          'Nine leaf-shaped ponds create natural evaporative air currents that naturally ventilate the 2,500-seat central auditorium.',
        audioNarrationSnippet:
          'The nine surrounding ponds act as a natural geothermal air-conditioning system, pulling cooling moisture through the hall.',
      },
    ],
  },
  {
    id: 'manali-hidimba',
    name: 'Manali & Hidimba Devi Temple',
    location: 'Dhungri Forest, Manali, Himachal Pradesh',
    yearBuilt: '1553 CE',
    dynasty: 'Kullu Rajas (Raja Bahadur Singh)',
    architecturalStyle: 'Himachali Kathkuni Wooden Pagoda',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hadimba_Devi_Temple%2CManali%2CHimachal_Pradesh.jpg/1280px-Hadimba_Devi_Temple%2CManali%2CHimachal_Pradesh.jpg',
    audioNarration:
      'The Hidimba Devi Temple in Manali is an ancient four-tiered wooden pagoda sanctuary built around a natural cave rock in the middle of a cedar (deodar) forest. Built in 1553 by Maharaja Bahadur Singh, it features exquisite wood carvings of dancers, animals, and folk motifs, dedicated to Hidimba, wife of Pandava Bhima.',
    boundingBoxes: [
      {
        id: 'box-timber-pagoda',
        label: 'Four-Tiered Deodar Wood Pagoda',
        hindiLabel: 'चार मंजिला देवदार काष्ठ शिवालय',
        confidence: 98.7,
        topPercent: 15,
        leftPercent: 35,
        widthPercent: 30,
        heightPercent: 48,
        architecturalTerm: 'Kathkuni Timber & Slate Tiered Roof',
        historicalContext:
          'Built without metal nails using traditional Kath-Kuni wood-and-stone seismic interlocking craftsmanship to flex during Himalayan earth tremors.',
        audioNarrationSnippet:
          'The top circular cone is clad in brass, while the lower three tiers are roofed in native timber shingles surrounded by century-old deodar pines.',
      },
      {
        id: 'box-carved-doorway',
        label: 'Intricately Carved Sacred Doorway',
        hindiLabel: 'काष्ठ नक्काशीदार पवित्र द्वार',
        confidence: 97.0,
        topPercent: 62,
        leftPercent: 40,
        widthPercent: 20,
        heightPercent: 28,
        architecturalTerm: 'Folk Wooden Relief & Sacred Rock Sanctum',
        historicalContext:
          'Features hand-chiseled depictions of Lord Ganesha, Mahishasuramardini, and protective forest spirits protecting the inner cave chamber.',
        audioNarrationSnippet:
          'Notice the intricately hand-chiseled wooden jambs depicting mountain deities, floral creepers, and wild Himalayan animals.',
      },
    ],
  },
  {
    id: 'goa-aguada',
    name: 'Goa Fort Aguada & Heritage Churches',
    location: 'Sinquerim Beach & Old Goa, Goa',
    yearBuilt: '1612 CE',
    dynasty: 'Portuguese Colonial Administration',
    architecturalStyle: 'Portuguese Baroque & Coastal Laterite Stone Fortification',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Fort_aguada.jpg',
    audioNarration:
      'Fort Aguada is a seventeenth-century Portuguese coastal fortress standing at the mouth of the Mandovi River in North Goa. Named after the freshwater spring inside ("Aguada" meaning water in Portuguese), it features a four-storey laterite stone lighthouse built in 1864, the oldest of its kind in Asia, overlooking the Arabian Sea.',
    boundingBoxes: [
      {
        id: 'box-lighthouse',
        label: 'Historic 1864 Laterite Lighthouse',
        hindiLabel: '१८६४ ऐतिहासिक लाइटहाउस मीनार',
        confidence: 99.2,
        topPercent: 18,
        leftPercent: 38,
        widthPercent: 24,
        heightPercent: 50,
        architecturalTerm: 'Four-Tiered Circular Laterite Lighthouse',
        historicalContext:
          'Asia’s oldest lighthouse, once emitting light every 7 minutes using oil lamps to guide Portuguese ships safely past the Aguada sandbars.',
        audioNarrationSnippet:
          'The four-tiered lighthouse was built with local porous red laterite stone, coated in lime wash to withstand coastal monsoons.',
      },
      {
        id: 'box-sea-bastion',
        label: 'Coastal Sea Bastions & Moat',
        hindiLabel: 'तटीय बुर्ज एवं परकोटा',
        confidence: 96.9,
        topPercent: 65,
        leftPercent: 15,
        widthPercent: 70,
        heightPercent: 28,
        architecturalTerm: 'Laterite Stone Embrasures & Sea Wall',
        historicalContext:
          'Mounted 79 cannons that guarded the Mandovi estuary against Dutch naval raids and Maratha forces.',
        audioNarrationSnippet:
          'Massive laterite ramparts drop down to the crashing waves of Sinquerim beach and the Arabian Sea.',
      },
    ],
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal (Palace of Winds)',
    location: 'Pink City, Jaipur, Rajasthan',
    yearBuilt: '1799 CE',
    dynasty: 'Kachhwaha Rajputs (Maharaja Sawai Pratap Singh)',
    architecturalStyle: 'Rajput & Mughal Fusion with Red/Pink Sandstone',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg',
    audioNarration:
      'Hawa Mahal, or the Palace of Winds, was commissioned in 1799 by Maharaja Sawai Pratap Singh. Inspired by the crown of Lord Krishna, this five-storey pyramidal façade features 953 intricately carved sandstone jharokhas that allow cool breezes to circulate naturally via the Venturi effect.',
    boundingBoxes: [
      {
        id: 'box-jharokha',
        label: 'Honeycomb Jharokha Windows',
        hindiLabel: 'जालीदार झरोखे (९५३ खिड़कियाँ)',
        confidence: 98.7,
        topPercent: 28,
        leftPercent: 32,
        widthPercent: 36,
        heightPercent: 38,
        architecturalTerm: 'Jharokha with Jaali Lattice',
        historicalContext:
          '953 miniature casements allowed women of the royal court to observe street festivities and processions while remaining unseen.',
        audioNarrationSnippet:
          'The 953 miniature jharokhas were mathematically calibrated to channel natural winds through tiny apertures, dropping interior temperatures by up to 5 degrees.',
      },
      {
        id: 'box-crown',
        label: 'Krishna Crown Pyramidal Spire',
        hindiLabel: 'मुकुटाकार शिखर',
        confidence: 96.2,
        topPercent: 8,
        leftPercent: 40,
        widthPercent: 20,
        heightPercent: 18,
        architecturalTerm: 'Mukut Shikhara Form',
        historicalContext:
          'Sawai Pratap Singh was a devoted worshipper of Lord Krishna, and had architect Lal Chand Ustad design the exterior resembling Krishna’s jeweled crown.',
        audioNarrationSnippet:
          'Notice how the top spire tapers symmetrically into a sacred crown silhouette, built entirely without a solid foundation—it stands purely on its curved geometry.',
      },
      {
        id: 'box-chattri',
        label: 'Fluted Sandstone Chhatris & Eaves',
        hindiLabel: 'गुंबदनुमा छतरियां और छज्जे',
        confidence: 94.8,
        topPercent: 52,
        leftPercent: 15,
        widthPercent: 24,
        heightPercent: 26,
        architecturalTerm: 'Bangaldar Roof & Chattri',
        historicalContext:
          'Curved Rajput roof eaves (chhajja) shield the lower floors from monsoon rains and intense desert sunlight.',
        audioNarrationSnippet:
          'These fluted cornices and arched eaves divert the monsoon downpours away from the intricate filigree stone carvings.',
      },
    ],
  },
  {
    id: 'amber-fort',
    name: 'Amber Fort & Palace',
    location: 'Amer, Jaipur, Rajasthan',
    yearBuilt: '1592 CE',
    dynasty: 'Kachhwaha Rajputs (Raja Man Singh I)',
    architecturalStyle: 'Rajput-Mughal Fortified Citadel',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/1280px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg',
    audioNarration:
      'Amer Fort perches on the Cheel ka Teela in the rugged Aravalli hills overlooking Maota Lake. Constructed of yellow and pink sandstone with white marble, it features the famed Sheesh Mahal mirror palace and the iconic Ganesh Pol gate.',
    boundingBoxes: [
      {
        id: 'box-ganesh-pol',
        label: 'Ganesh Pol Royal Gate',
        hindiLabel: 'गणेश पोल भव्य प्रवेश द्वार',
        confidence: 97.9,
        topPercent: 36,
        leftPercent: 35,
        widthPercent: 30,
        heightPercent: 38,
        architecturalTerm: 'Frescoed Fortified Gateway',
        historicalContext:
          'Built by Jai Singh II between 1611 and 1667, decorated with natural vegetable dye frescoes and lattice screens for royal ladies.',
        audioNarrationSnippet:
          'The Ganesh Pol gate is covered in seventeenth-century frescoes made with crushed gemstones and natural pigments that have not faded for 400 years.',
      },
    ],
  },
];
