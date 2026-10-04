import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  GraduationCap,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Award,
  Download,
  Filter,
  Layers,
  Building,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedTimeRange, setSelectedTimeRange] = useState('Quarter 3 (2026)');

  // Aggregated analytics dataset
  const kpis = {
    totalBeneficiaries: 48920,
    assessmentsCompleted: 39410,
    activeTrainingEnrollments: 14250,
    certifiedGraduates: 11840,
    placedInWageEmployment: 8960,
    selfEmploymentSubsidySanctioned: 4320,
    dropoutRiskRate: '4.8%',
  };

  const topSkillGaps = [
    { skill: 'Solar PV Array Mounting & Civil Safety', count: 12400, sector: 'Green Energy' },
    { skill: 'Computer Regional Typing & Online Portals', count: 10850, sector: 'Digital Services' },
    { skill: 'Industrial Power Stitching & Pattern Cutting', count: 8640, sector: 'Apparel' },
    { skill: 'EV Battery Testing & Multimeter Diagnostics', count: 7120, sector: 'Automotive' },
    { skill: 'Clean Animal Nutrition & Lactometer Testing', count: 5930, sector: 'Agriculture' },
  ];

  const sectorDemand = [
    { sector: 'Green Energy / Solar', percentage: 34, color: 'bg-emerald-500' },
    { sector: 'IT & Digital Seva (CSC)', percentage: 26, color: 'bg-blue-600' },
    { sector: 'Apparel & Handloom Crafts', percentage: 18, color: 'bg-orange-500' },
    { sector: 'Automotive & Electric Vehicles', percentage: 12, color: 'bg-purple-600' },
    { sector: 'Dairy & Micro-Agri', percentage: 10, color: 'bg-amber-500' },
  ];

  const regionalHeatmap = [
    { district: 'Varanasi', state: 'Uttar Pradesh', registered: 14200, placementRate: '78%' },
    { district: 'Patna', state: 'Bihar', registered: 12100, placementRate: '74%' },
    { district: 'Nagpur', state: 'Maharashtra', registered: 9800, placementRate: '82%' },
    { district: 'Ranchi', state: 'Jharkhand', registered: 7420, placementRate: '69%' },
    { district: 'Jaipur', state: 'Rajasthan', registered: 5400, placementRate: '76%' },
  ];

  const exportReport = () => {
    const csvContent = "data:text/csv;charset=utf-8,District,Registered,PlacementRate\n" +
      regionalHeatmap.map(e => `${e.district},${e.registered},${e.placementRate}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ROJGAR_SATHI_Livelihood_Analytics_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Building className="w-3.5 h-3.5 text-orange-400" />
            <span>Ministry Institutional Coordination Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Rojgar Sathi State & District Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time data-driven planning: skill demand metrics, training batch capacities, placement rates, and dropout risk alerts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2"
          >
            <option>Quarter 3 (2026)</option>
            <option>Quarter 2 (2026)</option>
            <option>Fiscal Year 2025-26</option>
          </select>

          <button
            onClick={exportReport}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Beneficiaries
          </span>
          <div className="text-2xl font-black text-slate-900">
            {kpis.totalBeneficiaries.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% from last month</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Assessments Completed
          </span>
          <div className="text-2xl font-black text-blue-900">
            {kpis.assessmentsCompleted.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            80.5% completion rate
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Certified Graduates
          </span>
          <div className="text-2xl font-black text-emerald-700">
            {kpis.certifiedGraduates.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            NSQF Level 3-5 verified
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Placement & Subsidies
          </span>
          <div className="text-2xl font-black text-purple-700">
            {(kpis.placedInWageEmployment + kpis.selfEmploymentSubsidySanctioned).toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Wage + Self-employed
          </span>
        </div>
      </div>

      {/* Sector Demand & Skill Gaps Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Top Identified Skill Gaps */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Most Prevalent Skill Gaps (Targeted Training Priority)
            </h3>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full">
              District Aggregated
            </span>
          </div>

          <div className="space-y-3">
            {topSkillGaps.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-slate-800">{item.skill}</h4>
                  <span className="text-[10px] text-slate-500 font-medium">{item.sector}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-900">{item.count.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block">candidates needing course</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sector Demand Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Sector-Wise Training Demand
            </h3>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
              Current Quarter
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {sectorDemand.map((sec, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{sec.sector}</span>
                  <span className="font-bold text-slate-900">{sec.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className={`${sec.color} h-full rounded-full`} style={{ width: `${sec.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Placement Heatmap Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Region-Wise Performance & Placement Pipeline
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated anonymized monitoring across Rojgar Sathi pilot districts.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Registered Beneficiaries</th>
                <th className="py-3 px-4">Wage Placement Rate</th>
                <th className="py-3 px-4">Dropout Indicator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regionalHeatmap.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">{r.district}</td>
                  <td className="py-3 px-4">{r.state}</td>
                  <td className="py-3 px-4 font-semibold text-blue-900">{r.registered.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      {r.placementRate}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-500 font-medium">Low (&lt;5%)</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
