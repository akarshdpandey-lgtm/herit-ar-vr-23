import React, { useEffect, useState } from 'react';
import { PersonaType } from '../types';
import { SupportedLanguage } from '../utils/translations';
import { PERSONA_CONFIGS } from './PersonaSwitcher';
import { CULTURAL_GLOSSARY, GlossaryTerm } from '../utils/culturalGlossary';
import {
  Bot,
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  User,
  ShieldCheck,
  Compass,
  Lightbulb,
  BookOpen,
  Mic,
  Languages,
  Info,
} from 'lucide-react';

interface AIGuideSectionProps {
  destinationName: string;
  activePersona: PersonaType;
  language?: SupportedLanguage;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'guide';
  text: string;
  audioScript?: string;
  timestamp: string;
}

const HERITAGE_LANGUAGES = [
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'de', name: 'Deutsch (German)' },
  { code: 'ja', name: '日本語 (Japanese)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'ar', name: 'العربية (Arabic)' },
];

export function AIGuideSection({ destinationName, activePersona, language = 'hi' }: AIGuideSectionProps) {
  const currentPersona = PERSONA_CONFIGS[activePersona];
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    language
  );
  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<GlossaryTerm | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      sender: 'guide',
      text: `नमस्ते! I am your Multilingual Heritage AI Guide for ${destinationName}. Speaking in **${currentPersona.label}** tone. Feel free to ask about historical chronicles, indigenous architecture, or tap the Cultural Glossary below.`,
      audioScript: `Namaste! I am your Multilingual Heritage AI Guide for ${destinationName}. Speaking in ${currentPersona.label} tone. How can I assist your discovery today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);

  const quickPrompts = [
    activePersona === 'child'
      ? 'Tell me a magical story about the elephants and secret tunnels here!'
      : activePersona === 'historian'
      ? 'What primary court chronicles document the foundation construction?'
      : activePersona === 'photographer'
      ? 'What is the exact camera setting, angle, and golden hour timing?'
      : activePersona === 'japanese_tourist'
      ? '日本の法隆寺や五重塔との歴史的・文化的な共通点を教えてください。'
      : activePersona === 'wheelchair_user'
      ? 'Are the ramps to the upper plinth 100% step-free with smooth pavement?'
      : 'What is the fastest 2-hour route loop with zero wasted time?',
    'Explain the clever architectural cooling trick used here',
    'What is the ticket booking hack to skip the long physical queue?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    fetch('/api/guide/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destinationName,
        question: query,
        persona: activePersona,
        language: selectedLanguage,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const guideMsg: ChatMessage = {
            id: `guide-${Date.now()}`,
            sender: 'guide',
            text: res.data.text,
            audioScript: res.data.audioScript || res.data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, guideMsg]);
        }
      })
      .catch((err) => {
        console.warn('AI Guide request failed:', err);
      })
      .finally(() => setLoading(false));
  };

  // Voice speech synthesis
  const toggleSpeech = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (isSpeaking && currentlySpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'ja' ? 'ja-JP' : selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = activePersona === 'child' ? 1.2 : 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    };

    setIsSpeaking(true);
    setCurrentlySpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Voice Speech Recognition (Speech to Text)
  const toggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser window. Please type your question.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'ja' ? 'ja-JP' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Multilingual Heritage AI Guide & Storyteller
              </h2>
              <p className="text-xs text-stone-600">
                Grounded conversational intelligence with 12-language NLP & architectural glossary
              </p>
            </div>
          </div>

          {/* Language selector dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs">
              <Languages className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent border-none text-stone-800 font-semibold focus:outline-none cursor-pointer text-xs"
              >
                {HERITAGE_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentPersona.label}</span>
            </div>
          </div>
        </div>

        {/* Cultural Glossary Term Carousel */}
        <div className="space-y-1.5 bg-amber-50/60 p-3 rounded-2xl border border-amber-200/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Cultural Architectural Glossary:</span>
            </div>
            <span className="text-[10px] text-amber-700 font-medium">Click a term to inspect & ask</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CULTURAL_GLOSSARY.map((item) => (
              <button
                key={item.term}
                onClick={() => setSelectedGlossaryTerm(item)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedGlossaryTerm?.term === item.term
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-400'
                }`}
              >
                <span>{item.term}</span>
                <span className="text-[10px] text-stone-400 ml-1 font-normal">
                  ({item.hindiScript})
                </span>
              </button>
            ))}
          </div>

          {/* Expanded Glossary Term Explainer */}
          {selectedGlossaryTerm && (
            <div className="mt-2 p-3 bg-white rounded-xl border border-amber-300 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">
                  {selectedGlossaryTerm.term} • {selectedGlossaryTerm.hindiScript} ({selectedGlossaryTerm.pronunciation})
                </span>
                <button
                  onClick={() =>
                    handleSendMessage(
                      `Explain the architectural design and historical significance of the ${selectedGlossaryTerm.term} at ${destinationName}.`
                    )
                  }
                  className="text-purple-700 hover:text-purple-900 font-bold text-[11px] cursor-pointer"
                >
                  Ask AI About This &rarr;
                </button>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                {selectedGlossaryTerm.definition}
              </p>
              <p className="text-stone-500 text-[11px] italic">
                {selectedGlossaryTerm.hindiDefinition}
              </p>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Suggested Questions for {currentPersona.label}:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 hover:border-amber-300 text-left transition-colors cursor-pointer"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-3 sm:p-4 min-h-[260px] max-h-[420px] overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'guide' && (
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm space-y-1.5 shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-none'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                }`}
              >
                <div className="leading-relaxed whitespace-pre-wrap">{m.text}</div>
                <div className="flex items-center justify-between gap-2 text-[10px] text-stone-400 pt-1 border-t border-stone-100">
                  <span>{m.timestamp}</span>
                  {m.sender === 'guide' && m.audioScript && (
                    <button
                      onClick={() => toggleSpeech(m.id, m.audioScript!)}
                      className={`inline-flex items-center gap-1 font-bold cursor-pointer transition-colors ${
                        isSpeaking && currentlySpeakingId === m.id
                          ? 'text-rose-600 animate-pulse'
                          : 'text-purple-600 hover:text-purple-800'
                      }`}
                    >
                      {isSpeaking && currentlySpeakingId === m.id ? (
                        <>
                          <VolumeX className="w-3 h-3" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Voice Narration 🔊</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-stone-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 items-center text-xs text-stone-500">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                AI Heritage Guide is crafting your personalized answer in {selectedLanguage.toUpperCase()}...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar with Voice Recognition Toggle */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleVoiceInput}
            title="Speech to Text"
            className={`px-3 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
              isListening
                ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask in ${selectedLanguage.toUpperCase()} about ${destinationName.split(',')[0]} in ${currentPersona.label} mode...`}
            className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
