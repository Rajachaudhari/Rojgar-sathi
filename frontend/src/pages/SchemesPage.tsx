import React, { useEffect, useState } from 'react';
import { schemeApi } from '../services/schemeApi';
import { MOCK_SCHEMES } from '../data/mockData';
import { SchemeCard } from '../components/CardComponents';
import {
  Landmark,
  Search,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building2,
  ExternalLink
} from 'lucide-react';

export const SchemesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [schemes, setSchemes] = useState(MOCK_SCHEMES);

  useEffect(() => {
    void schemeApi.getSchemes().then((res) => setSchemes(res.data)).catch(() => {});
  }, []);

  const filteredSchemes = schemes.filter((scheme) => {
    return (
      scheme.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.nodalMinistry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1 rounded-full">
            <Landmark className="w-3.5 h-3.5 text-orange-400" />
            <span>Authorized Welfare & Enterprise Subsidies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Government Livelihood & Skill Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Discover official central and state initiatives designed to empower Scheduled Caste beneficiaries, traditional craftspeople, and aspiring youth.
          </p>
        </div>
      </div>

      {/* Official Notice Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold">Authentic Government Scheme Repository</h4>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            All schemes listed are aligned with official guidelines issued by the Ministry of Social Justice & Empowerment, MSME, and MSDE. Applications are processed directly through authorized government portals or District Social Welfare offices.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme name, ministry, or benefit keywords..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <SchemeCard key={scheme.id} data={scheme} />
        ))}
      </div>
    </div>
  );
};
