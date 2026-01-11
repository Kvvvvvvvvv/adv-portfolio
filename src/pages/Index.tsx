import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MotionProvider } from '@/contexts/MotionContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import EducationSection from '@/components/sections/EducationSection';
import ActivitiesSection from '@/components/sections/ActivitiesSection';
import MotionToggle from '@/components/ui/MotionToggle';
import MobileNetworkFallback from '@/components/three/MobileNetworkFallback';
import WebGLSafeWrapper from '@/components/three/WebGLSafeWrapper';
import ErrorBoundary from '@/components/three/ErrorBoundary';

// Lazy load the 3D component for better performance
const NetworkGraph = lazy(() => import('@/components/three/NetworkGraph'));

const Index: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-background">
        {/* Navigation */}
        <Navigation />

        {/* 3D Background - fixed position */}
        <div className="fixed inset-0 z-0">
          <ErrorBoundary>
            <Suspense fallback={<MobileNetworkFallback />}>
              <WebGLSafeWrapper
                fallback={<MobileNetworkFallback />}
                canvasProps={{
                  camera: { position: [0, 0, 12], fov: 60 },
                  dpr: [1, 1.5],
                  performance: { min: 0.5 },
                  gl: { antialias: true, alpha: true }
                }}
                className="w-full h-full"
              >
                <React.Suspense fallback={null}>
                  <NetworkGraph 
                    scrollProgress={scrollProgress} 
                  />
                </React.Suspense>
              </WebGLSafeWrapper>
            </Suspense>
          </ErrorBoundary>
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background pointer-events-none" />
        </div>

        {/* Content sections */}
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <EducationSection />
          <ProjectsSection />
          <ExperienceSection />
          <ActivitiesSection />
          <ContactSection />
        </main>

        {/* Motion toggle */}
        <MotionToggle />
      </div>
    </MotionProvider>
  );
};

export default Index;
