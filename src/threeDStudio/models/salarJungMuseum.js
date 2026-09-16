import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Salar Jung Museum (Hyderabad) Architectural Model Builder
 * Faithfully implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch): Colonial-era base model with central clock tower, symmetrical two-story wings, grand staircase.
 * Phase 2 — Architectural Detailing: Arched colonnaded corridors, decorative window frames, domed clock tower top, balustraded balconies.
 * Phase 3 — Material & Texture: Cream-and-white colonial texture, wooden window/door detailing, aged brass clock face, wooden display cabinets, crystal chandeliers, antique carpet flooring.
 * Phase 4 — Environment, Lighting & Final Render: Heritage street with palm trees, old street lamps, soft dusk sky, warm chandelier glow streaming through tall windows.
 */
export class SalarJungMuseumBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clean Architectural Clay Massing Materials (Scratch)
    // -------------------------------------------------------------
    this.materials.clayBase = new THREE.MeshStandardMaterial({
      color: 0xe8e5dc,
      roughness: 0.62,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayTower = new THREE.MeshStandardMaterial({
      color: 0xdedad0,
      roughness: 0.58,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayDark = new THREE.MeshStandardMaterial({
      color: 0x33312c,
      roughness: 0.8,
      flatShading: true
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Detailed Materials (Clay Shaded)
    // -------------------------------------------------------------
    this.materials.refinedCreamClay = new THREE.MeshStandardMaterial({
      color: 0xf3eee2,
      roughness: 0.48,
      metalness: 0.06,
      flatShading: false
    });

    this.materials.refinedTrimWhite = new THREE.MeshStandardMaterial({
      color: 0xfcfbfa,
      roughness: 0.4,
      metalness: 0.04
    });

    this.materials.refinedDomeClay = new THREE.MeshStandardMaterial({
      color: 0xe2dacf,
      roughness: 0.45,
      metalness: 0.12
    });

    // -------------------------------------------------------------
    // Phase 3: Advanced Materials & Photorealistic Textures
    // -------------------------------------------------------------
    const colonialCreamTex = textureGenerator.getCreamWhiteColonialTexture();
    const antiqueWoodTex = textureGenerator.getAntiqueWoodTexture();
    const brassClockTex = textureGenerator.getAgedBrassClockTexture();
    const antiqueCarpetTex = textureGenerator.getAntiqueCarpetTexture();
    const heritageCobbleTex = textureGenerator.getHeritageCobblestoneTexture();

    // Cream-and-White Colonial Masonry
    this.materials.texturedColonialCream = new THREE.MeshStandardMaterial({
      map: colonialCreamTex,
      roughness: 0.6,
      metalness: 0.04,
      bumpMap: colonialCreamTex,
      bumpScale: 0.015
    });

    // Pure White Molded Architectural Trim / Columns / Balustrades
    this.materials.whiteTrim = new THREE.MeshStandardMaterial({
      color: 0xfbf9f5,
      roughness: 0.38,
      metalness: 0.05
    });

    // Dark Teak / Rosewood for Windows, Doors & Display Cabinets
    this.materials.antiqueWood = new THREE.MeshStandardMaterial({
      map: antiqueWoodTex,
      roughness: 0.32,
      metalness: 0.1,
      bumpMap: antiqueWoodTex,
      bumpScale: 0.02
    });

    // Aged Antique Brass Clock Face
    this.materials.brassClock = new THREE.MeshStandardMaterial({
      map: brassClockTex,
      roughness: 0.35,
      metalness: 0.85
    });

    // Weathered Copper / Lead Cupola Roof for Clock Tower
    this.materials.cupolaRoof = new THREE.MeshStandardMaterial({
      color: 0x507567, // Verdigris patina copper
      roughness: 0.5,
      metalness: 0.65
    });

    // Antique Carpet Flooring
    this.materials.antiqueCarpet = new THREE.MeshStandardMaterial({
      map: antiqueCarpetTex,
      roughness: 0.85,
      metalness: 0.02
    });

    // Translucent Tall Multi-Pane Window Glass
    this.materials.windowGlass = new THREE.MeshPhysicalMaterial({
      color: 0xffeedd, // Warm tinted for dusk light
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      ior: 1.5
    });

    // Chandelier Crystal & Gold Brass
    this.materials.crystalChandelier = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      roughness: 0.05,
      ior: 1.65,
      transparent: true
    });

    this.materials.chandelierBrass = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.9
    });

    // -------------------------------------------------------------
    // Phase 4: Heritage Street & Landscape Materials
    // -------------------------------------------------------------
    this.materials.heritageStreet = new THREE.MeshStandardMaterial({
      map: heritageCobbleTex,
      roughness: 0.7,
      metalness: 0.08,
      bumpMap: heritageCobbleTex,
      bumpScale: 0.02
    });

    this.materials.curbstone = new THREE.MeshStandardMaterial({
      color: 0x8a847b,
      roughness: 0.75,
      metalness: 0.05
    });

    this.materials.sidewalk = new THREE.MeshStandardMaterial({
      color: 0xb5afa4,
      roughness: 0.65,
      metalness: 0.05
    });

    // Palm Tree Bark & Foliage
    this.materials.palmTrunk = new THREE.MeshStandardMaterial({
      color: 0x5a4838,
      roughness: 0.85,
      metalness: 0.05
    });

    this.materials.palmFrond = new THREE.MeshStandardMaterial({
      color: 0x2e5c26,
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    // Cast-iron Street Lamp Post & Luminous Lantern
    this.materials.castIron = new THREE.MeshStandardMaterial({
      color: 0x181a1d,
      roughness: 0.45,
      metalness: 0.85
    });

    this.materials.lampLantern = new THREE.MeshBasicMaterial({
      color: 0xffcf78 // Glowing lantern
    });
  }

  /**
   * Builds the Salar Jung Museum architectural model according to active phase
   */
  build(phase = 4, viewMode = 'realistic') {
    const root = new THREE.Group();
    root.name = 'SalarJungMuseum';

    const isTextured = (phase >= 3) && (viewMode === 'realistic');
    const isDetailed = phase >= 2;

    // Active material assignment
    const matWall = isTextured ? this.materials.texturedColonialCream : (isDetailed ? this.materials.refinedCreamClay : this.materials.clayBase);
    const matTrim = isTextured ? this.materials.whiteTrim : (isDetailed ? this.materials.refinedTrimWhite : this.materials.clayBase);
    const matWood = isTextured ? this.materials.antiqueWood : matTrim;
    const matTower = isTextured ? this.materials.texturedColonialCream : (isDetailed ? this.materials.refinedCreamClay : this.materials.clayTower);
    const matDome = isTextured ? this.materials.cupolaRoof : (isDetailed ? this.materials.refinedDomeClay : this.materials.clayTower);
    const matPlinth = isTextured ? this.materials.whiteTrim : (isDetailed ? this.materials.refinedTrimWhite : this.materials.clayBase);

    // Dimensions (Colonial Neoclassical proportions)
    const buildingWidth = 84;
    const buildingDepth = 24;
    const groundFloorH = 7.5;
    const upperFloorH = 7.5;
    const totalFacadeH = groundFloorH + upperFloorH;
    const plinthH = isDetailed ? 2.0 : 0.8;

    // =============================================================
    // 1. ELEVATED PODIUM & PLINTH
    // =============================================================
    const plinthGroup = new THREE.Group();
    plinthGroup.name = 'PodiumPlinth';

    const plinthGeo = new THREE.BoxGeometry(buildingWidth + 6, plinthH, buildingDepth + 6);
    const plinthMesh = new THREE.Mesh(plinthGeo, matPlinth);
    plinthMesh.position.y = plinthH / 2;
    plinthMesh.receiveShadow = true;
    plinthMesh.castShadow = true;
    plinthGroup.add(plinthMesh);

    // Plinth molded upper cornice
    if (isDetailed) {
      const plinthCorniceGeo = new THREE.BoxGeometry(buildingWidth + 7.2, 0.4, buildingDepth + 7.2);
      const plinthCornice = new THREE.Mesh(plinthCorniceGeo, matTrim);
      plinthCornice.position.y = plinthH + 0.2;
      plinthCornice.castShadow = true;
      plinthGroup.add(plinthCornice);
    }
    root.add(plinthGroup);

    // =============================================================
    // 2. SYMMETRICAL TWO-STORY WINGS (East & West Exhibition Wings)
    // =============================================================
    const wingsGroup = new THREE.Group();
    wingsGroup.name = 'TwoStoryWings';
    wingsGroup.position.y = plinthH;

    // Symmetrical East & West wing blocks
    const wingWidth = 33;
    const wingDepth = buildingDepth;
    const wingH = totalFacadeH;

    const wingConfigs = [
      { x: -(buildingWidth / 2 - wingWidth / 2), name: 'WestWing' },
      { x: (buildingWidth / 2 - wingWidth / 2), name: 'EastWing' }
    ];

    wingConfigs.forEach(cfg => {
      const wing = new THREE.Group();
      wing.name = cfg.name;
      wing.position.set(cfg.x, 0, 0);

      if (!isDetailed) {
        // Phase 1: Clean low-poly massing blocks
        const mainBlock = new THREE.Mesh(new THREE.BoxGeometry(wingWidth, wingH, wingDepth), matWall);
        mainBlock.position.y = wingH / 2;
        mainBlock.castShadow = true;
        mainBlock.receiveShadow = true;
        wing.add(mainBlock);
      } else {
        // Phase 2-4: Architectural detailing (Arched Colonnade Loggia & Upper Floor Balustrades)
        // Solid core building
        const mainBlock = new THREE.Mesh(new THREE.BoxGeometry(wingWidth, wingH, wingDepth - 4), matWall);
        mainBlock.position.set(0, wingH / 2, -2);
        mainBlock.castShadow = true;
        mainBlock.receiveShadow = true;
        wing.add(mainBlock);

        // Ground Floor Arched Colonnaded Loggia / Corridor
        const numArches = 5;
        const archSpan = wingWidth / numArches;
        const archH = groundFloorH - 0.8;
        const archColR = 0.45;

        for (let a = 0; a <= numArches; a++) {
          const colX = -wingWidth / 2 + a * archSpan;
          // Tuscan classical column
          const colGeo = new THREE.CylinderGeometry(archColR * 0.9, archColR, archH, 16);
          const colMesh = new THREE.Mesh(colGeo, matTrim);
          colMesh.position.set(colX, archH / 2, wingDepth / 2);
          colMesh.castShadow = true;
          wing.add(colMesh);

          // Capital
          const capGeo = new THREE.BoxGeometry(archColR * 2.5, 0.4, archColR * 2.5);
          const capMesh = new THREE.Mesh(capGeo, matTrim);
          capMesh.position.set(colX, archH + 0.2, wingDepth / 2);
          wing.add(capMesh);

          // Round Arches spanning between columns
          if (a < numArches) {
            const archCenter = colX + archSpan / 2;
            const archRingGeo = new THREE.TorusGeometry(archSpan / 2, 0.32, 10, 16, Math.PI);
            const archRing = new THREE.Mesh(archRingGeo, matTrim);
            archRing.position.set(archCenter, archH - 0.2, wingDepth / 2);
            wing.add(archRing);

            // Keystone detail
            const keystoneGeo = new THREE.BoxGeometry(0.5, 0.7, 0.6);
            const keystone = new THREE.Mesh(keystoneGeo, matTrim);
            keystone.position.set(archCenter, archH + archSpan / 2 - 0.1, wingDepth / 2);
            wing.add(keystone);
          }
        }

        // Inter-floor Entablature / Cornice Band
        const stringCourseGeo = new THREE.BoxGeometry(wingWidth + 0.8, 0.6, wingDepth + 1.2);
        const stringCourse = new THREE.Mesh(stringCourseGeo, matTrim);
        stringCourse.position.set(0, groundFloorH, 0);
        stringCourse.castShadow = true;
        wing.add(stringCourse);

        // Upper Floor Balustraded Balcony on the front corridor
        const balconyDepth = 4.0;
        const balustradeH = 1.2;
        const balFloorGeo = new THREE.BoxGeometry(wingWidth, 0.4, balconyDepth);
        const balFloor = new THREE.Mesh(balFloorGeo, matTrim);
        balFloor.position.set(0, groundFloorH + 0.2, wingDepth / 2 - balconyDepth / 2);
        wing.add(balFloor);

        // Molded baluster railing on upper floor
        const numBalusters = 28;
        const balStep = wingWidth / numBalusters;
        for (let b = 0; b <= numBalusters; b++) {
          const bx = -wingWidth / 2 + b * balStep;
          const balusterGeo = new THREE.CylinderGeometry(0.12, 0.14, balustradeH, 10);
          const baluster = new THREE.Mesh(balusterGeo, matTrim);
          baluster.position.set(bx, groundFloorH + 0.4 + balustradeH / 2, wingDepth / 2);
          wing.add(baluster);
        }

        // Handrail capping
        const handrailGeo = new THREE.BoxGeometry(wingWidth, 0.2, 0.35);
        const handrail = new THREE.Mesh(handrailGeo, matTrim);
        handrail.position.set(0, groundFloorH + 0.4 + balustradeH, wingDepth / 2);
        wing.add(handrail);

        // Decorative Window Frames on Upper Floor (5 tall windows with molded architraves)
        for (let w = 0; w < numArches; w++) {
          const winX = -wingWidth / 2 + (w + 0.5) * archSpan;
          const winW = 3.4;
          const winH = 4.8;
          const winY = groundFloorH + 1.2 + winH / 2;

          // Molded frame surround
          const frameGeo = new THREE.BoxGeometry(winW + 0.6, winH + 0.6, 0.3);
          const frame = new THREE.Mesh(frameGeo, matTrim);
          frame.position.set(winX, winY, wingDepth / 2 - balconyDepth + 0.1);
          wing.add(frame);

          // Pedimented window hood / cornice above each window
          const pedimentGeo = new THREE.ConeGeometry(winW * 0.6, 0.8, 4);
          pedimentGeo.rotateY(Math.PI / 4);
          const pediment = new THREE.Mesh(pedimentGeo, matTrim);
          pediment.position.set(winX, winY + winH / 2 + 0.4, wingDepth / 2 - balconyDepth + 0.2);
          wing.add(pediment);

          // Tall wooden multi-pane window sash
          const winMesh = new THREE.Mesh(new THREE.PlaneGeometry(winW, winH), isTextured ? this.materials.windowGlass : matWood);
          winMesh.position.set(winX, winY, wingDepth / 2 - balconyDepth + 0.26);
          wing.add(winMesh);

          // Wood window mullions & muntins (grid)
          const mullionH = new THREE.Mesh(new THREE.BoxGeometry(winW, 0.1, 0.15), matWood);
          mullionH.position.set(winX, winY, wingDepth / 2 - balconyDepth + 0.28);
          wing.add(mullionH);

          const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.1, winH, 0.15), matWood);
          mullionV.position.set(winX, winY, wingDepth / 2 - balconyDepth + 0.28);
          wing.add(mullionV);
        }

        // Roof Classical Entablature & Parapet with Urns
        const roofEntablatureGeo = new THREE.BoxGeometry(wingWidth + 1.0, 1.0, wingDepth + 1.0);
        const roofEntablature = new THREE.Mesh(roofEntablatureGeo, matTrim);
        roofEntablature.position.set(0, wingH + 0.5, 0);
        roofEntablature.castShadow = true;
        wing.add(roofEntablature);

        const roofParapetGeo = new THREE.BoxGeometry(wingWidth, 1.2, 0.5);
        const roofParapet = new THREE.Mesh(roofParapetGeo, matTrim);
        roofParapet.position.set(0, wingH + 1.6, wingDepth / 2);
        wing.add(roofParapet);

        // Classical Urns on roofline corners
        const urnGeo = new THREE.CylinderGeometry(0.35, 0.25, 1.0, 12);
        const urn1 = new THREE.Mesh(urnGeo, matTrim);
        urn1.position.set(-wingWidth / 2 + 0.5, wingH + 2.4, wingDepth / 2);
        wing.add(urn1);
        const urn2 = new THREE.Mesh(urnGeo, matTrim);
        urn2.position.set(wingWidth / 2 - 0.5, wingH + 2.4, wingDepth / 2);
        wing.add(urn2);
      }

      wingsGroup.add(wing);
    });

    root.add(wingsGroup);

    // =============================================================
    // 3. MONUMENTAL CENTRAL CLOCK TOWER
    // =============================================================
    const towerGroup = new THREE.Group();
    towerGroup.name = 'CentralClockTower';
    towerGroup.position.set(0, plinthH, 0);

    const towerW = 18;
    const towerD = buildingDepth + 2;
    const towerMainH = totalFacadeH + 4; // Rises above wings
    const clockStageH = 9;
    const totalTowerH = towerMainH + clockStageH;

    if (!isDetailed) {
      // Phase 1: Simple geometric low-poly clock tower shaft & block
      const towerBaseGeo = new THREE.BoxGeometry(towerW, towerMainH, towerD);
      const towerBase = new THREE.Mesh(towerBaseGeo, matTower);
      towerBase.position.y = towerMainH / 2;
      towerBase.castShadow = true;
      towerBase.receiveShadow = true;
      towerGroup.add(towerBase);

      const clockBoxGeo = new THREE.BoxGeometry(towerW - 2, clockStageH, towerD - 2);
      const clockBox = new THREE.Mesh(clockBoxGeo, matTower);
      clockBox.position.y = towerMainH + clockStageH / 2;
      clockBox.castShadow = true;
      towerGroup.add(clockBox);

      // Low-poly roof pyramid top
      const topGeo = new THREE.ConeGeometry((towerW - 2) * 0.7, 5, 4);
      topGeo.rotateY(Math.PI / 4);
      const topMesh = new THREE.Mesh(topGeo, matTower);
      topMesh.position.y = totalTowerH + 2.5;
      topMesh.castShadow = true;
      towerGroup.add(topMesh);
    } else {
      // Phase 2-4: Architectural Detailing with Domed Cupola & Balustrades
      // 1. Lower Grand Entrance Portal & Central Loggia
      const towerBaseGeo = new THREE.BoxGeometry(towerW, towerMainH, towerD);
      const towerBase = new THREE.Mesh(towerBaseGeo, matTower);
      towerBase.position.y = towerMainH / 2;
      towerBase.castShadow = true;
      towerBase.receiveShadow = true;
      towerGroup.add(towerBase);

      // Monumental Entrance Archway Portal
      const portalArchGeo = new THREE.TorusGeometry(3.6, 0.4, 12, 24, Math.PI);
      const portalArch = new THREE.Mesh(portalArchGeo, matTrim);
      portalArch.position.set(0, 5.0, towerD / 2 + 0.1);
      towerGroup.add(portalArch);

      // Double Teak Wood Paneled Entry Doors (Phase 3 detailing)
      const doorW = 5.6;
      const doorH = 5.2;
      const doorGeo = new THREE.PlaneGeometry(doorW, doorH);
      const doorMesh = new THREE.Mesh(doorGeo, matWood);
      doorMesh.position.set(0, doorH / 2, towerD / 2 + 0.15);
      towerGroup.add(doorMesh);

      // Central Piano Nobile Balcony with Corinthian Pilasters
      const cenBalconyGeo = new THREE.BoxGeometry(towerW - 2, 0.5, 3.2);
      const cenBalcony = new THREE.Mesh(cenBalconyGeo, matTrim);
      cenBalcony.position.set(0, groundFloorH, towerD / 2 + 1.4);
      cenBalcony.castShadow = true;
      towerGroup.add(cenBalcony);

      // Classical balustrade on central balcony
      const cenBalustradeGeo = new THREE.BoxGeometry(towerW - 2, 1.2, 0.3);
      const cenBalustrade = new THREE.Mesh(cenBalustradeGeo, matTrim);
      cenBalustrade.position.set(0, groundFloorH + 0.85, towerD / 2 + 2.8);
      towerGroup.add(cenBalustrade);

      // Molded Cornice dividing tower stages
      const towerCorniceGeo = new THREE.BoxGeometry(towerW + 1.4, 0.8, towerD + 1.4);
      const towerCornice = new THREE.Mesh(towerCorniceGeo, matTrim);
      towerCornice.position.set(0, towerMainH, 0);
      towerCornice.castShadow = true;
      towerGroup.add(towerCornice);

      // 2. Square Clock Stage
      const clockStageW = towerW - 1.5;
      const clockStageD = towerD - 1.5;
      const clockStageGeo = new THREE.BoxGeometry(clockStageW, clockStageH, clockStageD);
      const clockStage = new THREE.Mesh(clockStageGeo, matTower);
      clockStage.position.y = towerMainH + clockStageH / 2;
      clockStage.castShadow = true;
      towerGroup.add(clockStage);

      // Classical Corner Pilasters on Clock Stage
      const pilasterGeo = new THREE.BoxGeometry(1.2, clockStageH, 1.2);
      const pilasters = [
        { x: -clockStageW / 2 + 0.6, z: clockStageD / 2 - 0.6 },
        { x: clockStageW / 2 - 0.6, z: clockStageD / 2 - 0.6 },
        { x: -clockStageW / 2 + 0.6, z: -clockStageD / 2 + 0.6 },
        { x: clockStageW / 2 - 0.6, z: -clockStageD / 2 + 0.6 }
      ];
      pilasters.forEach(p => {
        const pil = new THREE.Mesh(pilasterGeo, matTrim);
        pil.position.set(p.x, towerMainH + clockStageH / 2, p.z);
        towerGroup.add(pil);
      });

      // 3. Aged Brass Clock Face on Front Facade of Tower (Phase 3)
      const clockR = 3.2;
      const clockGeo = new THREE.CircleGeometry(clockR, 36);
      const clockMesh = new THREE.Mesh(clockGeo, isTextured ? this.materials.brassClock : matTrim);
      clockMesh.position.set(0, towerMainH + clockStageH / 2, clockStageD / 2 + 0.12);
      towerGroup.add(clockMesh);

      // Molded classical round clock frame bezel
      const bezelGeo = new THREE.TorusGeometry(clockR + 0.3, 0.4, 12, 36);
      const bezel = new THREE.Mesh(bezelGeo, matTrim);
      bezel.position.set(0, towerMainH + clockStageH / 2, clockStageD / 2 + 0.1);
      towerGroup.add(bezel);

      // 4. Domed Clock Tower Top (Colonial Neoclassical Cupola Dome)
      const domeBaseGeo = new THREE.CylinderGeometry(clockStageW * 0.45, clockStageW * 0.48, 1.2, 32);
      const domeBase = new THREE.Mesh(domeBaseGeo, matTrim);
      domeBase.position.y = totalTowerH + 0.6;
      domeBase.castShadow = true;
      towerGroup.add(domeBase);

      // Domed Bell Cupola / Colonnette Lantern
      const lanternR = clockStageW * 0.42;
      const lanternH = 3.8;
      const numLanternCols = 8;
      for (let lc = 0; lc < numLanternCols; lc++) {
        const phi = (lc / numLanternCols) * Math.PI * 2;
        const lColGeo = new THREE.CylinderGeometry(0.2, 0.25, lanternH, 12);
        const lCol = new THREE.Mesh(lColGeo, matTrim);
        lCol.position.set(Math.cos(phi) * (lanternR - 0.5), totalTowerH + 1.2 + lanternH / 2, Math.sin(phi) * (lanternR - 0.5));
        lCol.castShadow = true;
        towerGroup.add(lCol);
      }

      // Bell inside the open lantern (Historic Salar Jung chiming clock bell)
      const bellGeo = new THREE.ConeGeometry(0.8, 1.4, 16);
      const bellMesh = new THREE.Mesh(bellGeo, isTextured ? this.materials.chandelierBrass : matTrim);
      bellMesh.position.set(0, totalTowerH + 1.2 + lanternH * 0.5, 0);
      towerGroup.add(bellMesh);

      // Hemispherical Copper Patina Cupola Dome
      const cupolaDomeGeo = new THREE.SphereGeometry(lanternR, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const cupolaDome = new THREE.Mesh(cupolaDomeGeo, matDome);
      cupolaDome.position.y = totalTowerH + 1.2 + lanternH;
      cupolaDome.scale.set(1, 1.15, 1);
      cupolaDome.castShadow = true;
      towerGroup.add(cupolaDome);

      // Classical finial / spire apex
      const finialGeo = new THREE.CylinderGeometry(0.08, 0.25, 2.5, 12);
      const finial = new THREE.Mesh(finialGeo, isTextured ? this.materials.chandelierBrass : matTrim);
      finial.position.y = totalTowerH + 1.2 + lanternH + lanternR * 1.15 + 1.25;
      towerGroup.add(finial);
    }

    root.add(towerGroup);

    // =============================================================
    // 4. GRAND FRONT ENTRANCE STAIRCASE
    // =============================================================
    const stairGroup = new THREE.Group();
    stairGroup.name = 'GrandFrontStaircase';

    const numSteps = isDetailed ? 14 : 6;
    const stairW = 22;
    const stairDepth = isDetailed ? 12 : 6;
    const stepH = plinthH / numSteps;
    const stepD = stairDepth / numSteps;

    for (let s = 0; s < numSteps; s++) {
      const w = stairW + s * 0.35;
      const d = stairDepth - s * stepD;
      const stepGeo = new THREE.BoxGeometry(w, stepH, d);
      const stepMesh = new THREE.Mesh(stepGeo, matPlinth);
      stepMesh.position.set(0, (s + 0.5) * stepH, buildingDepth / 2 + 1.0 + (stairDepth - s * stepD) / 2);
      stepMesh.receiveShadow = true;
      stepMesh.castShadow = true;
      stairGroup.add(stepMesh);
    }

    // Monumental balustrade flanking cheek walls
    if (isDetailed) {
      const cheekGeo = new THREE.BoxGeometry(1.4, plinthH + 1.1, stairDepth + 1.6);
      const cheekL = new THREE.Mesh(cheekGeo, matTrim);
      cheekL.position.set(-stairW / 2 - 1.0, (plinthH + 1.1) / 2, buildingDepth / 2 + 1.0 + stairDepth / 2);
      cheekL.castShadow = true;
      stairGroup.add(cheekL);

      const cheekR = new THREE.Mesh(cheekGeo, matTrim);
      cheekR.position.set(stairW / 2 + 1.0, (plinthH + 1.1) / 2, buildingDepth / 2 + 1.0 + stairDepth / 2);
      cheekR.castShadow = true;
      stairGroup.add(cheekR);

      // Classical Stone Pedestals & Urns at foot of stairs
      const basePedGeo = new THREE.BoxGeometry(2.0, 1.4, 2.0);
      const pedL = new THREE.Mesh(basePedGeo, matTrim);
      pedL.position.set(-stairW / 2 - 1.0, 0.7, buildingDepth / 2 + 1.0 + stairDepth + 0.8);
      stairGroup.add(pedL);

      const pedR = new THREE.Mesh(basePedGeo, matTrim);
      pedR.position.set(stairW / 2 + 1.0, 0.7, buildingDepth / 2 + 1.0 + stairDepth + 0.8);
      stairGroup.add(pedR);
    }
    root.add(stairGroup);

    // =============================================================
    // 5. INTERIOR TEXTURES: WOOD DISPLAY CABINETS & CHANDELIERS (Phase 3)
    // =============================================================
    if (phase >= 3) {
      const interiorGroup = new THREE.Group();
      interiorGroup.name = 'InteriorAntiqueGalleries';
      interiorGroup.position.y = plinthH;

      // Antique Carpet Flooring Runner along corridor
      const carpetGeo = new THREE.PlaneGeometry(buildingWidth - 10, 5.5);
      carpetGeo.rotateX(-Math.PI / 2);
      const carpetMesh = new THREE.Mesh(carpetGeo, this.materials.antiqueCarpet);
      carpetMesh.position.set(0, 0.08, 0);
      interiorGroup.add(carpetMesh);

      // Glass-fronted Wooden Display Cabinets
      const cabinetConfigs = [
        { x: -24, z: -4 },
        { x: -12, z: -4 },
        { x: 12, z: -4 },
        { x: 24, z: -4 }
      ];

      cabinetConfigs.forEach((cc, idx) => {
        const cabinet = new THREE.Group();
        cabinet.name = `DisplayCabinet_${idx + 1}`;
        cabinet.position.set(cc.x, 0, cc.z);

        // Teak wood carcass
        const woodCarcassGeo = new THREE.BoxGeometry(4.2, 5.2, 1.4);
        const woodCarcass = new THREE.Mesh(woodCarcassGeo, this.materials.antiqueWood);
        woodCarcass.position.y = 2.6;
        woodCarcass.castShadow = true;
        cabinet.add(woodCarcass);

        // Glass display front pane
        const glassGeo = new THREE.PlaneGeometry(3.6, 3.8);
        const glassMesh = new THREE.Mesh(glassGeo, this.materials.windowGlass);
        glassMesh.position.set(0, 2.8, 0.72);
        cabinet.add(glassMesh);

        // Curios / antique porcelain vase inside
        const vaseGeo = new THREE.CylinderGeometry(0.35, 0.5, 1.2, 12);
        const vase = new THREE.Mesh(vaseGeo, this.materials.chandelierBrass);
        vase.position.set(0, 2.4, 0);
        cabinet.add(vase);

        interiorGroup.add(cabinet);
      });

      // Multi-Tier Hanging Crystal Chandeliers (Illuminated in Phase 3 & 4)
      const chandelierPositions = [-24, 0, 24];
      chandelierPositions.forEach(cx => {
        const chandelier = new THREE.Group();
        chandelier.name = `Chandelier_${cx}`;
        chandelier.position.set(cx, totalFacadeH - 1.8, 2.0);

        // Brass support rod & ceiling canopy
        const rodGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 8);
        const rod = new THREE.Mesh(rodGeo, this.materials.chandelierBrass);
        rod.position.y = 0.9;
        chandelier.add(rod);

        // Golden brass tiers
        const tier1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.1, 8, 24), this.materials.chandelierBrass);
        tier1.rotateX(Math.PI / 2);
        chandelier.add(tier1);

        const tier2 = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.08, 8, 20), this.materials.chandelierBrass);
        tier2.rotateX(Math.PI / 2);
        tier2.position.y = -0.5;
        chandelier.add(tier2);

        // Crystal drops / pendants
        for (let c = 0; c < 12; c++) {
          const a = (c / 12) * Math.PI * 2;
          const dropGeo = new THREE.ConeGeometry(0.12, 0.6, 8);
          const drop = new THREE.Mesh(dropGeo, this.materials.crystalChandelier);
          drop.position.set(Math.cos(a) * 1.6, -0.3, Math.sin(a) * 1.6);
          chandelier.add(drop);
        }

        interiorGroup.add(chandelier);
      });

      root.add(interiorGroup);
    }

    return root;
  }

  /**
   * Phase 4: Heritage Street Setting with Royal Palm Trees and Vintage Street Lamps
   */
  buildHeritageStreetEnvironment() {
    const envGroup = new THREE.Group();
    envGroup.name = 'HeritageStreetEnvironment';

    // 1. Broad Cobblestone Avenue / Street
    const streetW = 220;
    const streetD = 140;
    const streetGeo = new THREE.PlaneGeometry(streetW, streetD);
    streetGeo.rotateX(-Math.PI / 2);
    const streetMesh = new THREE.Mesh(streetGeo, this.materials.heritageStreet);
    streetMesh.receiveShadow = true;
    envGroup.add(streetMesh);

    // 2. Elevated Sidewalk / Heritage Promenade directly in front of the museum
    const sidewalkW = 120;
    const sidewalkD = 32;
    const sidewalkH = 0.4;
    const sidewalkGeo = new THREE.BoxGeometry(sidewalkW, sidewalkH, sidewalkD);
    const sidewalkMesh = new THREE.Mesh(sidewalkGeo, this.materials.sidewalk);
    sidewalkMesh.position.set(0, sidewalkH / 2, 28);
    sidewalkMesh.receiveShadow = true;
    envGroup.add(sidewalkMesh);

    // Granite Curbstone edge
    const curbGeo = new THREE.BoxGeometry(sidewalkW, 0.45, 0.6);
    const curbMesh = new THREE.Mesh(curbGeo, this.materials.curbstone);
    curbMesh.position.set(0, 0.225, 28 + sidewalkD / 2);
    envGroup.add(curbMesh);

    // 3. Symmetrical Rows of Tropical Royal Palm Trees along the Avenue
    const palmConfigs = [
      { x: -48, z: 40 },
      { x: -32, z: 40 },
      { x: 32, z: 40 },
      { x: 48, z: 40 },
      { x: -58, z: 12 },
      { x: 58, z: 12 },
      { x: -52, z: -16 },
      { x: 52, z: -16 }
    ];

    palmConfigs.forEach((pc, idx) => {
      const palm = new THREE.Group();
      palm.name = `RoyalPalm_${idx + 1}`;
      palm.position.set(pc.x, 0, pc.z);

      // Slender ringed trunk curving gently
      const trunkH = 14 + (idx % 3) * 1.5;
      const trunkGeo = new THREE.CylinderGeometry(0.35, 0.55, trunkH, 12);
      const trunk = new THREE.Mesh(trunkGeo, this.materials.palmTrunk);
      trunk.position.y = trunkH / 2;
      trunk.rotation.z = (idx % 2 === 0 ? 1 : -1) * 0.04;
      trunk.castShadow = true;
      palm.add(trunk);

      // Lush Crown of Arching Palm Fronds
      const numFronds = 14;
      for (let f = 0; f < numFronds; f++) {
        const frondAngle = (f / numFronds) * Math.PI * 2;
        const frondGeo = new THREE.PlaneGeometry(1.6, 6.5);
        const frond = new THREE.Mesh(frondGeo, this.materials.palmFrond);
        frond.position.set(0, trunkH, 0);
        frond.rotation.y = frondAngle;
        frond.rotation.x = Math.PI / 3; // Arch downwards
        frond.castShadow = true;
        palm.add(frond);
      }

      envGroup.add(palm);
    });

    // 4. Vintage Victorian Cast-Iron Street Lamps with Glowing Lanterns
    const lampPositions = [
      { x: -38, z: 42 },
      { x: -16, z: 42 },
      { x: 16, z: 42 },
      { x: 38, z: 42 },
      { x: -28, z: 16 },
      { x: 28, z: 16 }
    ];

    lampPositions.forEach((lp, idx) => {
      const lamp = new THREE.Group();
      lamp.name = `VintageStreetLamp_${idx + 1}`;
      lamp.position.set(lp.x, 0, lp.z);

      // Ornate fluted cast-iron column post
      const postH = 6.2;
      const postGeo = new THREE.CylinderGeometry(0.12, 0.22, postH, 10);
      const post = new THREE.Mesh(postGeo, this.materials.castIron);
      post.position.y = postH / 2;
      post.castShadow = true;
      lamp.add(post);

      // Molded plinth base
      const lampBaseGeo = new THREE.CylinderGeometry(0.38, 0.5, 0.8, 8);
      const lampBase = new THREE.Mesh(lampBaseGeo, this.materials.castIron);
      lampBase.position.y = 0.4;
      lamp.add(lampBase);

      // Wrought-iron scroll brackets supporting lantern
      const bracketGeo = new THREE.TorusGeometry(0.4, 0.05, 8, 12, Math.PI);
      const bracket = new THREE.Mesh(bracketGeo, this.materials.castIron);
      bracket.position.set(0, postH, 0);
      lamp.add(bracket);

      // Luminous Glass Lantern Head
      const lanternGeo = new THREE.CylinderGeometry(0.38, 0.24, 0.85, 6);
      const lantern = new THREE.Mesh(lanternGeo, this.materials.lampLantern);
      lantern.position.y = postH + 0.6;
      lamp.add(lantern);

      // Warm local PointLight emitted from lantern
      const lampLight = new THREE.PointLight(0xffb74d, 1.4, 18, 1.8);
      lampLight.position.y = postH + 0.6;
      lampLight.castShadow = false;
      lamp.add(lampLight);

      envGroup.add(lamp);
    });

    // 5. Atmospheric Dusk / Twilight Sky Dome
    const skyGeo = new THREE.SphereGeometry(450, 32, 24);
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 1024;
    skyCanvas.height = 512;
    const sCtx = skyCanvas.getContext('2d');
    const skyGrad = sCtx.createLinearGradient(0, 0, 0, 512);
    skyGrad.addColorStop(0, '#101726'); // Deep dusk zenith navy
    skyGrad.addColorStop(0.4, '#24324f'); // Indigo evening sky
    skyGrad.addColorStop(0.7, '#6b4352'); // Dusty mauve dusk
    skyGrad.addColorStop(0.88, '#b85e45'); // Warm amber horizon sunset glow
    skyGrad.addColorStop(1, '#e38258'); // Low horizon radiance
    sCtx.fillStyle = skyGrad;
    sCtx.fillRect(0, 0, 1024, 512);

    const skyTex = new THREE.CanvasTexture(skyCanvas);
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTex,
      side: THREE.BackSide
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    envGroup.add(skyMesh);

    return envGroup;
  }

  /**
   * Phase 4: Soft Dusk Lighting Setup with Chandelier Interior Glow streaming through windows
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = 'SalarJungLighting';

    if (phase === 4) {
      // -------------------------------------------------------------
      // Soft Sunset / Dusk Directional Light from Low West Sun
      // -------------------------------------------------------------
      const duskSun = new THREE.DirectionalLight(0xff9d6e, 2.2); // Warm coral/amber dusk light
      duskSun.position.set(70, 24, 60); // Low sun angle streaming into facade
      duskSun.castShadow = true;
      duskSun.shadow.mapSize.width = 2048;
      duskSun.shadow.mapSize.height = 2048;
      duskSun.shadow.bias = -0.0004;
      const d = 80;
      duskSun.shadow.camera.left = -d;
      duskSun.shadow.camera.right = d;
      duskSun.shadow.camera.top = d;
      duskSun.shadow.camera.bottom = -d;
      lightGroup.add(duskSun);

      // Cool Twilight Ambient Fill
      const twilightHemi = new THREE.HemisphereLight(0x42587a, 0x221815, 1.1);
      twilightHemi.position.set(0, 60, 0);
      lightGroup.add(twilightHemi);

      // -------------------------------------------------------------
      // Warm Chandelier Interior Glow streaming outward through windows
      // -------------------------------------------------------------
      const interiorLights = [
        { x: -24, y: 11, z: 2 },
        { x: 0, y: 11, z: 2 },
        { x: 24, y: 11, z: 2 },
        { x: 0, y: 22, z: 0 } // Clock Tower Stage
      ];

      interiorLights.forEach(il => {
        const intLight = new THREE.PointLight(0xffaa44, 2.4, 28, 1.5);
        intLight.position.set(il.x, il.y, il.z);
        lightGroup.add(intLight);
      });

      // Spotlights focused on the Central Clock Face on the tower
      const clockSpot = new THREE.SpotLight(0xfffaea, 2.8, 45, Math.PI / 8, 0.3, 1.2);
      clockSpot.position.set(0, 18, 38);
      clockSpot.target.position.set(0, 23.5, 12);
      lightGroup.add(clockSpot);
      lightGroup.add(clockSpot.target);

      // Soft evening atmospheric haze
      scene.fog = new THREE.FogExp2(0x322830, 0.0032);
    } else {
      // Phases 1-3: Clean Studio Lighting
      scene.fog = null;
      scene.background = new THREE.Color(phase === 1 ? 0x18191c : 0x131417);

      const keyLight = new THREE.DirectionalLight(0xfff5ea, phase === 1 ? 2.4 : 2.0);
      keyLight.position.set(45, 65, 55);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      const d = 60;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      lightGroup.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xbad2e8, 1.1);
      fillLight.position.set(-50, 35, -35);
      lightGroup.add(fillLight);

      const hemi = new THREE.HemisphereLight(0xffffff, 0x2d3038, 0.95);
      hemi.position.set(0, 50, 0);
      lightGroup.add(hemi);

      // Studio grid
      const grid = new THREE.GridHelper(120, 60, 0xd4af37, 0x2e323b);
      grid.position.y = -0.01;
      lightGroup.add(grid);
    }

    return lightGroup;
  }
}

export const salarJungMuseumBuilder = new SalarJungMuseumBuilder();
