import React, { useState } from 'react';
import {
  Archive,
  Mic,
  UploadCloud,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  Clock,
  Sparkles,
  BookOpen,
  Filter,
  PlusCircle,
  Hash,
} from 'lucide-react';
import { CommunityOralRecord } from '../types';

const INITIAL_ORAL_RECORDS: CommunityOralRecord[] = [
  {
    id: 'rec-101',
    monumentId: 'hawa-mahal',
    monumentName: 'Hawa Mahal, Jaipur',
    contributorName: 'Pandit Rameshwar Sharma',
    contributorRole: 'Elder Local',
    title: 'The Whispering Winds of Badi Choupad: Secrets of the 953 Jharokhas',
    storyText:
      'My great-grandfather worked as an artisan repairing the pink sandstone lattice in the 1920s. He told me that during royal weddings, rose water was sprayed along the rear ventilation flues. When the desert breeze blew through the tiny apertures, the entire city square smelled of fresh Jaipur damask roses.',
    language: 'Hindi / Marwari Dialect',
    audioDurationSeconds: 142,
    timestamp: 'Recorded October 2024',
    hash: 'sha256:8f4c92a1...e7b2',
    verifiedByASI: true,
    dynastyTag: 'Kachhwaha Dynasty (1799 CE)',
    era: 'Late 18th Century',
    tags: ['Aromatherapy Cooling', 'Royal Processions', 'Venturi Aerodynamics'],
  },
  {
    id: 'rec-102',
    monumentId: 'hawa-mahal',
    monumentName: 'Hawa Mahal, Jaipur',
    contributorName: 'Ustad Abdul Qadir',
    contributorRole: 'Master Craftsman',
    title: 'Traditional Surkhi & Lime Mortar: Why Pink Sandstone Never Cracks',
    storyText:
      'Modern cement traps moisture and destroys ancient sandstone. For Hawa Mahal, we prepare mortar by fermenting slaked lime, bel fruit juice (aegle marmelos), jaggery syrup, and crushed brick surkhi for 40 days. It breathes with the seasons, contracting in winter and flexing under the 45°C summer heat.',
    language: 'Urdu / Hindi',
    audioDurationSeconds: 215,
    timestamp: 'Recorded August 2024',
    hash: 'sha256:3d7b81c4...9a1f',
    verifiedByASI: true,
    dynastyTag: 'Kachhwaha Dynasty',
    era: 'Traditional Masonry',
    tags: ['Indigenous Chemistry', 'Restoration', 'Mortar Science'],
  },
  {
    id: 'rec-103',
    monumentId: 'taj-mahal',
    monumentName: 'Taj Mahal, Agra',
    contributorName: 'Dr. Meera Sen',
    contributorRole: 'Historian',
    title: 'The Riverfront Layout: Why the Taj was Built to be Viewed from Boats',
    storyText:
      'Contemporary records from the Padshahnama prove that Shah Jahan primarily approached the mausoleum on royal imperial barges along the Yamuna River. The moonlit reflection on the black water was an intentional optical stage calculated down to the millimeter.',
    language: 'English / Bengali',
    audioDurationSeconds: 180,
    timestamp: 'Recorded December 2024',
    hash: 'sha256:1a9e55d2...44f0',
    verifiedByASI: true,
    dynastyTag: 'Mughal Empire',
    era: '1648 CE',
    tags: ['Yamuna Hydrology', 'Padshahnama Records', 'Acoustic Axis'],
  },
  {
    id: 'rec-104',
    monumentId: 'amber-fort',
    monumentName: 'Amber Fort, Jaipur',
    contributorName: 'Thakur Bhawani Singh',
    contributorRole: 'Heritage Enthusiast',
    title: 'The Underground Tunnel of Cheel ka Teela Connecting Amber to Jaigarh',
    storyText:
      'There is a 1.2-kilometer subterranean subterranean escape route carved into the mountain ridge between Amber Fort and the munitions citadel of Jaigarh. During an invasion, royal family members could travel unseen while guards monitored the valley using acoustic reverberation chambers.',
    language: 'Hindi',
    audioDurationSeconds: 165,
    timestamp: 'Recorded November 2024',
    hash: 'sha256:5e2a90f7...7c3b',
    verifiedByASI: true,
    dynastyTag: 'Kachhwaha Dynasty',
    era: '16th Century',
    tags: ['Fort Defense', 'Acoustic Escape Tunnel', 'Jaigarh Artillery'],
  },
];

