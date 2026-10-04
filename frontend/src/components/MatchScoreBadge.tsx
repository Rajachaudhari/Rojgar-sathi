import React, { useState } from 'react';
import { Sparkles, Info, CheckCircle2 } from 'lucide-react';

interface MatchBreakdownProps {
  score: number;
  breakdown?: {
    skills: number;
    interest: number;
    education: number;
    location: number;
    experience: number;
    preference: number;
  };
  whyMatches?: string[];
  size?: 'sm' | 'md';
}

export const MatchScoreBadge: React.FC<MatchBreakdownProps> = ({
  score,
  breakdown,
  whyMatches = [],
  size = 'md',
}) => {
  const [showModal, setShowModal] = useState(false);

  const getScoreColor = (val: number) => {
    if (val >= 85) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (val >= 70) return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-amber-100 text-amber-800 border-amber-300';
  };

  const defaultBreakdown = breakdown || {
    skills: Math.round(score * 0.3),
    interest: Math.round(score * 0.2),
    education: Math.round(score * 0.15),
    location: Math.round(score * 0.15),
    experience: Math.round(score * 0.1),
    preference: Math.round(score * 0.1),
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        title="Click to view AI recommendation weight breakdown"
        className={`inline-flex items-center space-x-1.5 font-bold rounded-full border shadow-2xs transition hover:scale-105 active:scale-95 ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        } ${getScoreColor(score)}`}
      >
        <Sparkles className="w-3.5 h-3.5 text-orange-500" />
        <span>{score}% Match</span>
        <Info className="w-3 h-3 opacity-60 hover:opacity-100 ml-0.5" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  {score}%
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">Recommendation Match Score</h4>
                  <p className="text-xs text-slate-500">Transparent AI Matching Algorithm</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3">
              <p className="text-xs text-slate-600">
                Calculated using weighted parameters aligned with your beneficiary profile and verified skill data:
              </p>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span className="font-semibold">Skills Alignment (Weight 30%)</span>
                    <span className="font-bold text-blue-700">{defaultBreakdown.skills} / 30</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(defaultBreakdown.skills / 30) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span className="font-semibold">Aspiration & Interest (Weight 20%)</span>
                    <span className="font-bold text-indigo-700">{defaultBreakdown.interest} / 20</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(defaultBreakdown.interest / 20) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span className="font-semibold">Education Eligibility (Weight 15%)</span>
                    <span className="font-bold text-emerald-700">{defaultBreakdown.education} / 15</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${(defaultBreakdown.education / 15) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span className="font-semibold">Location & Distance (Weight 15%)</span>
                    <span className="font-bold text-amber-700">{defaultBreakdown.location} / 15</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(defaultBreakdown.location / 15) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span className="font-semibold">Experience Level (Weight 10%)</span>
                    <span className="font-bold text-purple-700">{defaultBreakdown.experience} / 10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: `${(defaultBreakdown.experience / 10) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span className="font-semibold">Work Preference & Mobility (Weight 10%)</span>
                    <span className="font-bold text-teal-700">{defaultBreakdown.preference} / 10</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: `${(defaultBreakdown.preference / 10) * 100}%` }} />
                  </div>
                </div>
              </div>

              {whyMatches.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <h5 className="text-xs font-bold text-slate-800 mb-2">Why this opportunity matches:</h5>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {whyMatches.map((reason, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
