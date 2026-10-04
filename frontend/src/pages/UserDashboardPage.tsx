import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  MOCK_TRAINING_PROGRAMS,
  MOCK_JOBS,
  MOCK_SELF_EMPLOYMENT,
  MOCK_SCHEMES,
  MOCK_LOCAL_CLUSTERS
} from '../data/mockData';
import { TrainingCard, JobCard, SelfEmploymentCard } from '../components/CardComponents';
import {
  User,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Landmark,
  ArrowRight,
  Sparkles,
  Award,
  AlertTriangle,
  MapPin,
  ListChecks,
  CheckCircle2,
  BookmarkCheck,
  FileText
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user, profile, applications, savedOpportunityIds } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const userCluster = MOCK_LOCAL_CLUSTERS.find(c => c.district.toLowerCase() === user?.location.district.toLowerCase()) || MOCK_LOCAL_CLUSTERS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. Welcome & Primary Recommended CTA */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Beneficiary Dashboard • Rojgar Sathi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Namaste, {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Your personalized livelihood pathway is active. Review your verified skill level, critical gaps to bridge, and top matching opportunities.
          </p>
        </div>

        {/* Clear Primary Recommended Next Step CTA */}
        <div className="bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-xs space-y-3 w-full lg:w-80">
          <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block">
            Recommended Next Step
          </span>
          <h3 className="font-bold text-sm text-white leading-snug">
            Enroll in Suryamitra Solar PV Installer Course
          </h3>
          <p className="text-xs text-slate-300">
            100% Free under Rojgar Sathi with ₹1,500/mo stipend at Varanasi Skill Hub.
          </p>
          <button
            onClick={() => navigate('/training')}
            className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2"
          >
            <span>Start Recommended Training</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Candidate Profile & Skill Baseline Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Education & Experience */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Education & Background
            </span>
            <h4 className="font-bold text-slate-900 text-base">{profile.education}</h4>
            <p className="text-xs text-slate-500">
              {profile.workExperienceYears > 0 ? `${profile.workExperienceYears} yr experience` : 'Fresher / Learner'} • {profile.currentOccupation}
            </p>
          </div>

          {/* Location */}
          <div className="pt-4 md:pt-0 md:pl-6 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Home District Location
            </span>
            <h4 className="font-bold text-slate-900 text-base flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>{user?.location.district}, {user?.location.state}</span>
            </h4>
            <p className="text-xs text-slate-500">
              Commute preference: Up to {profile.mobilityConstraints.maxTravelDistanceKm} km
            </p>
          </div>

          {/* Current Skill Level */}
          <div className="pt-4 md:pt-0 md:pl-6 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Verified Skill Level
            </span>
            <h4 className="font-bold text-blue-700 text-base flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-blue-600" />
              <span>{profile.currentSkillLevel}</span>
            </h4>
            <p className="text-xs text-slate-500">
              Assessment Score: <strong>82%</strong>
            </p>
          </div>

          {/* Quick Stats / Action Links */}
          <div className="pt-4 md:pt-0 md:pl-6 flex flex-col justify-center space-y-2">
            <Link
              to="/applications"
              className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-700"
            >
              <span>Submitted Applications:</span>
              <strong className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{applications.length}</strong>
            </Link>
            <Link
              to="/saved"
              className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-orange-700"
            >
              <span>Saved Opportunities:</span>
              <strong className="text-orange-700 bg-orange-50 px-2 py-0.5 rounded">{savedOpportunityIds.length}</strong>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Skill Gaps Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-amber-950 text-base">
              Identified Skill Gaps for Target Career (Solar PV Technician)
            </h3>
          </div>
          <Link
            to="/skill-gaps"
            className="text-xs font-bold text-amber-900 hover:underline flex items-center space-x-1"
          >
            <span>Full Gap Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            'Solar PV Array Mounting & Civil Anchoring',
            'Inverter Grid Synchronization & Testing',
            'Electrical Safety Code & Earthing Norms'
          ].map((gap, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border border-amber-200 text-xs font-semibold text-slate-800 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>{gap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Top Recommended Training Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Top Recommended Training Courses
            </h3>
            <p className="text-xs text-slate-500">
              Courses matched to bridge your identified skill gaps.
            </p>
          </div>
          <Link to="/training" className="text-xs font-bold text-blue-700 hover:underline">
            View All ({MOCK_TRAINING_PROGRAMS.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TRAINING_PROGRAMS.slice(0, 3).map((item) => (
            <TrainingCard key={item.id} data={item} />
          ))}
        </div>
      </div>

      {/* 5. Top Recommended Jobs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Top Matching Job Vacancies
            </h3>
            <p className="text-xs text-slate-500">
              Direct employer openings with high match scores in your district.
            </p>
          </div>
          <Link to="/jobs" className="text-xs font-bold text-blue-700 hover:underline">
            View All ({MOCK_JOBS.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_JOBS.slice(0, 3).map((item) => (
            <JobCard key={item.id} data={item} />
          ))}
        </div>
      </div>

      {/* 6. Self-Employment & Micro-Enterprise Support */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Self-Employment & Enterprise Options
            </h3>
            <p className="text-xs text-slate-500">
              Vetted business models supported with 50% Rojgar Sathi capital subsidy.
            </p>
          </div>
          <Link to="/self-employment" className="text-xs font-bold text-blue-700 hover:underline">
            View All ({MOCK_SELF_EMPLOYMENT.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_SELF_EMPLOYMENT.slice(0, 2).map((item) => (
            <SelfEmploymentCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
