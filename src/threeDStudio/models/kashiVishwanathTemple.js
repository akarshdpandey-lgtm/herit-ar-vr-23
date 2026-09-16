import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Kashi Vishwanath Temple (Varanasi, Uttar Pradesh) Architectural Model Builder
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   Distinctive golden dome and shikhara spire, multiple smaller domes,
 *   central sanctum, entrance gateway, compact temple layout.
 * Phase 2 — Architectural Detailing:
 *   Carved stone entrance arches, traditional shikhara and dome forms,
 *   ornamental facade patterns, temple courtyard, surrounding heritage pavilions.
 * Phase 3 — Material & Texture (Advanced):
 *   Realistic golden metal textures on main dome and metallic spires,
 *   stone, plaster, subtle weathering, and authentic golden specular sheen.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Varanasi heritage environment (Kashi Vishwanath Corridor), stone pathways,
 *   warm morning sunlight, subtle Ganges river atmospheric haze. Photorealistic render.
 */
export class KashiVishwanathBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay Massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.clayGold = new THREE.MeshStandardMaterial({
      color: 0xcc9922,
      roughness: 0.5,
      metalness: 0.6,
      flatShading: true,
      side: THREE.DoubleSide
    });

    this.materials.clayStone = new THREE.MeshStandardMaterial({
      color: 0xa8937d,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true,
      side: THREE.DoubleSide
    });

    this.materials.clayPlinth = new THREE.MeshStandardMaterial({
      color: 0x8a745d,
      roughness: 0.8,
      flatShading: true,
      side: THREE.DoubleSide
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Clay
    // -------------------------------------------------------------
    this.materials.refinedGold = new THREE.MeshStandardMaterial({
      color: 0xdfad22,
      roughness: 0.28,
      metalness: 0.9,
      flatShading: false,
      side: THREE.DoubleSide
    });

    this.materials.refinedStone = new THREE.MeshStandardMaterial({
      color: 0xbea992,
      roughness: 0.58,
      metalness: 0.05,
      flatShading: false,
      side: THREE.DoubleSide
    });

    // -------------------------------------------------------------
    // Phase 3: Advanced 24K Golden Dome Textures & Chunar Stone
    // -------------------------------------------------------------
    const goldTex = textureGenerator.getKashiGoldenDomeTexture();
    const stoneTex = textureGenerator.getKhajurahoCarvedSandstoneTexture();

    this.materials.texturedGoldenDome = new THREE.MeshStandardMaterial({
      map: goldTex,
      roughness: 0.22,
      metalness: 0.92,
      bumpMap: goldTex,
      bumpScale: 0.02,
      side: THREE.DoubleSide
    });

    this.materials.texturedChunarStone = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.65,
      metalness: 0.05,
      bumpMap: stoneTex,
      bumpScale: 0.03,
      side: THREE.DoubleSide
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `KashiVishwanath_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matGold = isTextured
      ? this.materials.texturedGoldenDome
      : (isDetail ? this.materials.refinedGold : this.materials.clayGold);

    const matStone = isTextured
      ? this.materials.texturedChunarStone
      : (isDetail ? this.materials.refinedStone : this.materials.clayStone);

    const matPlinth = isTextured
      ? this.materials.texturedChunarStone
      : (isDetail ? this.materials.refinedStone : this.materials.clayPlinth);

    // -------------------------------------------------------------
    // 1. TEMPLE PODIUM & RAISED PLATFORM
    // -------------------------------------------------------------
    const plinthW = 42;
    const plinthH = 2.4;
    const plinthD = 52;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(plinthW, plinthH, plinthD), matPlinth);
    plinth.position.set(0, plinthH / 2, 0);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    root.add(plinth);

    const floorY = plinthH; // 2.4m
    const wallThick = 1.2;

    // -------------------------------------------------------------
    // 2. HOLLOW WALKABLE SANCTUM & MONUMENTAL SWARNA SHIKHARA
    // -------------------------------------------------------------
    const sanctumW = 15;
    const sanctumH = 12;
    const sanctumD = 15;
    const sanctumZ = -8;

    // Hollow Sanctum Walls
    const sWallL = new THREE.Mesh(new THREE.BoxGeometry(wallThick, sanctumH, sanctumD), matStone);
    sWallL.position.set(-sanctumW / 2 + wallThick / 2, floorY + sanctumH / 2, sanctumZ);
    sWallL.castShadow = true;
    sWallL.receiveShadow = true;
    root.add(sWallL);

    const sWallR = new THREE.Mesh(new THREE.BoxGeometry(wallThick, sanctumH, sanctumD), matStone);
    sWallR.position.set(sanctumW / 2 - wallThick / 2, floorY + sanctumH / 2, sanctumZ);
    sWallR.castShadow = true;
    sWallR.receiveShadow = true;
    root.add(sWallR);

    const sWallBack = new THREE.Mesh(new THREE.BoxGeometry(sanctumW, sanctumH, wallThick), matStone);
    sWallBack.position.set(0, floorY + sanctumH / 2, sanctumZ - sanctumD / 2 + wallThick / 2);
    sWallBack.castShadow = true;
    sWallBack.receiveShadow = true;
    root.add(sWallBack);

    // Front Wall with Open Archway to Mandapa
    const sDoorW = 5.2;
    const sDoorH = 7.0;
    const sFrontSideW = (sanctumW - sDoorW) / 2;

    const sFrontL = new THREE.Mesh(new THREE.BoxGeometry(sFrontSideW, sanctumH, wallThick), matStone);
    sFrontL.position.set(-sanctumW / 2 + sFrontSideW / 2, floorY + sanctumH / 2, sanctumZ + sanctumD / 2 - wallThick / 2);
    sFrontL.castShadow = true;
    root.add(sFrontL);

    const sFrontR = new THREE.Mesh(new THREE.BoxGeometry(sFrontSideW, sanctumH, wallThick), matStone);
    sFrontR.position.set(sanctumW / 2 - sFrontSideW / 2, floorY + sanctumH / 2, sanctumZ + sanctumD / 2 - wallThick / 2);
    sFrontR.castShadow = true;
    root.add(sFrontR);

    const sLintel = new THREE.Mesh(new THREE.BoxGeometry(sDoorW, sanctumH - sDoorH, wallThick), matStone);
    sLintel.position.set(0, floorY + sDoorH + (sanctumH - sDoorH) / 2, sanctumZ + sanctumD / 2 - wallThick / 2);
    sLintel.castShadow = true;
    root.add(sLintel);

    // Monumental 15.5m Golden Shikhara Spire (famous gold plated tower donated by Maharaja Ranjit Singh)
    const spireH = 22;
    const spireGeo = this.createGoldenSpireGeometry(12, spireH, isPhase1 ? 6 : 24);
    const goldenSpire = new THREE.Mesh(spireGeo, matGold);
    goldenSpire.position.set(0, floorY + sanctumH, sanctumZ);
    goldenSpire.castShadow = true;
    goldenSpire.receiveShadow = true;
    root.add(goldenSpire);

    // Golden Amalaka & Kalasha
    const amalaka = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.8, 1.6, isPhase1 ? 8 : 24),
      matGold
    );
    amalaka.position.set(0, floorY + sanctumH + spireH + 0.8, sanctumZ);
    amalaka.castShadow = true;
    root.add(amalaka);

    const kalasha = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 1.2, 3.2, 12),
      matGold
    );
    kalasha.position.set(0, floorY + sanctumH + spireH + 1.6 + 1.6, sanctumZ);
    kalasha.castShadow = true;
    root.add(kalasha);

    // -------------------------------------------------------------
    // SANCTUM INTERIOR: KASHI VISHVESHWARA SILVER JALDHARI & LINGAM
    // -------------------------------------------------------------
    const sanctumGroup = new THREE.Group();
    sanctumGroup.name = 'Kashi_Sanctum_Interior';

    // Square Silver Jaldhari Reservoir Basin
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.18, metalness: 0.9 });
    const jaldhari = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.4, 4.2), silverMat);
    jaldhari.position.set(0, floorY + 0.2, sanctumZ);
    sanctumGroup.add(jaldhari);

    // Sacred Shiva Lingam in center of silver basin
    const lingamMat = new THREE.MeshStandardMaterial({ color: 0x18191c, roughness: 0.3, metalness: 0.1 });
    const lingam = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, 1.5, 20), lingamMat);
    lingam.position.set(0, floorY + 0.4 + 0.75, sanctumZ);
    sanctumGroup.add(lingam);

    // Gold Dome Interior Ceiling Glow
    const domeCeiling = new THREE.Mesh(new THREE.SphereGeometry(sanctumW * 0.45, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), matGold);
    domeCeiling.position.set(0, floorY + sanctumH - 0.2, sanctumZ);
    domeCeiling.rotation.x = Math.PI;
    sanctumGroup.add(domeCeiling);

    // Hanging Brass Bells & Lamps
    for (const bx of [-2.2, 2.2]) {
      const bellChain = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.0, 8), matGold);
      bellChain.position.set(bx, floorY + sanctumH - 1.5, sanctumZ + 1.2);
      sanctumGroup.add(bellChain);

      const bell = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.55, 12), matGold);
      bell.position.set(bx, floorY + sanctumH - 3.0, sanctumZ + 1.2);
      bell.rotation.x = Math.PI;
      sanctumGroup.add(bell);

      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.35, 1.2, 12), matGold);
      lamp.position.set(bx, floorY + 0.6, sanctumZ - 1.5);
      sanctumGroup.add(lamp);

      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd060 }));
      flame.position.set(bx, floorY + 1.25, sanctumZ - 1.5);
      sanctumGroup.add(flame);
    }

    const kashiLight = new THREE.PointLight(0xffb74d, 3.8, 22);
    kashiLight.position.set(0, floorY + 3.5, sanctumZ);
    sanctumGroup.add(kashiLight);

    root.add(sanctumGroup);

    // -------------------------------------------------------------
    // 3. MULTIPLE GOLDEN CUPOLAS & SUBSIDIARY DOMES
    // -------------------------------------------------------------
    // Secondary Golden Dome (flanking south shikhara)
    const domePositions = [
      { x: -12, z: -8, r: 4.2, h: 14 },
      { x: 12,  z: -8, r: 4.2, h: 14 }
    ];

    domePositions.forEach((dp) => {
      const subSpire = new THREE.Mesh(
        this.createGoldenSpireGeometry(dp.r * 2, dp.h, isPhase1 ? 6 : 16),
        matGold
      );
      subSpire.position.set(dp.x, floorY + 10, dp.z);
      subSpire.castShadow = true;
      root.add(subSpire);

      const subAmalaka = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.8, 0.9, 12),
        matGold
      );
      subAmalaka.position.set(dp.x, floorY + 10 + dp.h + 0.45, dp.z);
      root.add(subAmalaka);
    });

    // -------------------------------------------------------------
    // 4. HOLLOW WALKABLE MANDAPA (Assembly Hall with Golden Dome)
    // -------------------------------------------------------------
    const mandapaW = 18;
    const mandapaH = 10;
    const mandapaD = 18;
    const mandapaZ = 10;

    // Hollow Mandapa Walls
    const mWallL = new THREE.Mesh(new THREE.BoxGeometry(wallThick, mandapaH, mandapaD), matStone);
    mWallL.position.set(-mandapaW / 2 + wallThick / 2, floorY + mandapaH / 2, mandapaZ);
    mWallL.castShadow = true;
    mWallL.receiveShadow = true;
    root.add(mWallL);

    const mWallR = new THREE.Mesh(new THREE.BoxGeometry(wallThick, mandapaH, mandapaD), matStone);
    mWallR.position.set(mandapaW / 2 - wallThick / 2, floorY + mandapaH / 2, mandapaZ);
    mWallR.castShadow = true;
    mWallR.receiveShadow = true;
    root.add(mWallR);

    // Mandapa Front Wall with Open Entryway
    const mDoorW = 6.0;
    const mDoorH = 7.2;
    const mFrontSideW = (mandapaW - mDoorW) / 2;

    const mFrontL = new THREE.Mesh(new THREE.BoxGeometry(mFrontSideW, mandapaH, wallThick), matStone);
    mFrontL.position.set(-mandapaW / 2 + mFrontSideW / 2, floorY + mandapaH / 2, mandapaZ + mandapaD / 2 - wallThick / 2);
    mFrontL.castShadow = true;
    root.add(mFrontL);

    const mFrontR = new THREE.Mesh(new THREE.BoxGeometry(mFrontSideW, mandapaH, wallThick), matStone);
    mFrontR.position.set(mandapaW / 2 - mFrontSideW / 2, floorY + mandapaH / 2, mandapaZ + mandapaD / 2 - wallThick / 2);
    mFrontR.castShadow = true;
    root.add(mFrontR);

    const mLintel = new THREE.Mesh(new THREE.BoxGeometry(mDoorW, mandapaH - mDoorH, wallThick), matStone);
    mLintel.position.set(0, floorY + mDoorH + (mandapaH - mDoorH) / 2, mandapaZ + mandapaD / 2 - wallThick / 2);
    mLintel.castShadow = true;
    root.add(mLintel);

    // Carved Pillars inside the Mandapa
    for (const px of [-4.5, 4.5]) {
      for (const pz of [mandapaZ - 4, mandapaZ + 4]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, mandapaH - 0.5, 12), matStone);
        pillar.position.set(px, floorY + (mandapaH - 0.5) / 2, pz);
        pillar.castShadow = true;
        root.add(pillar);
      }
    }

    const mandapaLight = new THREE.PointLight(0xffa840, 2.6, 22);
    mandapaLight.position.set(0, floorY + mandapaH - 1.5, mandapaZ);
    root.add(mandapaLight);

    // Mandapa Golden Dome
    const mDomeH = 6.5;
    const mDome = new THREE.Mesh(
      new THREE.SphereGeometry(6.8, isPhase1 ? 8 : 20, isPhase1 ? 6 : 12, 0, Math.PI * 2, 0, Math.PI / 2),
      matGold
    );
    mDome.position.set(0, floorY + mandapaH, mandapaZ);
    mDome.castShadow = true;
    root.add(mDome);

    // -------------------------------------------------------------
    // PHASES 2, 3, 4: CARVED ENTRANCE ARCHES & CORRIDOR PAVILIONS
    // -------------------------------------------------------------
    if (isDetail) {
      // 1. Entrance Gateway Arches (Cusped Kashi Torana Portal)
      const archPortal = new THREE.Mesh(new THREE.BoxGeometry(10, 11, 2.5), matStone);
      archPortal.position.set(0, floorY + 5.5, mandapaZ + mandapaD / 2);
      archPortal.castShadow = true;
      root.add(archPortal);

      // 2. Flight of Entrance Steps
      const steps = 7;
      const stepW = 12;
      const stepD = 6;
      for (let s = 0; s < steps; s++) {
        const sy = (s / steps) * floorY;
        const sz = mandapaZ + mandapaD / 2 + 1.25 + ((steps - s) / steps) * stepD;
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(stepW, floorY / steps + 0.05, stepD / steps),
          matStone
        );
        step.position.set(0, sy + (floorY / steps) / 2, sz);
        step.receiveShadow = true;
        step.castShadow = true;
        root.add(step);
      }

      // 3. Surrounding Heritage-style Architectural Pavilions (Kashi Vishwanath Corridor arcades)
      const arcadeConfigs = [
        { x: -28, z: 0, w: 10, d: 48 },
        { x: 28,  z: 0, w: 10, d: 48 },
        { x: 0,   z: -26, w: 46, d: 10 }
      ];

      arcadeConfigs.forEach((ac) => {
        const arcade = new THREE.Mesh(new THREE.BoxGeometry(ac.w, 7.5, ac.d), matStone);
        arcade.position.set(ac.x, floorY + 3.75, ac.z);
        arcade.castShadow = true;
        root.add(arcade);

        // Chhatri cupolas along the corridor rooftop
        const chhatri = new THREE.Mesh(
          new THREE.SphereGeometry(2.4, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
          matGold
        );
        chhatri.position.set(ac.x, floorY + 7.5, ac.z);
        chhatri.castShadow = true;
        root.add(chhatri);
      });

      // 4. Sacred Nandi Shrine facing the inner sanctum
      const nandi = this.createNandiStatue(matStone);
      nandi.position.set(0, floorY, 4);
      root.add(nandi);
    }

    return root;
  }

  createGoldenSpireGeometry(baseWidth, height, segments = 24) {
    const points = [];
    const steps = 24;
    const r = baseWidth * 0.5;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * height;
      // Parabolic curvature of the sacred Vishwanath golden spire
      const curve = Math.pow(t, 2.2);
      const currR = r * (1.0 - 0.75 * curve);
      points.push(new THREE.Vector2(Math.max(0.01, currR), y));
    }
    return new THREE.LatheGeometry(points, segments);
  }

  createNandiStatue(matStone) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 3.2), matStone);
    body.position.y = 0.7;
    body.castShadow = true;
    group.add(body);

    const hump = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), matStone);
    hump.position.set(0, 1.6, -0.4);
    group.add(hump);

    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.65, 1.2, 8), matStone);
    head.rotation.x = Math.PI / 3;
    head.position.set(0, 1.5, -1.6);
    head.castShadow = true;
    group.add(head);

    return group;
  }

  /**
   * Phase 4: Varanasi Heritage Environment (Kashi Vishwanath Corridor, Flagstones, Morning Sun & Haze)
   */
  buildVaranasiCorridorEnvironment() {
    const group = new THREE.Group();
    group.name = 'KashiCorridor_Phase4';

    // 1. Chunar Sandstone Flagstone Courtyard
    const groundGeo = new THREE.PlaneGeometry(300, 300);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xb59e87, // Varanasi Chunar stone
      roughness: 0.75,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, 0);
    ground.receiveShadow = true;
    group.add(ground);

    // 2. Surrounding Traditional Varanasi Heritage Facades (Red & Ochre stone pavilions)
    const facadeMat = new THREE.MeshStandardMaterial({ color: 0x9b5442, roughness: 0.75 });
    const heritageBuildings = [
      { x: -55, z: 20, w: 22, h: 20, d: 70 },
      { x: 55,  z: 20, w: 22, h: 20, d: 70 },
      { x: 0,   z: -55, w: 110, h: 18, d: 20 }
    ];

    heritageBuildings.forEach((hb) => {
      const bMesh = new THREE.Mesh(new THREE.BoxGeometry(hb.w, hb.h, hb.d), facadeMat);
      bMesh.position.set(hb.x, hb.h / 2, hb.z);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      group.add(bMesh);

      // Parapet jharokhas along buildings
      const jharokha = new THREE.Mesh(
        new THREE.BoxGeometry(hb.w + 1, 2, hb.d),
        new THREE.MeshStandardMaterial({ color: 0xd9ba98 })
      );
      jharokha.position.set(hb.x, hb.h + 1, hb.z);
      group.add(jharokha);
    });

    // 3. Heritage Street Lamps along the corridor
    const lampCoords = [
      { x: -20, z: 35 }, { x: 20, z: 35 },
      { x: -20, z: 70 }, { x: 20, z: 70 }
    ];
    lampCoords.forEach((lc) => {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.18, 6, 8),
        new THREE.MeshStandardMaterial({ color: 0x242220, metalness: 0.85 })
      );
      pole.position.set(lc.x, 3, lc.z);
      group.add(pole);

      const lantern = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffe28a })
      );
      lantern.position.set(lc.x, 6.2, lc.z);
      group.add(lantern);
    });

    return group;
  }

  /**
   * Lighting:
   * Phases 1-3: Clean Studio Lighting
   * Phase 4: Warm Morning Varanasi Sunlight reflecting off 24K Golden Spire & Haze
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `KashiLighting_Phase${phase}`;

    if (phase === 4) {
      // Warm Morning Ganga Ghats Sky Gradient
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#36729e');   // Morning Ganges blue
      grad.addColorStop(0.55, '#f5c078'); // Warm golden amber
      grad.addColorStop(0.85, '#e59a60'); // Sunrise horizon glow
      grad.addColorStop(1, '#db7d4d');   // Vermilion river mist
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0xd6ad85, 0.0022);

      // Low Morning Sun (Directional light catching the gilded 24K golden spire)
      const sun = new THREE.DirectionalLight(0xfffae0, 2.8);
      sun.position.set(60, 42, 60);
      sun.castShadow = true;
      sun.shadow.mapSize.width = 2048;
      sun.shadow.mapSize.height = 2048;
      const d = 90;
      sun.shadow.camera.left = -d;
      sun.shadow.camera.right = d;
      sun.shadow.camera.top = d;
      sun.shadow.camera.bottom = -d;
      sun.shadow.bias = -0.0003;
      lightGroup.add(sun);

      // Gold reflection fill
      const hemi = new THREE.HemisphereLight(0xffe6b8, 0x6e4832, 1.3);
      hemi.position.set(0, 60, 0);
      lightGroup.add(hemi);

      // Soft back-fill
      const backFill = new THREE.DirectionalLight(0x768ca5, 0.7);
      backFill.position.set(-45, 25, -45);
      lightGroup.add(backFill);

    } else {
      scene.fog = null;
      scene.background = new THREE.Color(phase === 1 ? 0x18191c : 0x141518);

      const key = new THREE.DirectionalLight(0xfff5ea, phase === 1 ? 2.3 : 2.0);
      key.position.set(45, 65, 55);
      key.castShadow = true;
      key.shadow.mapSize.width = 1024;
      key.shadow.mapSize.height = 1024;
      const d = 65;
      key.shadow.camera.left = -d;
      key.shadow.camera.right = d;
      key.shadow.camera.top = d;
      key.shadow.camera.bottom = -d;
      lightGroup.add(key);

      const fill = new THREE.DirectionalLight(0xbad2e8, 1.0);
      fill.position.set(-50, 35, -35);
      lightGroup.add(fill);

      const hemi = new THREE.HemisphereLight(0xffffff, 0x2d3038, 0.95);
      hemi.position.set(0, 50, 0);
      lightGroup.add(hemi);

      const grid = new THREE.GridHelper(140, 60, 0xd4af37, 0x2e323b);
      grid.position.y = -0.01;
      lightGroup.add(grid);
    }

    return lightGroup;
  }
}

export const kashiVishwanathBuilder = new KashiVishwanathBuilder();
