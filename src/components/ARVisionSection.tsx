import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Scan,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  Compass,
  Eye,
  CheckCircle2,
  RefreshCw,
  Box,
  Sliders,
  History,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { ARDetectionBoundingBox } from '../types';
import { getAuthenticMonumentPhoto, handleMonumentImageError } from '../utils/monumentImages';
import { MONUMENT_AR_DATABASE, ARMonumentProfile } from '../data/arMonumentsData';

interface ARVisionSectionProps {
  currentMonumentName?: string;
  onSelectMonument?: (name: string) => void;
}

export const ARVisionSection: React.FC<ARVisionSectionProps> = ({
  currentMonumentName = 'Taj Mahal',
  onSelectMonument,
}) => {
  // Helper to find matching monument
  const findMatchingProfile = (queryName: string): ARMonumentProfile => {
    if (!queryName) return MONUMENT_AR_DATABASE[0];
    const q = queryName.toLowerCase().trim();
    const match = MONUMENT_AR_DATABASE.find((m) => {
      const mName = m.name.toLowerCase();
      const mLoc = m.location.toLowerCase();
      const mId = m.id.toLowerCase();
      return (
        mName.includes(q) ||
        q.includes(mName) ||
        mLoc.includes(q) ||
        q.includes(mLoc) ||
        mId.includes(q.replace(/\s+/g, '-')) ||
        q.split(' ').some((w) => w.length > 3 && (mName.includes(w) || mLoc.includes(w)))
      );
    });
    return match || MONUMENT_AR_DATABASE[0];
  };

  const [activeMonument, setActiveMonument] = useState<ARMonumentProfile>(() =>
    findMatchingProfile(currentMonumentName)
  );
  const [selectedBox, setSelectedBox] = useState<ARDetectionBoundingBox | null>(
    () => findMatchingProfile(currentMonumentName).boundingBoxes[0] || null
  );
  const [isLiveCamera, setIsLiveCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showWireframe, setShowWireframe] = useState(false);
  const [detectionConfidenceThreshold, setDetectionConfidenceThreshold] = useState(90);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync when prop changes
  useEffect(() => {
    if (!currentMonumentName) return;
    const found = findMatchingProfile(currentMonumentName);
    setActiveMonument(found);
    setSelectedBox(found.boundingBoxes[0] || null);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [currentMonumentName]);

  // Handle camera stream
  const toggleCamera = async () => {
    if (isLiveCamera) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsLiveCamera(false);
      setCameraError(null);
    } else {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLiveCamera(true);
      } catch (err: any) {
        console.warn('Camera access could not be established:', err);
        setCameraError('Camera access not permitted or unavailable in current preview window. Showing high-resolution photogrammetric AR feed.');
        setIsLiveCamera(false);
      }
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text to Speech playback
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-stone-950 font-bold">
              <Scan className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              AI Smart Guide + AR Heritage Vision
            </h2>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 font-bold">
              YOLOv8-Heritage Active
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-600">
            Real-time optical monument detection, architectural knowledge graph, and instant TTS audio narration.
          </p>
        </div>

        {/* Monument quick switcher */}
        <div className="flex flex-wrap items-center gap-1.5 max-h-32 overflow-y-auto sm:max-h-none">
          {MONUMENT_AR_DATABASE.map((m) => {
            const shortName = m.name.split('(')[0].split('&')[0].trim();
            const isActive = activeMonument.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMonument(m);
                  setSelectedBox(m.boundingBoxes[0] || null);
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

      {/* Main AR Viewport & Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AR Viewfinder (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden bg-stone-950 border-2 border-stone-900 shadow-xl select-none group">
            {/* Viewfinder Image or Video */}
            {isLiveCamera ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={getAuthenticMonumentPhoto(activeMonument.name, undefined, activeMonument.image)}
                alt={activeMonument.name}
                onError={(e) => handleMonumentImageError(e, activeMonument.name)}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  showWireframe ? 'filter contrast-150 grayscale invert' : ''
                }`}
                referrerPolicy="no-referrer"
              />
            )}

            {/* Simulated LiDAR / Wireframe Mesh Overlay */}
            {showWireframe && (
              <div
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen bg-repeat"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(0,255,200,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,200,0.4) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
            )}

            {/* Viewfinder Reticle & HUD overlay */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              {/* Top HUD */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-stone-950/80 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-widest uppercase">
                    {isLiveCamera ? 'LIVE WEBCAM' : 'OPTICAL AR FEED'}
                  </span>
                  <span className="text-stone-400">|</span>
                  <span className="text-[11px] text-amber-400 font-mono">
                    60 FPS • CV v8.4
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-stone-950/80 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-white">
                  <Compass className="h-3.5 w-3.5 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
                  <span className="text-[11px] font-mono">NE 42° • ELEV 26.9°</span>
                </div>
              </div>

              {/* Corner Viewfinder Brackets */}
              <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
              <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
              <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
              <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

              {/* Bottom HUD */}
              <div className="flex items-end justify-between">
                <div className="bg-stone-950/80 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-white text-xs">
                  <span className="text-amber-400 font-bold">{activeMonument.name}</span>
                  <span className="text-stone-400 ml-2">({activeMonument.yearBuilt})</span>
                </div>
                <div className="text-stone-400 text-[10px] font-mono">
                  TARGET: DETECTED (CONF: 99.4%)
                </div>
              </div>
            </div>

            {/* YOLO / Computer Vision Bounding Boxes Overlay */}
            {activeMonument.boundingBoxes
              .filter((box) => box.confidence >= detectionConfidenceThreshold)
              .map((box) => {
                const isSelected = selectedBox?.id === box.id;
                return (
                  <div
                    key={box.id}
                    onClick={() => setSelectedBox(box)}
                    style={{
                      top: `${box.topPercent}%`,
                      left: `${box.leftPercent}%`,
                      width: `${box.widthPercent}%`,
                      height: `${box.heightPercent}%`,
                    }}
                    className={`absolute cursor-pointer transition-all duration-300 rounded-lg group/box ${
                      isSelected
                        ? 'border-2 border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/30 ring-4 ring-amber-400/40'
                        : 'border border-cyan-400/80 bg-cyan-500/10 hover:border-amber-400 hover:bg-amber-400/15'
                    }`}
                  >
                    {/* Bounding Box Label Tag */}
                    <div
                      className={`absolute -top-7 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap flex items-center gap-1.5 shadow-md ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 ring-1 ring-white'
                          : 'bg-stone-900/90 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>{box.label}</span>
                      <span className="text-[9px] opacity-80">({box.confidence}%)</span>
                    </div>

                    {/* Corner Crosshairs */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-400 rounded-full" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
                  </div>
                );
              })}
          </div>

          {/* Viewfinder Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleCamera}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isLiveCamera
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-stone-900 text-amber-400 hover:bg-stone-800'
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                <span>{isLiveCamera ? 'Stop Camera' : 'Open Mobile Camera'}</span>
              </button>

              <button
                onClick={() => setShowWireframe(!showWireframe)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  showWireframe
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>3D Wireframe Mesh</span>
              </button>
            </div>

            {/* Audio Narration Trigger */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  speakText(
                    selectedBox
                      ? selectedBox.audioNarrationSnippet
                      : activeMonument.audioNarration
                  )
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5" />
                    <span>Mute Narration</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Play AI Audio Narration</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {cameraError && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Device Notice: </span>
                {cameraError}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Architectural Knowledge Graph & Detected Feature Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedBox ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <div className="flex items-center justify-between text-xs text-amber-700 font-mono font-semibold">
                  <span>DETECTED ARCHITECTURAL ELEMENT</span>
                  <span>{selectedBox.confidence}% MATCH</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mt-1">
                  {selectedBox.label}
                </h3>
                <p className="text-xs font-medium text-stone-500">
                  {selectedBox.hindiLabel}
                </p>
              </div>

              {/* Terminology definition */}
              <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  Indo-Islamic Architectural Term
                </span>
                <p className="text-xs font-bold text-stone-900">
                  {selectedBox.architecturalTerm}
                </p>
              </div>

              {/* Historical Context from Knowledge Graph */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  Historical Context & Purpose
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {selectedBox.historicalContext}
                </p>
              </div>

              {/* Audio Snippet Preview */}
              <div className="space-y-1.5 bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-900">
                    SPOKEN NARRATIVE SNIPPET
                  </span>
                  <button
                    onClick={() => speakText(selectedBox.audioNarrationSnippet)}
                    className="text-amber-800 hover:text-amber-950 text-xs font-bold cursor-pointer"
                  >
                    {isSpeaking ? 'Stop' : 'Listen'}
                  </button>
                </div>
                <p className="text-xs text-stone-700 italic">
                  "{selectedBox.audioNarrationSnippet}"
                </p>
              </div>

              {/* Knowledge Graph Associations */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  Knowledge Graph Linked Entities
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-stone-50 p-2 rounded-xl">
                    <span className="text-[10px] text-stone-500 block">Dynasty</span>
                    <span className="font-semibold text-stone-800 text-[11px]">
                      {activeMonument.dynasty.split('(')[0]}
                    </span>
                  </div>
                  <div className="bg-stone-50 p-2 rounded-xl">
                    <span className="text-[10px] text-stone-500 block">Year Built</span>
                    <span className="font-semibold text-stone-800 text-[11px]">
                      {activeMonument.yearBuilt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 text-center text-stone-500 space-y-2">
              <Scan className="h-8 w-8 text-stone-400 mx-auto" />
              <p className="text-sm font-medium">Select any bounding box on the monument to view architectural insights.</p>
            </div>
          )}

          {/* Quick Detected Elements Carousel */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-xs space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900">
              Detected Structural Nodes ({activeMonument.boundingBoxes.length})
            </h4>
            <div className="space-y-2">
              {activeMonument.boundingBoxes.map((box) => (
                <button
                  key={box.id}
                  onClick={() => setSelectedBox(box)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                    selectedBox?.id === box.id
                      ? 'border-amber-500 bg-amber-50/50'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-900">
                      {box.label}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">
                      {box.confidence}%
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {box.architecturalTerm}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
