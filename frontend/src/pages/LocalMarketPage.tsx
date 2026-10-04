import React, { useState } from 'react';
import { MOCK_LOCAL_CLUSTERS, MOCK_TRAINING_PROGRAMS, MOCK_JOBS } from '../data/mockData';
import {
  MapPin,
  Building2,
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const LocalMarketPage: React.FC = () => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>(MOCK_LOCAL_CLUSTERS[0].id);

  const currentCluster = MOCK_LOCAL_CLUSTERS.find(c => c.id === selectedClusterId) || MOCK_LOCAL_CLUSTERS[0];

  const nearbyTraining = MOCK_TRAINING_PROGRAMS.filter(t =>
    t.trainingCenter.district.toLowerCase() === currentCluster.district.toLowerCase()
  );

  const nearbyJobs = MOCK_JOBS.filter(j =>
    j.location.district.toLowerCase() === currentCluster.district.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>District Industrial Cluster & Geospatial Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Local District Market & Demand Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time assessment of local industries, fast-growing trade occupations, accredited training centers, and open vacancies within your home district.
          </p>
        </div>
      </div>

      {/* District Selector Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Select District Market Cluster:
        </label>
        <div className="flex flex-wrap gap-2">
          {MOCK_LOCAL_CLUSTERS.map((cl) => {
            const isSelected = cl.id === selectedClusterId;
            return (
              <button
                key={cl.id}
                onClick={() => setSelectedClusterId(cl.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-2xs ${
                  isSelected
                    ? 'bg-blue-700 text-white ring-2 ring-blue-600/30 shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-slate-400'}`} />
                <span>{cl.district}, {cl.state}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Analysis Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Map Visualization */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-700" />
              <h3 className="font-bold text-slate-900 text-sm">
                Geospatial Market Map: {currentCluster.district} Hub
              </h3>
            </div>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
              OpenStreetMap / GIS Feed
            </span>
          </div>

          {/* Map Simulation Graphic */}
          <div className="relative w-full h-80 rounded-2xl bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-200 border border-slate-200 overflow-hidden flex items-center justify-center">
            {/* Visual Grid Lines simulating a GIS map */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Concentric Commute Radius Circles */}
            <div className="w-64 h-64 rounded-full border-2 border-dashed border-blue-400/40 flex items-center justify-center animate-pulse">
              <div className="w-44 h-44 rounded-full border-2 border-dashed border-orange-400/50 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-blue-600/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-lg font-bold text-xs ring-4 ring-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Commute Radius Labels */}
            <span className="absolute bottom-4 left-4 text-[10px] font-semibold bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs text-slate-700">
              Center: {currentCluster.district} HQ (15 km Commute Buffer)
            </span>

            <span className="absolute top-4 right-4 text-[10px] font-bold bg-emerald-700 text-white px-2.5 py-1 rounded-lg shadow-2xs">
              {currentCluster.openVacanciesCount} Active Job Openings
            </span>

            {/* Sample Pins */}
            <div className="absolute top-1/4 left-1/3 flex items-center space-x-1 bg-white px-2 py-0.5 rounded-md shadow-md border text-[10px] font-bold text-blue-900">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>PMKK Skill Hub</span>
            </div>

            <div className="absolute bottom-1/3 right-1/4 flex items-center space-x-1 bg-white px-2 py-0.5 rounded-md shadow-md border text-[10px] font-bold text-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Industrial Estate</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-xl font-extrabold text-blue-900 block">
                {currentCluster.activeTrainingCentersCount}
              </span>
              <span className="text-[11px] text-slate-500">Active Skill Centers</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-xl font-extrabold text-emerald-700 block">
                {currentCluster.openVacanciesCount}
              </span>
              <span className="text-[11px] text-slate-500">Verified Vacancies</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center col-span-2 sm:col-span-1">
              <span className="text-xl font-extrabold text-purple-700 block">
                {currentCluster.microEnterpriseGrowthSectors.length}
              </span>
              <span className="text-[11px] text-slate-500">Micro-Enterprise Clusters</span>
            </div>
          </div>
        </div>

        {/* Right Column: Industrial Demand Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Key Local Industries in {currentCluster.district}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {currentCluster.primaryIndustries.map((ind, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-xl"
                >
                  {ind}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                High-Demand Occupations Right Now:
              </h4>
              <ul className="space-y-2">
                {currentCluster.highDemandRoles.map((role, i) => (
                  <li
                    key={i}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-slate-800">{role}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      High Hiring
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                Recommended Micro-Enterprise Opportunities:
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                {currentCluster.microEnterpriseGrowthSectors.map((sec, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
