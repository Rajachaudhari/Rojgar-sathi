import React, { useEffect, useState } from 'react';
import { jobApi } from '../services/jobApi';
import { useAuth } from '../context/AuthContext';
import { MOCK_JOBS } from '../data/mockData';
import { JobCard } from '../components/CardComponents';
import { JobOpportunity } from '../types';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  MapPin,
  IndianRupee
} from 'lucide-react';

export const JobsPage: React.FC = () => {
  const { submitApplication } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [minMatch, setMinMatch] = useState<number>(75);
  const [jobs, setJobs] = useState<JobOpportunity[]>(MOCK_JOBS);

  useEffect(() => {
    void jobApi.getJobs().then((res) => setJobs(res.data)).catch(() => {});
  }, []);

  const [selectedJobForApply, setSelectedJobForApply] = useState<JobOpportunity | null>(null);
  const [applySuccess, setApplySuccess] = useState<boolean>(false);

  const sectors = ['all', 'Green Energy / Electrical', 'IT-ITeS & Citizen Services', 'Apparel & Textiles', 'Logistics & Supply Chain', 'Automotive & EV'];
  const districts = ['all', 'Varanasi', 'Patna', 'Ranchi', 'Nagpur', 'Jaipur'];

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSector = selectedSector === 'all' || j.sector.includes(selectedSector);
    const matchesDistrict = selectedDistrict === 'all' || j.location.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesScore = j.matchPercentage >= minMatch;

    return matchesSearch && matchesSector && matchesDistrict && matchesScore;
  });

  const handleApply = (job: JobOpportunity) => {
    setSelectedJobForApply(job);
    setApplySuccess(false);
  };

  const confirmApplication = async () => {
    if (!selectedJobForApply) return;
    await submitApplication({
      opportunityType: 'job',
      opportunityId: selectedJobForApply.id,
      opportunityTitle: selectedJobForApply.title,
      providerOrEmployer: selectedJobForApply.company,
      centerAddress: `${selectedJobForApply.location.district}, ${selectedJobForApply.location.state}`,
    });
    setApplySuccess(true);
    setTimeout(() => {
      setSelectedJobForApply(null);
      setApplySuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>National Career Service & Rojgar Sathi Employer Linkages</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Personalized Wage Employment Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real jobs with transparent match scoring based on your verified skills, education, local commute boundary, and employment preferences.
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job title, employer, or required skills..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full md:w-48 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Sectors</option>
              {sectors.filter(s => s !== 'all').map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full md:w-40 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All Districts</option>
              {districts.filter(d => d !== 'all').map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-600">Minimum AI Match:</span>
            <div className="flex space-x-1.5">
              {[70, 80, 85].map((val) => (
                <button
                  key={val}
                  onClick={() => setMinMatch(val)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    minMatch === val
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {val}%+
                </button>
              ))}
            </div>
          </div>

          <span className="text-slate-500">
            Showing <strong className="text-slate-800">{filteredJobs.length}</strong> matching vacancies
          </span>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            data={job}
            onApply={handleApply}
          />
        ))}
      </div>

      {/* Job Apply Modal */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {!applySuccess ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-slate-900 text-base">
                      Submit Job Application
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedJobForApply(null)}
                    className="text-slate-400 hover:text-slate-700 font-bold p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-100 space-y-2 text-xs text-orange-950">
                  <h4 className="font-bold text-sm text-slate-900">{selectedJobForApply.title}</h4>
                  <p><strong>Employer:</strong> {selectedJobForApply.company}</p>
                  <p><strong>Location:</strong> {selectedJobForApply.location.district} ({selectedJobForApply.location.distanceKm} km away)</p>
                  <p><strong>Salary Range:</strong> ₹{selectedJobForApply.salaryMin.toLocaleString()} - ₹{selectedJobForApply.salaryMax.toLocaleString()}/{selectedJobForApply.salaryPeriod}</p>
                  <p><strong>Match Score:</strong> {selectedJobForApply.matchPercentage}% Alignment</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Your profile and assessment scores will be submitted directly to {selectedJobForApply.company} via the National Career Service API adapter.
                </p>

                <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedJobForApply(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmApplication}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Confirm & Send Application
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Application Sent Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your application for {selectedJobForApply.title} at {selectedJobForApply.company} has been queued. You can review updates in your Progress Dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
