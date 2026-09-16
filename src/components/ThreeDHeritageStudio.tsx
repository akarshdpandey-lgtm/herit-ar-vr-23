import React, { useEffect, useRef, useState } from 'react';
import { Camera, Maximize2, RotateCcw, ScanLine, Sparkles } from 'lucide-react';
import { SceneManager } from '../threeDStudio/engine/sceneManager.js';
import { projectStore } from '../threeDStudio/state/projectStore.js';

interface ThreeDHeritageStudioProps {
  currentMonument: string;
  onSelectMonument?: (monumentName: string) => void;
}

const PROJECT_ALIASES: Record<string, string[]> = {
  'taj-mahal-01': ['taj mahal', 'taj'],
  'kashi-vishwanath-04': ['kashi', 'vishwanath', 'varanasi'],
  'hawa-mahal-03': ['hawa mahal', 'jaipur'],
  'red-fort-02': ['red fort', 'lal qila', 'delhi'],
  'ajanta-ellora-03': ['ajanta', 'ellora'],
  'kedarnath-01': ['kedarnath'],
  'badrinath-02': ['badrinath'],
  'mahakaleshwar-03': ['mahakaleshwar', 'ujjain'],
  'khajuraho-01': ['khajuraho'],
  'hampi-02': ['hampi'],
  'golden-temple-05': ['golden temple', 'harmandir', 'amritsar'],
  'konark-sun-temple-06': ['konark'],
  'madurai-meenakshi-07': ['meenakshi', 'madurai'],
  'statue-of-unity-08': ['statue of unity', 'kevadiya'],
  'charminar-09': ['charminar', 'hyderabad'],
  'victoria-memorial-10': ['victoria memorial', 'kolkata'],
  'qutub-minar-11': ['qutub', 'qutb'],
  'jagannath-puri-12': ['jagannath', 'puri'],
  'brihadeeswarar-13': ['brihadeeswarar', 'thanjavur'],
  'lotus-temple-14': ['lotus temple'],
  'manali-15': ['manali'],
  'goa-16': ['goa'],
  'amber-fort-17': ['amber fort', 'amer fort'],
  'hawa-mahal-east-18': ['hawa mahal'],
};

function findProjectId(monument: string): string | undefined {
  const query = monument.toLowerCase();
  const match = Object.entries(PROJECT_ALIASES).find(([, aliases]) =>
    aliases.some((alias) => query.includes(alias) || alias.includes(query))
  );
  return match?.[0];
}

export const ThreeDHeritageStudio: React.FC<ThreeDHeritageStudioProps> = ({
  currentMonument,
  onSelectMonument,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const [storeVersion, setStoreVersion] = useState(0);

  useEffect(() => {
    if (!containerRef.current || sceneManagerRef.current) return;
    const manager = new SceneManager(containerRef.current);
    sceneManagerRef.current = manager;
    const unsubscribe = projectStore.subscribe(() => setStoreVersion((version) => version + 1));

    return () => {
      unsubscribe();
      manager.dispose();
      sceneManagerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const projectId = findProjectId(currentMonument);
    if (projectId && projectStore.projects.some((project: { id: string }) => project.id === projectId)) {
      if (projectStore.activeProjectId !== projectId) projectStore.selectProject(projectId);
    }
  }, [currentMonument]);

  const activeProject = projectStore.getActiveProject();
  const currentPhase = projectStore.activePhase;
  const viewMode = projectStore.viewMode;

  const selectProject = (id: string) => {
    projectStore.selectProject(id);
    const project = projectStore.getActiveProject();
    onSelectMonument?.(project.name.split('(')[0].trim());
  };

  const resetCamera = () => sceneManagerRef.current?.setCameraPreset('hero');

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-900">Interactive Heritage 3D Studio</h3>
          </div>
          <p className="mt-1 text-xs text-stone-600">
            Explore the merged 3D architectural models with orbit controls, progressive detail, and heritage environments.
          </p>
        </div>
        <select
          value={projectStore.activeProjectId}
          onChange={(event) => selectProject(event.target.value)}
          className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-800 outline-none"
          aria-label="Select 3D heritage model"
        >
          {projectStore.projects.map((project: { id: string; name: string }) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>

      <div className="relative overflow-hidden rounded-3xl border-2 border-stone-900 bg-stone-950 shadow-xl">
        <div ref={containerRef} className="h-[420px] w-full sm:h-[560px]" />
        <div className="pointer-events-none absolute left-3 top-3 rounded-xl border border-white/20 bg-stone-950/75 px-3 py-2 text-white backdrop-blur-md">
          <p className="text-[11px] font-bold text-cyan-300">{activeProject.name}</p>
          <p className="text-[10px] text-stone-300">Phase {currentPhase} · {viewMode}</p>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 rounded-2xl border border-white/15 bg-stone-950/80 p-2 backdrop-blur-md">
          {[1, 2, 3, 4].map((phase) => (
            <button
              key={phase}
              onClick={() => projectStore.setPhase(phase)}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                currentPhase === phase ? 'bg-amber-400 text-stone-950' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Phase {phase}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-white/20" />
          {(['realistic', 'clay', 'wireframe'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => projectStore.setViewMode(mode)}
              className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold capitalize transition-colors ${
                viewMode === mode ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {mode}
            </button>
          ))}
          <button
            onClick={() => projectStore.toggleSymmetry()}
            className={`ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${projectStore.showSymmetry ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <ScanLine className="h-3 w-3" /> Symmetry
          </button>
          <button onClick={resetCamera} className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-white/20">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
          <button onClick={() => sceneManagerRef.current?.captureSnapshot()} className="inline-flex items-center gap-1 rounded-lg bg-amber-400 px-2.5 py-1.5 text-[11px] font-bold text-stone-950 hover:bg-amber-300">
            <Camera className="h-3 w-3" /> Snapshot
          </button>
          <button onClick={() => containerRef.current?.requestFullscreen()} className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-white/20">
            <Maximize2 className="h-3 w-3" /> Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
};