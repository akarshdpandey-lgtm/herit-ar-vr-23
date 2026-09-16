import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Badrinath Temple (Uttarakhand, India) Architectural Model Builder
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   Distinctive colorful Himalayan temple facade, central entrance structure,
 *   compact temple body, and traditional sloping conical roof.
 * Phase 2 — Architectural Detailing:
 *   Ornate front entrance, decorative arches, traditional facade details,
 *   colorful architectural elements, entrance steps, courtyard, sacred water feature.
 * Phase 3 — Material & Texture (Advanced):
 *   Painted facade textures in vibrant red, yellow, blue, and white,
 *   weathered stone, plaster, wood, and gilded finials.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Himalayan valley surrounded by mountains (Nar & Narayan peaks), rocky terrain,
 *   natural alpine vegetation, distant Alaknanda river, soft daylight and atmospheric depth.
 */
export class BadrinathTempleBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay Massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.clayRed = new THREE.MeshStandardMaterial({
      color: 0xb53526,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true,
      side: THREE.DoubleSide
    });

    this.materials.clayRoof = new THREE.MeshStandardMaterial({
      color: 0x8a7050,
      roughness: 0.7,
      flatShading: true,
      side: THREE.DoubleSide
    });

    this.materials.clayStone = new THREE.MeshStandardMaterial({
      color: 0x6e685f,
      roughness: 0.8,
      flatShading: true,
      side: THREE.DoubleSide
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Detailing Clay
    // -------------------------------------------------------------
    this.materials.refinedPainted = new THREE.MeshStandardMaterial({
      color: 0xc43c2b,
      roughness: 0.5,
      metalness: 0.06,
      flatShading: false,
      side: THREE.DoubleSide
    });

    this.materials.goldFinial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.92
    });

    this.materials.refinedYellow = new THREE.MeshStandardMaterial({
      color: 0xf5a623,
      roughness: 0.52
    });

    this.materials.refinedBlue = new THREE.MeshStandardMaterial({
      color: 0x1c497d,
      roughness: 0.52
    });

    // -------------------------------------------------------------
    // Phase 3: Advanced Painted Facade Textures & Real Stone
    // -------------------------------------------------------------
    const paintedTex = textureGenerator.getBadrinathPaintedFacadeTexture();
    const stoneTex = textureGenerator.getKedarnathGreyGraniteTexture();

    this.materials.texturedPaintedFacade = new THREE.MeshStandardMaterial({
      map: paintedTex,
      roughness: 0.55,
      metalness: 0.05,
      bumpMap: paintedTex,
      bumpScale: 0.02,
      side: THREE.DoubleSide
    });

    this.materials.texturedCourtyardStone = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.75,
      metalness: 0.04,
      bumpMap: stoneTex,
      bumpScale: 0.03,
      side: THREE.DoubleSide
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `BadrinathTemple_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matFacade = isTextured
      ? this.materials.texturedPaintedFacade
      : (isDetail ? this.materials.refinedPainted : this.materials.clayRed);

    const matStone = isTextured
      ? this.materials.texturedCourtyardStone
      : (isDetail ? this.materials.refinedPainted : this.materials.clayStone);

    const matRoof = isTextured
      ? this.materials.texturedCourtyardStone
      : (isDetail ? this.materials.refinedPainted : this.materials.clayRoof);

    const matGold = isDetail ? this.materials.goldFinial : matStone;

    // -------------------------------------------------------------
    // 1. COURTYARD PLINTH & STONE APRON
    // -------------------------------------------------------------
    const plinthW = 38;
    const plinthH = 2.2;
    const plinthD = 44;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(plinthW, plinthH, plinthD), matStone);
    plinth.position.set(0, plinthH / 2, 0);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    root.add(plinth);

    const floorY = plinthH; // 2.2m
    const wallThick = 1.2;

    // -------------------------------------------------------------
    // 2. HOLLOW WALKABLE SANCTUM & CENTRAL CONICAL CANOPY ROOF
    // -------------------------------------------------------------
    const sanctumW = 16;
    const sanctumH = 13;
    const sanctumD = 14;
    const sanctumZ = -8;

    // Sanctum Side & Back Walls (Hollow)
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

    // Sanctum Front Wall with Open Archway
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

    // Conical Gilded Canopy Roof (Badrinath 15-meter tall spire / chhatra)
    const spireH = 12;
    const spireR = 7.5;
    const spireGeo = new THREE.ConeGeometry(spireR, spireH, isPhase1 ? 6 : 18);
    const spire = new THREE.Mesh(spireGeo, matRoof);
    spire.position.set(0, floorY + sanctumH + spireH / 2, sanctumZ);
    spire.castShadow = true;
    root.add(spire);

    // Gilded Copper Kalasha & Gilt Finial atop spire
    const kalasha = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 1.2, 2.8, 12),
      matGold
    );
    kalasha.position.set(0, floorY + sanctumH + spireH + 1.4, sanctumZ);
    kalasha.castShadow = true;
    root.add(kalasha);

    // -------------------------------------------------------------
    // SANCTUM INTERIOR: LORD BADRINARAYAN (SHALIGRAM) SHRINE
    // -------------------------------------------------------------
    const sanctumGroup = new THREE.Group();
    sanctumGroup.name = 'Badrinath_Sanctum_Interior';

    // Raised Altar Platform
    const altar = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.8, 3.2), matStone);
    altar.position.set(0, floorY + 0.4, sanctumZ - 3);
    sanctumGroup.add(altar);

    // Sacred Black Shaligram Stone Idol of Lord Badrinarayan (in Padmasana)
    const deityMat = new THREE.MeshStandardMaterial({ color: 0x151618, roughness: 0.35, metalness: 0.1 });
    const deityBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.75, 1.6, 16), deityMat);
    deityBody.position.set(0, floorY + 0.8 + 0.8, sanctumZ - 3);
    sanctumGroup.add(deityBody);

    // Golden Crown (Kiritam) & Jewels
    const crownMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.95 });
    const crown = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.9, 12), crownMat);
    crown.position.set(0, floorY + 0.8 + 1.85, sanctumZ - 3);
    sanctumGroup.add(crown);

    // Golden Prabhavali (Ornate halo archway framing the deity)
    const prabhavaliGeo = new THREE.TorusGeometry(1.3, 0.14, 8, 24, Math.PI);
    const prabhavali = new THREE.Mesh(prabhavaliGeo, crownMat);
    prabhavali.position.set(0, floorY + 0.8 + 1.2, sanctumZ - 3.1);
    sanctumGroup.add(prabhavali);

    // Golden Temple Lamps (Deepams) & Point Light
    for (const lx of [-1.8, 1.8]) {
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.35, 1.4, 12), crownMat);
      lamp.position.set(lx, floorY + 0.7, sanctumZ - 2.8);
      sanctumGroup.add(lamp);

      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd060 }));
      flame.position.set(lx, floorY + 1.45, sanctumZ - 2.8);
      sanctumGroup.add(flame);
    }

    const badriLight = new THREE.PointLight(0xffaa44, 3.5, 20);
    badriLight.position.set(0, floorY + 3.5, sanctumZ - 2);
    sanctumGroup.add(badriLight);

    root.add(sanctumGroup);

    // -------------------------------------------------------------
    // 3. COLORFUL HIMALAYAN FACADE (Singhdwara) WITH OPEN WALKWAY
    // -------------------------------------------------------------
    const facadeW = 22;
    const facadeH = 14;
    const facadeD = 6;
    const facadeZ = 8;
    const gateW = 5.2;
    const gateH = 7.5;
    const fSideW = (facadeW - gateW) / 2;

    // Facade Left Wing
    const fLeft = new THREE.Mesh(new THREE.BoxGeometry(fSideW, facadeH, facadeD), matFacade);
    fLeft.position.set(-facadeW / 2 + fSideW / 2, floorY + facadeH / 2, facadeZ);
    fLeft.castShadow = true;
    root.add(fLeft);

    // Facade Right Wing
    const fRight = new THREE.Mesh(new THREE.BoxGeometry(fSideW, facadeH, facadeD), matFacade);
    fRight.position.set(facadeW / 2 - fSideW / 2, floorY + facadeH / 2, facadeZ);
    fRight.castShadow = true;
    root.add(fRight);

    // Facade Top section over open doorway
    const fTop = new THREE.Mesh(new THREE.BoxGeometry(gateW, facadeH - gateH, facadeD), matFacade);
    fTop.position.set(0, floorY + gateH + (facadeH - gateH) / 2, facadeZ);
    fTop.castShadow = true;
    root.add(fTop);

    // Arched facade parapet / curved central pediment
    const archTopH = 4.5;
    const archTop = new THREE.Mesh(
      new THREE.CylinderGeometry(facadeW * 0.45, facadeW * 0.48, archTopH, isPhase1 ? 6 : 16, 1, false, 0, Math.PI),
      matFacade
    );
    archTop.rotation.z = Math.PI / 2;
    archTop.position.set(0, floorY + facadeH, facadeZ);
    archTop.castShadow = true;
    root.add(archTop);

    // -------------------------------------------------------------
    // PHASES 2, 3, 4: ARCHITECTURAL DETAILS, TILES, ARCHES & TAPT KUND
    // -------------------------------------------------------------
    if (isDetail) {
      // 1. Ornate Painted Front Arches & Decorative Windows
      const winCols = [-6.5, 6.5];
      winCols.forEach((wx) => {
        // Multi-colored decorative window frame
        const win = new THREE.Mesh(new THREE.BoxGeometry(3.4, 4.8, 1.2), this.materials.refinedYellow);
        win.position.set(wx, floorY + 8.5, facadeZ + facadeD / 2 + 0.2);
        root.add(win);

        const winArch = new THREE.Mesh(new THREE.ConeGeometry(2.0, 1.6, 4), this.materials.refinedBlue);
        winArch.position.set(wx, floorY + 11.5, facadeZ + facadeD / 2 + 0.2);
        winArch.rotation.y = Math.PI / 4;
        root.add(winArch);
      });

      // 2. Entrance Steps (Flight of stone steps ascending to Singhdwara)
      const steps = 7;
      const stepW = 10;
      const stepD = 6;
      for (let s = 0; s < steps; s++) {
        const sy = (s / steps) * floorY;
        const sz = facadeZ + facadeD / 2 + ((steps - s) / steps) * stepD;
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(stepW, floorY / steps + 0.05, stepD / steps),
          matStone
        );
        step.position.set(0, sy + (floorY / steps) / 2, sz);
        step.receiveShadow = true;
        step.castShadow = true;
        root.add(step);
      }

      // 3. Sacred Water Feature (Tapt Kund natural sulfur thermal bath pool)
      const kundW = 16;
      const kundD = 12;
      const kundH = 1.4;
      const kundX = -24;
      const kundZ = 12;

      // Stone basin border
      const kundBorder = new THREE.Mesh(
        new THREE.BoxGeometry(kundW, kundH, kundD),
        matStone
      );
      kundBorder.position.set(kundX, kundH / 2, kundZ);
      kundBorder.receiveShadow = true;
      kundBorder.castShadow = true;
      root.add(kundBorder);

      // Sacred thermal spring water surface
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x3d8c7d,
        roughness: 0.15,
        metalness: 0.4
      });
      const water = new THREE.Mesh(new THREE.PlaneGeometry(kundW - 2, kundD - 2), waterMat);
      water.rotation.x = -Math.PI / 2;
      water.position.set(kundX, kundH - 0.1, kundZ);
      root.add(water);

      // 4. Temple Courtyard Perimeter Stone Wall & Railing
      [-plinthW / 2 + 1, plinthW / 2 - 1].forEach((wx) => {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, plinthD), matStone);
        wall.position.set(wx, floorY + 0.9, 0);
        wall.castShadow = true;
        root.add(wall);
      });
    }

    return root;
  }

  /**
   * Phase 4: Himalayan Valley (Nar & Narayan Mountains), Distant Alaknanda River, Rocky Terrain
   */
  buildValleyEnvironment() {
    const group = new THREE.Group();
    group.name = 'BadrinathValley_Phase4';

    // 1. High Himalayan Valley Floor (Chamoli district granite soil & alpine gravel)
    const groundGeo = new THREE.PlaneGeometry(360, 360);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x544e45, // Alpine valley gravel
      roughness: 0.9,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, 0);
    ground.receiveShadow = true;
    group.add(ground);

    // 2. Distant Alaknanda River stream carving through the valley
    const riverGeo = new THREE.PlaneGeometry(32, 340);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x3b6b7a, // Glacial turquoise Alaknanda water
      roughness: 0.18,
      metalness: 0.35
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.rotation.z = -0.18;
    river.position.set(55, 0.04, 20);
    group.add(river);

    // 3. Flanking Nar and Narayan Mountain Ranges (Towering mountains on both sides)
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x6e675e, // Rugged rocky ridges with alpine snow caps
      roughness: 0.85
    });
    const snowCapMat = new THREE.MeshStandardMaterial({
      color: 0xf5f8fa,
      roughness: 0.45
    });

    const valleyMountains = [
      // Left Ridge (Nar Mountain range)
      { x: -110, y: 70, z: -40, r: 75, h: 140 },
      { x: -130, y: 60, z: 50, r: 65, h: 120 },
      // Right Ridge (Narayan Mountain range)
      { x: 120, y: 70, z: -40, r: 75, h: 140 },
      { x: 140, y: 60, z: 50, r: 65, h: 120 },
      // Distant North Neelkanth Peak silhouette
      { x: 0, y: 95, z: -160, r: 90, h: 190 }
    ];

    valleyMountains.forEach((vm) => {
      const mGeo = new THREE.ConeGeometry(vm.r, vm.h, 6);
      const mMesh = new THREE.Mesh(mGeo, mountainMat);
      mMesh.position.set(vm.x, vm.y, vm.z);
      mMesh.castShadow = true;
      group.add(mMesh);

      // Snow cap atop peak
      const capGeo = new THREE.ConeGeometry(vm.r * 0.4, vm.h * 0.35, 6);
      const capMesh = new THREE.Mesh(capGeo, snowCapMat);
      capMesh.position.set(vm.x, vm.y + vm.h * 0.35, vm.z);
      group.add(capMesh);
    });

    // 4. Alpine Shrubs & Himalayan Conifers
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x2e4a30, roughness: 0.85 });
    const pineCoords = [
      { x: -45, z: -35 }, { x: -55, z: 15 }, { x: -35, z: 55 },
      { x: 40, z: -45 },  { x: 48, z: 65 }
    ];
    pineCoords.forEach((pc) => {
      const pine = new THREE.Mesh(new THREE.ConeGeometry(2.4, 11, 6), pineMat);
      pine.position.set(pc.x, 5.5, pc.z);
      pine.castShadow = true;
      group.add(pine);
    });

    return group;
  }

  /**
   * Lighting:
   * Phases 1-3: Clean Studio Lighting
   * Phase 4: Soft Daylight in Himalayan Valley with atmospheric mountain depth
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `BadrinathLighting_Phase${phase}`;

    if (phase === 4) {
      // Himalayan Valley Clear Day Sky (Soft azure with alpine atmospheric depth)
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#2d6fa8');   // Crisp mountain blue
      grad.addColorStop(0.55, '#6da1cc'); // Valley azure
      grad.addColorStop(0.85, '#d3e2ee'); // Mountain haze
      grad.addColorStop(1, '#eaf2f8');   // Horizon brightness
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0xc8d9e6, 0.0022);

      // Bright Himalayan Sunlight illuminating the colorful facade
      const sun = new THREE.DirectionalLight(0xfffaed, 2.5);
      sun.position.set(50, 65, 55);
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

      // Valley ambient bounce
      const hemi = new THREE.HemisphereLight(0xbad2e5, 0x5a5042, 1.3);
      hemi.position.set(0, 65, 0);
      lightGroup.add(hemi);

      // Back fill from Nar peak
      const backFill = new THREE.DirectionalLight(0x8fa8bf, 0.7);
      backFill.position.set(-45, 35, -45);
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

export const badrinathTempleBuilder = new BadrinathTempleBuilder();
