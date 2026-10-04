import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_TRAINING_PROGRAMS, MOCK_JOBS, MOCK_SCHEMES, MOCK_SELF_EMPLOYMENT } from '../data/mockData';
import { TrainingCard, JobCard, SchemeCard, SelfEmploymentCard } from '../components/CardComponents';
import { BookmarkCheck, ArrowRight } from 'lucide-react';

export const SavedOpportunitiesPage: React.FC = () => {
  const { savedOpportunityIds } = useAuth();

  const savedTrainings = MOCK_TRAINING_PROGRAMS.filter(t => savedOpportunityIds.includes(t.id));
  const savedJobs = MOCK_JOBS.filter(j => savedOpportunityIds.includes(j.id));
  const savedSchemes = MOCK_SCHEMES.filter(s => savedOpportunityIds.includes(s.id));
  const savedSelfEmployment = MOCK_SELF_EMPLOYMENT.filter(se => savedOpportunityIds.includes(se.id));

  const totalSaved = savedTrainings.length + savedJobs.length + savedSchemes.length + savedSelfEmployment.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <BookmarkCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>Candidate Saved Opportunities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bookmarked Courses & Livelihood Options
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Review your shortlisted skill programs, jobs, schemes, and business ideas saved for future application.
          </p>
        </div>
      </div>

      {totalSaved > 0 ? (
        <div className="space-y-8">
          {savedTrainings.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Saved Training Programs ({savedTrainings.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTrainings.map(t => (
                  <TrainingCard key={t.id} data={t} />
                ))}
              </div>
            </div>
          )}

          {savedJobs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Saved Job Vacancies ({savedJobs.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.map(j => (
                  <JobCard key={j.id} data={j} />
                ))}
              </div>
            </div>
          )}

          {savedSelfEmployment.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Saved Micro-Enterprises ({savedSelfEmployment.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedSelfEmployment.map(se => (
                  <SelfEmploymentCard key={se.id} data={se} />
                ))}
              </div>
            </div>
          )}

          {savedSchemes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Saved Government Schemes ({savedSchemes.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedSchemes.map(s => (
                  <SchemeCard key={s.id} data={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No saved opportunities yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any training, job, or scheme card to save it here for fast access.
          </p>
          <Link
            to="/training"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};
