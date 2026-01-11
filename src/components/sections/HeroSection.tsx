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
      className="relative min-h-screen flex items-center justify-center px-6 w-full"
    >
      {/* Content overlay */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-node-safe animate-pulse-slow" />
          <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">
            System Online
          </span>
        </div>

        {/* Name */}
        <h1 
          ref={titleRef}
          className="text-6xl md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem] font-bold tracking-tight mb-6 neon-text"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          <span className="text-gradient-primary">Keerthivasan</span>
          <span className="text-foreground"> E</span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-[2rem] font-mono text-muted-foreground mb-8 tracking-wide"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          <span className="text-primary">Cybersecurity</span>
          <span className="mx-4 text-border">•</span>
          <span className="text-node-secondary">AI</span>
          <span className="mx-4 text-border">•</span>
          <span className="text-accent">Blockchain Engineer</span>
        </p>

        {/* Tagline */}
        <p 
          ref={taglineRef}
          className="text-xl md:text-2xl lg:text-[2rem] text-foreground/90 mb-16 font-light max-w-4xl mx-auto"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          Engineering secure, intelligent systems with expertise in cybersecurity, AI, and blockchain.
        </p>

        {/* CTA Buttons */}
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          <button 
            onClick={() => scrollToSection('projects')}
            className="btn-primary-glow px-10 py-4 rounded-xl text-base font-medium tracking-wide pulse-on-hover"
          >
            View Projects
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-outline-glow px-10 py-4 rounded-xl text-base font-medium tracking-wide pulse-on-hover"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-fade pointer-events-none opacity-30" />
    </section>
  );
};

export default HeroSection;
