import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMotion } from '@/contexts/MotionContext';

const HeroSection: React.FC = () => {
  const { reduceMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-dvh flex items-center justify-center px-6 w-full"
    >
      {/* Content overlay - adjusted for various screen sizes */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-node-safe animate-pulse-slow" />
          <span className="text-xs sm:text-sm font-mono text-muted-foreground tracking-wider uppercase">
            System Online
          </span>
        </div>

        {/* Name - responsive sizing */}
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem] xl:text-[6rem] font-bold tracking-tight mb-4 sm:mb-6 neon-text"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          <span className="text-gradient-primary">Keerthivasan</span>
          <span className="text-foreground"> E</span>
        </h1>

        {/* Subtitle - responsive sizing */}
        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-[1.5rem] lg:text-[2rem] font-mono text-muted-foreground mb-6 sm:mb-8 tracking-wide"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          <span className="text-primary">Cybersecurity</span>
          <span className="mx-2 sm:mx-4 text-border hidden sm:inline">•</span>
          <span className="block sm:inline sm:mx-0 mb-2 sm:mb-0">&</span>
          <span className="text-node-secondary ml-0 sm:ml-4">AI</span>
          <span className="mx-2 sm:mx-4 text-border hidden sm:inline">•</span>
          <span className="block sm:inline sm:mx-0 mb-2 sm:mb-0">&</span>
          <span className="text-accent ml-0 sm:ml-4">Blockchain Engineer</span>
        </p>

        {/* Tagline - responsive sizing */}
        <p 
          ref={taglineRef}
          className="text-base sm:text-lg md:text-xl lg:text-[2rem] text-foreground/90 mb-8 sm:mb-12 font-light max-w-2xl sm:max-w-4xl mx-auto"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          Engineering secure, intelligent systems with expertise in cybersecurity, AI, and blockchain.
        </p>

        {/* CTA Buttons - stacked on small screens */}
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          <button 
            onClick={() => scrollToSection('projects')}
            className="btn-primary-glow px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-medium tracking-wide pulse-on-hover w-full sm:w-auto"
          >
            View Projects
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-outline-glow px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-medium tracking-wide pulse-on-hover w-full sm:w-auto"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator - adjusted for different screen sizes */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2">
        <span className="text-[0.6rem] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-fade pointer-events-none opacity-30" />
    </section>
  );
};

export default HeroSection;
