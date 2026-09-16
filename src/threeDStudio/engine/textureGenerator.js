import * as THREE from 'three';

/**
 * High-definition procedural texture generator for authentic Mughal architecture:
 * - Makrana white marble with grey & warm calcite veining
 * - Pietra Dura (Parchin Kari) floral inlays with semi-precious lapis, carnelian, and jade
 * - Geometric Jali (pierced marble lattice screens)
 * - Arabic Thuluth calligraphy border bands
 * - Red Sandstone & marble paving pavers
 */
export class TextureGenerator {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Generates Makrana White Marble with soft grey/calcite veining
   */
  getWhiteMarbleTexture(width = 1024, height = 1024) {
    const key = `marble_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Base subtle off-white marble tone
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f9f9f8');
    grad.addColorStop(0.5, '#f4f3ef');
    grad.addColorStop(1, '#eeebe4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add subtle cloudiness
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const rad = 60 + Math.random() * 140;
      const radGrad = ctx.createRadialGradient(rx, ry, 5, rx, ry, rad);
      radGrad.addColorStop(0, 'rgba(215, 212, 204, 0.12)');
      radGrad.addColorStop(1, 'rgba(240, 238, 232, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(rx, ry, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Marble veins: subtle grey & golden calcite threads
    const drawVein = (startX, startY, length, baseWidth, color, roughness) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = baseWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      let x = startX;
      let y = startY;
      ctx.moveTo(x, y);

      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.5;
      for (let s = 0; s < length; s++) {
        x += Math.cos(angle) * 4 + (Math.random() - 0.5) * roughness;
        y += Math.sin(angle) * 4 + (Math.random() - 0.5) * roughness;
        ctx.lineTo(x, y);

        // Branching sub-veins
        if (Math.random() < 0.04 && baseWidth > 1) {
          drawSubVein(x, y, 15 + Math.random() * 25, baseWidth * 0.45, color);
        }
      }
      ctx.stroke();
    };

    const drawSubVein = (sx, sy, slen, swidth, color) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = swidth;
      ctx.beginPath();
      let x = sx;
      let y = sy;
      ctx.moveTo(x, y);
      const subAngle = (Math.random() - 0.5) * Math.PI;
      for (let s = 0; s < slen; s++) {
        x += Math.cos(subAngle) * 3 + (Math.random() - 0.5) * 3;
        y += Math.sin(subAngle) * 3 + (Math.random() - 0.5) * 3;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    };

    // Major soft veins
    for (let v = 0; v < 8; v++) {
      const sx = Math.random() * width * 0.6;
      const sy = Math.random() * height * 0.4;
      drawVein(sx, sy, 140, 2.5, 'rgba(160, 155, 145, 0.22)', 6);
    }
    // Fine delicate veins
    for (let v = 0; v < 14; v++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      drawVein(sx, sy, 90, 1.2, 'rgba(135, 130, 122, 0.16)', 4);
    }
    // Warm calcite micro-threads (amber/golden)
    for (let v = 0; v < 5; v++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      drawVein(sx, sy, 70, 1.0, 'rgba(180, 150, 110, 0.14)', 5);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Generates Pietra Dura (Parchin Kari) floral inlays:
   * Lapis lazuli, carnelian, jasper florets set in white marble
   */
  getPietraDuraTexture(width = 1024, height = 1024) {
    const key = `pietradura_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Marble background
    ctx.fillStyle = '#f6f5f0';
    ctx.fillRect(0, 0, width, height);

    // Outer black marble border
    ctx.strokeStyle = '#1b1b1c';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    // Inner thin golden border
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 6;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // Draw ornate Mughal arabesque floral stems and blooms
    const drawLotusFlower = (cx, cy, scale = 1, color1 = '#b83b32', color2 = '#e27158') => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Central core (yellow jasper)
      ctx.fillStyle = '#e8b839';
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();

      // Petals (carnelian red/orange)
      const numPetals = 8;
      for (let p = 0; p < numPetals; p++) {
        const theta = (p * Math.PI * 2) / numPetals;
        ctx.save();
        ctx.rotate(theta);

        // Petal shape
        ctx.fillStyle = color1;
        ctx.beginPath();
        ctx.moveTo(0, 12);
        ctx.quadraticCurveTo(16, 34, 0, 52);
        ctx.quadraticCurveTo(-16, 34, 0, 12);
        ctx.fill();

        // Highlight center line in petal
        ctx.fillStyle = color2;
        ctx.beginPath();
        ctx.moveTo(0, 16);
        ctx.quadraticCurveTo(6, 34, 0, 48);
        ctx.quadraticCurveTo(-6, 34, 0, 16);
        ctx.fill();

        ctx.restore();
      }

      // Onyx/Black inlay outline
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    // Draw jade/malachite green vine scrolls
    const drawVines = () => {
      ctx.strokeStyle = '#2c593f'; // Malachite jade green
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();

      // Sinuous curves
      ctx.moveTo(80, 80);
      ctx.bezierCurveTo(width * 0.3, 160, width * 0.35, height * 0.4, width * 0.5, height * 0.5);
      ctx.bezierCurveTo(width * 0.65, height * 0.6, width * 0.7, height - 160, width - 80, height - 80);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - 80, 80);
      ctx.bezierCurveTo(width * 0.7, 160, width * 0.65, height * 0.4, width * 0.5, height * 0.5);
      ctx.bezierCurveTo(width * 0.35, height * 0.6, width * 0.3, height - 160, 80, height - 80);
      ctx.stroke();
    };

    drawVines();

    // Draw central and corner flowers
    drawLotusFlower(width * 0.5, height * 0.5, 1.4, '#a82c23', '#d95a45'); // Carnelian
    drawLotusFlower(width * 0.25, height * 0.25, 0.9, '#1d4e89', '#3b78c4'); // Lapis lazuli
    drawLotusFlower(width * 0.75, height * 0.25, 0.9, '#1d4e89', '#3b78c4');
    drawLotusFlower(width * 0.25, height * 0.75, 0.9, '#1d4e89', '#3b78c4');
    drawLotusFlower(width * 0.75, height * 0.75, 0.9, '#1d4e89', '#3b78c4');

