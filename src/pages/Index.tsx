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

// Lazy load the 3D component for better performance
const NetworkGraph = lazy(() => import('@/components/three/NetworkGraph'));

const Index: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
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
          {isMobile ? (
            <MobileNetworkFallback />
          ) : (
            <Suspense fallback={<MobileNetworkFallback />}>
              <NetworkGraph 
                scrollProgress={scrollProgress} 
                className="w-full h-full"
              />
            </Suspense>
          )}
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
