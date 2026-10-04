import React from 'react';
import { ShieldCheck, Target, Award, Users, Landmark, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
          <Landmark className="w-3.5 h-3.5 text-orange-400" />
          <span>Ministry of Social Justice & Empowerment, Govt. of India</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          About Rojgar Sathi (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          A merged centrally sponsored scheme launched by the Government of India aiming to reduce poverty among Scheduled Caste (SC) communities through skill development, livelihood generation, and village infrastructure enhancement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Key Mission Objectives</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Provide 100% free NSQF-aligned skill training with stipends, generate wage jobs, and offer non-refundable capital subsidies up to ₹50,000 for viable micro-enterprises.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Why the AI Livelihood Assistant?</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rural beneficiaries often struggle with complex English portals. This platform brings voice-first AI understanding in 10 Indian languages to map individual skills to market demand.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Official Partner Networks</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Integrated with National Skill Development Corporation (NSDC), National Career Service (NCS), PMKK centers, and State SC Development Corporations.
          </p>
        </div>
      </div>
    </div>
  );
};
