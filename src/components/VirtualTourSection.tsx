import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  Maximize,
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  Activity,
  HardDrive,
  Cpu,
  Move,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { VirtualTourScene, VirtualTourHotspot } from '../types';
import { VIRTUAL_TOUR_SCENES } from '../data/virtualToursData';
import { getAuthenticMonumentPhoto } from '../utils/monumentImages';
import { ThreeDHeritageStudio } from './ThreeDHeritageStudio';

interface VirtualTourSectionProps {
  currentMonument?: string;
  onSelectMonument?: (monumentName: string) => void;
}

const TOUR_SCENE_ALIASES: Record<string, string[]> = {
  'Taj Mahal': ['taj mahal', 'taj'],
  'Golden Temple': ['golden temple', 'harmandir', 'amritsar'],
  'Konark Sun Temple': ['konark'],
  'Kashi Vishwanath': ['kashi', 'vishwanath', 'varanasi'],
  'Madurai Meenakshi Temple': ['meenakshi', 'madurai'],
  'Statue of Unity': ['statue of unity', 'kevadiya'],
  Charminar: ['charminar', 'hyderabad'],
  'Victoria Memorial': ['victoria memorial', 'kolkata'],
  'Qutub Minar': ['qutub', 'qutb'],
  'Kailash Temple': ['ellora', 'kailash temple'],
  'Jagannath Temple': ['jagannath', 'puri'],
  Brihadeeswarar: ['brihadeeswarar', 'thanjavur'],
  'Lotus Temple': ['lotus temple'],
  Manali: ['manali'],
  Goa: ['goa'],
  'Hawa Mahal': ['hawa mahal'],
  'Amber Fort': ['amber fort', 'amer fort'],
};

function matchesTourScene(scene: VirtualTourScene, query: string): boolean {
  const normalizedQuery = query.toLowerCase().trim();
  const sceneText = `${scene.monumentName} ${scene.location} ${scene.id}`.toLowerCase();
  if (sceneText.includes(normalizedQuery) || normalizedQuery.includes(scene.monumentName.toLowerCase())) {
    return true;
  }

  return Object.values(TOUR_SCENE_ALIASES).some((aliases) => {
    const queryMatches = aliases.some((alias) => normalizedQuery.includes(alias));
    const sceneMatches = aliases.some((alias) => sceneText.includes(alias));
    return queryMatches && sceneMatches;
  });
}

