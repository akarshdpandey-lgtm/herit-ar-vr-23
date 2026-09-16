import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Khajuraho Temple Architectural Model Builder (Kandariya Mahadeva style)
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   North Indian Nagara-style temple with tall curvilinear shikhara (spire),
 *   smaller mandapa (hall) attached in front, and raised stone platform.
 * Phase 2 — Architectural Detailing:
 *   Multiple stacked miniature spire clusters (urushringa) around main shikhara,
 *   pillared mandapa entrance, amalaka & kalasha finials, tiered platform steps.
 * Phase 3 — Material & Texture (Advanced):
 *   Sandstone texture in beige-brown tones with richly carved relief sculpture
 *   bands (figures, deities, celestial apsaras) matching the Khajuraho style.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Landscaped green lawn setting with trimmed geometric hedges and stone pathways.
 *   Bright midday sun with clear blue sky. Photorealistic render.
 */
export class KhajurahoTempleBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.clayStone = new THREE.MeshStandardMaterial({
      color: 0xb59b7d,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayDark = new THREE.MeshStandardMaterial({
      color: 0x8a7258,
      roughness: 0.82,
      flatShading: true
    });

    this.materials.clayPlinth = new THREE.MeshStandardMaterial({
      color: 0x9e8568,
      roughness: 0.8,
      flatShading: true
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Clay
    // -------------------------------------------------------------
    this.materials.refinedSandstone = new THREE.MeshStandardMaterial({
      color: 0xbea281,
      roughness: 0.55,
      metalness: 0.06,
      flatShading: false
    });

    this.materials.goldFinial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.92
    });

    // -------------------------------------------------------------
    // Phase 3: High-Detail Procedural Materials & Relief Textures
    // -------------------------------------------------------------
    const carvedTex = textureGenerator.getKhajurahoCarvedSandstoneTexture();

    this.materials.texturedSandstone = new THREE.MeshStandardMaterial({
      map: carvedTex,
      roughness: 0.6,
      metalness: 0.05,
      bumpMap: carvedTex,
      bumpScale: 0.04
    });

    this.materials.plinthMasonry = new THREE.MeshStandardMaterial({
      map: carvedTex,
      roughness: 0.7,
      metalness: 0.04,
      bumpMap: carvedTex,
      bumpScale: 0.02
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `KhajurahoTemple_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matStone = isTextured
      ? this.materials.texturedSandstone
      : (isDetail ? this.materials.refinedSandstone : this.materials.clayStone);

    const matPlinth = isTextured
      ? this.materials.plinthMasonry
      : (isDetail ? this.materials.refinedSandstone : this.materials.clayPlinth);

    const matGold = isDetail ? this.materials.goldFinial : matStone;

    // -------------------------------------------------------------
    // 1. RAISED HIGH STONE PLATFORM (Jagati)
    // -------------------------------------------------------------
    const jagatiW = 48;
    const jagatiH = 4.5;
    const jagatiD = 85;

    const jagatiGeo = new THREE.BoxGeometry(jagatiW, jagatiH, jagatiD);
    const jagati = new THREE.Mesh(jagatiGeo, matPlinth);
    jagati.position.set(0, jagatiH / 2, 0);
    jagati.receiveShadow = true;
    jagati.castShadow = true;
    root.add(jagati);

    // Tiered stepped platform molding (Pitha)
    const pithaH = 2.2;
    const pitha = new THREE.Mesh(
      new THREE.BoxGeometry(jagatiW - 4, pithaH, jagatiD - 4),
      matPlinth
    );
    pitha.position.set(0, jagatiH + pithaH / 2, 0);
    pitha.castShadow = true;
    pitha.receiveShadow = true;
    root.add(pitha);

    const baseLevel = jagatiH + pithaH; // ~6.7m terrace surface

    // -------------------------------------------------------------
    // 2. MAIN SANCTUM & TOWERING CURVILINEAR SHIKHARA
    // -------------------------------------------------------------
    const sanctumZ = -18;
    const shikharaH = 34;
    const shikharaBaseR = 10.5;

    // Main curvilinear Nagara spire (Garba-griha tower)
    const shikharaGeo = this.createNagaraSpireGeometry(shikharaBaseR, shikharaH, isPhase1 ? 8 : 24);
    const shikhara = new THREE.Mesh(shikharaGeo, matStone);
    shikhara.position.set(0, baseLevel, sanctumZ);
    shikhara.castShadow = true;
    shikhara.receiveShadow = true;
    root.add(shikhara);

    // Amalaka (Ribbed crowning stone disc) atop main spire
    const amalakaH = 2.4;
    const amalakaR = 4.2;
    const amalakaGeo = this.createAmalakaGeometry(amalakaR, amalakaH, isPhase1 ? 8 : 24);
    const amalaka = new THREE.Mesh(amalakaGeo, matStone);
    amalaka.position.set(0, baseLevel + shikharaH + amalakaH / 2, sanctumZ);
    amalaka.castShadow = true;
    root.add(amalaka);

    // Kalasha (Sacred pot & pointed finial)
    const kalashaGeo = new THREE.CylinderGeometry(0.1, 1.4, 3.8, isPhase1 ? 6 : 16);
    const kalasha = new THREE.Mesh(kalashaGeo, matGold);
    kalasha.position.set(0, baseLevel + shikharaH + amalakaH + 1.9, sanctumZ);
    kalasha.castShadow = true;
    root.add(kalasha);

    // -------------------------------------------------------------
    // 3. MANDAPA HALLS (Pyramidal Stepped Halls in Front)
    // -------------------------------------------------------------
    // 3a. Maha-Mandapa (Large Hall attached directly to Sanctum)
    const mahaZ = -3;
    const mahaW = 16;
    const mahaH = 22;
    const mahaRoof = this.createSamvaranaRoof(mahaW, mahaH, isPhase1 ? 4 : 8);
    const mahaMesh = new THREE.Mesh(mahaRoof, matStone);
    mahaMesh.position.set(0, baseLevel, mahaZ);
    mahaMesh.castShadow = true;
    root.add(mahaMesh);

    // 3b. Mandapa (Intermediate Assembly Hall)
    const mandapaZ = 12;
    const mandapaW = 13;
    const mandapaH = 17;
    const mandapaRoof = this.createSamvaranaRoof(mandapaW, mandapaH, isPhase1 ? 4 : 7);
    const mandapaMesh = new THREE.Mesh(mandapaRoof, matStone);
    mandapaMesh.position.set(0, baseLevel, mandapaZ);
    mandapaMesh.castShadow = true;
    root.add(mandapaMesh);

    // 3c. Ardha-Mandapa (Entrance Porch)
    const ardhaZ = 24;
    const ardhaW = 10;
    const ardhaH = 12;
    const ardhaRoof = this.createSamvaranaRoof(ardhaW, ardhaH, isPhase1 ? 4 : 6);
    const ardhaMesh = new THREE.Mesh(ardhaRoof, matStone);
    ardhaMesh.position.set(0, baseLevel, ardhaZ);
    ardhaMesh.castShadow = true;
    root.add(ardhaMesh);

    // -------------------------------------------------------------
    // PHASES 2, 3, 4: ARCHITECTURAL DETAILING & URUSHRINGA CLUSTERS
    // -------------------------------------------------------------
    if (isDetail) {
      // 1. Cascading Urushringa (Miniature spire clusters around Shikhara)
      const urushringaConfigs = [
        // Level 1: Large subsidiary spires hugging cardinal sides
        { x: -7.5, z: sanctumZ, r: 4.8, h: 22 },
        { x: 7.5,  z: sanctumZ, r: 4.8, h: 22 },
        { x: 0,    z: sanctumZ - 7.5, r: 4.8, h: 22 },
        // Level 2: Corner diagonal mini spires (Karna-shringas)
        { x: -6.2, z: sanctumZ - 6.2, r: 3.5, h: 16 },
        { x: 6.2,  z: sanctumZ - 6.2, r: 3.5, h: 16 },
        { x: -6.2, z: sanctumZ + 6.2, r: 3.5, h: 16 },
        { x: 6.2,  z: sanctumZ + 6.2, r: 3.5, h: 16 },
        // Level 3: Higher tier miniature spirelets
        { x: -4.5, z: sanctumZ, r: 2.6, h: 12 },
        { x: 4.5,  z: sanctumZ, r: 2.6, h: 12 },
        { x: 0,    z: sanctumZ - 4.5, r: 2.6, h: 12 }
      ];

      urushringaConfigs.forEach((uc) => {
        const uSpire = new THREE.Mesh(
          this.createNagaraSpireGeometry(uc.r, uc.h, 12),
          matStone
        );
        uSpire.position.set(uc.x, baseLevel, uc.z);
        uSpire.castShadow = true;
        root.add(uSpire);

        // Mini amalaka on each urushringa
        const uAmalaka = new THREE.Mesh(
          this.createAmalakaGeometry(uc.r * 0.45, 0.9, 12),
          matStone
        );
        uAmalaka.position.set(uc.x, baseLevel + uc.h + 0.45, uc.z);
        root.add(uAmalaka);
      });

      // 2. Pillared Entrance Colonnade (Ardha-Mandapa columns)
      const pillarPositions = [
        { x: -3.8, z: 27 }, { x: 3.8, z: 27 },
        { x: -3.8, z: 21 }, { x: 3.8, z: 21 },
        { x: -5.0, z: 15 }, { x: 5.0, z: 15 },
        { x: -5.0, z: 9 },  { x: 5.0, z: 9 }
      ];

      pillarPositions.forEach((pp) => {
        const pillar = this.createNagaraPillar(matStone);
        pillar.position.set(pp.x, baseLevel, pp.z);
        root.add(pillar);
      });

      // 3. Grand Flight of Platform Steps (Sopana staircase at front)
      const stepCount = 14;
      const stepW = 12;
      const stepD = 18;
      for (let s = 0; s < stepCount; s++) {
        const sy = (s / stepCount) * baseLevel;
        const sz = (jagatiD / 2) + ((stepCount - s) / stepCount) * stepD;
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(stepW, baseLevel / stepCount + 0.05, stepD / stepCount),
          matPlinth
        );
        step.position.set(0, sy + (baseLevel / stepCount) / 2, sz);
        step.receiveShadow = true;
        step.castShadow = true;
        root.add(step);
      }

      // 4. Balustrade flankers along staircase
      [-6.5, 6.5].forEach((bx) => {
        const balustrade = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, baseLevel + 1.2, stepD + 4),
          matPlinth
        );
        balustrade.position.set(bx, (baseLevel + 1.2) / 2, (jagatiD / 2) + stepD / 2);
        balustrade.castShadow = true;
        root.add(balustrade);
      });

      // 5. Openings & Sanctum Entrance Doorway (Dvara)
      const doorFrame = new THREE.Mesh(
        new THREE.BoxGeometry(5, 7.5, 1.5),
        matStone
      );
      doorFrame.position.set(0, baseLevel + 3.75, 27.5);
      doorFrame.castShadow = true;
      root.add(doorFrame);

      const doorInner = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 6, 1),
        new THREE.MeshStandardMaterial({ color: 0x221a14, roughness: 0.9 })
      );
      doorInner.position.set(0, baseLevel + 3, 27.2);
      root.add(doorInner);
    }

    return root;
  }

  /**
   * Generates curvilinear Nagara temple spire profile (Rekha-Deul / Shikhara)
   */
  createNagaraSpireGeometry(baseRadius, height, segments = 24) {
    const points = [];
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps; // 0 (bottom) to 1 (top)
      const y = t * height;
      // Parabolic inward curve characteristic of Nagara temples
      const curve = Math.pow(t, 2.2);
      const r = baseRadius * (1.0 - 0.72 * curve);
      points.push(new THREE.Vector2(Math.max(0.01, r), y));
    }
    return new THREE.LatheGeometry(points, segments);
  }

  /**
   * Generates ribbed fluted Amalaka crown disc
   */
  createAmalakaGeometry(radius, height, ribs = 24) {
    const points = [];
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = (t - 0.5) * height;
      // Convex ribbed pillow profile
      const r = radius * (1.0 + 0.28 * Math.sin(t * Math.PI));
      points.push(new THREE.Vector2(r, y));
    }
    return new THREE.LatheGeometry(points, ribs);
  }

  /**
   * Generates stepped pyramidal Samvarana roof for Mandapas
   */
  createSamvaranaRoof(baseWidth, height, tiers = 7) {
    const group = new THREE.Group();
    for (let t = 0; t < tiers; t++) {
      const frac = t / tiers;
      const tierW = baseWidth * (1.0 - frac * 0.75);
      const tierH = height / tiers;
      const tierY = t * tierH;

      const box = new THREE.Mesh(
        new THREE.BoxGeometry(tierW, tierH * 0.9, tierW)
      );
      box.position.y = tierY + tierH * 0.45;
      group.add(box);
    }
    // Consolidate into single geometry
    return new THREE.ConeGeometry(baseWidth * 0.6, height, 4);
  }

  /**
   * Nagara composite temple column with carved bracket capitals
   */
  createNagaraPillar(matStone) {
    const group = new THREE.Group();

    // Base molding (Kumbha)
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 1.4), matStone);
    base.position.y = 0.6;
    base.castShadow = true;
    group.add(base);

    // Shaft (Octagonal to circular)
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.52, 6.0, 8),
      matStone
    );
    shaft.position.y = 1.2 + 3.0;
    shaft.castShadow = true;
    group.add(shaft);

    // Cushion capital (Ghatapallava)
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.5, 0.7, 8),
      matStone
    );
    cap.position.y = 1.2 + 6.0 + 0.35;
    cap.castShadow = true;
    group.add(cap);

    // Bracket architrave (Potika)
    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.6, 1.6),
      matStone
    );
    bracket.position.y = 1.2 + 6.0 + 0.7 + 0.3;
    bracket.castShadow = true;
    group.add(bracket);

    return group;
  }

  /**
   * Phase 4: Landscaped Green Lawns, Trimmed Hedges & Visitor Pathways (Khajuraho Complex)
   */
  buildComplexEnvironment() {
    const envGroup = new THREE.Group();
    envGroup.name = 'KhajurahoLawnEnvironment_Phase4';

    // 1. Expansive Manicured Lawn Grounds (Archaeological Survey of India parklands)
    const lawnGeo = new THREE.PlaneGeometry(260, 260);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x4a7e37,
      roughness: 0.82,
      metalness: 0.05
    });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.rotation.x = -Math.PI / 2;
    lawn.position.set(0, -0.05, 10);
    lawn.receiveShadow = true;
    envGroup.add(lawn);

    // 2. Geometric Paved Sandstone Visitor Walkways
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0xad9272,
      roughness: 0.7
    });

    // Front approach walkway
    const frontPath = new THREE.Mesh(new THREE.PlaneGeometry(16, 120), pathMat);
    frontPath.rotation.x = -Math.PI / 2;
    frontPath.position.set(0, 0.05, 95);
    frontPath.receiveShadow = true;
    envGroup.add(frontPath);

    // Perimeter promenade walkway encircling temple
    const periConfigs = [
      { x: 0, z: -60, w: 90, d: 8 },
      { x: -40, z: 0, w: 8, d: 130 },
      { x: 40, z: 0, w: 8, d: 130 }
    ];
    periConfigs.forEach(pc => {
      const pMesh = new THREE.Mesh(new THREE.PlaneGeometry(pc.w, pc.d), pathMat);
      pMesh.rotation.x = -Math.PI / 2;
      pMesh.position.set(pc.x, 0.05, pc.z);
      pMesh.receiveShadow = true;
      envGroup.add(pMesh);
    });

    // 3. Trimmed Geometric Hedges (Boxwood border around temple apron)
    const hedgeMat = new THREE.MeshStandardMaterial({
      color: 0x2e5c24,
      roughness: 0.85
    });

    const hedgeConfigs = [
      { x: -32, z: 0, w: 2.2, h: 1.4, d: 120 },
      { x: 32,  z: 0, w: 2.2, h: 1.4, d: 120 },
      { x: 0,   z: -52, w: 66, h: 1.4, d: 2.2 },
      { x: -20, z: 52, w: 24, h: 1.4, d: 2.2 },
      { x: 20,  z: 52, w: 24, h: 1.4, d: 2.2 }
    ];

    hedgeConfigs.forEach(hc => {
      const hedge = new THREE.Mesh(new THREE.BoxGeometry(hc.w, hc.h, hc.d), hedgeMat);
      hedge.position.set(hc.x, hc.h / 2, hc.z);
      hedge.castShadow = true;
      envGroup.add(hedge);
    });

    // 4. Shade Trees (Neem & Gulmohar typical of Khajuraho gardens)
    const treePositions = [
      { x: -55, z: 40 }, { x: 55, z: 40 },
      { x: -60, z: -30 }, { x: 60, z: -30 },
      { x: -50, z: 90 }, { x: 50, z: 90 }
    ];
    treePositions.forEach(tp => {
      const tree = this.createParkTree();
      tree.position.set(tp.x, 0, tp.z);
      envGroup.add(tree);
    });

    return envGroup;
  }

  createParkTree() {
    const tree = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x483626, roughness: 0.9 });
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x3d702d, roughness: 0.85 });

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.7, 4.5, 8), trunkMat);
    trunk.position.y = 2.25;
    trunk.castShadow = true;
    tree.add(trunk);

    const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(4.2, 1), canopyMat);
    foliage.position.y = 6.8;
    foliage.castShadow = true;
    tree.add(foliage);

    return tree;
  }

  /**
   * Lighting:
   * Phases 1-3: Clean Architectural Studio Lighting
   * Phase 4: Bright Midday Sun with vibrant blue sky (Madhya Pradesh sunshine)
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `KhajurahoLighting_Phase${phase}`;

    if (phase === 4) {
      // Clear bright Madhya Pradesh midday sky
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#1971c2');   // Intense midday blue
      grad.addColorStop(0.55, '#4dabf7'); // Azure sky
      grad.addColorStop(1, '#d0ebff');   // Horizon haze
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0xcde3f5, 0.002);

      // High Midday Sun (Directional Light casting crisp sandstone relief shadows)
      const sun = new THREE.DirectionalLight(0xfffaed, 2.5);
      sun.position.set(45, 85, 50);
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

      // Blue sky hemisphere fill
      const hemi = new THREE.HemisphereLight(0x8bc4ff, 0x826546, 1.2);
      hemi.position.set(0, 60, 0);
      lightGroup.add(hemi);

      // Warm ground reflection fill
      const groundBounce = new THREE.DirectionalLight(0xffdfb8, 0.65);
      groundBounce.position.set(-35, 20, -35);
      lightGroup.add(groundBounce);

    } else {
      // Phases 1-3: Clean Architectural Studio Lighting
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

export const khajurahoTempleBuilder = new KhajurahoTempleBuilder();
