import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { aiService, AIResponse } from '../services/aiService';
import { MicrophoneButton } from '../components/MicrophoneButton';
import { VoiceWaveform } from '../components/VoiceWaveform';
import { ChatMessage, BeneficiaryProfile } from '../types';
import {
  Volume2,
  VolumeX,
  Send,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Mic,
  GraduationCap
} from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const { profile, updateProfile, hasConsented } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: language === 'hi'
        ? 'नमस्ते! मैं पीएम-अजय एआई आजीविका सहायक हूँ। मैं आपकी रुचि और कौशल को समझने में आपकी मदद करूँगा। कृपया बताएं, आपने कितनी पढ़ाई की है और आप किस तरह का काम सीखना या करना चाहते हैं?'
        : 'Namaste! I am your Rojgar Sathi — AI Livelihood Assistant. I will help understand your background, skills and interests to connect you with free training and jobs. Please tell me: what is your highest education level and what kind of work interests you?',
      timestamp: 'Just now',
      suggestedQuickReplies: language === 'hi'
        ? ['मैंने 10वीं पास की है', 'सोलर और बिजली का काम', 'सिलाई और गारमेंट', 'कंप्यूटर डेटा एंट्री']
        : ['I have done 10th pass', 'Solar & Electrical work', 'Tailoring & Garments', 'Computer Data Entry'],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeechEnabled, setAutoSpeechEnabled] = useState(true);

  // Live extracted candidate attributes
  const [extractedProfile, setExtractedProfile] = useState<Partial<BeneficiaryProfile>>({
    ...profile,
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  // Initial speech greeting if auto-speech is enabled
  useEffect(() => {
    if (autoSpeechEnabled && messages.length === 1) {
      aiService.speak(messages[0].text, language);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 4500);
    }
  }, []);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isProcessing) return;

    aiService.stopSpeaking();
    setIsSpeaking(false);

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      const history = messages.map(m => ({ sender: m.sender, text: m.text }));
      const response: AIResponse = await aiService.chat(
        textToSend,
        history,
        extractedProfile,
        language
      );

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: response.message,
        timestamp: 'Just now',
        suggestedQuickReplies: response.suggestedReplies,
        extractedProfileUpdates: response.extractedProfileUpdates,
      };

      setMessages(prev => [...prev, aiMsg]);

      // Apply live extracted profile updates
      if (response.extractedProfileUpdates) {
        setExtractedProfile(prev => ({
          ...prev,
          ...response.extractedProfileUpdates,
        }));
        updateProfile(response.extractedProfileUpdates);
      }

      // Voice output
      if (autoSpeechEnabled) {
        aiService.speak(response.message, language);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle voice recognition
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    // Check for browser speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Simulate voice input for environments without Web Speech API
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const demoResponses = language === 'hi'
          ? ['मैंने 10वीं पास की है और मुझे सोलर व बिजली का काम सीखना है', 'सिलाई और बुटीक की दुकान खोलना चाहता हूँ', 'कंप्यूटर ऑपरेटर और सीएससी केंद्र की ट्रेनिंग चाहिए']
          : ['I completed 10th pass and want to learn Solar PV installation', 'I want to open my own tailoring boutique', 'I want computer operator training'];
        const randomAnswer = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        handleSendMessage(randomAnswer);
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const replayMessage = (text: string) => {
    aiService.stopSpeaking();
    aiService.speak(text, language);
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Voice-First AI Counseling Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Rojgar Sathi Conversational Livelihood Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Talk naturally in Hindi or your regional language. The assistant analyzes your trade preferences, identifies skill gaps, and prepares your vocational profile.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-2xl backdrop-blur-xs text-xs">
          <button
            onClick={() => {
              if (isSpeaking) {
                aiService.stopSpeaking();
                setIsSpeaking(false);
              }
              setAutoSpeechEnabled(!autoSpeechEnabled);
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl font-bold transition ${
              autoSpeechEnabled ? 'bg-emerald-500 text-white shadow-xs' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {autoSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{autoSpeechEnabled ? 'Speech Output: ON' : 'Muted'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Conversation Column */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
          {/* Conversation History Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                      isAi
                        ? 'bg-gradient-to-tr from-blue-900 to-blue-700 text-white shadow-xs'
                        : 'bg-orange-600 text-white'
                    }`}
                  >
                    {isAi ? <Sparkles className="w-4 h-4 text-orange-400" /> : 'You'}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isAi
                        ? 'bg-slate-50 border border-slate-200 text-slate-800'
                        : 'bg-blue-700 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {isAi && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between">
                        <button
                          onClick={() => replayMessage(msg.text)}
                          className="flex items-center space-x-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Replay Audio</span>
                        </button>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>
                    )}

                    {/* Quick Reply Chips */}
                    {isAi && msg.suggestedQuickReplies && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {msg.suggestedQuickReplies.map((reply, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(reply)}
                            disabled={isProcessing}
                            className="bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-orange-900 text-xs font-semibold px-2.5 py-1 rounded-full transition shadow-2xs active:scale-95"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* AI Thinking Indicator */}
            {isProcessing && (
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-orange-400 animate-spin" />
                </div>
                <div className="bg-slate-100 rounded-2xl p-3 text-xs text-slate-600 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-200"></div>
                  <span className="ml-1 font-medium">AI analyzing your response & matching official schemes...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Voice Waveform Activity Strip */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isListening
                    ? 'bg-orange-500 animate-ping'
                    : isSpeaking
                    ? 'bg-blue-600 animate-pulse'
                    : 'bg-emerald-500'
                }`}
              />
              <span className="text-xs font-semibold text-slate-600">
                {isListening
                  ? 'Listening to your voice... Speak now'
                  : isSpeaking
                  ? 'AI Speaking response...'
                  : 'Assistant Ready'}
              </span>
            </div>

            <VoiceWaveform isActive={isListening || isSpeaking} color={isListening ? 'bg-orange-500' : 'bg-blue-600'} barsCount={7} />
          </div>

          {/* Input Controls: Microphone & Text Fallback */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center space-x-3">
            <MicrophoneButton
              isListening={isListening}
              isProcessing={isProcessing}
              onClick={toggleListening}
              size="sm"
            />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex-1 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={language === 'hi' ? 'यहाँ टाइप करें या माइक पर बोलें...' : 'Type your answer or click microphone to speak...'}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isProcessing}
                className="p-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl transition shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Live Extracted Profile Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Live Extracted Profile
                </h3>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                Dynamic Sync
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Candidate Name</span>
                <span className="font-bold text-slate-800">{extractedProfile.name || 'Beneficiary'}</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Education</span>
                <span className="font-bold text-blue-700">{extractedProfile.education || 'Pending identification'}</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Detected Skills</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {extractedProfile.existingSkills && extractedProfile.existingSkills.length > 0 ? (
                    extractedProfile.existingSkills.map((sk, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-800 text-[10px] font-medium px-2 py-0.5 rounded-md">
                        {sk}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">Mention what you know...</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Aspirations & Interests</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {extractedProfile.interests && extractedProfile.interests.length > 0 ? (
                    extractedProfile.interests.map((it, idx) => (
                      <span key={idx} className="bg-orange-50 text-orange-800 text-[10px] font-medium px-2 py-0.5 rounded-md">
                        {it}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">Mention your trade interest...</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Livelihood Target</span>
                <span className="font-semibold text-slate-700">
                  {extractedProfile.employmentPreference === 'self_employment'
                    ? 'Micro-Enterprise / Shop'
                    : 'Wage Job / Apprentice'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => navigate('/skill-gaps')}
                className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2"
              >
                <span>Analyze Skill Gaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate('/assessment')}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                <span>Take Full Assessment</span>
              </button>
            </div>
          </div>

          {/* Privacy & Authorized Guidance Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-[11px] text-blue-900 space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Institutional Privacy Notice</span>
            </div>
            <p className="leading-relaxed">
              Conversations are processed strictly according to your consent preferences. AI recommendations are advisory and verified against official NSDC and authorized government data sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
