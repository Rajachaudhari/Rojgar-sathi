import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { aiService } from '../services/aiService';
import {
  Monitor,
  Mic,
  Volume2,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Landmark,
  Globe2,
  HelpCircle,
  ArrowRight,
  PhoneCall
} from 'lucide-react';

export const KioskModePage: React.FC = () => {
  const { language, setLanguage, languages } = useLanguage();
  const navigate = useNavigate();
  const [isSpeakingPrompt, setIsSpeakingPrompt] = useState(false);

  const speakPrompt = (text: string) => {
    aiService.stopSpeaking();
    aiService.speak(text, language);
    setIsSpeakingPrompt(true);
    setTimeout(() => setIsSpeakingPrompt(false), 4000);
  };

  const isHindi = language === 'hi';

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 flex flex-col justify-between select-none">
      {/* Kiosk Top Bar */}
      <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg font-black text-xl">
            <Monitor className="w-7 h-7" />
          </div>
          <div>
            <span className="text-orange-400 font-extrabold text-xs uppercase tracking-widest block">
              CSC / Gram Panchayat Kiosk Mode
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Rojgar Sathi Livelihood Touch Terminal
            </h1>
          </div>
        </div>

        {/* Big Touch Language Selector */}
        <div className="flex items-center space-x-2">
          {languages.slice(0, 4).map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                speakPrompt(l.code === 'hi' ? 'नमस्ते! Rojgar Sathi कियोस्क में आपका स्वागत है।' : 'Welcome to Rojgar Sathi Kiosk.');
              }}
              className={`px-4 py-3 rounded-2xl text-sm font-black transition active:scale-95 ${
                language === l.code
                  ? 'bg-orange-600 text-white shadow-lg ring-4 ring-orange-400/40'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {l.native}
            </button>
          ))}
        </div>
      </div>

      {/* Main Touch Grid */}
      <div className="max-w-6xl mx-auto w-full my-8 space-y-6">
        {/* Giant Voice Action Button */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 border border-blue-700/80 shadow-2xl text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-orange-400 font-bold text-sm uppercase tracking-wider">
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span>Voice-First Navigation</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {isHindi ? 'बोलकर अपनी आजीविका खोजें' : 'Speak to Find Your Free Training & Job'}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {isHindi
              ? 'बटन दबाएं और माइक पर बोलें। आपको कोई लंबा फॉर्म भरने की आवश्यकता नहीं है।'
              : 'Press the microphone button and talk. No complicated forms required.'}
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => navigate('/assistant')}
              className="flex items-center space-x-3 px-10 py-6 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-black text-xl rounded-3xl shadow-2xl shadow-orange-600/50 ring-8 ring-orange-500/20 transition"
            >
              <Mic className="w-8 h-8 animate-pulse" />
              <span>{isHindi ? 'एआई सहायक से बात करें' : 'Talk to AI Assistant'}</span>
            </button>
          </div>
        </div>

        {/* 4 Huge High-Contrast Touch Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => navigate('/assessment')}
            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border-2 border-slate-700 hover:border-blue-500 rounded-3xl p-6 text-left transition flex flex-col justify-between h-48 shadow-lg group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {isHindi ? 'कौशल मूल्यांकन' : 'Skill Assessment'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isHindi ? '5 सरल प्रश्नों के उत्तर दें' : 'Answer 5 simple questions'}
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/training')}
            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border-2 border-slate-700 hover:border-emerald-500 rounded-3xl p-6 text-left transition flex flex-col justify-between h-48 shadow-lg group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {isHindi ? 'मुफ्त प्रशिक्षण' : 'Free Training'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isHindi ? '₹1,500/माह स्टाइपेंड कोर्स' : 'NSQF Courses with stipend'}
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/jobs')}
            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border-2 border-slate-700 hover:border-orange-500 rounded-3xl p-6 text-left transition flex flex-col justify-between h-48 shadow-lg group"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-600/20 text-orange-400 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {isHindi ? 'स्थानीय नौकरियां' : 'Local Jobs'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isHindi ? 'अपने जिले में रिक्तियां' : 'District wage vacancies'}
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/self-employment')}
            className="bg-slate-800 hover:bg-slate-700 active:scale-95 border-2 border-slate-700 hover:border-purple-500 rounded-3xl p-6 text-left transition flex flex-col justify-between h-48 shadow-lg group"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {isHindi ? 'स्वरोजगार ₹50,000' : 'Self-Employment'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isHindi ? 'दुकान/व्यवसाय के लिए सरकारी अनुदान' : 'Rojgar Sathi Capital Subsidy'}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Kiosk Bottom Assistance Bar */}
      <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-400">
        <div className="flex items-center space-x-3">
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          <span>Need Kiosk Operator Assistance? Dial Toll-Free: <strong>1800-11-2001</strong></span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition"
        >
          Exit Kiosk Mode / Standard Web View
        </button>
      </div>
    </div>
  );
};
