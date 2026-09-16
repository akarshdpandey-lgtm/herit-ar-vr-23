import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Mughal Museum Architectural Model
 * Supports Phase 1 (Base Low-Poly), Phase 2 (Architectural Detailing),
 * and Phase 3 (Pietra Dura, Marble, Jali & Calligraphy Materials).
 */
export class MughalMuseumBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // Phase 1: Clean Architectural Low-Poly Clay Material
    this.materials.clayBase = new THREE.MeshStandardMaterial({
      color: 0xeeeeec,
      roughness: 0.65,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayDome = new THREE.MeshStandardMaterial({
      color: 0xf5f5f3,
      roughness: 0.5,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayDark = new THREE.MeshStandardMaterial({
      color: 0x3a3835,
      roughness: 0.8
    });

    // Phase 2: Refined Architectural Shaded Materials (Clay + Detailed Accents)
    this.materials.refinedMarbleClay = new THREE.MeshStandardMaterial({
      color: 0xf2f1ed,
      roughness: 0.45,
      metalness: 0.08,
      flatShading: false
    });

    this.materials.refinedPlinthClay = new THREE.MeshStandardMaterial({
      color: 0xd8d4cb,
      roughness: 0.6,
      metalness: 0.05
    });

    this.materials.goldAccent = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.85
    });

    // Phase 3: Advanced Materials & Textures
    const marbleTex = textureGenerator.getWhiteMarbleTexture();
    const pietraDuraTex = textureGenerator.getPietraDuraTexture();
    const calligraphyTex = textureGenerator.getCalligraphyArchTexture();
    const jaliTex = textureGenerator.getJaliLatticeTexture();
    const sandstoneTex = textureGenerator.getRedSandstonePaverTexture();

    this.materials.texturedMarble = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.28,
      metalness: 0.04,
      bumpMap: marbleTex,
      bumpScale: 0.015
    });

    this.materials.texturedDome = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.22,
      metalness: 0.05,
      bumpMap: marbleTex,
      bumpScale: 0.01
    });

    this.materials.texturedPietraDura = new THREE.MeshStandardMaterial({
      map: pietraDuraTex,
      roughness: 0.25,
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
      alphaTest: 0.5,
      roughness: 0.4,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    this.materials.texturedPlinth = new THREE.MeshStandardMaterial({
      map: sandstoneTex,
      roughness: 0.75,
      metalness: 0.05,
      bumpMap: sandstoneTex,
      bumpScale: 0.02
    });

    this.materials.nicheDark = new THREE.MeshStandardMaterial({
      color: 0x141312,
      roughness: 0.9
    });
  }

  /**
   * Builds the entire Mughal building based on the active phase:
   * @param {number} phase 1, 2, 3, or 4
   * @param {string} viewMode 'realistic' | 'clay' | 'wireframe'
   */
  build(phase = 4, viewMode = 'realistic') {
    const rootGroup = new THREE.Group();
    rootGroup.name = 'MughalMuseum';

    const isTextured = (phase >= 3) && (viewMode === 'realistic');
    const isDetailing = phase >= 2;

    // Select active material suite
    const matHall = isTextured ? this.materials.texturedMarble : (isDetailing ? this.materials.refinedMarbleClay : this.materials.clayBase);
    const matDome = isTextured ? this.materials.texturedDome : (isDetailing ? this.materials.refinedMarbleClay : this.materials.clayDome);
    const matGold = this.materials.goldAccent;
    const matPlinth = isTextured ? this.materials.texturedPlinth : (isDetailing ? this.materials.refinedPlinthClay : this.materials.clayBase);
    const matPietra = isTextured ? this.materials.texturedPietraDura : matHall;
    const matCalligraphy = isTextured ? this.materials.texturedCalligraphy : matHall;
    const matJali = isTextured ? this.materials.texturedJali : this.materials.nicheDark;
    const matDark = this.materials.clayDark;

    // Dimensions (Mughal Proportions based on Taj / Humayun's Tomb symmetry)
    const hallWidth = 28;
    const hallHeight = 16;
    const hallDepth = 28;
    const plinthHeight = isDetailing ? 3.2 : 0.8;
    const plinthWidth = 48;
    const plinthDepth = 48;

    // -------------------------------------------------------------
    // 1. PLINTH / RAISED PLATFORM
    // -------------------------------------------------------------
    const plinthGroup = new THREE.Group();
    plinthGroup.name = 'Plinth';

    if (isDetailing) {
      // Elevated multi-tiered terrace
      const mainPlinthGeo = new THREE.BoxGeometry(plinthWidth, plinthHeight, plinthDepth);
      const mainPlinth = new THREE.Mesh(mainPlinthGeo, matPlinth);
      mainPlinth.position.y = plinthHeight / 2;
      mainPlinth.castShadow = true;
      mainPlinth.receiveShadow = true;
      plinthGroup.add(mainPlinth);

      // Plinth upper decorative molding trim
      const corniceGeo = new THREE.BoxGeometry(plinthWidth + 1.2, 0.4, plinthDepth + 1.2);
      const cornice = new THREE.Mesh(corniceGeo, matHall);
      cornice.position.y = plinthHeight + 0.2;
      cornice.castShadow = true;
      plinthGroup.add(cornice);

      // Front monumental grand staircase
      const numSteps = 10;
      const stairWidth = 10;
      const stairRun = 5;
      for (let s = 0; s < numSteps; s++) {
        const stepH = plinthHeight / numSteps;
        const stepD = stairRun / numSteps;
        const stepGeo = new THREE.BoxGeometry(stairWidth, stepH, stairRun - s * stepD);
        const stepMesh = new THREE.Mesh(stepGeo, matHall);
        stepMesh.position.set(0, (s + 0.5) * stepH, plinthDepth / 2 + (stairRun - s * stepD) / 2);
        stepMesh.receiveShadow = true;
        plinthGroup.add(stepMesh);
      }
    } else {
      // Phase 1 Low-poly scratch base slab
      const baseGeo = new THREE.BoxGeometry(plinthWidth * 0.85, plinthHeight, plinthDepth * 0.85);
      const baseMesh = new THREE.Mesh(baseGeo, matHall);
      baseMesh.position.y = plinthHeight / 2;
      baseMesh.receiveShadow = true;
      plinthGroup.add(baseMesh);
    }
    rootGroup.add(plinthGroup);

    const groundY = plinthHeight;

    // -------------------------------------------------------------
    // 2. MAIN RECTANGULAR HALL (MONUMENTAL FACADE WITH CHAMFERED CORNERS)
    // -------------------------------------------------------------
    const hallGroup = new THREE.Group();
    hallGroup.name = 'MainHall';
    hallGroup.position.y = groundY;

    // Central octagonal/chamfered massing
    const chamfer = 4.5;
    const shape = new THREE.Shape();
    const halfW = hallWidth / 2;
    const halfD = hallDepth / 2;

    shape.moveTo(-halfW + chamfer, -halfD);
    shape.lineTo(halfW - chamfer, -halfD);
    shape.lineTo(halfW, -halfD + chamfer);
    shape.lineTo(halfW, halfD - chamfer);
    shape.lineTo(halfW - chamfer, halfD);
    shape.lineTo(-halfW + chamfer, halfD);
    shape.lineTo(-halfW, halfD - chamfer);
    shape.lineTo(-halfW, -halfD + chamfer);
    shape.closePath();

    const extrudeSettings = {
      depth: hallHeight,
      bevelEnabled: false
    };
    const hallGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    hallGeo.rotateX(Math.PI / 2); // Orient upright
    hallGeo.translate(0, hallHeight, 0);

    const hallMesh = new THREE.Mesh(hallGeo, matHall);
    hallMesh.castShadow = true;
    hallMesh.receiveShadow = true;
    hallGroup.add(hallMesh);

    // -------------------------------------------------------------
    // 3. ARCHED ENTRANCE GATE (PISHTAQ) & IWANS
    // -------------------------------------------------------------
    const createIwan = (width, height, depth, isMain = true) => {
      const iwanGroup = new THREE.Group();

      // Deep recessed cavity
      const nicheGeo = new THREE.BoxGeometry(width, height, depth);
      const niche = new THREE.Mesh(nicheGeo, matDark);
      niche.position.set(0, height / 2, -depth / 2);
      iwanGroup.add(niche);

      // Pointed arch vault top
      const archR = width / 2;
      const archProfile = new THREE.CylinderGeometry(archR, archR, depth, 16, 1, false, 0, Math.PI);
      archProfile.rotateZ(Math.PI / 2);
      archProfile.rotateX(Math.PI / 2);
      const archVault = new THREE.Mesh(archProfile, matDark);
      archVault.position.set(0, height, -depth / 2);
      iwanGroup.add(archVault);

      // Arch Surround / Framing Portal
      const frameThick = isMain ? 1.6 : 0.8;
      const frameGeo = new THREE.BoxGeometry(width + frameThick * 2, height + archR + frameThick, 0.4);
      const frameMesh = new THREE.Mesh(frameGeo, isMain ? matCalligraphy : matPietra);
      frameMesh.position.set(0, (height + archR) / 2, 0.2);
      iwanGroup.add(frameMesh);

      // Pietra Dura Spandrels & Jali Window inside niche (Phase 3+)
      if (phase >= 3) {
        // Pietra Dura spandrel corner panels
        const spandrelGeo = new THREE.PlaneGeometry(frameThick * 1.8, frameThick * 1.8);
        const spandrelL = new THREE.Mesh(spandrelGeo, matPietra);
        spandrelL.position.set(-width / 2 - frameThick * 0.5, height + archR * 0.4, 0.42);
        iwanGroup.add(spandrelL);

        const spandrelR = spandrelL.clone();
        spandrelR.position.x = width / 2 + frameThick * 0.5;
        iwanGroup.add(spandrelR);

        // Jali Lattice screen inside the arch niche
        const jaliGeo = new THREE.PlaneGeometry(width * 0.7, height * 0.65);
        const jaliMesh = new THREE.Mesh(jaliGeo, matJali);
        jaliMesh.position.set(0, height * 0.45, -depth * 0.85);
        iwanGroup.add(jaliMesh);
      }

      return iwanGroup;
    };

    // Front monumental Pishtaq (Grand Arched Entrance)
    const mainIwan = createIwan(10, 11, 4.5, true);
    mainIwan.position.set(0, 0, halfD + 0.05);
    hallGroup.add(mainIwan);

    // Symmetrical Back Iwan
    const backIwan = createIwan(10, 11, 4.5, true);
    backIwan.rotation.y = Math.PI;
    backIwan.position.set(0, 0, -halfD - 0.05);
    hallGroup.add(backIwan);

    // Symmetrical Left and Right Side Main Iwans
    const leftIwan = createIwan(9, 10, 3.8, false);
    leftIwan.rotation.y = -Math.PI / 2;
    leftIwan.position.set(-halfW - 0.05, 0, 0);
    hallGroup.add(leftIwan);

    const rightIwan = createIwan(9, 10, 3.8, false);
    rightIwan.rotation.y = Math.PI / 2;
    rightIwan.position.set(halfW + 0.05, 0, 0);
    hallGroup.add(rightIwan);

    // Architectural Detailing: Two-tiered secondary side niches (Phase 2+)
    if (isDetailing) {
      const addFlankingNiches = (xOffset, zPos, rotY) => {
        const nicheGroup = new THREE.Group();
        // Lower niche
        const lowerNiche = createIwan(3.4, 4.2, 1.8, false);
        lowerNiche.position.set(0, 0.5, 0);
        nicheGroup.add(lowerNiche);

        // Upper niche
        const upperNiche = createIwan(3.4, 4.2, 1.8, false);
        upperNiche.position.set(0, 7.2, 0);
        nicheGroup.add(upperNiche);

        nicheGroup.position.set(xOffset, 0, zPos);
        nicheGroup.rotation.y = rotY;
        hallGroup.add(nicheGroup);
      };

      // Front flanking niches
      addFlankingNiches(-9.2, halfD + 0.02, 0);
      addFlankingNiches(9.2, halfD + 0.02, 0);
      // Rear flanking niches
      addFlankingNiches(-9.2, -halfD - 0.02, Math.PI);
      addFlankingNiches(9.2, -halfD - 0.02, Math.PI);
    }

    // -------------------------------------------------------------
    // 4. ROOFLINE, DECORATIVE PARAPETS (KANGURAS) (Phase 2+)
    // -------------------------------------------------------------
    if (isDetailing) {
      const parapetHeight = 1.0;
      const parapetThickness = 0.6;

      // Outer parapet wall
      const createParapetWall = (len, isXAxis) => {
        const group = new THREE.Group();
        const wallGeo = new THREE.BoxGeometry(isXAxis ? len : parapetThickness, parapetHeight, isXAxis ? parapetThickness : len);
        const wallMesh = new THREE.Mesh(wallGeo, matHall);
        wallMesh.position.y = parapetHeight / 2;
        group.add(wallMesh);

        // Kanguras (crenellated decorative battlements)
        const kanguraCount = Math.floor(len / 1.4);
        for (let k = 0; k < kanguraCount; k++) {
          const kGeo = new THREE.ConeGeometry(0.35, 0.65, 4);
          kGeo.rotateY(Math.PI / 4);
          const kMesh = new THREE.Mesh(kGeo, matHall);
          const offset = -len / 2 + (k + 0.5) * (len / kanguraCount);
          if (isXAxis) {
            kMesh.position.set(offset, parapetHeight + 0.3, 0);
          } else {
            kMesh.position.set(0, parapetHeight + 0.3, offset);
          }
          group.add(kMesh);
        }
        return group;
      };

      const pFront = createParapetWall(hallWidth - chamfer * 2, true);
      pFront.position.set(0, hallHeight, halfD);
      hallGroup.add(pFront);

      const pBack = createParapetWall(hallWidth - chamfer * 2, true);
      pBack.position.set(0, hallHeight, -halfD);
      hallGroup.add(pBack);

      const pLeft = createParapetWall(hallDepth - chamfer * 2, false);
      pLeft.position.set(-halfW, hallHeight, 0);
      hallGroup.add(pLeft);

      const pRight = createParapetWall(hallDepth - chamfer * 2, false);
      pRight.position.set(halfW, hallHeight, 0);
      hallGroup.add(pRight);
    }

    // -------------------------------------------------------------
    // 5. CENTRAL WHITE MARBLE DOME & DRUM
    // -------------------------------------------------------------
    const domeGroup = new THREE.Group();
    domeGroup.name = 'CentralDome';
    domeGroup.position.set(0, hallHeight, 0);

    // High cylindrical drum (characteristic of Mughal imperial domes)
    const drumRadius = 6.2;
    const drumHeight = isDetailing ? 4.5 : 2.8;
    const drumGeo = new THREE.CylinderGeometry(drumRadius, drumRadius + 0.3, drumHeight, 32);
    const drumMesh = new THREE.Mesh(drumGeo, matHall);
    drumMesh.position.y = drumHeight / 2;
    drumMesh.castShadow = true;
    domeGroup.add(drumMesh);

    // Drum decorative relief blind arcade (Phase 2+)
    if (isDetailing) {
      const drumTrimGeo = new THREE.TorusGeometry(drumRadius + 0.35, 0.25, 8, 32);
      drumTrimGeo.rotateX(Math.PI / 2);
      const drumTrim = new THREE.Mesh(drumTrimGeo, matHall);
      drumTrim.position.y = drumHeight;
      domeGroup.add(drumTrim);
    }

    // Classic bulbous onion dome (Amrud shape)
    const domePoints = [];
    const segments = 24;
    const maxR = drumRadius * 1.25; // Expands outward
    const domeH = 9.5;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments; // 0 to 1
      const y = t * domeH;
      // Bulbous curve formula: expands above the drum, narrows to a pointed apex
      let r;
      if (t < 0.35) {
        // Swelling outwards
        r = drumRadius + (maxR - drumRadius) * Math.sin((t / 0.35) * (Math.PI / 2));
      } else {
        // Pointed inward taper
        const p = (t - 0.35) / 0.65;
        r = maxR * Math.cos(p * (Math.PI / 2));
      }
      domePoints.push(new THREE.Vector2(Math.max(0.01, r), y));
    }

    const domeGeo = new THREE.LatheGeometry(domePoints, 36);
    const domeMesh = new THREE.Mesh(domeGeo, matDome);
    domeMesh.position.y = drumHeight;
    domeMesh.castShadow = true;
    domeGroup.add(domeMesh);

    // Inverted Lotus Crown & Golden Finial (Kalasa)
    const finialGroup = new THREE.Group();
    finialGroup.position.y = drumHeight + domeH;

    // Lotus petal collar
    const lotusGeo = new THREE.ConeGeometry(1.6, 0.8, 16);
    lotusGeo.rotateX(Math.PI);
    const lotusMesh = new THREE.Mesh(lotusGeo, matHall);
    finialGroup.add(lotusMesh);

    // Gilded brass/gold kalasa finial with crescent moon
    const kalasaStem = new THREE.CylinderGeometry(0.18, 0.28, 2.8, 12);
    const kalasaMesh = new THREE.Mesh(kalasaStem, matGold);
    kalasaMesh.position.y = 1.4;
    finialGroup.add(kalasaMesh);

    const kalasaSphere = new THREE.SphereGeometry(0.55, 16, 16);
    const sphereMesh = new THREE.Mesh(kalasaSphere, matGold);
    sphereMesh.position.y = 2.4;
    finialGroup.add(sphereMesh);

    const finialSpire = new THREE.ConeGeometry(0.18, 1.2, 8);
    const spireMesh = new THREE.Mesh(finialSpire, matGold);
    spireMesh.position.y = 3.6;
    finialGroup.add(spireMesh);

    domeGroup.add(finialGroup);
    hallGroup.add(domeGroup);

    // -------------------------------------------------------------
    // 6. CHHATRIS (SMALL DOMED KIOSKS) ON ROOF (Phase 2+)
    // -------------------------------------------------------------
    if (isDetailing) {
      const createChhatri = (scale = 1) => {
        const chGroup = new THREE.Group();

        // 4 or 8 Pillars
        const numPillars = 4;
        const pillarDist = 1.2 * scale;
        const pillarH = 2.4 * scale;
        for (let p = 0; p < numPillars; p++) {
          const angle = (p * Math.PI * 2) / numPillars + Math.PI / 4;
          const px = Math.cos(angle) * pillarDist;
          const pz = Math.sin(angle) * pillarDist;
          const pillarGeo = new THREE.CylinderGeometry(0.12 * scale, 0.14 * scale, pillarH, 8);
          const pillar = new THREE.Mesh(pillarGeo, matHall);
          pillar.position.set(px, pillarH / 2, pz);
          chGroup.add(pillar);
        }

        // Chhatri Base & Chhajja (projecting eaves)
        const eaveGeo = new THREE.ConeGeometry(2.1 * scale, 0.4 * scale, 8);
        const eave = new THREE.Mesh(eaveGeo, matHall);
        eave.position.y = pillarH;
        chGroup.add(eave);

        // Cupola miniature dome
        const cupolaGeo = new THREE.SphereGeometry(1.2 * scale, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
        const cupola = new THREE.Mesh(cupolaGeo, matDome);
        cupola.position.y = pillarH + 0.3 * scale;
        chGroup.add(cupola);

        // Tiny gold finial
        const finGeo = new THREE.ConeGeometry(0.15 * scale, 0.8 * scale, 6);
        const fin = new THREE.Mesh(finGeo, matGold);
        fin.position.y = pillarH + 1.6 * scale;
        chGroup.add(fin);

        return chGroup;
      };

      // 4 Main Roof Chhatris framing the central dome
      const chOffset = 8.5;
      const chhatri1 = createChhatri(1.2);
      chhatri1.position.set(-chOffset, hallHeight, -chOffset);
      hallGroup.add(chhatri1);

      const chhatri2 = createChhatri(1.2);
      chhatri2.position.set(chOffset, hallHeight, -chOffset);
      hallGroup.add(chhatri2);

      const chhatri3 = createChhatri(1.2);
      chhatri3.position.set(-chOffset, hallHeight, chOffset);
      hallGroup.add(chhatri3);

      const chhatri4 = createChhatri(1.2);
      chhatri4.position.set(chOffset, hallHeight, chOffset);
      hallGroup.add(chhatri4);
    }

    rootGroup.add(hallGroup);

    // -------------------------------------------------------------
    // 7. FOUR CORNER MINARETS (SYMMETRICAL, THREE-TIERED)
    // -------------------------------------------------------------
    const createMinaret = () => {
      const minGroup = new THREE.Group();
      const minHeight = 32;

      // Octagonal Base Plinth
      const baseH = isDetailing ? 4.5 : 2.5;
      const baseR = 2.4;
      const baseGeo = new THREE.CylinderGeometry(baseR, baseR + 0.2, baseH, 8);
      const baseMesh = new THREE.Mesh(baseGeo, matHall);
      baseMesh.position.y = baseH / 2;
      minGroup.add(baseMesh);

      // 3 Tapering Cylindrical Shafts separated by Balconies
      const tierCount = 3;
      const shaftH = (minHeight - baseH) / tierCount;
      let currY = baseH;
      let currR = 1.9;

      for (let t = 0; t < tierCount; t++) {
        const nextR = currR - 0.22;
        const shaftGeo = new THREE.CylinderGeometry(nextR, currR, shaftH, 16);
        const shaftMesh = new THREE.Mesh(shaftGeo, matHall);
        shaftMesh.position.y = currY + shaftH / 2;
        shaftMesh.castShadow = true;
        minGroup.add(shaftMesh);

        currY += shaftH;
        currR = nextR;

        // Projecting Balcony with brackets
        const balcR = currR + 0.7;
        const balcGeo = new THREE.CylinderGeometry(balcR, currR, 0.45, 16);
        const balcMesh = new THREE.Mesh(balcGeo, matHall);
        balcMesh.position.y = currY;
        minGroup.add(balcMesh);

        // Balcony railing (Phase 2+)
        if (isDetailing) {
          const railGeo = new THREE.CylinderGeometry(balcR, balcR, 0.6, 16, 1, true);
          const railMesh = new THREE.Mesh(railGeo, matHall);
          railMesh.position.y = currY + 0.35;
          minGroup.add(railMesh);
        }
      }

      // Crown Pavilion Chhatri (Cupola with 8 pillars)
      const cupolaBaseGeo = new THREE.CylinderGeometry(currR + 0.3, currR + 0.3, 0.3, 8);
      const cupolaBase = new THREE.Mesh(cupolaBaseGeo, matHall);
      cupolaBase.position.y = currY + 0.2;
      minGroup.add(cupolaBase);

      const pilH = 1.8;
      for (let p = 0; p < 8; p++) {
        const theta = (p * Math.PI * 2) / 8;
        const pilGeo = new THREE.CylinderGeometry(0.08, 0.08, pilH, 6);
        const pilMesh = new THREE.Mesh(pilGeo, matHall);
        pilMesh.position.set(Math.cos(theta) * (currR * 0.8), currY + 0.35 + pilH / 2, Math.sin(theta) * (currR * 0.8));
        minGroup.add(pilMesh);
      }

      // Cupola Dome
      const cupolaGeo = new THREE.SphereGeometry(currR * 0.95, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      const cupolaMesh = new THREE.Mesh(cupolaGeo, matDome);
      cupolaMesh.position.y = currY + 0.35 + pilH;
      minGroup.add(cupolaMesh);

      // Gold Kalasa Finial
      const finGeo = new THREE.ConeGeometry(0.2, 1.4, 8);
      const finMesh = new THREE.Mesh(finGeo, matGold);
      finMesh.position.y = currY + 0.35 + pilH + currR * 0.95 + 0.7;
      minGroup.add(finMesh);

      return minGroup;
    };

    // Four Minarets placed symmetrically at the outer corners of the plinth
    const minOffset = plinthWidth * 0.42;

    const min1 = createMinaret();
    min1.position.set(-minOffset, groundY, -minOffset);
    rootGroup.add(min1);

    const min2 = createMinaret();
    min2.position.set(minOffset, groundY, -minOffset);
    rootGroup.add(min2);

    const min3 = createMinaret();
    min3.position.set(-minOffset, groundY, minOffset);
    rootGroup.add(min3);

    const min4 = createMinaret();
    min4.position.set(minOffset, groundY, minOffset);
    rootGroup.add(min4);

    // Apply wireframe mode if requested
    if (viewMode === 'wireframe') {
      rootGroup.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicMaterial({
            color: 0x22c55e, // Emerald wireframe
            wireframe: true
          });
        }
      });
    }

    return rootGroup;
  }
}

export const mughalMuseumBuilder = new MughalMuseumBuilder();
