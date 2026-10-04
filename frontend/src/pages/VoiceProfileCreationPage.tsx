import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { aiService } from '../services/aiService';
import { MicrophoneButton } from '../components/MicrophoneButton';
import { VoiceWaveform } from '../components/VoiceWaveform';
import {
  User,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Save,
  RotateCcw
} from 'lucide-react';

export const VoiceProfileCreationPage: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [profileData, setProfileData] = useState({ ...profile });

  const isHindi = language === 'hi';

  const prompts = [
    {
      title: isHindi ? 'आपका नाम और उम्र' : 'Your Name and Age',
      question: isHindi ? 'कृपया अपना पूरा नाम और उम्र बताएं।' : 'Please state your full name and age.',
      field: 'name',
      sampleAnswer: 'Ramesh Kumar Gautam, 24 years',
    },
    {
      title: isHindi ? 'शिक्षा का स्तर' : 'Education Level',
      question: isHindi ? 'आपने पढ़ाई कहाँ तक की है? जैसे 8वीं, 10वीं, 12वीं या आईटीआई।' : 'What is your education qualification? (e.g. 10th pass, 12th pass, ITI)',
      field: 'education',
      sampleAnswer: '10th Pass',
    },
    {
      title: isHindi ? 'पारंपरिक शिल्प या वर्तमान काम' : 'Traditional Craft or Current Work',
      question: isHindi ? 'क्या आपका कोई पारंपरिक पारिवारिक व्यवसाय है? या वर्तमान में क्या काम करते हैं?' : 'Does your family have a traditional craft? What work do you currently do?',
      field: 'traditionalOccupation',
      sampleAnswer: 'Basic Electrical helper and Handloom',
    },
    {
      title: isHindi ? 'सीखने की रुचि और आकांक्षा' : 'Aspirations and Interests',
      question: isHindi ? 'आप किस क्षेत्र में ट्रेनिंग लेना या काम करना चाहते हैं?' : 'Which trade or sector would you like to train in? (e.g. Solar, Tailoring, Computer)',
      field: 'interests',
      sampleAnswer: 'Solar Rooftop & Inverter maintenance',
    },
  ];

  const currentP = prompts[step];

  const handleSimulateVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      if (step === 0) {
        setProfileData(prev => ({ ...prev, name: 'Ramesh Kumar Gautam' }));
      } else if (step === 1) {
        setProfileData(prev => ({ ...prev, education: '10th Pass' }));
      } else if (step === 2) {
        setProfileData(prev => ({
          ...prev,
          traditionalOccupation: 'Electrical & Craft repairs',
          existingSkills: ['Basic Wiring', 'Hand Tool Repair'],
        }));
      } else if (step === 3) {
        setProfileData(prev => ({
          ...prev,
          interests: ['Solar Energy', 'Electrical Technician'],
        }));
      }

      if (step + 1 < prompts.length) {
        setStep(step + 1);
      }
    }, 2000);
  };

  const handleSaveAndProceed = () => {
    updateProfile(profileData);
    navigate('/assessment');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Conversational Profile Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Voice-Guided Beneficiary Profile Creation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            No long typing required. Speak naturally to answer 4 quick questions. Review and edit the synthesized profile before saving.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Voice Prompt */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
            <span className="font-bold text-blue-700">Question {step + 1} of {prompts.length}</span>
            <span>{currentP.title}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            "{currentP.question}"
          </h2>

          <div className="py-4">
            <MicrophoneButton
              isListening={isListening}
              size="lg"
              onClick={handleSimulateVoiceInput}
              label={isListening ? 'Listening to voice...' : 'Tap to Speak Answer'}
            />
          </div>

          <VoiceWaveform isActive={isListening} color="bg-orange-500" barsCount={7} />

          <div className="pt-2">
            <button
              onClick={handleSimulateVoiceInput}
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              Simulate voice answer: "{currentP.sampleAnswer}"
            </button>
          </div>
        </div>

        {/* Right Column: Live Review & Edit Generated Profile */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Generated Profile Preview (Review & Edit)
              </h3>
            </div>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
              Live Draft
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Education Level</label>
              <input
                type="text"
                value={profileData.education}
                onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Traditional / Family Craft</label>
              <input
                type="text"
                value={profileData.traditionalOccupation || ''}
                onChange={(e) => setProfileData({ ...profileData, traditionalOccupation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Primary Trade Interests</label>
              <div className="flex flex-wrap gap-1">
                {profileData.interests.map((it, idx) => (
                  <span key={idx} className="bg-orange-50 text-orange-900 px-2 py-1 rounded-md text-[11px] font-semibold">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSaveAndProceed}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile & Start Skill Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
