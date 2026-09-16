import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Ajanta-Ellora Rock-Cut Cave Temple (Maharashtra)
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   Rock-cut cave temple: massive cliff face with carved entrance, pillared veranda,
 *   and horseshoe-shaped chaitya sun-window above doorway.
 * Phase 2 — Architectural Detailing:
 *   Carved pillar capitals inside veranda, seated Buddha / deity sculpture niches
 *   flanking the entrance, stepped rock-cut pathway leading up to the cave.
 * Phase 3 — Material & Texture (Advanced):
 *   Rough-hewn dark basalt rock texture for cliff face, carved figure and mural
 *   texturing, interior faded fresco-style Buddhist mural paintings on cave walls.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Hillside with gorge valley and river visible below, dry deciduous trees around cliff.
 *   Soft diffused daylight under overhang with warm interior torchlight glow. Photorealistic render.
 */
export class AjantaElloraBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay Massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.clayBasalt = new THREE.MeshStandardMaterial({
      color: 0x3d3a37,
      roughness: 0.78,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayTrim = new THREE.MeshStandardMaterial({
      color: 0x5a554f,
      roughness: 0.7,
      flatShading: true
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Detailing Clay
    // -------------------------------------------------------------
    this.materials.refinedBasalt = new THREE.MeshStandardMaterial({
      color: 0x383533,
      roughness: 0.6,
      metalness: 0.06,
      flatShading: false
    });

    this.materials.refinedBuddha = new THREE.MeshStandardMaterial({
      color: 0x6e655c,
      roughness: 0.45,
      metalness: 0.08,
      flatShading: false
    });

    // -------------------------------------------------------------
    // Phase 3: High-Detail Procedural Basalt & Ancient Fresco Textures
    // -------------------------------------------------------------
    const basaltTex = textureGenerator.getBasaltRockCliffTexture();
    const frescoTex = textureGenerator.getAjantaFrescoMuralTexture();

    this.materials.texturedBasalt = new THREE.MeshStandardMaterial({
      map: basaltTex,
      roughness: 0.75,
      metalness: 0.05,
      bumpMap: basaltTex,
      bumpScale: 0.04
    });

    this.materials.frescoMural = new THREE.MeshStandardMaterial({
      map: frescoTex,
      roughness: 0.65,
      metalness: 0.04,
      bumpMap: frescoTex,
      bumpScale: 0.015
    });

    this.materials.carvedStatue = new THREE.MeshStandardMaterial({
      map: basaltTex,
      roughness: 0.52,
      metalness: 0.08,
      bumpMap: basaltTex,
      bumpScale: 0.02
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `AjantaEllora_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matRock = isTextured
      ? this.materials.texturedBasalt
      : (isDetail ? this.materials.refinedBasalt : this.materials.clayBasalt);

    const matTrim = isTextured
      ? this.materials.texturedBasalt
      : (isDetail ? this.materials.refinedBasalt : this.materials.clayTrim);

    const matBuddha = isTextured
      ? this.materials.carvedStatue
      : (isDetail ? this.materials.refinedBuddha : this.materials.clayTrim);

    const matFresco = isTextured ? this.materials.frescoMural : matRock;

    // -------------------------------------------------------------
    // 1. MONUMENTAL BASALT MOUNTAIN CLIFF FACE
    // -------------------------------------------------------------
    const cliffW = 120;
    const cliffH = 48;
    const cliffD = 40;

    // Cliff facade main mountain body
    const cliffGeo = new THREE.BoxGeometry(cliffW, cliffH, cliffD);
    const cliff = new THREE.Mesh(cliffGeo, matRock);
    cliff.position.set(0, cliffH / 2, -cliffD / 2);
    cliff.receiveShadow = true;
    cliff.castShadow = true;
    root.add(cliff);

    // Rocky overhang brow jutting out at the top (Natural rock cornice)
    const browGeo = new THREE.BoxGeometry(cliffW + 6, 8, 14);
    const brow = new THREE.Mesh(browGeo, matRock);
    brow.position.set(0, cliffH - 4, 3);
    brow.castShadow = true;
    root.add(brow);

    // -------------------------------------------------------------
    // 2. ROCK-CUT EXCAVATED VERANDA & INNER SANCTUM HALL
    // -------------------------------------------------------------
    const verandaW = 44;
    const verandaH = 14;
    const verandaD = 18;
    const verandaY = 6; // Elevated cave floor level

    // Recessed carved veranda chamber (negative space cavity)
    const cavityMat = new THREE.MeshStandardMaterial({
      color: 0x181614,
      roughness: 0.95
    });
    const cavity = new THREE.Mesh(new THREE.BoxGeometry(verandaW, verandaH, verandaD), cavityMat);
    cavity.position.set(0, verandaY + verandaH / 2, -verandaD / 2);
    root.add(cavity);

    // Interior Back & Side Walls covered with Fresco Murals (Phases 3-4)
    if (isTextured) {
      // Rear wall mural
      const rearMural = new THREE.Mesh(
        new THREE.PlaneGeometry(verandaW - 2, verandaH - 1),
        matFresco
      );
      rearMural.position.set(0, verandaY + verandaH / 2, -verandaD + 0.5);
      root.add(rearMural);

      // Left side mural
      const leftMural = new THREE.Mesh(
        new THREE.PlaneGeometry(verandaD - 2, verandaH - 1),
        matFresco
      );
      leftMural.rotation.y = Math.PI / 2;
      leftMural.position.set(-verandaW / 2 + 0.5, verandaY + verandaH / 2, -verandaD / 2);
      root.add(leftMural);

      // Right side mural
      const rightMural = new THREE.Mesh(
        new THREE.PlaneGeometry(verandaD - 2, verandaH - 1),
        matFresco
      );
      rightMural.rotation.y = -Math.PI / 2;
      rightMural.position.set(verandaW / 2 - 0.5, verandaY + verandaH / 2, -verandaD / 2);
      root.add(rightMural);
    }

    // -------------------------------------------------------------
    // 3. ICONIC HORSESHOE-SHAPED CHAITYA SUN-WINDOW
    // -------------------------------------------------------------
    const chaityaY = verandaY + verandaH + 8;
    const chaityaRadius = 7.5;

    // Outer horseshoe arch frame
    const chaityaOuter = this.createChaityaArch(chaityaRadius, 3.5, matTrim);
    chaityaOuter.position.set(0, chaityaY, 0.4);
    chaityaOuter.castShadow = true;
    root.add(chaityaOuter);

    // Deep window cavity behind arch
    const chaityaCavity = new THREE.Mesh(
      new THREE.CylinderGeometry(chaityaRadius * 0.75, chaityaRadius * 0.75, 4, 16),
      cavityMat
    );
    chaityaCavity.rotation.x = Math.PI / 2;
    chaityaCavity.position.set(0, chaityaY, -1.5);
    root.add(chaityaCavity);

    // Radial carved wooden-style ribs inside Chaitya arch (Phases 2-4)
    if (isDetail) {
      const ribCount = 9;
      for (let i = 0; i < ribCount; i++) {
        const theta = (i / (ribCount - 1)) * Math.PI;
        const rib = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, chaityaRadius * 0.7, 0.8),
          matTrim
        );
        rib.position.set(
          (chaityaRadius * 0.35) * Math.cos(theta),
          chaityaY + (chaityaRadius * 0.35) * Math.sin(theta),
          -0.2
        );
        rib.rotation.z = theta - Math.PI / 2;
        root.add(rib);
      }
    }

    // -------------------------------------------------------------
    // 4. PILLARED VERANDA COLONNADE
    // -------------------------------------------------------------
    const pillarCount = 6;
    const pSpacing = verandaW / (pillarCount + 1);

    for (let p = 1; p <= pillarCount; p++) {
      const px = -verandaW / 2 + p * pSpacing;

      if (isPhase1) {
        // Low-poly square rock pillars
        const pillar = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, verandaH, 1.8),
          matRock
        );
        pillar.position.set(px, verandaY + verandaH / 2, 0);
        pillar.castShadow = true;
        root.add(pillar);
      } else {
        // Phases 2-4: Rock-cut Fluted Pillars with Cushion Capitals (Amalaka capital)
        const detailedPillar = this.createRockCutPillar(verandaH, matTrim);
        detailedPillar.position.set(px, verandaY, 0);
        root.add(detailedPillar);
      }
    }

    // -------------------------------------------------------------
    // PHASES 2, 3, 4: SEATED BUDDHA NICHES & ROCK-CUT STAIRWAY
    // -------------------------------------------------------------
    if (isDetail) {
      // 1. Seated Buddha sculpture niches flanking the entrance portal
      const nicheX = [-29, 29];
      nicheX.forEach((nx) => {
        // Carved arched wall niche
        const nicheCavity = new THREE.Mesh(
          new THREE.BoxGeometry(7, 11, 4),
          cavityMat
        );
        nicheCavity.position.set(nx, verandaY + 5.5, -2);
        root.add(nicheCavity);

        // Niche decorative frame
        const frame = new THREE.Mesh(new THREE.BoxGeometry(8.5, 12.5, 1), matTrim);
        frame.position.set(nx, verandaY + 5.5, 0.2);
        root.add(frame);

        // Seated Buddha in Padmasana posture with halo
        const buddha = this.createSeatedBuddha(matBuddha);
        buddha.position.set(nx, verandaY + 1.2, -1.2);
        root.add(buddha);
      });

      // 2. Rock-cut Stepped Pathway leading up along the cliff facade
      const steps = 18;
      for (let s = 0; s < steps; s++) {
        const sy = (s / steps) * verandaY;
        const sx = -verandaW / 2 - 14 + s * 1.5;
        const sz = 8 - (s / steps) * 8;
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(5, verandaY / steps + 0.1, 3.5),
          matRock
        );
        step.position.set(sx, sy + 0.2, sz);
        step.receiveShadow = true;
        step.castShadow = true;
        root.add(step);
      }

      // 3. Rock terrace plinth apron in front of veranda
      const apron = new THREE.Mesh(
        new THREE.BoxGeometry(cliffW, verandaY, 12),
        matRock
      );
      apron.position.set(0, verandaY / 2, 6);
      apron.receiveShadow = true;
      root.add(apron);
    }

    return root;
  }

  /**
   * Generates iconic horseshoe Chaitya arch opening
   */
  createChaityaArch(radius, thickness, matStone) {
    const shape = new THREE.Shape();
    // Outer cusped horseshoe contour
    shape.absarc(0, 0, radius, 0, Math.PI, false);
    shape.lineTo(-radius * 0.9, -radius * 0.6);
    shape.lineTo(radius * 0.9, -radius * 0.6);
    shape.closePath();

    // Inner arch cutout hole
    const hole = new THREE.Path();
    hole.absarc(0, 0, radius * 0.72, 0, Math.PI, false);
    hole.lineTo(-radius * 0.65, -radius * 0.6);
    hole.lineTo(radius * 0.65, -radius * 0.6);
    hole.closePath();
    shape.holes.push(hole);

    const extrudeSettings = {
      depth: thickness,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.4,
      bevelThickness: 0.4
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    return new THREE.Mesh(geo, matStone);
  }

  /**
   * Rock-cut monolithic column with square base, fluted circular shaft & cushion capital
   */
  createRockCutPillar(height, matStone) {
    const group = new THREE.Group();

    // Square plinth
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.2, 2.0), matStone);
    base.position.y = 1.1;
    base.castShadow = true;
    group.add(base);

    // Fluted shaft
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.85, height - 4.6, 16),
      matStone
    );
    shaft.position.y = 2.2 + (height - 4.6) / 2;
    shaft.castShadow = true;
    group.add(shaft);

    // Ribbed cushion capital (Amalaka pillow)
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 0.9, 1.2, 16),
      matStone
    );
    cap.position.y = height - 1.8;
    cap.castShadow = true;
    group.add(cap);

    // Heavy square bracket block supporting cliff rock
    const block = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 2.4), matStone);
    block.position.y = height - 0.6;
    block.castShadow = true;
    group.add(block);

    return group;
  }

  /**
   * Monolithic carved Seated Buddha figure in Padmasana (lotus meditation posture)
   */
  createSeatedBuddha(matStone) {
    const group = new THREE.Group();

    // Lotus throne pedestal (Padmasana base)
    const lotus = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.6, 1.0, 12), matStone);
    lotus.position.y = 0.5;
    group.add(lotus);

    // Cross-legged lap
    const lap = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.2, 2.2), matStone);
    lap.position.y = 1.6;
    group.add(lap);

    // Meditating torso & robe
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.2, 3.2, 8), matStone);
    torso.position.y = 3.6;
    group.add(torso);

    // Head with Ushnisha (cranial bump)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.85, 12, 12), matStone);
    head.position.y = 5.8;
    group.add(head);

    const ushnisha = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), matStone);
    ushnisha.position.y = 6.6;
    group.add(ushnisha);

    // Halo (Prabhamandala) behind head
    const halo = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.3, 16), matStone);
    halo.rotation.x = Math.PI / 2;
    halo.position.set(0, 5.8, -0.6);
    group.add(halo);

    return group;
  }

  /**
   * Phase 4: Waghora River Gorge Valley, Hillside slopes, Dry Deciduous Trees & Rocks
   */
  buildGorgeValleyEnvironment() {
    const group = new THREE.Group();
    group.name = 'AjantaGorgeEnvironment_Phase4';

    // 1. Vast Canyon Gorge floor & River Valley Basin
    const valleyGeo = new THREE.PlaneGeometry(280, 240);
    const valleyMat = new THREE.MeshStandardMaterial({
      color: 0x5a5042, // Deccan gorge soil & river rocks
      roughness: 0.9,
      metalness: 0.05
    });
    const valley = new THREE.Mesh(valleyGeo, valleyMat);
    valley.rotation.x = -Math.PI / 2;
    valley.position.set(0, -18, 70); // Deep canyon below cliff
    valley.receiveShadow = true;
    group.add(valley);

    // 2. Winding Waghora River Stream flowing through the canyon
    const riverGeo = new THREE.PlaneGeometry(26, 240);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x2e5b66,
      roughness: 0.15,
      metalness: 0.3
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.rotation.z = -0.12;
    river.position.set(15, -17.8, 70);
    group.add(river);

    // 3. Dry Deciduous Teak Trees & Vegetation along the cliff edge and gorge
    const treePositions = [
      { x: -48, y: 0, z: 22 }, { x: 48, y: 0, z: 22 },
      { x: -58, y: 48, z: -6 }, { x: 58, y: 48, z: -6 },
      { x: -30, y: -18, z: 65 }, { x: 38, y: -18, z: 75 },
      { x: -20, y: -18, z: 110 }, { x: 25, y: -18, z: 120 }
    ];

    treePositions.forEach((tp) => {
      const tree = this.createDryDeciduousTree();
      tree.position.set(tp.x, tp.y, tp.z);
      group.add(tree);
    });

    // 4. Rocky canyon boulders along riverbanks
    const boulderMat = new THREE.MeshStandardMaterial({ color: 0x3d3935, roughness: 0.85 });
    for (let b = 0; b < 14; b++) {
      const bx = (Math.random() - 0.5) * 160;
      const bz = 40 + Math.random() * 80;
      const bs = 2.5 + Math.random() * 4.5;
      const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(bs, 0), boulderMat);
      boulder.position.set(bx, -18 + bs * 0.7, bz);
      boulder.rotation.set(Math.random(), Math.random(), Math.random());
      boulder.castShadow = true;
      boulder.receiveShadow = true;
      group.add(boulder);
    }

    return group;
  }

  createDryDeciduousTree() {
    const tree = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x483a2d, roughness: 0.9 });
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x5a6c38, roughness: 0.85 }); // Dry olive/sage teak foliage

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.65, 5.0, 7), trunkMat);
    trunk.position.y = 2.5;
    trunk.castShadow = true;
    tree.add(trunk);

    const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(3.6, 1), canopyMat);
    foliage.position.y = 6.2;
    foliage.castShadow = true;
    tree.add(foliage);

    return tree;
  }

  /**
   * Lighting:
   * Phases 1-3: Clean Studio Lighting
   * Phase 4: Soft Diffused Daylight under rocky overhang + Warm interior torchlight / oil lamp glow
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `AjantaLighting_Phase${phase}`;

    if (phase === 4) {
      // Soft overcast/canyon daylight sky
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#537d99');   // Soft daylight sky
      grad.addColorStop(0.65, '#99aab8'); // Overcast canyon light
      grad.addColorStop(1, '#c5cfd6');   // Misty river valley haze
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0x9ca7ad, 0.0025);

      // Diffused ambient daylight from canyon
      const hemi = new THREE.HemisphereLight(0xbad2e2, 0x483e35, 1.35);
      hemi.position.set(0, 60, 40);
      lightGroup.add(hemi);

      // Soft sun filtering onto the cliff face at low angle
      const daylight = new THREE.DirectionalLight(0xfff3e0, 1.8);
      daylight.position.set(30, 45, 60);
      daylight.castShadow = true;
      daylight.shadow.mapSize.width = 2048;
      daylight.shadow.mapSize.height = 2048;
      const d = 85;
      daylight.shadow.camera.left = -d;
      daylight.shadow.camera.right = d;
      daylight.shadow.camera.top = d;
      daylight.shadow.camera.bottom = -d;
      daylight.shadow.bias = -0.0003;
      lightGroup.add(daylight);

      // Warm Interior Torchlight & Ancient Oil Lamp Glows inside the Cave Veranda
      const torchColors = [0xff9933, 0xffaa44, 0xff8822];
      const torchX = [-16, 0, 16];
      torchX.forEach((tx, idx) => {
        const torchLight = new THREE.PointLight(torchColors[idx % 3], 2.4, 28, 1.5);
        torchLight.position.set(tx, 12, -9); // Inside cave cavity
        torchLight.castShadow = true;
        lightGroup.add(torchLight);

        // Torch flame glow mesh
        const flame = new THREE.Mesh(
          new THREE.SphereGeometry(0.35, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xffbb44 })
        );
        flame.position.set(tx, 12, -9);
        lightGroup.add(flame);
      });

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

export const ajantaElloraBuilder = new AjantaElloraBuilder();
