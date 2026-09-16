import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Red Fort (Lal Qila, Delhi) Architectural Model Builder
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   Low-poly 3D base model of a massive fort with tall crenelated walls, 
 *   large central gateway (Lahori Gate style), and multiple domed pavilions along the top.
 * Phase 2 — Architectural Detailing:
 *   Octagonal corner towers, jharokha (projecting balcony) windows along walls,
 *   decorative battlements (kanguras), layered gateway arches, and parapet chhatris.
 * Phase 3 — Material & Texture (Advanced):
 *   Red sandstone texture across all wall surfaces, carved geometric and floral relief
 *   patterns near gateway, white marble accents on pavilion domes, iron-studded wooden gate.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Moat / garden area in front, flag mast on main dome with Indian flag,
 *   busy street / bazaar scene near entrance for scale, clear bright daytime blue sky.
 */
export class RedFortBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.clayWall = new THREE.MeshStandardMaterial({
      color: 0x9b4435,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayTrim = new THREE.MeshStandardMaterial({
      color: 0x7c3427,
      roughness: 0.8,
      flatShading: true
    });

    this.materials.clayDome = new THREE.MeshStandardMaterial({
      color: 0xdfdad2,
      roughness: 0.5,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayGate = new THREE.MeshStandardMaterial({
      color: 0x3d271f,
      roughness: 0.85,
      flatShading: true
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Detailing Clay
    // -------------------------------------------------------------
    this.materials.refinedRedSandstone = new THREE.MeshStandardMaterial({
      color: 0xa84838,
      roughness: 0.6,
      metalness: 0.06,
      flatShading: false
    });

    this.materials.refinedMarble = new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      roughness: 0.38,
      metalness: 0.05,
      flatShading: false
    });

    this.materials.goldFinial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.28,
      metalness: 0.9
    });

    // -------------------------------------------------------------
    // Phase 3: High-Detail Procedural Materials & Textures
    // -------------------------------------------------------------
    const redStoneTex = textureGenerator.getRedFortSandstoneTexture();
    const gateTex = textureGenerator.getIronStuddedGateTexture();
    const marbleTex = textureGenerator.getWhiteMarbleTexture();

    this.materials.texturedRedSandstone = new THREE.MeshStandardMaterial({
      map: redStoneTex,
      roughness: 0.65,
      metalness: 0.05,
      bumpMap: redStoneTex,
      bumpScale: 0.03
    });

    this.materials.texturedGate = new THREE.MeshStandardMaterial({
      map: gateTex,
      roughness: 0.55,
      metalness: 0.45,
      bumpMap: gateTex,
      bumpScale: 0.04
    });

    this.materials.texturedWhiteMarble = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.28,
      metalness: 0.06,
      bumpMap: marbleTex,
      bumpScale: 0.015
    });

    // Relief carved panel material
    this.materials.carvedRelief = new THREE.MeshStandardMaterial({
      color: 0xb55140,
      roughness: 0.5,
      metalness: 0.08,
      bumpMap: redStoneTex,
      bumpScale: 0.05
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `RedFort_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matWall = isTextured
      ? this.materials.texturedRedSandstone
      : (isDetail ? this.materials.refinedRedSandstone : this.materials.clayWall);

    const matPlinth = isTextured
      ? this.materials.texturedRedSandstone
      : (isDetail ? this.materials.refinedRedSandstone : this.materials.clayTrim);

    const matDome = isTextured
      ? this.materials.texturedWhiteMarble
      : (isDetail ? this.materials.refinedMarble : this.materials.clayDome);

    const matGate = isTextured
      ? this.materials.texturedGate
      : this.materials.clayGate;

    const matGold = isDetail ? this.materials.goldFinial : this.materials.clayDome;
    const matRelief = isTextured ? this.materials.carvedRelief : matWall;

    // -------------------------------------------------------------
    // 1. PLINTH & GROUND TERRACE
    // -------------------------------------------------------------
    const plinthGeo = new THREE.BoxGeometry(160, 2.5, 60);
    const plinth = new THREE.Mesh(plinthGeo, matPlinth);
    plinth.position.set(0, 1.25, -10);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    root.add(plinth);

    // -------------------------------------------------------------
    // 2. MASSIVE FORTRESS CURTAIN WALLS (Flanking Lahori Gate)
    // -------------------------------------------------------------
    const wallHeight = 22;
    const wallDepth = 10;
    const wallWidth = 52;

    // Left curtain wall
    const leftWallGeo = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);
    const leftWall = new THREE.Mesh(leftWallGeo, matWall);
    leftWall.position.set(-42, 2.5 + wallHeight / 2, -10);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    root.add(leftWall);

    // Right curtain wall
    const rightWallGeo = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);
    const rightWall = new THREE.Mesh(rightWallGeo, matWall);
    rightWall.position.set(42, 2.5 + wallHeight / 2, -10);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    root.add(rightWall);

    // -------------------------------------------------------------
    // 3. MONUMENTAL CENTRAL LAHORI GATEWAY MASSING
    // -------------------------------------------------------------
    const gateMainWidth = 32;
    const gateMainHeight = 28;
    const gateMainDepth = 14;

    const gateGeo = new THREE.BoxGeometry(gateMainWidth, gateMainHeight, gateMainDepth);
    const gateMesh = new THREE.Mesh(gateGeo, matWall);
    gateMesh.position.set(0, 2.5 + gateMainHeight / 2, -8);
    gateMesh.castShadow = true;
    gateMesh.receiveShadow = true;
    root.add(gateMesh);

    // Flanking octagonal gateway towers
    const towerRadius = 6.2;
    const towerHeight = 32;
    const towerGeo = new THREE.CylinderGeometry(towerRadius * 0.92, towerRadius, towerHeight, isPhase1 ? 8 : 16);
    
    // Left Gateway Tower
    const leftTower = new THREE.Mesh(towerGeo, matWall);
    leftTower.position.set(-18, 2.5 + towerHeight / 2, -5);
    leftTower.castShadow = true;
    leftTower.receiveShadow = true;
    root.add(leftTower);

    // Right Gateway Tower
    const rightTower = new THREE.Mesh(towerGeo, matWall);
    rightTower.position.set(18, 2.5 + towerHeight / 2, -5);
    rightTower.castShadow = true;
    rightTower.receiveShadow = true;
    root.add(rightTower);

    // Central Arch Recess (Iwan style portal)
    const archH = 17;
    const archW = 11;
    const archD = 6;
    const archGeo = new THREE.BoxGeometry(archW, archH, archD);
    const archBackMat = isPhase1 ? this.materials.clayTrim : matRelief;
    const archNiche = new THREE.Mesh(archGeo, archBackMat);
    archNiche.position.set(0, 2.5 + archH / 2, -4);
    root.add(archNiche);

    // Main Entrance Iron-Studded Wooden Gate
    const doorH = 10;
    const doorW = 7;
    const doorGeo = new THREE.BoxGeometry(doorW, doorH, 1);
    const door = new THREE.Mesh(doorGeo, matGate);
    door.position.set(0, 2.5 + doorH / 2, -1.5);
    door.castShadow = true;
    door.receiveShadow = true;
    root.add(door);

    // -------------------------------------------------------------
    // 4. ROOFTOP DOMED PAVILIONS & TOWER CUPOLAS
    // -------------------------------------------------------------
    // Left Tower White Dome
    const domeGeo = this.createFlutedDomeGeometry(towerRadius * 0.88, 7.5, isPhase1 ? 12 : 24);
    const leftDome = new THREE.Mesh(domeGeo, matDome);
    leftDome.position.set(-18, 2.5 + towerHeight + 2, -5);
    leftDome.castShadow = true;
    root.add(leftDome);

    // Right Tower White Dome
    const rightDome = new THREE.Mesh(domeGeo, matDome);
    rightDome.position.set(18, 2.5 + towerHeight + 2, -5);
    rightDome.castShadow = true;
    root.add(rightDome);

    // Central Dome / Pavilion atop Lahori Gate
    const centerPavilionBase = new THREE.Mesh(
      new THREE.BoxGeometry(14, 3.5, 9),
      matWall
    );
    centerPavilionBase.position.set(0, 2.5 + gateMainHeight + 1.75, -8);
    centerPavilionBase.castShadow = true;
    root.add(centerPavilionBase);

    const centerDomeGeo = this.createFlutedDomeGeometry(4.8, 6.5, isPhase1 ? 12 : 24);
    const centerDome = new THREE.Mesh(centerDomeGeo, matDome);
    centerDome.position.set(0, 2.5 + gateMainHeight + 3.5 + 2, -8);
    centerDome.castShadow = true;
    root.add(centerDome);

    // Rampart Chhatris (Domed pavilions along the curtain wall)
    const rampartPavilionPositions = [-55, -34, 34, 55];
    rampartPavilionPositions.forEach((posX) => {
      const chhatriBase = new THREE.Mesh(
        new THREE.CylinderGeometry(2.6, 2.8, 4, isPhase1 ? 6 : 8),
        matWall
      );
      chhatriBase.position.set(posX, 2.5 + wallHeight + 2, -10);
      chhatriBase.castShadow = true;
      root.add(chhatriBase);

      const chhatriDome = new THREE.Mesh(
        this.createFlutedDomeGeometry(2.5, 3.2, isPhase1 ? 8 : 16),
        matDome
      );
      chhatriDome.position.set(posX, 2.5 + wallHeight + 4.5, -10);
      chhatriDome.castShadow = true;
      root.add(chhatriDome);

      if (isDetail) {
        // Brass finial
        const finial = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.4, 2, 8),
          matGold
        );
        finial.position.set(posX, 2.5 + wallHeight + 8.5, -10);
        root.add(finial);
      }
    });

    // -------------------------------------------------------------
    // PHASES 2, 3, 4: ARCHITECTURAL DETAILING & ORNAMENTS
    // -------------------------------------------------------------
    if (isDetail) {
      // 1. Octagonal Corner Bastions at the extreme wall ends
      const endBastionGeo = new THREE.CylinderGeometry(5.5, 6, wallHeight + 4, 8);
      const leftEndBastion = new THREE.Mesh(endBastionGeo, matWall);
      leftEndBastion.position.set(-68, 2.5 + (wallHeight + 4) / 2, -10);
      leftEndBastion.castShadow = true;
      root.add(leftEndBastion);

      const rightEndBastion = new THREE.Mesh(endBastionGeo, matWall);
      rightEndBastion.position.set(68, 2.5 + (wallHeight + 4) / 2, -10);
      rightEndBastion.castShadow = true;
      root.add(rightEndBastion);

      // Bastion cupolas
      const bDomeL = new THREE.Mesh(this.createFlutedDomeGeometry(5, 5.5, 16), matDome);
      bDomeL.position.set(-68, 2.5 + wallHeight + 5, -10);
      bDomeL.castShadow = true;
      root.add(bDomeL);

      const bDomeR = new THREE.Mesh(this.createFlutedDomeGeometry(5, 5.5, 16), matDome);
      bDomeR.position.set(68, 2.5 + wallHeight + 5, -10);
      bDomeR.castShadow = true;
      root.add(bDomeR);

      // 2. Layered Cusped Arch Trim at Lahori Gate
      const archFrame = new THREE.Mesh(
        new THREE.BoxGeometry(13, 19, 1),
        matWall
      );
      archFrame.position.set(0, 2.5 + 9.5, -0.9);
      root.add(archFrame);

      // 3. Jharokha (projecting balcony) windows along ramparts
      const jharokhaPositions = [-50, -38, -26, 26, 38, 50];
      jharokhaPositions.forEach((posX) => {
        const jGroup = this.createJharokhaBalcony(matWall, matDome);
        jGroup.position.set(posX, 16, -4.6);
        root.add(jGroup);
      });

      // 4. Decorative Parapet Battlements (Kanguras)
      this.addBattlements(root, matWall, wallHeight);

      // 5. Seven Miniature Marble Chhatris crowning Lahori Gate Parapet
      const chhatriCount = 7;
      const span = 18;
      const step = span / (chhatriCount - 1);
      for (let i = 0; i < chhatriCount; i++) {
        const cx = -span / 2 + i * step;
        const miniPillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.35, 3.2, 8),
          matWall
        );
        miniPillar.position.set(cx, 2.5 + gateMainHeight + 1.6, -1);
        root.add(miniPillar);

        const miniDome = new THREE.Mesh(
          new THREE.SphereGeometry(0.8, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2),
          matDome
        );
        miniDome.position.set(cx, 2.5 + gateMainHeight + 3.2, -1);
        miniDome.castShadow = true;
        root.add(miniDome);
      }

      // 6. Finials on Main Tower Domes
      [-18, 18].forEach((tx) => {
        const finial = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.5, 3.5, 8),
          matGold
        );
        finial.position.set(tx, 2.5 + towerHeight + 7.5, -5);
        root.add(finial);
      });
    }

    // -------------------------------------------------------------
    // PHASE 4: INDIAN FLAG MAST & ENVIRONMENT SCALE
    // -------------------------------------------------------------
    if (phase >= 4) {
      // Flag mast on main central dome with Indian National Flag
      const mastGroup = this.createIndianFlagMast();
      mastGroup.position.set(0, 2.5 + gateMainHeight + 3.5 + 8.5, -8);
      root.add(mastGroup);
    }

    return root;
  }

  /**
   * Helper: Creates onion/fluted dome geometry with cusped silhouette
   */
  createFlutedDomeGeometry(radius, height, segments = 24) {
    const points = [];
    const steps = 18;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * height;
      // Traditional Mughal onion bulb profile
      let r = radius;
      if (t < 0.2) {
        // Cylindrical neck / drum base
        r = radius * 0.95;
      } else if (t < 0.6) {
        // Bulbous outward expansion
        const bt = (t - 0.2) / 0.4;
        r = radius * (0.95 + 0.3 * Math.sin(bt * Math.PI));
      } else {
        // Graceful tapered curve to pointed peak
        const pt = (t - 0.6) / 0.4;
        r = radius * 1.25 * Math.cos((pt * Math.PI) / 2);
      }
      points.push(new THREE.Vector2(Math.max(0.01, r), y));
    }
    return new THREE.LatheGeometry(points, segments);
  }

  /**
   * Creates projecting Jharokha (balcony oriel) with corbel bracket and canopy
   */
  createJharokhaBalcony(matStone, matRoof) {
    const group = new THREE.Group();

    // Corbeled support brackets
    const bracketGeo = new THREE.BoxGeometry(2.4, 2.2, 1.6);
    const bracket = new THREE.Mesh(bracketGeo, matStone);
    bracket.position.set(0, -1, 0.8);
    bracket.castShadow = true;
    group.add(bracket);

    // Balcony parapet
    const balconyGeo = new THREE.BoxGeometry(2.8, 1.8, 1.8);
    const balcony = new THREE.Mesh(balconyGeo, matStone);
    balcony.position.set(0, 0.8, 0.9);
    balcony.castShadow = true;
    group.add(balcony);

    // Cusped eaves / canopy
    const eavesGeo = new THREE.ConeGeometry(2.2, 1.5, 6);
    const eaves = new THREE.Mesh(eavesGeo, matRoof);
    eaves.position.set(0, 2.8, 0.9);
    eaves.castShadow = true;
    group.add(eaves);

    return group;
  }

  /**
   * Adds traditional flame-shaped defensive battlements (Kanguras) along the parapet
   */
  addBattlements(root, matStone, wallHeight) {
    const battlementY = 2.5 + wallHeight + 0.8;
    const count = 38;
    const width = 140;
    const spacing = width / count;

    for (let i = 0; i < count; i++) {
      const x = -width / 2 + i * spacing;
      // Skip doorway center
      if (Math.abs(x) < 14) continue;

      const kangura = new THREE.Mesh(
        new THREE.ConeGeometry(0.8, 1.4, 4),
        matStone
      );
      kangura.position.set(x, battlementY, -5.2);
      kangura.rotation.y = Math.PI / 4;
      kangura.castShadow = true;
      root.add(kangura);
    }
  }

  /**
   * Creates Indian National Flag with Saffron, White, Green stripes and Ashoka Chakra
   * attached to a tall gilded mast
   */
  createIndianFlagMast() {
    const group = new THREE.Group();
    group.name = 'IndianFlagMast';

    // Tall flag mast / pole
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.18, 16, 12);
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.2
    });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, 8, 0);
    pole.castShadow = true;
    group.add(pole);

    // Gilded sphere at mast apex
    const finialGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const finialMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15
    });
    const finial = new THREE.Mesh(finialGeo, finialMat);
    finial.position.set(0, 16, 0);
    group.add(finial);

    // Canvas procedural Indian National Flag texture
    const flagCanvas = document.createElement('canvas');
    flagCanvas.width = 512;
    flagCanvas.height = 341; // 3:2 ratio
    const ctx = flagCanvas.getContext('2d');

    const stripeH = flagCanvas.height / 3;

    // Top Stripe: Saffron (Kesari)
    ctx.fillStyle = '#FF9933';
    ctx.fillRect(0, 0, flagCanvas.width, stripeH);

    // Middle Stripe: White
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, stripeH, flagCanvas.width, stripeH);

    // Bottom Stripe: India Green
    ctx.fillStyle = '#138808';
    ctx.fillRect(0, stripeH * 2, flagCanvas.width, stripeH);

    // Central Ashoka Chakra in Navy Blue with 24 spokes
    const cx = flagCanvas.width / 2;
    const cy = flagCanvas.height / 2;
    const chakraR = stripeH * 0.42;

    ctx.strokeStyle = '#000080';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, chakraR, 0, Math.PI * 2);
    ctx.stroke();

    // Small hub circle
    ctx.fillStyle = '#000080';
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    // 24 spokes
    ctx.lineWidth = 2;
    for (let s = 0; s < 24; s++) {
      const angle = (s * Math.PI * 2) / 24;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * chakraR, cy + Math.sin(angle) * chakraR);
      ctx.stroke();
    }

    const flagTex = new THREE.CanvasTexture(flagCanvas);
    flagTex.wrapS = THREE.ClampToEdgeWrapping;
    flagTex.wrapT = THREE.ClampToEdgeWrapping;

    // Flag mesh with subtle rippling wave
    const flagGeo = new THREE.PlaneGeometry(9, 6, 20, 10);
    const posAttr = flagGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const u = posAttr.getX(i);
      // Gentle wind wave displacement
      const z = Math.sin((u / 9) * Math.PI * 2.5) * 0.45;
      posAttr.setZ(i, z);
    }
    flagGeo.computeVertexNormals();

    const flagMat = new THREE.MeshStandardMaterial({
      map: flagTex,
      side: THREE.DoubleSide,
      roughness: 0.6,
      metalness: 0.05
    });

    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.set(4.5, 12, 0); // Extended rightward from the pole
    flagMesh.castShadow = true;
    group.add(flagMesh);

    return group;
  }

  /**
   * Phase 4: Moat, Garden, Street Scene & Market Bazaar Stalls in front of Lahori Gate
   */
  buildMoatAndMarketEnvironment() {
    const group = new THREE.Group();
    group.name = 'RedFortEnvironment_Phase4';

    // 1. Broad Moat Basin with Lush Green Lawn & Embankment
    const lawnGeo = new THREE.PlaneGeometry(280, 180);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x3d6e35,
      roughness: 0.85,
      metalness: 0.05
    });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.rotation.x = -Math.PI / 2;
    lawn.position.set(0, -0.05, 50);
    lawn.receiveShadow = true;
    group.add(lawn);

    // 2. Stone Embankment Moat Channel
    const moatWallGeo = new THREE.BoxGeometry(200, 3, 2);
    const moatWallMat = new THREE.MeshStandardMaterial({
      color: 0x6e352b,
      roughness: 0.8
    });
    const moatWall = new THREE.Mesh(moatWallGeo, moatWallMat);
    moatWall.position.set(0, 1.5, 20);
    moatWall.receiveShadow = true;
    group.add(moatWall);

    // 3. Paved Entrance Causeway / Bridge crossing Moat to Lahori Gate
    const causewayGeo = new THREE.BoxGeometry(16, 2.6, 60);
    const causewayMat = new THREE.MeshStandardMaterial({
      color: 0x8a4034,
      roughness: 0.7
    });
    const causeway = new THREE.Mesh(causewayGeo, causewayMat);
    causeway.position.set(0, 1.3, 20);
    causeway.receiveShadow = true;
    causeway.castShadow = true;
    group.add(causeway);

    // Causeway Balustrades
    [-8.2, 8.2].forEach((bx) => {
      const railing = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.6, 58),
        moatWallMat
      );
      railing.position.set(bx, 3.1, 20);
      railing.castShadow = true;
      group.add(railing);
    });

    // 4. Busy Street / Market (Meena Bazaar Entrance) with Canopied Stalls
    const stallColors = [0xb83828, 0xd4a017, 0x1d7044, 0x9b335c, 0xc25b29];
    const stallPositions = [
      { x: -35, z: 65 }, { x: -22, z: 68 }, { x: -14, z: 72 },
      { x: 14, z: 72 }, { x: 24, z: 68 }, { x: 38, z: 65 }
    ];

    stallPositions.forEach((pos, idx) => {
      const stallGroup = new THREE.Group();
      stallGroup.position.set(pos.x, 0, pos.z);

      // Wooden Table/Platform
      const table = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 1.4, 3.2),
        new THREE.MeshStandardMaterial({ color: 0x4a3222, roughness: 0.85 })
      );
      table.position.y = 0.7;
      table.castShadow = true;
      stallGroup.add(table);

      // Fabric Canopy Awning
      const canopy = new THREE.Mesh(
        new THREE.ConeGeometry(3.2, 1.6, 4),
        new THREE.MeshStandardMaterial({
          color: stallColors[idx % stallColors.length],
          roughness: 0.7
        })
      );
      canopy.position.y = 3.6;
      canopy.rotation.y = Math.PI / 4;
      canopy.castShadow = true;
      stallGroup.add(canopy);

      // Canopy support posts
      const postMat = new THREE.MeshStandardMaterial({ color: 0x221710 });
      [[-1.8, -1.2], [1.8, -1.2], [-1.8, 1.2], [1.8, 1.2]].forEach(([px, pz]) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.6, 6), postMat);
        post.position.set(px, 1.8, pz);
        stallGroup.add(post);
      });

      group.add(stallGroup);
    });

    // 5. Traditional Heritage Street Lamps along the plaza
    const lampX = [-30, -18, 18, 30];
    lampX.forEach((lx) => {
      const lamp = this.createHeritageStreetLamp();
      lamp.position.set(lx, 0, 50);
      group.add(lamp);
    });

    // 6. Scale Pedestrian Silhouettes / Statues walking near gate
    const pedCoords = [
      { x: -3, z: 32 }, { x: 2, z: 28 }, { x: -6, z: 42 },
      { x: 5, z: 46 }, { x: -10, z: 58 }, { x: 12, z: 54 }
    ];
    const pedMat = new THREE.MeshStandardMaterial({ color: 0xeae5dc, roughness: 0.6 });
    pedCoords.forEach((p) => {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 1.8, 8), pedMat);
      body.position.set(p.x, 0.9, p.z);
      body.castShadow = true;
      group.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), pedMat);
      head.position.set(p.x, 2.05, p.z);
      group.add(head);
    });

    return group;
  }

  createHeritageStreetLamp() {
    const lamp = new THREE.Group();
    const postMat = new THREE.MeshStandardMaterial({
      color: 0x181a1d,
      metalness: 0.85,
      roughness: 0.3
    });

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 6, 8), postMat);
    pole.position.y = 3;
    pole.castShadow = true;
    lamp.add(pole);

    const lantern = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.3, 1.0, 6),
      new THREE.MeshStandardMaterial({
        color: 0xfff2cc,
        emissive: 0xffcc44,
        emissiveIntensity: 0.35,
        roughness: 0.2
      })
    );
    lantern.position.y = 6.4;
    lamp.add(lantern);

    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.5, 6), postMat);
    cap.position.y = 7.1;
    lamp.add(cap);

    return lamp;
  }

  /**
   * Lighting setup tailored to Red Fort phases:
   * Phase 1-3: Studio architectural lighting
   * Phase 4: Clear bright daytime with vivid blue sky and high sun
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `RedFortLighting_Phase${phase}`;

    if (phase === 4) {
      // Clear bright daytime sky gradient (Photorealistic Blue Sky)
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#1c7ed6');   // Deep Delhi noon blue
      grad.addColorStop(0.5, '#4dabf7'); // Bright azure
      grad.addColorStop(1, '#d0ebff');   // Horizon haze
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0xc5dff8, 0.0028);

      // Bright Delhi Midday Sun (Directional Light)
      const sun = new THREE.DirectionalLight(0xfffaed, 2.4);
      sun.position.set(50, 75, 60);
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

      // Ambient blue sky bounce
      const hemi = new THREE.HemisphereLight(0x8bc4ff, 0x8a5438, 1.25);
      hemi.position.set(0, 50, 0);
      lightGroup.add(hemi);

      // Warm ground bounce fill
      const bounce = new THREE.DirectionalLight(0xffe2b8, 0.6);
      bounce.position.set(-40, 20, -30);
      lightGroup.add(bounce);

    } else {
      // Phases 1-3: Clean Architectural Studio Lighting
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

      const fill = new THREE.DirectionalLight(0xaad0f0, 1.0);
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

export const redFortBuilder = new RedFortBuilder();