    // Leaf buds (malachite)
    const drawLeaf = (lx, ly, rot) => {
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(rot);
      ctx.fillStyle = '#2f6d49';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(12, -18, 0, -32);
      ctx.quadraticCurveTo(-12, -18, 0, 0);
      ctx.fill();
      ctx.strokeStyle = '#183824';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    for (let a = 0; a < 8; a++) {
      const angle = (a * Math.PI * 2) / 8;
      const dist = 140;
      drawLeaf(width * 0.5 + Math.cos(angle) * dist, height * 0.5 + Math.sin(angle) * dist, angle + Math.PI / 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Generates Arabic Thuluth Calligraphy Border for the grand pishtaq entrance arch
   */
  getCalligraphyArchTexture(width = 1024, height = 512) {
    const key = `calligraphy_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // White marble background
    ctx.fillStyle = '#f7f6f2';
    ctx.fillRect(0, 0, width, height);

    // Black marble inlay margins (like Taj Mahal arch inscriptions)
    ctx.fillStyle = '#1c1b1a';
    ctx.fillRect(15, 15, width - 30, height - 30);

    // Marble inner text band
    ctx.fillStyle = '#f8f7f2';
    ctx.fillRect(28, 28, width - 56, height - 56);

    // Intricate cursive Arabic Thuluth script styled calligraphy in black marble
    ctx.fillStyle = '#181716';
    ctx.strokeStyle = '#181716';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Simulate flowing Quranic Thuluth letters (Alif, Lam, Meem, Waaw, Raa, Noon with diacritics)
    const drawCalligraphyLine = (yPos) => {
      const segments = 22;
      const step = (width - 120) / segments;

      for (let i = 0; i < segments; i++) {
        const x = 70 + i * step;

        // Vertical ascenders (Alif / Lam)
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(x, yPos + 35);
          ctx.bezierCurveTo(x + 4, yPos, x - 3, yPos - 50, x + 2, yPos - 75);
          ctx.stroke();

          // Serif stroke
          ctx.beginPath();
          ctx.moveTo(x + 2, yPos - 75);
          ctx.lineTo(x - 8, yPos - 65);
          ctx.stroke();
        }

        // Horizontal connecting ligature & swoops
        ctx.beginPath();
        ctx.moveTo(x, yPos + 30);
        ctx.bezierCurveTo(x + step * 0.4, yPos + 40, x + step * 0.7, yPos + 20, x + step, yPos + 30);
        ctx.stroke();

        // Loops (Waw / Mim / Ha)
        if (i % 3 === 1) {
          ctx.beginPath();
          ctx.ellipse(x + step * 0.4, yPos + 22, 14, 10, -0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Descenders (Raa / Noon / Yaa tail)
        if (i % 4 === 2) {
          ctx.beginPath();
          ctx.moveTo(x + 10, yPos + 32);
          ctx.quadraticCurveTo(x + 24, yPos + 68, x + 6, yPos + 78);
          ctx.stroke();
        }

        // Diacritic dots (Nukta / Fatha / Kasra)
        ctx.beginPath();
        ctx.arc(x + 16, yPos - 12, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x + 25, yPos - 35);
        ctx.lineTo(x + 36, yPos - 25);
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.lineWidth = 6;
      }
    };

    drawCalligraphyLine(height * 0.32);
    drawCalligraphyLine(height * 0.68);

    // Outer subtle gold hairline trim
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, width - 64, height - 64);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Generates fine geometric Jali (pierced lattice screen)
   * With transparent holes so light passes through
   */
  getJaliLatticeTexture(size = 512) {
    const key = `jali_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Transparent background for holes
    ctx.clearRect(0, 0, size, size);

    // Carved marble screen lattice color
    ctx.fillStyle = '#f0eee8';
    ctx.fillRect(0, 0, size, size);

    // Punch 8-pointed star & hexagon Mughal lattice perforations
    ctx.globalCompositeOperation = 'destination-out';

    const gridSize = 64;
    const cols = size / gridSize;
    const rows = size / gridSize;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * gridSize + gridSize / 2;
        const cy = r * gridSize + gridSize / 2;

        // 8-pointed star cutout
        ctx.beginPath();
        const outerR = 18;
        const innerR = 10;
        for (let pt = 0; pt < 16; pt++) {
          const r_curr = pt % 2 === 0 ? outerR : innerR;
          const theta = (pt * Math.PI) / 8;
          const px = cx + Math.cos(theta) * r_curr;
          const py = cy + Math.sin(theta) * r_curr;
          if (pt === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Corner circular perforations
        ctx.beginPath();
        ctx.arc(cx - gridSize / 2, cy - gridSize / 2, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 3);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Generates authentic red sandstone paver texture with subtle mortar lines
   */
  getRedSandstonePaverTexture(size = 512) {
    const key = `sandstone_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Red Agra sandstone rich base
    ctx.fillStyle = '#8e3f32';
    ctx.fillRect(0, 0, size, size);

    // Speckles & grain
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const shade = Math.random() > 0.5 ? 'rgba(175, 90, 75, 0.25)' : 'rgba(95, 35, 28, 0.25)';
      ctx.fillStyle = shade;
      ctx.fillRect(x, y, 2, 2);
    }

    // Geometric tile grid lines (Mughal courtyard pavers)
    ctx.strokeStyle = '#5a221b';
    ctx.lineWidth = 3;
    const step = 64;
    for (let x = 0; x <= size; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    for (let y = 0; y <= size; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }

    // Diagonal geometric insets (octagonal tile motif)
    ctx.strokeStyle = 'rgba(235, 225, 210, 0.4)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
        ctx.strokeRect(x + 12, y + 12, step - 24, step - 24);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Warm Sandstone-Beige (Dholpur/Delhi Ashlar Stone) for National Museum Exterior
   */
  getSandstoneBeigeTexture(size = 1024) {
    const key = `sandstone_beige_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Base warm beige stone tone
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#e5d7c3');
    grad.addColorStop(0.5, '#dcceb8');
    grad.addColorStop(1, '#cfc0a8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Natural sandstone grain & mineral speckles
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const speck = Math.random();
      if (speck < 0.4) {
        ctx.fillStyle = 'rgba(160, 140, 115, 0.28)';
      } else if (speck < 0.75) {
        ctx.fillStyle = 'rgba(245, 238, 225, 0.35)';
      } else {
        ctx.fillStyle = 'rgba(125, 100, 75, 0.2)';
      }
      ctx.fillRect(x, y, 1.8, 1.8);
    }

    // Horizontal sedimentary banding
    for (let b = 0; b < 12; b++) {
      const by = Math.random() * size;
      const bh = 15 + Math.random() * 40;
      ctx.fillStyle = 'rgba(180, 160, 135, 0.08)';
      ctx.fillRect(0, by, size, bh);
    }

    // Ashlar masonry block joints (architectural stone coursing)
    const blockH = 64;
    const blockW = 128;
    ctx.strokeStyle = 'rgba(110, 95, 78, 0.35)';
    ctx.lineWidth = 1.5;

    for (let row = 0; row <= size; row += blockH) {
      // Horizontal bed joint
      ctx.beginPath();
      ctx.moveTo(0, row);
      ctx.lineTo(size, row);
      ctx.stroke();

      // Staggered vertical head joints
      const rowIdx = Math.floor(row / blockH);
      const xOffset = (rowIdx % 2) * (blockW / 2);
      for (let col = xOffset; col <= size; col += blockW) {
        ctx.beginPath();
        ctx.moveTo(col, row);
        ctx.lineTo(col, row + blockH);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Modern Architectural Glass with Steel Mullion Grid
   */
  getModernGlassSteelTexture(width = 512, height = 512) {
    const key = `glass_steel_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Subtle sky tinted architectural glass
    const glassGrad = ctx.createLinearGradient(0, 0, 0, height);
    glassGrad.addColorStop(0, '#1a3344');
    glassGrad.addColorStop(0.3, '#274b60');
    glassGrad.addColorStop(0.7, '#1b3240');
    glassGrad.addColorStop(1, '#0f1e29');
    ctx.fillStyle = glassGrad;
    ctx.fillRect(0, 0, width, height);

    // Diagonal sky sheen reflection highlight
    const sheenGrad = ctx.createLinearGradient(0, 0, width, height);
    sheenGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0)');
    sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
    sheenGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);

    // Dark anodized structural steel mullions
    const cols = 4;
    const rows = 6;
    const stepX = width / cols;
    const stepY = height / rows;

    ctx.strokeStyle = '#0d1117';
    ctx.lineWidth = 6;
    for (let x = 0; x <= width; x += stepX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += stepY) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Inner metallic bevel highlights on mullions
    ctx.strokeStyle = '#45505e';
    ctx.lineWidth = 1.5;
    for (let x = 0; x <= width; x += stepX) {
      ctx.beginPath();
      ctx.moveTo(x + 2, 0);
      ctx.lineTo(x + 2, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += stepY) {
      ctx.beginPath();
      ctx.moveTo(0, y + 2);
      ctx.lineTo(width, y + 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Polished Stone Flooring (Italian Travertine / Granite gallery tiles)
   */
  getPolishedStoneFloorTexture(size = 1024) {
    const key = `polished_floor_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Base light grey warm stone
    ctx.fillStyle = '#eae6de';
    ctx.fillRect(0, 0, size, size);

    // Subtle stone clouds & crystal grain
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(210, 205, 195, 0.4)' : 'rgba(255, 255, 255, 0.45)';
      ctx.fillRect(x, y, 2.5, 2.5);
    }

    // Large format gallery tiles (128x128)
    const tileSize = 128;
    ctx.strokeStyle = '#b8b2a5';
    ctx.lineWidth = 2;

    for (let x = 0; x <= size; x += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    for (let y = 0; y <= size; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }

    // Delicate inner border inlays for gallery elegance
    ctx.strokeStyle = 'rgba(160, 150, 135, 0.3)';
    ctx.lineWidth = 1;
    for (let x = 0; x < size; x += tileSize) {
      for (let y = 0; y < size; y += tileSize) {
        ctx.strokeRect(x + 8, y + 8, tileSize - 16, tileSize - 16);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Museum Wall Panels with Mounted Framed Artifact Exhibits
   */
  getMuseumArtifactWallTexture(width = 1024, height = 512) {
    const key = `museum_wall_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Neutral museum gallery wall (soft warm light grey)
    ctx.fillStyle = '#f0eee8';
    ctx.fillRect(0, 0, width, height);

    // Wall texture noise
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(x, y, 2, 2);
    }

    // Draw 4 framed artifact exhibition panels
    const frameCount = 4;
    const spacing = width / frameCount;
    const frameW = spacing * 0.65;
    const frameH = height * 0.55;
    const frameY = height * 0.22;

    const subjects = [
      { title: 'Harappan Relic', bg: '#4a3728', accent: '#d4af37' },
      { title: 'Bronze Sculptures', bg: '#233038', accent: '#70a4b2' },
      { title: 'Miniature Art', bg: '#452a26', accent: '#e87e5b' },
      { title: 'Ancient Scripts', bg: '#2b3829', accent: '#a4c28f' }
    ];

    for (let i = 0; i < frameCount; i++) {
      const frameX = i * spacing + (spacing - frameW) / 2;
      const sub = subjects[i % subjects.length];

      // Drop shadow behind frame
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(frameX + 4, frameY + 6, frameW, frameH);

      // Gold / Bronze frame border
      ctx.fillStyle = '#b89438';
      ctx.fillRect(frameX, frameY, frameW, frameH);

      // Inner bevel
      ctx.fillStyle = '#e5c365';
      ctx.fillRect(frameX + 3, frameY + 3, frameW - 6, frameH - 6);

      // Passepartout matting
      ctx.fillStyle = '#faf8f2';
      ctx.fillRect(frameX + 8, frameY + 8, frameW - 16, frameH - 16);

      // Artwork canvas
      const artX = frameX + 16;
      const artY = frameY + 16;
      const artW = frameW - 32;
      const artH = frameH - 44;

      const artGrad = ctx.createLinearGradient(artX, artY, artX + artW, artY + artH);
      artGrad.addColorStop(0, sub.bg);
      artGrad.addColorStop(1, '#111418');
      ctx.fillStyle = artGrad;
      ctx.fillRect(artX, artY, artW, artH);

      // Central stylized artifact motif
      ctx.fillStyle = sub.accent;
      ctx.beginPath();
      ctx.arc(artX + artW / 2, artY + artH / 2 - 6, artH * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Exhibition placard below frame
      const placardW = frameW * 0.5;
      const placardH = 18;
      const placardX = frameX + (frameW - placardW) / 2;
      const placardY = frameY + frameH + 12;

      ctx.fillStyle = '#22252a';
      ctx.fillRect(placardX, placardY, placardW, placardH);
      ctx.fillStyle = '#e2dfd2';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(sub.title, placardX + placardW / 2, placardY + 12);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Plush Gallery Walkway Carpet Runner
   */
  getGalleryCarpetTexture(width = 512, height = 512) {
    const key = `carpet_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Rich museum crimson/terracotta carpet
    ctx.fillStyle = '#6e1d24';
    ctx.fillRect(0, 0, width, height);

    // Wool fiber texture
    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(150, 45, 55, 0.4)' : 'rgba(70, 15, 20, 0.4)';
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Symmetrical golden woven border along runner sides
    const borderW = 40;
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, borderW, height);
    ctx.fillRect(width - borderW, 0, borderW, height);

    // Geometric pattern inside borders
    ctx.strokeStyle = '#825e14';
    ctx.lineWidth = 2;
    for (let y = 0; y <= height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(6, y);
      ctx.lineTo(borderW - 6, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - borderW + 6, y);
      ctx.lineTo(width - 6, y);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 4);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Open City Plaza Pavers with Concentric Radial Motif
   */
  getCityPlazaPaversTexture(size = 1024) {
    const key = `city_plaza_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Light granite city pavers base
    ctx.fillStyle = '#bcb6aa';
    ctx.fillRect(0, 0, size, size);

    // Fine aggregate grain
    for (let i = 0; i < 7000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(140, 135, 125, 0.35)' : 'rgba(230, 225, 215, 0.4)';
      ctx.fillRect(x, y, 2, 2);
    }

    // Concentric radial plaza rings
    ctx.strokeStyle = '#7c766b';
    ctx.lineWidth = 2;
    const cx = size / 2;
    const cy = size / 2;

    for (let r = 40; r <= size * 0.7; r += 48) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Radial ray lines
    const rays = 32;
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 40, cy + Math.sin(angle) * 40);
      ctx.lineTo(cx + Math.cos(angle) * (size * 0.7), cy + Math.sin(angle) * (size * 0.7));
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Cream-and-White Colonial Building Texture (Lime-wash stucco & ashlar rustication)
   */
  getCreamWhiteColonialTexture(size = 1024) {
    const key = `colonial_cream_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Base warm ivory/cream colonial plaster tone
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#f9f6ed');
    grad.addColorStop(0.5, '#f4efe3');
    grad.addColorStop(1, '#ebe4d5');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle stucco texture stippling
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const shade = Math.random();
      if (shade < 0.4) {
        ctx.fillStyle = 'rgba(215, 205, 190, 0.28)';
      } else if (shade < 0.8) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      } else {
        ctx.fillStyle = 'rgba(180, 168, 150, 0.18)';
      }
      ctx.fillRect(x, y, 1.8, 1.8);
    }

    // Classical horizontal channel rustication (colonial ground floor & cornice banding)
    const rusticationH = 48;
    ctx.strokeStyle = 'rgba(165, 150, 130, 0.4)';
    ctx.lineWidth = 2.5;

    for (let y = 0; y <= size; y += rusticationH) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();

      // Soft shadow line below groove
      ctx.fillStyle = 'rgba(140, 125, 105, 0.15)';
      ctx.fillRect(0, y + 1, size, 3);
    }

    // Staggered vertical ashlar masonry joints
    const blockW = 140;
    ctx.strokeStyle = 'rgba(175, 160, 140, 0.25)';
    ctx.lineWidth = 1.2;
    for (let y = 0; y < size; y += rusticationH) {
      const rowIdx = Math.floor(y / rusticationH);
      const xOffset = (rowIdx % 2) * (blockW / 2);
      for (let x = xOffset; x <= size; x += blockW) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + rusticationH);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Antique Dark Teak / Rosewood Texture for Doors, Windows & Display Cabinets
   */
  getAntiqueWoodTexture(width = 512, height = 512) {
    const key = `antique_wood_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Rich dark teak wood base
    const woodGrad = ctx.createLinearGradient(0, 0, width, height);
    woodGrad.addColorStop(0, '#422415');
    woodGrad.addColorStop(0.5, '#351c10');
    woodGrad.addColorStop(1, '#26130a');
    ctx.fillStyle = woodGrad;
    ctx.fillRect(0, 0, width, height);

    // Longitudinal wood grain fibers
    for (let i = 0; i < 350; i++) {
      const y = Math.random() * height;
      const h = 1 + Math.random() * 2;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(75, 42, 25, 0.35)' : 'rgba(20, 10, 5, 0.4)';
      ctx.fillRect(0, y, width, h);
    }

    // Gentle wood knots & grain waves
    ctx.strokeStyle = 'rgba(18, 9, 4, 0.45)';
    ctx.lineWidth = 1.5;
    for (let w = 0; w < 12; w++) {
      const wy = Math.random() * height;
      ctx.beginPath();
      ctx.moveTo(0, wy);
      ctx.bezierCurveTo(width * 0.3, wy + 8, width * 0.7, wy - 8, width, wy + 4);
      ctx.stroke();
    }

    // Subtle polished varnish sheen highlight
    const varnishGrad = ctx.createLinearGradient(0, 0, width, 0);
    varnishGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0)');
    varnishGrad.addColorStop(0.5, 'rgba(215, 175, 130, 0.14)');
    varnishGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = varnishGrad;
    ctx.fillRect(0, 0, width, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Aged Antique Brass Clock Face with Roman Numerals (Salar Jung Clock Tower)
   */
  getAgedBrassClockTexture(size = 512) {
    const key = `aged_brass_clock_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.46;

    // Outer dark housing
    ctx.fillStyle = '#1e1810';
    ctx.fillRect(0, 0, size, size);

    // Weathered Brass Rim Gradient
    const brassRim = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r);
    brassRim.addColorStop(0, '#aa8232');
    brassRim.addColorStop(0.5, '#e0b85c');
    brassRim.addColorStop(0.85, '#947025');
    brassRim.addColorStop(1, '#4e3810');
    ctx.fillStyle = brassRim;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Clock Face Dial (Aged antique ivory / parchment dial)
    const dialGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, r * 0.88);
    dialGrad.addColorStop(0, '#fffbf0');
    dialGrad.addColorStop(0.7, '#f4ecdc');
    dialGrad.addColorStop(1, '#d8cbaf');
    ctx.fillStyle = dialGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
    ctx.fill();

    // Patina specks & aging
    for (let p = 0; p < 800; p++) {
      const px = cx + (Math.random() - 0.5) * r * 1.6;
      const py = cy + (Math.random() - 0.5) * r * 1.6;
      if (Math.hypot(px - cx, py - cy) < r * 0.84) {
        ctx.fillStyle = 'rgba(100, 80, 50, 0.12)';
        ctx.fillRect(px, py, 2, 2);
      }
    }

    // Outer and inner minute track rings
    ctx.strokeStyle = '#2a1f12';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.74, 0, Math.PI * 2);
    ctx.stroke();

    // Minute tick marks (60 marks)
    for (let m = 0; m < 60; m++) {
      const angle = (m / 60) * Math.PI * 2 - Math.PI / 2;
      const isMajor = m % 5 === 0;
      const tickLen = isMajor ? 12 : 5;
      ctx.lineWidth = isMajor ? 3 : 1.2;
      ctx.strokeStyle = '#2a1f12';
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * (r * 0.82), cy + Math.sin(angle) * (r * 0.82));
      ctx.lineTo(cx + Math.cos(angle) * (r * 0.82 - tickLen), cy + Math.sin(angle) * (r * 0.82 - tickLen));
      ctx.stroke();
    }

    // Roman Numerals I to XII
    const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    ctx.fillStyle = '#1c150c';
    ctx.font = 'bold 26px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const numR = r * 0.62;
      const nx = cx + Math.cos(angle) * numR;
      const ny = cy + Math.sin(angle) * numR;
      ctx.fillText(romanNumerals[i], nx, ny);
    }

    // Inner decorative flourish & Salar Jung inscription ring
    ctx.strokeStyle = '#8a6e38';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.42, 0, Math.PI * 2);
    ctx.stroke();

    // Victorian Filigree Hands (pointing at 10:10)
    const drawHand = (angle, length, width, color) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-width / 2, 0);
      ctx.lineTo(-width * 0.8, -length * 0.3);
      ctx.lineTo(-width * 0.2, -length * 0.8);
      ctx.lineTo(0, -length);
      ctx.lineTo(width * 0.2, -length * 0.8);
      ctx.lineTo(width * 0.8, -length * 0.3);
      ctx.lineTo(width / 2, 0);
      ctx.lineTo(0, 16);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Hour hand (at 10 o'clock)
    drawHand(-Math.PI * 0.42, r * 0.48, 8, '#18120a');
    // Minute hand (at 2 o'clock)
    drawHand(Math.PI * 0.35, r * 0.72, 6, '#18120a');

    // Central brass hub pin
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22190c';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Antique Deccani/Persian Royal Museum Carpet
   */
  getAntiqueCarpetTexture(width = 512, height = 512) {
    const key = `antique_carpet_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Deep royal madder red / ruby field
    ctx.fillStyle = '#5e1720';
    ctx.fillRect(0, 0, width, height);

    // Wool pile stippling
    for (let i = 0; i < 7000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(130, 35, 45, 0.4)' : 'rgba(50, 10, 15, 0.4)';
      ctx.fillRect(x, y, 1.6, 1.6);
    }

    // Navy & Gold border frame
    const b1 = 36;
    ctx.fillStyle = '#1c2836'; // Dark Deccani Indigo
    ctx.fillRect(0, 0, b1, height);
    ctx.fillRect(width - b1, 0, b1, height);
    ctx.fillRect(0, 0, width, b1);
    ctx.fillRect(0, height - b1, width, b1);

    // Golden border vine motif
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    for (let y = 10; y < height; y += 30) {
      ctx.beginPath();
      ctx.arc(b1 / 2, y, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width - b1 / 2, y, 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Central ornate floral medallion
    const cx = width / 2;
    const cy = height / 2;
    ctx.fillStyle = '#1c2836';
    ctx.beginPath();
    ctx.ellipse(cx, cy, 70, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 65, 105, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Gold palmette inside medallion
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 4);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Paved Heritage Street Pavers & Cobblestones
   */
  getHeritageCobblestoneTexture(size = 1024) {
    const key = `heritage_cobble_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Dark grey-brown weathered street base
    ctx.fillStyle = '#3a3835';
    ctx.fillRect(0, 0, size, size);

    // Cobblestone grid
    const cobbleW = 44;
    const cobbleH = 26;

    for (let y = 0; y < size; y += cobbleH) {
      const row = Math.floor(y / cobbleH);
      const xOffset = (row % 2) * (cobbleW / 2);
      for (let x = -cobbleW; x <= size + cobbleW; x += cobbleW) {
        const cx = x + xOffset;
        const stoneVal = Math.floor(60 + Math.random() * 40);
        ctx.fillStyle = `rgb(${stoneVal + 8}, ${stoneVal + 5}, ${stoneVal})`;
        ctx.beginPath();
        ctx.roundRect(cx + 2, y + 2, cobbleW - 4, cobbleH - 4, 4);
        ctx.fill();

        // Highlight upper edge
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(cx + 4, y + 3, cobbleW - 8, 2);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Sunrise Sky Texture for Taj Mahal Charbagh (Soft pink-orange morning radiance)
   */
  getSunriseSkyTexture(width = 1024, height = 512) {
    const key = `sunrise_sky_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#1e3052'); // Early morning deep blue zenith
    grad.addColorStop(0.35, '#48587d'); // Lavender blue
    grad.addColorStop(0.65, '#9d6778'); // Soft dusty mauve
    grad.addColorStop(0.85, '#e07d62'); // Warm coral-pink dawn
    grad.addColorStop(0.95, '#f7b072'); // Luminous golden-orange horizon
    grad.addColorStop(1, '#ffdf9e'); // Sunburst horizon glow
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Deep Red Agra Sandstone Texture for Red Fort (Lahori Gate)
   */
  getRedFortSandstoneTexture(size = 1024) {
    const key = `red_fort_sandstone_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Rich Imperial Red Agra Sandstone base
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#942f27');
    grad.addColorStop(0.5, '#822720');
    grad.addColorStop(1, '#6b1c17');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Sandstone mineral specks & iron oxide grain
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const shade = Math.random();
      if (shade < 0.4) {
        ctx.fillStyle = 'rgba(175, 75, 65, 0.28)';
      } else if (shade < 0.75) {
        ctx.fillStyle = 'rgba(215, 120, 105, 0.25)';
      } else {
        ctx.fillStyle = 'rgba(50, 12, 10, 0.35)';
      }
      ctx.fillRect(x, y, 1.8, 1.8);
    }

    // Heavy fortification ashlar coursing (massive defensive stone blocks)
    const blockH = 64;
    const blockW = 140;
    ctx.strokeStyle = 'rgba(40, 10, 8, 0.5)';
    ctx.lineWidth = 2.5;

    for (let y = 0; y <= size; y += blockH) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();

      // Shadow line
      ctx.fillStyle = 'rgba(30, 8, 6, 0.2)';
      ctx.fillRect(0, y + 1, size, 3);

      // Staggered vertical joints
      const rowIdx = Math.floor(y / blockH);
      const xOffset = (rowIdx % 2) * (blockW / 2);
      for (let x = xOffset; x <= size; x += blockW) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + blockH);
        ctx.stroke();
      }
    }

    // Carved geometric and lotus relief border band
    ctx.strokeStyle = 'rgba(235, 180, 170, 0.35)';
    ctx.lineWidth = 1.5;
    for (let y = 0; y < size; y += blockH * 2) {
      for (let x = 0; x < size; x += 32) {
        ctx.beginPath();
        ctx.arc(x + 16, y + 12, 8, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Heavy Iron-Studded Wooden Gate Texture for Red Fort Lahori Gate
   */
  getIronStuddedGateTexture(width = 512, height = 512) {
    const key = `iron_gate_${width}_${height}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Aged dark seasoned sal/teak wood planks
    ctx.fillStyle = '#2b1b12';
    ctx.fillRect(0, 0, width, height);

    // Vertical plank grooves
    const plankW = width / 8;
    for (let x = 0; x < width; x += plankW) {
      ctx.fillStyle = (x / plankW) % 2 === 0 ? '#321f15' : '#26160e';
      ctx.fillRect(x, 0, plankW, height);

      ctx.strokeStyle = '#120b06';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal wrought-iron defensive straps
    const strapH = 24;
    for (let y = 40; y < height; y += 110) {
      ctx.fillStyle = '#1e2124';
      ctx.fillRect(0, y, width, strapH);

      // Strap highlight
      ctx.fillStyle = '#4a5058';
      ctx.fillRect(0, y + 1, width, 2);

      // Defensive conical iron spikes / rivet studs
      for (let x = plankW / 2; x < width; x += plankW) {
        // Outer washer ring
        ctx.fillStyle = '#0f1114';
        ctx.beginPath();
        ctx.arc(x, y + strapH / 2, 8, 0, Math.PI * 2);
        ctx.fill();

        // High metallic spike center
        const spikeGrad = ctx.createRadialGradient(x - 2, y + strapH / 2 - 2, 1, x, y + strapH / 2, 6);
        spikeGrad.addColorStop(0, '#828d99');
        spikeGrad.addColorStop(0.7, '#2f343a');
        spikeGrad.addColorStop(1, '#111316');
        ctx.fillStyle = spikeGrad;
        ctx.beginPath();
        ctx.arc(x, y + strapH / 2, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Authentic Jaipur Pink Sandstone with White Lime Plaster Border Trim (Hawa Mahal)
   */
  getJaipurPinkSandstoneTexture(size = 1024) {
    const key = `jaipur_pink_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Traditional Jaipur Terracotta Pink Sandstone tone
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#d97d6c');
    grad.addColorStop(0.5, '#cc6e5d');
    grad.addColorStop(1, '#bf5f4e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Warm mineral flecks & sandstone texture
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const shade = Math.random();
      if (shade < 0.45) {
        ctx.fillStyle = 'rgba(240, 160, 145, 0.28)';
      } else if (shade < 0.8) {
        ctx.fillStyle = 'rgba(255, 215, 205, 0.35)';
      } else {
        ctx.fillStyle = 'rgba(130, 45, 35, 0.2)';
      }
      ctx.fillRect(x, y, 1.8, 1.8);
    }

    // Crisp white-painted lime plaster trim (Chuna work) outlining arches & moldings
    ctx.strokeStyle = '#fffaf2';
    ctx.lineWidth = 3;

    const cellW = 128;
    const cellH = 128;
    for (let y = 0; y < size; y += cellH) {
      for (let x = 0; x < size; x += cellW) {
        // Decorative cusped arch white border
        ctx.beginPath();
        ctx.moveTo(x + 16, y + cellH - 12);
        ctx.lineTo(x + 16, y + 48);
        ctx.bezierCurveTo(x + 28, y + 20, x + cellW - 28, y + 20, x + cellW - 16, y + 48);
        ctx.lineTo(x + cellW - 16, y + cellH - 12);
        ctx.stroke();

        // Inner white delicate floral filigree
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x + cellW / 2, y + 42, 10, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Intricate Geometric Jali (Lattice) Screen Texture for Hawa Mahal Jharokha Windows
   */
  getHawaMahalJaliTexture(size = 512) {
    const key = `hawa_jali_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Deep interior shadow behind screen
    ctx.fillStyle = '#1c1410';
    ctx.fillRect(0, 0, size, size);

    // Jaipur Pink Stone Lattice Grid
    ctx.strokeStyle = '#d68273';
    ctx.lineWidth = 3;

    const step = 32;
    for (let x = 0; x <= size; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    for (let y = 0; y <= size; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }

    // Diagonal pierced lattice openings (octagonal / diamond jali effect)
    ctx.strokeStyle = '#fffaf2';
    ctx.lineWidth = 1.2;
    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
        ctx.beginPath();
        ctx.moveTo(x + step / 2, y + 6);
        ctx.lineTo(x + step - 6, y + step / 2);
        ctx.lineTo(x + step / 2, y + step - 6);
        ctx.lineTo(x + 6, y + step / 2);
        ctx.closePath();
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    this.cache.set(key, texture);
    return texture;
  }
  /**
   * Warm beige-brown sandstone with carved relief tiers, celestial apsaras, and deities (Khajuraho)
   */
  getKhajurahoCarvedSandstoneTexture(size = 1024) {
    const key = `khajuraho_sandstone_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Warm golden-beige Panna sandstone base
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, '#cbb292');
    grad.addColorStop(0.5, '#ba9e7d');
    grad.addColorStop(1, '#a68765');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Stone grain and natural weathering flecks
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(235, 218, 195, 0.3)' : 'rgba(105, 82, 58, 0.25)';
      ctx.fillRect(x, y, 1.8, 1.8);
    }

    // Horizontal sculptural relief bands (Jangha narrative registers)
    const bandH = 128;
    for (let y = 0; y < size; y += bandH) {
      // Molded architectural cornice line
      ctx.strokeStyle = '#685038';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();

      ctx.strokeStyle = '#dfcbb0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y + 4);
      ctx.lineTo(size, y + 4);
      ctx.stroke();

      // Carved figures & apsara silhouettes along the frieze
      const colW = 64;
      for (let x = 8; x < size; x += colW) {
        // Deep carved niche shadow
        ctx.fillStyle = 'rgba(75, 55, 36, 0.4)';
        ctx.fillRect(x + 4, y + 14, colW - 14, bandH - 24);

        // Stylized carved figure relief
        ctx.fillStyle = '#ddcaa8';
        // Head / halo
        ctx.beginPath();
        ctx.arc(x + colW / 2 - 3, y + 32, 8, 0, Math.PI * 2);
        ctx.fill();
        // Slender tribhanga torso & hips
        ctx.beginPath();
        ctx.moveTo(x + colW / 2 - 3, y + 40);
        ctx.bezierCurveTo(x + colW / 2 + 5, y + 55, x + colW / 2 - 8, y + 75, x + colW / 2 - 3, y + 95);
        ctx.lineTo(x + colW / 2 - 1, y + 95);
        ctx.bezierCurveTo(x + colW / 2 - 4, y + 75, x + colW / 2 + 8, y + 55, x + colW / 2, y + 40);
        ctx.closePath();
        ctx.fill();

        // Floral vine ornamentation
        ctx.strokeStyle = 'rgba(235, 220, 195, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x + colW / 2 - 3, y + 104, 5, 0, Math.PI);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Rough weathered Deccan granite with lichen, fissures, and grey-brown tones (Hampi)
   */
  getHampiWeatheredGraniteTexture(size = 1024) {
    const key = `hampi_granite_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Ancient weathered grey-brown granite base
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#78736a');
    grad.addColorStop(0.5, '#6a645c');
    grad.addColorStop(1, '#59534a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Granite feldspar, quartz crystals & dark biotite mineral speckles
    for (let i = 0; i < 16000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const rnd = Math.random();
      if (rnd < 0.4) {
        ctx.fillStyle = 'rgba(215, 210, 200, 0.4)'; // Light quartz
      } else if (rnd < 0.75) {
        ctx.fillStyle = 'rgba(38, 35, 30, 0.45)';  // Dark mica
      } else {
        ctx.fillStyle = 'rgba(145, 115, 90, 0.35)'; // Feldspar tan
      }
      ctx.fillRect(x, y, 2, 2);
    }

    // Weathered fissures & ancient stress fractures
    ctx.strokeStyle = 'rgba(32, 28, 25, 0.6)';
    ctx.lineWidth = 1.8;
    for (let f = 0; f < 14; f++) {
      let cx = Math.random() * size;
      let cy = Math.random() * size;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      for (let seg = 0; seg < 5; seg++) {
        cx += (Math.random() - 0.5) * 80;
        cy += (Math.random() - 0.5) * 80;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

    // Organic green & pale grey-yellow lichen patches
    for (let l = 0; l < 35; l++) {
      const lx = Math.random() * size;
      const ly = Math.random() * size;
      const lr = 12 + Math.random() * 32;
      const lichenGrad = ctx.createRadialGradient(lx, ly, 2, lx, ly, lr);
      const isGreen = Math.random() > 0.4;
      if (isGreen) {
        lichenGrad.addColorStop(0, 'rgba(88, 115, 75, 0.45)');
        lichenGrad.addColorStop(0.7, 'rgba(110, 138, 92, 0.25)');
      } else {
        lichenGrad.addColorStop(0, 'rgba(180, 175, 140, 0.4)');
        lichenGrad.addColorStop(0.7, 'rgba(150, 145, 120, 0.2)');
      }
      lichenGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lichenGrad;
      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Stone Chariot (Rath) Wheel & Bas-Relief Carving Texture (Hampi)
   */
  getHampiChariotStoneTexture(size = 512) {
    const key = `hampi_chariot_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Weathered granite background
    ctx.fillStyle = '#686259';
    ctx.fillRect(0, 0, size, size);

    // Carved stone wheel concentric rims
    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.44;

    ctx.strokeStyle = '#3e3831';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#8f887d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, maxR - 8, 0, Math.PI * 2);
    ctx.stroke();

    // Central hub
    const hubGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 45);
    hubGrad.addColorStop(0, '#989083');
    hubGrad.addColorStop(0.8, '#524c44');
    hubGrad.addColorStop(1, '#2f2a24');
    ctx.fillStyle = hubGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 45, 0, Math.PI * 2);
    ctx.fill();

    // 16 Carved Granite Spokes
    ctx.strokeStyle = '#827a70';
    ctx.lineWidth = 6;
    for (let s = 0; s < 16; s++) {
      const angle = (s * Math.PI * 2) / 16;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 45, cy + Math.sin(angle) * 45);
      ctx.lineTo(cx + Math.cos(angle) * (maxR - 10), cy + Math.sin(angle) * (maxR - 10));
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Rough-hewn dark Deccan basalt cliff rock texture (Ajanta-Ellora)
   */
  getBasaltRockCliffTexture(size = 1024) {
    const key = `basalt_rock_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Dark volcanic basalt base
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, '#363432');
    grad.addColorStop(0.5, '#2b2928');
    grad.addColorStop(1, '#22201f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Geological horizontal basalt trap strata layers
    const layerH = 64;
    for (let y = 0; y < size; y += layerH) {
      ctx.strokeStyle = 'rgba(20, 18, 16, 0.7)';
      ctx.lineWidth = 3 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(0, y + (Math.random() - 0.5) * 10);
      for (let x = 0; x <= size; x += 64) {
        ctx.lineTo(x, y + (Math.random() - 0.5) * 12);
      }
      ctx.stroke();
    }

    // Chisel marks & pick-axed rock texture
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(75, 72, 68, 0.35)' : 'rgba(15, 14, 13, 0.4)';
      ctx.fillRect(x, y, 2.5, 1.2);
    }

    // Mineral seepage streaks (ochre, iron & calcium)
    for (let s = 0; s < 12; s++) {
      const sx = Math.random() * size;
      const sy = Math.random() * (size * 0.4);
      const sLen = 80 + Math.random() * 220;
      const sGrad = ctx.createLinearGradient(sx, sy, sx, sy + sLen);
      sGrad.addColorStop(0, 'rgba(165, 118, 72, 0.4)');
      sGrad.addColorStop(0.7, 'rgba(140, 95, 55, 0.2)');
      sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sGrad;
      ctx.fillRect(sx, sy, 8 + Math.random() * 12, sLen);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Ancient Indian Buddhist Fresco Mural Wall Painting (Ajanta Caves)
   */
  getAjantaFrescoMuralTexture(size = 1024) {
    const key = `ajanta_fresco_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Ancient clay plaster base (Mud, cow dung, rock grit & lime tempera ground)
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#9e7b57');
    grad.addColorStop(0.5, '#8c6b48');
    grad.addColorStop(1, '#755536');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Weathered plaster grain & micro-fissures
    for (let i = 0; i < 7000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(215, 185, 145, 0.25)' : 'rgba(55, 38, 24, 0.3)';
      ctx.fillRect(x, y, 2, 2);
    }

    // Faded natural pigments: Terracotta red, yellow ochre, lapis lazuli, terra verde
    // Bodhisattva Padmapani / Avalokiteshvara figurative motifs
    const panels = [
      { x: 120, y: 140, w: 220, h: 320, color: 'rgba(168, 82, 54, 0.55)' },
      { x: 420, y: 140, w: 220, h: 320, color: 'rgba(195, 142, 60, 0.55)' },
      { x: 720, y: 140, w: 220, h: 320, color: 'rgba(62, 105, 120, 0.5)' }
    ];

    panels.forEach(p => {
      // Arched mural panel background
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x + p.w / 2, p.y + 60, p.w * 0.45, Math.PI, 0);
      ctx.lineTo(p.x + p.w * 0.95, p.y + p.h);
      ctx.lineTo(p.x + p.w * 0.05, p.y + p.h);
      ctx.closePath();
      ctx.fill();

      // Graceful Bodhisattva figure outline (flowing Indian classical style)
      ctx.strokeStyle = '#2b1b10';
      ctx.lineWidth = 3;
      // Head & ornate crown (Mukuta)
      const cx = p.x + p.w / 2;
      ctx.beginPath();
      ctx.arc(cx, p.y + 70, 26, 0, Math.PI * 2);
      ctx.stroke();

      // Crown
      ctx.beginPath();
      ctx.moveTo(cx - 20, p.y + 50);
      ctx.lineTo(cx, p.y + 15);
      ctx.lineTo(cx + 20, p.y + 50);
      ctx.stroke();

      // Blue lotus flower (Utpala) held in hand
      ctx.fillStyle = '#4f7d98';
      ctx.beginPath();
      ctx.arc(cx + 42, p.y + 130, 16, 0, Math.PI * 2);
      ctx.fill();

      // Slender torso with pearl necklaces
      ctx.beginPath();
      ctx.moveTo(cx - 18, p.y + 96);
      ctx.bezierCurveTo(cx - 30, p.y + 150, cx - 12, p.y + 210, cx - 15, p.y + 260);
      ctx.lineTo(cx + 15, p.y + 260);
      ctx.bezierCurveTo(cx + 12, p.y + 210, cx + 30, p.y + 150, cx + 18, p.y + 96);
      ctx.stroke();
    });

    // Faded dampness, peeling plaster & antiquity cracks
    ctx.strokeStyle = 'rgba(40, 28, 18, 0.6)';
    ctx.lineWidth = 1.5;
    for (let c = 0; c < 18; c++) {
      let px = Math.random() * size;
      let py = Math.random() * size;
      ctx.beginPath();
      ctx.moveTo(px, py);
      for (let s = 0; s < 4; s++) {
        px += (Math.random() - 0.5) * 90;
        py += (Math.random() - 0.5) * 90;
        ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    this.cache.set(key, texture);
    return texture;
  }
  /**
   * Weathered grey Himalayan granite ashlar masonry (Kedarnath Temple)
   */
  getKedarnathGreyGraniteTexture(size = 1024) {
    const key = `kedarnath_granite_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Ancient mountain grey stone base
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, '#5e6165');
    grad.addColorStop(0.5, '#4f5256');
    grad.addColorStop(1, '#3d4043');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Granite crystals & mineral flecks
    for (let i = 0; i < 14000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random();
      if (r < 0.4) ctx.fillStyle = 'rgba(210, 215, 220, 0.35)'; // Quartz
      else if (r < 0.75) ctx.fillStyle = 'rgba(25, 28, 30, 0.45)'; // Biotite
      else ctx.fillStyle = 'rgba(120, 115, 105, 0.3)';
      ctx.fillRect(x, y, 2, 2);
    }

    // Heavy interlocking ashlar stone masonry block lines
    const rowH = 96;
    let rowIndex = 0;
    for (let y = 0; y <= size; y += rowH) {
      // Horizontal mortar line
      ctx.strokeStyle = '#25272a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();

      // Vertical block joints staggered
      const blockW = 160;
      const offset = (rowIndex % 2) * 80;
      for (let x = offset; x <= size; x += blockW) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + rowH);
        ctx.stroke();
      }
      rowIndex++;
    }

    // Alpine frost weathering & lichen
    for (let l = 0; l < 25; l++) {
      const lx = Math.random() * size;
      const ly = Math.random() * size;
      const lr = 8 + Math.random() * 24;
      const lichenGrad = ctx.createRadialGradient(lx, ly, 1, lx, ly, lr);
      lichenGrad.addColorStop(0, 'rgba(140, 155, 130, 0.35)');
      lichenGrad.addColorStop(0.7, 'rgba(95, 110, 85, 0.2)');
      lichenGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lichenGrad;
      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Vibrant painted Himalayan temple facade colors: Red, Saffron, Yellow, Blue, White (Badrinath)
   */
  getBadrinathPaintedFacadeTexture(size = 1024) {
    const key = `badrinath_facade_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Vibrant Red painted stone base
    ctx.fillStyle = '#b82a1d';
    ctx.fillRect(0, 0, size, size);

    // Ornate traditional painted panels in Saffron, Bright Yellow, Royal Blue & White
    const cols = 4;
    const rows = 4;
    const cellW = size / cols;
    const cellH = size / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellW;
        const y = r * cellH;

        // Outer white border band
        ctx.fillStyle = '#f8f5ee';
        ctx.fillRect(x + 8, y + 8, cellW - 16, cellH - 16);

        // Vibrant Yellow & Saffron inner arch
        ctx.fillStyle = (r + c) % 2 === 0 ? '#f5a623' : '#e03a28';
        ctx.fillRect(x + 16, y + 16, cellW - 32, cellH - 32);

        // Cobalt Blue cusped arch centerpiece
        ctx.fillStyle = '#1c497d';
        ctx.beginPath();
        ctx.arc(x + cellW / 2, y + 60, 24, Math.PI, 0);
        ctx.lineTo(x + cellW / 2 + 24, y + cellH - 24);
        ctx.lineTo(x + cellW / 2 - 24, y + cellH - 24);
        ctx.closePath();
        ctx.fill();

        // White floral lotus emblem inside arch
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x + cellW / 2, y + 65, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Subtle mountain weathering & paint micro-chips
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = 'rgba(70, 50, 40, 0.2)';
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Aged Malwa sandstone with carved temple niches & moldings (Mahakaleshwar Temple, Ujjain)
   */
  getMahakaleshwarSandstoneTexture(size = 1024) {
    const key = `mahakaleshwar_sandstone_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Warm ochre-sandstone base
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, '#c79d72');
    grad.addColorStop(0.5, '#b4885c');
    grad.addColorStop(1, '#9b7147');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Grain and sacred vermilion / ash patina
    for (let i = 0; i < 9000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random();
      if (r < 0.3) ctx.fillStyle = 'rgba(235, 210, 185, 0.3)';
      else if (r < 0.7) ctx.fillStyle = 'rgba(95, 65, 40, 0.25)';
      else ctx.fillStyle = 'rgba(180, 70, 45, 0.15)'; // Subtle vermilion trace
      ctx.fillRect(x, y, 1.8, 1.8);
    }

    // Carved horizontal Nagara cornices & temple relief bands
    const bandH = 128;
    for (let y = 0; y < size; y += bandH) {
      ctx.strokeStyle = '#5a3d24';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();

      ctx.strokeStyle = '#e2c5a3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y + 4);
      ctx.lineTo(size, y + 4);
      ctx.stroke();

      // Carved bell & floral motifs
      for (let x = 16; x < size; x += 64) {
        ctx.fillStyle = 'rgba(65, 42, 22, 0.35)';
        ctx.beginPath();
        ctx.arc(x + 20, y + 45, 14, 0, Math.PI);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    this.cache.set(key, texture);
    return texture;
  }

  /**
   * Gleaming Gold Leaf metal texture with plate seams and repoussé relief (Kashi Vishwanath Golden Spire)
   */
  getKashiGoldenDomeTexture(size = 1024) {
    const key = `kashi_gold_${size}`;
    if (this.cache.has(key)) return this.cache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Rich 24K Varanasi Golden Sheen gradient
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#ffd966');
    grad.addColorStop(0.35, '#f1c232');
    grad.addColorStop(0.7, '#d4a017');
    grad.addColorStop(1, '#b8860b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Hand-hammered gold plate repoussé texture
    for (let i = 0; i < 7000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 245, 195, 0.4)' : 'rgba(150, 105, 15, 0.3)';
      ctx.fillRect(x, y, 2.5, 2.5);
    }

    // Gold plate tile grid seams (Gilded copper/brass repoussé plates)
    ctx.strokeStyle = '#996515';
    ctx.lineWidth = 3;
    const step = 64;
    for (let x = 0; x <= size; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    for (let y = 0; y <= size; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }

    // Sacred Trishul (Trident) & floral repoussé emblems in centers
    ctx.strokeStyle = 'rgba(255, 240, 170, 0.6)';
    ctx.lineWidth = 2;
    for (let y = step / 2; y < size; y += step) {
      for (let x = step / 2; x < size; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    this.cache.set(key, texture);
    return texture;
  }
}

export const textureGenerator = new TextureGenerator();
