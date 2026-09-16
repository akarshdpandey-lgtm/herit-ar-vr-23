import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Hampi Ruins & Stone Chariot (Vijayanagara Empire, Karnataka)
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   Ruined temple architecture: a pillared hall (mandapa) with rows of stone columns,
 *   and a separate stone chariot (rath) structure nearby, partially weathered/broken.
 * Phase 2 — Architectural Detailing:
 *   Carved capital details on pillar tops, broken/missing sections on pillars for ruin effect,
 *   stone wheel details on the chariot base, and scattered rubble around the structure.
 * Phase 3 — Material & Texture (Advanced):
 *   Rough weathered granite texture in grey-brown tones, moss and lichen patches in shaded
 *   areas, cracks, and erosion detail on exposed edges.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Rocky boulder-strewn landscape with dry golden grass and scattered monolithic boulders.
 *   Golden evening light with long dramatic shadows. Photorealistic render.
 */
export class HampiRuinsBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay Massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.clayGranite = new THREE.MeshStandardMaterial({
      color: 0x767067,
      roughness: 0.8,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayPlinth = new THREE.MeshStandardMaterial({
      color: 0x5e5850,
      roughness: 0.85,
      flatShading: true
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Detailing Clay
    // -------------------------------------------------------------
    this.materials.refinedGranite = new THREE.MeshStandardMaterial({
      color: 0x726c62,
      roughness: 0.65,
      metalness: 0.06,
      flatShading: false
    });

    // -------------------------------------------------------------
    // Phase 3: Advanced Weathered Granite & Chariot Textures
    // -------------------------------------------------------------
    const graniteTex = textureGenerator.getHampiWeatheredGraniteTexture();
    const chariotWheelTex = textureGenerator.getHampiChariotStoneTexture();

    this.materials.texturedGranite = new THREE.MeshStandardMaterial({
      map: graniteTex,
      roughness: 0.72,
      metalness: 0.05,
      bumpMap: graniteTex,
      bumpScale: 0.035
    });

    this.materials.chariotWheel = new THREE.MeshStandardMaterial({
      map: chariotWheelTex,
      roughness: 0.68,
      metalness: 0.08,
      bumpMap: chariotWheelTex,
      bumpScale: 0.03
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `HampiRuins_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matStone = isTextured
      ? this.materials.texturedGranite
      : (isDetail ? this.materials.refinedGranite : this.materials.clayGranite);

    const matPlinth = isTextured
      ? this.materials.texturedGranite
      : (isDetail ? this.materials.refinedGranite : this.materials.clayPlinth);

    const matWheel = isTextured ? this.materials.chariotWheel : matStone;

    // -------------------------------------------------------------
    // 1. TEMPLE COURTYARD GRANITE PLINTH (Maha-Mandapa Podium)
    // -------------------------------------------------------------
    const plinthW = 56;
    const plinthH = 2.4;
    const plinthD = 44;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(plinthW, plinthH, plinthD), matPlinth);
    plinth.position.set(-18, plinthH / 2, -10);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    root.add(plinth);

    // Molded plinth course
    const plinthUpper = new THREE.Mesh(
      new THREE.BoxGeometry(plinthW - 2, 1.2, plinthD - 2),
      matPlinth
    );
    plinthUpper.position.set(-18, plinthH + 0.6, -10);
    plinthUpper.castShadow = true;
    root.add(plinthUpper);

    const floorY = plinthH + 1.2; // 3.6m

    // -------------------------------------------------------------
    // 2. PILLARED HALL (MANDAPA) WITH MULTI-ROW STONE COLUMNS
    // -------------------------------------------------------------
    // 5 rows x 6 columns grid (some intact, some broken/weathered)
    const rows = 5;
    const cols = 6;
    const colSpacingX = 8.5;
    const colSpacingZ = 7.5;
    const colH = 10;

    // Determine broken pillar states for ruin effect
    const isBroken = (r, c) => {
      // Intentionally broken pillars on outer edges and collapsed bay
      if ((r === 0 && c === 1) || (r === 1 && c === 0) || (r === 4 && c === 4) || (r === 3 && c === 5)) return 'stump';
      if ((r === 0 && c === 4) || (r === 4 && c === 1)) return 'half';
      if (r === 0 && c === 0) return 'missing';
      return 'full';
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const state = isBroken(r, c);
        if (state === 'missing') continue;

        const cx = -18 - ((cols - 1) * colSpacingX) / 2 + c * colSpacingX;
        const cz = -10 - ((rows - 1) * colSpacingZ) / 2 + r * colSpacingZ;

        let pillarActualH = colH;
        if (state === 'stump') pillarActualH = 2.8 + Math.random() * 1.5;
        else if (state === 'half') pillarActualH = 5.5 + Math.random() * 2.0;

        if (isPhase1 || state !== 'full') {
          // Low-poly or broken column shaft
          const colGeo = new THREE.CylinderGeometry(0.55, 0.65, pillarActualH, isPhase1 ? 6 : 10);
          const colMesh = new THREE.Mesh(colGeo, matStone);
          colMesh.position.set(cx, floorY + pillarActualH / 2, cz);
          colMesh.castShadow = true;
          colMesh.receiveShadow = true;
          root.add(colMesh);
        } else {
          // Phase 2-4: Elaborate Vijayanagara Yali / Musical Pillar
          const compositeCol = this.createYaliPillar(colH, matStone);
          compositeCol.position.set(cx, floorY, cz);
          root.add(compositeCol);
        }
      }
    }

    // Surviving roof beams & fractured stone slabs
    const roofSlabConfigs = [
      { x: -18, z: -10, w: 28, d: 22 },
      { x: -28, z: -14, w: 16, d: 14 }
    ];
    roofSlabConfigs.forEach((rc) => {
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(rc.w, 1.4, rc.d),
        matStone
      );
      slab.position.set(rc.x, floorY + colH + 0.7, rc.z);
      slab.castShadow = true;
      root.add(slab);
    });

    // -------------------------------------------------------------
    // 3. MONOLITHIC STONE CHARIOT (RATH / GARUDA SHRINE)
    // -------------------------------------------------------------
    const chariotGroup = new THREE.Group();
    chariotGroup.name = 'StoneChariot';
    const chariotX = 26; // Placed across the open courtyard
    const chariotZ = 4;

    chariotGroup.position.set(chariotX, 0, chariotZ);

    // Chariot stepped base platform
    const cBase = new THREE.Mesh(new THREE.BoxGeometry(16, 2.2, 22), matPlinth);
    cBase.position.y = 1.1;
    cBase.castShadow = true;
    cBase.receiveShadow = true;
    chariotGroup.add(cBase);

    // Chariot shrine sanctum body
    const cShrine = new THREE.Mesh(new THREE.BoxGeometry(11, 7.5, 14), matStone);
    cShrine.position.y = 2.2 + 3.75;
    cShrine.castShadow = true;
    chariotGroup.add(cShrine);

    // Chariot Gopura / Dravidian miniature stepped tower top
    const cTowerH = 8;
    const cTower = new THREE.Mesh(
      new THREE.ConeGeometry(6.5, cTowerH, 4),
      matStone
    );
    cTower.position.set(0, 2.2 + 7.5 + cTowerH / 2, 0);
    cTower.rotation.y = Math.PI / 4;
    cTower.castShadow = true;
    chariotGroup.add(cTower);

    // Finial pot
    const cKalasha = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.8, 2.2, 8),
      matStone
    );
    cKalasha.position.set(0, 2.2 + 7.5 + cTowerH + 1.1, 0);
    chariotGroup.add(cKalasha);

    // 4 Monolithic Stone Wheels (Rath Chakras)
    const wheelPositions = [
      { x: -8.3, z: -6.5 }, { x: 8.3, z: -6.5 },
      { x: -8.3, z: 6.5 },  { x: 8.3, z: 6.5 }
    ];

    wheelPositions.forEach((wp) => {
      const wheelR = 2.6;
      const wheelThick = 0.9;
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(wheelR, wheelR, wheelThick, isPhase1 ? 10 : 24),
        matWheel
      );
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wp.x, 2.6, wp.z);
      wheel.castShadow = true;
      chariotGroup.add(wheel);

      if (isDetail) {
        // Carved stone axle hub
        const hub = new THREE.Mesh(
          new THREE.CylinderGeometry(0.7, 0.7, wheelThick + 0.6, 12),
          matStone
        );
        hub.rotation.z = Math.PI / 2;
        hub.position.set(wp.x, 2.6, wp.z);
        chariotGroup.add(hub);
      }
    });

    // Guard Elephants flanking the chariot steps
    if (isDetail) {
      [-3.5, 3.5].forEach((ex) => {
        const elephant = this.createStoneElephant(matStone);
        elephant.position.set(ex, 2.2, 11.5);
        chariotGroup.add(elephant);
      });
    }

    root.add(chariotGroup);

    // -------------------------------------------------------------
    // PHASES 2, 3, 4: SCATTERED STONE RUBBLE & FALLEN BLOCKS
    // -------------------------------------------------------------
    if (isDetail) {
      const rubbleCoords = [
        { x: -35, z: 12, s: 2.2 }, { x: -28, z: 16, s: 1.6 },
        { x: -14, z: 14, s: 2.8 }, { x: 4, z: -18, s: 2.0 },
        { x: 8, z: 12, s: 1.8 },   { x: 14, z: -8, s: 2.4 },
        { x: 20, z: 22, s: 1.5 },  { x: -6, z: -25, s: 2.6 },
        { x: -44, z: -8, s: 2.1 }, { x: 38, z: 18, s: 1.7 }
      ];

      rubbleCoords.forEach((rc) => {
        const rubble = new THREE.Mesh(
          new THREE.DodecahedronGeometry(rc.s, 0),
          matStone
        );
        rubble.position.set(rc.x, rc.s * 0.7, rc.z);
        rubble.rotation.set(Math.random(), Math.random(), Math.random());
        rubble.castShadow = true;
        rubble.receiveShadow = true;
        root.add(rubble);
      });
    }

    return root;
  }

  /**
   * Vijayanagara Yali / Composite musical temple column
   */
  createYaliPillar(height, matStone) {
    const group = new THREE.Group();

    // Plinth base
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 1.6), matStone);
    base.position.y = 0.7;
    base.castShadow = true;
    group.add(base);

    // Main column shaft
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(1.1, height - 2.8, 1.1), matStone);
    shaft.position.y = 1.4 + (height - 2.8) / 2;
    shaft.castShadow = true;
    group.add(shaft);

    // Attached rearing Yali (mythical leogryph) relief silhouette
    const yaliBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.45, height * 0.5, 6),
      matStone
    );
    yaliBody.position.set(0.7, 1.4 + height * 0.28, 0);
    yaliBody.rotation.z = -0.15;
    yaliBody.castShadow = true;
    group.add(yaliBody);

    // Corbeled bracket capital (Pushpa-potika flower pendent)
    const cap = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 2.2), matStone);
    cap.position.y = height - 0.6;
    cap.castShadow = true;
    group.add(cap);

    return group;
  }

  /**
   * Stone elephant sculpture guiding the chariot
   */
  createStoneElephant(matStone) {
    const group = new THREE.Group();

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 3.2), matStone);
    body.position.y = 1.6;
    body.castShadow = true;
    group.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 8), matStone);
    head.position.set(0, 2.2, 1.8);
    head.castShadow = true;
    group.add(head);

    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.15, 1.6, 6), matStone);
    trunk.position.set(0, 1.3, 2.4);
    trunk.rotation.x = 0.4;
    group.add(trunk);

    return group;
  }

  /**
   * Phase 4: Boulder-strewn rocky landscape, dry golden grass, Hampi hills terrain
   */
  buildHampiBoulderLandscape() {
    const group = new THREE.Group();
    group.name = 'HampiLandscape_Phase4';

    // 1. Vast Deccan Plateau ground (Red laterite soil with dry arid patches)
    const groundGeo = new THREE.PlaneGeometry(320, 320);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x9e7352, // Warm reddish-tan Deccan soil
      roughness: 0.9,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, 0);
    ground.receiveShadow = true;
    group.add(ground);

    // 2. Patches of Dry Golden Grass / Savanna Scrub
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0xc89e5a,
      roughness: 0.85
    });
    const grassPatches = [
      { x: -50, z: -40, w: 90, d: 70 },
      { x: 45, z: -50, w: 80, d: 65 },
      { x: 10, z: 65, w: 120, d: 60 }
    ];
    grassPatches.forEach(gp => {
      const gMesh = new THREE.Mesh(new THREE.PlaneGeometry(gp.w, gp.d), grassMat);
      gMesh.rotation.x = -Math.PI / 2;
      gMesh.position.set(gp.x, 0.02, gp.z);
      gMesh.receiveShadow = true;
      group.add(gMesh);
    });

    // 3. Iconic Hampi Granitic Boulder Hills & Stacked Rock Formations (Hemakuta / Matanga hills)
    const boulderMat = new THREE.MeshStandardMaterial({
      color: 0x7a6e60,
      roughness: 0.85,
      bumpScale: 0.04
    });

    const hillBoulders = [
      // Left / North-West Ridge
      { x: -85, y: 14, z: -70, r: 24, sy: 1.2 },
      { x: -65, y: 18, z: -90, r: 28, sy: 1.4 },
      { x: -105, y: 12, z: -40, r: 20, sy: 0.9 },
      // Right / North-East Ridge
      { x: 80, y: 16, z: -75, r: 26, sy: 1.3 },
      { x: 105, y: 12, z: -45, r: 22, sy: 1.0 },
      { x: 75, y: 22, z: -105, r: 32, sy: 1.5 },
      // Balanced boulders in foreground
      { x: -55, y: 5, z: 35, r: 9, sy: 0.8 },
      { x: -48, y: 11, z: 32, r: 6.5, sy: 1.1 }, // Stacked balanced rock
      { x: 55, y: 6, z: 45, r: 10, sy: 0.9 },
      { x: 62, y: 4, z: 25, r: 7.5, sy: 0.8 }
    ];

    hillBoulders.forEach((b) => {
      const bGeo = new THREE.DodecahedronGeometry(b.r, 1);
      const bMesh = new THREE.Mesh(bGeo, boulderMat);
      bMesh.scale.set(1.1, b.sy, 0.95);
      bMesh.position.set(b.x, b.y, b.z);
      bMesh.rotation.set(Math.random(), Math.random(), Math.random());
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      group.add(bMesh);
    });

    // 4. Dusty ancient stone courtyard flagstones around Chariot
    const flagMat = new THREE.MeshStandardMaterial({
      color: 0x827566,
      roughness: 0.78
    });
    const flagMesh = new THREE.Mesh(new THREE.PlaneGeometry(90, 75), flagMat);
    flagMesh.rotation.x = -Math.PI / 2;
    flagMesh.position.set(6, 0.04, 2);
    flagMesh.receiveShadow = true;
    group.add(flagMesh);

    return group;
  }

  /**
   * Lighting:
   * Phases 1-3: Clean Studio Lighting
   * Phase 4: Golden Evening Sunset (Amber-gold low sun with long dramatic shadows)
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `HampiLighting_Phase${phase}`;

    if (phase === 4) {
      // Golden Hour Evening Sky Gradient (Warm Amber -> Golden Dusky Horizon)
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#3b6e8c');   // Evening sky blue
      grad.addColorStop(0.5, '#d98b43'); // Deep golden amber
      grad.addColorStop(0.8, '#c9612c'); // Fiery orange dusk
      grad.addColorStop(1, '#66281a');   // Deep terracotta horizon
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0xc48256, 0.0028);

      // Low Golden Evening Sun (Directional Light at 18° elevation from west)
      const sun = new THREE.DirectionalLight(0xffb066, 2.7);
      sun.position.set(80, 26, 65);
      sun.castShadow = true;
      sun.shadow.mapSize.width = 2048;
      sun.shadow.mapSize.height = 2048;
      const d = 110;
      sun.shadow.camera.left = -d;
      sun.shadow.camera.right = d;
      sun.shadow.camera.top = d;
      sun.shadow.camera.bottom = -d;
      sun.shadow.bias = -0.0003;
      lightGroup.add(sun);

      // Warm sky bounce
      const hemi = new THREE.HemisphereLight(0xffc58a, 0x5a3c26, 1.25);
      hemi.position.set(0, 60, 0);
      lightGroup.add(hemi);

      // Soft evening purple back-fill
      const backFill = new THREE.DirectionalLight(0x736885, 0.7);
      backFill.position.set(-50, 25, -40);
      lightGroup.add(backFill);

    } else {
      scene.fog = null;
      scene.background = new THREE.Color(phase === 1 ? 0x18191c : 0x141518);

      const key = new THREE.DirectionalLight(0xfff5ea, phase === 1 ? 2.3 : 2.0);
      key.position.set(45, 65, 55);
      key.castShadow = true;
      key.shadow.mapSize.width = 1024;
      key.shadow.mapSize.height = 1024;
      const d = 75;
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

      const grid = new THREE.GridHelper(160, 60, 0xd4af37, 0x2e323b);
      grid.position.y = -0.01;
      lightGroup.add(grid);
    }

    return lightGroup;
  }
}

export const hampiRuinsBuilder = new HampiRuinsBuilder();
