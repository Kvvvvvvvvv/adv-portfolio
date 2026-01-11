import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  webgl: boolean | null;
  reducedMotion: boolean;
  touch: boolean;
  lowEndDevice: boolean;
  pixelRatio: number;
  memory: number | null;
}

const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    webgl: null,
    reducedMotion: false,
    touch: false,
    lowEndDevice: false,
    pixelRatio: 1,
    memory: null,
  });

  useEffect(() => {
    const checkCapabilities = async () => {
      // Check for reduced motion preference
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const reducedMotion = reducedMotionQuery.matches;

      // Check for touch capability
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Check for WebGL support
      let webglSupport: boolean | null = null;
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        webglSupport = !!gl;
      } catch (e) {
        webglSupport = false;
      }

      // Estimate device performance based on available memory
      let memory: number | null = null;
      if ('deviceMemory' in navigator) {
        memory = (navigator as any).deviceMemory;
      }

      // Determine pixel ratio (limit for performance on high-DPI displays)
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      // Estimate if it's a low-end device based on memory and hardware concurrency
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const lowEndDevice = 
        (memory !== null && memory < 4) || 
        hardwareConcurrency <= 2 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setCapabilities({
        webgl: webglSupport,
        reducedMotion,
        touch,
        lowEndDevice,
        pixelRatio,
        memory,
      });

      // Listen for changes in reduced motion preference
      const handleReducedMotionChange = () => {
        setCapabilities(prev => ({
          ...prev,
          reducedMotion: reducedMotionQuery.matches,
        }));
      };

      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

      return () => {
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      };
    };

    checkCapabilities();
  }, []);

  return capabilities;
};

export default useDeviceCapabilities;