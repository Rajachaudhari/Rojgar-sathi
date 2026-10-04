import React from 'react';

interface VoiceWaveformProps {
  isActive: boolean;
  color?: string;
  barsCount?: number;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  isActive,
  color = 'bg-orange-500',
  barsCount = 7,
}) => {
  return (
    <div className="flex items-center justify-center space-x-1.5 h-12 px-4">
      {Array.from({ length: barsCount }).map((_, idx) => {
        const animClass = isActive
          ? idx % 3 === 0
            ? 'animate-wave-1'
            : idx % 3 === 1
            ? 'animate-wave-2'
            : 'animate-wave-3'
          : 'h-2';

        return (
          <span
            key={idx}
            className={`w-1.5 rounded-full transition-all duration-300 ${color} ${animClass}`}
            style={{
              minHeight: isActive ? '8px' : '4px',
            }}
          />
        );
      })}
    </div>
  );
};
