import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MotionContextType {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const MotionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reduceMotion, setReduceMotion] = useState(() => {
    // Check system preference first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('reduceMotion');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('reduceMotion', JSON.stringify(reduceMotion));
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  const toggleReduceMotion = () => setReduceMotion((prev: boolean) => !prev);

  return (
    <MotionContext.Provider value={{ reduceMotion, toggleReduceMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
};
