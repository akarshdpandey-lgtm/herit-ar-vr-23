import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Procedural Hawa Mahal (Palace of Winds, Jaipur) Architectural Model Builder
 * 
 * Implements all 4 progressive phases:
 * Phase 1 — Base Structure (Scratch):
 *   Low-poly 3D base model of a five-story semi-octagonal palace facade,
 *   honeycomb-like structure, taller than it is wide, with a flat rear side (screen-wall style).
 * Phase 2 — Architectural Detailing:
 *   953 small individual jharokha windows arranged in a honeycomb pattern,
 *   crowning chhatris along the rooftop, and delicate arch-shaped window frames throughout.
 * Phase 3 — Material & Texture (Advanced):
 *   Jaipur pink-red sandstone texture with fine white-painted trim along window borders,
 *   intricate latticework (jali) texture inside each small window opening for honeycomb effect.
 * Phase 4 — Environment, Lighting & Final Render:
 *   Facing a busy Jaipur street with pink city buildings around it, street vendors,
 *   and traffic for scale/context. Warm afternoon sunlight highlighting the pink sandstone glow.
 */
export class HawaMahalBuilder {
  constructor() {
    this.materials = {};
    this.initMaterials();
  }

  initMaterials() {
    // -------------------------------------------------------------
    // Phase 1: Clay Massing (Scratch low-poly)
    // -------------------------------------------------------------
    this.materials.clayPink = new THREE.MeshStandardMaterial({
      color: 0xcd7365,
      roughness: 0.72,
      metalness: 0.05,
      flatShading: true
    });

    this.materials.clayPlinth = new THREE.MeshStandardMaterial({
      color: 0xa95244,
      roughness: 0.8,
      flatShading: true
    });

    this.materials.clayTrim = new THREE.MeshStandardMaterial({
      color: 0xebcfc8,
      roughness: 0.6,
      flatShading: true
    });

    // -------------------------------------------------------------
    // Phase 2: Refined Architectural Clay
    // -------------------------------------------------------------
    this.materials.refinedPinkSandstone = new THREE.MeshStandardMaterial({
      color: 0xcc6e5d,
      roughness: 0.52,
      metalness: 0.06,
      flatShading: false
    });

    this.materials.refinedWhiteTrim = new THREE.MeshStandardMaterial({
      color: 0xfffaf2,
      roughness: 0.35,
      metalness: 0.05,
      flatShading: false
    });

    this.materials.goldFinial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.92
    });

    // -------------------------------------------------------------
    // Phase 3: Advanced Materials & Photorealistic Textures
    // -------------------------------------------------------------
    const pinkStoneTex = textureGenerator.getJaipurPinkSandstoneTexture();
    const jaliTex = textureGenerator.getHawaMahalJaliTexture();
    const marbleTex = textureGenerator.getWhiteMarbleTexture();

    this.materials.texturedPinkSandstone = new THREE.MeshStandardMaterial({
      map: pinkStoneTex,
      roughness: 0.58,
      metalness: 0.05,
      bumpMap: pinkStoneTex,
      bumpScale: 0.02
    });

    this.materials.texturedJali = new THREE.MeshStandardMaterial({
      map: jaliTex,
      roughness: 0.6,
      metalness: 0.1,
      bumpMap: jaliTex,
      bumpScale: 0.03
    });

    this.materials.texturedWhitePlaster = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.4,
      metalness: 0.04
    });
  }

  build(phase = 1, viewMode = 'solid') {
    const root = new THREE.Group();
    root.name = `HawaMahal_Phase${phase}`;

    const isPhase1 = phase === 1;
    const isDetail = phase >= 2;
    const isTextured = phase >= 3;

    // Active material selectors
    const matWall = isTextured
      ? this.materials.texturedPinkSandstone
      : (isDetail ? this.materials.refinedPinkSandstone : this.materials.clayPink);

    const matPlinth = isTextured
      ? this.materials.texturedPinkSandstone
      : (isDetail ? this.materials.refinedPinkSandstone : this.materials.clayPlinth);

    const matTrim = isTextured
      ? this.materials.texturedWhitePlaster
      : (isDetail ? this.materials.refinedWhiteTrim : this.materials.clayTrim);

    const matJali = isTextured
      ? this.materials.texturedJali
      : (isDetail ? this.materials.refinedWhiteTrim : this.materials.clayTrim);

    const matGold = isDetail ? this.materials.goldFinial : this.materials.clayTrim;

    // -------------------------------------------------------------
    // 1. RAISED PLINTH & GROUND PODIUM
    // -------------------------------------------------------------
    const plinthGeo = new THREE.BoxGeometry(64, 3, 16);
    const plinth = new THREE.Mesh(plinthGeo, matPlinth);
    plinth.position.set(0, 1.5, -4);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    root.add(plinth);

    // Flat rear screen-wall backing
    const rearWallGeo = new THREE.BoxGeometry(56, 44, 2);
    const rearWall = new THREE.Mesh(rearWallGeo, matWall);
    rearWall.position.set(0, 3 + 22, -11);
    rearWall.castShadow = true;
    root.add(rearWall);

    // -------------------------------------------------------------
    // 2. FIVE TAPERING TIERS (Pyramidal Silhouette & Honeycomb Facade)
    // -------------------------------------------------------------
    // Specifications for the 5 floors from base (1) to crown (5)
    // Tiers taper progressively upwards in width
    const tiers = [
      { level: 1, y: 3,  height: 9, width: 54, bays: 11, depth: 10 }, // Ground Tier (Sharad Mandir)
      { level: 2, y: 12, height: 8, width: 48, bays: 9,  depth: 8.5 }, // 2nd Tier (Ratan Mandir)
      { level: 3, y: 20, height: 7.5, width: 40, bays: 7, depth: 7.2 }, // 3rd Tier (Vichitra Mandir)
      { level: 4, y: 27.5, height: 7, width: 30, bays: 5, depth: 6.0 }, // 4th Tier (Prakash Mandir)
      { level: 5, y: 34.5, height: 6.5, width: 20, bays: 3, depth: 5.0 } // 5th Tier (Hawa Mandir - Crown)
    ];

    tiers.forEach((tier) => {
      // Floor divider horizontal cornice (Pattika)
      const corniceGeo = new THREE.BoxGeometry(tier.width + 4, 1.2, tier.depth + 1.5);
      const cornice = new THREE.Mesh(corniceGeo, matTrim);
      cornice.position.set(0, tier.y + tier.height, -tier.depth / 2);
      cornice.castShadow = true;
      root.add(cornice);

      // Tier main volume block
      const tierGeo = new THREE.BoxGeometry(tier.width, tier.height, tier.depth);
      const tierMesh = new THREE.Mesh(tierGeo, matWall);
      tierMesh.position.set(0, tier.y + tier.height / 2, -tier.depth / 2);
      tierMesh.castShadow = true;
      tierMesh.receiveShadow = true;
      root.add(tierMesh);

      // Semi-octagonal projecting bays forming the famous Honeycomb rhythm
      const baySpacing = tier.width / (tier.bays + 1);
      for (let b = 1; b <= tier.bays; b++) {
        const bx = -tier.width / 2 + b * baySpacing;

        // Semi-octagonal projecting bay geometry
        const bayGeo = new THREE.CylinderGeometry(
          2.0, 2.2, tier.height - 1.2,
          isPhase1 ? 6 : 8,
          1, false, 0, Math.PI
        );
        const bay = new THREE.Mesh(bayGeo, matWall);
        bay.position.set(bx, tier.y + tier.height / 2, 0.4);
        bay.castShadow = true;
        bay.receiveShadow = true;
        root.add(bay);

        // Architectural Detailing: Jharokhas & Jali Screens (Phases 2-4)
        if (isDetail) {
          // Multiple window levels per tier (up to 2-3 small windows per bay)
          const subWindows = tier.level <= 3 ? 2 : 1;
          for (let sw = 0; sw < subWindows; sw++) {
            const wy = tier.y + 1.8 + sw * (tier.height * 0.42);

            // Arch-shaped window frame
            const frameGeo = new THREE.BoxGeometry(1.6, 2.2, 0.4);
            const frame = new THREE.Mesh(frameGeo, matTrim);
            frame.position.set(bx, wy, 2.3);
            root.add(frame);

            // Intricate Jali Lattice Screen cutout
            const jaliGeo = new THREE.PlaneGeometry(1.2, 1.8);
            const jali = new THREE.Mesh(jaliGeo, matJali);
            jali.position.set(bx, wy, 2.52);
            root.add(jali);

            // Cusped hood / chhatri awning over each individual jharokha
            const canopyGeo = new THREE.ConeGeometry(1.4, 0.8, 6);
            const canopy = new THREE.Mesh(canopyGeo, matTrim);
            canopy.position.set(bx, wy + 1.3, 2.4);
            canopy.castShadow = true;
            root.add(canopy);
          }
        }
      }
    });

    // -------------------------------------------------------------
    // 3. ROOFTOP CROWNING CHHATRIS & FLUTED DOMES
    // -------------------------------------------------------------
    const crownY = 41; // Top of 5th tier
    const topWidth = 20;

    // Central Grand Chhatri (Crowning Dome)
    const centerDomeGeo = this.createRajputDomeGeometry(3.6, 5.0, isPhase1 ? 10 : 20);
    const centerDome = new THREE.Mesh(centerDomeGeo, matWall);
    centerDome.position.set(0, crownY + 2.5, -2.5);
    centerDome.castShadow = true;
    root.add(centerDome);

    if (isDetail) {
      // Golden finial on apex
      const finial = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.4, 3.2, 8),
        matGold
      );
      finial.position.set(0, crownY + 8.5, -2.5);
      root.add(finial);
    }

    // Flanking Fluted Chhatris along Rooftop
    const roofChhatriX = [-8, -4, 4, 8];
    roofChhatriX.forEach((rx) => {
      const chhatriBase = new THREE.Mesh(
        new THREE.CylinderGeometry(1.4, 1.6, 2.5, isPhase1 ? 6 : 8),
        matWall
      );
      chhatriBase.position.set(rx, crownY + 1.25, -2.5);
      chhatriBase.castShadow = true;
      root.add(chhatriBase);

      const chhatriDome = new THREE.Mesh(
        this.createRajputDomeGeometry(1.6, 2.8, isPhase1 ? 8 : 16),
        matTrim
      );
      chhatriDome.position.set(rx, crownY + 3.2, -2.5);
      chhatriDome.castShadow = true;
      root.add(chhatriDome);

      if (isDetail) {
        const miniFinial = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.25, 1.6, 8),
          matGold
        );
        miniFinial.position.set(rx, crownY + 6.4, -2.5);
        root.add(miniFinial);
      }
    });

    // Outer step-down chhatris on lower tier shoulders
    if (isDetail) {
      const shoulderChhatriPositions = [
        { x: -22, y: 20 + 8, w: 2.2 },
        { x: 22, y: 20 + 8, w: 2.2 },
        { x: -17, y: 27.5 + 7.5, w: 1.8 },
        { x: 17, y: 27.5 + 7.5, w: 1.8 }
      ];
      shoulderChhatriPositions.forEach((pos) => {
        const dome = new THREE.Mesh(
          this.createRajputDomeGeometry(pos.w, pos.w * 1.5, 12),
          matWall
        );
        dome.position.set(pos.x, pos.y + pos.w * 0.8, -3.5);
        dome.castShadow = true;
        root.add(dome);
      });
    }

    // -------------------------------------------------------------
    // 4. ARCHITECTURAL DETAILS: CORBEL BRACKETS & JHAROKHA ORIELS
    // -------------------------------------------------------------
    if (isDetail) {
      // Ground level monumental entry doorways
      const entryX = [-14, 0, 14];
      entryX.forEach((ex) => {
        const doorFrame = new THREE.Mesh(
          new THREE.BoxGeometry(4.2, 5.5, 1.2),
          matTrim
        );
        doorFrame.position.set(ex, 3 + 2.75, 1.2);
        root.add(doorFrame);

        const doorInner = new THREE.Mesh(
          new THREE.BoxGeometry(3.0, 4.5, 0.6),
          new THREE.MeshStandardMaterial({ color: 0x36201a, roughness: 0.85 })
        );
        doorInner.position.set(ex, 3 + 2.25, 1.4);
        root.add(doorInner);
      });
    }

    return root;
  }

  /**
   * Rajput / Bengali vaulted fluted dome profile (curved eaves)
   */
  createRajputDomeGeometry(radius, height, segments = 20) {
    const points = [];
    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * height;
      let r = radius;
      if (t < 0.25) {
        // Flaring curved eaves
        r = radius * (1.1 - 0.25 * Math.sin(t * Math.PI * 2));
      } else {
        // Pointed arched dome profile
        const pt = (t - 0.25) / 0.75;
        r = radius * 0.95 * Math.cos((pt * Math.PI) / 2);
      }
      points.push(new THREE.Vector2(Math.max(0.01, r), y));
    }
    return new THREE.LatheGeometry(points, segments);
  }

  /**
   * Phase 4: Jaipur Pink City Street Setting, Surrounding Buildings, Street Vendors & Traffic
   */
  buildJaipurStreetEnvironment() {
    const group = new THREE.Group();
    group.name = 'HawaMahalJaipurStreet_Phase4';

    // 1. Broad Jaipur Street / Badi Choupad Pavement
    const streetGeo = new THREE.PlaneGeometry(220, 140);
    const streetMat = new THREE.MeshStandardMaterial({
      color: 0x47433f,
      roughness: 0.85,
      metalness: 0.05
    });
    const street = new THREE.Mesh(streetGeo, streetMat);
    street.rotation.x = -Math.PI / 2;
    street.position.set(0, -0.05, 55);
    street.receiveShadow = true;
    group.add(street);

    // Stone Sidewalk / Pedestrian Walkway in front of Hawa Mahal
    const walkGeo = new THREE.BoxGeometry(180, 0.8, 14);
    const walkMat = new THREE.MeshStandardMaterial({
      color: 0xb5786a,
      roughness: 0.7
    });
    const walk = new THREE.Mesh(walkGeo, walkMat);
    walk.position.set(0, 0.4, 11);
    walk.receiveShadow = true;
    group.add(walk);

    // 2. Flanking Pink City Heritage Buildings (Left and Right street blocks)
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0xbf6354,
      roughness: 0.7,
      metalness: 0.05
    });
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xfff6ec,
      roughness: 0.4
    });

    // Left Street Heritage Building Block
    const leftBlock = this.createPinkCityBlock(48, 26, 22, buildingMat, trimMat);
    leftBlock.position.set(-62, 0, -2);
    group.add(leftBlock);

    // Right Street Heritage Building Block
    const rightBlock = this.createPinkCityBlock(48, 26, 22, buildingMat, trimMat);
    rightBlock.position.set(62, 0, -2);
    group.add(rightBlock);

    // 3. Street Vendors / Canopied Market Stalls along the pavement
    const stallColors = [0xe67e22, 0xd35400, 0xc0392b, 0xf1c40f, 0x16a085];
    const stallPositions = [
      { x: -32, z: 24 }, { x: -20, z: 26 }, { x: -8, z: 27 },
      { x: 8, z: 27 }, { x: 20, z: 26 }, { x: 32, z: 24 }
    ];

    stallPositions.forEach((pos, idx) => {
      const stall = new THREE.Group();
      stall.position.set(pos.x, 0.8, pos.z);

      // Stall platform
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(3.6, 1.2, 2.8),
        new THREE.MeshStandardMaterial({ color: 0x543d2b, roughness: 0.85 })
      );
      base.position.y = 0.6;
      base.castShadow = true;
      stall.add(base);

      // Colorful Fabric Awning
      const awning = new THREE.Mesh(
        new THREE.ConeGeometry(2.6, 1.4, 4),
        new THREE.MeshStandardMaterial({
          color: stallColors[idx % stallColors.length],
          roughness: 0.75
        })
      );
      awning.position.y = 3.2;
      awning.rotation.y = Math.PI / 4;
      awning.castShadow = true;
      stall.add(awning);

      group.add(stall);
    });

    // 4. Jaipur Street Traffic Scale Elements (Auto-rickshaws & Cart)
    // Auto-rickshaw (Yellow & Green iconic Indian 3-wheeler)
    const rickshaw1 = this.createAutoRickshaw();
    rickshaw1.position.set(-15, 0, 48);
    rickshaw1.rotation.y = Math.PI * 0.15;
    group.add(rickshaw1);

    const rickshaw2 = this.createAutoRickshaw();
    rickshaw2.position.set(22, 0, 62);
    rickshaw2.rotation.y = -Math.PI * 0.85;
    group.add(rickshaw2);

    // 5. Heritage Street Lamps along the sidewalk
    const lampX = [-38, -16, 16, 38];
    lampX.forEach((lx) => {
      const lamp = this.createStreetLamp();
      lamp.position.set(lx, 0.8, 16);
      group.add(lamp);
    });

    // 6. Pedestrians & Tourists walking for scale
    const peds = [
      { x: -5, z: 14 }, { x: 2, z: 15 }, { x: -18, z: 13 },
      { x: 12, z: 14 }, { x: 28, z: 13 }, { x: -30, z: 15 }
    ];
    const pedMat = new THREE.MeshStandardMaterial({ color: 0xfdf6e2, roughness: 0.6 });
    peds.forEach((p) => {
      const figure = new THREE.Group();
      figure.position.set(p.x, 0.8, p.z);
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.7, 8), pedMat);
      b.position.y = 0.85;
      b.castShadow = true;
      figure.add(b);

      const h = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 8), pedMat);
      h.position.y = 1.9;
      figure.add(h);
      group.add(figure);
    });

    return group;
  }

  createPinkCityBlock(width, height, depth, matWall, matTrim) {
    const group = new THREE.Group();

    // Main block
    const block = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), matWall);
    block.position.set(0, height / 2, 0);
    block.castShadow = true;
    block.receiveShadow = true;
    group.add(block);

    // Colonnaded street arcade on ground floor
    const arcadeGeo = new THREE.BoxGeometry(width + 2, 6, 4);
    const arcade = new THREE.Mesh(arcadeGeo, matTrim);
    arcade.position.set(0, 3, depth / 2 + 1);
    arcade.castShadow = true;
    group.add(arcade);

    // Decorative window bays
    const rows = 3;
    const cols = 5;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = -width / 2 + (c + 1) * (width / (cols + 1));
        const wy = 8 + r * 5.5;
        const win = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.2, 0.5), matTrim);
        win.position.set(wx, wy, depth / 2 + 0.3);
        group.add(win);
      }
    }

    // Parapet crenellations
    const parapet = new THREE.Mesh(new THREE.BoxGeometry(width, 2.2, depth), matTrim);
    parapet.position.set(0, height + 1.1, 0);
    group.add(parapet);

    return group;
  }

  createAutoRickshaw() {
    const auto = new THREE.Group();

    // Lower chassis
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1f7a3f, roughness: 0.5 }); // Green base
    const hoodMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }); // Yellow top
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.2, 4.4), bodyMat);
    base.position.y = 1.0;
    base.castShadow = true;
    auto.add(base);

    // Canopy hood
    const hood = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.4, 3.8), hoodMat);
    hood.position.set(0, 2.2, -0.2);
    hood.castShadow = true;
    auto.add(hood);

    // 3 Wheels
    // Front wheel
    const frontWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.4, 12), wheelMat);
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.position.set(0, 0.55, 1.8);
    frontWheel.castShadow = true;
    auto.add(frontWheel);

    // Rear wheels
    [-1.3, 1.3].forEach((wx) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.4, 12), wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, 0.55, -1.4);
      wheel.castShadow = true;
      auto.add(wheel);
    });

    return auto;
  }

  createStreetLamp() {
    const lamp = new THREE.Group();
    const postMat = new THREE.MeshStandardMaterial({
      color: 0x222428,
      metalness: 0.8,
      roughness: 0.3
    });

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 5.5, 8), postMat);
    pole.position.y = 2.75;
    pole.castShadow = true;
    lamp.add(pole);

    const lantern = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.25, 0.9, 6),
      new THREE.MeshStandardMaterial({
        color: 0xffe6a0,
        emissive: 0xffb833,
        emissiveIntensity: 0.4,
        roughness: 0.2
      })
    );
    lantern.position.y = 5.8;
    lamp.add(lantern);

    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.4, 6), postMat);
    cap.position.y = 6.4;
    lamp.add(cap);

    return lamp;
  }

  /**
   * Lighting setup for Hawa Mahal:
   * Phase 1-3: Studio architectural lighting
   * Phase 4: Warm afternoon sunlight highlighting the pink sandstone glow (Jaipur Golden Hour)
   */
  setupLighting(scene, phase = 4) {
    const lightGroup = new THREE.Group();
    lightGroup.name = `HawaMahalLighting_Phase${phase}`;

    if (phase === 4) {
      // Warm Afternoon Rajasthan Sky gradient (Golden Amber -> Soft Azure)
      const skyCanvas = document.createElement('canvas');
      skyCanvas.width = 512;
      skyCanvas.height = 512;
      const skyCtx = skyCanvas.getContext('2d');
      const grad = skyCtx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#5891bd');   // Soft afternoon blue zenith
      grad.addColorStop(0.55, '#f4ba80'); // Warm golden amber glow
      grad.addColorStop(0.85, '#e88e6e'); // Pinkish orange Jaipur horizon
      grad.addColorStop(1, '#d86c52');    // Terracotta dusk fringe
      skyCtx.fillStyle = grad;
      skyCtx.fillRect(0, 0, 512, 512);

      const skyTex = new THREE.CanvasTexture(skyCanvas);
      scene.background = skyTex;
      scene.fog = new THREE.FogExp2(0xe2a88e, 0.0025);

      // Warm Afternoon Golden Sun (Directional Light focused onto the facade)
      const sun = new THREE.DirectionalLight(0xffdfba, 2.5);
      sun.position.set(40, 50, 70); // Angled directly at the front facade
      sun.castShadow = true;
      sun.shadow.mapSize.width = 2048;
      sun.shadow.mapSize.height = 2048;
      const d = 80;
      sun.shadow.camera.left = -d;
      sun.shadow.camera.right = d;
      sun.shadow.camera.top = d;
      sun.shadow.camera.bottom = -d;
      sun.shadow.bias = -0.0003;
      lightGroup.add(sun);

      // Pink sandstone bounce and warm ambient sky
      const hemi = new THREE.HemisphereLight(0xffcaa5, 0x7c4238, 1.2);
      hemi.position.set(0, 50, 0);
      lightGroup.add(hemi);

      // Soft back fill
      const backFill = new THREE.DirectionalLight(0xbad2e8, 0.5);
      backFill.position.set(-30, 20, -40);
      lightGroup.add(backFill);

    } else {
      // Phases 1-3: Clean Architectural Studio Lighting
      scene.fog = null;
      scene.background = new THREE.Color(phase === 1 ? 0x18191c : 0x141518);

      const key = new THREE.DirectionalLight(0xfff5ea, phase === 1 ? 2.3 : 2.0);
      key.position.set(45, 65, 55);
      key.castShadow = true;
      key.shadow.mapSize.width = 1024;
      key.shadow.mapSize.height = 1024;
      const d = 60;
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

      const grid = new THREE.GridHelper(120, 60, 0xd4af37, 0x2e323b);
      grid.position.y = -0.01;
      lightGroup.add(grid);
    }

    return lightGroup;
  }
}

export const hawaMahalBuilder = new HawaMahalBuilder();
