import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural National Museum (Delhi) Architectural Model Builder
 * Faithfully implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch): Low-poly curved circular facade, central dome, radiating gallery wings.
 * Phase 2 — Architectural Detailing: Grand staircase entrance, tall glass facade sections, dome skylights, interior partitions.
 * Phase 3 — Material & Texture: Sandstone-beige exterior, glass & steel, polished stone floor, glass display cases with artifacts, wall panels, carpet runners.
 * Phase 4 — Environment & Final Render: Open city plaza, tiered fountain, manicured lawns, bright daytime sun, interior gallery spotlights, skylight daylight.
 */
export class NationalMuseumDelhiBuilder {
  constructor() {
    this.materials = {};
    this.waterMaterial = null;
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Low-Poly Architectural Clay Materials (Scratch)
    // -------------------------------------------------------------
    this.materials.clayBase = new THREE.MeshStandardMaterial({
      color: 0xdedcd6,
      roughness: 0.6,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayDome = new THREE.MeshStandardMaterial({
      color: 0xe6e4de,
      roughness: 0.5,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayDark = new THREE.MeshStandardMaterial({
      color: 0x2c2d30,
      roughness: 0.8,
      flatShading: true
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Detailed Materials (Clay Shaded)
    // -------------------------------------------------------------
    this.materials.refinedSandstoneClay = new THREE.MeshStandardMaterial({
      color: 0xe0d6c5,
      roughness: 0.5,
      metalness: 0.06,
      flatShading: false
    });

    this.materials.detailedGlassClay = new THREE.MeshStandardMaterial({
      color: 0x688fa8,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.75
    });

    this.materials.steelFrameClay = new THREE.MeshStandardMaterial({
      color: 0x22262d,
      roughness: 0.4,
      metalness: 0.7
    });

    // -------------------------------------------------------------
    // Phase 3: Advanced Materials & Photorealistic Textures
    // -------------------------------------------------------------
    const sandstoneTex = textureGenerator.getSandstoneBeigeTexture();
    const glassSteelTex = textureGenerator.getModernGlassSteelTexture();
    const polishedFloorTex = textureGenerator.getPolishedStoneFloorTexture();
    const wallPanelsTex = textureGenerator.getMuseumArtifactWallTexture();
    const carpetTex = textureGenerator.getGalleryCarpetTexture();
    const plazaPaverTex = textureGenerator.getCityPlazaPaversTexture();

    // Sandstone Exterior
    this.materials.texturedSandstone = new THREE.MeshStandardMaterial({
      map: sandstoneTex,
      roughness: 0.65,
      metalness: 0.05,
      bumpMap: sandstoneTex,
      bumpScale: 0.02
    });

    // Modern Glass & Steel Curtain Wall
    this.materials.texturedGlassSteel = new THREE.MeshStandardMaterial({
      map: glassSteelTex,
      roughness: 0.15,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });

    // Pure Clear Glass (for display cases & skylight oculus)
    this.materials.clearGlass = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 0.5
    });

    // Dark Gunmetal Architectural Steel
    this.materials.structuralSteel = new THREE.MeshStandardMaterial({
      color: 0x1e2229,
      roughness: 0.35,
      metalness: 0.85
    });

    // Polished Stone Flooring
    this.materials.polishedFloor = new THREE.MeshStandardMaterial({
      map: polishedFloorTex,
      roughness: 0.22,
      metalness: 0.08,
      bumpMap: polishedFloorTex,
      bumpScale: 0.01
    });

    // Museum Artifact Wall Panels
    this.materials.artifactWall = new THREE.MeshStandardMaterial({
      map: wallPanelsTex,
      roughness: 0.4,
      metalness: 0.05
    });

    // Gallery Walkway Carpet Runner
    this.materials.galleryCarpet = new THREE.MeshStandardMaterial({
      map: carpetTex,
      roughness: 0.85,
      metalness: 0.02
    });

    // Artifact Materials (Gold relics & ancient bronze)
    this.materials.bronzeArtifact = new THREE.MeshStandardMaterial({
      color: 0x7a6245,
      roughness: 0.35,
      metalness: 0.85
    });

    this.materials.goldArtifact = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.95
    });

    this.materials.pedestalDark = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      roughness: 0.4,
      metalness: 0.3
    });

    // -------------------------------------------------------------
    // Phase 4: Plaza & Landscape Materials
    // -------------------------------------------------------------
    this.materials.plazaPavers = new THREE.MeshStandardMaterial({
      map: plazaPaverTex,
      roughness: 0.6,
      metalness: 0.04,
      bumpMap: plazaPaverTex,
      bumpScale: 0.015
    });

    this.materials.manicuredLawn = new THREE.MeshStandardMaterial({
      color: 0x3d702a,
      roughness: 0.8,
      metalness: 0.02
    });

    this.materials.hedge = new THREE.MeshStandardMaterial({
      color: 0x224818,
      roughness: 0.75,
      metalness: 0.02
    });

    // Animated Water for Plaza Fountain
    const waterCanvas = document.createElement('canvas');
    waterCanvas.width = 256;
    waterCanvas.height = 256;
    const wCtx = waterCanvas.getContext('2d');
    wCtx.fillStyle = '#0e4a68';
    wCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 600; i++) {
      wCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      wCtx.fillRect(Math.random() * 256, Math.random() * 256, 3, 3);
    }
    const waterBump = new THREE.CanvasTexture(waterCanvas);
    waterBump.wrapS = THREE.RepeatWrapping;
    waterBump.wrapT = THREE.RepeatWrapping;

