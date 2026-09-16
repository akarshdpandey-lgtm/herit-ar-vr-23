import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mughalMuseumBuilder } from '../models/mughalMuseum.js';
import { charbaghEnvBuilder } from '../models/charbaghEnv.js';
import { nationalMuseumDelhiBuilder } from '../models/nationalMuseumDelhi.js';
import { salarJungMuseumBuilder } from '../models/salarJungMuseum.js';
import { tajMahalBuilder } from '../models/tajMahal.js';
import { redFortBuilder } from '../models/redFort.js';
import { hawaMahalBuilder } from '../models/hawaMahal.js';
import { khajurahoTempleBuilder } from '../models/khajurahoTemple.js';
import { hampiRuinsBuilder } from '../models/hampiRuins.js';
import { ajantaElloraBuilder } from '../models/ajantaElloraCaves.js';
import { kedarnathTempleBuilder } from '../models/kedarnathTemple.js';
import { badrinathTempleBuilder } from '../models/badrinathTemple.js';
import { mahakaleshwarTempleBuilder } from '../models/mahakaleshwarTemple.js';
import { kashiVishwanathBuilder } from '../models/kashiVishwanathTemple.js';
import { projectStore } from '../state/projectStore.js';

/**
 * SceneManager: Handles 3D rendering loop, camera choreography,
 * dynamic phase transitions, lighting setup, and visual modes.
 */
