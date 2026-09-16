import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Taj Mahal (Agra) Architectural Model Builder
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch): Symmetrical mausoleum, central onion dome, 4 corner minarets, square platform.
 * Phase 2 — Architectural Detailing: 4 large iwan facades, 4 domed chhatris, lotus finial, decorative minaret caps.
 * Phase 3 — Material & Texture: Pure Makrana white marble, pietra dura floral inlays in red/green/yellow, calligraphy border.
 * Phase 4 — Environment & Render: Long Charbagh garden with reflecting pool, cypress trees, red sandstone borders, sunrise lighting.
 */
export class TajMahalBuilder {
  constructor() {
    this.materials = {};
    this.waterMaterial = null;
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Pure White Architectural Clay Massing (Scratch)
    // -------------------------------------------------------------
    this.materials.clayBase = new THREE.MeshStandardMaterial({
      color: 0xf3f2ef,
      roughness: 0.65,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayDome = new THREE.MeshStandardMaterial({
      color: 0xf9f8f5,
      roughness: 0.55,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayDark = new THREE.MeshStandardMaterial({
      color: 0x302d28,
      roughness: 0.85,
      flatShading: true
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Detailed Marble Clay
    // -------------------------------------------------------------
    this.materials.refinedMarble = new THREE.MeshStandardMaterial({
      color: 0xfcfbfa,
      roughness: 0.42,
      metalness: 0.06,
      flatShading: false
    });

    this.materials.goldFinial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.92
    });

    // -------------------------------------------------------------
    // Phase 3: Advanced Materials & Photorealistic Textures
    // -------------------------------------------------------------
    const marbleTex = textureGenerator.getWhiteMarbleTexture();
    const pietraDuraTex = textureGenerator.getPietraDuraTexture();
    const calligraphyTex = textureGenerator.getCalligraphyArchTexture();
    const jaliTex = textureGenerator.getJaliLatticeTexture();
    const sandstoneTex = textureGenerator.getRedSandstonePaverTexture();

    this.materials.texturedMarble = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.24,
      metalness: 0.05,
      bumpMap: marbleTex,
      bumpScale: 0.015
    });

    this.materials.texturedPietraDura = new THREE.MeshStandardMaterial({
      map: pietraDuraTex,
      roughness: 0.26,
      metalness: 0.1
    });

    this.materials.texturedCalligraphy = new THREE.MeshStandardMaterial({
      map: calligraphyTex,
      roughness: 0.3,
      metalness: 0.05
    });

    this.materials.texturedJali = new THREE.MeshStandardMaterial({
      map: jaliTex,
      transparent: true,
      alphaTest: 0.4,
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    this.materials.redSandstone = new THREE.MeshStandardMaterial({
      map: sandstoneTex,
      roughness: 0.72,
      metalness: 0.04,
      bumpMap: sandstoneTex,
      bumpScale: 0.02
    });

    // -------------------------------------------------------------
    // Phase 4: Water & Landscape Materials
    // -------------------------------------------------------------
    const waterCanvas = document.createElement('canvas');
    waterCanvas.width = 256;
    waterCanvas.height = 256;
    const wCtx = waterCanvas.getContext('2d');
    wCtx.fillStyle = '#0f3a52';
    wCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 700; i++) {
      wCtx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      wCtx.fillRect(Math.random() * 256, Math.random() * 256, 3, 3);
    }
    const waterBump = new THREE.CanvasTexture(waterCanvas);
    waterBump.wrapS = THREE.RepeatWrapping;
    waterBump.wrapT = THREE.RepeatWrapping;

    this.waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x144d6a,
      roughness: 0.08,
      metalness: 0.35,
      bumpMap: waterBump,
      bumpScale: 0.04,
      transparent: true,
      opacity: 0.92
    });

    this.materials.cypressFoliage = new THREE.MeshStandardMaterial({
      color: 0x193822,
      roughness: 0.8,
      metalness: 0.02
    });

    this.materials.turfGrass = new THREE.MeshStandardMaterial({
      color: 0x2e5c26,
      roughness: 0.85,
      metalness: 0.02
    });
  }

  /**
   * Builds the Taj Mahal model according to active phase
   */
  build(phase = 4, viewMode = 'realistic') {
    const root = new THREE.Group();
    root.name = 'TajMahal';

    const isTextured = (phase >= 3) && (viewMode === 'realistic');
    const isDetailed = phase >= 2;

    const matMausoleum = isTextured ? this.materials.texturedMarble : (isDetailed ? this.materials.refinedMarble : this.materials.clayBase);
    const matDome = isTextured ? this.materials.texturedMarble : (isDetailed ? this.materials.refinedMarble : this.materials.clayDome);
    const matGold = this.materials.goldFinial;
    const matPlinth = isTextured ? this.materials.texturedMarble : (isDetailed ? this.materials.refinedMarble : this.materials.clayBase);
    const matPietra = isTextured ? this.materials.texturedPietraDura : matMausoleum;
    const matCalligraphy = isTextured ? this.materials.texturedCalligraphy : matMausoleum;
    const matJali = isTextured ? this.materials.texturedJali : this.materials.clayDark;

    // Dimensions
    const plinthW = 56;
    const plinthH = isDetailed ? 3.6 : 1.2;
    const tombW = 32;
    const tombH = 22;
    const domeR = 9.2;
    const minaretDist = 24;
    const minaretH = 34;

    // =============================================================
    // 1. SQUARE PLATFORM BASE (CHABUTRA)
    // =============================================================
    const plinthGroup = new THREE.Group();
    plinthGroup.name = 'SquarePlinth';

    const plinthGeo = new THREE.BoxGeometry(plinthW, plinthH, plinthW);
    const plinthMesh = new THREE.Mesh(plinthGeo, matPlinth);
    plinthMesh.position.y = plinthH / 2;
    plinthMesh.castShadow = true;
    plinthMesh.receiveShadow = true;
    plinthGroup.add(plinthMesh);

    if (isDetailed) {
      // Molded plinth trim & front steps
      const cornice = new THREE.Mesh(new THREE.BoxGeometry(plinthW + 1.2, 0.4, plinthW + 1.2), matMausoleum);
      cornice.position.y = plinthH + 0.2;
      plinthGroup.add(cornice);

      // Central access steps
      const numSteps = 12;
      const stairW = 10;
      const stairRun = 6;
      for (let s = 0; s < numSteps; s++) {
        const sh = plinthH / numSteps;
        const sd = stairRun / numSteps;
        const step = new THREE.Mesh(new THREE.BoxGeometry(stairW, sh, stairRun - s * sd), matMausoleum);
        step.position.set(0, (s + 0.5) * sh, plinthW / 2 + (stairRun - s * sd) / 2);
        step.receiveShadow = true;
        plinthGroup.add(step);
      }
    }
    root.add(plinthGroup);

    // =============================================================
    // 2. MAIN MAUSOLEUM STRUCTURE & 4 GRAND IWANS
    // =============================================================
    const tombGroup = new THREE.Group();
    tombGroup.name = 'MausoleumStructure';
    tombGroup.position.y = plinthH;

    if (!isDetailed) {
      // Phase 1: Simple symmetrical quadrilateral mausoleum block
      const mainGeo = new THREE.BoxGeometry(tombW, tombH, tombW);
      const mainMesh = new THREE.Mesh(mainGeo, matMausoleum);
      mainMesh.position.y = tombH / 2;
      mainMesh.castShadow = true;
      mainMesh.receiveShadow = true;
      tombGroup.add(mainMesh);
    } else {
      // Phase 2-4: Chamfered octagonal plan with 4 monumental iwan portals (N, S, E, W)
      const coreGeo = new THREE.BoxGeometry(tombW, tombH, tombW);
      const coreMesh = new THREE.Mesh(coreGeo, matMausoleum);
      coreMesh.position.y = tombH / 2;
      coreMesh.castShadow = true;
      coreMesh.receiveShadow = true;
      tombGroup.add(coreMesh);

      // 4 Monumental Iwan Portals (Pishtaq) on all four cardinal sides
      const iwanConfigs = [
        { rotY: 0, z: tombW / 2 + 0.1 }, // Front (South)
        { rotY: Math.PI, z: -tombW / 2 - 0.1 }, // Rear (North/Yamuna side)
        { rotY: Math.PI / 2, z: tombW / 2 + 0.1, isX: true }, // East
        { rotY: -Math.PI / 2, z: -tombW / 2 - 0.1, isX: true } // West
      ];

      iwanConfigs.forEach(cfg => {
        const portal = new THREE.Group();
        portal.rotation.y = cfg.rotY;

        // Monumental projecting Pishtaq frame
        const pishtaqW = 16;
        const pishtaqH = tombH + 2.5; // Extends above parapet
        const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(pishtaqW, pishtaqH, 1.4), matMausoleum);
        frameMesh.position.set(0, pishtaqH / 2, tombW / 2 + 0.6);
        frameMesh.castShadow = true;
        portal.add(frameMesh);

        // Calligraphy border band around grand arch
        const calMesh = new THREE.Mesh(new THREE.PlaneGeometry(pishtaqW - 1.2, pishtaqH - 1.2), matCalligraphy);
        calMesh.position.set(0, pishtaqH / 2, tombW / 2 + 1.32);
        portal.add(calMesh);

        // Recessed deep pointed arch niche
        const nicheW = 10;
        const nicheH = 15;
        const archNiche = new THREE.Mesh(new THREE.BoxGeometry(nicheW, nicheH, 4), this.materials.clayDark);
        archNiche.position.set(0, nicheH / 2 + 1, tombW / 2 - 0.5);
        portal.add(archNiche);

        // Pietra Dura floral spandrel panels flanking the pointed arch
        const spandrelMesh = new THREE.Mesh(new THREE.PlaneGeometry(nicheW + 3, 4), matPietra);
        spandrelMesh.position.set(0, nicheH + 1.5, tombW / 2 + 1.34);
        portal.add(spandrelMesh);

        // Inner marble jali screen door
        const jaliDoor = new THREE.Mesh(new THREE.PlaneGeometry(5, 7.5), matJali);
        jaliDoor.position.set(0, 3.8, tombW / 2 - 2.2);
        portal.add(jaliDoor);

        tombGroup.add(portal);
      });

      // Parapet cresting Kanguras along roofline
      const parapetGeo = new THREE.BoxGeometry(tombW + 0.6, 1.2, tombW + 0.6);
      const parapet = new THREE.Mesh(parapetGeo, matMausoleum);
      parapet.position.y = tombH + 0.6;
      tombGroup.add(parapet);
    }
    root.add(tombGroup);

    // =============================================================
    // 3. CENTRAL BULBOUS ONION DOME & 4 CHHATRIS
    // =============================================================
    const domeGroup = new THREE.Group();
    domeGroup.name = 'CentralDomeGroup';
    domeGroup.position.y = plinthH + tombH;

    // High cylindrical drum beneath the dome
    const drumR = domeR * 0.95;
    const drumH = isDetailed ? 6.5 : 3.0;
    const drumGeo = new THREE.CylinderGeometry(drumR, drumR, drumH, 48);
    const drumMesh = new THREE.Mesh(drumGeo, matMausoleum);
    drumMesh.position.y = drumH / 2;
    drumMesh.castShadow = true;
    domeGroup.add(drumMesh);

    // Bulbous Onion Dome Profile
    const bulbousH = 15;
    const domeGeo = new THREE.SphereGeometry(domeR, 48, 32, 0, Math.PI * 2, 0, Math.PI / 1.7);
    const domeMesh = new THREE.Mesh(domeGeo, matDome);
    domeMesh.position.y = drumH + 1.0;
    domeMesh.scale.set(1.08, 1.35, 1.08); // Elegant bulbous Mughal swelling
    domeMesh.castShadow = true;
    domeGroup.add(domeMesh);

    // Gilded Lotus Finial at apex
    if (isDetailed) {
      const finialGroup = new THREE.Group();
      finialGroup.position.y = drumH + bulbousH + 0.5;

      const baseCone = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.0, 16), matGold);
      finialGroup.add(baseCone);

      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.4, 4.2, 16), matGold);
      shaft.position.y = 2.4;
      finialGroup.add(shaft);

      const finialOrb = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), matGold);
      finialOrb.position.y = 4.2;
      finialGroup.add(finialOrb);

      const crescentTip = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 12, 16, Math.PI * 1.3), matGold);
      crescentTip.position.y = 4.8;
      crescentTip.rotateZ(Math.PI / 4);
      finialGroup.add(crescentTip);

      domeGroup.add(finialGroup);

      // 4 Domed Chhatris (Kiosks) surrounding the main dome
      const chhatriDist = 11.5;
      const chhatriR = 2.4;
      const chhatriH = 5.2;

      const chhatriCorners = [
        { x: -chhatriDist, z: -chhatriDist },
        { x: chhatriDist, z: -chhatriDist },
        { x: -chhatriDist, z: chhatriDist },
        { x: chhatriDist, z: chhatriDist }
      ];

      chhatriCorners.forEach((cc, idx) => {
        const chhatri = new THREE.Group();
        chhatri.name = `Chhatri_${idx + 1}`;
        chhatri.position.set(cc.x, 0, cc.z);

        // 8 slender columns
        for (let c = 0; c < 8; c++) {
          const ca = (c / 8) * Math.PI * 2;
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, chhatriH, 12), matMausoleum);
          col.position.set(Math.cos(ca) * chhatriR, chhatriH / 2, Math.sin(ca) * chhatriR);
          col.castShadow = true;
          chhatri.add(col);
        }

        // Chhatri dome cupola
        const cDome = new THREE.Mesh(new THREE.SphereGeometry(chhatriR * 1.1, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), matDome);
        cDome.position.y = chhatriH;
        cDome.scale.set(1, 1.25, 1);
        cDome.castShadow = true;
        chhatri.add(cDome);

        // Chhatri small gold finial
        const cFinial = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.18, 1.4, 8), matGold);
        cFinial.position.y = chhatriH + chhatriR * 1.25 + 0.7;
        chhatri.add(cFinial);

        domeGroup.add(chhatri);
      });
    }
    root.add(domeGroup);

    // =============================================================
    // 4. FOUR CORNER MINARETS WITH 3 TIERS & CHHATRI CAPS
    // =============================================================
    const minaretsGroup = new THREE.Group();
    minaretsGroup.name = 'FourMinarets';
    minaretsGroup.position.y = plinthH;

    const minaretCorners = [
      { x: -minaretDist, z: -minaretDist },
      { x: minaretDist, z: -minaretDist },
      { x: -minaretDist, z: minaretDist },
      { x: minaretDist, z: minaretDist }
    ];

    minaretCorners.forEach((mc, idx) => {
      const minaret = new THREE.Group();
      minaret.name = `Minaret_${idx + 1}`;
      minaret.position.set(mc.x, 0, mc.z);

      if (!isDetailed) {
        // Phase 1: Simple low-poly tapering cylinder shaft
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.2, minaretH, 16), matMausoleum);
        shaft.position.y = minaretH / 2;
        shaft.castShadow = true;
        minaret.add(shaft);
      } else {
        // Phase 2-4: 3-tier octagonal shaft with 3 cantilevered balconies & crowning chhatri
        const tierH = minaretH / 3;

        // Tier 1 (Lower)
        const t1 = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.3, tierH, 24), matMausoleum);
        t1.position.y = tierH / 2;
        t1.castShadow = true;
        minaret.add(t1);

        // Balcony 1
        const b1 = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.0, 0.5, 24), matMausoleum);
        b1.position.y = tierH;
        minaret.add(b1);

        // Tier 2 (Middle)
        const t2 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.9, tierH, 24), matMausoleum);
        t2.position.y = tierH + tierH / 2;
        t2.castShadow = true;
        minaret.add(t2);

        // Balcony 2
        const b2 = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 1.7, 0.5, 24), matMausoleum);
        b2.position.y = tierH * 2;
        minaret.add(b2);

        // Tier 3 (Upper)
        const t3 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, tierH, 24), matMausoleum);
        t3.position.y = tierH * 2 + tierH / 2;
        t3.castShadow = true;
        minaret.add(t3);

        // Balcony 3
        const b3 = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.5, 0.5, 24), matMausoleum);
        b3.position.y = minaretH;
        minaret.add(b3);

        // Crowning Chhatri Pavilion Cap
        const mChhatriR = 1.6;
        const mChhatriH = 3.2;
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2;
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, mChhatriH, 8), matMausoleum);
          col.position.set(Math.cos(a) * mChhatriR, minaretH + mChhatriH / 2, Math.sin(a) * mChhatriR);
          minaret.add(col);
        }

        const mDome = new THREE.Mesh(new THREE.SphereGeometry(mChhatriR * 1.15, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), matDome);
        mDome.position.y = minaretH + mChhatriH;
        mDome.scale.set(1, 1.3, 1);
        minaret.add(mDome);

        const mFinial = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.15, 1.2, 8), matGold);
        mFinial.position.y = minaretH + mChhatriH + mChhatriR * 1.3 + 0.6;
        minaret.add(mFinial);
      }

      minaretsGroup.add(minaret);
    });
    root.add(minaretsGroup);

    return root;
  }

  /**
   * Phase 4: Long Charbagh Garden with Central Reflecting Pool, Cypress Trees, and Red Sandstone Borders
   */
  buildCharbaghEnvironment() {
    const envGroup = new THREE.Group();
    envGroup.name = 'TajMahalCharbaghEnvironment';

    // 1. Broad Red Sandstone Plaza & Terraced Ground
    const gardenW = 160;
    const gardenD = 240;
    const groundGeo = new THREE.PlaneGeometry(gardenW, gardenD);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMesh = new THREE.Mesh(groundGeo, this.materials.redSandstone);
    groundMesh.receiveShadow = true;
    envGroup.add(groundMesh);

    // 2. Long Central Reflecting Pool (Axial Water Canal)
    const poolW = 16;
    const poolD = 180;
    const poolH = 0.6;

    // Raised marble coping border around water channel
    const copingL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, poolD), this.materials.texturedMarble);
    copingL.position.set(-poolW / 2, 0.2, 70);
    envGroup.add(copingL);

    const copingR = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, poolD), this.materials.texturedMarble);
    copingR.position.set(poolW / 2, 0.2, 70);
    envGroup.add(copingR);

    // Water surface reflecting the Taj Mahal
    const waterGeo = new THREE.PlaneGeometry(poolW - 0.8, poolD);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMesh = new THREE.Mesh(waterGeo, this.waterMaterial);
    waterMesh.position.set(0, 0.15, 70);
    envGroup.add(waterMesh);

    // Central Hauz (Lotus Pool Platform at intersection)
    const hauzW = 28;
    const hauzMesh = new THREE.Mesh(new THREE.BoxGeometry(hauzW, 0.6, hauzW), this.materials.texturedMarble);
    hauzMesh.position.set(0, 0.3, 70);
    envGroup.add(hauzMesh);

    const hauzWater = new THREE.Mesh(new THREE.PlaneGeometry(hauzW - 2, hauzW - 2), this.waterMaterial);
    hauzWater.rotateX(-Math.PI / 2);
    hauzWater.position.set(0, 0.62, 70);
    envGroup.add(hauzWater);

    // 3. Symmetrical Rows of Tall Mediterranean Cypress Trees (Sarv)
    const cypressTreeConfigs = [];
    for (let z = 0; z <= 150; z += 18) {
      cypressTreeConfigs.push({ x: -14, z: z });
      cypressTreeConfigs.push({ x: 14, z: z });
    }

    cypressTreeConfigs.forEach((cc, idx) => {
      const tree = new THREE.Group();
      tree.name = `Cypress_${idx + 1}`;
      tree.position.set(cc.x, 0, cc.z);

      // Slender tall conical foliage (classic Italian/Mughal cypress)
      const treeH = 14 + (idx % 3) * 1.5;
      const coneGeo = new THREE.ConeGeometry(1.6, treeH, 12);
      const cone = new THREE.Mesh(coneGeo, this.materials.cypressFoliage);
      cone.position.y = treeH / 2;
      cone.castShadow = true;
      tree.add(cone);

      envGroup.add(tree);
    });

    // 4. Symmetrical Lawn Parterres (Geometric Mughal turf beds)
    const lawnConfigs = [
      { x: -44, z: 70, w: 42, d: 160 },
      { x: 44, z: 70, w: 42, d: 160 }
    ];

    lawnConfigs.forEach(lc => {
      const lawnMesh = new THREE.Mesh(new THREE.PlaneGeometry(lc.w, lc.d), this.materials.turfGrass);
      lawnMesh.rotateX(-Math.PI / 2);
      lawnMesh.position.set(lc.x, 0.05, lc.z);
      lawnMesh.receiveShadow = true;
      envGroup.add(lawnMesh);
    });

    // 5. Sunrise Sky Dome (Soft pink-orange morning radiance)
    const skyGeo = new THREE.SphereGeometry(450, 32, 24);
    const skyTex = textureGenerator.getSunriseSkyTexture();
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTex,
      side: THREE.BackSide
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    envGroup.add(skyMesh);

    return envGroup;
  }

  /**
   * Phase 4: Sunrise Lighting Setup (Soft pink-orange morning sky, warm golden reflections)
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = 'TajMahalLighting';

    if (phase === 4) {
      // Warm low-angle sunrise sun from east (angle ~18°, soft pink-gold 0xffb592)
      const sunLight = new THREE.DirectionalLight(0xffbe99, 2.8);
      sunLight.position.set(75, 28, 65);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      sunLight.shadow.bias = -0.0003;
      const d = 90;
      sunLight.shadow.camera.left = -d;
      sunLight.shadow.camera.right = d;
      sunLight.shadow.camera.top = d;
      sunLight.shadow.camera.bottom = -d;
      lightGroup.add(sunLight);

      // Soft ambient morning twilight fill
      const hemiLight = new THREE.HemisphereLight(0xffd5bf, 0x384a60, 1.2);
      hemiLight.position.set(0, 80, 0);
      lightGroup.add(hemiLight);

      // Back fill from west sky
      const backFill = new THREE.DirectionalLight(0x768ca8, 0.85);
      backFill.position.set(-60, 40, -50);
      lightGroup.add(backFill);

      // Atmospheric morning river mist
      scene.fog = new THREE.FogExp2(0xd6a89c, 0.0025);
    } else {
      // Phases 1-3: Studio Lighting
      scene.fog = null;
      scene.background = new THREE.Color(phase === 1 ? 0x18191c : 0x131417);

      const keyLight = new THREE.DirectionalLight(0xfff5ea, phase === 1 ? 2.4 : 2.0);
      keyLight.position.set(45, 65, 55);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
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

      const grid = new THREE.GridHelper(120, 60, 0xd4af37, 0x2e323b);
      grid.position.y = -0.01;
      lightGroup.add(grid);
    }

    return lightGroup;
  }
}

export const tajMahalBuilder = new TajMahalBuilder();
