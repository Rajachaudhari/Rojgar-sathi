import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'normal' | 'large' | 'extralarge';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  resetTextSize: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<TextSize>('normal');

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-base', 'text-lg', 'text-xl');
    if (textSize === 'large') {
      root.classList.add('text-lg');
    } else if (textSize === 'extralarge') {
      root.classList.add('text-xl');
    } else {
      root.classList.add('text-base');
    }
  }, [textSize]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);

  const increaseTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('extralarge');
  };

  const decreaseTextSize = () => {
    if (textSize === 'extralarge') setTextSize('large');
    else if (textSize === 'large') setTextSize('normal');
  };

  const resetTextSize = () => setTextSize('normal');

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        textSize,
        setTextSize,
        increaseTextSize,
        decreaseTextSize,
        resetTextSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};
