import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { MicrophoneButton } from '../components/MicrophoneButton';
import { VoiceWaveform } from '../components/VoiceWaveform';
import { TrainingCard, JobCard, SchemeCard } from '../components/CardComponents';
import { MOCK_TRAINING_PROGRAMS, MOCK_JOBS, MOCK_SCHEMES } from '../data/mockData';
import {
  Sparkles,
  Mic,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MapPin,
  HelpCircle,
  PhoneCall,
  MessageSquare,
  Monitor,
  AlertTriangle,
  Lightbulb,
  Award,
  Globe2,
  Check
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/training');
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 rounded-b-3xl shadow-xl">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Ministry of Social Justice & Empowerment • Rojgar Sathi Scheme</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {t('heroTitle')}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>

            {/* Core Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/assistant"
                className="w-full sm:w-auto px-7 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-orange-600/30 hover:scale-105 active:scale-95 transition flex items-center justify-center space-x-2.5"
              >
                <Mic className="w-5 h-5 animate-pulse" />
                <span>{t('talkToAI')}</span>
              </Link>

              <Link
                to="/assessment"
                className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm sm:text-base rounded-2xl backdrop-blur-xs transition flex items-center justify-center space-x-2"
              >
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <span>{t('startSkillAssessment')}</span>
              </Link>

              <Link
                to="/training"
                className="w-full sm:w-auto px-5 py-4 text-slate-300 hover:text-white font-semibold text-sm rounded-2xl hover:bg-white/5 transition flex items-center justify-center space-x-1"
              >
                <span>{t('exploreOpportunities')}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Free NSQF Courses</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>₹1,500/mo Training Stipend</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>₹50,000 Capital Subsidy Grant</span>
              </span>
            </div>
          </div>

          {/* Hero Visual Card: Interactive Voice Assistant Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-5 text-center">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-700/60">
                <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Voice AI Active</span>
                </span>
                <span className="bg-slate-700/60 px-2 py-0.5 rounded text-[11px]">
                  Hindi / Regional Dialects
                </span>
              </div>

              {/* Central Voice Button */}
              <div className="py-2">
                <MicrophoneButton
                  isListening={false}
                  size="lg"
                  onClick={() => navigate('/assistant')}
                  label="Tap to speak in your mother tongue"
                />
              </div>

              <VoiceWaveform isActive={true} color="bg-orange-400" barsCount={9} />

              <div className="bg-slate-950/60 rounded-2xl p-4 text-left border border-slate-800 space-y-2">
                <div className="flex items-center space-x-1.5 text-[11px] text-orange-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Counselor Prompt:</span>
                </div>
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "नमस्ते! मैं पीएम-अजय एआई आजीविका सहायक हूँ। आपने कितनी पढ़ाई की है और आप किस काम में रुचि रखते हैं?"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/kiosk"
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center"
                >
                  CSC Kiosk Mode
                </Link>
                <Link
                  to="/ivr"
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-center"
                >
                  Toll-Free IVR Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & KEY IMPACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pt-2 md:pt-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 block">45,000+</span>
            <span className="text-xs text-slate-500 font-medium">Beneficiaries Assessed</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 block">100% Free</span>
            <span className="text-xs text-slate-500 font-medium">NSQF Skill Training</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 block">₹50,000</span>
            <span className="text-xs text-slate-500 font-medium">Capital Grant Subsidy</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-700 block">10 Languages</span>
            <span className="text-xs text-slate-500 font-medium">Voice Interaction Enabled</span>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            Addressing Core Livelihood Challenges
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Traditional Systems Leave Beneficiaries Behind
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Youth and traditional artisans face systemic barriers in navigating complex government portals and identifying realistic career pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Skill and Job Mismatch',
              desc: 'Candidates often enroll in random courses that do not align with market demands in their home districts.',
              icon: AlertTriangle,
              color: 'text-amber-600 bg-amber-50',
            },
            {
              title: 'Lack of Local Awareness',
              desc: 'Over 68% of rural youth are unaware of fully funded NSQF training centers located within 15 km of their villages.',
              icon: MapPin,
              color: 'text-blue-600 bg-blue-50',
            },
            {
              title: 'Unidentified Skill Gaps',
              desc: 'Job seekers do not know which specific modules prevent them from qualifying for technical wage jobs.',
              icon: Award,
              color: 'text-purple-600 bg-purple-50',
            },
            {
              title: 'Language & Literacy Barriers',
              desc: 'Complicated English forms exclude candidates with basic or non-formal schooling from accessing state support.',
              icon: Globe2,
              color: 'text-emerald-600 bg-emerald-50',
            },
            {
              title: 'Complex Government Forms',
              desc: 'Long paperwork causes high dropout before applications reach verification stages.',
              icon: Lightbulb,
              color: 'text-orange-600 bg-orange-50',
            },
            {
              title: 'Low Self-Employment Guidance',
              desc: 'Artisans lack business planning support and knowledge of capital grants like Rojgar Sathi and PM Vishwakarma.',
              icon: TrendingUp,
              color: 'text-teal-600 bg-teal-50',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition space-y-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS (6-STEP VISUAL PROCESS) */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 rounded-3xl border border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Seamless 6-Step Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Rojgar Sathi AI Assistant Guides You
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              From voice conversation to sustainable employment in 6 clear, transparent milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { step: 1, title: 'Select Language', desc: 'Speak or listen in Hindi or your regional mother tongue.', icon: Globe2 },
              { step: 2, title: 'Talk to AI', desc: 'No complex forms. Have a natural voice conversation with AI.', icon: Mic },
              { step: 3, title: 'Create Profile', desc: 'AI extracts education, skills, interests and mobility constraints.', icon: Users },
              { step: 4, title: 'Analyze Skill Gaps', desc: 'Discover exact technical gaps for high-growth target careers.', icon: Award },
              { step: 5, title: 'Match Opportunities', desc: 'Fetch authorized training batches, jobs, and capital subsidies.', icon: Sparkles },
              { step: 6, title: 'Apply & Track', desc: 'One-click application with end-to-end milestone tracking.', icon: CheckCircle2 },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition relative group"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center mb-3 group-hover:bg-orange-600 transition">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs mb-1.5">{s.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-normal">{s.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end">
                  <s.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/assistant"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              <span>Start Your Voice Session Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED TRAINING & JOB HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              NSQF Aligned & Free
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Featured Skill Training Programs
            </h2>
            <p className="text-xs text-slate-500">
              Government accredited batches under Rojgar Sathi with stipend and certification.
            </p>
          </div>
          <Link
            to="/training"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>View All Training Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TRAINING_PROGRAMS.slice(0, 3).map((item) => (
            <TrainingCard key={item.id} data={item} onApply={handleApply} />
          ))}
        </div>
      </section>

      {/* 6. MULTI-CHANNEL ASSISTANCE MODES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-3xl text-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              Designed For Last-Mile Connectivity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Access Everywhere — Web, Kiosk, Phone Call or WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No high-speed internet or expensive smartphone required. Beneficiaries can use the AI Assistant via community kiosks or voice telephony.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/kiosk"
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-5 backdrop-blur-xs transition space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">CSC Panchayat Kiosk</h3>
              <p className="text-xs text-slate-300">
                Large high-contrast touch interface with voice-guided prompts for village common service centers.
              </p>
              <span className="text-xs text-orange-400 font-bold flex items-center space-x-1 pt-1">
                <span>Open Kiosk Simulator</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              to="/ivr"
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-5 backdrop-blur-xs transition space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Toll-Free IVR Service</h3>
              <p className="text-xs text-slate-300">
                Interactive Voice Response system allowing any basic feature phone user to dial and receive advice.
              </p>
              <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1 pt-1">
                <span>Simulate Phone Call</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              to="/whatsapp"
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-5 backdrop-blur-xs transition space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">WhatsApp Voice Notes</h3>
              <p className="text-xs text-slate-300">
                Send voice notes in your mother tongue; AI automatically extracts skills and replies with course cards.
              </p>
              <span className="text-xs text-teal-400 font-bold flex items-center space-x-1 pt-1">
                <span>Test WhatsApp Chat</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. SCHEMES DISCOVERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Financial & Entrepreneurial Subsidies
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Government Schemes & Grants
            </h2>
          </div>
          <Link to="/schemes" className="text-xs font-bold text-blue-700 hover:underline">
            View All Schemes →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_SCHEMES.slice(0, 2).map((scheme) => (
            <SchemeCard key={scheme.id} data={scheme} />
          ))}
        </div>
      </section>
    </div>
  );
};
