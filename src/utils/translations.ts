export type SupportedLanguage = 'en' | 'hi' | 'ja' | 'es' | 'fr' | 'de' | 'bn' | 'ta';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export interface TranslationDictionary {
  // Brand & Nav
  appName: string;
  tagline: string;
  currency: string;
  language: string;
  aiItinerary: string;
  editPreferences: string;
  dataProviders: string;

  // Tabs
  tabExplore: string;
  tabArVision: string;
  tabVirtualTour: string;
  tabAiGuide: string;
  tabOralArchive: string;
  tabDistanceMeter: string;
  tabWeather: string;
  tabItinerary: string;
  tabImages: string;
  tabPersonalization: string;

  // Search Header
  startLocation: string;
  destinationLocation: string;
  useMyLocation: string;
  searchPlaceholder: string;
  locating: string;

  // Sections
  verifiedPhotos: string;
  verifiedPhotosDesc: string;
  recommendations: string;
  recommendationsDesc: string;
  transportFares: string;
  hotelsStay: string;
  tripCostTitle: string;
  mapTitle: string;
  spatialRouteMap: string;

  // Common buttons & labels
  viewPhotos: string;
  bookNow: string;
  perNight: string;
  free: string;
  officialTariff: string;
  publicBenchmark: string;
  estimatedRange: string;
  distanceAway: string;
  viewNearbyImages: string;
  allFrames: string;
  sunsetFrame: string;
  architectureFrame: string;
  detailsFrame: string;
  nightFrame: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'HeritAR',
    tagline: 'Location-based heritage, transparent fares & personalized AI planning',
    currency: 'Currency',
    language: 'Language',
    aiItinerary: 'AI Itinerary',
    editPreferences: 'Preferences',
    dataProviders: 'Data Sources & Integrity',

    tabExplore: 'Explore',
    tabArVision: 'AR Vision Guide',
    tabVirtualTour: '360° VR Tour',
    tabAiGuide: 'AI Guide',
    tabOralArchive: 'Oral Archive',
    tabDistanceMeter: 'Distance Meter',
    tabWeather: 'Weather',
    tabItinerary: 'Itinerary',
    tabImages: 'Images',
    tabPersonalization: 'Personalization Mode',

    startLocation: 'Starting Point',
    destinationLocation: 'Heritage Destination',
    useMyLocation: 'Use My Location',
    searchPlaceholder: 'Search city or monument (e.g. Taj Mahal, Konark)...',
    locating: 'Locating GPS...',

    verifiedPhotos: 'Verified Destination Photography Gallery',
    verifiedPhotosDesc: 'Authentic CC-licensed imagery from Wikimedia Commons and official archives',
    recommendations: 'Personalized Recommendations & Tourist Attractions',
    recommendationsDesc: 'Curated heritage monuments ranked by relevance and cultural significance',
    transportFares: 'Multi-Modal Transport Fare Comparison',
    hotelsStay: 'Verified Accommodation & Hotels',
    tripCostTitle: 'Total Trip Cost Estimation',
    mapTitle: 'Interactive Route & Heritage Map',
    spatialRouteMap: 'Spatial Route Map & Heritage Landmarks',

    viewPhotos: 'View Photos',
    bookNow: 'Book Room',
    perNight: 'per night',
    free: 'Free Entry',
    officialTariff: 'Govt Official Tariff',
    publicBenchmark: 'Public Benchmark',
    estimatedRange: 'Estimated Range',
    distanceAway: 'away',
    viewNearbyImages: 'View Real Images',
    allFrames: 'All Real Photos',
    sunsetFrame: 'Sunset & Golden Hour',
    architectureFrame: 'Grand Façade & Symmetrical',
    detailsFrame: 'Inlay, Pietra Dura & Carvings',
    nightFrame: 'Twilight & Reflections',
  },

  hi: {
    appName: 'हेरिटएआर (HeritAR)',
    tagline: 'पर्यटन स्थल दर्शन, पारदर्शी किराया और व्यक्तिगत एआई यात्रा योजना',
    currency: 'मुद्रा (Currency)',
    language: 'भाषा (Language)',
    aiItinerary: 'एआई यात्रा कार्यक्रम',
    editPreferences: 'प्राथमिकताएं',
    dataProviders: 'डेटा स्रोत और प्रमाणिकता',

    tabExplore: 'एक्सप्लोर (Explore)',
    tabArVision: 'एआर विज़न गाइड (AR Vision)',
    tabVirtualTour: '360° वीआर टूर (Virtual Tour)',
    tabAiGuide: 'एआई गाइड (AI Guide)',
    tabOralArchive: 'मौखिक धरोहर (Oral Archive)',
    tabDistanceMeter: 'दूरी मापक (Distance)',
    tabWeather: 'मौसम (Weather)',
    tabItinerary: 'यात्रा कार्यक्रम (Itinerary)',
    tabImages: 'तस्वीरें (Images)',
    tabPersonalization: 'पर्सनलाइज़ेशन मोड 🎯',

    startLocation: 'शुरुआती स्थान (Origin)',
    destinationLocation: 'गंतव्य स्थल (Destination)',
    useMyLocation: 'मेरा वर्तमान स्थान चुनें',
    searchPlaceholder: 'शहर या स्मारक खोजें (जैसे: ताजमहल, कोणार्क, स्वर्ण मंदिर)...',
    locating: 'स्थान प्राप्त हो रहा है...',

    verifiedPhotos: 'प्रमाणित पर्यटन स्थल फोटोग्राफी गैलरी',
    verifiedPhotosDesc: 'विकिमीडिया कॉमन्स और आधिकारिक अभिलेखागार से असली तस्वीरें',
    recommendations: 'प्रमुख दर्शनीय स्थल और अनुशंसित स्मारक',
    recommendationsDesc: 'आपके लिए चयनित सर्वोत्तम ऐतिहासिक एवं सांस्कृतिक स्थल',
    transportFares: 'परिवहन किराया तुलना (ऑटो, कैब, बस, ट्रेन)',
    hotelsStay: 'प्रमाणित होटल और ठहरने के विकल्प',
    tripCostTitle: 'कुल यात्रा खर्च का अनुमान',
    mapTitle: 'इंटरएक्टिव रूट और हेरिटेज मानचित्र',
    spatialRouteMap: 'स्थानिक मार्ग मानचित्र और ऐतिहासिक स्थल',

    viewPhotos: 'तस्वीरें देखें',
    bookNow: 'कमरा बुक करें',
    perNight: 'प्रति रात',
    free: 'निःशुल्क प्रवेश',
    officialTariff: 'सरकारी आधिकारिक किराया',
    publicBenchmark: 'मानक सार्वजनिक दर',
    estimatedRange: 'अनुमानित किराया',
    distanceAway: 'दूरी पर',
    viewNearbyImages: 'इसकी असली तस्वीरें देखें',
    allFrames: 'सभी असली तस्वीरें',
    sunsetFrame: 'सूर्यास्त और गोल्डन आवर',
    architectureFrame: 'भव्य वास्तुशिल्प और मुख्य दृश्य',
    detailsFrame: 'संगमरमर नक्काशी व पच्चीकारी',
    nightFrame: 'संध्याकालीन व जल प्रतिबिंब',
  },

  ja: {
    appName: 'HeritAR',
    tagline: 'インド文化遺産の発見、公正な交通運賃、パーソナライズされたAI旅行プラン',
    currency: '通貨',
    language: '言語',
    aiItinerary: 'AI旅程作成',
    editPreferences: 'ユーザー設定',
    dataProviders: '公式データ連携',

    tabExplore: '探索',
    tabArVision: 'ARビジョンガイド',
    tabVirtualTour: '360°VRツアー',
    tabAiGuide: 'AIガイド',
    tabOralArchive: '口承歴史アーカイブ',
    tabDistanceMeter: '距離計',
    tabWeather: '天気',
    tabItinerary: '旅程プラン',
    tabImages: '写真ギャラリー',
    tabPersonalization: 'パーソナライズモード',

    startLocation: '出発地',
    destinationLocation: '目的地・世界遺産',
    useMyLocation: '現在地を使用',
    searchPlaceholder: '都市や寺院・モニュメントを検索 (例: タージ・マハル)...',
    locating: 'GPS位置取得中...',

    verifiedPhotos: 'ウィキメディア公認 高画質写真ギャラリー',
    verifiedPhotosDesc: '公式ライセンスに基づく歴史的遺産の詳細写真',
    recommendations: 'おすすめの観光スポット・歴史的建造物',
    recommendationsDesc: '文化遺産スコア順の観光名所一覧',
    transportFares: '交通手段と運賃の比較 (オートリクシャー・配車・鉄道)',
    hotelsStay: '確認済み宿泊施設とホテル',
    tripCostTitle: '旅行総費用の概算計算',
    mapTitle: 'インタラクティブなルート＆遺産マップ',
    spatialRouteMap: 'ルートマップと主要ランドマーク',

    viewPhotos: '写真を見る',
    bookNow: '予約する',
    perNight: '1泊あたり',
    free: '入場無料',
    officialTariff: '政府公式料金',
    publicBenchmark: '公的標準価格',
    estimatedRange: '推定相場',
    distanceAway: '離れています',
    viewNearbyImages: '写真を見る',
    allFrames: 'すべての写真',
    sunsetFrame: '夕暮れとゴールデンアワー',
    architectureFrame: '建築正面・シンメトリー',
    detailsFrame: '象嵌細工・彫刻の細部',
    nightFrame: '夜景・水面の反射',
  },

  es: {
    appName: 'HeritAR',
    tagline: 'Descubrimiento de patrimonio, tarifas transparentes y planificación con IA',
    currency: 'Moneda',
    language: 'Idioma',
    aiItinerary: 'Itinerario IA',
    editPreferences: 'Preferencias',
    dataProviders: 'Fuentes de datos',

    tabExplore: 'Explorar',
    tabArVision: 'Guía de Visión RA',
    tabVirtualTour: 'Tour RV 360°',
    tabAiGuide: 'Guía IA',
    tabOralArchive: 'Archivo Oral',
    tabDistanceMeter: 'Medidor de distancia',
    tabWeather: 'Clima',
    tabItinerary: 'Itinerario',
    tabImages: 'Imágenes',
    tabPersonalization: 'Modo Personalizado',

    startLocation: 'Punto de partida',
    destinationLocation: 'Destino patrimonial',
    useMyLocation: 'Usar mi ubicación',
    searchPlaceholder: 'Buscar ciudad o monumento (ej. Taj Mahal)...',
    locating: 'Obteniendo GPS...',

    verifiedPhotos: 'Galería de fotos verificadas',
    verifiedPhotosDesc: 'Imágenes con licencia CC de Wikimedia Commons',
    recommendations: 'Recomendaciones y atracciones turísticas',
    recommendationsDesc: 'Monumentos históricos seleccionados por relevancia',
    transportFares: 'Comparación de tarifas de transporte',
    hotelsStay: 'Hoteles y alojamientos verificados',
    tripCostTitle: 'Estimación del costo total del viaje',
    mapTitle: 'Mapa interactivo de rutas y patrimonio',
    spatialRouteMap: 'Mapa de rutas y monumentos',

    viewPhotos: 'Ver fotos',
    bookNow: 'Reservar',
    perNight: 'por noche',
    free: 'Entrada gratuita',
    officialTariff: 'Tarifa oficial del gobierno',
    publicBenchmark: 'Tarifa pública estándar',
    estimatedRange: 'Rango estimado',
    distanceAway: 'de distancia',
    viewNearbyImages: 'Ver imágenes',
    allFrames: 'Todas las fotos',
    sunsetFrame: 'Atardecer y hora dorada',
    architectureFrame: 'Fachada y simetría',
    detailsFrame: 'Detalles de tallado e incrustación',
    nightFrame: 'Crepúsculo y reflejos',
  },

  fr: {
    appName: 'HeritAR',
    tagline: 'Découverte du patrimoine, tarifs transparents et planification IA',
    currency: 'Devise',
    language: 'Langue',
    aiItinerary: 'Itinéraire IA',
    editPreferences: 'Préférences',
    dataProviders: 'Sources de données',

    tabExplore: 'Explorer',
    tabArVision: 'Vision RA Guide',
    tabVirtualTour: 'Visite VR 360°',
    tabAiGuide: 'Guide IA',
    tabOralArchive: 'Archive Orale',
    tabDistanceMeter: 'Calculateur de distance',
    tabWeather: 'Météo',
    tabItinerary: 'Itinéraire',
    tabImages: 'Images',
    tabPersonalization: 'Mode Personnalisé',

    startLocation: 'Point de départ',
    destinationLocation: 'Destination historique',
    useMyLocation: 'Utiliser ma position',
    searchPlaceholder: 'Rechercher ville ou monument (ex. Taj Mahal)...',
    locating: 'Localisation GPS...',

    verifiedPhotos: 'Galerie de photographies certifiées',
    verifiedPhotosDesc: 'Photos authentiques Wikimedia Commons sous licence CC',
    recommendations: 'Recommandations et attractions touristiques',
    recommendationsDesc: 'Monuments historiques classés par pertinence',
    transportFares: 'Comparateur de tarifs de transport',
    hotelsStay: 'Hôtels et hébergements vérifiés',
    tripCostTitle: 'Estimation du coût total du voyage',
    mapTitle: 'Carte interactive des itinéraires et du patrimoine',
    spatialRouteMap: 'Carte spatiale et monuments',

    viewPhotos: 'Voir les photos',
    bookNow: 'Réserver',
    perNight: 'par nuit',
    free: 'Entrée gratuite',
    officialTariff: 'Tarif officiel de l’État',
    publicBenchmark: 'Tarif de référence public',
    estimatedRange: 'Fourchette estimée',
    distanceAway: 'de distance',
    viewNearbyImages: 'Voir les photos',
    allFrames: 'Toutes les photos',
    sunsetFrame: 'Coucher de soleil et heure dorée',
    architectureFrame: 'Façade et symétrie',
    detailsFrame: 'Détails sculptés et incrustations',
    nightFrame: 'Crépuscule et reflets',
  },

  de: {
    appName: 'HeritAR',
    tagline: 'Kulturerbe-Entdeckung, transparente Tarife & KI-Reiseplanung',
    currency: 'Währung',
    language: 'Sprache',
    aiItinerary: 'KI-Reiseplan',
    editPreferences: 'Einstellungen',
    dataProviders: 'Datenquellen',

    tabExplore: 'Erkunden',
    tabArVision: 'AR-Vision-Führer',
    tabVirtualTour: '360° VR-Tour',
    tabAiGuide: 'KI-Reiseführer',
    tabOralArchive: 'Mündliches Archiv',
    tabDistanceMeter: 'Entfernungsmesser',
    tabWeather: 'Wetter',
    tabItinerary: 'Reiseplan',
    tabImages: 'Bilder',
    tabPersonalization: 'Personalisierungsmodus',

    startLocation: 'Startort',
    destinationLocation: 'Reiseziel / Denkmal',
    useMyLocation: 'Meinen Standort verwenden',
    searchPlaceholder: 'Stadt oder Denkmal suchen (z. B. Taj Mahal)...',
    locating: 'GPS wird ermittelt...',

    verifiedPhotos: 'Verifizierte Fotogalerie des Reiseziels',
    verifiedPhotosDesc: 'Authentische CC-lizenzierte Bilder aus Wikimedia Commons',
    recommendations: 'Empfohlene Denkmäler & Sehenswürdigkeiten',
    recommendationsDesc: 'Kuratierte historische Stätten nach Bedeutung geordnet',
    transportFares: 'Vergleich der Beförderungstarife',
    hotelsStay: 'Geprüfte Hotels & Unterkünfte',
    tripCostTitle: 'Gesamtreisekosten-Kalkulation',
    mapTitle: 'Interaktive Routen- & Kulturkarte',
    spatialRouteMap: 'Routenkarte & Landmarken',

    viewPhotos: 'Fotos ansehen',
    bookNow: 'Buchen',
    perNight: 'pro Nacht',
    free: 'Freier Eintritt',
    officialTariff: 'Staatlicher Tarif',
    publicBenchmark: 'Öffentlicher Richtwert',
    estimatedRange: 'Geschätzte Spanne',
    distanceAway: 'entfernt',
    viewNearbyImages: 'Bilder ansehen',
    allFrames: 'Alle Fotos',
    sunsetFrame: 'Sonnenuntergang & Goldene Stunde',
    architectureFrame: 'Hauptfassade & Symmetrie',
    detailsFrame: 'Marmor-Intarsien & Details',
    nightFrame: 'Dämmerung & Spiegelung',
  },

  bn: {
    appName: 'হেরিটএআর (HeritAR)',
    tagline: 'ঐতিহ্য সন্ধান, স্বচ্ছ ভাড়া ও ব্যক্তিগত এআই ভ্রমণ পরিকল্পনা',
    currency: 'মুদ্রা',
    language: 'ভাষা',
    aiItinerary: 'এআই ভ্রমণসূচি',
    editPreferences: 'পছন্দসমূহ',
    dataProviders: 'উৎস ও সত্যতা',

    tabExplore: 'এক্সপ্লোর',
    tabArVision: 'এআর ভিশন গাইড',
    tabVirtualTour: '৩৬০° ভিআর ট্যুর',
    tabAiGuide: 'এআই গাইড',
    tabOralArchive: 'মৌখিক ঐতিহ্য আর্কাইভ',
    tabDistanceMeter: 'দূরত্ব পরিমাপক',
    tabWeather: 'আবহাওয়া',
    tabItinerary: 'ভ্রমণসূচি',
    tabImages: 'ছবিসমূহ',
    tabPersonalization: 'ব্যক্তিগতকরণ মোড',

    startLocation: 'যাত্রা শুরুর স্থান',
    destinationLocation: 'গন্তব্য স্থান',
    useMyLocation: 'আমার বর্তমান অবস্থান',
    searchPlaceholder: 'শহর বা স্মৃতিস্তম্ভ খুঁজুন (যেমন: তাজমহল)...',
    locating: 'অবস্থান নির্ণয় হচ্ছে...',

    verifiedPhotos: 'যাচাইকৃত দর্শনীয় স্থানের ছবি',
    verifiedPhotosDesc: 'উইকিমিডিয়া কমন্স থেকে সংগৃহীত আসল ছবি',
    recommendations: 'সেরা ঐতিহাসিক ও দর্শনীয় স্থানসমূহ',
    recommendationsDesc: 'আপনার পছন্দের জন্য নির্বাচিত সেরা পর্যটন কেন্দ্র',
    transportFares: 'যাতায়াত ভাড়া তুলনা',
    hotelsStay: 'হোটেল ও থাকার ব্যবস্থা',
    tripCostTitle: 'মোট ভ্রমণ খরচের হিসাব',
    mapTitle: 'ইন্টারেক্টিভ রুট ও ঐতিহ্য মানচিত্র',
    spatialRouteMap: 'রুট মানচিত্র ও ঐতিহাসিক স্থানসমূহ',

    viewPhotos: 'ছবি দেখুন',
    bookNow: 'বুক করুন',
    perNight: 'প্রতি রাত',
    free: 'বিনামূল্যে প্রবেশ',
    officialTariff: 'সরকারি নির্ধারিত ভাড়া',
    publicBenchmark: 'মানক পাবলিক রেট',
    estimatedRange: 'আনুমানিক ভাড়া',
    distanceAway: 'দূরে',
    viewNearbyImages: 'আসল ছবি দেখুন',
    allFrames: 'সকল ছবি',
    sunsetFrame: 'সূর্যাস্ত ও সোনালী আভা',
    architectureFrame: 'স্থাপত্য ও সম্মুখভাগ',
    detailsFrame: 'পাথরের খোদাই ও নকশা',
    nightFrame: 'সন্ধ্যা ও জলের প্রতিবিম্ব',
  },

  ta: {
    appName: 'HeritAR',
    tagline: 'பாரம்பரிய இடங்கள், வெளிப்படையான கட்டணங்கள் மற்றும் AI பயண திட்டம்',
    currency: 'நாணயம்',
    language: 'மொழி',
    aiItinerary: 'AI பயண திட்டம்',
    editPreferences: 'விருப்பங்கள்',
    dataProviders: 'தரவு ஆதாரங்கள்',

    tabExplore: 'ஆராய்க',
    tabArVision: 'AR விஷன் வழிகாட்டி',
    tabVirtualTour: '360° VR சுற்றுலா',
    tabAiGuide: 'AI வழிகாட்டி',
    tabOralArchive: 'வாய்மொழி காப்பகம்',
    tabDistanceMeter: 'தொலைவு மீட்டர்',
    tabWeather: 'வானிலை',
    tabItinerary: 'பயணத்திட்டம்',
    tabImages: 'படங்கள்',
    tabPersonalization: 'தனிப்பயனாக்குதல் முறை',

    startLocation: 'தொடக்க இடம்',
    destinationLocation: 'சேருமிடம்',
    useMyLocation: 'என் இருப்பிடத்தைப் பயன்படுத்து',
    searchPlaceholder: 'நகரம் அல்லது நினைவுச்சின்னத்தைத் தேடுங்கள்...',
    locating: 'ஜிபிஎஸ் தேடுகிறது...',

    verifiedPhotos: 'சரிபார்க்கப்பட்ட புகைப்பட தொகுப்பு',
    verifiedPhotosDesc: 'விக்கிமீடியா காமன்ஸ் மூலம் உண்மையான புகைப்படங்கள்',
    recommendations: 'பரிந்துரைக்கப்பட்ட வரலாற்று இடங்கள்',
    recommendationsDesc: 'முக்கியத்துவம் வாய்ந்த கலாச்சார இடங்கள்',
    transportFares: 'பயணக் கட்டண ஒப்பீடு',
    hotelsStay: 'தங்கும் விடுதிகள் மற்றும் ஹோட்டல்கள்',
    tripCostTitle: 'மொத்த பயண செலவு மதிப்பீடு',
    mapTitle: 'ஊடாடும் பாதை மற்றும் பாரம்பரிய வரைபடம்',
    spatialRouteMap: 'பாதை வரைபடம் மற்றும் அடையாளங்கள்',

    viewPhotos: 'படங்களைப் பார்க்க',
    bookNow: 'முன்பதிவு செய்',
    perNight: 'ஒரு இரவுக்கு',
    free: 'இலவச அனுமதி',
    officialTariff: 'அரசு அதிகாரப்பூர்வ கட்டணம்',
    publicBenchmark: 'பொது நிலையான கட்டணம்',
    estimatedRange: 'மதிப்பிடப்பட்ட வரம்பு',
    distanceAway: 'தொலைவில்',
    viewNearbyImages: 'படங்களைப் பார்க்க',
    allFrames: 'அனைத்து புகைப்படங்கள்',
    sunsetFrame: 'சூரிய அஸ்தமனம்',
    architectureFrame: 'கட்டிடக்கலை முகப்பு',
    detailsFrame: 'சிற்ப வேலைப்பாடுகள்',
    nightFrame: 'இரவு மற்றும் பிரதிபலிப்புகள்',
  },
};

export function getTranslation(lang: SupportedLanguage = 'hi'): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
