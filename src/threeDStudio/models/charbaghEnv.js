import * as THREE from 'three';
import { textureGenerator } from '../engine/textureGenerator.js';

/**
 * Phase 4 Environment:
 * - Charbagh 4-quadrant Mughal quadrilateral garden layout
 * - Monumental reflecting pool with ripples & reflections
 * - Symmetrical rows of slender Cypress trees (Sarv)
 * - Paved red sandstone & marble walkways
 * - Golden-hour atmospheric lighting & haze
 */
export class CharbaghEnvironmentBuilder {
  constructor() {
    this.waterMaterial = null;
    this.fountains = [];
    this.initWaterMaterial();
  }

  initWaterMaterial() {
    // Canvas texture for water micro-ripples
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(256, 256);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.floor(128 + 60 * Math.sin(i / 18) * Math.cos(i / 24));
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = 255;
      imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    const rippleTex = new THREE.CanvasTexture(canvas);
    rippleTex.wrapS = THREE.RepeatWrapping;
    rippleTex.wrapT = THREE.RepeatWrapping;
    rippleTex.repeat.set(8, 24);

    this.waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a424e,
      roughness: 0.12,
      metalness: 0.15,
      transmission: 0.75,
      ior: 1.333,
      bumpMap: rippleTex,
      bumpScale: 0.035,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });
  }

  buildEnvironment() {
    const envGroup = new THREE.Group();
    envGroup.name = 'CharbaghGarden';

    const sandstoneTex = textureGenerator.getRedSandstonePaverTexture();
    const marbleTex = textureGenerator.getWhiteMarbleTexture();

    const matLawn = new THREE.MeshStandardMaterial({
      color: 0x3d6632,
      roughness: 0.85,
      metalness: 0.02
    });

    const matWalkway = new THREE.MeshStandardMaterial({
      map: sandstoneTex,
      roughness: 0.75,
      bumpMap: sandstoneTex,
      bumpScale: 0.02
    });

    const matCoping = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.35,
      metalness: 0.05
    });

    const matSoil = new THREE.MeshStandardMaterial({
      color: 0x3b2a22,
      roughness: 0.9
    });

    // -------------------------------------------------------------
    // 1. BASE TERRAIN & GROUND
    // -------------------------------------------------------------
    const groundGeo = new THREE.PlaneGeometry(300, 300);
    groundGeo.rotateX(-Math.PI / 2);
    const ground = new THREE.Mesh(groundGeo, matSoil);
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    envGroup.add(ground);

    // -------------------------------------------------------------
    // 2. MONUMENTAL REFLECTING POOL (HAUZ)
    // -------------------------------------------------------------
    const poolWidth = 14;
    const poolLength = 110;
    const poolDepth = 0.8;
    const poolZCenter = 85; // Stretching out in front of the museum

    // Pool water surface
    const poolWaterGeo = new THREE.PlaneGeometry(poolWidth, poolLength);
    poolWaterGeo.rotateX(-Math.PI / 2);
    const poolWater = new THREE.Mesh(poolWaterGeo, this.waterMaterial);
    poolWater.position.set(0, 0.25, poolZCenter);
    poolWater.receiveShadow = true;
    envGroup.add(poolWater);

    // Pool bottom
    const poolBottomGeo = new THREE.PlaneGeometry(poolWidth, poolLength);
    poolBottomGeo.rotateX(-Math.PI / 2);
    const matPoolBottom = new THREE.MeshStandardMaterial({ color: 0x112b33, roughness: 0.8 });
    const poolBottom = new THREE.Mesh(poolBottomGeo, matPoolBottom);
    poolBottom.position.set(0, -poolDepth, poolZCenter);
    envGroup.add(poolBottom);

    // Marble Coping Border around pool
    const curbThickness = 1.0;
    const curbHeight = 0.45;

    const leftCurbGeo = new THREE.BoxGeometry(curbThickness, curbHeight, poolLength + curbThickness * 2);
    const leftCurb = new THREE.Mesh(leftCurbGeo, matCoping);
    leftCurb.position.set(-poolWidth / 2 - curbThickness / 2, curbHeight / 2, poolZCenter);
    leftCurb.receiveShadow = true;
    envGroup.add(leftCurb);

    const rightCurb = leftCurb.clone();
    rightCurb.position.x = poolWidth / 2 + curbThickness / 2;
    envGroup.add(rightCurb);

    const northCurbGeo = new THREE.BoxGeometry(poolWidth + curbThickness * 2, curbHeight, curbThickness);
    const northCurb = new THREE.Mesh(northCurbGeo, matCoping);
    northCurb.position.set(0, curbHeight / 2, poolZCenter - poolLength / 2 - curbThickness / 2);
    envGroup.add(northCurb);

    const southCurb = northCurb.clone();
    southCurb.position.z = poolZCenter + poolLength / 2 + curbThickness / 2;
    envGroup.add(southCurb);

    // Central ornamental fountain jets along the pool axis
    const fountainCount = 9;
    for (let f = 0; f < fountainCount; f++) {
      const fz = poolZCenter - poolLength / 2 + 10 + f * ((poolLength - 20) / (fountainCount - 1));

      // Marble fountain basin
      const basinGeo = new THREE.CylinderGeometry(0.7, 0.4, 0.4, 12);
      const basin = new THREE.Mesh(basinGeo, matCoping);
      basin.position.set(0, 0.2, fz);
      envGroup.add(basin);

      // Water plume spray (translucent conical spray)
      const sprayGeo = new THREE.ConeGeometry(0.45, 2.6, 12, 1, true);
      const matSpray = new THREE.MeshBasicMaterial({
        color: 0xdaf2fc,
        transparent: true,
        opacity: 0.55
      });
      const spray = new THREE.Mesh(sprayGeo, matSpray);
      spray.position.set(0, 1.5, fz);
      envGroup.add(spray);
      this.fountains.push(spray);
    }

    // -------------------------------------------------------------
    // 3. CHARBAGH GEOMETRIC LAWN PARTERRES & PAVED WALKWAYS
    // -------------------------------------------------------------
    // Main broad paved walkways flanking the reflecting pool
    const walkwayWidth = 8;
    const walkLeftGeo = new THREE.PlaneGeometry(walkwayWidth, poolLength + 20);
    walkLeftGeo.rotateX(-Math.PI / 2);
    const walkLeft = new THREE.Mesh(walkLeftGeo, matWalkway);
    walkLeft.position.set(-poolWidth / 2 - curbThickness - walkwayWidth / 2, 0.08, poolZCenter);
    walkLeft.receiveShadow = true;
    envGroup.add(walkLeft);

    const walkRight = walkLeft.clone();
    walkRight.position.x = poolWidth / 2 + curbThickness + walkwayWidth / 2;
    envGroup.add(walkRight);

    // Transverse East-West Central Avenue
    const crossWalkGeo = new THREE.PlaneGeometry(160, walkwayWidth);
    crossWalkGeo.rotateX(-Math.PI / 2);
    const crossWalk = new THREE.Mesh(crossWalkGeo, matWalkway);
    crossWalk.position.set(0, 0.07, poolZCenter);
    crossWalk.receiveShadow = true;
    envGroup.add(crossWalk);

    // 4 Symmetrical Lawn Quadrants (Charbagh)
    const quadW = 55;
    const quadL = (poolLength - walkwayWidth) / 2 - 4;

    const createLawnQuadrant = (qx, qz) => {
      const qGroup = new THREE.Group();
      // Main lawn grass
      const lawnGeo = new THREE.PlaneGeometry(quadW, quadL);
      lawnGeo.rotateX(-Math.PI / 2);
      const lawn = new THREE.Mesh(lawnGeo, matLawn);
      lawn.receiveShadow = true;
      qGroup.add(lawn);

      // Decorative flower parterre borders (Roses & Jasmine beds)
      const bedGeo = new THREE.BoxGeometry(quadW - 4, 0.25, quadL - 4);
      const matBed = new THREE.MeshStandardMaterial({ color: 0x472f1e, roughness: 0.9 });
      const bed = new THREE.Mesh(bedGeo, matBed);
      bed.position.y = 0.12;
      qGroup.add(bed);

      // Red/Yellow flowers clumps
      const flowerCount = 14;
      for (let fl = 0; fl < flowerCount; fl++) {
        const fx = (Math.random() - 0.5) * (quadW - 10);
        const fz = (Math.random() - 0.5) * (quadL - 10);
        const fCol = Math.random() > 0.5 ? 0xd93829 : 0xf2b705;
        const flGeo = new THREE.SphereGeometry(0.5, 6, 6);
        const flMat = new THREE.MeshStandardMaterial({ color: fCol, roughness: 0.6 });
        const flower = new THREE.Mesh(flGeo, flMat);
        flower.position.set(fx, 0.35, fz);
        qGroup.add(flower);
      }

      qGroup.position.set(qx, 0.05, qz);
      return qGroup;
    };

    const quadXOff = poolWidth / 2 + curbThickness + walkwayWidth + quadW / 2 + 2;
    const quadZ1 = poolZCenter - poolLength / 4 - walkwayWidth / 4;
    const quadZ2 = poolZCenter + poolLength / 4 + walkwayWidth / 4;

    // NW, NE, SW, SE Quadrants
    envGroup.add(createLawnQuadrant(-quadXOff, quadZ1));
    envGroup.add(createLawnQuadrant(quadXOff, quadZ1));
    envGroup.add(createLawnQuadrant(-quadXOff, quadZ2));
    envGroup.add(createLawnQuadrant(quadXOff, quadZ2));

    // -------------------------------------------------------------
    // 4. SYMMETRICAL CYPRESS TREES (SARV)
    // -------------------------------------------------------------
    const createCypressTree = () => {
      const treeGroup = new THREE.Group();

      // Slender dark trunk
      const trunkH = 1.8;
      const trunkGeo = new THREE.CylinderGeometry(0.18, 0.26, trunkH, 8);
      const matTrunk = new THREE.MeshStandardMaterial({ color: 0x2b1e15, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, matTrunk);
      trunk.position.y = trunkH / 2;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Deep evergreen slender conical foliage (distinctive Mughal Cypress silhouette)
      const foliageH = 8.5;
      const foliageR = 1.25;

      // Tiered overlapping slender cones for natural lush look
      const matFoliage = new THREE.MeshStandardMaterial({
        color: 0x1f3c24, // Deep cypress evergreen
        roughness: 0.75,
        metalness: 0.02,
        flatShading: true
      });

      const cone1 = new THREE.Mesh(new THREE.ConeGeometry(foliageR * 1.05, foliageH * 0.45, 10), matFoliage);
      cone1.position.y = trunkH + foliageH * 0.22;
      cone1.castShadow = true;
      treeGroup.add(cone1);

      const cone2 = new THREE.Mesh(new THREE.ConeGeometry(foliageR * 0.85, foliageH * 0.45, 10), matFoliage);
      cone2.position.y = trunkH + foliageH * 0.45;
      cone2.castShadow = true;
      treeGroup.add(cone2);

      const cone3 = new THREE.Mesh(new THREE.ConeGeometry(foliageR * 0.55, foliageH * 0.45, 10), matFoliage);
      cone3.position.y = trunkH + foliageH * 0.72;
      cone3.castShadow = true;
      treeGroup.add(cone3);

      return treeGroup;
    };

    // Place trees in dignified symmetrical rows flanking both sides of the reflecting pool
    const numTrees = 12;
    const treeXDist = poolWidth / 2 + curbThickness + 1.2;

    for (let t = 0; t < numTrees; t++) {
      const tz = poolZCenter - poolLength / 2 + 5 + t * ((poolLength - 10) / (numTrees - 1));

      // Left Tree
      const treeL = createCypressTree();
      treeL.position.set(-treeXDist, 0, tz);
      // Slight natural variation
      const sL = 0.9 + Math.random() * 0.2;
      treeL.scale.set(sL, sL, sL);
      treeL.rotation.y = Math.random() * Math.PI * 2;
      envGroup.add(treeL);

      // Right Symmetrical Tree
      const treeR = createCypressTree();
      treeR.position.set(treeXDist, 0, tz);
      const sR = 0.9 + Math.random() * 0.2;
      treeR.scale.set(sR, sR, sR);
      treeR.rotation.y = Math.random() * Math.PI * 2;
      envGroup.add(treeR);
    }

    return envGroup;
  }

  /**
   * Applies Golden-Hour East Sunlight & Atmospheric Sky/Haze
   */
  setupGoldenHourLighting(scene) {
    const lightsGroup = new THREE.Group();
    lightsGroup.name = 'GoldenHourLights';

    // 1. Warm Golden Directional Sun from the East (low angle ~24°)
    const sunColor = new THREE.Color(0xffaf5a); // Warm amber golden sun
    const sunLight = new THREE.DirectionalLight(sunColor, 2.6);
    sunLight.name = 'SunLight';

    // East is +X axis; low altitude: angle ~24 deg
    const sunDistance = 160;
    const elevation = 24 * (Math.PI / 180);
    const azimuth = 20 * (Math.PI / 180); // Slightly north-east

    sunLight.position.set(
      sunDistance * Math.cos(elevation) * Math.cos(azimuth),
      sunDistance * Math.sin(elevation),
      sunDistance * Math.cos(elevation) * Math.sin(azimuth) + 40
    );

    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 350;
    sunLight.shadow.bias = -0.0003;

    const d = 90;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;

    lightsGroup.add(sunLight);

    // 2. Soft Ambient Sky Light (Warm golden dome + deep turquoise ground bounce)
    const hemiLight = new THREE.HemisphereLight(0xffdfb8, 0x4a5d6e, 0.85);
    hemiLight.position.set(0, 80, 0);
    lightsGroup.add(hemiLight);

    // 3. Subtle Rim/Fill Light to illuminate western facade shadows
    const fillLight = new THREE.DirectionalLight(0xa5c9eb, 0.45);
    fillLight.position.set(-100, 40, -50);
    lightsGroup.add(fillLight);

    // 4. Atmospheric Haze / Golden Mist
    scene.fog = new THREE.FogExp2(0xe4c39e, 0.0048);

    // 5. Sky Dome (Golden amber horizon transitioning to evening turquoise sky)
    const skyGeo = new THREE.SphereGeometry(280, 32, 24);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x386d8a) }, // Twilight turquoise
        bottomColor: { value: new THREE.Color(0xf6af62) }, // Warm glowing horizon
        offset: { value: 15.0 },
        exponent: { value: 0.6 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide
    });

    const skyDome = new THREE.Mesh(skyGeo, skyMat);
    lightsGroup.add(skyDome);

    return lightsGroup;
  }
}

export const charbaghEnvBuilder = new CharbaghEnvironmentBuilder();