    this.waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x19769f,
      roughness: 0.1,
      metalness: 0.2,
      bumpMap: waterBump,
      bumpScale: 0.05,
      transparent: true,
      opacity: 0.88
    });
  }

  /**
   * Builds the complete National Museum model depending on current phase and viewMode
   */
  build(phase = 4, viewMode = 'realistic') {
    const root = new THREE.Group();
    root.name = 'NationalMuseumDelhi';

    const isTextured = (phase >= 3) && (viewMode === 'realistic');
    const isDetailed = phase >= 2;

    // Active material assignment
    const matWall = isTextured ? this.materials.texturedSandstone : (isDetailed ? this.materials.refinedSandstoneClay : this.materials.clayBase);
    const matGlass = isTextured ? this.materials.texturedGlassSteel : (isDetailed ? this.materials.detailedGlassClay : this.materials.clayDark);
    const matSteel = isTextured ? this.materials.structuralSteel : (isDetailed ? this.materials.steelFrameClay : this.materials.clayDark);
    const matDome = isTextured ? this.materials.texturedSandstone : (isDetailed ? this.materials.refinedSandstoneClay : this.materials.clayDome);
    const matFloor = isTextured ? this.materials.polishedFloor : matWall;
    const matPlinth = isTextured ? this.materials.texturedSandstone : matWall;

    // =============================================================
    // 1. BASE PLINTH & PODIUM
    // =============================================================
    const plinthGroup = new THREE.Group();
    plinthGroup.name = 'PodiumPlinth';

    const plinthH = isDetailed ? 2.4 : 1.0;
    const plinthGeo = new THREE.CylinderGeometry(36, 37, plinthH, 48);
    const plinthMesh = new THREE.Mesh(plinthGeo, matPlinth);
    plinthMesh.position.y = plinthH / 2;
    plinthMesh.receiveShadow = true;
    plinthMesh.castShadow = true;
    plinthGroup.add(plinthMesh);

    // Front podium extension for entrance
    const extGeo = new THREE.BoxGeometry(26, plinthH, 20);
    const extMesh = new THREE.Mesh(extGeo, matPlinth);
    extMesh.position.set(0, plinthH / 2, 26);
    extMesh.receiveShadow = true;
    extMesh.castShadow = true;
    plinthGroup.add(extMesh);

    root.add(plinthGroup);

    // =============================================================
    // 2. CENTRAL ROTUNDA (CURVED CIRCULAR FACADE)
    // =============================================================
    const rotundaGroup = new THREE.Group();
    rotundaGroup.name = 'CurvedRotunda';
    rotundaGroup.position.y = plinthH;

    const rotundaRadius = 22;
    const rotundaHeight = 16;

    if (!isDetailed) {
      // Phase 1: Simple low-poly curved circular cylinder massing
      const rotundaGeo = new THREE.CylinderGeometry(rotundaRadius, rotundaRadius, rotundaHeight, 28, 1, false);
      const rotundaMesh = new THREE.Mesh(rotundaGeo, matWall);
      rotundaMesh.position.y = rotundaHeight / 2;
      rotundaMesh.castShadow = true;
      rotundaMesh.receiveShadow = true;
      rotundaGroup.add(rotundaMesh);
    } else {
      // Phase 2-4: Architectural detailing with tall glass curtain facade & colonnade
      // Main rotunda outer shell with front grand curved opening for glass & colonnade
      const curvedBackGeo = new THREE.CylinderGeometry(rotundaRadius, rotundaRadius, rotundaHeight, 36, 1, false, Math.PI * 0.15, Math.PI * 1.7);
      const curvedBack = new THREE.Mesh(curvedBackGeo, matWall);
      curvedBack.position.y = rotundaHeight / 2;
      curvedBack.castShadow = true;
      curvedBack.receiveShadow = true;
      rotundaGroup.add(curvedBack);

      // Curved front glass-paneled facade curtain section (Phase 2 detail)
      const glassCurvedGeo = new THREE.CylinderGeometry(rotundaRadius - 0.2, rotundaRadius - 0.2, rotundaHeight - 2, 32, 1, false, -Math.PI * 0.35, Math.PI * 0.7);
      const glassCurved = new THREE.Mesh(glassCurvedGeo, matGlass);
      glassCurved.position.y = (rotundaHeight - 2) / 2 + 1;
      glassCurved.castShadow = true;
      rotundaGroup.add(glassCurved);

      // Curved Portico Colonnade (Columns along front curved facade)
      const numColumns = 10;
      const colRadius = 0.65;
      const colDist = rotundaRadius + 2.8;
      const angleStart = -Math.PI * 0.32;
      const angleEnd = Math.PI * 0.32;

      for (let i = 0; i < numColumns; i++) {
        const theta = angleStart + (i / (numColumns - 1)) * (angleEnd - angleStart);
        const colGeo = new THREE.CylinderGeometry(colRadius * 0.9, colRadius, rotundaHeight, 16);
        const colMesh = new THREE.Mesh(colGeo, matWall);
        colMesh.position.set(Math.sin(theta) * colDist, rotundaHeight / 2, Math.cos(theta) * colDist);
        colMesh.castShadow = true;
        colMesh.receiveShadow = true;
        rotundaGroup.add(colMesh);

        // Column capital & base
        const capGeo = new THREE.BoxGeometry(colRadius * 2.4, 0.5, colRadius * 2.4);
        const capMesh = new THREE.Mesh(capGeo, matWall);
        capMesh.position.set(Math.sin(theta) * colDist, rotundaHeight + 0.25, Math.cos(theta) * colDist);
        rotundaGroup.add(capMesh);
      }

      // Curved Entablature & Roof Cornice
      const entablatureGeo = new THREE.CylinderGeometry(rotundaRadius + 3.4, rotundaRadius + 3.4, 1.4, 48, 1, false, -Math.PI * 0.38, Math.PI * 0.76);
      const entablature = new THREE.Mesh(entablatureGeo, matWall);
      entablature.position.y = rotundaHeight + 0.7;
      entablature.castShadow = true;
      rotundaGroup.add(entablature);

      // Rotunda decorative parapet
      const parapetGeo = new THREE.CylinderGeometry(rotundaRadius + 0.6, rotundaRadius + 0.6, 1.2, 48, 1, true);
      const parapet = new THREE.Mesh(parapetGeo, matWall);
      parapet.position.y = rotundaHeight + 0.6;
      rotundaGroup.add(parapet);
    }

    // Polished stone flooring inside rotunda (Phases 2-4)
    const floorGeo = new THREE.CircleGeometry(rotundaRadius - 0.2, 36);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMesh = new THREE.Mesh(floorGeo, matFloor);
    floorMesh.position.y = 0.05;
    floorMesh.receiveShadow = true;
    rotundaGroup.add(floorMesh);

    // Museum Central Exhibition Island & Relics (inside Rotunda)
    const exhibitGroup = new THREE.Group();
    exhibitGroup.name = 'Rotunda_Exhibit_Island';
    
    // Central Octagonal Pedestal
    const pedGeo = new THREE.CylinderGeometry(2.8, 3.2, 0.9, 8);
    const pedMesh = new THREE.Mesh(pedGeo, isTextured ? this.materials.pedestalDark : matWall);
    pedMesh.position.y = 0.45;
    pedMesh.receiveShadow = true;
    exhibitGroup.add(pedMesh);

    // Chola Bronze Nataraja Sculpture (Centerpiece)
    const natarajaRing = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.12, 10, 32), isTextured ? this.materials.bronzeArtifact : this.materials.goldArtifact);
    natarajaRing.position.y = 0.9 + 1.3;
    exhibitGroup.add(natarajaRing);

    const natarajaFigure = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 1.4, 8), isTextured ? this.materials.bronzeArtifact : this.materials.goldArtifact);
    natarajaFigure.position.y = 0.9 + 0.9;
    exhibitGroup.add(natarajaFigure);

    // Glass Showcase Enclosure
    const caseGeo = new THREE.CylinderGeometry(2.4, 2.4, 2.6, 16, 1, true);
    const caseGlass = new THREE.Mesh(caseGeo, isTextured ? this.materials.clearGlass : this.materials.detailedGlassClay);
    caseGlass.position.y = 0.9 + 1.3;
    exhibitGroup.add(caseGlass);

    // 4 Flanking Gallery Pedestals with Ancient Artifacts
    const artifactOffsets = [
      { x: -6, z: -4 }, { x: 6, z: -4 },
      { x: -6, z: 4 },  { x: 6, z: 4 }
    ];
    artifactOffsets.forEach((pos) => {
      const stand = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), isTextured ? this.materials.pedestalDark : matWall);
      stand.position.set(pos.x, 0.6, pos.z);
      stand.receiveShadow = true;
      exhibitGroup.add(stand);

      // Gold / Bronze Relic
      const relic = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4), isTextured ? this.materials.goldArtifact : this.materials.bronzeArtifact);
      relic.position.set(pos.x, 1.5, pos.z);
      exhibitGroup.add(relic);
    });

    // Warm Museum Gallery Spotlights illuminating the rotunda hall
    const museumSpot = new THREE.PointLight(0xfff3e0, 3.4, 30);
    museumSpot.position.set(0, rotundaHeight - 2, 0);
    museumSpot.castShadow = true;
    exhibitGroup.add(museumSpot);

    rotundaGroup.add(exhibitGroup);

    root.add(rotundaGroup);

    // =============================================================
    // 3. CENTRAL DOME WITH CIRCULAR SKYLIGHTS
    // =============================================================
    const domeGroup = new THREE.Group();
    domeGroup.name = 'CentralDomeAndSkylights';
    domeGroup.position.y = plinthH + rotundaHeight;

    const domeRadius = 14;
    const domeHeight = 9;

    // Drum beneath dome
    const drumGeo = new THREE.CylinderGeometry(domeRadius, domeRadius, 3.5, 36);
    const drumMesh = new THREE.Mesh(drumGeo, matWall);
    drumMesh.position.y = 1.75;
    drumMesh.castShadow = true;
    domeGroup.add(drumMesh);

    if (!isDetailed) {
      // Phase 1: Simple geometric low-poly hemisphere dome
      const domeGeo = new THREE.SphereGeometry(domeRadius, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMesh = new THREE.Mesh(domeGeo, matDome);
      domeMesh.position.y = 3.5;
      domeMesh.scale.set(1, domeHeight / domeRadius, 1);
      domeMesh.castShadow = true;
      domeGroup.add(domeMesh);
    } else {
      // Phase 2-4: Architectural Detailing with Circular Skylights / Oculus
      // Dome shell
      const domeGeo = new THREE.SphereGeometry(domeRadius, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMesh = new THREE.Mesh(domeGeo, matDome);
      domeMesh.position.y = 3.5;
      domeMesh.scale.set(1, domeHeight / domeRadius, 1);
      domeMesh.castShadow = true;
      domeGroup.add(domeMesh);

      // Central Oculus / Skylight Crown
      const oculusRadius = 3.2;
      const oculusRingGeo = new THREE.TorusGeometry(oculusRadius, 0.45, 12, 32);
      oculusRingGeo.rotateX(Math.PI / 2);
      const oculusRing = new THREE.Mesh(oculusRingGeo, matSteel);
      oculusRing.position.y = 3.5 + domeHeight - 0.2;
      domeGroup.add(oculusRing);

      // Glass skylight dome apex
      const glassOculusGeo = new THREE.CircleGeometry(oculusRadius, 32);
      glassOculusGeo.rotateX(-Math.PI / 2);
      const glassOculus = new THREE.Mesh(glassOculusGeo, isTextured ? this.materials.clearGlass : this.materials.detailedGlassClay);
      glassOculus.position.y = 3.5 + domeHeight - 0.15;
      domeGroup.add(glassOculus);

      // Ring of circular skylights around the dome flank (Phase 2 detail)
      const numSkylights = 12;
      const skylightR = 1.1;
      const orbitDist = domeRadius * 0.65;
      const skylightY = 3.5 + domeHeight * 0.55;

      for (let k = 0; k < numSkylights; k++) {
        const phi = (k / numSkylights) * Math.PI * 2;
        const sx = Math.cos(phi) * orbitDist;
        const sz = Math.sin(phi) * orbitDist;

        const skylightFrameGeo = new THREE.CylinderGeometry(skylightR, skylightR, 0.4, 16);
        const skylightFrame = new THREE.Mesh(skylightFrameGeo, matSteel);
        skylightFrame.position.set(sx, skylightY, sz);
        skylightFrame.lookAt(sx * 1.5, skylightY + 2, sz * 1.5);
        skylightFrame.castShadow = true;
        domeGroup.add(skylightFrame);

        const skylightGlassGeo = new THREE.CircleGeometry(skylightR * 0.9, 16);
        const skylightGlass = new THREE.Mesh(skylightGlassGeo, isTextured ? this.materials.clearGlass : this.materials.detailedGlassClay);
        skylightGlass.position.set(sx, skylightY + 0.1, sz);
        skylightGlass.lookAt(sx * 1.5, skylightY + 2, sz * 1.5);
        domeGroup.add(skylightGlass);
      }
    }

    root.add(domeGroup);

    // =============================================================
    // 4. MULTIPLE EXHIBITION WINGS EXTENDING OUTWARD
    // =============================================================
    const wingsGroup = new THREE.Group();
    wingsGroup.name = 'ExhibitionWings';
    wingsGroup.position.y = plinthH;

    // Wing dimensions
    const wingLength = 26;
    const wingWidth = 16;
    const wingHeight = 12;

    const wingConfigs = [
      // East Exhibition Wing (Sculptures & Archaeology)
      { x: 30, z: -4, rotY: 0.3, name: 'EastWing_Archaeology' },
      // West Exhibition Wing (Manuscripts & Paintings)
      { x: -30, z: -4, rotY: -0.3, name: 'WestWing_Manuscripts' },
      // South / Rear Exhibition Wing (Numismatics & Prehistory)
      { x: 0, z: -32, rotY: Math.PI, name: 'SouthWing_Numismatics' }
    ];

    wingConfigs.forEach(cfg => {
      const wing = new THREE.Group();
      wing.name = cfg.name;
      wing.position.set(cfg.x, 0, cfg.z);
      wing.rotation.y = cfg.rotY;

      if (!isDetailed) {
        // Phase 1: Simple low-poly rectangular wing block
        const bodyGeo = new THREE.BoxGeometry(wingLength, wingHeight, wingWidth);
        const bodyMesh = new THREE.Mesh(bodyGeo, matWall);
        bodyMesh.position.y = wingHeight / 2;
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        wing.add(bodyMesh);
      } else {
        // Phase 2-4: Architectural detailing with tall glass facade sections & parapet
        const bodyGeo = new THREE.BoxGeometry(wingLength, wingHeight, wingWidth);
        const bodyMesh = new THREE.Mesh(bodyGeo, matWall);
        bodyMesh.position.y = wingHeight / 2;
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        wing.add(bodyMesh);

        // Tall modern glass-paneled facade curtain section on outer wall
        const glassW = wingLength * 0.72;
        const glassH = wingHeight * 0.65;
        const glassGeo = new THREE.PlaneGeometry(glassW, glassH);
        const glassMesh = new THREE.Mesh(glassGeo, matGlass);
        glassMesh.position.set(0, wingHeight * 0.5, wingWidth / 2 + 0.1);
        wing.add(glassMesh);

        // Steel frame border for glass panel
        const frameBoxGeo = new THREE.BoxGeometry(glassW + 0.8, glassH + 0.8, 0.4);
        const frameBox = new THREE.Mesh(frameBoxGeo, matSteel);
        frameBox.position.set(0, wingHeight * 0.5, wingWidth / 2 + 0.05);
        wing.add(frameBox);

        // Roof parapet trim
        const parapetWingGeo = new THREE.BoxGeometry(wingLength + 0.8, 1.0, wingWidth + 0.8);
        const parapetWing = new THREE.Mesh(parapetWingGeo, matWall);
        parapetWing.position.y = wingHeight + 0.5;
        wing.add(parapetWing);

        // Interior Partition Walls dividing galleries (Phase 2 requirement)
        const partitionGeo = new THREE.BoxGeometry(0.5, wingHeight - 1, wingWidth - 2);
        const partitionMat = isTextured ? this.materials.artifactWall : matWall;

        const part1 = new THREE.Mesh(partitionGeo, partitionMat);
        part1.position.set(-wingLength * 0.25, wingHeight / 2, 0);
        wing.add(part1);

        const part2 = new THREE.Mesh(partitionGeo, partitionMat);
        part2.position.set(wingLength * 0.25, wingHeight / 2, 0);
        wing.add(part2);
      }

      wingsGroup.add(wing);
    });

    root.add(wingsGroup);

    // =============================================================
    // 5. GRAND ENTRANCE STAIRCASE (Phase 2 Detailing)
    // =============================================================
    if (isDetailed) {
      const stairGroup = new THREE.Group();
      stairGroup.name = 'GrandEntranceStaircase';

      const numSteps = 16;
      const stairW = 28;
      const totalDepth = 16;
      const stepH = plinthH / numSteps;
      const stepD = totalDepth / numSteps;

      for (let s = 0; s < numSteps; s++) {
        const w = stairW + s * 0.4; // Slightly flaring grand stairs
        const d = totalDepth - s * stepD;
        const stepGeo = new THREE.BoxGeometry(w, stepH, d);
        const stepMesh = new THREE.Mesh(stepGeo, matPlinth);
        stepMesh.position.set(0, (s + 0.5) * stepH, 36 + (totalDepth - s * stepD) / 2);
        stepMesh.receiveShadow = true;
        stepMesh.castShadow = true;
        stairGroup.add(stepMesh);
      }

      // Flanking monumental balustrade cheek walls
      const cheekGeo = new THREE.BoxGeometry(1.6, plinthH + 1.2, totalDepth + 2);
      const cheekLeft = new THREE.Mesh(cheekGeo, matPlinth);
      cheekLeft.position.set(-stairW / 2 - 1.2, (plinthH + 1.2) / 2, 36 + totalDepth / 2);
      cheekLeft.castShadow = true;
      stairGroup.add(cheekLeft);

      const cheekRight = new THREE.Mesh(cheekGeo, matPlinth);
      cheekRight.position.set(stairW / 2 + 1.2, (plinthH + 1.2) / 2, 36 + totalDepth / 2);
      cheekRight.castShadow = true;
      stairGroup.add(cheekRight);

      root.add(stairGroup);
    }

    // =============================================================
    // 6. INTERIOR TEXTURES, DISPLAY CASES & ARTIFACTS (Phase 3)
    // =============================================================
    if (phase >= 3) {
      const interiorGroup = new THREE.Group();
      interiorGroup.name = 'InteriorGalleryElements';
      interiorGroup.position.y = plinthH;

      // Gallery walkway carpet runners
      const carpetGeo = new THREE.PlaneGeometry(6, 28);
      carpetGeo.rotateX(-Math.PI / 2);
      const mainRunner = new THREE.Mesh(carpetGeo, this.materials.galleryCarpet);
      mainRunner.position.set(0, 0.08, 10);
      interiorGroup.add(mainRunner);

      // Display cases with glass enclosure and historic relics
      const casePositions = [
        { x: -7, z: 12, relic: 'bronze' },
        { x: 7, z: 12, relic: 'gold' },
        { x: -10, z: 4, relic: 'bronze' },
        { x: 10, z: 4, relic: 'gold' },
        { x: 0, z: 0, relic: 'gold' } // Central rotunda master relic
      ];

      casePositions.forEach((cp, idx) => {
        const displayCase = new THREE.Group();
        displayCase.name = `DisplayCase_${idx + 1}`;
        displayCase.position.set(cp.x, 0, cp.z);

        // Pedestal base
        const pedGeo = new THREE.BoxGeometry(1.6, 2.2, 1.6);
        const pedMesh = new THREE.Mesh(pedGeo, this.materials.pedestalDark);
        pedMesh.position.y = 1.1;
        pedMesh.castShadow = true;
        displayCase.add(pedMesh);

        // Glass display case cube
        const glassBoxGeo = new THREE.BoxGeometry(1.5, 1.8, 1.5);
        const glassBoxMesh = new THREE.Mesh(glassBoxGeo, this.materials.clearGlass);
        glassBoxMesh.position.y = 2.2 + 0.9;
        displayCase.add(glassBoxMesh);

        // Relic model inside case
        let relicMesh;
        if (cp.relic === 'gold') {
          // Ancient Stupa / Golden Relic Urn
          const relicGeo = new THREE.CylinderGeometry(0.2, 0.45, 0.9, 16);
          relicMesh = new THREE.Mesh(relicGeo, this.materials.goldArtifact);
          const topFinial = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.5, 16), this.materials.goldArtifact);
          topFinial.position.y = 0.65;
          relicMesh.add(topFinial);
        } else {
          // Iconic Bronze Figurine (Dancing Girl inspired sculpture)
          const relicGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.85, 12);
          relicMesh = new THREE.Mesh(relicGeo, this.materials.bronzeArtifact);
          const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), this.materials.bronzeArtifact);
          headMesh.position.y = 0.55;
          relicMesh.add(headMesh);
        }
        relicMesh.position.y = 2.2 + 0.5;
        relicMesh.castShadow = true;
        displayCase.add(relicMesh);

        interiorGroup.add(displayCase);
      });

      root.add(interiorGroup);
    }

    return root;
  }

  /**
   * Phase 4: Open City Plaza with Grand Fountain & Manicured Lawns
   */
  buildPlazaEnvironment() {
    const envGroup = new THREE.Group();
    envGroup.name = 'CityPlazaEnvironment';

    // 1. Vast City Ground & Plaza Platform
    const plazaW = 240;
    const plazaD = 240;
    const groundGeo = new THREE.PlaneGeometry(plazaW, plazaD);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMesh = new THREE.Mesh(groundGeo, this.materials.plazaPavers);
    groundMesh.receiveShadow = true;
    envGroup.add(groundMesh);

    // 2. Grand Tiered Plaza Fountain in front of the museum
    const fountainGroup = new THREE.Group();
    fountainGroup.name = 'PlazaFountain';
    fountainGroup.position.set(0, 0, 78);

    // Outer circular stone basin
    const basinOuterR = 15;
    const basinInnerR = 14;
    const basinH = 1.6;

    const outerBasinGeo = new THREE.CylinderGeometry(basinOuterR, basinOuterR + 0.5, basinH, 48);
    const outerBasin = new THREE.Mesh(outerBasinGeo, this.materials.texturedSandstone);
    outerBasin.position.y = basinH / 2;
    outerBasin.castShadow = true;
    outerBasin.receiveShadow = true;
    fountainGroup.add(outerBasin);

    // Water surface
    const waterGeo = new THREE.CircleGeometry(basinInnerR, 48);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMesh = new THREE.Mesh(waterGeo, this.waterMaterial);
    waterMesh.position.y = basinH - 0.2;
    fountainGroup.add(waterMesh);

    // Central Tiered Fountain Pedestal & Upper Basin
    const midPedGeo = new THREE.CylinderGeometry(3.5, 4.2, 3.2, 32);
    const midPed = new THREE.Mesh(midPedGeo, this.materials.texturedSandstone);
    midPed.position.y = 1.6;
    midPed.castShadow = true;
    fountainGroup.add(midPed);

    const upperBasinGeo = new THREE.CylinderGeometry(6.5, 4.0, 1.2, 36);
    const upperBasin = new THREE.Mesh(upperBasinGeo, this.materials.texturedSandstone);
    upperBasin.position.y = 3.8;
    upperBasin.castShadow = true;
    fountainGroup.add(upperBasin);

    // Upper water pool
    const upperWaterGeo = new THREE.CircleGeometry(6.0, 36);
    upperWaterGeo.rotateX(-Math.PI / 2);
    const upperWater = new THREE.Mesh(upperWaterGeo, this.waterMaterial);
    upperWater.position.y = 4.35;
    fountainGroup.add(upperWater);

    // Central vertical water jet sprayers
    const jetGeo = new THREE.ConeGeometry(1.2, 7.5, 16);
    const jetMat = new THREE.MeshBasicMaterial({
      color: 0xebf8ff,
      transparent: true,
      opacity: 0.65
    });
    const mainJet = new THREE.Mesh(jetGeo, jetMat);
    mainJet.position.y = 7.8;
    fountainGroup.add(mainJet);

    // Ring of 8 arc water spray jets
    const numSprays = 8;
    for (let j = 0; j < numSprays; j++) {
      const sprayAngle = (j / numSprays) * Math.PI * 2;
      const sprayGeo = new THREE.ConeGeometry(0.45, 3.8, 12);
      const sprayMesh = new THREE.Mesh(sprayGeo, jetMat);
      sprayMesh.position.set(Math.cos(sprayAngle) * 8.5, 3.2, Math.sin(sprayAngle) * 8.5);
      sprayMesh.rotation.z = Math.cos(sprayAngle) * 0.3;
      sprayMesh.rotation.x = -Math.sin(sprayAngle) * 0.3;
      fountainGroup.add(sprayMesh);
    }

    envGroup.add(fountainGroup);

    // 3. Symmetrical Manicured Lawns & Hedge Borders Flanking Plaza
    const lawnConfigs = [
      // Front Left Lawn
      { x: -44, z: 62, w: 32, d: 52 },
      // Front Right Lawn
      { x: 44, z: 62, w: 32, d: 52 },
      // Side Left Lawn
      { x: -55, z: 6, w: 28, d: 48 },
      // Side Right Lawn
      { x: 55, z: 6, w: 28, d: 48 }
    ];

    lawnConfigs.forEach((lc) => {
      const lawnGeo = new THREE.PlaneGeometry(lc.w, lc.d);
      lawnGeo.rotateX(-Math.PI / 2);
      const lawnMesh = new THREE.Mesh(lawnGeo, this.materials.manicuredLawn);
      lawnMesh.position.set(lc.x, 0.06, lc.z);
      lawnMesh.receiveShadow = true;
      envGroup.add(lawnMesh);

      // Low Boxwood Hedge Border
      const hedgeH = 1.1;
      const hedgeT = 1.0;
      // North & South hedge edges
      const hedgeNSGeo = new THREE.BoxGeometry(lc.w + hedgeT, hedgeH, hedgeT);
      const hedgeN = new THREE.Mesh(hedgeNSGeo, this.materials.hedge);
      hedgeN.position.set(lc.x, hedgeH / 2, lc.z - lc.d / 2);
      hedgeN.castShadow = true;
      envGroup.add(hedgeN);

      const hedgeS = new THREE.Mesh(hedgeNSGeo, this.materials.hedge);
      hedgeS.position.set(lc.x, hedgeH / 2, lc.z + lc.d / 2);
      hedgeS.castShadow = true;
      envGroup.add(hedgeS);

      // East & West hedge edges
      const hedgeEWGeo = new THREE.BoxGeometry(hedgeT, hedgeH, lc.d);
      const hedgeE = new THREE.Mesh(hedgeEWGeo, this.materials.hedge);
      hedgeE.position.set(lc.x + lc.w / 2, hedgeH / 2, lc.z);
      hedgeE.castShadow = true;
      envGroup.add(hedgeE);

      const hedgeW = new THREE.Mesh(hedgeEWGeo, this.materials.hedge);
      hedgeW.position.set(lc.x - lc.w / 2, hedgeH / 2, lc.z);
      hedgeW.castShadow = true;
      envGroup.add(hedgeW);
    });

    // 4. Photorealistic Sky Dome for Daytime Render
    const skyGeo = new THREE.SphereGeometry(450, 32, 24);
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 1024;
    skyCanvas.height = 512;
    const sCtx = skyCanvas.getContext('2d');
    const skyGrad = sCtx.createLinearGradient(0, 0, 0, 512);
    skyGrad.addColorStop(0, '#1f6596'); // Deep zenith blue
    skyGrad.addColorStop(0.5, '#62a8d6'); // Cerulean sky
    skyGrad.addColorStop(0.85, '#bed9ea'); // Soft horizon haze
    skyGrad.addColorStop(1, '#e3eff7'); // Bright horizon glow
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
   * Phase 4: Lighting Setup (Exterior bright daytime sun, skylights daylight, and interior gallery spotlights)
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = 'NationalMuseumLighting';

    if (phase === 4) {
      // -------------------------------------------------------------
      // Bright Daytime Exterior Sun & Sky Lighting
      // -------------------------------------------------------------
      const sunLight = new THREE.DirectionalLight(0xfffaed, 2.6);
      sunLight.position.set(65, 95, 75);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      sunLight.shadow.bias = -0.0003;
      const d = 85;
      sunLight.shadow.camera.left = -d;
      sunLight.shadow.camera.right = d;
      sunLight.shadow.camera.top = d;
      sunLight.shadow.camera.bottom = -d;
      sunLight.shadow.camera.near = 10;
      sunLight.shadow.camera.far = 300;
      lightGroup.add(sunLight);

      // Sky hemisphere ambient fill
      const hemiLight = new THREE.HemisphereLight(0x76b4e0, 0x484236, 1.25);
      hemiLight.position.set(0, 80, 0);
      lightGroup.add(hemiLight);

      // -------------------------------------------------------------
      // Natural Daylight beam from Skylight / Oculus straight into Atrium
      // -------------------------------------------------------------
      const skylightBeam = new THREE.SpotLight(0xfff7e8, 2.2, 50, Math.PI / 5, 0.4, 1.2);
      skylightBeam.position.set(0, 32, 0);
      skylightBeam.target.position.set(0, 2.4, 0);
      lightGroup.add(skylightBeam);
      lightGroup.add(skylightBeam.target);

      // -------------------------------------------------------------
      // Soft Interior Gallery Spotlights focused on Display Areas
      // -------------------------------------------------------------
      const spotConfigs = [
        { x: -7, y: 8, z: 12, tx: -7, tz: 12 },
        { x: 7, y: 8, z: 12, tx: 7, tz: 12 },
        { x: -10, y: 8, z: 4, tx: -10, tz: 4 },
        { x: 10, y: 8, z: 4, tx: 10, tz: 4 },
        { x: 0, y: 8, z: 0, tx: 0, tz: 0 }
      ];

      spotConfigs.forEach((sc) => {
        const spot = new THREE.SpotLight(0xffecd0, 1.8, 14, Math.PI / 6, 0.5, 1.5);
        spot.position.set(sc.x, sc.y, sc.z);
        spot.target.position.set(sc.tx, 2.4, sc.tz);
        lightGroup.add(spot);
        lightGroup.add(spot.target);

        // Small warm bulb glow representation
        const bulb = new THREE.PointLight(0xffd59e, 0.8, 6);
        bulb.position.set(sc.x, sc.y - 0.2, sc.z);
        lightGroup.add(bulb);
      });

      // Subtle atmospheric fog for photoreal depth
      scene.fog = new THREE.FogExp2(0xd6e5f0, 0.0022);
    } else {
      // Phases 1-3: Clean Architectural Studio Lighting
      scene.fog = null;
      scene.background = new THREE.Color(phase === 1 ? 0x18191c : 0x131417);

      const keyLight = new THREE.DirectionalLight(0xfff5ea, phase === 1 ? 2.3 : 2.0);
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

export const nationalMuseumDelhiBuilder = new NationalMuseumDelhiBuilder();
