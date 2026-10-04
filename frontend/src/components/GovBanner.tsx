import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, Eye } from 'lucide-react';

export const GovBanner: React.FC = () => {
  const { textSize, increaseTextSize, decreaseTextSize, resetTextSize, highContrast, toggleHighContrast } = useAccessibility();
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Government Identity */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-0.5">
            <span className="w-1.5 h-3 bg-orange-500 inline-block rounded-xs"></span>
            <span className="w-1.5 h-3 bg-white inline-block rounded-xs"></span>
            <span className="w-1.5 h-3 bg-green-600 inline-block rounded-xs"></span>
          </div>
          <span className="font-semibold tracking-wide text-white">
            भारत सरकार | Government of India
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300">
            {t('govMinistry')}
          </span>
        </div>

        {/* Accessibility & Audio Controls */}
        <div className="flex items-center space-x-3 text-[11px]">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:bg-orange-600 focus:text-white px-2 py-0.5 rounded">
            Skip to Main Content
          </a>

          <div className="flex items-center space-x-1 bg-slate-800 rounded px-1.5 py-0.5">
            <span className="text-slate-400 mr-1">Text:</span>
            <button
              onClick={decreaseTextSize}
              className={`px-1 rounded hover:bg-slate-700 ${textSize === 'normal' ? 'font-bold text-white' : 'text-slate-400'}`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={resetTextSize}
              className="px-1 rounded hover:bg-slate-700 text-slate-300"
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={increaseTextSize}
              className={`px-1 rounded hover:bg-slate-700 ${textSize === 'extralarge' ? 'font-bold text-orange-400' : 'text-slate-300'}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <button
            onClick={toggleHighContrast}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded transition ${
              highContrast ? 'bg-amber-400 text-black font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">Contrast</span>
          </button>

          <div className="hidden lg:flex items-center space-x-1 text-slate-400">
            <Volume2 className="w-3 h-3 text-emerald-400" />
            <span>Voice-First Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
