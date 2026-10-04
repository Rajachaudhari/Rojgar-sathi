import React, { useEffect, useState } from 'react';
import { trainingApi } from '../services/trainingApi';
import { useAuth } from '../context/AuthContext';
import { MOCK_TRAINING_PROGRAMS } from '../data/mockData';
import { TrainingCard } from '../components/CardComponents';
import { TrainingProgram } from '../types';
import {
  GraduationCap,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Award
} from 'lucide-react';

export const TrainingPage: React.FC = () => {
  const { submitApplication } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [onlyROJGAR_SATHIFree, setOnlyROJGAR_SATHIFree] = useState<boolean>(false);
  const [programs, setPrograms] = useState<TrainingProgram[]>(MOCK_TRAINING_PROGRAMS);

  useEffect(() => {
    void trainingApi.getPrograms().then((res) => setPrograms(res.data)).catch(() => {});
  }, []);

  // Application Modal state
  const [selectedCourseForApply, setSelectedCourseForApply] = useState<TrainingProgram | null>(null);
  const [applySuccess, setApplySuccess] = useState<boolean>(false);

  const sectors = ['all', 'Green Energy / Renewables', 'Construction & Electrical', 'Apparel, Made-Ups & Home Furnishing', 'IT-ITeS / Digital Services', 'Agriculture & Allied', 'Automotive / EV'];
  const districts = ['all', 'Varanasi', 'Patna', 'Ranchi', 'Nagpur', 'Jaipur'];

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.jobRole.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector = selectedSector === 'all' || p.sector.includes(selectedSector);
    const matchesDistrict = selectedDistrict === 'all' || p.trainingCenter.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesFree = !onlyROJGAR_SATHIFree || p.freeUnderROJGAR_SATHI;

    return matchesSearch && matchesSector && matchesDistrict && matchesFree;
  });

  const handleApply = (program: TrainingProgram) => {
    setSelectedCourseForApply(program);
    setApplySuccess(false);
  };

  const confirmApplication = async () => {
    if (!selectedCourseForApply) return;
    await submitApplication({
      opportunityType: 'training',
      opportunityId: selectedCourseForApply.id,
      opportunityTitle: selectedCourseForApply.title,
      providerOrEmployer: selectedCourseForApply.trainingCenter.name,
      centerAddress: selectedCourseForApply.trainingCenter.address,
    });
    setApplySuccess(true);
    setTimeout(() => {
      setSelectedCourseForApply(null);
      setApplySuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <GraduationCap className="w-3.5 h-3.5 text-orange-400" />
            <span>National Skill Qualification Framework (NSQF) Aligned</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Rojgar Sathi Skill Training Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Fully sponsored government certified skill courses with monthly stipend, modern tool training, and assured placement assistance.
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
              placeholder="Search course title, job role, or industry sector..."
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
          <label className="flex items-center space-x-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={onlyROJGAR_SATHIFree}
              onChange={(e) => setOnlyROJGAR_SATHIFree(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span>Show Only 100% Free under Rojgar Sathi (with Stipend)</span>
          </label>

          <span className="text-slate-500">
            Showing <strong className="text-slate-800">{filteredPrograms.length}</strong> available batches
          </span>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <TrainingCard
            key={program.id}
            data={program}
            onApply={handleApply}
          />
        ))}
      </div>

      {/* Application Modal */}
      {selectedCourseForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {!applySuccess ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-blue-700" />
                    <h3 className="font-bold text-slate-900 text-base">
                      Confirm Free Course Enrollment
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCourseForApply(null)}
                    className="text-slate-400 hover:text-slate-700 font-bold p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-2 text-xs text-blue-950">
                  <h4 className="font-bold text-sm text-blue-900">
                    {selectedCourseForApply.title}
                  </h4>
                  <p><strong>Training Center:</strong> {selectedCourseForApply.trainingCenter.name}</p>
                  <p><strong>Address:</strong> {selectedCourseForApply.trainingCenter.address}</p>
                  <p><strong>Stipend:</strong> ₹{selectedCourseForApply.stipendAmount}/month during training</p>
                  <p><strong>Fee:</strong> ₹0 (Fully Sponsored under Rojgar Sathi)</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  By applying, your verified profile will be shared with the district skill coordinator for document verification and batch seat allocation.
                </p>

                <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedCourseForApply(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmApplication}
                    className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Confirm & Submit Application
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Application Submitted Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your seat reservation request has been submitted to {selectedCourseForApply.trainingCenter.name}. You can track status on your Progress Dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
