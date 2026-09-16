/**
 * Project Store: Handles multi-project state, custom prompt persistence,
 * phase progression (Phase 1 -> 4), and rendering settings.
 */

const STORAGE_KEY = 'mughal_3d_architect_projects_v6';

const TEMPLE_PROMPT_INSTRUCTION = ' Use the uploaded real reference photographs as the primary visual reference. Generate a recognizable architectural model of the actual temple, not a generic Indian temple. Preserve the distinctive roof, dome, entrance, facade, and overall proportions. Do not merge architectural features from different temples. Prioritize geometric accuracy, cultural authenticity, and realistic materials.';

const DEFAULT_PROJECTS = [
  // --- 1. KEDARNATH TEMPLE (UTTARAKHAND) ---
  {
    id: 'kedarnath-01',
    name: 'Kedarnath Temple (Uttarakhand)',
    category: '🕉️ Sacred Pilgrimages & Jyotirlingas',
    description: 'Ancient Himalayan stone temple with grey granite sanctum, sloping stone roof, Nandi statue, and snow-capped Himalayan peaks.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'kedarnath',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D model of the real Kedarnath Temple in Uttarakhand, India. Create a traditional Himalayan stone temple with a rectangular stone sanctum, sloping stone roof, prominent front entrance, and a compact temple layout. Include the surrounding Himalayan mountain backdrop as a separate environment element. Maintain historically recognizable proportions and avoid generic fantasy temple designs.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Traditional Himalayan stone temple massing',
          'Rectangular grey stone sanctum (Garbhagriha)',
          'Sloping mountain stone slab roof',
          'Prominent front entrance and compact layout',
          'Himalayan mountain backdrop environment element'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Refine the existing Kedarnath Temple model by adding detailed grey stone masonry, large stone entrance steps, carved doorway frames, traditional temple roof layers, stone walls, and a recognizable front facade. Add the Nandi statue positioned in front of the temple entrance. Preserve the original architectural proportions and recognizable temple identity.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Detailed grey stone masonry and ashlar joints',
          'Large stone entrance steps (sopana flight)',
          'Carved doorway frames and front facade details',
          'Traditional tiered temple roof layers',
          'Monolithic stone Nandi statue facing temple entrance'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply realistic weathered grey granite and stone textures across the temple structure. Add subtle surface roughness, natural stone joints, weathering, and fine architectural carvings. Use realistic materials without excessive decoration. Ensure the Nandi statue and temple entrance are clearly visible.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Realistic weathered grey Himalayan granite texture',
          'Natural interlocking stone joints and roughness',
          'Subtle alpine weathering and frost patina',
          'Fine architectural stone carvings',
          'Prominent, clearly visible Nandi statue and entrance'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the completed Kedarnath Temple in its authentic Himalayan environment, surrounded by snow-covered mountain peaks, rocky terrain, and a natural stone pathway. Add soft morning sunlight, realistic atmospheric haze, and natural shadows. Render a high-resolution photorealistic 3D scene suitable for a digital tourism and cultural heritage application.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Authentic snow-covered Kedarnath mountain peaks backdrop',
          'Glacial rocky terrain and natural stone pathway',
          'Traditional Himalayan prayer flag poles',
          'Soft morning alpine sunlight and mountain haze',
          'High-resolution photorealistic render for digital heritage'
        ]
      }
    }
  },
  // --- 2. BADRINATH TEMPLE (UTTARAKHAND) ---
  {
    id: 'badrinath-02',
    name: 'Badrinath Temple (Uttarakhand)',
    category: '🕉️ Sacred Pilgrimages & Jyotirlingas',
    description: 'Famous colorful Himalayan temple with Singhdwara arched facade in red, yellow, blue & white, conical roof, and Alaknanda valley.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'badrinath',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D model of the real Badrinath Temple in Uttarakhand, India. Create its distinctive colorful Himalayan temple facade, central entrance structure, compact temple body, and traditional sloping roof. Preserve the recognizable architectural silhouette of Badrinath Temple and avoid creating a generic Indian temple.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Distinctive colorful Himalayan temple facade massing',
          'Central arched entrance structure (Singhdwara)',
          'Compact temple body and sloping conical canopy roof',
          'Historically recognizable Badrinath silhouette',
          'Pure untextured architectural clay geometry'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Refine the existing Badrinath Temple model by adding the ornate front entrance, decorative arches, traditional facade details, windows, colorful architectural elements, and temple entrance steps. Add the surrounding temple courtyard and a small sacred water feature inspired by the Alaknanda River setting. Maintain authentic proportions and recognizable details.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Ornate front entrance with decorative cusped arches',
          'Multi-colored architectural window frames',
          'Temple entrance steps and stone courtyard',
          'Sacred water feature (Tapt Kund thermal spring bath)',
          'Gilded Kalasha finial atop conical roof'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply realistic painted facade textures with traditional red, yellow, blue, and white architectural colors. Add weathered stone, plaster, wood, and metal material details where appropriate. Use realistic surface imperfections, subtle aging, and natural lighting response. Keep the decoration faithful to the real Badrinath Temple.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Traditional red, yellow, blue, and white painted facade textures',
          'Weathered stone courtyard pavers and plinth',
          'Wood and metal architectural trims',
          'Realistic surface imperfections and subtle aging',
          'Authentic Himalayan temple coloration'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the completed Badrinath Temple in a realistic Himalayan valley surrounded by mountains, rocky terrain, and natural vegetation. Include a believable temple courtyard and a distant river environment. Use soft daylight, realistic shadows, and atmospheric depth. Render a high-resolution photorealistic 3D scene for immersive cultural tourism.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Realistic Himalayan valley flanked by Nar and Narayan mountain ranges',
          'Rocky terrain, alpine pine trees and natural vegetation',
          'Believable stone temple courtyard and Tapt Kund',
          'Distant turquoise Alaknanda river stream',
          'Soft daylight, atmospheric depth, and photorealistic render'
        ]
      }
    }
  },
  // --- 3. MAHAKALESHWAR TEMPLE (UJJAIN) ---
  {
    id: 'mahakaleshwar-03',
    name: 'Mahakaleshwar Temple (Ujjain, Madhya Pradesh)',
    category: '🕉️ Sacred Pilgrimages & Jyotirlingas',
    description: 'Revered Jyotirlinga temple complex with multi-tier Nagara shikhara, carved stone pillars, Nandi pavilion, and Koteshwar Kund courtyard.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'mahakaleshwar',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D model of the real Mahakaleshwar Jyotirlinga Temple in Ujjain, Madhya Pradesh, India. Create a traditional Hindu temple complex with a central sanctum, prominent shikhara, entrance gateway, stone steps, and surrounding temple structures. Preserve the recognizable architectural identity of Mahakaleshwar Temple.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Multi-tier central sanctum (Omkareshwar, Nagchandreshwar, Mahakal)',
          'Prominent curvilinear Nagara shikhara spire',
          'Ardha-mandapa entrance gateway and stone steps',
          'Surrounding temple courtyard structures',
          'Pure untextured clay massing'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Refine the existing Mahakaleshwar Temple model by adding intricate Hindu temple architectural details, carved stone pillars, decorative entrance arches, layered shikhara elements, ornamental facade patterns, and a traditional temple courtyard. Add a respectful representation of Nandi near the entrance. Maintain realistic architectural proportions.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Layered shikhara elements with amalaka & golden Trishul finial',
          'Carved stone pillars along the mandapa facade',
          'Decorative entrance arches and stone moldings',
          'Respectful representation of Nandi inside a dedicated pavilion',
          'Traditional temple courtyard and stone steps'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply realistic sandstone, granite, and aged stone textures to the temple structure. Add fine carvings, ornamental patterns, subtle weathering, and realistic material roughness. Use traditional Indian temple colors in a restrained and historically inspired manner. Avoid exaggerated fantasy decoration.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Warm aged Malwa sandstone masonry texture',
          'Subtle sacred vermilion and ash patina',
          'Fine carvings, ornamental patterns, and cornices',
          'Realistic stone roughness and mineral weathering',
          'Historically authentic, restrained temple finishes'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the completed Mahakaleshwar Temple in a realistic Ujjain temple complex environment with stone pathways, courtyard spaces, traditional surrounding architecture, and natural daylight. Add soft morning lighting, realistic shadows, and subtle atmospheric depth. Render a high-resolution photorealistic 3D scene suitable for digital heritage tourism.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Realistic Ujjain temple complex with flagstone courtyards',
          'Sacred Koteshwar Kund water reservoir tank',
          'Colonnaded perimeter cloisters and Deepstambha pillar',
          'Soft morning sunlight with warm golden-hour glow',
          'High-resolution photorealistic render for digital heritage'
        ]
      }
    }
  },
  // --- 4. KASHI VISHWANATH TEMPLE (VARANASI) ---
  {
    id: 'kashi-vishwanath-04',
    name: 'Kashi Vishwanath Temple (Varanasi, Uttar Pradesh)',
    category: '🕉️ Sacred Pilgrimages & Jyotirlingas',
    description: 'Iconic Varanasi Jyotirlinga with its monumental 24K Golden Spire (Swarna Shikhara), multiple gold cupolas, and heritage corridor.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'kashi-vishwanath',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D model of the real Kashi Vishwanath Temple in Varanasi, Uttar Pradesh, India. Create the traditional Hindu temple structure with its distinctive golden dome, multiple smaller domes, central sanctum, entrance gateway, and compact temple complex. Preserve the recognizable silhouette and proportions of the actual temple.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Distinctive monumental golden dome (Swarna Shikhara) spire',
          'Multiple smaller gold cupolas and subsidiary domes',
          'Central sanctum and Mandapa assembly hall',
          'Entrance gateway and compact temple layout',
          'Pure untextured clay massing'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Refine the existing Kashi Vishwanath Temple model by adding detailed temple entrance arches, carved stone elements, traditional shikhara and dome forms, ornamental facade patterns, temple courtyard, and surrounding heritage-style architectural structures. Add realistic architectural detailing without inventing unrelated buildings.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Detailed temple entrance arches and cusped Kashi Torana portal',
          'Traditional shikhara and repoussé dome forms',
          'Ornamental facade patterns and flight of steps',
          'Surrounding heritage-style corridor pavilions with chhatris',
          'Sacred Nandi shrine facing the sanctum'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply realistic golden metal textures to the main temple dome and appropriate metallic elements. Add detailed stone, plaster, and traditional architectural textures to the remaining temple surfaces. Include subtle weathering, realistic reflections, and fine ornamental details. Preserve the authentic appearance of the temple.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Gleaming 24K gold plate repoussé texture on main spire & domes',
          'Authentic Chunar sandstone paver and wall masonry textures',
          'Subtle weathering and specular reflections on gold surfaces',
          'Fine ornamental repoussé relief details',
          'Faithful preservation of Kashi Vishwanath\'s iconic identity'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the completed Kashi Vishwanath Temple in a realistic Varanasi heritage environment, with traditional surrounding buildings, stone pathways, and a culturally authentic atmosphere. Use warm morning sunlight, realistic shadows, and subtle atmospheric haze. Render a high-resolution photorealistic 3D scene for an immersive digital tourism experience.' + TEMPLE_PROMPT_INSTRUCTION,
        features: [
          'Realistic Varanasi heritage corridor with red stone facades',
          'Chunar sandstone flagstone courtyard and street lamps',
          'Warm morning sunlight reflecting off the golden spire',
          'Subtle atmospheric haze inspired by the morning Ganga ghats',
          'High-resolution photorealistic render for digital tourism'
        ]
      }
    }
  },
  // --- CATEGORY 3: TOP 3 CULTURAL / HERITAGE SITES ---
  {
    id: 'khajuraho-01',
    name: 'Khajuraho Temples (Madhya Pradesh)',
    category: '🏞️ Category 3: Top 3 Cultural / Heritage Sites',
    description: 'North Indian Nagara-style temple with curvilinear shikhara, stacked urushringa mini-spires, pillared mandapas, richly carved relief bands, and manicured temple lawns.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'nagara-temple',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D base model of a North Indian Nagara-style temple with a tall curvilinear shikhara (spire), a smaller mandapa (hall) attached in front, and a raised stone platform.',
        features: [
          'Curvilinear towering shikhara spire massing',
          'Pyramidal stepped mandapa hall attached to sanctum',
          'Raised high stone platform plinth (jagati)',
          'Geometric low-poly Nagara architectural proportions',
          'Pure untextured clay massing'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Add detailing: multiple stacked miniature spire clusters (urushringa) around the main shikhara, pillared mandapa entrance, and tiered platform steps.',
        features: [
          'Cascading urushringa miniature spire clusters flanking the main tower',
          'Carved amalaka ribbed crown disc and golden kalasha pot finial',
          'Pillared entrance porch (ardha-mandapa) with decorative bracket columns',
          'Tiered platform steps leading up to the sanctum terrace',
          'Horizontal architectural moldings (pitha & vedibandha)'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply sandstone texture in beige-brown tones. Add richly carved relief sculpture texture across the outer walls — figures, deities, and decorative bands — matching the intricate carving style of Khajuraho temples.',
        features: [
          'Warm beige-brown Panna sandstone masonry texture',
          'Intricate carved relief friezes with celestial apsaras, deities & floral bands',
          'Multi-tier figurative narrative panels along the sanctum walls',
          'Carved stone column capitals and floral architraves',
          'Subtle natural mineral weathering and stone grain'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the temple in a landscaped green lawn setting with trimmed hedges and pathway, similar to the real Khajuraho complex. Set lighting to bright midday sun with a clear blue sky. Photorealistic render.',
        features: [
          'Archaeological Survey landscaped green lawns & trimmed geometric hedges',
          'Paved sandstone visitor pathways and viewing areas',
          'Bright Madhya Pradesh midday sun with high-contrast crisp shadows',
          'Clear vibrant blue sky with soft horizon haze',
          'Photorealistic architectural render with ambient stone bounce'
        ]
      }
    }
  },
  {
    id: 'hampi-02',
    name: 'Hampi Ruins (Karnataka)',
    category: '🏞️ Category 3: Top 3 Cultural / Heritage Sites',
    description: 'Ruined Vijayanagara temple complex with monolithic stone chariot (rath), multi-column mandapa hall, weathered granite pillars, boulder-strewn hills, and golden evening light.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'hampi-ruins',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D base model of ruined temple architecture: a pillared hall (mandapa) with rows of stone columns, and a separate stone chariot (rath) structure nearby, partially weathered/broken.',
        features: [
          'Open pillared hall (maha-mandapa) column grid layout',
          'Monolithic stone chariot (Garuda Shrine) base structure',
          'Partially broken/collapsed roof slabs and weathered columns',
          'Raised granite plinth and sanctum base',
          'Pure untextured architectural clay geometry'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Add detailing: carved capital details on the pillar tops, broken/missing sections on some pillars for a ruin effect, stone wheel details on the chariot base, and scattered rubble around the structure.',
        features: [
          'Carved Yali / musical pillar composite columns with mythical beasts',
          'Chariot stone wheels with carved hubs, concentric rims & spokes',
          'Weathered fractures, fractured lintels & fallen column stumps',
          'Scattered rubble and tumbled masonry blocks across the courtyard',
          'Stone elephant guardians flanking the chariot flight of steps'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply rough weathered granite texture in grey-brown tones, with moss and lichen patches in shaded areas, cracks, and erosion detail on exposed edges.',
        features: [
          'Rough weathered Deccan granite texture in warm grey-brown hues',
          'Organic lichen patches, green moss streaks in crevices and plinth base',
          'Fine fissure cracks, chip erosion, and centuries-old stone patina',
          'Carved relief friezes on the chariot pedestal with processions',
          'Weathered rough-hewn stone specular response'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the ruins amid a rocky boulder-strewn landscape with dry grass and scattered boulders in the background, matching Hampi\'s terrain. Set lighting to golden evening light with long shadows. Photorealistic render.',
        features: [
          'Dramatic Tungabhadra granite boulder hills and balanced rock formations',
          'Arid scrubland with patches of dry golden grass and red soil',
          'Warm golden-hour evening sun (low angle 20°) casting long dramatic shadows',
          'Amber-gold twilight sky gradient with atmospheric dust glow',
          'Photorealistic render highlighting granite texture in evening warmth'
        ]
      }
    }
  },
  {
    id: 'ajanta-ellora-03',
    name: 'Ajanta-Ellora Caves (Maharashtra)',
    category: '🏞️ Category 3: Top 3 Cultural / Heritage Sites',
    description: 'Rock-cut volcanic cliff cave temple with monumental horseshoe Chaitya arch, pillared veranda, seated Buddha niches, ancient mural frescoes, and river gorge valley at soft daylight.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'rock-cut-cave',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D base model of a rock-cut cave temple: a cliff face with a carved entrance, pillared veranda, and a horseshoe-shaped chaitya window above the doorway.',
        features: [
          'Monumental vertical rock-cut basalt cliff face facade',
          'Recessed entrance opening leading into a rock-hewn pillared veranda',
          'Iconic horseshoe-shaped chaitya sun-window (arch) above portal',
          'Monolithic stone cave hall excavated into the mountain',
          'Pure untextured clay massing'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Add detailing: carved pillar capitals inside the veranda, seated Buddha/deity sculpture niches flanking the entrance, and a stepped rock-cut pathway leading up to the cave.',
        features: [
          'Elaborate fluted pillar shafts with cushion (amalaka) capitals and dwarf brackets',
          'Monolithic seated Buddha sculpture in Padmasana posture within flanked niches',
          'Stepped rock-cut stairway and parapet climbing the cliff face',
          'Intricate ribbed timber-style vaulting carved into the chaitya arch',
          'Dvarapala (guardian) relief figures flanking the sanctum portal'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply rough-hewn dark basalt rock texture for the cliff face, with carved figure and mural texture detailing near the entrance walls, and interior faded fresco-style painting texture on cave walls.',
        features: [
          'Rough-hewn dark Deccan basalt rock with chisel marks and rock strata',
          'Faded fresco mural paintings with earth pigments, Bodhisattvas, and floral vines',
          'Polished stone floor worn smooth by ancient pilgrims',
          'Carved stone sculpture relief details with soot and antique patina',
          'Authentic weathered mineral staining across rock fissures'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the cave temple into a hillside with a valley and river visible below, dry deciduous trees around the cliff edge. Set lighting to soft diffused daylight (as if under an overhang) with warm interior torchlight glow. Photorealistic render.',
        features: [
          'Horseshoe-shaped Waghora river canyon gorge below the cliff',
          'Dry deciduous teak trees, shrubs, and wild vegetation along the cliff edge',
          'Soft diffused natural daylight falling under the rocky cave overhang',
          'Warm flickering oil lamp / torchlight glow illuminating interior murals',
          'Photorealistic atmospheric canyon depth & render'
        ]
      }
    }
  },
  // --- CATEGORY 2: TOP 3 VISITING PLACES ---
  {
    id: 'taj-mahal-01',
    name: 'Taj Mahal (Agra)',
    category: '🕌 Category 2: Top 3 Visiting Places',
    description: 'Symmetrical white marble mausoleum with monumental onion dome, four corner minarets, pietra dura inlays, and Charbagh reflecting canal at sunrise.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'taj-mahal',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D base model of the Taj Mahal: a symmetrical mausoleum with a large central onion-shaped dome, four minarets at each corner, and a square platform base.',
        features: [
          'Symmetrical quadrilateral mausoleum massing',
          'Monumental central onion-shaped bulbous dome',
          'Four 3-tier corner minarets with balconies',
          'Raised square platform base (chabutra)',
          'Pure untextured architectural clay geometry'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Add detailing: four large iwan (arched recess) facades on each side, smaller domed chhatris around the main dome, finial on top of the dome, and decorative minaret caps.',
        features: [
          'Four monumental arched iwan portals (pishtaq) on each side',
          'Four domed chhatris (kiosks) flanking the central dome',
          'Gilded lotus brass finial crowning the main dome apex',
          'Decorative chhatri cupolas capping all four corner minarets',
          'Chamfered octagonal plan corners with double-tier niches'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply pure white marble texture with fine grey veining. Add detailed pietra dura floral inlay work in red, green, and yellow semi-precious stone patterns around the arches, and delicate calligraphy texture bordering the main iwan.',
        features: [
          'Pure Makrana white marble with natural calcite and soft grey veining',
          'Detailed Pietra Dura (Parchin Kari) inlays with red carnelian, lapis, jade & yellow jasper',
          'Delicate Thuluth Arabic calligraphy border bands framing the grand iwan',
          'Geometric pierced marble jali lattice screens in window alcoves',
          'Subtle translucent marble specular sheen'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the Taj Mahal at the end of a long charbagh garden with a central reflecting pool, symmetrical cypress trees, and red sandstone pathway borders. Set lighting to sunrise (soft pink-orange sky, warm light reflecting off marble and water). Photorealistic high-resolution render.',
        features: [
          'Long monumental Charbagh canal reflecting pool with water ripples',
          'Symmetrical rows of tall Mediterranean Cypress trees lining the walkways',
          'Red Agra sandstone pathway borders and paved stone causeways',
          'Sunrise lighting (soft pink-orange morning sky gradient)',
          'Warm golden-pink sunrise reflections off polished marble and water pool',
          'Atmospheric morning mist & photorealistic render'
        ]
      }
    }
  },
  {
    id: 'red-fort-02',
    name: 'Red Fort (Delhi)',
    category: '🕌 Category 2: Top 3 Visiting Places',
    description: 'Massive Mughal fort with tall crenelated red sandstone walls, monumental Lahori Gate, octagonal bastions, Indian flag mast on the dome, moat, and bright daytime sky.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'red-fort',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D base model of a massive fort with tall crenelated walls, a large central gateway (Lahori Gate style), and multiple domed pavilions along the top.',
        features: [
          'Massive fortified curtain wall massing with battlements',
          'Monumental central Lahori Gate portal structure',
          'Multiple domed rooftop pavilions along ramparts',
          'Defensive octagonal bastion volumes',
          'Pure untextured architectural clay geometry'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Add detailing: octagonal corner towers, jharokha (projecting balcony) windows along the walls, decorative battlements, and layered gateway arches.',
        features: [
          'Two monumental octagonal corner bastions flanking the Lahori Gate',
          'Projecting jharokha balcony oriels with brackets along the ramparts',
          'Tiered decorative crenellations and flame-shaped kanguras',
          'Layered multi-foiled pointed gateway archways and barbican portal',
          'Seven miniature marble chhatris atop the central parapet'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply red sandstone texture across all wall surfaces, with carved geometric and floral relief patterns near the gateway. Add white marble accents on pavilion domes and detailed iron-studded wooden gate texture at the entrance.',
        features: [
          'Deep red Agra sandstone ashlar masonry across all fortification walls',
          'Carved geometric relief bands and lotus friezes near the gateway arch',
          'Pristine white marble accents on chhatri cupolas and pavilion domes',
          'Heavy aged teak wood fortress gate with iron defensive spikes and strap hinges',
          'Sandstone plinth moldings and arrow slit details'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the fort with a moat/garden area in front and a flag mast on the main dome with the Indian flag. Add a busy street/market scene near the entrance for scale. Set lighting to clear bright daytime with blue sky. Photorealistic render.',
        features: [
          'Stone-lined defensive moat and green turf embankment in front of the walls',
          'Tall ceremonial flag mast atop the central gateway dome with the Indian tricolor flag',
          'Historic paved approach causeway with vintage street & bazaar market elements for scale',
          'Clear bright daytime sun with radiant azure blue sky',
          'Crisp architectural shadows highlighting the red sandstone depth',
          'Photorealistic high-resolution fortress render'
        ]
      }
    }
  },
  {
    id: 'hawa-mahal-03',
    name: 'Hawa Mahal (Jaipur)',
    category: '🕌 Category 2: Top 3 Visiting Places',
    description: 'Five-story semi-octagonal palace screen facade in Jaipur pink sandstone with 953 honeycomb jharokha casements, intricate jali screens, rooftop chhatris, and warm afternoon golden sunlight.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'hawa-mahal',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D base model of a five-story semi-octagonal palace facade, honeycomb-like structure, taller than it is wide, with a flat rear side (screen-wall style building).',
        features: [
          'Stepped 5-tier semi-octagonal pyramidal screen facade',
          'Taller than wide crown silhouette (crown of Krishna)',
          'Flat rear elevation (screen-wall architecture)',
          'Honeycomb-like rhythmic volumetric blocks',
          'Pure untextured architectural clay geometry'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Add detailing: 953 small individual jharokha windows arranged in a honeycomb pattern, crowning chhatris along the rooftop, and delicate arch-shaped window frames throughout.',
        features: [
          'Dense tiered honeycomb grid of projecting jharokha bay windows with domed canopies',
          'Delicate cusped arch-shaped window frames and molded corbel brackets',
          'Crowning fluted chhatris and vaulted Bengal-roof pavilions along rooftop',
          'Continuous horizontal decorative stone cornices on every floor',
          'Semi-octagonal projecting oriel facets creating signature air scoop effect'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply pink-red sandstone texture with fine white-painted trim along window borders. Add intricate latticework (jali) texture inside each small window opening for the honeycomb effect.',
        features: [
          'Authentic Jaipur pink-red sandstone texture with natural mineral warmth',
          'Crisp white-painted lime plaster trim outlining all 953 jharokha window architraves',
          'Intricate geometric perforated stone jali (lattice) screens in every window opening',
          'Gilded brass finials atop rooftop cupolas and chhatris',
          'Aged pink city masonry patina with subtle relief highlights'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the Hawa Mahal facing a busy Jaipur street with pink city buildings around it, street vendors, and traffic for scale/context. Set lighting to warm afternoon sunlight highlighting the pink sandstone glow. Photorealistic render.',
        features: [
          'Historic Jaipur Badi Choupad stone street facing the palace facade',
          'Surrounding Pink City heritage shop buildings with terracotta facades',
          'Streetscape context with street lanterns, stalls, and pedestrian causeway for human scale',
          'Warm late-afternoon golden sunlight (Jaipur pink glow)',
          'Rich chiaroscuro shadows cascading across the 953 honeycomb casements',
          'Photorealistic architectural render'
        ]
      }
    }
  },

  // --- CATEGORY 1: HERITAGE MUSEUMS ---
  {
    id: 'national-museum-delhi-02',
    name: 'National Museum (Delhi)',
    description: 'Modern museum featuring curved circular facade, central dome with skylights, radiating exhibition hall wings, sandstone & glass textures, and grand city plaza with fountain.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'national-museum',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D base model of a large modern museum building with a curved circular facade, central dome, and multiple wings extending outward for different exhibition halls. Keep it geometrically simple, no details.',
        features: [
          'Curved circular rotunda facade massing',
          'Monumental central dome envelope',
          'Multiple radiating gallery wings (East, West, South)',
          'Geometric low-poly volumetric blocks',
          'Proportional spatial division of exhibition halls',
          'Pure untextured clay geometry'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Add architectural details to the base model: a grand staircase entrance, tall glass-paneled facade sections, circular skylights on the dome, and interior partition walls dividing exhibition galleries.',
        features: [
          'Monumental grand staircase entrance podium',
          'Tall glass-paneled facade curtain sections with mullions',
          'Concentric circular skylights / oculus rings on dome',
          'Interior partition walls dividing exhibition galleries',
          'Curved portico colonnade and architectural roof parapets'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply a mix of sandstone-beige exterior texture and glass-and-steel texture for modern sections. Add interior textures: polished stone flooring, glass display case models, museum wall panels with placeholder artifact frames, and soft carpet texture in gallery walkways.',
        features: [
          'Sandstone-beige Dholpur exterior masonry texture',
          'Reflective glass & gunmetal steel curtain grid',
          'Polished interior stone marble/granite tile flooring',
          'Glass museum display cases with golden & bronze historical relics',
          'Gallery wall panels with mounted framed artifact exhibits',
          'Plush gallery carpet runners along main walkways'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the museum on an open city plaza with a fountain and manicured lawns in front. Set interior lighting as soft gallery spotlights focused on display areas, combined with natural daylight from the skylights. Exterior in bright daytime lighting. Photorealistic architectural render.',
        features: [
          'Expansive open city plaza with geometric stone pavers',
          'Grand multi-tier circular plaza fountain with animated water jets',
          'Symmetrical manicured lawns & hedge borders',
          'Exterior bright daytime sun & radiant sky lighting',
          'Soft warm interior gallery spotlights on display cases',
          'Natural daylight beams cascading down from dome skylights'
        ]
      }
    }
  },
  {
    id: 'mughal-museum-01',
    name: 'Mughal Museum & Charbagh Complex',
    description: 'Symmetrical Mughal-era museum evolving from low-poly massing to high-detail pietra dura marble and golden-hour charbagh gardens.',
    createdAt: new Date().toISOString(),
    currentPhase: 4,
    archetype: 'mughal',
    phases: {
      1: {
        title: 'Phase 1 — Base Structure (Scratch)',
        prompt: 'Generate a low-poly 3D base model of a Mughal-era museum building. Symmetrical layout, central white marble dome, four corner minarets, rectangular main hall, arched entrance gate. Keep proportions accurate to real Mughal architecture. No textures yet, focus only on geometry and structure.',
        features: [
          'Symmetrical quadrilateral layout',
          'Bulbous central onion dome with lotus finial',
          '4 octagonal corner minarets with tiered balconies',
          'Monumental rectangular main hall',
          'Arched grand entrance portal (Pishtaq profile)',
          'Pure untextured architectural clay geometry'
        ]
      },
      2: {
        title: 'Phase 2 — Architectural Detailing',
        prompt: 'Refine the existing museum model by adding architectural details: pointed arch doorways (iwans), chhatris (small domed kiosks) on the roof edges, decorative parapets, and a raised plinth/platform base. Maintain symmetry throughout.',
        features: [
          'Deep multi-tiered pointed arch iwans with recessed niches',
          '8 ornate Chhatris (4-pillar domed kiosks) flanking rooflines and corners',
          'Decorative crenellated parapets (Kanguras)',
          'Raised plinth platform with molded chamfered cornices',
          'Access grand staircases with monumental balustrades'
        ]
      },
      3: {
        title: 'Phase 3 — Material & Texture (Advanced)',
        prompt: 'Apply realistic white marble texture with subtle grey veining across all exterior surfaces. Add intricate pietra dura (marble inlay) floral patterns around doorways and windows, fine jali (lattice) screen texture on side windows, and Arabic calligraphy border texture around the main arch.',
        features: [
          'Makrana white marble with natural calcite veining & soft specular sheen',
          'Pietra Dura (Parchin Kari) floral inlays with Lapis, Carnelian & Jasper',
          'Fine geometric Jali (pierced marble lattice screens) on window alcoves',
          'Ornate Arabic Thuluth calligraphy bands bordering the central pishtaq',
          'Carved marble dado relief panels on plinth walls'
        ]
      },
      4: {
        title: 'Phase 4 — Environment, Lighting & Final Render',
        prompt: 'Place the finished museum model in a landscaped charbagh-style garden with a long reflecting pool in front, symmetrical cypress trees on both sides, and paved walkways. Set lighting to golden-hour (soft warm sunlight from the east), with a subtle haze for atmosphere. Render at high resolution, photorealistic style.',
        features: [
          'Four-quadrant Charbagh garden with geometric turf beds & red sandstone pavers',
          'Monumental reflecting pool with dynamic ripples & mirror reflections',
          'Symmetrical rows of Mediterranean Cypress trees (Sarv) lining walkways',
          'Golden-hour directional sunlight (warm 24° east sun with long soft shadows)',
          'Atmospheric volumetric haze & sky gradient (warm amber to dusk turquoise)',
          'Water fountain sprayers & marble coping borders'
        ]
      }
    }
  }
];

const EXTRA_HERITAGE_PROJECTS = [
  ['golden-temple-05', 'Golden Temple (Harmandir Sahib)', 'kashi-vishwanath'],
  ['konark-sun-temple-06', 'Konark Sun Temple', 'nagara-temple'],
  ['madurai-meenakshi-07', 'Madurai Meenakshi Temple', 'nagara-temple'],
  ['statue-of-unity-08', 'Statue of Unity', 'red-fort'],
  ['charminar-09', 'Charminar', 'red-fort'],
  ['victoria-memorial-10', 'Victoria Memorial Hall', 'national-museum'],
  ['qutub-minar-11', 'Qutub Minar', 'red-fort'],
  ['jagannath-puri-12', 'Shree Jagannath Temple', 'nagara-temple'],
  ['brihadeeswarar-13', 'Brihadeeswarar Temple', 'nagara-temple'],
  ['lotus-temple-14', 'Lotus Temple', 'national-museum'],
  ['manali-15', 'Manali', 'kedarnath'],
  ['goa-16', 'Goa', 'hawa-mahal'],
  ['amber-fort-17', 'Amber Fort', 'hawa-mahal'],
  ['hawa-mahal-east-18', 'Hawa Mahal East Facade', 'hawa-mahal'],
].map(([id, name, archetype]) => ({
  id,
  name,
  category: 'Indian Heritage 3D Collection',
  description: `${name} interactive architectural model with four progressive detail phases.`,
  createdAt: new Date().toISOString(),
  currentPhase: 4,
  archetype,
  phases: {
    1: {
      title: 'Phase 1 - Base Structure',
      prompt: `Build the recognizable base structure of ${name} with authentic proportions and primary architectural volumes.`,
      features: ['Primary architectural massing', 'Recognizable silhouette', 'Symmetrical base geometry'],
    },
    2: {
      title: 'Phase 2 - Architectural Detailing',
      prompt: `Add the characteristic facade, entrances, towers, domes, arches, and heritage details of ${name}.`,
      features: ['Facade and entrance details', 'Architectural ornament', 'Platform and surrounding structures'],
    },
    3: {
      title: 'Phase 3 - Materials and Textures',
      prompt: `Apply heritage materials, surface texture, carvings, stone, marble, metal, and realistic weathering to ${name}.`,
      features: ['Heritage material treatment', 'Surface texture and relief', 'Authentic color palette'],
    },
    4: {
      title: 'Phase 4 - Environment and Render',
      prompt: `Place ${name} in a culturally appropriate environment with lighting, landscape, and atmospheric depth.`,
      features: ['Site environment', 'Lighting and shadows', 'Final immersive render'],
    },
  },
}));

const ALL_PROJECTS = [...DEFAULT_PROJECTS, ...EXTRA_HERITAGE_PROJECTS];

class ProjectStore {
  constructor() {
    this.projects = this.loadProjects();
    this.activeProjectId = this.projects[0].id;
    this.activePhase = 4; // Default to phase 4 to view complete splendor
    this.viewMode = 'realistic'; // 'realistic' | 'clay' | 'wireframe'
    this.showSymmetry = false; // Symmetry guides off by default for modern museum
    this.lighting = {
      timeOfDay: 'daylight',
      sunAngle: 55,
      hazeDensity: 0.003,
      exposure: 1.15
    };
    this.listeners = new Set();
  }

  loadProjects() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          for (const defProj of ALL_PROJECTS) {
            if (!parsed.some(p => p.id === defProj.id)) {
              parsed.push(defProj);
            }
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load projects from storage:', e);
    }
    return ALL_PROJECTS;
  }

  saveProjects() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects));
    } catch (e) {
      console.warn('Could not save projects to storage:', e);
    }
  }

  getActiveProject() {
    return this.projects.find(p => p.id === this.activeProjectId) || this.projects[0];
  }

  selectProject(id) {
    if (this.projects.some(p => p.id === id)) {
      this.activeProjectId = id;
      const proj = this.getActiveProject();
      this.activePhase = proj.currentPhase || 4;
      this.notify();
    }
  }

  setPhase(phase) {
    const p = Math.max(1, Math.min(4, phase));
    this.activePhase = p;
    const proj = this.getActiveProject();
    if (proj) {
      proj.currentPhase = p;
      this.saveProjects();
    }
    this.notify();
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.notify();
  }

  toggleSymmetry() {
    this.showSymmetry = !this.showSymmetry;
    this.notify();
  }

  setLighting(options) {
    this.lighting = { ...this.lighting, ...options };
    this.notify();
  }

  createNewProject(name, customPrompt, archetype = 'mughal') {
    const newId = 'proj-' + Date.now();
    const newProject = {
      id: newId,
      name: name.trim() || `Project #${this.projects.length + 1}`,
      description: customPrompt.slice(0, 120) + (customPrompt.length > 120 ? '...' : ''),
      createdAt: new Date().toISOString(),
      currentPhase: 4,
      archetype,
      phases: {
        1: {
          title: 'Phase 1 — Base Structure',
          prompt: customPrompt,
          features: ['Custom geometric base massing', 'Proportional symmetry envelope', 'Primary volumes & portals']
        },
        2: {
          title: 'Phase 2 — Architectural Detailing',
          prompt: `Refine ${name} with architectural moldings, arches, kiosks, and elevated podium.`,
          features: ['Deep arched reveals', 'Roof kiosks & parapets', 'Stepped plinth base']
        },
        3: {
          title: 'Phase 3 — Material & Texture',
          prompt: `Apply authentic heritage stone, marble inlays, and geometric screens to ${name}.`,
          features: ['Stone & marble texturing', 'Decorative inlay patterns', 'Perforated jali windows']
        },
        4: {
          title: 'Phase 4 — Environment & Render',
          prompt: `Place ${name} within an atmospheric landscaped garden with water features and golden-hour lighting.`,
          features: ['Reflecting water channels', 'Surrounding landscaped vegetation', 'Golden hour atmospheric lighting']
        }
      }
    };

    this.projects.push(newProject);
    this.saveProjects();
    this.selectProject(newId);
    return newProject;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }
}

export const projectStore = new ProjectStore();
