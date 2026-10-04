import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_SKILL_GAPS, MOCK_TRAINING_PROGRAMS } from '../data/mockData';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  Check
} from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [selectedGapId, setSelectedGapId] = useState<string>(MOCK_SKILL_GAPS[0].id);

  const currentGap = MOCK_SKILL_GAPS.find(g => g.id === selectedGapId) || MOCK_SKILL_GAPS[0];

  const matchedCourses = MOCK_TRAINING_PROGRAMS.filter(c =>
    currentGap.recommendedCourseIds.includes(c.id) ||
    c.sector.toLowerCase().includes(currentGap.targetSector.toLowerCase().split('/')[0].trim())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
            <span>Target Career Pathway & Gap Analyzer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Skill Gap & Competency Bridge Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Compare your verified existing skills against official NSQF requirements for high-growth target occupations in your state.
          </p>
        </div>
      </div>

      {/* Target Career Tabs */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Select Target Career Role:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MOCK_SKILL_GAPS.map((gap) => {
            const isSelected = gap.id === selectedGapId;
            return (
              <button
                key={gap.id}
                onClick={() => setSelectedGapId(gap.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 shadow-2xs ${
                  isSelected
                    ? 'border-blue-700 bg-blue-50/70 ring-2 ring-blue-700/20 shadow-md'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                  {gap.targetSector}
                </span>
                <h3 className={`text-sm font-bold ${isSelected ? 'text-blue-950' : 'text-slate-800'}`}>
                  {gap.targetRole}
                </h3>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Readiness:</span>
                  <span className={`font-bold ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                    {gap.readinessPercentage}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Analysis Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {currentGap.targetRole}
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                NSQF Level 4
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Sector: <strong>{currentGap.targetSector}</strong> • Est. Training Needed: <strong>{currentGap.estimatedTrainingHours} Hours</strong>
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Current Competency Match</span>
              <span className="text-2xl font-black text-blue-900">{currentGap.readinessPercentage}%</span>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-orange-500 border-r-blue-600 flex items-center justify-center font-bold text-xs text-slate-700">
              Gap: {100 - currentGap.readinessPercentage}%
            </div>
          </div>
        </div>

        {/* Readiness Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Overall Readiness Progress</span>
            <span>{currentGap.readinessPercentage}% of required skills mastered</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-700 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${currentGap.readinessPercentage}%` }}
            />
          </div>
        </div>

        {/* Side by Side: Existing Skills vs Missing Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Possessed Skills */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Skills You Currently Have ({currentGap.userCurrentSkills.length})</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              These competencies were recognized from your profile and baseline assessment:
            </p>

            <ul className="space-y-2">
              {currentGap.userCurrentSkills.map((sk, idx) => (
                <li
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-emerald-200 text-xs font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{sk}</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    Mastered
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Skill Gaps to Bridge */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center space-x-2 text-amber-950 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Critical Skill Gaps to Bridge ({currentGap.missingSkills.length})</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              These are specific industry-certified modules needed to qualify for placement:
            </p>

            <ul className="space-y-2">
              {currentGap.missingSkills.map((sk, idx) => (
                <li
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-amber-200 text-xs font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>{sk}</span>
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                    Required Gap
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Course to Bridge this Exact Gap */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
            <BookOpen className="w-5 h-5 text-blue-700" />
            <span>Recommended Training Program to Close this Skill Gap:</span>
          </div>

          {matchedCourses.slice(0, 1).map((course) => (
            <div
              key={course.id}
              className="bg-blue-50/60 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200">
                  100% Free under Rojgar Sathi • NSQF Level {course.nsqfLevel}
                </span>
                <h4 className="text-base font-bold text-slate-900">{course.title}</h4>
                <p className="text-xs text-slate-600">
                  {course.trainingCenter.name} ({course.trainingCenter.district}, {course.trainingCenter.distanceKm} km away)
                </p>
                <div className="flex items-center space-x-3 text-xs text-slate-500 pt-1">
                  <span>Duration: {course.durationHours} Hours ({course.durationMonths} Months)</span>
                  <span>•</span>
                  <span>Stipend: ₹{course.stipendAmount}/mo</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/training')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-2 shrink-0"
              >
                <span>Enroll in Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
