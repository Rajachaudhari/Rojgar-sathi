import React, { useEffect, useState } from 'react';
import { request } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import { MOCK_TRAINING_PROGRAMS, MOCK_JOBS, MOCK_SELF_EMPLOYMENT } from '../data/mockData';
import { TrainingCard, JobCard, SelfEmploymentCard } from '../components/CardComponents';
import {
  Sparkles,
  Sliders,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const { profile } = useAuth();

  // Configurable weights (Default: 30%, 20%, 15%, 15%, 10%, 10%)
  const [weights, setWeights] = useState({
    skills: 30,
    interest: 20,
    education: 15,
    location: 15,
    experience: 10,
    preference: 10,
  });

  const [activeTab, setActiveTab] = useState<'all' | 'training' | 'jobs' | 'self_employment'>('all');
  const [trainingPrograms, setTrainingPrograms] = useState(MOCK_TRAINING_PROGRAMS);
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [selfEmployment, setSelfEmployment] = useState(MOCK_SELF_EMPLOYMENT);

  useEffect(() => {
    void request<{ training: typeof MOCK_TRAINING_PROGRAMS; jobs: typeof MOCK_JOBS; selfEmployment: typeof MOCK_SELF_EMPLOYMENT }>('/recommendations')
      .then((data) => {
        setTrainingPrograms(data.training || MOCK_TRAINING_PROGRAMS);
        setJobs(data.jobs || MOCK_JOBS);
        setSelfEmployment(data.selfEmployment || MOCK_SELF_EMPLOYMENT);
      })
      .catch(() => { /* mock data remains as offline fallback */ });
  }, []);

  const resetWeights = () => {
    setWeights({
      skills: 30,
      interest: 20,
      education: 15,
      location: 15,
      experience: 10,
      preference: 10,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Multi-Factor AI Recommendation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Personalized Opportunity Recommendations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Powered by a transparent weighting algorithm tailored to candidate background, skills, district accessibility, and career goals.
          </p>
        </div>
      </div>

      {/* Configurable Weight Sliders Panel */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-blue-700" />
            <h3 className="font-bold text-slate-900 text-sm">
              Configure Recommendation Engine Weights
            </h3>
          </div>
          <button
            onClick={resetWeights}
            className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard Weights</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span>Skills Alignment</span>
              <span className="text-blue-700">{weights.skills}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={weights.skills}
              onChange={(e) => setWeights({ ...weights, skills: Number(e.target.value) })}
              className="w-full accent-blue-700"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span>Trade Interest</span>
              <span className="text-indigo-700">{weights.interest}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              value={weights.interest}
              onChange={(e) => setWeights({ ...weights, interest: Number(e.target.value) })}
              className="w-full accent-indigo-700"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span>Education</span>
              <span className="text-emerald-700">{weights.education}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.education}
              onChange={(e) => setWeights({ ...weights, education: Number(e.target.value) })}
              className="w-full accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span>Location / Distance</span>
              <span className="text-amber-700">{weights.location}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.location}
              onChange={(e) => setWeights({ ...weights, location: Number(e.target.value) })}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span>Experience</span>
              <span className="text-purple-700">{weights.experience}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              value={weights.experience}
              onChange={(e) => setWeights({ ...weights, experience: Number(e.target.value) })}
              className="w-full accent-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold text-slate-700 mb-1">
              <span>Mobility / WFH</span>
              <span className="text-teal-700">{weights.preference}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              value={weights.preference}
              onChange={(e) => setWeights({ ...weights, preference: Number(e.target.value) })}
              className="w-full accent-teal-600"
            />
          </div>
        </div>
      </div>

      {/* Pathway Tabs */}
      <div className="flex space-x-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'all'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All Recommendations
        </button>
        <button
          onClick={() => setActiveTab('training')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'training'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Training Programs ({trainingPrograms.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'jobs'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Local Wage Jobs ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab('self_employment')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'self_employment'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Micro-Enterprises ({selfEmployment.length})
        </button>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'all' || activeTab === 'training') &&
          trainingPrograms.slice(0, activeTab === 'all' ? 2 : 6).map((item) => (
            <TrainingCard key={item.id} data={item} />
          ))}

        {(activeTab === 'all' || activeTab === 'jobs') &&
          jobs.slice(0, activeTab === 'all' ? 2 : 6).map((item) => (
            <JobCard key={item.id} data={item} />
          ))}

        {(activeTab === 'all' || activeTab === 'self_employment') &&
          selfEmployment.slice(0, activeTab === 'all' ? 2 : 6).map((item) => (
            <SelfEmploymentCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
};
