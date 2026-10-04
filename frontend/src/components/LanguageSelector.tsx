import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { LanguageCode } from '../types';

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={`flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 ${
          compact ? 'text-xs py-1 px-2' : ''
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-blue-700" />
        <span className="font-medium">{currentLang.native}</span>
        <span className="text-slate-400 text-[10px]">({currentLang.code.toUpperCase()})</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 divide-y divide-slate-100 p-1.5 focus:outline-hidden">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Select Language / भाषा चुनें
            </div>
            <div className="py-1 grid grid-cols-1 gap-1 max-h-72 overflow-y-auto">
              {languages.map((l) => {
                const isSelected = l.code === language;
                return (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code as LanguageCode);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg text-left transition ${
                      isSelected
                        ? 'bg-blue-50 text-blue-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">{l.native}</span>
                      <span className="text-[10px] text-slate-500">{l.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
