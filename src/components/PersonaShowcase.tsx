import React, { useState, useEffect } from 'react';
import {
  PersonaType,
  PersonaShowcaseData,
  PersonaTreasureClue,
} from '../types';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Compass,
  Trophy,
  CheckCircle2,
  BookOpen,
  Camera,
  Sun,
  Moon,
  Globe,
  Accessibility,
  Clock,
  ExternalLink,
  ChevronRight,
  Info,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface PersonaShowcaseProps {
  destinationName: string;
  activePersona: PersonaType;
}

export function PersonaShowcase({ destinationName, activePersona }: PersonaShowcaseProps) {
  const [data, setData] = useState<PersonaShowcaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeStoryChapter, setActiveStoryChapter] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [treasureClues, setTreasureClues] = useState<PersonaTreasureClue[]>([]);
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [activeClueScanning, setActiveClueScanning] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'main' | 'interactive'>('main');

  // Fetch showcase data when destination or persona changes
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    fetch(`/api/guide/showcase?destination=${encodeURIComponent(destinationName)}&persona=${activePersona}`)
      .then((res) => res.json())
      .then((res) => {
        if (!isCancelled && res.success && res.data) {
          setData(res.data);
          if (res.data.childFeatures?.treasureHunt) {
            setTreasureClues(res.data.childFeatures.treasureHunt);
          }
        }
      })
      .catch((err) => console.warn('Failed to load showcase data:', err))
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    };
  }, [destinationName, activePersona]);

  // Audio Speech synthesis
  const speakText = (text: string, lang: string = 'en-US') => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.pitch = activePersona === 'child' ? 1.2 : 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // AR Treasure hunt scan simulation
  const handleScanClue = (clueId: string) => {
    setActiveClueScanning(clueId);
    setScannerActive(true);

    setTimeout(() => {
      setTreasureClues((prev) =>
        prev.map((c) => (c.id === clueId ? { ...c, found: true } : c))
      );
      setScannerActive(false);
      setActiveClueScanning(null);
    }, 1600);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-3">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
        <div className="text-sm font-medium text-stone-600">
          Personalizing experience for {activePersona}...
        </div>
      </div>
    );
  }

  if (!data) return null;

  const totalPoints = treasureClues
    .filter((c) => c.found)
    .reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="space-y-4">
      {/* Persona Hero Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{data.badgeLabel}</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900 mt-1.5">{data.title}</h2>
            <p className="text-xs text-stone-600">{data.tagline}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium">
              Site: {destinationName.split(',')[0]}
            </span>
          </div>
        </div>

        {/* Highlights Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {data.highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-medium">{h}</span>
            </div>
          ))}
        </div>

        {/* 1. CHILD PERSONA VIEW */}
        {activePersona === 'child' && data.childFeatures && (
          <div className="space-y-6 pt-2">
            {/* Animated Stories Book */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      Animated Story: The Whispering Stones
                    </h3>
                    <p className="text-xs text-stone-600">
                      Storyteller: {data.childFeatures.animatedStories[activeStoryChapter]?.character}
                    </p>
                  </div>
                </div>

                {/* Voice Narration Button */}
                <button
                  onClick={() =>
                    speakText(
                      data.childFeatures?.animatedStories[activeStoryChapter]?.text || '',
                      'en-US'
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeaking ? 'Stop Narration' : 'Play Narration 🔊'}</span>
                </button>
              </div>

              {/* Story Chapters Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {data.childFeatures.animatedStories.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveStoryChapter(idx);
                      if (isSpeaking) window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                      activeStoryChapter === idx
                        ? 'bg-amber-700 text-white shadow-xs'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-100'
                    }`}
                  >
                    {ch.title.split(':')[0]}
                  </button>
                ))}
              </div>

              {/* Story Content & Illustration Concept */}
              <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-xs space-y-3">
                <div className="text-sm font-serif font-bold text-amber-900">
                  {data.childFeatures.animatedStories[activeStoryChapter].title}
                </div>
                <p className="text-sm text-stone-800 leading-relaxed font-sans">
                  "{data.childFeatures.animatedStories[activeStoryChapter].text}"
                </p>
                <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                  <span className="italic">
                    🎨 Scene: {data.childFeatures.animatedStories[activeStoryChapter].visualPrompt}
                  </span>
                  <span className="font-semibold text-amber-700">
                    ⏱️ {data.childFeatures.animatedStories[activeStoryChapter].audioDuration}
                  </span>
                </div>
              </div>
            </div>

            {/* AR Treasure Hunt Game */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-600 text-white">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      Interactive AR Treasure Hunt Game
                    </h3>
                    <p className="text-xs text-stone-600">
                      Scan 3 secret clues around {destinationName.split(',')[0]} to unlock the Master Explorer Badge!
                    </p>
                  </div>
                </div>

                {/* Score badge */}
                <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-1 rounded-xl text-xs">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-purple-900">Explorer Score: {totalPoints} / 450 XP</span>
                </div>
              </div>

              {/* AR Viewfinder Simulation Modal/Box */}
              {scannerActive && (
                <div className="relative rounded-2xl bg-stone-950 text-white p-6 overflow-hidden border-2 border-purple-500 shadow-xl text-center space-y-3">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 border-2 border-dashed border-purple-400 rounded-full flex items-center justify-center animate-spin">
                      <Compass className="w-8 h-8 text-purple-300" />
                    </div>
                    <div className="text-sm font-bold text-purple-300 mt-2">
                      AR Lens Calibrating & Scanning...
                    </div>
                    <div className="text-xs text-stone-400">
                      Analyzing architectural geometry & historical GPS beacon
                    </div>
                  </div>
                </div>
              )}

              {/* Clues List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {treasureClues.map((clue, idx) => (
                  <div
                    key={clue.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      clue.found
                        ? 'bg-emerald-50/80 border-emerald-300'
                        : 'bg-stone-50 border-stone-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-purple-900">Clue #{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200">
                        +{clue.points} XP
                      </span>
                    </div>
                    <div className="text-sm font-bold text-stone-900 mb-1">{clue.title}</div>
                    <p className="text-xs text-stone-600 mb-2 italic">"{clue.riddle}"</p>
                    <div className="text-[11px] text-stone-500 mb-3">
                      📍 <strong>Hint:</strong> {clue.locationHint}
                    </div>

                    {clue.found ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white p-2 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Artifact Found! ({clue.solution})</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleScanClue(clue.id)}
                        disabled={scannerActive}
                        className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Scan with AR Lens</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Badge unlocked celebration */}
              {totalPoints === 450 && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-amber-900">
                      🎉 Congratulations! You unlocked the Master Heritage Explorer Badge!
                    </div>
                    <div className="text-xs text-amber-700">
                      You discovered all hidden secrets of {destinationName.split(',')[0]}!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simple Explanations (Did You Know?) */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>💡</span>
                <span>Simple Explanations: How Does It Work?</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.childFeatures.simpleExplanations.map((item, i) => (
                  <div key={i} className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                    <div className="text-xs font-bold text-amber-800">{item.question}</div>
                    <p className="text-xs text-stone-700">{item.answer}</p>
                    <div className="text-[11px] p-2 bg-amber-50 rounded-lg text-amber-900 font-medium">
                      🌟 <strong>Fun Fact:</strong> {item.funFact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. HISTORY PROFESSOR PERSONA VIEW */}
        {activePersona === 'historian' && data.historianFeatures && (
          <div className="space-y-6 pt-2">
            {/* Primary Sources Archive */}
            <div className="bg-indigo-50/50 border border-indigo-200 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Primary Sources & Epigraphical Dossier
                  </h3>
                  <p className="text-xs text-stone-600">
                    Direct court chronicles, contemporary travelogues, and epigraphic transcripts.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {data.historianFeatures.primarySources.map((ps, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 border border-indigo-100 shadow-xs space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-sm font-serif font-bold text-indigo-950">{ps.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 w-fit">
                        {ps.period}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 font-medium">
                      Archive Repository: {ps.sourceArchive}
                    </div>
                    <blockquote className="p-3 bg-stone-50 border-l-4 border-indigo-600 text-xs text-stone-800 font-serif italic">
                      {ps.textSnippet}
                    </blockquote>
                    <p className="text-xs text-stone-600">
                      <strong>Historiographical Significance:</strong> {ps.significance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Archaeological Excavation & Structural Specs */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>🏛️</span>
                <span>Archaeological & Structural Specifications</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.historianFeatures.archaeologicalDetails.map((ad, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="text-xs font-bold text-indigo-900">{ad.feature}</div>
                    <div className="text-xs text-stone-700">
                      <span className="text-stone-500">Scale/Metric:</span> {ad.measurement}
                    </div>
                    <div className="text-xs text-stone-700">
                      <span className="text-stone-500">Materiality:</span> {ad.composition}
                    </div>
                    <div className="text-[11px] text-stone-600 pt-1 border-t border-stone-200">
                      {ad.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Papers & Bibliography */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>📚</span>
                <span>Peer-Reviewed Bibliography & Research Papers</span>
              </h3>
              <div className="space-y-2">
                {data.historianFeatures.researchPapers.map((paper, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">{paper.title}</div>
                      <div className="text-xs text-stone-600">
                        {paper.author} ({paper.year}) • <em>{paper.journal}</em>
                      </div>
                      <div className="text-[11px] text-indigo-600 font-mono mt-0.5">
                        {paper.doiOrCitation}
                      </div>
                    </div>
                    <a
                      href={`https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 hover:text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 shrink-0 w-fit"
                    >
                      <span>Google Scholar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. PHOTOGRAPHY ENTHUSIAST PERSONA VIEW */}
        {activePersona === 'photographer' && data.photographerFeatures && (
          <div className="space-y-6 pt-2">
            {/* Lighting Times & Golden Hour Calculator */}
            <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-600 text-white">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Calculated Lighting Windows & Golden Hour
                  </h3>
                  <p className="text-xs text-stone-600">
                    Precise astronomical sun angle benchmarks for architectural and travel photography.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-white p-3 rounded-xl border border-rose-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-700">
                    <Sun className="w-4 h-4" />
                    <span>Morning Golden Hour</span>
                  </div>
                  <div className="font-semibold text-stone-900">
                    {data.photographerFeatures.lightingTimes.goldenHourMorning}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-rose-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-blue-700">
                    <Moon className="w-4 h-4" />
                    <span>Morning Blue Hour</span>
                  </div>
                  <div className="font-semibold text-stone-900">
                    {data.photographerFeatures.lightingTimes.blueHourMorning}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-rose-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-orange-700">
                    <Sun className="w-4 h-4" />
                    <span>Evening Golden Hour</span>
                  </div>
                  <div className="font-semibold text-stone-900">
                    {data.photographerFeatures.lightingTimes.goldenHourEvening}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-rose-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-700">
                    <Moon className="w-4 h-4" />
                    <span>Evening Blue Hour</span>
                  </div>
                  <div className="font-semibold text-stone-900">
                    {data.photographerFeatures.lightingTimes.blueHourEvening}
                  </div>
                </div>
              </div>

              <div className="text-xs bg-amber-100/70 text-amber-900 p-2.5 rounded-xl font-medium">
                ⚠️ <strong>Harsh Light Warning:</strong>{' '}
                {data.photographerFeatures.lightingTimes.harshSunAvoidance}
              </div>
            </div>

            {/* Best Vantage Angles & Curated Spots */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>🎯</span>
                <span>Top 4 Curated Vantage Spots & Angles</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.photographerFeatures.bestAngles.map((angle, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900">{angle.angleName}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold">
                        {angle.bestTime}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 font-medium">
                      📸 <strong>Lens:</strong> {angle.focalLength}
                    </div>
                    <p className="text-xs text-stone-700">{angle.compositionNote}</p>
                    <div className="text-[11px] font-mono text-stone-500 bg-white p-1.5 rounded border border-stone-200">
                      📍 {angle.coordsHint}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Camera Settings Guide & Security Clearance */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>⚙️</span>
                <span>Pro Camera Settings & Monument Gear Regulations</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.photographerFeatures.compositionGuides.map((guide, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                    <div className="text-xs font-bold text-rose-900">{guide.title}</div>
                    <p className="text-xs text-stone-700">{guide.tip}</p>
                    <div className="text-[11px] p-2 rounded bg-rose-50 text-rose-900 font-mono">
                      {guide.recommendedSettings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. FOREIGN TOURIST (JAPANESE) PERSONA VIEW */}
        {activePersona === 'japanese_tourist' && data.japaneseFeatures && (
          <div className="space-y-6 pt-2">
            {/* Japanese Audio Guide */}
            <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-red-600 text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      日本語特別音声ガイド (Japanese Voice Audio Guide)
                    </h3>
                    <p className="text-xs text-stone-600">
                      {data.japaneseFeatures.japaneseAudioGuide.titleJa}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    speakText(
                      data.japaneseFeatures?.japaneseAudioGuide.audioScript || '',
                      'ja-JP'
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isSpeaking ? '音声停止' : '日本語で聴く (Play Japanese Audio) 🔊'}</span>
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl border border-red-200 space-y-2">
                <div className="text-sm font-medium text-stone-900 leading-relaxed font-sans">
                  {data.japaneseFeatures.japaneseAudioGuide.textJa}
                </div>
                <div className="text-xs font-mono text-stone-500 italic">
                  {data.japaneseFeatures.japaneseAudioGuide.romaji}
                </div>
                <div className="text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <strong>English Translation:</strong> {data.japaneseFeatures.japaneseAudioGuide.translationEn}
                </div>
              </div>
            </div>

            {/* Cultural Connections with Japanese History */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>🏯</span>
                <span>日本とインドの文化的・歴史的つながり (Cultural Parallels with Japan)</span>
              </h3>
              <div className="space-y-3">
                {data.japaneseFeatures.culturalConnections.map((conn, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="text-xs font-bold text-red-900">{conn.topic}</div>
                    <p className="text-xs text-stone-800 leading-relaxed">{conn.connection}</p>
                    <div className="text-[11px] text-stone-600 bg-white p-2 rounded border border-stone-200">
                      🎌 <strong>日本の歴史との比較:</strong> {conn.parallelsWithJapan}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Etiquette & Manners Guide */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>⛩️</span>
                <span>見学マナー・参拝エチケット (Visiting Etiquette & Security)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.japaneseFeatures.culturalEtiquette.map((eq, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="text-xs font-bold text-stone-900">{eq.etiquetteRule}</div>
                    <p className="text-xs text-stone-600">{eq.context}</p>
                    <div className="text-[11px] p-2 bg-red-50 text-red-900 rounded-lg font-medium">
                      💡 {eq.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. WHEELCHAIR USER PERSONA VIEW */}
        {activePersona === 'wheelchair_user' && data.wheelchairFeatures && (
          <div className="space-y-6 pt-2">
            {/* Step-Free Routes */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-600 text-white">
                  <Accessibility className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Strictly Step-Free Paved Routes & Ramp Gradients
                  </h3>
                  <p className="text-xs text-stone-600">
                    Zero-step access with certified gradients under 1:12 and smooth stone surfaces.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {data.wheelchairFeatures.accessibleRoutes.map((route, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-xs space-y-1.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-sm font-bold text-stone-900">{route.pathName}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold w-fit">
                        {route.stepFree ? '100% Step-Free' : 'Partial Assistance'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-stone-600">
                      <div>
                        <strong>Surface:</strong> {route.surfaceType}
                      </div>
                      <div>
                        <strong>Gradient:</strong> {route.slopeGradient}
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 bg-emerald-50/50 p-2 rounded">
                      {route.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ground-Floor Exhibits */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>🚪</span>
                <span>Ground-Floor Exhibits & Rest Areas</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.wheelchairFeatures.groundFloorExhibits.map((ex, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="text-xs font-bold text-emerald-900">{ex.name}</div>
                    <div className="text-xs text-stone-600">📍 {ex.location}</div>
                    <div className="text-xs text-emerald-700 font-semibold">
                      {ex.accessibilityRating}
                    </div>
                    {ex.restSeatingNearby && (
                      <div className="text-[11px] text-stone-500 flex items-center gap-1">
                        <span>🪑</span>
                        <span>Shaded rest seating available nearby</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ramp & Facilities Status */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>🛗</span>
                <span>Ramps, Golf Buggies & Restroom Specifications</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.wheelchairFeatures.rampAndFacilities.map((fac, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="text-xs font-bold text-stone-900">{fac.facility}</div>
                    <div className="text-xs text-emerald-700 font-semibold">{fac.status}</div>
                    <p className="text-xs text-stone-600">{fac.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. BUDGET TRAVELER (2 HOURS) PERSONA VIEW */}
        {activePersona === 'budget_traveler' && data.budgetTimeFeatures && (
          <div className="space-y-6 pt-2">
            {/* Top 3 Must-See Highlights */}
            <div className="bg-sky-50/60 border border-sky-200 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-600 text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Top 3 Must-See Highlights (Ranked for 2 Hours)
                  </h3>
                  <p className="text-xs text-stone-600">
                    Maximum cultural value in minimum time with zero wasted steps.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.budgetTimeFeatures.top3Highlights.map((hl) => (
                  <div key={hl.rank} className="bg-white p-4 rounded-xl border border-sky-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                        #{hl.rank}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold">
                        ⏱️ {hl.visitTimeMinutes} mins
                      </span>
                    </div>
                    <div className="text-sm font-bold text-stone-900">{hl.name}</div>
                    <p className="text-xs text-stone-700">{hl.whyMustSee}</p>
                    <div className="text-[11px] font-medium text-emerald-700 bg-emerald-50 p-1.5 rounded">
                      💰 {hl.cost}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fastest Route Circuit (Step-by-Step 120 Mins) */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>⚡</span>
                <span>Fastest 120-Minute Walking Circuit (Zero Backtracking)</span>
              </h3>
              <div className="space-y-2">
                {data.budgetTimeFeatures.fastestRouteCircuit.map((st) => (
                  <div
                    key={st.stepNumber}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-stone-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {st.stepNumber}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900">{st.action}</div>
                        <div className="text-xs text-stone-600 mt-0.5">
                          💡 <strong>Fast Track Tip:</strong> {st.tip}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md shrink-0 w-fit">
                      {st.durationMinutes} mins
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Hacks & Money Savers */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>💡</span>
                <span>Official Budget Hacks & Transit Cost Reductions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {data.budgetTimeFeatures.budgetHacks.map((hack, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                    <div className="text-xs text-stone-800">{hack.tip}</div>
                    <div className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                      ✅ {hack.savings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