export const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({
  currentMonument = 'Taj Mahal',
  onSelectMonument,
}) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Sync activeScene with currentMonument prop when it changes
  useEffect(() => {
    if (!currentMonument) return;
    const query = currentMonument.toLowerCase().trim();
    const foundIdx = VIRTUAL_TOUR_SCENES.findIndex((scene) => matchesTourScene(scene, query));

    if (foundIdx !== -1 && foundIdx !== activeSceneIndex) {
      setActiveSceneIndex(foundIdx);
      setActiveHotspot(VIRTUAL_TOUR_SCENES[foundIdx].hotspots[0] || null);
    }
  }, [currentMonument]);

  const activeScene = VIRTUAL_TOUR_SCENES[activeSceneIndex] || VIRTUAL_TOUR_SCENES[0];

  const [activeHotspot, setActiveHotspot] = useState<VirtualTourHotspot | null>(
    activeScene.hotspots[0] || null
  );

  const [panX, setPanX] = useState(50);
  const [panY, setPanY] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showWireframeScan, setShowWireframeScan] = useState(false);

  // Mouse pan controls for 360 viewer
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPanX((prev) => Math.max(10, Math.min(90, prev - dx * 0.05)));
    setPanY((prev) => Math.max(20, Math.min(80, prev - dy * 0.05)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="space-y-6">
      <ThreeDHeritageStudio
        currentMonument={currentMonument}
        onSelectMonument={onSelectMonument}
      />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-stone-950 font-bold">
              <Eye className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              360° VR Virtual Tours & Digital Twin
            </h2>
            <span className="rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-mono px-2 py-0.5 font-bold">
              WebVR Photogrammetry
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-600">
            Immersive 360° panoramic exploration with interactive architectural hotspots and LiDAR digital twin telemetry.
          </p>
        </div>

        {/* Scene switcher */}
        <div className="flex flex-wrap items-center gap-1.5 max-h-32 overflow-y-auto sm:max-h-none">
          {VIRTUAL_TOUR_SCENES.map((scene, idx) => {
            const shortName = scene.monumentName.split(':')[0].split('&')[0].trim();
            const isActive = activeSceneIndex === idx;
            return (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setActiveHotspot(scene.hotspots[0] || null);
                  if (onSelectMonument) onSelectMonument(shortName);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-amber-400 ring-2 ring-amber-400 shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 360 Panoramic Canvas Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 360 Stage (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full aspect-16/10 rounded-3xl overflow-hidden bg-stone-950 border-2 border-stone-900 shadow-xl cursor-grab active:cursor-grabbing select-none group"
          >
            {/* 360 Panorama Image */}
            <div
              className="absolute inset-0 transition-transform duration-100 ease-out"
              style={{
                backgroundImage: `url("${getAuthenticMonumentPhoto(activeScene.monumentName, undefined, activeScene.panoramaImageUrl)}")`,
                backgroundPosition: `${panX}% ${panY}%`,
                backgroundSize: `${zoomLevel * 140}%`,
                filter: showWireframeScan ? 'contrast(160%) hue-rotate(90deg)' : 'none',
              }}
            />

            {/* Wireframe LiDAR scan mesh effect */}
            {showWireframeScan && (
              <div
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(0,255,200,0.6) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />
            )}

            {/* Overlay HUD */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              {/* Top Bar HUD */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-stone-950/80 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-white">
                  <Move className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-[11px] font-mono">DRAG TO LOOK 360°</span>
                </div>

                <div className="flex items-center gap-2 bg-stone-950/80 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-white">
                  <span className="text-[11px] font-mono text-amber-400">
                    PAN: {Math.round(panX)}° • ZOOM: {zoomLevel.toFixed(1)}x
                  </span>
                </div>
              </div>

              {/* Bottom HUD */}
              <div className="flex items-end justify-between">
                <div className="bg-stone-950/85 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2 text-white">
                  <p className="text-xs font-bold text-amber-400">
                    {activeScene.monumentName}
                  </p>
                  <p className="text-[11px] text-stone-400">{activeScene.location}</p>
                </div>
                <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl px-3 py-1 text-emerald-300 text-[10px] font-mono">
                  LIDAR POINT CLOUD ACCREDITED
                </div>
              </div>
            </div>

            {/* Interactive Hotspot Pins */}
            {activeScene.hotspots.map((hs) => {
              const isSelected = activeHotspot?.id === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(hs);
                  }}
                  style={{
                    top: `${hs.yPercent}%`,
                    left: `${hs.xPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'scale-125' : 'hover:scale-115'
                  }`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? 'bg-amber-400' : 'bg-cyan-400'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center text-xs font-bold shadow-lg border-2 ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-white'
                          : 'bg-stone-900 text-cyan-300 border-cyan-400'
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                  </span>

                  {/* Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 -top-7 rounded bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity border border-white/20">
                    {hs.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Viewer Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 cursor-pointer"
              >
                Zoom In (+)
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 cursor-pointer"
              >
                Zoom Out (-)
              </button>
              <button
                onClick={() => {
                  setPanX(50);
                  setPanY(50);
                  setZoomLevel(1);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-stone-300 text-stone-700 hover:bg-stone-50 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset View</span>
              </button>
              <button
                onClick={() => setShowWireframeScan(!showWireframeScan)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  showWireframeScan
                    ? 'bg-cyan-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Layers className="h-3 w-3" />
                <span>LiDAR Cloud Mode</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right: Hotspot Insight & Digital Twin Specs (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Hotspot Inspector Card */}
          {activeHotspot ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-700 font-mono font-semibold">
                <span className="uppercase">{activeHotspot.category} ARCHITECTURE</span>
                <span>{activeHotspot.historicalEra}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {activeHotspot.title}
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                {activeHotspot.description}
              </p>

              <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 text-xs text-stone-600 space-y-1">
                <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">
                  Spatial Virtual Coordinates
                </span>
                <p className="font-mono text-stone-800 text-[11px]">
                  X: {activeHotspot.xPercent}% • Y: {activeHotspot.yPercent}% • Pitch: 14.2°
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 text-center text-stone-500">
              Select any pulsing hotspot on the panorama to inspect details.
            </div>
          )}

          {/* Digital Twin & LiDAR Telemetry Panel */}
          <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
              <Cpu className="h-4 w-4 text-amber-700" />
              <h4 className="font-serif text-sm font-bold text-stone-900">
                Digital Twin Heritage Telemetry
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50">
                <span className="text-stone-500">LiDAR Point Cloud:</span>
                <span className="font-mono font-bold text-stone-900">
                  {activeScene.photogrammetryStats.pointsCount}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50">
                <span className="text-stone-500">Spatial Mesh Resolution:</span>
                <span className="font-mono font-bold text-stone-900">
                  {activeScene.photogrammetryStats.meshResolution}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50">
                <span className="text-stone-500">Preservation Stability Index:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {activeScene.photogrammetryStats.preservationScore}% Stable
                </span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900">
                <span className="font-bold">Last Certified Scan:</span> {activeScene.photogrammetryStats.lastLidarScan}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
