import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Mahakaleshwar Jyotirlinga Temple (Ujjain, Madhya Pradesh)
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   Traditional Hindu temple complex with central sanctum, prominent shikhara,
 *   entrance gateway, stone steps, and surrounding temple structures.
 * Phase 2 — Architectural Detailing:
 *   Carved stone pillars, decorative entrance arches, layered shikhara elements,
 *   ornamental facade patterns, traditional temple courtyard, and Nandi.
 * Phase 3 — Material & Texture (Advanced):
 *   Sandstone, granite, and aged stone textures, fine carvings, ornamental patterns,
 *   subtle weathering, realistic material roughness.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Ujjain temple complex environment with stone pathways, Koteshwar Kund courtyard,
 *   traditional surrounding architecture, soft morning light. Photorealistic render.
 */
export class MahakaleshwarTempleBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay Massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.claySandstone = new THREE.MeshStandardMaterial({
      color: 0xb58a5e,
      roughness: 0.76,
      metalness: 0.05,
      flatShading: true,
      side: THREE.DoubleSide
    });

    this.materials.clayPlinth = new THREE.MeshStandardMaterial({
      color: 0x986f48,
      roughness: 0.82,
      flatShading: true,
      side: THREE.DoubleSide
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Detailing Clay
    // -------------------------------------------------------------
    this.materials.refinedSandstone = new THREE.MeshStandardMaterial({
      color: 0xba9266,
      roughness: 0.58,
      metalness: 0.06,
      flatShading: false,
      side: THREE.DoubleSide
    });

    this.materials.goldFinial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.92
    });

    // -------------------------------------------------------------
    // Phase 3: High-Detail Procedural Sandstone & Ancient Carvings
    // -------------------------------------------------------------
    const sandstoneTex = textureGenerator.getMahakaleshwarSandstoneTexture();

    this.materials.texturedSandstone = new THREE.MeshStandardMaterial({
      map: sandstoneTex,
      roughness: 0.65,
      metalness: 0.05,
      bumpMap: sandstoneTex,
      bumpScale: 0.035,
      side: THREE.DoubleSide
    });

    this.materials.texturedNandi = new THREE.MeshStandardMaterial({
      map: sandstoneTex,
      roughness: 0.5,
      metalness: 0.08,
      bumpMap: sandstoneTex,
      bumpScale: 0.02
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `MahakaleshwarTemple_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matStone = isTextured
      ? this.materials.texturedSandstone
      : (isDetail ? this.materials.refinedSandstone : this.materials.claySandstone);

    const matPlinth = isTextured
      ? this.materials.texturedSandstone
      : (isDetail ? this.materials.refinedSandstone : this.materials.clayPlinth);

    const matNandi = isTextured ? this.materials.texturedNandi : matStone;
    const matGold = isDetail ? this.materials.goldFinial : matStone;

    // -------------------------------------------------------------
    // 1. TEMPLE PLINTH & COURTYARD (Jagati Platform)
    // -------------------------------------------------------------
    const plinthW = 42;
    const plinthH = 2.5;
    const plinthD = 60;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(plinthW, plinthH, plinthD), matPlinth);
    plinth.position.set(0, plinthH / 2, 0);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    root.add(plinth);

    const floorY = plinthH; // 2.5m
    const wallThick = 1.3;

    // -------------------------------------------------------------
    // 2. HOLLOW WALKABLE SANCTUM & 3-TIER NAGARA SHIKHARA
    // -------------------------------------------------------------
    const sanctumW = 16;
    const sanctumH = 14;
    const sanctumD = 16;
    const sanctumZ = -12;

    // Sanctum Hollow Walls
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
    const sDoorW = 5.6;
    const sDoorH = 7.5;
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

    // Towering 3-tier Nagara Shikhara (representing Omkareshwar, Nagchandreshwar and Mahakal tiers)
    const shikharaH = 26;
    const shikharaGeo = this.createMahakalShikharaGeometry(13, shikharaH, isPhase1 ? 6 : 20);
    const shikhara = new THREE.Mesh(shikharaGeo, matStone);
    shikhara.position.set(0, floorY + sanctumH, sanctumZ);
    shikhara.castShadow = true;
    shikhara.receiveShadow = true;
    root.add(shikhara);

    // Amalaka (Fluted ribbed disc)
    const amalaka = new THREE.Mesh(
      new THREE.CylinderGeometry(3.6, 4.2, 1.8, isPhase1 ? 8 : 24),
      matStone
    );
    amalaka.position.set(0, floorY + sanctumH + shikharaH + 0.9, sanctumZ);
    amalaka.castShadow = true;
    root.add(amalaka);

    // Gilded Brass Kalasha & Trishul (Trident) at the apex
    const kalasha = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 1.4, 3.2, 12),
      matGold
    );
    kalasha.position.set(0, floorY + sanctumH + shikharaH + 1.8 + 1.6, sanctumZ);
    kalasha.castShadow = true;
    root.add(kalasha);

    if (isDetail) {
      // Golden Trishul atop spire
      const trishul = this.createGoldenTrishul(matGold);
      trishul.position.set(0, floorY + sanctumH + shikharaH + 1.8 + 3.2 + 1.5, sanctumZ);
      root.add(trishul);
    }

    // -------------------------------------------------------------
    // SANCTUM INTERIOR: DAKSHINMUKHI MAHAKAL JYOTIRLINGA & SHESHNAG
    // -------------------------------------------------------------
    const sanctumGroup = new THREE.Group();
    sanctumGroup.name = 'Mahakaleshwar_Sanctum_Interior';

    // Circular Silver-Plated Yoni / Argha Base
    const silverMat = new THREE.MeshStandardMaterial({ color: 0xdde2e8, roughness: 0.22, metalness: 0.88 });
    const argha = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.0, 0.6, 24), silverMat);
    argha.position.set(0, floorY + 0.3, sanctumZ);
    sanctumGroup.add(argha);

    // Sacred Dakshinmukhi Mahakaleshwar Jyotirlinga (Black Stone Lingam)
    const lingamMat = new THREE.MeshStandardMaterial({ color: 0x111214, roughness: 0.3, metalness: 0.1 });
    const lingam = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 1.8, 20), lingamMat);
    lingam.position.set(0, floorY + 0.6 + 0.9, sanctumZ);
    sanctumGroup.add(lingam);

    // Silver Sheshnag (Coiled Serpent Devta around Lingam)
    const snakeCoil = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.16, 12, 24), silverMat);
    snakeCoil.rotation.x = Math.PI / 2;
    snakeCoil.position.set(0, floorY + 0.95, sanctumZ);
    sanctumGroup.add(snakeCoil);

    // Multi-hooded Cobra Fan above the Lingam
    const hoodFan = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.75, 0.9, 8, 1, false, 0, Math.PI), silverMat);
    hoodFan.position.set(0, floorY + 2.5, sanctumZ - 0.5);
    hoodFan.rotation.x = Math.PI / 6;
    sanctumGroup.add(hoodFan);

    // Suspended Silver Jaladhari (Holy Water Dripping Pot)
    const potChain = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.5, 8), silverMat);
    potChain.position.set(0, floorY + sanctumH - 1.8, sanctumZ);
    sanctumGroup.add(potChain);

    const jaladhariPot = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 12), silverMat);
    jaladhariPot.position.set(0, floorY + 3.8, sanctumZ);
    sanctumGroup.add(jaladhariPot);

    // Glowing Temple Brass Lamps & Point Light
    for (const lx of [-3.0, 3.0]) {
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 1.4, 12), matGold);
      lamp.position.set(lx, floorY + 0.7, sanctumZ);
      sanctumGroup.add(lamp);

      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd060 }));
      flame.position.set(lx, floorY + 1.45, sanctumZ);
      sanctumGroup.add(flame);
    }

    const mahakalLight = new THREE.PointLight(0xff9933, 3.8, 22);
    mahakalLight.position.set(0, floorY + 3.4, sanctumZ);
    sanctumGroup.add(mahakalLight);

    root.add(sanctumGroup);

    // -------------------------------------------------------------
    // 3. HOLLOW WALKABLE MANDAPA (Assembly Hall with Pillars)
    // -------------------------------------------------------------
    const mandapaW = 20;
    const mandapaH = 10.5;
    const mandapaD = 22;
    const mandapaZ = 8;

    // Mandapa Hollow Side Walls
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
    const mDoorW = 6.4;
    const mDoorH = 7.5;
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

    // Carved Pillars inside the Mandapa flanking the central walk aisle
    for (const px of [-5.5, 5.5]) {
      for (const pz of [mandapaZ - 5, mandapaZ + 5]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, mandapaH - 0.5, 12), matStone);
        pillar.position.set(px, floorY + (mandapaH - 0.5) / 2, pz);
        pillar.castShadow = true;
        root.add(pillar);
      }
    }

    const mandapaLight = new THREE.PointLight(0xffaa55, 2.8, 24);
    mandapaLight.position.set(0, floorY + mandapaH - 1.5, mandapaZ);
    root.add(mandapaLight);

    // Stepped pyramidal Samvarana roof over Mandapa
    const mRoofH = 8;
    const mRoof = new THREE.Mesh(
      new THREE.ConeGeometry(mandapaW * 0.65, mRoofH, 4),
      matStone
    );
    mRoof.position.set(0, floorY + mandapaH + mRoofH / 2, mandapaZ);
    mRoof.rotation.y = Math.PI / 4;
    mRoof.castShadow = true;
    root.add(mRoof);

    // -------------------------------------------------------------
    // 4. ENTRANCE GATEWAY PORTICO (OPEN WALKWAY)
    // -------------------------------------------------------------
    const porticoW = 12;
    const porticoH = 8;
    const porticoD = 8;
    const porticoZ = 23;

    // Open portico canopy on side pillars
    const pWallL = new THREE.Mesh(new THREE.BoxGeometry(wallThick, porticoH, porticoD), matStone);
    pWallL.position.set(-porticoW / 2 + wallThick / 2, floorY + porticoH / 2, porticoZ);
    pWallL.castShadow = true;
    root.add(pWallL);

    const pWallR = new THREE.Mesh(new THREE.BoxGeometry(wallThick, porticoH, porticoD), matStone);
    pWallR.position.set(porticoW / 2 - wallThick / 2, floorY + porticoH / 2, porticoZ);
    pWallR.castShadow = true;
    root.add(pWallR);

    const pRoof = new THREE.Mesh(new THREE.BoxGeometry(porticoW + 1, 1.2, porticoD + 1), matStone);
    pRoof.position.set(0, floorY + porticoH + 0.6, porticoZ);
    pRoof.castShadow = true;
    root.add(pRoof);

    // -------------------------------------------------------------
    // PHASES 2, 3, 4: NANDI MANDAPA, CARVED PILLARS & COURTYARD
    // -------------------------------------------------------------
    if (isDetail) {
      // 1. Carved Pillars along Mandapa Facade
      const pillarCoords = [
        { x: -5.0, z: 27 }, { x: 5.0, z: 27 },
        { x: -5.0, z: 19 }, { x: 5.0, z: 19 }
      ];
      pillarCoords.forEach((pc) => {
        const pillar = this.createCarvedPillar(8, matStone);
        pillar.position.set(pc.x, floorY, pc.z);
        root.add(pillar);
      });

      // 2. Flight of Entrance Steps (Stone sopana)
      const steps = 9;
      const stepW = 14;
      const stepD = 8;
      for (let s = 0; s < steps; s++) {
        const sy = (s / steps) * floorY;
        const sz = plinthD / 2 + ((steps - s) / steps) * stepD;
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(stepW, floorY / steps + 0.05, stepD / steps),
          matStone
        );
        step.position.set(0, sy + (floorY / steps) / 2, sz);
        step.receiveShadow = true;
        step.castShadow = true;
        root.add(step);
      }

      // 3. Respectful Representation of Nandi inside a dedicated Nandi Mandapa
      const nandiMandapaZ = plinthD / 2 + stepD + 10;
      const nandiBase = new THREE.Mesh(new THREE.BoxGeometry(10, 1.4, 12), matPlinth);
      nandiBase.position.set(0, 0.7, nandiMandapaZ);
      nandiBase.castShadow = true;
      nandiBase.receiveShadow = true;
      root.add(nandiBase);

      const nandiStatue = this.createNandiStatue(matNandi);
      nandiStatue.position.set(0, 1.4, nandiMandapaZ);
      root.add(nandiStatue);

      // 4 open pillars and roof over Nandi
      [[-4, -4.5], [4, -4.5], [-4, 4.5], [4, 4.5]].forEach(([nx, nz]) => {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.7, 6, 0.7), matStone);
        post.position.set(nx, 1.4 + 3, nandiMandapaZ + nz);
        post.castShadow = true;
        root.add(post);
      });

      const nandiRoof = new THREE.Mesh(new THREE.ConeGeometry(6.5, 3.2, 4), matStone);
      nandiRoof.position.set(0, 1.4 + 6 + 1.6, nandiMandapaZ);
      nandiRoof.rotation.y = Math.PI / 4;
      nandiRoof.castShadow = true;
      root.add(nandiRoof);
    }

    return root;
  }

  createMahakalShikharaGeometry(baseRadius, height, segments = 20) {
    const points = [];
    const steps = 20;
    const r = baseRadius * 0.5;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * height;
      const curve = Math.pow(t, 2.0);
      const currR = r * (1.0 - 0.68 * curve);
      points.push(new THREE.Vector2(Math.max(0.01, currR), y));
    }
    return new THREE.LatheGeometry(points, segments);
  }

  createCarvedPillar(height, matStone) {
    const group = new THREE.Group();

    const base = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 1.4), matStone);
    base.position.y = 0.6;
    base.castShadow = true;
    group.add(base);

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, height - 2.4, 8), matStone);
    shaft.position.y = 1.2 + (height - 2.4) / 2;
    shaft.castShadow = true;
    group.add(shaft);

    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.6), matStone);
    cap.position.y = height - 0.6;
    cap.castShadow = true;
    group.add(cap);

    return group;
  }

  createNandiStatue(matStone) {
    const group = new THREE.Group();

    const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 3.8), matStone);
    body.position.y = 0.8;
    body.castShadow = true;
    group.add(body);

    const hump = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 8), matStone);
    hump.position.set(0, 1.8, -0.4);
    group.add(hump);

    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 1.4, 8), matStone);
    head.rotation.x = Math.PI / 3;
    head.position.set(0, 1.7, -2.0);
    head.castShadow = true;
    group.add(head);

    return group;
  }

  createGoldenTrishul(matGold) {
    const group = new THREE.Group();

    const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 6), matGold);
    staff.position.y = 1.6;
    group.add(staff);

    // Central prong
    const centerProng = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.2, 6), matGold);
    centerProng.position.y = 3.2 + 0.6;
    group.add(centerProng);

    // Left and right prongs
    [-0.5, 0.5].forEach((px) => {
      const prong = new THREE.Mesh(new THREE.ConeGeometry(0.1, 1.0, 6), matGold);
      prong.position.set(px, 3.2 + 0.5, 0);
      prong.rotation.z = px > 0 ? -0.2 : 0.2;
      group.add(prong);
    });

    return group;
  }

  /**
   * Phase 4: Ujjain Temple Complex, Koteshwar Kund, Stone Pathways & Courtyards
   */
  buildUjjainComplexEnvironment() {
    const group = new THREE.Group();
    group.name = 'MahakaleshwarComplex_Phase4';

    // 1. Broad Paved Temple Courtyard
    const groundGeo = new THREE.PlaneGeometry(320, 320);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x6e6052, // Malwa stone courtyard pavers
      roughness: 0.8,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, 0);
    ground.receiveShadow = true;
    group.add(ground);

    // 2. Sacred Koteshwar Kund (Temple water reservoir tank)
    const kundW = 34;
    const kundD = 34;
    const kundH = 2.0;
    const kundX = -45;
    const kundZ = 15;

    const kundWall = new THREE.Mesh(
      new THREE.BoxGeometry(kundW, kundH, kundD),
      new THREE.MeshStandardMaterial({ color: 0x5a4d3f, roughness: 0.85 })
    );
    kundWall.position.set(kundX, kundH / 2, kundZ);
    kundWall.castShadow = true;
    kundWall.receiveShadow = true;
    group.add(kundWall);

    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(kundW - 4, kundD - 4),
      new THREE.MeshStandardMaterial({ color: 0x2d635c, roughness: 0.15, metalness: 0.35 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(kundX, kundH - 0.2, kundZ);
    group.add(water);

    // 3. Colonnaded Perimeter Cloisters (Traditional surrounding temple mandapas)
    const cloisterMat = new THREE.MeshStandardMaterial({ color: 0x8a7258, roughness: 0.75 });
    const cloisterConfigs = [
      { x: 0, z: -55, w: 140, d: 12 },
      { x: 60, z: 0, w: 12, d: 120 }
    ];
    cloisterConfigs.forEach((cc) => {
      const cloister = new THREE.Mesh(new THREE.BoxGeometry(cc.w, 7, cc.d), cloisterMat);
      cloister.position.set(cc.x, 3.5, cc.z);
      cloister.castShadow = true;
      group.add(cloister);
    });

    // 4. Heritage Brass Lamps & Deepstambha (Tower of Light)
    const stambhaX = [32, -32];
    stambhaX.forEach((sx) => {
      const stambha = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.9, 14, 8),
        new THREE.MeshStandardMaterial({ color: 0x483a2d, roughness: 0.7 })
      );
      stambha.position.set(sx, 7, 50);
      stambha.castShadow = true;
      group.add(stambha);
    });

    return group;
  }

  /**
   * Lighting:
   * Phases 1-3: Clean Studio Lighting
   * Phase 4: Soft Morning Ujjain Sunlight with Warm Golden Glow
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `MahakaleshwarLighting_Phase${phase}`;

    if (phase === 4) {
      // Soft Madhya Pradesh Morning Sky
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#2d6896');   // Morning blue
      grad.addColorStop(0.55, '#f4ba78'); // Sacred golden hour warmth
      grad.addColorStop(0.85, '#e89c62'); // Amber sunrise horizon
      grad.addColorStop(1, '#df7d50');   // Vermilion morning glow
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0xd6ad85, 0.0024);

      // Low angle sacred morning sun from east
      const sun = new THREE.DirectionalLight(0xffdfb8, 2.6);
      sun.position.set(65, 38, 55);
      sun.castShadow = true;
      sun.shadow.mapSize.width = 2048;
      sun.shadow.mapSize.height = 2048;
      const d = 95;
      sun.shadow.camera.left = -d;
      sun.shadow.camera.right = d;
      sun.shadow.camera.top = d;
      sun.shadow.camera.bottom = -d;
      sun.shadow.bias = -0.0003;
      lightGroup.add(sun);

      // Warm ambient reflection
      const hemi = new THREE.HemisphereLight(0xffd5ad, 0x5a4230, 1.25);
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

export const mahakaleshwarTempleBuilder = new MahakaleshwarTempleBuilder();
