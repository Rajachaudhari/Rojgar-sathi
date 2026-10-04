import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onClose, onAccept }) => {
  const [shareWithTrainingCenters, setShareWithTrainingCenters] = useState(true);
  const [shareWithJobEmployers, setShareWithJobEmployers] = useState(true);
  const [shareWithGovtSchemes, setShareWithGovtSchemes] = useState(true);
  const [allowAiVoiceAnalysis, setAllowAiVoiceAnalysis] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Beneficiary Consent & Privacy Declaration
            </h3>
            <p className="text-xs text-slate-500">
              Under Rojgar Sathi & Digital Personal Data Protection (DPDP) Act Guidelines
            </p>
          </div>
        </div>

        <div className="my-5 space-y-4 max-h-[55vh] overflow-y-auto pr-2 text-xs text-slate-600 leading-relaxed">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-blue-900 flex items-start space-x-2.5">
            <Lock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <p>
              Your personal, skill, and location data is safeguarded by the <strong>Ministry of Social Justice & Empowerment</strong>. We only use authorized APIs to fetch official training courses, vacancies, and financial subsidies.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1.5 flex items-center space-x-1.5">
              <span>1. What information is collected?</span>
            </h4>
            <p>
              Basic identity (name, age, gender, district/block, contact mobile), educational attainment, traditional/family trade background, work experience, vocational preferences, and voice recordings submitted during AI conversation.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1.5 flex items-center space-x-1.5">
              <span>2. Why is this collected & How does AI use it?</span>
            </h4>
            <p>
              The AI Livelihood Assistant analyzes your profile to identify skill gaps, evaluate suitability for NSQF-aligned skill programs, calculate matching jobs, and identify micro-enterprise subsidy schemes under Rojgar Sathi and allied missions.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1.5 flex items-center space-x-1.5">
              <span>3. Data Sharing & Authorized Partners</span>
            </h4>
            <p>
              Only strictly necessary data is shared via secure authorized APIs with verified Training Providers (PMKK/RSETI), accredited MSDE centers, National Career Service (NCS) employers, and District Welfare Offices for grant disbursement.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              Manage Granular Sharing Preferences:
            </h5>

            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={shareWithTrainingCenters}
                onChange={e => setShareWithTrainingCenters(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700">
                Share profile with verified Rojgar Sathi skill training centers when I request enrollment
              </span>
            </label>

            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={shareWithJobEmployers}
                onChange={e => setShareWithJobEmployers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700">
                Share skills summary with certified employers on National Career Service
              </span>
            </label>

            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={shareWithGovtSchemes}
                onChange={e => setShareWithGovtSchemes(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700">
                Verify eligibility for Rojgar Sathi capital grants & Mudra loans with District Welfare Offices
              </span>
            </label>

            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={allowAiVoiceAnalysis}
                onChange={e => setAllowAiVoiceAnalysis(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700">
                Allow AI voice processing to assist me in my regional Indian language/dialect
              </span>
            </label>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1.5">4. Your Rights</h4>
            <p>
              You may modify your profile, view which programs have accessed your records, download your assessment report, or withdraw consent at any time from your Profile settings.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-slate-50 transition"
          >
            Review Later / Cancel
          </button>

          <button
            onClick={() => {
              onAccept();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-lg shadow-blue-700/20 transition flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Accept & Continue to AI Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
};
