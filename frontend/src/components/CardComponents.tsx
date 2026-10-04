import React from 'react';
import {
  TrainingProgram,
  JobOpportunity,
  SelfEmploymentOpportunity,
  GovernmentScheme,
  SkillGapItem
} from '../types';
import { useAuth } from '../context/AuthContext';
import { MatchScoreBadge } from './MatchScoreBadge';
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  Clock,
  Award,
  IndianRupee,
  Building2,
  Users,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';

interface CardProps<T> {
  data: T;
  onApply?: (item: T) => void;
  onViewDetails?: (item: T) => void;
}

export const TrainingCard: React.FC<CardProps<TrainingProgram>> = ({ data, onApply, onViewDetails }) => {
  const { savedOpportunityIds, toggleSaveOpportunity } = useAuth();
  const isSaved = savedOpportunityIds.includes(data.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              NSQF Level {data.nsqfLevel}
            </span>
            {data.freeUnderROJGAR_SATHI && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>100% Free under Rojgar Sathi</span>
              </span>
            )}
            {data.stipendAvailable && (
              <span className="bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                ₹{data.stipendAmount}/mo Stipend
              </span>
            )}
          </div>

          <button
            onClick={() => toggleSaveOpportunity(data.id)}
            title={isSaved ? 'Remove from Saved' : 'Save Training'}
            className="text-slate-400 hover:text-orange-500 transition p-1"
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 text-orange-500 fill-orange-500" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
          {data.title}
        </h3>
        <p className="text-xs font-semibold text-slate-500 mb-3">{data.sector}</p>

        <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{data.trainingCenter.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {data.trainingCenter.district}, {data.trainingCenter.state} ({data.trainingCenter.distanceKm} km away)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{data.durationHours} Hours ({data.durationMonths} Months)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{data.certification}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <div className="flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Seats: <strong className="text-slate-800">{data.availableSeats}</strong> of {data.totalSeats} left</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Starts: <span className="font-semibold text-slate-700">{data.batchStartDate}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <a
          href={data.officialPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-500 hover:text-blue-700 flex items-center space-x-1 py-1"
        >
          <span>Official Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <div className="flex items-center space-x-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(data)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Details
            </button>
          )}
          <button
            onClick={() => onApply?.(data)}
            className="text-xs font-bold px-4 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition"
          >
            Apply Free
          </button>
        </div>
      </div>
    </div>
  );
};

export const JobCard: React.FC<CardProps<JobOpportunity>> = ({ data, onApply, onViewDetails }) => {
  const { savedOpportunityIds, toggleSaveOpportunity } = useAuth();
  const isSaved = savedOpportunityIds.includes(data.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <MatchScoreBadge
              score={data.matchPercentage}
              breakdown={data.matchBreakdown}
              whyMatches={data.whyMatches}
            />
          </div>
          <button
            onClick={() => toggleSaveOpportunity(data.id)}
            title={isSaved ? 'Remove from Saved' : 'Save Job'}
            className="text-slate-400 hover:text-orange-500 transition p-1"
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 text-orange-500 fill-orange-500" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
          {data.title}
        </h3>
        <p className="text-xs font-semibold text-slate-600 mb-2">{data.company}</p>

        <div className="flex items-center space-x-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{data.location.district}, {data.location.state} ({data.location.distanceKm} km)</span>
          </span>
          <span>•</span>
          <span className="font-semibold text-emerald-700 flex items-center">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{data.salaryMin.toLocaleString()} - {data.salaryMax.toLocaleString()}/{data.salaryPeriod}</span>
          </span>
        </div>

        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {data.requiredSkills.map((skill, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 text-[11px] text-emerald-900 mb-4">
          <p className="font-medium">
            <strong>Why it matches:</strong> {data.whyMatches[0] || 'Matches your vocational skill and preferred district location.'}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-400 font-medium">
          {data.vacancies} open openings • {data.employmentType}
        </span>

        <div className="flex items-center space-x-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(data)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Details
            </button>
          )}
          <button
            onClick={() => onApply?.(data)}
            className="text-xs font-bold px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export const SelfEmploymentCard: React.FC<CardProps<SelfEmploymentOpportunity>> = ({ data, onApply }) => {
  const { savedOpportunityIds, toggleSaveOpportunity } = useAuth();
  const isSaved = savedOpportunityIds.includes(data.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="bg-purple-50 text-purple-800 border border-purple-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-purple-600" />
            <span>Demand: {data.localMarketDemand}</span>
          </span>
          <button
            onClick={() => toggleSaveOpportunity(data.id)}
            className="text-slate-400 hover:text-orange-500 p-1"
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 text-orange-500 fill-orange-500" /> : <Bookmark className="w-5 h-5" />}
          </button>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-1">{data.businessTitle}</h3>
        <p className="text-xs font-medium text-slate-500 mb-2">{data.sector}</p>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">{data.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Est. Investment</span>
            <span className="font-bold text-slate-800">
              ₹{(data.initialInvestmentMin / 1000).toFixed(0)}k - ₹{(data.initialInvestmentMax / 1000).toFixed(0)}k
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Monthly Potential</span>
            <span className="font-bold text-emerald-700">₹{data.potentialMonthlyIncome.toLocaleString()}/mo</span>
          </div>
          <div className="col-span-2 pt-1 border-t border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Govt Subsidy Support</span>
            <span className="font-semibold text-blue-700">Up to {data.subsidyPercentage}% via Rojgar Sathi / Mudra</span>
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <span className="text-[11px] font-bold text-slate-700 block">Recommended Training:</span>
          <p className="text-xs text-slate-600 flex items-center space-x-1">
            <ChevronRight className="w-3 h-3 text-orange-500" />
            <span>{data.trainingRecommended}</span>
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          Schemes: {data.applicableSchemes[0]}
        </span>
        <button
          onClick={() => onApply?.(data)}
          className="text-xs font-bold px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition"
        >
          Get Startup Guidance
        </button>
      </div>
    </div>
  );
};

export const SchemeCard: React.FC<CardProps<GovernmentScheme>> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            {data.applicationMode}
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
            Central Scheme
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-1">{data.schemeName}</h3>
        <p className="text-xs font-medium text-slate-500 mb-3">{data.nodalMinistry}</p>

        <p className="text-xs text-slate-700 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
          {data.purpose}
        </p>

        <div className="space-y-2 mb-4 text-xs">
          <div>
            <strong className="text-slate-800 block text-[11px] uppercase tracking-wider mb-1">Key Benefits:</strong>
            <ul className="space-y-1 text-slate-600">
              {data.benefits.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <strong className="text-slate-800 block text-[11px] uppercase tracking-wider mb-1">Required Documents:</strong>
            <div className="flex flex-wrap gap-1">
              {data.requiredDocuments.map((doc, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded">
                  {doc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Source: Official Ministry Portal
        </span>
        <a
          href={data.officialPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold px-4 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition flex items-center space-x-1"
        >
          <span>Visit Official Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
