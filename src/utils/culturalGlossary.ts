export interface GlossaryTerm {
  term: string;
  hindiScript: string;
  pronunciation: string;
  category: 'Architectural Feature' | 'Art & Craftsmanship' | 'Structural Element' | 'Historical Manuscript';
  definition: string;
  hindiDefinition: string;
  historicalSignificance?: string;
  famousExamples: string[];
  dynastyAssociations: string[];
}

export const CULTURAL_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Jharokha',
    hindiScript: 'झरोखा',
    pronunciation: 'Jha-roh-khaa',
    category: 'Architectural Feature',
    definition: 'An overhanging enclosed balcony or oriel window supported by corbels, typical of Rajput and Mughal palace architecture.',
    hindiDefinition: 'एक बाहर निकला हुआ जालीदार छज्जा या खिड़की, जो राजस्थानी और मुगल वास्तुकला की प्रमुख पहचान है।',
    historicalSignificance: 'Designed to allow royal women (zenana) to observe royal processions and daily street markets without being seen, while creating a natural wind cooling vent.',
    famousExamples: ['Hawa Mahal (953 Jharokhas)', 'Amber Fort', 'Jodhpur Mehrangarh', 'Bikaner Junagarh'],
    dynastyAssociations: ['Kachhwaha Rajputs', 'Rathores', 'Mughals'],
  },
  {
    term: 'Pietra Dura (Parchin Kari)',
    hindiScript: 'पच्चीकारी (पिएट्रा ड्यूरा)',
    pronunciation: 'Parch-een Kaa-ree',
    category: 'Art & Craftsmanship',
    definition: 'Inlaying highly polished semi-precious colored stones into geometric or floral cavities carved into white Makrana marble.',
    hindiDefinition: 'सफेद मकराना संगमरमर में तराशे गए खांचों में कीमती और अर्ध-कीमती रंगीन पत्थरों को जड़ने की कला।',
    historicalSignificance: 'Introduced by Mughal emperor Jahangir and perfected under Shah Jahan. Stones used include lapis lazuli, carnelian, jasper, jade, and onyx.',
    famousExamples: ['Taj Mahal Cenotaphs', 'Agra Fort Diwan-i-Khas', "Tomb of I'timad-ud-Daulah"],
    dynastyAssociations: ['Mughal Empire'],
  },
  {
    term: 'Shikhara',
    hindiScript: 'शिखर',
    pronunciation: 'Shee-khar-aa',
    category: 'Structural Element',
    definition: 'The rising mountain-like tower crowning the sanctum sanctorum (garbhagriha) of North and Central Indian Hindu temples.',
    hindiDefinition: 'उत्तर भारतीय हिंदू मंदिरों के गर्भगृह के ऊपर उठने वाला भव्य पिरामिडनुमा या वक्राकार मुख्य शिखर।',
    historicalSignificance: 'Symbolizes Mount Meru, the cosmic mountain connecting heaven and earth. Decorated with miniature replicas (urushringas).',
    famousExamples: ['Konark Sun Temple', 'Khajuraho Kandariya Mahadeva', 'Kashi Vishwanath', 'Kedarnath'],
    dynastyAssociations: ['Chandela', 'Eastern Ganga', 'Solanki'],
  },
  {
    term: 'Gopuram',
    hindiScript: 'गोपुरम',
    pronunciation: 'Goh-pu-ram',
    category: 'Architectural Feature',
    definition: 'A monumental, ornately sculptured gateway tower at the entrance of South Indian Dravidian Hindu temple complexes.',
    hindiDefinition: 'दक्षिण भारतीय द्रविड़ शैली के मंदिरों के मुख्य प्रवेश द्वार पर स्थित विशाल, बहुमंजिला अलंकृत मीनार।',
    historicalSignificance: 'Acts as the landmark marker for pilgrims from miles away, decorated with hundreds of stucco sculptures of deities, celestial musicians, and puranic epics.',
    famousExamples: ['Madurai Meenakshi Temple', 'Brihadeeswarar Temple, Thanjavur', 'Ranganathaswamy Temple, Srirangam'],
    dynastyAssociations: ['Cholas', 'Pandyas', 'Vijayanagara', 'Nayaks'],
  },
  {
    term: 'Chattri',
    hindiScript: 'छतरी',
    pronunciation: 'Chhat-ree',
    category: 'Structural Element',
    definition: 'An elevated, dome-shaped pavilion supported by slender pillars, originating as cenotaphs for royalty and warriors.',
    hindiDefinition: 'स्तंभों पर टिका हुआ गुंबदनुमा छोटा मंडप, जिसका उपयोग महलों की छतों पर तथा वीरों के स्मारक रूप में होता था।',
    famousExamples: ['Fatehpur Sikri Panch Mahal', 'Amber Fort', 'Jaswant Thada Jodhpur', 'Chhatris of Orchha'],
    dynastyAssociations: ['Rajput Dynasties', 'Mughals', 'Bundelas'],
  },
  {
    term: 'Baoli (Vav)',
    hindiScript: 'बावड़ी (वाव)',
    pronunciation: 'Baao-lee / Vaav',
    category: 'Structural Element',
    definition: 'A subterranean stepwell engineered with ornate flights of steps descending down to deep aquifers, doubling as cool community sanctuaries.',
    hindiDefinition: 'भूमिगत सीढ़ीदार कुआं जो जल संरक्षण के साथ-साथ भीषण गर्मी में विश्राम और सामाजिक मेलजोल का केंद्र था।',
    famousExamples: ['Rani ki Vav (Patan)', 'Chand Baori (Abhaneri)', 'Agrasen ki Baoli (Delhi)'],
    dynastyAssociations: ['Chaulukya / Solanki', 'Chahamanas', 'Delhi Sultanate'],
  },
  {
    term: 'Jaali',
    hindiScript: 'जाली',
    pronunciation: 'Jaa-lee',
    category: 'Art & Craftsmanship',
    definition: 'Perforated latticework carved out of stone or marble with geometric or calligraphy patterns.',
    hindiDefinition: 'पत्थर या संगमरमर पर तराशी गई महीन जालीदार नक्काशी, जो वायु संचार और मृदु प्रकाश प्रदान करती है।',
    historicalSignificance: 'Uses the Venturi effect: compresses air flowing through small perforations, naturally lowering temperature by 3-5°C.',
    famousExamples: ['Sidi Saiyyed Mosque (Tree of Life, Ahmedabad)', 'Fatehpur Sikri Salim Chishti Tomb', 'Amber Fort Sheesh Mahal'],
    dynastyAssociations: ['Gujarat Sultanate', 'Mughals', 'Rajputs'],
  },
  {
    term: 'Mandapa',
    hindiScript: 'मंडप',
    pronunciation: 'Mun-duh-puh',
    category: 'Structural Element',
    definition: 'A pillared outdoor hall or pavilion for public temple rituals, classical dance (Natya Mandapa), and assembly.',
    hindiDefinition: 'मंदिर के गर्भगृह के सामने बना खंभों वाला विशाल हॉल, जहां उत्सव, भजन और धार्मिक सभाएं होती हैं।',
    famousExamples: ['Sun Temple Modhera Sabha Mandapa', 'Meenakshi Thousand Pillar Hall', 'Hampi Vittala Temple'],
    dynastyAssociations: ['Vijayanagara', 'Chola', 'Solanki', 'Kakatiya'],
  },
];