export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.width = canvasContainer.clientWidth || window.innerWidth;
    this.height = canvasContainer.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.currentModelGroup = null;
    this.currentEnvGroup = null;
    this.currentLightingGroup = null;
    this.symmetryHelper = null;

    this.clock = new THREE.Clock();
    this.animationFrameId = null;

    this.initRenderer();
    this.initCamera();
    this.initControls();
    this.initSymmetryHelper();

    // Resize handler
    this.handleResize = () => this.onWindowResize();
    window.addEventListener('resize', this.handleResize);

    // Subscribe to store updates
    this.unsubscribeStore = projectStore.subscribe((store) => this.onStoreUpdate(store));

    // Initial scene build
    this.rebuildScene(projectStore.activePhase, projectStore.viewMode);

    this.animate();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true // Required for high-res snapshot export
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(42, this.width / this.height, 0.5, 1200);
    // Default hero / street front view
    this.camera.position.set(0, 16, 120);
    this.camera.lookAt(0, 14, 10);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going below ground
    this.controls.minDistance = 6;
    this.controls.maxDistance = 380;
    this.controls.target.set(0, 12, 10);
    this.controls.update();
  }

  initSymmetryHelper() {
    this.symmetryHelper = new THREE.Group();
    this.symmetryHelper.name = 'SymmetryAxes';

    // Longitudinal axis (North-South / Front-Back) - Gold
    const longMat = new THREE.LineDashedMaterial({
      color: 0xdfad32,
      dashSize: 2,
      gapSize: 1,
      linewidth: 2
    });
    const longGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.1, -90),
      new THREE.Vector3(0, 0.1, 160)
    ]);
    const longLine = new THREE.Line(longGeo, longMat);
    longLine.computeLineDistances();
    this.symmetryHelper.add(longLine);

    // Transverse axis (East-West) - Cyan
    const transMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 2,
      gapSize: 1,
      linewidth: 2
    });
    const transGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-80, 0.1, 0),
      new THREE.Vector3(80, 0.1, 0)
    ]);
    const transLine = new THREE.Line(transGeo, transMat);
    transLine.computeLineDistances();
    this.symmetryHelper.add(transLine);

    this.symmetryHelper.visible = projectStore.showSymmetry;
    this.scene.add(this.symmetryHelper);
  }

  onStoreUpdate(store) {
    this.rebuildScene(store.activePhase, store.viewMode);
    if (this.symmetryHelper) {
      this.symmetryHelper.visible = store.showSymmetry && store.activePhase <= 2;
    }
    this.renderer.toneMappingExposure = store.lighting.exposure || 1.15;
  }

  rebuildScene(phase, viewMode) {
    // 1. Clean up previous model and environment
    if (this.currentModelGroup) {
      this.scene.remove(this.currentModelGroup);
      this.currentModelGroup = null;
    }
    if (this.currentEnvGroup) {
      this.scene.remove(this.currentEnvGroup);
      this.currentEnvGroup = null;
    }
    if (this.currentLightingGroup) {
      this.scene.remove(this.currentLightingGroup);
      this.currentLightingGroup = null;
    }

    const activeProj = projectStore.getActiveProject();
    const isKedarnath = activeProj.id === 'kedarnath-01' || activeProj.archetype === 'kedarnath';
    const isBadrinath = activeProj.id === 'badrinath-02' || activeProj.archetype === 'badrinath';
    const isMahakaleshwar = activeProj.id === 'mahakaleshwar-03' || activeProj.archetype === 'mahakaleshwar';
    const isKashi = activeProj.id === 'kashi-vishwanath-04' || activeProj.archetype === 'kashi-vishwanath';
    const isKhajuraho = activeProj.id === 'khajuraho-01' || activeProj.archetype === 'nagara-temple';
    const isHampi = activeProj.id === 'hampi-02' || activeProj.archetype === 'hampi-ruins';
    const isAjanta = activeProj.id === 'ajanta-ellora-03' || activeProj.archetype === 'rock-cut-cave';
    const isTajMahal = activeProj.id === 'taj-mahal-01' || activeProj.archetype === 'taj-mahal';
    const isRedFort = activeProj.id === 'red-fort-02' || activeProj.archetype === 'red-fort';
    const isHawaMahal = activeProj.id === 'hawa-mahal-03' || activeProj.archetype === 'hawa-mahal';
    const isSalarJung = activeProj.id === 'salar-jung-museum-03' || activeProj.archetype === 'colonial';
    const isNationalMuseum = activeProj.id === 'national-museum-delhi-02' || activeProj.archetype === 'national-museum';

    if (isKedarnath) {
      // 1. Kedarnath Temple (Uttarakhand)
      this.currentModelGroup = kedarnathTempleBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = kedarnathTempleBuilder.buildHimalayanEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = kedarnathTempleBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = kedarnathTempleBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isBadrinath) {
      // 2. Badrinath Temple (Uttarakhand)
      this.currentModelGroup = badrinathTempleBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = badrinathTempleBuilder.buildValleyEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = badrinathTempleBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = badrinathTempleBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isMahakaleshwar) {
      // 3. Mahakaleshwar Temple (Ujjain)
      this.currentModelGroup = mahakaleshwarTempleBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = mahakaleshwarTempleBuilder.buildUjjainComplexEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = mahakaleshwarTempleBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = mahakaleshwarTempleBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isKashi) {
      // 4. Kashi Vishwanath Temple (Varanasi)
      this.currentModelGroup = kashiVishwanathBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = kashiVishwanathBuilder.buildVaranasiCorridorEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = kashiVishwanathBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = kashiVishwanathBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isKhajuraho) {
      // 1. Khajuraho Temples (Madhya Pradesh)
      this.currentModelGroup = khajurahoTempleBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = khajurahoTempleBuilder.buildComplexEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = khajurahoTempleBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = khajurahoTempleBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isHampi) {
      // 2. Hampi Ruins & Stone Chariot (Karnataka)
      this.currentModelGroup = hampiRuinsBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = hampiRuinsBuilder.buildHampiBoulderLandscape();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = hampiRuinsBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = hampiRuinsBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isAjanta) {
      // 3. Ajanta-Ellora Rock-Cut Caves (Maharashtra)
      this.currentModelGroup = ajantaElloraBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = ajantaElloraBuilder.buildGorgeValleyEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = ajantaElloraBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = ajantaElloraBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isTajMahal) {
      // 4. Taj Mahal (Agra)
      this.currentModelGroup = tajMahalBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = tajMahalBuilder.buildCharbaghEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = tajMahalBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = tajMahalBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isRedFort) {
      // 5. Red Fort (Delhi)
      this.currentModelGroup = redFortBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = redFortBuilder.buildMoatAndMarketEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = redFortBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = redFortBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isHawaMahal) {
      // 6. Hawa Mahal (Jaipur)
      this.currentModelGroup = hawaMahalBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = hawaMahalBuilder.buildJaipurStreetEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = hawaMahalBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
      } else {
        this.currentLightingGroup = hawaMahalBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isSalarJung) {
      // 7. Salar Jung Museum (Hyderabad)
      this.currentModelGroup = salarJungMuseumBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = salarJungMuseumBuilder.buildHeritageStreetEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = salarJungMuseumBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
        this.scene.background = null;
      } else {
        this.currentLightingGroup = salarJungMuseumBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else if (isNationalMuseum) {
      // 8. National Museum (Delhi)
      this.currentModelGroup = nationalMuseumDelhiBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = nationalMuseumDelhiBuilder.buildPlazaEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = nationalMuseumDelhiBuilder.setupLighting(this.scene, 4);
        this.scene.add(this.currentLightingGroup);
        this.scene.background = null;
      } else {
        this.currentLightingGroup = nationalMuseumDelhiBuilder.setupLighting(this.scene, phase);
        this.scene.add(this.currentLightingGroup);
      }
    } else {
      // 9. Mughal Heritage Museum (Agra Complex)
      this.currentModelGroup = mughalMuseumBuilder.build(phase, viewMode);
      this.scene.add(this.currentModelGroup);

      if (phase === 4) {
        this.currentEnvGroup = charbaghEnvBuilder.buildEnvironment();
        this.scene.add(this.currentEnvGroup);

        this.currentLightingGroup = charbaghEnvBuilder.setupGoldenHourLighting(this.scene);
        this.scene.add(this.currentLightingGroup);
        this.scene.background = null;
      } else {
        this.scene.fog = null;
        this.scene.background = new THREE.Color(phase === 1 ? 0x18191c : 0x131417);

        this.currentLightingGroup = this.createStudioLighting(phase);
        this.scene.add(this.currentLightingGroup);

        const grid = new THREE.GridHelper(100, 50, 0xc5a059, 0x2e3035);
        grid.position.y = -0.01;
        this.currentLightingGroup.add(grid);
      }
    }
  }

  createStudioLighting(phase) {
    const group = new THREE.Group();
    group.name = 'StudioLighting';

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xfff5ea, phase === 1 ? 2.2 : 2.0);
    keyLight.position.set(40, 60, 50);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 10;
    keyLight.shadow.camera.far = 200;
    const d = 50;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    group.add(keyLight);

    // Soft Ambient / Fill Light
    const fillLight = new THREE.DirectionalLight(0xbad2e8, 0.9);
    fillLight.position.set(-40, 30, -30);
    group.add(fillLight);

    // Rim / Edge Light
    const rimLight = new THREE.DirectionalLight(0xffeedd, 0.75);
    rimLight.position.set(0, 45, -60);
    group.add(rimLight);

    // Ambient Hemisphere
    const hemi = new THREE.HemisphereLight(0xffffff, 0x282a30, 0.9);
    hemi.position.set(0, 50, 0);
    group.add(hemi);

    return group;
  }

  /**
   * Smoothly animates camera to a preset viewpoint
   */
  setCameraPreset(presetName) {
    const activeProj = projectStore.getActiveProject();
    const isKedarnath = activeProj.id === 'kedarnath-01' || activeProj.archetype === 'kedarnath';
    const isBadrinath = activeProj.id === 'badrinath-02' || activeProj.archetype === 'badrinath';
    const isMahakaleshwar = activeProj.id === 'mahakaleshwar-03' || activeProj.archetype === 'mahakaleshwar';
    const isKashi = activeProj.id === 'kashi-vishwanath-04' || activeProj.archetype === 'kashi-vishwanath';
    const isKhajuraho = activeProj.id === 'khajuraho-01' || activeProj.archetype === 'nagara-temple';
    const isHampi = activeProj.id === 'hampi-02' || activeProj.archetype === 'hampi-ruins';
    const isAjanta = activeProj.id === 'ajanta-ellora-03' || activeProj.archetype === 'rock-cut-cave';
    const isTajMahal = activeProj.id === 'taj-mahal-01' || activeProj.archetype === 'taj-mahal';
    const isRedFort = activeProj.id === 'red-fort-02' || activeProj.archetype === 'red-fort';
    const isHawaMahal = activeProj.id === 'hawa-mahal-03' || activeProj.archetype === 'hawa-mahal';
    const isSalarJung = activeProj.id === 'salar-jung-museum-03' || activeProj.archetype === 'colonial';
    const isNationalMuseum = activeProj.id === 'national-museum-delhi-02' || activeProj.archetype === 'national-museum';

    let presets;
    if (isKedarnath) {
      presets = {
        templeFront: { pos: new THREE.Vector3(0, 10, 75), target: new THREE.Vector3(0, 14, 0) },
        hero: { pos: new THREE.Vector3(42, 22, 55), target: new THREE.Vector3(0, 15, 0) },
        nandiFocus: { pos: new THREE.Vector3(0, 6, 46), target: new THREE.Vector3(0, 4, 35) },
        shikharaRoof: { pos: new THREE.Vector3(0, 26, 25), target: new THREE.Vector3(0, 22, -10) },
        himalayanPeaks: { pos: new THREE.Vector3(0, 18, 90), target: new THREE.Vector3(0, 50, -80) },
        aerial: { pos: new THREE.Vector3(0, 120, 45), target: new THREE.Vector3(0, 0, 0) }
      };
    } else if (isBadrinath) {
      presets = {
        colorfulFacade: { pos: new THREE.Vector3(0, 12, 45), target: new THREE.Vector3(0, 14, 8) },
        hero: { pos: new THREE.Vector3(38, 22, 50), target: new THREE.Vector3(0, 14, 0) },
        taptKund: { pos: new THREE.Vector3(-24, 7, 26), target: new THREE.Vector3(-24, 2, 12) },
        conicalRoof: { pos: new THREE.Vector3(0, 28, 24), target: new THREE.Vector3(0, 22, -8) },
        narNarayanValley: { pos: new THREE.Vector3(0, 18, 85), target: new THREE.Vector3(0, 30, -50) },
        aerial: { pos: new THREE.Vector3(0, 115, 45), target: new THREE.Vector3(0, 0, 0) }
      };
    } else if (isMahakaleshwar) {
      presets = {
        templeFront: { pos: new THREE.Vector3(0, 14, 80), target: new THREE.Vector3(0, 16, 0) },
        hero: { pos: new THREE.Vector3(44, 24, 55), target: new THREE.Vector3(0, 16, -5) },
        nandiMandapa: { pos: new THREE.Vector3(0, 8, 52), target: new THREE.Vector3(0, 6, 42) },
        koteshwarKund: { pos: new THREE.Vector3(-45, 12, 35), target: new THREE.Vector3(-45, 2, 15) },
        layeredShikhara: { pos: new THREE.Vector3(0, 34, 20), target: new THREE.Vector3(0, 28, -12) },
        aerial: { pos: new THREE.Vector3(0, 125, 45), target: new THREE.Vector3(0, 0, 0) }
      };
    } else if (isKashi) {
      presets = {
        goldenSpire: { pos: new THREE.Vector3(0, 28, 26), target: new THREE.Vector3(0, 24, -8) },
        hero: { pos: new THREE.Vector3(40, 24, 50), target: new THREE.Vector3(0, 16, -5) },
        templeFront: { pos: new THREE.Vector3(0, 12, 65), target: new THREE.Vector3(0, 14, 5) },
        corridorArcades: { pos: new THREE.Vector3(-28, 12, 25), target: new THREE.Vector3(-28, 6, 0) },
        morningGlow: { pos: new THREE.Vector3(22, 12, 55), target: new THREE.Vector3(0, 18, 0) },
        aerial: { pos: new THREE.Vector3(0, 120, 45), target: new THREE.Vector3(0, 0, 0) }
      };
    } else if (isKhajuraho) {
      presets = {
        templeFront: { pos: new THREE.Vector3(0, 14, 85), target: new THREE.Vector3(0, 16, 0) },
        hero: { pos: new THREE.Vector3(45, 26, 55), target: new THREE.Vector3(0, 16, -5) },
        shikharaSpire: { pos: new THREE.Vector3(0, 36, 18), target: new THREE.Vector3(0, 30, -18) },
        mandapaEntrance: { pos: new THREE.Vector3(0, 12, 45), target: new THREE.Vector3(0, 11, 20) },
        reliefCarvings: { pos: new THREE.Vector3(-14, 10, -12), target: new THREE.Vector3(-6, 11, -16) },
        aerialLawn: { pos: new THREE.Vector3(0, 130, 45), target: new THREE.Vector3(0, 0, 0) },
        aerial: { pos: new THREE.Vector3(0, 130, 45), target: new THREE.Vector3(0, 0, 0) }
      };
    } else if (isHampi) {
      presets = {
        stoneChariot: { pos: new THREE.Vector3(38, 9, 24), target: new THREE.Vector3(26, 7.5, 4) },
        hero: { pos: new THREE.Vector3(42, 22, 50), target: new THREE.Vector3(0, 10, 0) },
        pillaredHall: { pos: new THREE.Vector3(-18, 12, 22), target: new THREE.Vector3(-18, 10, -10) },
        brokenPillars: { pos: new THREE.Vector3(-32, 8, 8), target: new THREE.Vector3(-22, 6, -6) },
        boulderHills: { pos: new THREE.Vector3(15, 25, 65), target: new THREE.Vector3(0, 15, -40) },
        goldenHour: { pos: new THREE.Vector3(10, 6, 45), target: new THREE.Vector3(18, 8, 4) },
        aerial: { pos: new THREE.Vector3(0, 135, 45), target: new THREE.Vector3(0, 0, 0) }
      };
    } else if (isAjanta) {
      presets = {
        chaityaWindow: { pos: new THREE.Vector3(0, 30, 24), target: new THREE.Vector3(0, 28, 0) },
        hero: { pos: new THREE.Vector3(42, 24, 45), target: new THREE.Vector3(0, 18, 0) },
        verandaPillars: { pos: new THREE.Vector3(0, 11, 26), target: new THREE.Vector3(0, 12, -4) },
        buddhaNiches: { pos: new THREE.Vector3(-26, 12, 16), target: new THREE.Vector3(-29, 11, -2) },
        gorgeValley: { pos: new THREE.Vector3(0, 16, 68), target: new THREE.Vector3(0, -4, 30) },
        interiorTorchlight: { pos: new THREE.Vector3(0, 10, 5), target: new THREE.Vector3(0, 10, -14) },
        aerial: { pos: new THREE.Vector3(0, 120, 45), target: new THREE.Vector3(0, 15, 0) }
      };
    } else if (isTajMahal) {
      presets = {
        charbaghFront: { pos: new THREE.Vector3(0, 11, 145), target: new THREE.Vector3(0, 16, 5) },
        hero: { pos: new THREE.Vector3(45, 24, 65), target: new THREE.Vector3(0, 18, 0) },
        pietraDura: { pos: new THREE.Vector3(0, 11, 28), target: new THREE.Vector3(0, 12, 10) },
        minaretFocus: { pos: new THREE.Vector3(36, 26, 38), target: new THREE.Vector3(26, 22, 26) },
        domeClose: { pos: new THREE.Vector3(0, 36, 34), target: new THREE.Vector3(0, 33, 0) },
        sunriseLow: { pos: new THREE.Vector3(8, 3.2, 115), target: new THREE.Vector3(0, 18, 0) },
        aerial: { pos: new THREE.Vector3(0, 125, 65), target: new THREE.Vector3(0, 0, 10) }
      };
    } else if (isRedFort) {
      presets = {
        lahoriGate: { pos: new THREE.Vector3(0, 12, 55), target: new THREE.Vector3(0, 16, -5) },
        hero: { pos: new THREE.Vector3(48, 22, 60), target: new THREE.Vector3(0, 16, -10) },
        indianFlag: { pos: new THREE.Vector3(0, 38, 22), target: new THREE.Vector3(0, 37, -8) },
        bastions: { pos: new THREE.Vector3(-55, 20, 35), target: new THREE.Vector3(-40, 16, -10) },
        moat: { pos: new THREE.Vector3(0, 5.5, 85), target: new THREE.Vector3(0, 14, 10) },
        bazaar: { pos: new THREE.Vector3(-15, 6, 80), target: new THREE.Vector3(0, 12, 0) },
        aerial: { pos: new THREE.Vector3(0, 130, 50), target: new THREE.Vector3(0, 0, 0) }
      };
    } else if (isHawaMahal) {
      presets = {
        honeycomb: { pos: new THREE.Vector3(0, 18, 48), target: new THREE.Vector3(0, 22, 0) },
        hero: { pos: new THREE.Vector3(35, 22, 45), target: new THREE.Vector3(0, 22, 0) },
        rooftopChhatris: { pos: new THREE.Vector3(0, 42, 22), target: new THREE.Vector3(0, 39, -3) },
        jaipurStreet: { pos: new THREE.Vector3(0, 4.5, 68), target: new THREE.Vector3(0, 20, 5) },
        afternoonGlow: { pos: new THREE.Vector3(26, 14, 52), target: new THREE.Vector3(0, 22, 0) },
        aerial: { pos: new THREE.Vector3(0, 95, 45), target: new THREE.Vector3(0, 15, 0) }
      };
    } else if (isSalarJung) {
      presets = {
        hero: { pos: new THREE.Vector3(62, 24, 75), target: new THREE.Vector3(0, 12, 5) },
        charbaghFront: { pos: new THREE.Vector3(0, 16, 120), target: new THREE.Vector3(0, 14, 10) },
        plazaFront: { pos: new THREE.Vector3(0, 16, 120), target: new THREE.Vector3(0, 14, 10) },
        duskStreet: { pos: new THREE.Vector3(0, 16, 120), target: new THREE.Vector3(0, 14, 10) },
        clockTower: { pos: new THREE.Vector3(0, 30, 56), target: new THREE.Vector3(0, 24, 0) },
        colonnade: { pos: new THREE.Vector3(-26, 6.0, 36), target: new THREE.Vector3(-12, 6.5, 12) },
        staircase: { pos: new THREE.Vector3(0, 8.5, 48), target: new THREE.Vector3(0, 9, 12) },
        portalClose: { pos: new THREE.Vector3(0, 8.5, 48), target: new THREE.Vector3(0, 9, 12) },
        aerial: { pos: new THREE.Vector3(0, 110, 55), target: new THREE.Vector3(0, 0, 5) }
      };
    } else if (isNationalMuseum) {
      presets = {
        hero: { pos: new THREE.Vector3(56, 26, 75), target: new THREE.Vector3(0, 12, 10) },
        charbaghFront: { pos: new THREE.Vector3(0, 18, 142), target: new THREE.Vector3(0, 14, 25) },
        plazaFront: { pos: new THREE.Vector3(0, 18, 142), target: new THREE.Vector3(0, 14, 25) },
        fountainClose: { pos: new THREE.Vector3(0, 8, 112), target: new THREE.Vector3(0, 14, 25) },
        portalClose: { pos: new THREE.Vector3(0, 9, 52), target: new THREE.Vector3(0, 12, 18) },
        staircase: { pos: new THREE.Vector3(0, 9, 52), target: new THREE.Vector3(0, 12, 18) },
        aerial: { pos: new THREE.Vector3(0, 115, 55), target: new THREE.Vector3(0, 0, 10) },
        sunsetLow: { pos: new THREE.Vector3(14, 4.5, 96), target: new THREE.Vector3(0, 16, 15) },
        skylight: { pos: new THREE.Vector3(16, 38, 22), target: new THREE.Vector3(0, 22, 0) }
      };
    } else {
      presets = {
        hero: { pos: new THREE.Vector3(55, 26, 75), target: new THREE.Vector3(0, 14, 0) },
        charbaghFront: { pos: new THREE.Vector3(0, 14, 135), target: new THREE.Vector3(0, 15, 10) },
        plazaFront: { pos: new THREE.Vector3(0, 14, 135), target: new THREE.Vector3(0, 15, 10) },
        aerial: { pos: new THREE.Vector3(0, 115, 60), target: new THREE.Vector3(0, 0, 15) },
        portalClose: { pos: new THREE.Vector3(0, 10, 36), target: new THREE.Vector3(0, 12, 10) },
        staircase: { pos: new THREE.Vector3(0, 10, 36), target: new THREE.Vector3(0, 12, 10) },
        minaretFocus: { pos: new THREE.Vector3(38, 28, 42), target: new THREE.Vector3(20, 24, 20) },
        sunsetLow: { pos: new THREE.Vector3(12, 3.5, 95), target: new THREE.Vector3(0, 16, 0) }
      };
    }

    const targetPreset = presets[presetName] || presets.charbaghFront || presets.lahoriGate || presets.honeycomb || presets.plazaFront || presets.duskStreet || presets.hero;
    this.animateCameraTo(targetPreset.pos, targetPreset.target);
  }

  animateCameraTo(targetPos, targetLookAt, duration = 1200) {
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      this.camera.position.lerpVectors(startPos, targetPos, ease);
      this.controls.target.lerpVectors(startTarget, targetLookAt, ease);
      this.controls.update();

      if (progress < 1.0) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  captureSnapshot() {
    this.renderer.render(this.scene, this.camera);
    const dataURL = this.renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    const proj = projectStore.getActiveProject();
    link.download = `${proj.name.replace(/\s+/g, '_')}_Phase_${projectStore.activePhase}_Render.png`;
    link.href = dataURL;
    link.click();
  }

  onWindowResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    // Subtle water surface motion for Phase 4 (Charbagh and Plaza Fountain)
    if (this.currentEnvGroup) {
      if (charbaghEnvBuilder.waterMaterial?.bumpMap) {
        charbaghEnvBuilder.waterMaterial.bumpMap.offset.y = (elapsed * 0.02) % 1;
        charbaghEnvBuilder.waterMaterial.bumpMap.offset.x = (elapsed * 0.01) % 1;
      }
      if (nationalMuseumDelhiBuilder.waterMaterial?.bumpMap) {
        nationalMuseumDelhiBuilder.waterMaterial.bumpMap.offset.y = (elapsed * 0.03) % 1;
        nationalMuseumDelhiBuilder.waterMaterial.bumpMap.offset.x = (elapsed * 0.015) % 1;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.unsubscribeStore) this.unsubscribeStore();
    window.removeEventListener('resize', this.handleResize);
    if (this.renderer?.domElement?.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
