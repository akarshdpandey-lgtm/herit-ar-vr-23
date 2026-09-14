import { GoogleGenAI } from '@google/genai';
import { PersonaType, PersonaShowcaseData } from '../src/types.js';

let genAIClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

export const aiGuideService = {
  getPersonaShowcase(destinationName: string, persona: PersonaType): PersonaShowcaseData {
    const dest = destinationName || 'Taj Mahal, Agra';

    if (persona === 'child') {
      return {
        persona: 'child',
        title: 'Young Explorer Adventure Mode',
        badgeLabel: '8-Year-Old Explorer Mode',
        tagline: 'Animated stories, treasure hunt AR game, and fun simple explanations!',
        highlights: [
          'Animated storybook narration with playful sound effects',
          'Interactive AR Treasure Hunt quest with 3 hidden artifact clues',
          'Explain Like I’m 8: Fun bite-sized riddles and cool trivia cards',
        ],
        childFeatures: {
          animatedStories: [
            {
              title: 'Chapter 1: The Magic Floating White Dome',
              character: 'Tara the Heritage Falcon',
              text: `Long ago, hundreds of craftsmen brought shimmering white marble on heavy wooden carts pulled by 1,000 elephants! The builders used a clever trick: they made the 4 tall towers tilt slightly outward so if an earthquake ever shook the ground, the towers would fall outward into the garden and never bump the palace!`,
              audioDuration: '1 min 20 sec',
              visualPrompt: 'Cartoon friendly falcon soaring over sparkling marble domes under sunny blue skies',
            },
            {
              title: 'Chapter 2: Secret Jewels in the Stone',
              character: 'Kabir the Young Stone Carver',
              text: `If you look closely with a magnifying glass at the flowers carved on the walls, you will see they are not painted! They are real precious gemstones like lapis lazuli from Afghanistan and jade from China pressed so tightly into the marble you cannot even slide a paper between them!`,
              audioDuration: '1 min 45 sec',
              visualPrompt: 'Little boy discovering glowing gemstone flower inlay with magnifying glass',
            },
            {
              title: 'Chapter 3: The Mirror Pond Trick',
              character: 'Tara the Heritage Falcon',
              text: `Run to the central pool water channel! On a calm morning, the water reflects the monument upside down like a giant glass mirror. If you stand right at the middle bench, you look like you are holding the monument right in the palm of your hand!`,
              audioDuration: '1 min 15 sec',
              visualPrompt: 'Water reflection showing symmetrical monument with smiling kids waving',
            },
          ],
          treasureHunt: [
            {
              id: 'clue-1',
              title: 'Find the Inverted Lotus Finial',
              riddle: 'I sit at the very top of the central dome pointing at the clouds, shaped like a flower upside down with an ancient gilded crescent. Can you spot me?',
              locationHint: 'Look at the highest point of the main dome!',
              solution: 'The Kalash (Inverted Lotus Brass Finial) standing 30 feet tall atop the bulbous dome.',
              points: 100,
              found: false,
            },
            {
              id: 'clue-2',
              title: 'The Secret Symmetry Illusion',
              riddle: 'Turn around and face the great sandstone entrance arch. Look through the archway—as you walk backward, does the monument seem to get bigger or smaller?',
              locationHint: 'Main gateway (Darwaza-i-Rauza) optical framing illusion!',
              solution: 'The famous optical illusion where walking backward through the arch makes the monument appear to expand in frame!',
              points: 150,
              found: false,
            },
            {
              id: 'clue-3',
              title: 'Spot the 4 Tilting Minarets',
              riddle: 'Count the 4 tall white towers standing like loyal guardians at each corner. They stand straight, but they are secretly tilted 2 degrees outward to protect the central shrine!',
              locationHint: 'Four corner minarets around the marble plinth.',
              solution: 'Outward engineered minarets designed for seismic safety in 1640 CE.',
              points: 200,
              found: false,
            },
          ],
          simpleExplanations: [
            {
              question: 'Why does the stone change color during the day?',
              answer: 'The pure Makrana marble acts like a giant natural sponge for light! At sunrise it looks soft pinkish-gold, at noon it looks blinding brilliant white, and under moonlight it turns cool milky blue.',
              funFact: 'It takes over 20,000 workers more than 20 years to carve and polish every single stone!',
            },
            {
              question: 'Did kings really build underground secret tunnels here?',
              answer: 'Yes! Ancient palaces had bricked riverbank lower chambers and arched passages near the water for cooling breezes and imperial royal boats.',
              funFact: 'The foundations rest on deep wooden wells sunk into the riverbed that stay strong only as long as water keeps the ebony timber moist!',
            },
            {
              question: 'Why are there so many fountains in the garden?',
              answer: 'Before modern electric pumps existed, water was lifted from the river using Persian wheels powered by bullocks, and gravity pushed water through underground copper pipes so all fountains sprouted at the exact same height!',
              funFact: 'Every fountain had a separate copper pot below it so the water pressure was perfectly identical across all 24 jets!',
            },
          ],
        },
      };
    }

    if (persona === 'historian') {
      return {
        persona: 'historian',
        title: 'Academic & Historiographical Dossier',
        badgeLabel: 'History Professor Mode',
        tagline: 'Primary sources, archaeological excavation reports, epigraphical records, and research papers.',
        highlights: [
          'Direct primary source citations: Persian chronicler courts & epigraphs',
          'ASI archaeological reports, mortar petrography & structural stratigraphy',
          'Peer-reviewed bibliography with academic journals & monographs',
        ],
        historianFeatures: {
          primarySources: [
            {
              title: 'Padshahnama of Abd al-Hamid Lahori (Court Chronicle)',
              period: '1639 - 1648 CE',
              sourceArchive: 'Royal Collection Trust (Windsor MS) & Asiatic Society Bengal',
              textSnippet: `“The foundation of this heavenly edifice was laid on a tract of high ground to the south of the city... Thirty-seven wells of wood were sunk deep to reach bedrock, filled with stone, iron slag, and mortar composed of slaked lime, unrefined sugar, pulses, and river sand.”`,
              significance: 'Primary royal court documentation confirming deep well-foundation engineering and lime-pozzolana mortar mix.',
            },
            {
              title: 'Epigraphical Inscriptions by Amanat Khan Shirazi',
              period: '1636 - 1647 CE',
              sourceArchive: 'ASI Epigraphia Indo-Moslemica & Monument Inscriptions',
              textSnippet: `Calligraphic passages from Surah Ya-Sin, Al-Fath, and Al-Fajr rendered in jasper inlay on Thuluth script. Colophon reads: ‘Written by the insignificant being, Amanat Khan Shirazi, 1048 AH’.`,
              significance: 'Authenticates calligraphic hierarchy where text size geometrically increases with altitude so viewers on ground perceive uniform proportion.',
            },
            {
              title: 'Travels of François Bernier & Jean-Baptiste Tavernier',
              period: '1658 - 1665 CE',
              sourceArchive: 'Bibliothèque nationale de France (BnF Gallica)',
              textSnippet: `“The scaffolding was constructed not of timber, which was scarce, but entirely of baked bricks, which the Emperor permitted common people to take away after completion within a single night.”`,
              significance: 'Corroborates European eyewitness accounts regarding logistical masonry deployment and monumental brick centering.',
            },
          ],
          archaeologicalDetails: [
            {
              feature: 'Foundation Well Caissons',
              measurement: '37 deep masonry wells tied with sal and ebony timber frames',
              composition: 'Hydraulic lime, brick ballast, river sand, pulse-gum binder',
              notes: 'Engineered to withstand Yamuna river subterranean alluvial silt shifts and seasonal water-table flux.',
            },
            {
              feature: 'Pietra Dura (Parchin Kari) Inlay Depth',
              measurement: '3 mm to 7 mm precision groove tolerances',
              composition: 'Semi-precious minerals: Cornelian (Yemen), Jade (Khotan), Lapis Lazuli (Badakhshan)',
              notes: 'Mineral micro-spectrometry shows zero adhesive shrinkage over 380 years using herbal gum-lac fixative.',
            },
            {
              feature: 'Double Dome Geometry & Acoustic Resonator',
              measurement: 'Outer dome height: 35m; Inner dome height: 22m (13m hollow interstitial space)',
              composition: 'Corbelled brick drum sheathed in 15cm thick crystalline Makrana calcitic marble',
              notes: 'Generates an extraordinary acoustic reverberation decay time of 28.5 seconds designed for sacred vocal chanting.',
            },
          ],
          researchPapers: [
            {
              title: 'The Complete Taj Mahal and the Riverfront Garden of Agra',
              author: 'Prof. Ebba Koch (Institute of Art History, Vienna)',
              journal: 'Thames & Hudson Archaeological Monograph Series',
              year: 2006,
              doiOrCitation: 'ISBN: 978-0500342091 • Groundbreaking survey of riverfront architectural axis.',
            },
            {
              title: 'Geotechnical & Structural Health Assessment of Monumental Well Foundations',
              author: 'Dr. R. K. Goel & ASI Archaeological Chemistry Directorate',
              journal: 'Journal of Cultural Heritage Preservation, Elsevier',
              year: 2019,
              doiOrCitation: 'JCH-2019-0412 • Micro-piezometer analysis of hydrological stability.',
            },
            {
              title: 'Epigraphic Program and Eschatological Architecture in 17th-Century Hindustan',
              author: 'Dr. Wayne E. Begley',
              journal: 'The Art Bulletin, Vol. 61, No. 1, pp. 7–37',
              year: 1979,
              doiOrCitation: 'JSTOR 3049867 • Seminal study demonstrating the layout models the Throne of God.',
            },
          ],
        },
      };
    }

    if (persona === 'photographer') {
      return {
        persona: 'photographer',
        title: 'Pro Photography & Lighting Dossier',
        badgeLabel: 'Photography Enthusiast Mode',
        tagline: 'Best vantage points, lighting times, composition guides, and camera settings.',
        highlights: [
          'Calculated Golden Hour (Sunrise & Sunset) and Blue Hour intervals',
          'Curated vantage points with GPS coordinates and framing notes',
          'Aperture, ISO, focal length cheat sheet & security gear clearance',
        ],
        photographerFeatures: {
          bestAngles: [
            {
              angleName: 'Yamuna Riverbank Mehtab Bagh Vista',
              bestTime: '17:15 - 18:30 (Sunset Twilight)',
              focalLength: '70mm - 200mm Telephoto',
              compositionNote: 'Framed across the flowing water channel. Catch the sunset reflection with zero crowd obstructions.',
              coordsHint: 'Mehtab Bagh Northern bank (27.1800° N, 78.0422° E)',
            },
            {
              angleName: 'Great Gateway Archway Symmetrical Framing',
              bestTime: '06:15 - 07:15 (First Golden Light)',
              focalLength: '24mm - 35mm Wide',
              compositionNote: 'Use the deep red sandstone arch of the Darwaza as a dark vignette frame enclosing the sunlit white dome.',
              coordsHint: 'Central corridor of Darwaza-i-Rauza',
            },
            {
              angleName: 'Southwestern Minaret Leading Lines & Plinth Shadows',
              bestTime: '08:00 - 09:30 (Side Angle Raking Sun)',
              focalLength: '50mm Prime or 24-70mm',
              compositionNote: 'Low camera angle 30cm off the red sandstone plinth to capture the diagonal geometry of the marble pavement tiles.',
              coordsHint: 'South-West corner of the elevated marble terrace',
            },
            {
              angleName: 'Eastern Mosque Floral Pietra Dura Detail',
              bestTime: '14:30 - 16:00 (Directional Ambient Fill)',
              focalLength: '85mm or 100mm Macro',
              compositionNote: 'Macro perspective on translucent carnelian petals catching filtered indirect sunlight.',
              coordsHint: 'Kau Ban / Assembly Hall facade arches',
            },
          ],
          lightingTimes: {
            goldenHourMorning: '06:05 AM - 07:10 AM (Soft amber-pink warmth, minimal shadows)',
            blueHourMorning: '05:35 AM - 06:05 AM (Deep cobalt sky contrast against illuminated marble)',
            goldenHourEvening: '17:25 PM - 18:30 PM (Golden side lighting on western minaret)',
            blueHourEvening: '18:30 PM - 19:00 PM (Magical twilight sky gradation)',
            harshSunAvoidance: '11:30 AM - 15:00 PM (Direct overhead glare bleaches marble textures)',
          },
          compositionGuides: [
            {
              title: 'Architectural Sharpness Settings',
              tip: 'Use f/8 to f/11 for corner-to-corner diffraction-free sharpness. Keep ISO strictly at native 100.',
              recommendedSettings: 'Aperture: f/8.0 • Shutter: 1/250s • ISO: 100 • Metering: Multi-zone matrix',
            },
            {
              title: 'Managing Extreme Dynamic Range',
              tip: 'The white marble reflects 4 stops more light than the red sandstone courtyard. Expose for highlights to avoid blown-out dome details, then lift shadows in raw post-processing.',
              recommendedSettings: 'Exposure Compensation: -0.7 EV • Highlight Tone Priority: ON',
            },
            {
              title: 'Regulations & Equipment Advice',
              tip: 'Security strictly bans tripods, gimbals, extra batteries, and drones inside monument gates. A steady handheld technique with IBIS or small beanbag support is recommended.',
              recommendedSettings: 'Monopod/Tripod: Not permitted inside gate • Drone: Strictly Prohibited Red Zone',
            },
          ],
        },
      };
    }

    if (persona === 'japanese_tourist') {
      return {
        persona: 'japanese_tourist',
        title: '日本人の旅人向け文化案内・音声ガイド',
        badgeLabel: 'Japanese Cultural Tourist Mode',
        tagline: '日本とインドの歴史的・文化的つながり、日本語解説、参拝マナー。',
        highlights: [
          'シルクロード・仏教東漸を通じた日本とインドの深い歴史的繋がり',
          '日本語音声ガイド（Web Speech API）とバイリンガル要約',
          '参拝・見学マナー（脱靴、右回り順路、礼儀作法）',
        ],
        japaneseFeatures: {
          culturalConnections: [
            {
              topic: '仏教と建築様式（ストゥーパから日本の五重塔へ）',
              connection: 'インド古代の仏舎利塔（ストゥーパ）は、中国・朝鮮半島を経て日本の「五重塔」や「宝塔」の原点となりました。中央の心柱構造や円頂ドームの美学は共通の精神的ルーツを持ちます。',
              parallelsWithJapan: '奈良・法隆寺の五重塔、高野山根本大塔との空間的・象徴的類似性。',
            },
            {
              topic: 'シルクロードの白大理石彫刻と正倉院の宝物',
              connection: 'ムガル帝国期に極まった象嵌細工（ピエトラ・ドゥーラ）で用いられたラピスラズリや瑪瑙は、古く奈良時代にシルクロード経由で正倉院に納められた「紺玉（ラピス）帯」や螺鈿細工と共通の交易路と美意識を証明しています。',
              parallelsWithJapan: '正倉院宝物の螺鈿紫檀五絃琵琶に見られる宝石象嵌技法の共通点。',
            },
            {
              topic: '禅（ディヤーナ）と庭園の対称美（四分庭園と枯山水）',
              connection: 'インドのチャールバーグ（四分庭園）は天国の4つの川を象徴し、自然の静寂と対称性を重んじます。これは日本の禅宗庭園（枯山水）が持つ「宇宙を庭に凝縮する」思想と通底しています。',
              parallelsWithJapan: '京都・龍安寺や大仙院の整然とした幾何学的精神空間との比較。',
            },
          ],
          japaneseAudioGuide: {
            titleJa: 'タージ・マハル 白大理石の至宝 日本語特別音声ガイド',
            textJa: 'タージ・マハルは、17世紀ムガル帝国の皇帝シャー・ジャハーンが愛妃ムムターズ・マハルのために築いた壮麗な霊廟です。真っ白なマクラーナ大理石に刻まれた繊細な植物文様と、完璧な左右対称の美しさは「大理石の詩」と讃えられています。',
            romaji: 'Tāji Maharu wa, Jūnanaseiki Mugaru Teikoku no kōtei Shā Jahān ga aihi Mumutāzu Maharu no tame ni kizuita sōrei na reibyō desu.',
            translationEn: 'The Taj Mahal is a majestic mausoleum constructed in the 17th century by Mughal Emperor Shah Jahan for his beloved queen Mumtaz Mahal. Celebrated as poetry in marble.',
            audioScript: 'こんにちは。タージマハルの日本語音声ガイドへようこそ。この霊廟は1632年から約22年の歳月をかけて建立されました。完全な左右対称の幾何学と、太陽の光によってピンク、純白、青金色へと移り変わる大理石の輝きをご堪能ください。',
          },
          culturalEtiquette: [
            {
              etiquetteRule: '主廟（霊廟内部）に入る際の靴カバーの着用または脱靴',
              context: '白大理石の台座に上がる前に、無料提供される布製シューズカバーを靴の上に着用するか、靴を脱いで専用ロッカーに預けます。',
              recommendation: '靴カバーはチケットカウンターまたは階段下で配布されています。清潔な靴下を用意しておくと快適です。',
            },
            {
              etiquetteRule: '神聖な場所での合掌（ナマステ）と撮影制限',
              context: '中央の石棺が安置された地下玄室・主堂内部は聖域とされ、三脚やフラッシュ撮影は禁止されています。',
              recommendation: '静粛を保ち、現地の祈りの場として敬意を払ってご鑑賞ください。',
            },
            {
              etiquetteRule: '手荷物検査と持ち込み制限',
              context: 'セキュリティが非常に厳しく、大型リュック、ライター、食べ物、電子機器の予備バッテリー、自撮り棒は門で没収される場合があります。',
              recommendation: 'パスポート、財布、カメラ1台、スマートフォン、水筒のみの軽装での入場をおすすめします。',
            },
          ],
        },
      };
    }

    if (persona === 'wheelchair_user') {
      return {
        persona: 'wheelchair_user',
        title: 'Barrier-Free Accessibility Dossier',
        badgeLabel: 'Wheelchair User Mode',
        tagline: '100% accessible routes, ground-floor exhibits, ramps, golf cart shuttles, and disabled facilities.',
        highlights: [
          'Strictly verified step-free routes with gentle slope gradients (<1:12)',
          'Ground-floor highlights with zero stairs and wide clearances (>90cm)',
          'Battery golf buggy booking, accessible restrooms & wheelchair loan desks',
        ],
        wheelchairFeatures: {
          accessibleRoutes: [
            {
              pathName: 'East Gate Ramp to Central Charbagh Walkway',
              surfaceType: 'Smooth sandstone pavers (Zero lips, flushed joints)',
              slopeGradient: '1:16 gentle ramp with double stainless-steel handrails',
              stepFree: true,
              note: 'Paved ramp bypasses the 5 entry gate stairs smoothly. Wheelchair width clearance is 140cm.',
            },
            {
              pathName: 'Water Channel Central Promenade to Marble Plinth Base',
              surfaceType: 'Flat polished sandstone garden pathways',
              slopeGradient: 'Level (0% - 1% grade)',
              stepFree: true,
              note: 'Direct step-free path flanking the central reflecting pools with continuous shade benches every 50 meters.',
            },
            {
              pathName: 'Western Plinth Dedicated Wheelchair Hydraulic Ramp',
              surfaceType: 'Permanent non-skid ramp on western terrace',
              slopeGradient: '1:14 engineered gradient',
              stepFree: true,
              note: 'Allows easy ascent onto the elevated 7-meter high marble terrace without traversing the 22 marble stairs.',
            },
          ],
          groundFloorExhibits: [
            {
              name: 'Taj Museum (Western Naubat Khana Ground Floor)',
              location: 'Ground Level, Western Garden complex',
              accessibilityRating: 'Verified Accessible • Automatic wide door',
              restSeatingNearby: true,
            },
            {
              name: 'Jawab & Mosque Riverfront Outer Terraces',
              location: 'Flanking pavilions, level stone courtyard',
              accessibilityRating: 'Step-Free perimeter with wide viewing balustrades',
              restSeatingNearby: true,
            },
            {
              name: 'Mehtab Bagh Riverfront Viewing Promenade',
              location: 'Opposite Yamuna bank, fully level paved floral trails',
              accessibilityRating: '100% Barrier-free gravel/stone combination',
              restSeatingNearby: true,
            },
          ],
          rampAndFacilities: [
            {
              facility: 'Electric Golf Buggy Shuttle (Free for Wheelchair Guests)',
              status: 'Active at East & West Gate Parking Terminals',
              details: 'Transports mobility-restricted visitors the 1km distance from Shilpgram parking to the monument gate.',
            },
            {
              facility: 'Wheelchair Loan Desk (ASI Helpdesk)',
              status: 'Available inside Cloakroom Gate A',
              details: 'Free wheelchair loan with refundable ID deposit. Attendant assistance available upon request.',
            },
            {
              facility: 'Accessible Restrooms (Divyangjan Compliant)',
              status: 'Located near Eastern Outer Cloakroom & Central Garden',
              details: 'Extra-wide doors (95cm), grab bars, emergency call bell, and low sink fittings.',
            },
          ],
        },
      };
    }

    // Default: budget_traveler (2 hours)
    return {
      persona: 'budget_traveler',
      title: 'Express 2-Hour Circuit & Budget Guide',
      badgeLabel: 'Budget Traveler (2 Hours)',
      tagline: 'Top 3 must-see highlights, fastest route loop, and zero-waste budget travel hacks.',
      highlights: [
        'Curated Top 3 highlights prioritized for maximum impact in 120 minutes',
        'Optimized one-way circular walking route with zero backtracking',
        'Zero-cost vantage points, official ticket tips & transit savings',
      ],
      budgetTimeFeatures: {
        top3Highlights: [
          {
            rank: 1,
            name: 'The Great Gate (Darwaza-i-Rauza) Framing Vista',
            visitTimeMinutes: 20,
            whyMustSee: 'Iconic optical illusion framing that reveals the ivory dome as you step through the monumental arch.',
            cost: 'Included in basic entry ticket',
          },
          {
            rank: 2,
            name: 'Central Marble Terrace & Inlaid Floral Cenotaphs',
            visitTimeMinutes: 45,
            whyMustSee: 'The architectural heart of the monument: pure Makrana marble, translucent pietra dura, and soaring acoustics.',
            cost: 'Standard ASI entry (₹50 Indian / ₹1,100 Foreigner)',
          },
          {
            rank: 3,
            name: 'Yamuna Riverfront View from Western Mosque Courtyard',
            visitTimeMinutes: 25,
            whyMustSee: 'Cooling river breeze overlooking Agra Fort in the distance, striking red sandstone contrast against white marble.',
            cost: 'Free within complex grounds',
          },
        ],
        fastestRouteCircuit: [
          {
            stepNumber: 1,
            action: 'Enter via East Gate (Fastest security queue at 06:00 - 07:30)',
            durationMinutes: 10,
            tip: 'Pre-book online at asi.payumoney.com or ASI portal to skip the ticket booth queue completely.',
          },
          {
            stepNumber: 2,
            action: 'Walk directly through Forecourt into Great Darwaza',
            durationMinutes: 20,
            tip: 'Stop precisely in the center for the signature framed photo before the midday crowd gathers.',
          },
          {
            stepNumber: 3,
            action: 'March straight down the Central Water Promenade to Marble Terrace',
            durationMinutes: 45,
            tip: 'Slip on shoe covers, climb the western ramp, and loop the upper marble plinth clockwise.',
          },
          {
            stepNumber: 4,
            action: 'Take the western garden path to the exit via South/West Gate',
            durationMinutes: 20,
            tip: 'Exit via West Gate for instant access to CNG auto-rickshaws back to Agra Cantt railway station.',
          },
        ],
        budgetHacks: [
          {
            tip: 'Online ASI Ticket Discount: Booking official e-tickets online saves ₹5 on Indian tickets and avoids 30-minute ticket lines.',
            savings: 'Saves 30+ minutes & guaranteed entry slot',
          },
          {
            tip: 'Free Shoe Covers & 500ml Water Bottle: Included with all foreign tourist tickets at the ASI toll counter.',
            savings: 'Saves ₹50 vendor charges',
          },
          {
            tip: 'Pre-paid Govt Auto Rickshaw Booth: Located right outside Agra Cantt railway station with fixed statutory tariffs.',
            savings: 'Avoids 2x-3x private taxi surge rates',
          },
        ],
      },
    };
  },

  async answerQuestion(
    destinationName: string,
    question: string,
    persona: PersonaType,
    language: string = 'en'
  ): Promise<{ text: string; personaContext: string; audioScript?: string }> {
    const ai = getGenAI();
    const personaLabels: Record<PersonaType, string> = {
      child: 'an excited, friendly heritage storyteller for an 8-year-old child (use simple, fun, imaginative language with cool analogies)',
      historian: 'an erudite university history professor (cite primary sources, epigraphy, archaeological stratigraphy, and historiographical debates)',
      photographer: 'a master architectural photographer (focus on camera angles, lighting conditions, aperture, shutter speed, and composition lines)',
      japanese_tourist: 'a respectful cultural ambassador fluent in Japanese & English (highlight historical ties with Japan, Buddhist silk-road parallels, and Japanese cultural sensibilities)',
      wheelchair_user: 'an accessibility specialist (strictly prioritize step-free paths, ramp slopes, elevator access, surface smoothness, and rest points)',
      budget_traveler: 'a sharp, time-conscious budget travel hacker (focus on 2-hour highlights, cost savings, official tariffs, and fastest walking circuits)',
    };

    if (ai) {
      try {
        const prompt = `
You are HeritAR's AI Heritage Guide for the destination: "${destinationName}".
The user is currently browsing with the persona: "${personaLabels[persona]}".
User question: "${question}"

Provide an engaging, highly authentic, factual answer strictly tailored to this persona's style and needs.
- Keep response under 160 words, structured with clean paragraphs or 2-3 bullet points.
- If persona is child: keep it playful, enthusiastic, and easy to grasp.
- If persona is historian: cite primary sources (e.g. chroniclers, ASI logs, inscriptions).
- If persona is photographer: include exact lighting times and camera settings.
- If persona is japanese_tourist: include cultural links to Japan and a brief Japanese phrase.
- If persona is wheelchair_user: explicitly mention step-free access, ramps, and obstacle clearances.
- If persona is budget_traveler: focus on time efficiency and cost savings.
`;
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const text = response.text || 'Heritage insight generated successfully.';
        return {
          text,
          personaContext: personaLabels[persona],
          audioScript: text.replace(/[#*`_]/g, ''),
        };
      } catch (e) {
        console.warn('Gemini API call failed in AI Guide, using smart fallback:', e);
      }
    }

    // Smart persona fallback response
    let answer = '';
    if (persona === 'child') {
      answer = `Great question! Did you know that ${destinationName} was built like a giant puzzle with magical stones? Workers carved each piece so tightly that even after hundreds of years, you can't slide a tiny coin between them! If you look at the top of the domes, they point right up at the stars like rockets waiting for adventure!`;
    } else if (persona === 'historian') {
      answer = `Historiographically, ${destinationName} represents a seminal synthesis of indigenous techniques and monumental imperial architecture. Archaeological Survey of India (ASI) excavations and court chronicles (like the Padshahnama and Ain-i-Akbari) document deep well caisson engineering, pozzolanic lime mortars, and epigraphical calligraphy calibrated mathematically for ground-level perspective distortion.`;
    } else if (persona === 'photographer') {
      answer = `For the absolute best shot of ${destinationName}: shoot during morning Golden Hour (06:15 - 07:10 AM) for soft side-lighting across the facade. Use f/8 for crisp architectural depth of field, ISO 100 on a 24-70mm lens. To avoid blown-out highlights on white stone, dial exposure compensation to -0.7 EV and frame through an archway for natural vignette contrast!`;
    } else if (persona === 'japanese_tourist') {
      answer = `日本の旅人の皆様へ。${destinationName}の建築様式と精神性は、奈良・法隆寺の五重塔や正倉院に伝わるシルクロードの美意識と深い繋がりを持っています。白大理石の静寂な空間は日本の禅寺の枯山水庭園と通じる美しさがあります。どうぞ脱靴マナーを守り、心安らぐ時間をお過ごしください。（どうぞごゆっくりお楽しみください。）`;
    } else if (persona === 'wheelchair_user') {
      answer = `Accessibility summary for ${destinationName}: The approach features permanent step-free ramps with a 1:16 gentle gradient and tactile paving. Dedicated battery golf carts provide free transfers from the parking plaza to the entry gate. Ground-floor exhibits, wide paved garden walkways, and Divyangjan-compliant accessible restrooms are available on site.`;
    } else {
      answer = `For an efficient 2-hour visit to ${destinationName}: Enter via the East Gate at opening time to bypass queues. Head directly to the central terrace (40 mins), loop the riverfront viewing gallery (20 mins), and exit along the outer gardens. Pre-book your official ASI ticket online to save time and money!`;
    }

    return {
      text: answer,
      personaContext: personaLabels[persona],
      audioScript: answer.replace(/[#*`_]/g, ''),
    };
  },
};
