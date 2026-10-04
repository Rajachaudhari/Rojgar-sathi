import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ListChecks,
  CheckCircle2,
  Clock,
  Circle,
  ArrowRight,
  Sparkles,
  Award,
  HelpCircle
} from 'lucide-react';

export const ProgressTrackingPage: React.FC = () => {
  const { milestones, updateMilestone } = useAuth();

  const handleAdvanceNextMilestone = () => {
    const nextPending = milestones.find(m => m.status === 'in_progress' || m.status === 'pending');
    if (nextPending) {
      updateMilestone(nextPending.key, 'completed');
      const nextIndex = milestones.findIndex(m => m.key === nextPending.key) + 1;
      if (nextIndex < milestones.length) {
        updateMilestone(milestones[nextIndex].key, 'in_progress');
      }
    }
  };

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <ListChecks className="w-3.5 h-3.5 text-orange-400" />
            <span>Training-to-Employment Milestone Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Beneficiary Progress & Pathway Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time tracking from initial vocational counseling to official certification, employer interview, and verified employment placement.
          </p>
        </div>
      </div>

      {/* Overall Progress Metric Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Overall Livelihood Pipeline Progress
            </h3>
            <p className="text-xs text-slate-500">
              {completedCount} of {milestones.length} milestones successfully accomplished
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAdvanceNextMilestone}
              className="text-xs font-bold px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 rounded-xl transition"
            >
              Simulate Next Milestone
            </button>
            <span className="text-xl font-black text-blue-900">{progressPercent}%</span>
          </div>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-700 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Milestones Vertical Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 text-base">
          Milestone Progression:
        </h3>

        <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {milestones.map((m) => {
            const isCompleted = m.status === 'completed';
            const isInProgress = m.status === 'in_progress';

            return (
              <div key={m.key} className="relative flex items-start space-x-4 group">
                {/* Timeline Icon Marker */}
                <div
                  className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isInProgress
                      ? 'bg-orange-500 text-white animate-pulse ring-orange-200'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isInProgress ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <span>{m.step}</span>
                  )}
                </div>

                {/* Milestone Details */}
                <div className="flex-1 bg-slate-50 hover:bg-blue-50/40 border border-slate-200 rounded-2xl p-4 transition">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">{m.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{m.description}</p>
                  {m.completedDate && (
                    <span className="text-[10px] text-slate-400 mt-2 block font-medium">
                      Accomplished on: {m.completedDate}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post-Training Follow-Up Survey Banner (Requirement 28) */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Post-Training Follow-Up & Employment Survey</span>
          </div>
          <p className="text-xs text-emerald-950">
            Completed your training? Let AI know if you received certification, need placement assistance, or want self-employment credit.
          </p>
        </div>

        <Link
          to="/post-training-followup"
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 shrink-0"
        >
          <span>Take AI Follow-up Survey</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
