import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Kedarnath Temple (Uttarakhand, India) Architectural Model Builder
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   Traditional Himalayan stone temple with rectangular stone sanctum,
 *   sloping stone roof, prominent front entrance, compact layout, mountain backdrop.
 * Phase 2 — Architectural Detailing:
 *   Grey stone masonry, large stone entrance steps, carved doorway frames,
 *   traditional temple roof layers, stone walls, and Nandi statue in front of entrance.
 * Phase 3 — Material & Texture (Advanced):
 *   Weathered grey granite and stone textures, surface roughness, natural stone joints,
 *   weathering, fine carvings, clearly visible Nandi statue and entrance.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Authentic Himalayan environment, snow-covered mountain peaks (Kedarnath peak),
 *   rocky terrain, natural stone pathway, soft morning sunlight, atmospheric haze.
 */
export class KedarnathTempleBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay Massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.clayGranite = new THREE.MeshStandardMaterial({
      color: 0x5a5d62,
      roughness: 0.78,
      metalness: 0.04,
      flatShading: true,
      side: THREE.DoubleSide
    });

    this.materials.clayRoof = new THREE.MeshStandardMaterial({
      color: 0x3e4044,
      roughness: 0.85,
      flatShading: true,
      side: THREE.DoubleSide
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Detailing Clay
    // -------------------------------------------------------------
    this.materials.refinedGranite = new THREE.MeshStandardMaterial({
      color: 0x52565b,
      roughness: 0.62,
      metalness: 0.05,
      flatShading: false,
      side: THREE.DoubleSide
    });

    this.materials.refinedNandi = new THREE.MeshStandardMaterial({
      color: 0x3d3f42,
      roughness: 0.55,
      metalness: 0.08,
      flatShading: false
    });

    this.materials.goldKalasha = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.28,
      metalness: 0.9
    });

    // -------------------------------------------------------------
    // Phase 3: Advanced Weathered Grey Himalayan Granite & Textures
    // -------------------------------------------------------------
    const graniteTex = textureGenerator.getKedarnathGreyGraniteTexture();

    this.materials.texturedGranite = new THREE.MeshStandardMaterial({
      map: graniteTex,
      roughness: 0.76,
      metalness: 0.04,
      bumpMap: graniteTex,
      bumpScale: 0.035,
      side: THREE.DoubleSide
    });

    this.materials.texturedRoof = new THREE.MeshStandardMaterial({
      map: graniteTex,
      roughness: 0.85,
      bumpMap: graniteTex,
      bumpScale: 0.045,
      side: THREE.DoubleSide
    });

    this.materials.texturedNandi = new THREE.MeshStandardMaterial({
      map: graniteTex,
      roughness: 0.6,
      metalness: 0.06,
      bumpMap: graniteTex,
      bumpScale: 0.02
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `KedarnathTemple_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matStone = isTextured
      ? this.materials.texturedGranite
      : (isDetail ? this.materials.refinedGranite : this.materials.clayGranite);

    const matRoof = isTextured
      ? this.materials.texturedRoof
      : (isDetail ? this.materials.refinedGranite : this.materials.clayRoof);

    const matNandi = isTextured
      ? this.materials.texturedNandi
      : (isDetail ? this.materials.refinedNandi : this.materials.clayGranite);

    const matGold = isDetail ? this.materials.goldKalasha : matStone;

    // -------------------------------------------------------------
    // 1. TEMPLE PLATFORM PODIUM (Granite Flagstone Plinth)
    // -------------------------------------------------------------
    const plinthW = 34;
    const plinthH = 2.4;
    const plinthD = 54;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(plinthW, plinthH, plinthD), matStone);
    plinth.position.set(0, plinthH / 2, 0);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    root.add(plinth);

    const floorY = plinthH; // 2.4m

    // -------------------------------------------------------------
    // -------------------------------------------------------------
    // 2. HOLLOW WALKABLE RECTANGULAR SANCTUM & SHIKHARA TOWER
    // -------------------------------------------------------------
    const sanctumW = 14;
    const sanctumH = 12;
    const sanctumD = 14;
    const sanctumZ = -10;
    const wallThick = 1.2;

    // Sanctum Side & Back Walls (Hollow interior chamber)
    // Left Wall
    const sWallL = new THREE.Mesh(new THREE.BoxGeometry(wallThick, sanctumH, sanctumD), matStone);
    sWallL.position.set(-sanctumW / 2 + wallThick / 2, floorY + sanctumH / 2, sanctumZ);
    sWallL.castShadow = true;
    sWallL.receiveShadow = true;
    root.add(sWallL);

    // Right Wall
    const sWallR = new THREE.Mesh(new THREE.BoxGeometry(wallThick, sanctumH, sanctumD), matStone);
    sWallR.position.set(sanctumW / 2 - wallThick / 2, floorY + sanctumH / 2, sanctumZ);
    sWallR.castShadow = true;
    sWallR.receiveShadow = true;
    root.add(sWallR);

    // Back Wall
    const sWallBack = new THREE.Mesh(new THREE.BoxGeometry(sanctumW, sanctumH, wallThick), matStone);
    sWallBack.position.set(0, floorY + sanctumH / 2, sanctumZ - sanctumD / 2 + wallThick / 2);
    sWallBack.castShadow = true;
    sWallBack.receiveShadow = true;
    root.add(sWallBack);

    // Sanctum Front Wall with Open Archway to Mandapa
    const sDoorW = 4.8;
    const sDoorH = 6.8;
    const sFrontSideW = (sanctumW - sDoorW) / 2;
    
    // Front Left Section
    const sFrontL = new THREE.Mesh(new THREE.BoxGeometry(sFrontSideW, sanctumH, wallThick), matStone);
    sFrontL.position.set(-sanctumW / 2 + sFrontSideW / 2, floorY + sanctumH / 2, sanctumZ + sanctumD / 2 - wallThick / 2);
    sFrontL.castShadow = true;
    root.add(sFrontL);

    // Front Right Section
    const sFrontR = new THREE.Mesh(new THREE.BoxGeometry(sFrontSideW, sanctumH, wallThick), matStone);
    sFrontR.position.set(sanctumW / 2 - sFrontSideW / 2, floorY + sanctumH / 2, sanctumZ + sanctumD / 2 - wallThick / 2);
    sFrontR.castShadow = true;
    root.add(sFrontR);

    // Front Lintel above doorway
    const sLintel = new THREE.Mesh(new THREE.BoxGeometry(sDoorW, sanctumH - sDoorH, wallThick), matStone);
    sLintel.position.set(0, floorY + sDoorH + (sanctumH - sDoorH) / 2, sanctumZ + sanctumD / 2 - wallThick / 2);
    sLintel.castShadow = true;
    root.add(sLintel);

    // Towering Shikhara Spire (Stepped Himalayan Nagara spire with horizontal stone ribs)
    const shikharaH = 16;
    const shikharaGeo = this.createKedarnathShikharaGeometry(12, shikharaH, isPhase1 ? 4 : 16);
    const shikhara = new THREE.Mesh(shikharaGeo, matStone);
    shikhara.position.set(0, floorY + sanctumH, sanctumZ);
    shikhara.castShadow = true;
    root.add(shikhara);

    // Amalaka (Ribbed crown disc)
    const amalaka = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.8, 1.6, isPhase1 ? 8 : 20),
      matStone
    );
    amalaka.position.set(0, floorY + sanctumH + shikharaH + 0.8, sanctumZ);
    amalaka.castShadow = true;
    root.add(amalaka);

    // Kalasha (Gilded copper sacred pot & finial)
    const kalasha = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 1.1, 2.6, 12),
      matGold
    );
    kalasha.position.set(0, floorY + sanctumH + shikharaH + 1.6 + 1.3, sanctumZ);
    kalasha.castShadow = true;
    root.add(kalasha);

    // -------------------------------------------------------------
    // SANCTUM INTERIOR: SWAYAMBHU KEDARNATH SHIVA LINGAM SHRINE
    // -------------------------------------------------------------
    // The sacred Kedarnath Jyotirlinga is famously a natural triangular rock hump
    const sanctumInteriorGroup = new THREE.Group();
    sanctumInteriorGroup.name = 'Kedarnath_Sanctum_Interior';

    // Stone Argha / Peetham (Base reservoir)
    const arghaMat = isTextured ? this.materials.texturedGranite : matStone;
    const argha = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 0.6, 24), arghaMat);
    argha.position.set(0, floorY + 0.3, sanctumZ);
    argha.receiveShadow = true;
    sanctumInteriorGroup.add(argha);

    // Triangular Swayambhu Rock (Natural Lord Shiva Hump)
    const lingamMat = new THREE.MeshStandardMaterial({
      color: 0x222326,
      roughness: 0.82,
      metalness: 0.1,
      bumpScale: 0.04
    });
    const lingamGeo = new THREE.ConeGeometry(1.2, 1.6, 5);
    const lingam = new THREE.Mesh(lingamGeo, lingamMat);
    lingam.position.set(0, floorY + 0.6 + 0.8, sanctumZ);
    lingam.rotation.y = Math.PI / 5;
    lingam.castShadow = true;
    sanctumInteriorGroup.add(lingam);

    // Sacred Sandalwood Tilak / Gold Band across the Lingam
    const tilakMat = new THREE.MeshStandardMaterial({ color: 0xdfad32, roughness: 0.3, metalness: 0.7 });
    const tilak = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, 0.15, 8), tilakMat);
    tilak.position.set(0, floorY + 1.3, sanctumZ);
    sanctumInteriorGroup.add(tilak);

    // Hanging Brass Temple Bells (Ghanti)
    const bellMat = new THREE.MeshStandardMaterial({ color: 0xdaa520, roughness: 0.25, metalness: 0.85 });
    for (const bx of [-1.8, 1.8]) {
      const bellChain = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8), bellMat);
      bellChain.position.set(bx, floorY + sanctumH - 1.6, sanctumZ + 1.5);
      sanctumInteriorGroup.add(bellChain);

      const bellDome = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.6, 12), bellMat);
      bellDome.position.set(bx, floorY + sanctumH - 3.2, sanctumZ + 1.5);
      bellDome.rotation.x = Math.PI;
      sanctumInteriorGroup.add(bellDome);
    }

    // Glowing Traditional Brass Diyas (Oil lamps) flanking the Lingam
    for (const dx of [-2.8, 2.8]) {
      const lampStand = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.35, 1.2, 12), bellMat);
      lampStand.position.set(dx, floorY + 0.6, sanctumZ);
      sanctumInteriorGroup.add(lampStand);

      const lampFlame = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffd060 })
      );
      lampFlame.position.set(dx, floorY + 1.28, sanctumZ);
      sanctumInteriorGroup.add(lampFlame);
    }

    // Warm Devotional Interior Sanctum Point Light
    const sanctumGlow = new THREE.PointLight(0xffaa44, 3.5, 20);
    sanctumGlow.position.set(0, floorY + 3.2, sanctumZ);
    sanctumGlow.castShadow = true;
    sanctumInteriorGroup.add(sanctumGlow);

    root.add(sanctumInteriorGroup);

    // -------------------------------------------------------------
    // 3. HOLLOW WALKABLE MANDAPA (Assembly Hall with Sloping Roof)
    // -------------------------------------------------------------
    const mandapaW = 16;
    const mandapaH = 9.5;
    const mandapaD = 18;
    const mandapaZ = 6;

    // Mandapa Side Walls (Left & Right)
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

    // Mandapa Front Wall with Open Entryway Arch
    const mDoorW = 5.2;
    const mDoorH = 6.5;
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

    // Carved Stone Pillars inside the Mandapa flanking the central walk aisle
    const pillarMat = matStone;
    for (const px of [-4.2, 4.2]) {
      for (const pz of [mandapaZ - 4, mandapaZ + 4]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, mandapaH - 0.5, 12), pillarMat);
        pillar.position.set(px, floorY + (mandapaH - 0.5) / 2, pz);
        pillar.castShadow = true;
        root.add(pillar);

        // Capital bracket
        const cap = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 1.6), pillarMat);
        cap.position.set(px, floorY + mandapaH - 0.4, pz);
        root.add(cap);
      }
    }

    // Mandapa Ceiling Light
    const mandapaLight = new THREE.PointLight(0xffa550, 2.6, 22);
    mandapaLight.position.set(0, floorY + mandapaH - 1.5, mandapaZ);
    root.add(mandapaLight);

    // Sloping Gable Stone Roof (Traditional Himalayan stone slab roofing)
    const roofRoofH = 5.5;
    const roofGeo = this.createGableRoofGeometry(mandapaW + 2.5, roofRoofH, mandapaD + 2);
    const roof = new THREE.Mesh(roofGeo, matRoof);
    roof.position.set(0, floorY + mandapaH + roofRoofH / 2, mandapaZ);
    roof.castShadow = true;
    roof.receiveShadow = true;
    root.add(roof);

    // -------------------------------------------------------------
    // 4. FRONT ENTRANCE PORCH & ARDHA-MANDAPA (OPEN WALKWAY)
    // -------------------------------------------------------------
    const porchW = 10;
    const porchH = 7.5;
    const porchD = 6;
    const porchZ = 18;

    // Porch Side Walls
    const pWallL = new THREE.Mesh(new THREE.BoxGeometry(wallThick, porchH, porchD), matStone);
    pWallL.position.set(-porchW / 2 + wallThick / 2, floorY + porchH / 2, porchZ);
    pWallL.castShadow = true;
    root.add(pWallL);

    const pWallR = new THREE.Mesh(new THREE.BoxGeometry(wallThick, porchH, porchD), matStone);
    pWallR.position.set(porchW / 2 - wallThick / 2, floorY + porchH / 2, porchZ);
    pWallR.castShadow = true;
    root.add(pWallR);

    const porchRoof = new THREE.Mesh(
      this.createGableRoofGeometry(porchW + 2, 3.2, porchD + 1.5),
      matRoof
    );
    porchRoof.position.set(0, floorY + porchH + 1.6, porchZ);
    porchRoof.castShadow = true;
    root.add(porchRoof);

    // -------------------------------------------------------------
    // PHASES 2, 3, 4: ARCHITECTURAL DETAILS, NANDI STATUE & STEPS
    // -------------------------------------------------------------
    if (isDetail) {
      // 1. Large Stone Entrance Steps (Sopana flight of steps in front)
      const stepCount = 8;
      const stepW = 12;
      const stepTotalD = 8;
      for (let s = 0; s < stepCount; s++) {
        const sy = (s / stepCount) * floorY;
        const sz = plinthD / 2 + ((stepCount - s) / stepCount) * stepTotalD;
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(stepW, floorY / stepCount + 0.05, stepTotalD / stepCount),
          matStone
        );
        step.position.set(0, sy + (floorY / stepCount) / 2, sz);
        step.receiveShadow = true;
        step.castShadow = true;
        root.add(step);
      }

      // 2. Carved Open Doorway Portal Frame & Torana surround
      const doorPostL = new THREE.Mesh(new THREE.BoxGeometry(0.9, 6.8, 0.8), matStone);
      doorPostL.position.set(-2.8, floorY + 3.4, porchZ + porchD / 2);
      doorPostL.castShadow = true;
      root.add(doorPostL);

      const doorPostR = new THREE.Mesh(new THREE.BoxGeometry(0.9, 6.8, 0.8), matStone);
      doorPostR.position.set(2.8, floorY + 3.4, porchZ + porchD / 2);
      doorPostR.castShadow = true;
      root.add(doorPostR);

      const doorLintel = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.9, 0.9), matStone);
      doorLintel.position.set(0, floorY + 6.8 + 0.45, porchZ + porchD / 2);
      doorLintel.castShadow = true;
      root.add(doorLintel);

      // 3. Monolithic Stone Nandi Statue (Seated bull facing temple entrance)
      const nandiGroup = this.createNandiStatue(matNandi);
      nandiGroup.position.set(0, 0, plinthD / 2 + stepTotalD + 8); // Courtyard in front of steps
      root.add(nandiGroup);

      // Nandi canopy / open stone pavilion shelter
      const nandiPavilion = this.createNandiPavilion(matStone, matRoof);
      nandiPavilion.position.set(0, 0, plinthD / 2 + stepTotalD + 8);
      root.add(nandiPavilion);

      // 4. Parapet Stone Balustrade around plinth
      [-plinthW / 2 + 0.5, plinthW / 2 - 0.5].forEach((bx) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.2, plinthD - 2), matStone);
        rail.position.set(bx, floorY + 0.6, 0);
        rail.castShadow = true;
        root.add(rail);
      });
    }

    return root;
  }

  /**
   * Helper: Creates stepped pyramid/conical Shikhara geometry for Kedarnath
   */
  createKedarnathShikharaGeometry(baseWidth, height, segments = 16) {
    const points = [];
    const steps = 18;
    const r = baseWidth * 0.5;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * height;
      // Gently tapering parabolic curve
      const currR = r * (1.0 - 0.65 * Math.pow(t, 1.4));
      points.push(new THREE.Vector2(Math.max(0.01, currR), y));
    }
    return new THREE.LatheGeometry(points, segments);
  }

  /**
   * Helper: Creates pitched triangular gable roof
   */
  createGableRoofGeometry(width, height, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, 0);
    shape.lineTo(0, height);
    shape.lineTo(width / 2, 0);
    shape.closePath();

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: false
    };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
  }

  /**
   * Monolithic carved Stone Nandi Bull statue
   */
  createNandiStatue(matStone) {
    const group = new THREE.Group();
    group.name = 'NandiStatue';

    // Stone pedestal
    const pedestal = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.2, 6.2), matStone);
    pedestal.position.y = 0.6;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    group.add(pedestal);

    // Recumbent Bull body
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, 4.4), matStone);
    body.position.y = 1.2 + 0.9;
    body.castShadow = true;
    group.add(body);

    // Hump (Kakuda)
    const hump = new THREE.Mesh(new THREE.SphereGeometry(0.8, 10, 10), matStone);
    hump.position.set(0, 1.2 + 1.9, -0.6);
    hump.castShadow = true;
    group.add(hump);

    // Head facing temple entrance (north / negative Z)
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.9, 1.6, 8), matStone);
    head.rotation.x = Math.PI / 3;
    head.position.set(0, 1.2 + 1.8, -2.4);
    head.castShadow = true;
    group.add(head);

    // Horns & Ears
    [-0.7, 0.7].forEach((hx) => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.7, 6), matStone);
      horn.position.set(hx, 1.2 + 2.5, -2.2);
      horn.rotation.z = hx > 0 ? -0.4 : 0.4;
      group.add(horn);
    });

    // Brass bell garland around neck
    const garland = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.15, 6, 16),
      matStone
    );
    garland.rotation.x = Math.PI / 4;
    garland.position.set(0, 1.2 + 1.4, -1.8);
    group.add(garland);

    return group;
  }

  /**
   * Open stone canopy pavilion over Nandi
   */
  createNandiPavilion(matStone, matRoof) {
    const group = new THREE.Group();

    // 4 stone corner pillars
    const postCoords = [
      { x: -2.8, z: -3.8 }, { x: 2.8, z: -3.8 },
      { x: -2.8, z: 3.8 },  { x: 2.8, z: 3.8 }
    ];
    postCoords.forEach((pc) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.65, 5.2, 0.65), matStone);
      pillar.position.set(pc.x, 2.6, pc.z);
      pillar.castShadow = true;
      group.add(pillar);
    });

    // Roof canopy
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(4.8, 2.4, 4), matRoof);
    canopy.position.y = 5.2 + 1.2;
    canopy.rotation.y = Math.PI / 4;
    canopy.castShadow = true;
    group.add(canopy);

    return group;
  }

  /**
   * Phase 4: Snow-covered Himalayan Mountain Peaks (Kedarnath Peak), Glacial Terrain, Stone Pathway
   */
  buildHimalayanEnvironment() {
    const group = new THREE.Group();
    group.name = 'KedarnathHimalayas_Phase4';

    // 1. High Alpine Valley Ground (Mandakini glacial valley with gravel and stone)
    const groundGeo = new THREE.PlaneGeometry(360, 360);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x424548, // Alpine rocky slate soil
      roughness: 0.88,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, 0);
    ground.receiveShadow = true;
    group.add(ground);

    // 2. Patches of Perennial Mountain Snow
    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xf4f7fa,
      roughness: 0.45,
      metalness: 0.08
    });

    const snowPatches = [
      { x: -60, z: -70, w: 110, d: 85 },
      { x: 55, z: -85, w: 120, d: 90 },
      { x: -80, z: 30, w: 75, d: 65 },
      { x: 75, z: 45, w: 85, d: 70 }
    ];
    snowPatches.forEach((sp) => {
      const sMesh = new THREE.Mesh(new THREE.PlaneGeometry(sp.w, sp.d), snowMat);
      sMesh.rotation.x = -Math.PI / 2;
      sMesh.position.set(sp.x, 0.04, sp.z);
      sMesh.receiveShadow = true;
      group.add(sMesh);
    });

    // 3. Towering Snow-Covered Kedarnath Mountain Peaks (Kedar Dome & Bharatkhand massif backdrop)
    const peakMat = new THREE.MeshStandardMaterial({
      color: 0xedf1f5, // Pure glacial snow and exposed grey rock
      roughness: 0.5,
      metalness: 0.06
    });

    const mountainPeaks = [
      // Monumental Central Kedarnath Peak (Towering behind temple)
      { x: 0, y: 85, z: -140, r: 85, h: 170, sy: 1.2 },
      // Flanking Kedar Dome massif (West)
      { x: -110, y: 75, z: -120, r: 75, h: 150, sy: 1.1 },
      // East Ridge Peak
      { x: 110, y: 75, z: -120, r: 75, h: 150, sy: 1.1 },
      // Distant surrounding mountain flanks
      { x: -160, y: 55, z: -40, r: 60, h: 110, sy: 0.9 },
      { x: 160, y: 55, z: -40, r: 60, h: 110, sy: 0.9 }
    ];

    mountainPeaks.forEach((mp) => {
      const peakGeo = new THREE.ConeGeometry(mp.r, mp.h, 7);
      const peakMesh = new THREE.Mesh(peakGeo, peakMat);
      peakMesh.scale.set(1.0, mp.sy, 0.85);
      peakMesh.position.set(mp.x, mp.y, mp.z);
      peakMesh.rotation.y = Math.PI / 5;
      peakMesh.castShadow = true;
      peakMesh.receiveShadow = true;
      group.add(peakMesh);
    });

    // 4. Natural Paved Stone Pilgrim Pathway
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0x5a5d62,
      roughness: 0.75
    });
    const path = new THREE.Mesh(new THREE.PlaneGeometry(12, 140), pathMat);
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0.08, 105);
    path.receiveShadow = true;
    group.add(path);

    // 5. Traditional Buddhist / Himalayan Prayer Flag Poles along the path
    const flagColors = [0x2255aa, 0xffffff, 0xdd2222, 0x228833, 0xeebb22]; // Blue, White, Red, Green, Yellow
    const flagPoleX = [-14, 14];
    for (let pz = 45; pz <= 125; pz += 35) {
      flagPoleX.forEach((px) => {
        const pole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.14, 10, 6),
          new THREE.MeshStandardMaterial({ color: 0x2d241d })
        );
        pole.position.set(px, 5, pz);
        group.add(pole);

        // Clustered prayer flags fluttering
        flagColors.forEach((fc, fi) => {
          const fMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1.6, 0.8),
            new THREE.MeshStandardMaterial({ color: fc, side: THREE.DoubleSide })
          );
          fMesh.position.set(px + 0.8, 9.2 - fi * 1.1, pz);
          group.add(fMesh);
        });
      });
    }

    return group;
  }

  /**
   * Lighting:
   * Phases 1-3: Clean Studio Lighting
   * Phase 4: Soft Morning Himalayan Sunlight with Alpine Mountain Haze
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `KedarnathLighting_Phase${phase}`;

    if (phase === 4) {
      // Crisp Alpine Morning Sky (Deep high-altitude blue fading to pure white mountain haze)
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#1c5b8c');   // High altitude alpine blue
      grad.addColorStop(0.5, '#689bc2'); // Mountain azure
      grad.addColorStop(0.85, '#d6e4f0'); // Glacial morning mist
      grad.addColorStop(1, '#ffffff');   // Snow ridge haze
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0xd1dfec, 0.0022);

      // Soft Morning High-Altitude Sun (Angled from east over snowy ridges)
      const sun = new THREE.DirectionalLight(0xfffaed, 2.6);
      sun.position.set(65, 55, 60);
      sun.castShadow = true;
      sun.shadow.mapSize.width = 2048;
      sun.shadow.mapSize.height = 2048;
      const d = 100;
      sun.shadow.camera.left = -d;
      sun.shadow.camera.right = d;
      sun.shadow.camera.top = d;
      sun.shadow.camera.bottom = -d;
      sun.shadow.bias = -0.0003;
      lightGroup.add(sun);

      // Snow reflection bounce (high albedo white-blue bounce from glaciers)
      const hemi = new THREE.HemisphereLight(0xcfe2f5, 0x48525e, 1.4);
      hemi.position.set(0, 70, 0);
      lightGroup.add(hemi);

      // Back fill from snowy peaks
      const backFill = new THREE.DirectionalLight(0xa5c4e2, 0.8);
      backFill.position.set(-50, 40, -60);
      lightGroup.add(backFill);

    } else {
      scene.fog = null;
      scene.background = new THREE.Color(phase === 1 ? 0x18191c : 0x141518);

      const key = new THREE.DirectionalLight(0xfff5ea, phase === 1 ? 2.3 : 2.0);
      key.position.set(45, 65, 55);
      key.castShadow = true;
      key.shadow.mapSize.width = 1024;
      key.shadow.mapSize.height = 1024;
      const d = 70;
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

export const kedarnathTempleBuilder = new KedarnathTempleBuilder();