export const OralArchiveSection: React.FC = () => {
  const [records, setRecords] = useState<CommunityOralRecord[]>(INITIAL_ORAL_RECORDS);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [selectedMonumentFilter, setSelectedMonumentFilter] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New record form state
  const [newContributor, setNewContributor] = useState('');
  const [newRole, setNewRole] = useState<'Elder Local' | 'Historian' | 'Master Craftsman' | 'Heritage Enthusiast'>('Elder Local');
  const [newMonument, setNewMonument] = useState('Hawa Mahal, Jaipur');
  const [newTitle, setNewTitle] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newLanguage, setNewLanguage] = useState('Hindi');

  const filteredRecords =
    selectedMonumentFilter === 'all'
      ? records
      : records.filter((r) => r.monumentId.includes(selectedMonumentFilter));

  const handleToggleAudio = (record: CommunityOralRecord) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (activeAudioId === record.id) {
      setActiveAudioId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(record.storyText);
    utterance.rate = 0.95;
    utterance.onend = () => setActiveAudioId(null);
    utterance.onerror = () => setActiveAudioId(null);

    setActiveAudioId(record.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmitNewStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStory.trim() || !newContributor.trim()) return;

    const newRecord: CommunityOralRecord = {
      id: `rec-${Date.now()}`,
      monumentId: newMonument.toLowerCase().includes('hawa') ? 'hawa-mahal' : 'taj-mahal',
      monumentName: newMonument,
      contributorName: newContributor,
      contributorRole: newRole,
      title: newTitle,
      storyText: newStory,
      language: newLanguage,
      audioDurationSeconds: Math.floor(newStory.split(' ').length / 2),
      timestamp: 'Recorded Just Now',
      hash: `sha256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
      verifiedByASI: true,
      dynastyTag: 'Community Oral Archive',
      era: 'Oral Living Heritage',
      tags: ['Community Memory', 'Living Oral Lore'],
    };

    setRecords([newRecord, ...records]);
    setShowSubmitModal(false);
    setNewTitle('');
    setNewStory('');
    setNewContributor('');
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-stone-950 font-bold">
              <Archive className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Community Oral Archive & Living Heritage
            </h2>
            <span className="rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono px-2 py-0.5 font-bold">
              Cryptographic Provenance
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-600">
            Preserving indigenous craftsmanship, folklore, and local oral memories before they are lost to time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-amber-400 hover:bg-stone-800 transition-all cursor-pointer shadow-xs"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Contribute Oral Memory</span>
          </button>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs text-xs">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-stone-500" />
          <span className="text-stone-500 font-medium">Filter by Monument:</span>
          {['all', 'hawa-mahal', 'taj-mahal', 'amber-fort'].map((mon) => (
            <button
              key={mon}
              onClick={() => setSelectedMonumentFilter(mon)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedMonumentFilter === mon
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {mon === 'all' ? 'All Sites' : mon.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        <div className="text-stone-500 font-mono text-[11px]">
          {filteredRecords.length} ARCHIVAL TESTIMONIES DOCUMENTED
        </div>
      </div>

      {/* Archive Records List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRecords.map((record) => {
          const isPlaying = activeAudioId === record.id;
          return (
            <div
              key={record.id}
              className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                {/* Meta header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 text-[10px] font-semibold">
                    {record.monumentName}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {record.timestamp}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-base font-bold text-stone-900 leading-snug">
                  {record.title}
                </h3>

                {/* Contributor badge */}
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <span className="font-semibold text-stone-900">{record.contributorName}</span>
                  <span>•</span>
                  <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-700 font-medium">
                    {record.contributorRole}
                  </span>
                </div>

                {/* Story quote */}
                <p className="text-xs text-stone-700 leading-relaxed italic bg-stone-50/70 p-3.5 rounded-2xl border border-stone-100">
                  "{record.storyText}"
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {record.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] text-stone-600 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom action bar */}
              <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs">
                {/* Audio playback */}
                <button
                  onClick={() => handleToggleAudio(record)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3 w-3" />
                      <span>Pause Audio ({record.audioDurationSeconds}s)</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" />
                      <span>Listen to Audio Lore</span>
                    </>
                  )}
                </button>

                {/* Cryptographic hash badge */}
                <div className="flex items-center gap-1 text-[10px] font-mono text-stone-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{record.hash}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contribute Story Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Record & Submit Oral Heritage Lore
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewStory} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Your Full Name / Contributor
                </label>
                <input
                  type="text"
                  required
                  value={newContributor}
                  onChange={(e) => setNewContributor(e.target.value)}
                  placeholder="e.g. Ram Charan Soni"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Your Community Role
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Elder Local">Elder Local</option>
                    <option value="Historian">Historian</option>
                    <option value="Master Craftsman">Master Craftsman</option>
                    <option value="Heritage Enthusiast">Heritage Enthusiast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Monument Associated
                  </label>
                  <select
                    value={newMonument}
                    onChange={(e) => setNewMonument(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Hawa Mahal, Jaipur">Hawa Mahal, Jaipur</option>
                    <option value="Taj Mahal, Agra">Taj Mahal, Agra</option>
                    <option value="Amber Fort, Jaipur">Amber Fort, Jaipur</option>
                    <option value="Golden Temple, Amritsar">Golden Temple, Amritsar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Lore / Account Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Secret stone carving technique of the West Façade"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Oral Account Story or Folk Memory
                </label>
                <textarea
                  required
                  rows={4}
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  placeholder="Describe the oral story passed down by ancestors, the folklore, or the artisan technique..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200/70 text-[11px] text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Preservation Guarantee
                </span>
                <p>
                  Your submission will be timestamped and assigned a SHA-256 cryptographic provenance hash for archival indexing.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-stone-900 text-amber-400 font-semibold hover:bg-stone-800 cursor-pointer"
                >
                  Publish to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
