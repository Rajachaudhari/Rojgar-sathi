import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const PostTrainingFollowUpPage: React.FC = () => {
  const { profile, updateMilestone } = useAuth();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    completedTraining: 'yes',
    receivedCertification: 'yes',
    currentlyEmployed: 'no',
    appliedForJobs: 'yes',
    needsAdditionalTraining: 'no',
    wantsSelfEmployment: 'yes',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    updateMilestone('training_completed', 'completed');
    updateMilestone('certificate_received', 'completed');
    if (answers.currentlyEmployed === 'yes') {
      updateMilestone('employment_achieved', 'completed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Post-Training Assessment & Placement Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Post-Training Follow-Up Counseling
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Tell us about your training completion, certification status, and whether you are ready for direct wage job interviews or micro-enterprise credit.
          </p>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Question 1: Completion */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              1. Did you successfully complete your enrolled skill training program?
            </label>
            <div className="flex gap-4 text-xs font-semibold">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="completed"
                  value="yes"
                  checked={answers.completedTraining === 'yes'}
                  onChange={() => setAnswers({ ...answers, completedTraining: 'yes' })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Yes, completed all required batch hours</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="completed"
                  value="no"
                  checked={answers.completedTraining === 'no'}
                  onChange={() => setAnswers({ ...answers, completedTraining: 'no' })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Still ongoing / Dropped out</span>
              </label>
            </div>
          </div>

          {/* Question 2: Certification */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              2. Have you received your official NSDC / Sector Skill Council Certificate?
            </label>
            <div className="flex gap-4 text-xs font-semibold">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="cert"
                  value="yes"
                  checked={answers.receivedCertification === 'yes'}
                  onChange={() => setAnswers({ ...answers, receivedCertification: 'yes' })}
                  className="text-emerald-600"
                />
                <span>Yes, received official certificate & marksheet</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="cert"
                  value="no"
                  checked={answers.receivedCertification === 'no'}
                  onChange={() => setAnswers({ ...answers, receivedCertification: 'no' })}
                  className="text-emerald-600"
                />
                <span>Awaiting assessment results</span>
              </label>
            </div>
          </div>

          {/* Question 3: Current Employment Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              3. Are you currently employed or earning regular livelihood income?
            </label>
            <div className="flex gap-4 text-xs font-semibold">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="employed"
                  value="yes"
                  checked={answers.currentlyEmployed === 'yes'}
                  onChange={() => setAnswers({ ...answers, currentlyEmployed: 'yes' })}
                  className="text-emerald-600"
                />
                <span>Yes, placed / working</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="employed"
                  value="no"
                  checked={answers.currentlyEmployed === 'no'}
                  onChange={() => setAnswers({ ...answers, currentlyEmployed: 'no' })}
                  className="text-emerald-600"
                />
                <span>No, actively seeking job or startup capital</span>
              </label>
            </div>
          </div>

          {/* Question 4: Self-employment interest */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              4. Would you like Rojgar Sathi capital subsidy guidance to start your own micro-enterprise?
            </label>
            <div className="flex gap-4 text-xs font-semibold">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="selfemp"
                  value="yes"
                  checked={answers.wantsSelfEmployment === 'yes'}
                  onChange={() => setAnswers({ ...answers, wantsSelfEmployment: 'yes' })}
                  className="text-emerald-600"
                />
                <span>Yes, connect me with District Social Welfare Office for ₹50,000 grant</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="selfemp"
                  value="no"
                  checked={answers.wantsSelfEmployment === 'no'}
                  onChange={() => setAnswers({ ...answers, wantsSelfEmployment: 'no' })}
                  className="text-emerald-600"
                />
                <span>Prefer wage job placement only</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Submit Follow-Up & Generate Next Steps
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md space-y-6 text-center animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Follow-Up Feedback Recorded Successfully!
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your certified status has been updated in the Rojgar Sathi beneficiary registry. Based on your answers, we have linked your profile to high-priority job placement drives and capital grant disbursements.
          </p>

          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={() => navigate('/jobs')}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Priority Jobs</span>
            </button>
            <button
              onClick={() => navigate('/self-employment')}
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Avail ₹50k Capital Subsidy</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
