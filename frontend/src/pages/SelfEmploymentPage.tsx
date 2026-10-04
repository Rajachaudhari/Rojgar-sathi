import React, { useEffect, useState } from 'react';
import { schemeApi } from '../services/schemeApi';
import { MOCK_SELF_EMPLOYMENT } from '../data/mockData';
import { SelfEmploymentCard } from '../components/CardComponents';
import { SelfEmploymentOpportunity } from '../types';
import {
  TrendingUp,
  Sparkles,
  Search,
  CheckCircle2,
  Building,
  Coins,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const SelfEmploymentPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [opportunities, setOpportunities] = useState(MOCK_SELF_EMPLOYMENT);

  useEffect(() => {
    void schemeApi.getSelfEmploymentOpportunities().then((res) => setOpportunities(res.data)).catch(() => {});
  }, []);
  const [activeModalOpportunity, setActiveModalOpportunity] = useState<SelfEmploymentOpportunity | null>(null);

  const sectors = ['all', 'Digital Services & Citizen Facilitation', 'Apparel & Garment Enterprise', 'Renewable Energy & Home Electricals', 'Agriculture & Animal Husbandry'];

  const filteredOpportunities = opportunities.filter((item) => {
    return selectedSector === 'all' || item.sector.includes(selectedSector);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>Rojgar Sathi Micro-Enterprise & Self-Employment Cell</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Self-Employment & Enterprise Incubation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Start your own business with 50% non-refundable capital subsidy grants under Rojgar Sathi, PM Vishwakarma modern toolkits, and collateral-free Mudra bank loans.
          </p>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            ₹50k
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">Rojgar Sathi Capital Grant</span>
            <span className="text-[11px] text-slate-500">Up to 50% subsidy for SC micro-enterprises</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
            ₹15k
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">PM Vishwakarma Tool Voucher</span>
            <span className="text-[11px] text-slate-500">For 18 traditional artisan trades</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            5%
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">Concessional Loan Interest</span>
            <span className="text-[11px] text-slate-500">Collateral-free credit up to ₹3 Lakhs</span>
          </div>
        </div>
      </div>

      {/* Sector Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {sectors.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSector(s)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedSector === s
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {s === 'all' ? 'All Enterprise Categories' : s}
          </button>
        ))}
      </div>

      {/* Grid of Micro-Enterprise Ideas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((item) => (
          <SelfEmploymentCard
            key={item.id}
            data={item}
            onApply={(opp) => setActiveModalOpportunity(opp)}
          />
        ))}
      </div>

      {/* Guidance Modal */}
      {activeModalOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-700" />
                <h3 className="font-bold text-slate-900 text-base">
                  Startup Guidance & Subsidy Linkage
                </h3>
              </div>
              <button
                onClick={() => setActiveModalOpportunity(null)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-4 text-xs text-slate-600">
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                <h4 className="font-bold text-sm text-purple-950 mb-1">
                  {activeModalOpportunity.businessTitle}
                </h4>
                <p className="text-purple-900">{activeModalOpportunity.description}</p>
              </div>

              <div>
                <strong className="text-slate-800 text-xs uppercase block mb-1">Equipment / Machinery Needed:</strong>
                <ul className="space-y-1">
                  {activeModalOpportunity.equipmentNeeded.map((eq, i) => (
                    <li key={i} className="flex items-center space-x-2 text-slate-700">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-800 text-xs uppercase block mb-1">Step-by-Step Execution Plan:</strong>
                <ol className="space-y-2">
                  {activeModalOpportunity.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="font-bold text-purple-700">{i + 1}.</span>
                      <span className="text-slate-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => setActiveModalOpportunity(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <a
                href="https://rojgar-sathi.dosje.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Apply for Rojgar Sathi Capital Grant
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
