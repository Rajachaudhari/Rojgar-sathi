import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface MicrophoneButtonProps {
  isListening: boolean;
  isProcessing?: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg' | 'kiosk';
  label?: string;
  disabled?: boolean;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isListening,
  isProcessing = false,
  onClick,
  size = 'md',
  label,
  disabled = false,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
    kiosk: 'w-32 h-32 text-6xl',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    kiosk: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Pulsing Ripple Effect when active */}
        {isListening && (
          <>
            <span className="absolute -inset-2 rounded-full bg-orange-400 opacity-60 animate-ping"></span>
            <span className="absolute -inset-4 rounded-full bg-orange-300 opacity-30 animate-pulse"></span>
          </>
        )}

        <button
          onClick={onClick}
          disabled={disabled}
          type="button"
          aria-label={isListening ? 'Stop listening' : 'Start speaking'}
          className={`relative z-10 flex items-center justify-center rounded-full font-bold shadow-xl transition-all duration-300 transform active:scale-95 focus:outline-hidden focus:ring-4 focus:ring-orange-300 ${
            sizeClasses[size]
          } ${
            isListening
              ? 'bg-orange-600 text-white shadow-orange-500/40 ring-4 ring-orange-300 scale-105'
              : isProcessing
              ? 'bg-amber-500 text-white shadow-amber-500/30'
              : 'bg-gradient-to-tr from-blue-900 to-blue-700 text-white hover:from-blue-800 hover:to-blue-600 shadow-blue-900/30 hover:scale-105'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? (
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
          ) : isListening ? (
            <Mic className={`${iconSizes[size]} animate-pulse`} />
          ) : (
            <Mic className={iconSizes[size]} />
          )}
        </button>
      </div>

      {label && (
        <span
          className={`mt-2.5 font-medium text-center ${
            size === 'kiosk'
              ? 'text-xl font-bold text-slate-900'
              : size === 'lg'
              ? 'text-sm text-slate-700 font-semibold'
              : 'text-xs text-slate-600'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
};
