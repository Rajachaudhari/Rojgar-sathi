import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, Save } from 'lucide-react';

export const ConsentPage: React.FC = () => {
  const { hasConsented, grantConsent, revokeConsent } = useAuth();
  const [shareWithTraining, setShareWithTraining] = useState(true);
  const [shareWithEmployers, setShareWithEmployers] = useState(true);
  const [shareWithSchemes, setShareWithSchemes] = useState(true);
  const [voiceAnalysis, setVoiceAnalysis] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    grantConsent({ shareWithTraining, shareWithEmployers, shareWithSchemes, voiceAnalysis });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>Digital Personal Data Protection (DPDP) Act Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Beneficiary Consent & Data Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Control how your vocational details, assessment answers, and voice inputs are used and shared with authorized institutional entities.
          </p>
        </div>
      </div>

      {savedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold p-4 rounded-2xl flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Consent preferences successfully saved and stored in audit log!</span>
        </div>
      )}

      {/* DPDP Policy Declarations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-900 flex items-start space-x-3">
            <Lock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Protected Government Data Principles</h4>
              <p className="mt-1 text-xs">
                Under Rojgar Sathi, the platform operates under strict data minimization. Your personal identity numbers (Aadhaar/Ration Card) are never broadcast publicly and are transmitted only over encrypted authorized API bridges.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 text-sm">1. Purpose of Data Processing</h3>
            <p>
              Data is collected solely to evaluate vocational competencies, diagnose skill gaps against NSQF job roles, match candidates to free training programs, recommend salary jobs on National Career Service, and determine eligibility for capital grants.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 text-sm">2. AI Voice & Conversation Logs</h3>
            <p>
              Audio recordings submitted during voice sessions are converted into encrypted text representations to detect education, trades, and preferences in your mother tongue. Audio is not sold or shared with commercial advertising brokers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 text-sm">3. Authorized Partner Sharing Controls</h3>
            <p>
              Manage which verified institutions have permission to view your verified skill summary:
            </p>
          </div>
        </div>

        {/* Granular Permission Toggles */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={shareWithTraining}
              onChange={(e) => setShareWithTraining(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5 focus:ring-blue-500"
            />
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Accredited Skill Training Centers (PMKK / RSETI / NSDC)
              </span>
              <span className="text-[11px] text-slate-500">
                Allows batch center managers to verify eligibility and confirm batch seat reservations.
              </span>
            </div>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={shareWithEmployers}
              onChange={(e) => setShareWithEmployers(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5 focus:ring-blue-500"
            />
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                National Career Service (NCS) Certified Employers
              </span>
              <span className="text-[11px] text-slate-500">
                Shares skill match percentage with verified employers when you apply for local wage jobs.
              </span>
            </div>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={shareWithSchemes}
              onChange={(e) => setShareWithSchemes(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5 focus:ring-blue-500"
            />
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                District Social Welfare & Micro-Enterprise Officers
              </span>
              <span className="text-[11px] text-slate-500">
                Permits checking criteria for Rojgar Sathi 50% capital subsidies and PM Vishwakarma toolkits.
              </span>
            </div>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={voiceAnalysis}
              onChange={(e) => setVoiceAnalysis(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5 focus:ring-blue-500"
            />
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                Multilingual AI Voice Processing
              </span>
              <span className="text-[11px] text-slate-500">
                Enables natural speech understanding across regional dialects and speech-to-text response synthesis.
              </span>
            </div>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={revokeConsent}
            className="text-xs font-bold text-red-600 hover:text-red-800"
          >
            Revoke All Consent
          </button>

          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Consent Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
