import { VirtualTourScene } from '../types';

export const VIRTUAL_TOUR_SCENES: VirtualTourScene[] = [
  {
    id: 'scene-taj-mahal',
    monumentName: 'Taj Mahal Reflecting Pool & Mausoleum Plinth',
    location: 'Agra, Uttar Pradesh',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg',
    audioGuideTitle: 'Taj Mahal: Celestial Symmetry & Marble Acoustics',
    audioGuideText:
      'Standing at the central fountain of the Charbagh paradise garden, the white Makrana marble tomb reflects perfectly in the water channel. The entire complex is framed by four minarets tilted outward by 1.5 degrees to protect the sanctum in case of seismic shocks.',
    photogrammetryStats: {
      pointsCount: '118.6 Million Points',
      meshResolution: '1.2 mm / point',
      preservationScore: 95,
      lastLidarScan: 'ASI 3D Terrestrial Laser Scan, Jan 2025',
    },
    hotspots: [
      {
        id: 'hs-taj-1',
        title: 'Parchin Kari Floral Inlay',
        xPercent: 50,
        yPercent: 52,
        category: 'architecture',
        historicalEra: '1632–1653 CE',
        description:
          'Over 40 types of semi-precious gems including Afghan lapis lazuli, jade, turquoise, and carnelian inlaid into translucent white Makrana marble.',
      },
      {
        id: 'hs-taj-2',
        title: 'Seismic Tapered Minarets',
        xPercent: 18,
        yPercent: 40,
        category: 'engineering',
        historicalEra: '17th Century',
        description:
          'Four 40-meter minarets built with a deliberate centrifugal tilt so that seismic tremors cause them to collapse into the gardens rather than the sanctum.',
      },
      {
        id: 'hs-taj-3',
        title: 'Charbagh Water Dynamics',
        xPercent: 52,
        yPercent: 78,
        category: 'engineering',
        historicalEra: 'Mughal Hydro-Engineering',
        description:
          'Fed by copper pressure vases connected directly to the Yamuna aqueducts ensuring identical fountain head height across all 24 spouts without pumps.',
      },
    ],
  },
  {
    id: 'scene-golden-temple',
    monumentName: 'Golden Temple (Harmandir Sahib) & Sacred Sarovar',
    location: 'Amritsar, Punjab',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1280px-The_Golden_Temple_of_Amrithsar_7.jpg',
    audioGuideTitle: 'Sri Harmandir Sahib: The Gilded Heart of Sikh Heritage',
    audioGuideText:
      'Welcome to Sri Harmandir Sahib in Amritsar. Floating in the sacred Amrit Sarovar, the sanctum’s upper storeys are covered in 500 kilograms of gold foil. Guru Arjan Dev Ji established four open entrances welcoming all humanity.',
    photogrammetryStats: {
      pointsCount: '84.2 Million Points',
      meshResolution: '1.8 mm / point',
      preservationScore: 96,
      lastLidarScan: 'Sikh Heritage GIS Survey, Dec 2024',
    },
    hotspots: [
      {
        id: 'hs-gt-1',
        title: 'Gilded Copper Cladding & Chhatris',
        xPercent: 48,
        yPercent: 36,
        category: 'architecture',
        historicalEra: '1830 CE',
        description:
          'Gold foil embossed with floral arabesques and Gurmukhi calligraphy by master goldsmiths under Maharaja Ranjit Singh.',
      },
      {
        id: 'hs-gt-2',
        title: 'Amrit Sarovar Sacred Promenade',
        xPercent: 26,
        yPercent: 68,
        category: 'history',
        historicalEra: '1577 CE',
        description:
          'Paved with Italian and Makrana marble inlay, pilgrims circumambulate clockwise along the 450-meter perimeter walkway.',
      },
    ],
  },
  {
    id: 'scene-konark',
    monumentName: 'Konark Sun Temple: The Colossal Solar Chariot',
    location: 'Konark, Puri District, Odisha',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg',
    audioGuideTitle: 'Konark: Ancient Astronomical Timekeeping in Stone',
    audioGuideText:
      'The 13th-century Sun Temple at Konark was sculpted as the sun god’s celestial chariot pulled by seven horses towards the Bay of Bengal sunrise. Its 24 stone wheels are astronomical sundials capable of measuring solar time down to three minutes.',
    photogrammetryStats: {
      pointsCount: '96.5 Million Points',
      meshResolution: '1.4 mm / point',
      preservationScore: 88,
      lastLidarScan: 'ASI Underwater & Terrestrial Scanner, Nov 2024',
    },
    hotspots: [
      {
        id: 'hs-konark-1',
        title: 'Chariot Wheel Sundial',
        xPercent: 32,
        yPercent: 62,
        category: 'engineering',
        historicalEra: '1250 CE',
        description:
          'The central hub and spokes cast a precise solar shadow across the outer rim beads, dividing the day into eight prahars with sub-minute accuracy.',
      },
      {
        id: 'hs-konark-2',
        title: 'Natamandapa Dancing Hall',
        xPercent: 65,
        yPercent: 54,
        category: 'architecture',
        historicalEra: 'Eastern Ganga Dynasty',
        description:
          'Pillared hall carved with 128 classical Odissi dance postures, where devadasis performed morning rituals to greeting the dawn.',
      },
    ],
  },
  {
    id: 'scene-kashi',
    monumentName: 'Kashi Vishwanath Dham & Ganga Ghats',
    location: 'Varanasi, Uttar Pradesh',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg/1280px-Ahilya_Ghat_by_the_Ganges%2C_Varanasi.jpg',
    audioGuideTitle: 'Kashi Vishwanath: The Eternal Sanctum of Light',
    audioGuideText:
      'Perched along the historic crescent bend of the holy Ganges, the Kashi Vishwanath Dham represents five thousand years of continuous civilizational memory. The temple’s golden spire rises over the riverfront colonnades.',
    photogrammetryStats: {
      pointsCount: '78.9 Million Points',
      meshResolution: '2.1 mm / point',
      preservationScore: 94,
      lastLidarScan: 'Varanasi Smart City 3D Digital Twin, Oct 2024',
    },
    hotspots: [
      {
        id: 'hs-kashi-1',
        title: 'Swarna Shikhara Spire',
        xPercent: 54,
        yPercent: 32,
        category: 'architecture',
        historicalEra: '1780 CE',
        description:
          'Covered with 800 kilograms of pure gold sheet, housing the Jyotirlinga of Lord Shiva known as the Lord of the Cosmic Universe.',
      },
      {
        id: 'hs-kashi-2',
        title: 'Ancient Ahilyabai Stone Ghat Steps',
        xPercent: 38,
        yPercent: 72,
        category: 'history',
        historicalEra: '18th Century',
        description:
          'Chunar sandstone steps engineered to withstand turbulent monsoon flood levels while providing sacred bathing access for morning Surya Arghya.',
      },
    ],
  },
  {
    id: 'scene-meenakshi',
    monumentName: 'Madurai Meenakshi Temple & Golden Lotus Tank',
    location: 'Madurai, Tamil Nadu',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/1280px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg',
    audioGuideTitle: 'Meenakshi Amman: Masterpiece of Dravidian Gopurams',
    audioGuideText:
      'Step into the sacred citadel of Madurai Meenakshi. With 14 soaring gopurams decorated in polychrome stucco figures and the famous Thousand Pillar Hall, this temple has formed the physical and cultural core of Madurai for over two millennia.',
    photogrammetryStats: {
      pointsCount: '104.3 Million Points',
      meshResolution: '1.5 mm / point',
      preservationScore: 93,
      lastLidarScan: 'Tamil Nadu Heritage 3D Lidar, Jan 2025',
    },
    hotspots: [
      {
        id: 'hs-meen-1',
        title: '52-Meter South Tower (Raja Gopuram)',
        xPercent: 44,
        yPercent: 38,
        category: 'architecture',
        historicalEra: '1559 CE',
        description:
          '11 tiers adorned with 1,511 individual stucco deities depicting cosmic battles, celestial musicians, and puranic narratives.',
      },
      {
        id: 'hs-meen-2',
        title: 'Golden Lotus Tank (Porthamarai Kulam)',
        xPercent: 52,
        yPercent: 76,
        category: 'history',
        historicalEra: 'Ancient Sangam Era',
        description:
          'The sacred temple pond where ancient Tamil poets of the third Sangam academy gathered to test the divine merit of their verse.',
      },
    ],
  },
  {
    id: 'scene-statue-of-unity',
    monumentName: 'Statue of Unity & Sardar Sarovar Panorama',
    location: 'Kevadia, Gujarat',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Statue_of_Unity.jpg/1280px-Statue_of_Unity.jpg',
    audioGuideTitle: 'Statue of Unity: World’s Tallest Monument at 182 Meters',
    audioGuideText:
      'Standing 182 meters tall above the Narmada River, the Statue of Unity is twice the height of the Statue of Liberty. Clad in 6,500 bronze plates, its internal reinforced concrete towers contain high-speed elevators reaching the 153-meter chest viewing gallery.',
    photogrammetryStats: {
      pointsCount: '142.1 Million Points',
      meshResolution: '0.9 mm / point',
      preservationScore: 99,
      lastLidarScan: 'National Engineering Drone Photogrammetry, Feb 2025',
    },
    hotspots: [
      {
        id: 'hs-sou-1',
        title: '153m Panoramic Chest Viewing Deck',
        xPercent: 48,
        yPercent: 34,
        category: 'engineering',
        historicalEra: '2018 CE',
        description:
          'Houses 200 visitors simultaneously with unobstructed views across the Sardar Sarovar Dam, Valley of Flowers, and Satpura mountains.',
      },
      {
        id: 'hs-sou-2',
        title: 'Flexible Bronze Tile Lattice',
        xPercent: 46,
        yPercent: 58,
        category: 'architecture',
        historicalEra: 'Modern Aerospace Engineering',
        description:
          'Modular bronze panels connected with elastomeric expansion joints that absorb thermal movement from 45°C summer heat to winter chills.',
      },
    ],
  },
  {
    id: 'scene-charminar',
    monumentName: 'Charminar & Laad Bazaar Heritage Core',
    location: 'Hyderabad, Telangana',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/1280px-Charminar_Hyderabad_1.jpg',
    audioGuideTitle: 'Charminar: Sultanate Grandeur in Granite and Lime',
    audioGuideText:
      'Built in 1591 at the intersection of historic trade routes connecting Golconda to the port of Masulipatnam, Charminar features four 56-meter stucco minarets. The upper floor contains Hyderabad’s oldest mosque.',
    photogrammetryStats: {
      pointsCount: '71.8 Million Points',
      meshResolution: '2.4 mm / point',
      preservationScore: 91,
      lastLidarScan: 'Telangana Heritage Mission, Aug 2024',
    },
    hotspots: [
      {
        id: 'hs-char-1',
        title: '56m Spiral Minaret Gallery',
        xPercent: 28,
        yPercent: 32,
        category: 'architecture',
        historicalEra: '1591 CE',
        description:
          'Granite core wrapped in stucco ornamentation containing 149 spiral stone steps climbing to the upper mosque terrace.',
      },
      {
        id: 'hs-char-2',
        title: 'Grand Persian Ogee Archway',
        xPercent: 50,
        yPercent: 58,
        category: 'engineering',
        historicalEra: 'Qutb Shahi Era',
        description:
          'Spans 11 meters wide to accommodate royal elephant processions while supporting the stone weight of the upper floors.',
      },
    ],
  },
  {
    id: 'scene-victoria-memorial',
    monumentName: 'Victoria Memorial Hall & Central Rotunda',
    location: 'Kolkata, West Bengal',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/1280px-Victoria_Memorial_situated_in_Kolkata.jpg',
    audioGuideTitle: 'Victoria Memorial: Indo-Saracenic Marble Palace',
    audioGuideText:
      'Set inside 64 acres of lush botanical grounds in Kolkata, this colossal white Makrana marble monument combines British Neoclassical porticos with Mughal chhatris. Atop its 56-meter dome stands the famous revolving bronze Angel of Victory.',
    photogrammetryStats: {
      pointsCount: '89.4 Million Points',
      meshResolution: '1.9 mm / point',
      preservationScore: 93,
      lastLidarScan: 'Archaeological Survey of India Scan, Sep 2024',
    },
    hotspots: [
      {
        id: 'hs-vic-1',
        title: 'Revolving Bronze Angel of Victory',
        xPercent: 50,
        yPercent: 18,
        category: 'engineering',
        historicalEra: '1921 CE',
        description:
          'A 16-foot, three-tonne bronze sculpture mounted on mercury-lubricated ball bearings to rotate smoothly with the direction of the wind.',
      },
      {
        id: 'hs-vic-2',
        title: 'Makrana Marble Central Dome & Chhatris',
        xPercent: 50,
        yPercent: 38,
        category: 'architecture',
        historicalEra: 'British-Mughal Synthesis',
        description:
          'Constructed of Makrana marble from Rajasthan, with corner minaret chhatris paying homage to classic Mughal mausoleums.',
      },
    ],
  },
  {
    id: 'scene-qutub-minar',
    monumentName: 'Qutub Minar & Quwwat-ul-Islam Colonnade',
    location: 'Mehrauli, New Delhi',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/1280px-Qutb_Minar_2022.jpg',
    audioGuideTitle: 'Qutub Minar: The 72.5-Meter Victory Tower',
    audioGuideText:
      'Soaring 72.5 meters high with 379 spiral steps, Qutub Minar is the world’s tallest brick minaret. Its fluted red sandstone shaft is carved with Quranic calligraphy and supported by intricate stalactite balcony brackets.',
    photogrammetryStats: {
      pointsCount: '92.0 Million Points',
      meshResolution: '1.6 mm / point',
      preservationScore: 92,
      lastLidarScan: 'ASI 3D Terrestrial Survey, Jan 2025',
    },
    hotspots: [
      {
        id: 'hs-qutub-1',
        title: 'Alternating Fluted Red Sandstone Shaft',
        xPercent: 48,
        yPercent: 42,
        category: 'architecture',
        historicalEra: '1199–1220 CE',
        description:
          'Alternating angular and semicircular flutings in red sandstone give the tower stability while creating deep rhythmic shadows.',
      },
      {
        id: 'hs-qutub-2',
        title: 'Corbelled Stalactite Balcony Brackets',
        xPercent: 48,
        yPercent: 56,
        category: 'engineering',
        historicalEra: 'Mamluk Delhi Sultanate',
        description:
          'Muqarnas-style honeycomb brackets cantilevering outward to carry the viewing balconies on each tier.',
      },
    ],
  },
  {
    id: 'scene-ajanta-ellora',
    monumentName: 'Kailash Temple (Cave 16) at Ellora',
    location: 'Chhatrapati Sambhaji Nagar, Maharashtra',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ajanta_Caves%2C_India%2C_Ajanta_basalt_cliffs_and_caves.jpg/1280px-Ajanta_Caves%2C_India%2C_Ajanta_basalt_cliffs_and_caves.jpg',
    audioGuideTitle: 'Kailash Temple: World’s Largest Monolithic Excavation',
    audioGuideText:
      'Carved entirely from a single massive volcanic basalt cliff by King Krishna I in the 8th century, Kailash Temple was chiseled from top to bottom. Over 200,000 tonnes of rock were removed by hand with astonishing mathematical accuracy.',
    photogrammetryStats: {
      pointsCount: '135.8 Million Points',
      meshResolution: '1.1 mm / point',
      preservationScore: 94,
      lastLidarScan: 'Maharashtra Cave Heritage LiDAR, Nov 2024',
    },
    hotspots: [
      {
        id: 'hs-kailash-1',
        title: 'Monolithic Vimana Sanctum',
        xPercent: 45,
        yPercent: 38,
        category: 'architecture',
        historicalEra: '756–773 CE',
        description:
          'A three-storey Dravidian style temple carved entirely from living mountain rock without a single separate masonry block or seam.',
      },
      {
        id: 'hs-kailash-2',
        title: 'Life-Sized Monolithic Elephant Row',
        xPercent: 46,
        yPercent: 72,
        category: 'history',
        historicalEra: 'Rashtrakuta Dynasty',
        description:
          'A monumental frieze of life-sized stone elephants sculpted around the plinth, appearing to support the entire mountain shrine.',
      },
    ],
  },
  {
    id: 'scene-jagannath-puri',
    monumentName: 'Shree Jagannath Temple & Bada Danda',
    location: 'Puri, Odisha',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Shri_Jagannath_temple.jpg/1280px-Shri_Jagannath_temple.jpg',
    audioGuideTitle: 'Jagannath Puri: Sacred Tower of the Char Dham',
    audioGuideText:
      'Rising 65 meters above the Bay of Bengal coastline, the sacred 12th-century tower of Lord Jagannath is crowned by the eight-metal Neela Chakra wheel. The temple flag is scaled and changed daily without ropes by hereditary priest-acrobats.',
    photogrammetryStats: {
      pointsCount: '81.4 Million Points',
      meshResolution: '2.2 mm / point',
      preservationScore: 91,
      lastLidarScan: 'Odisha Coastal Heritage Scan, Oct 2024',
    },
    hotspots: [
      {
        id: 'hs-puri-1',
        title: 'Neela Chakra & Patitapabana Flag',
        xPercent: 48,
        yPercent: 16,
        category: 'history',
        historicalEra: '1161 CE',
        description:
          'Forged of eight sacred metals (ashtadhatu), the massive divine wheel crowns the curvilinear rekha deula.',
      },
      {
        id: 'hs-puri-2',
        title: '65m Rekha Deula Spire',
        xPercent: 48,
        yPercent: 44,
        category: 'architecture',
        historicalEra: 'Eastern Ganga Dynasty',
        description:
          'Constructed on a raised stone platform called Kurma Beda, casting no visible shadow upon the ground at high noon.',
      },
    ],
  },
  {
    id: 'scene-brihadeeswarar',
    monumentName: 'Brihadeeswarar Temple: The Great Living Chola Temple',
    location: 'Thanjavur, Tamil Nadu',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/1280px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg',
    audioGuideTitle: 'Brihadeeswarar: The 80-Tonne Granite Capstone Miracle',
    audioGuideText:
      'Built in 1010 CE by Emperor Raja Raja Chola I, Brihadeeswarar is built entirely of granite. Its 66-meter Vimana tower is crowned by a monolithic 80-tonne granite dome, hauled to the top along a 6-kilometer earthen ramp by elephants.',
    photogrammetryStats: {
      pointsCount: '112.7 Million Points',
      meshResolution: '1.3 mm / point',
      preservationScore: 96,
      lastLidarScan: 'UNESCO World Heritage Survey, Jan 2025',
    },
    hotspots: [
      {
        id: 'hs-brihad-1',
        title: 'Monolithic 80-Tonne Granite Kumbam',
        xPercent: 50,
        yPercent: 18,
        category: 'engineering',
        historicalEra: '1010 CE',
        description:
          'Carved from a single boulder of dense granite, hoisted 66 meters into the sky without modern machinery or pulleys.',
      },
      {
        id: 'hs-brihad-2',
        title: '16-Tier Interlocking Granite Vimana',
        xPercent: 50,
        yPercent: 46,
        category: 'architecture',
        historicalEra: 'Chola Golden Age',
        description:
          '130,000 tonnes of granite fit together using interlocking mortise-and-tenon joints that have withstood 1,000 years of seismic shifts.',
      },
    ],
  },
  {
    id: 'scene-lotus-temple',
    monumentName: 'Lotus Temple: Biomimetic Sacred Blossom',
    location: 'New Delhi',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/f/fc/LotusDelhi.jpg',
    audioGuideTitle: 'Lotus Temple: Modern Biomimetic Masterpiece',
    audioGuideText:
      'Designed by Fariborz Sahba in 1986, the Lotus Temple consists of 27 free-standing petals made of white Greek Pentelic marble. Surrounded by nine ponds, it naturally pulls cooling air through its silent prayer auditorium.',
    photogrammetryStats: {
      pointsCount: '76.3 Million Points',
      meshResolution: '2.0 mm / point',
      preservationScore: 98,
      lastLidarScan: 'Delhi Green Architecture Scan, Dec 2024',
    },
    hotspots: [
      {
        id: 'hs-lotus-1',
        title: 'Thin-Shell Ferroconcrete Marble Petals',
        xPercent: 48,
        yPercent: 40,
        category: 'architecture',
        historicalEra: '1986 CE',
        description:
          'Clad in Greek Penteli marble, each petal curves gracefully to create nine entrance portals welcoming people of all world religions.',
      },
      {
        id: 'hs-lotus-2',
        title: 'Nine Passive Geothermal Ponds',
        xPercent: 50,
        yPercent: 78,
        category: 'engineering',
        historicalEra: 'Passive Sustainable Engineering',
        description:
          'Nine leaf-shaped ponds create natural convection currents that ventilate the 2,500-seat central auditorium without artificial air conditioning.',
      },
    ],
  },
  {
    id: 'scene-manali',
    monumentName: 'Manali: Cedar Forest & Hidimba Wooden Pagoda',
    location: 'Manali, Himachal Pradesh',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hadimba_Devi_Temple%2CManali%2CHimachal_Pradesh.jpg/1280px-Hadimba_Devi_Temple%2CManali%2CHimachal_Pradesh.jpg',
    audioGuideTitle: 'Hidimba Pagoda: Ancient Himalayan Timber Architecture',
    audioGuideText:
      'Surrounded by towering Himalayan cedar pines in the Dhungri forest, this four-tiered 16th-century wooden pagoda was built around a natural rock cave. Traditional Kathkuni timber joints flex safely during Himalayan earthquakes.',
    photogrammetryStats: {
      pointsCount: '62.5 Million Points',
      meshResolution: '2.6 mm / point',
      preservationScore: 91,
      lastLidarScan: 'Himalayan Heritage GIS, Nov 2024',
    },
    hotspots: [
      {
        id: 'hs-manali-1',
        title: 'Four-Tier Deodar Shingle Pagoda Roof',
        xPercent: 46,
        yPercent: 36,
        category: 'architecture',
        historicalEra: '1553 CE',
        description:
          'Three square timber shingle tiers surmounted by a fourth circular brass cone reflecting Himalayan alpine sunlight.',
      },
      {
        id: 'hs-manali-2',
        title: 'Natural Cave Sanctuary Sanctum',
        xPercent: 48,
        yPercent: 68,
        category: 'history',
        historicalEra: 'Mahabharata Era Roots',
        description:
          'Built directly over the sacred bedrock footprints of Hidimba Devi, wife of the Pandava warrior Bhima.',
      },
    ],
  },
  {
    id: 'scene-goa',
    monumentName: 'Goa: Fort Aguada Lighthouse & Arabian Sea Bastions',
    location: 'Sinquerim, Goa',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/a/ad/Fort_aguada.jpg',
    audioGuideTitle: 'Fort Aguada: 17th-Century Coastal Bastion',
    audioGuideText:
      'Standing at the mouth of the Mandovi River, Fort Aguada was constructed by the Portuguese in 1612 with red laterite stone. Its 1864 four-storey lighthouse is the oldest in Asia, warning maritime vessels away from treacherous reef shoals.',
    photogrammetryStats: {
      pointsCount: '68.4 Million Points',
      meshResolution: '2.5 mm / point',
      preservationScore: 90,
      lastLidarScan: 'Goa Coastal Maritime GIS, Oct 2024',
    },
    hotspots: [
      {
        id: 'hs-goa-1',
        title: 'Historic 1864 Asian Lighthouse',
        xPercent: 46,
        yPercent: 36,
        category: 'history',
        historicalEra: '1864 CE',
        description:
          'The oldest four-tiered circular laterite stone lighthouse in Asia, once flashing oil lamp signals every 7 minutes.',
      },
      {
        id: 'hs-goa-2',
        title: 'Ramparts & Sea Moat',
        xPercent: 48,
        yPercent: 74,
        category: 'engineering',
        historicalEra: '1612 CE',
        description:
          'Built with dense local laterite stone that hardens when exposed to salty sea breezes, mounting 79 bronze cannons.',
      },
    ],
  },
  {
    id: 'scene-hawa-mahal',
    monumentName: 'Hawa Mahal East Façade & Central Courtyard',
    location: 'Pink City, Jaipur, Rajasthan',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg',
    audioGuideTitle: 'Hawa Mahal: Architectural Aerodynamics of Royal Rajputana',
    audioGuideText:
      'Welcome to the virtual digital twin of Hawa Mahal. Built in 1799 without a deep structural foundation, its cantilevered mass stands on a curved base. The five-storey façade is crowned with Rajput dome chhatris and cooled naturally by the Venturi effect through 953 stone jharokhas.',
    photogrammetryStats: {
      pointsCount: '52.4 Million Points',
      meshResolution: '2.8 mm / point',
      preservationScore: 92,
      lastLidarScan: 'Archaeological Survey LiDAR, Oct 2024',
    },
    hotspots: [
      {
        id: 'hs-hawa-1',
        title: 'Zenana Honeycomb Lattice Screens',
        xPercent: 48,
        yPercent: 42,
        category: 'architecture',
        historicalEra: '1799 CE',
        description:
          'Miniature stone casements carved with microporous geometric latticework. The tiny apertures induce natural airflow into royal corridors without mechanical ventilation.',
      },
      {
        id: 'hs-hawa-2',
        title: 'Curved Bengal Bangaldar Chhajja',
        xPercent: 24,
        yPercent: 60,
        category: 'engineering',
        historicalEra: 'Early 19th Century',
        description:
          'Vaulted roof eaves influenced by Bengali hut architecture, adopted into Rajput palaces to disperse heavy monsoon rains and soften harsh desert shadows.',
      },
    ],
  },
  {
    id: 'scene-amber-fort',
    monumentName: 'Amber Fort & Palace Ramparts overlooking Maota Lake',
    location: 'Amer, Jaipur, Rajasthan',
    panoramaImageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/1280px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg',
    audioGuideTitle: 'Amber Fort: Majestic Rajput-Mughal Citadel',
    audioGuideText:
      'Perched majestically upon the Cheel ka Teela hills above Maota Lake, Amber Fort was constructed by Raja Man Singh I in 1592. Its red sandstone and marble palaces include the glittering Sheesh Mahal and the monumental Ganesh Pol gateway.',
    photogrammetryStats: {
      pointsCount: '98.7 Million Points',
      meshResolution: '1.5 mm / point',
      preservationScore: 95,
      lastLidarScan: 'Rajasthan Heritage Archaeological Scan, Nov 2024',
    },
    hotspots: [
      {
        id: 'hs-amber-1',
        title: 'Sheesh Mahal (Mirror Palace)',
        xPercent: 52,
        yPercent: 44,
        category: 'architecture',
        historicalEra: '16th Century',
        description:
          'Inlaid with thousands of concave Belgian glass mirrors that illuminate the entire royal chamber with the light of a single candle.',
      },
      {
        id: 'hs-amber-2',
        title: 'Ganesh Pol Grand Gateway',
        xPercent: 36,
        yPercent: 58,
        category: 'history',
        historicalEra: '1639 CE',
        description:
          'The private royal gateway painted with vegetable dyes and fresco murals welcoming returning Rajput warriors.',
      },
    ],
  },
];
