import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, PhoneCall, Mail, ExternalLink, Sparkles, HeartHandshake, FileCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs mt-16">
      {/* Top Banner Notice */}
      <div className="bg-slate-950 py-3 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t('officialNotice')}</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Integrated via authorized mock API adapters ready for NSDC, NCS & Rojgar Sathi MIS data endpoints.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Institutional Identity */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base text-white tracking-tight">
                  Rojgar Sathi — AI Livelihood Assistant
                </span>
                <p className="text-[10px] text-orange-400 font-medium">
                  {t('govMinistry')}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An AI-powered, multilingual, voice-first livelihood assistance platform helping beneficiaries identify skills, bridge skill gaps, and access NSQF training, jobs, and enterprise subsidies.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toll-Free National Helpline: <strong>1800-11-2001</strong> (Mon-Sat, 9AM-6PM)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Support Desk: <strong>support@rojgarsathi.local</strong></span>
              </div>
            </div>
          </div>

          {/* Column 2: Opportunities & Pathways */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Livelihood Pathways
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/training" className="hover:text-white transition">NSQF Skill Training</Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-white transition">Local Wage Jobs</Link>
              </li>
              <li>
                <Link to="/self-employment" className="hover:text-white transition">Micro-Enterprise Subsidies</Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-white transition">Government Schemes</Link>
              </li>
              <li>
                <Link to="/local-market" className="hover:text-white transition">District Demand Clusters</Link>
              </li>
              <li>
                <Link to="/skill-gaps" className="hover:text-white transition">Skill Gap Analyzer</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Multi-Channel Access */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Assistance Channels
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/assistant" className="hover:text-white transition">Voice AI Counselor</Link>
              </li>
              <li>
                <Link to="/kiosk" className="hover:text-white transition">Panchayat Kiosk Mode</Link>
              </li>
              <li>
                <Link to="/ivr" className="hover:text-white transition">Toll-Free IVR Simulator</Link>
              </li>
              <li>
                <Link to="/whatsapp" className="hover:text-white transition">WhatsApp Voice Notes</Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-white transition">Vocational Assessment</Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-white transition">Tracking Pipeline</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional & Privacy */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Governance & Safety
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/consent" className="hover:text-white transition">Consent & Data Privacy</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About Rojgar Sathi</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">Help & Grievance FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">District Nodal Officers</Link>
              </li>
              <li>
                <Link to="/admin" className="text-orange-400 hover:text-orange-300 font-semibold transition">
                  Institutional Admin Portal
                </Link>
              </li>
              <li>
                <a
                  href="https://rojgar-sathi.dosje.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-slate-400 hover:text-white transition"
                >
                  <span>MoSJE Rojgar Sathi Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Advisory Legal Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Advisory Disclaimer:</strong> The Rojgar Sathi — AI Livelihood Assistant provides recommendations based on candidate inputs, vocational profile attributes, and real-time skill matching algorithms. These recommendations are advisory in nature. Formal admission, course fee waivers, stipends, job selection, and credit subsidy sanctions are strictly subject to verification of candidate documents by respective district welfare authorities and training partners.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
            <span>
              © 2026 Rojgar Sathi AI Livelihood Assistance Platform. Ministry of Social Justice & Empowerment, Govt. of India.
            </span>
            <div className="flex space-x-4">
              <Link to="/consent" className="hover:underline">Privacy Policy</Link>
              <Link to="/consent" className="hover:underline">Terms of Consent</Link>
              <Link to="/faq" className="hover:underline">Accessibility Statement</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
