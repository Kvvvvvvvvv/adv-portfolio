import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MotionContextType {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  webglSupported: boolean | null;
  isLowEndDevice: boolean;
  isTouchDevice: boolean;
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

  // Device capability detection
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }

    // Check for low-end device
    const memory = (navigator as any).deviceMemory || null;
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const isLowSpec = 
      (memory !== null && memory < 4) || 
      hardwareConcurrency <= 2 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsLowEndDevice(isLowSpec);

    // Check for touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Store in localStorage to persist settings
    localStorage.setItem('reduceMotion', JSON.stringify(reduceMotion));
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  const toggleReduceMotion = () => setReduceMotion((prev: boolean) => !prev);

  return (
    <MotionContext.Provider value={{ reduceMotion, toggleReduceMotion, webglSupported, isLowEndDevice, isTouchDevice }}>
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