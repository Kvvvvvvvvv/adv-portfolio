import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/contexts/MotionContext';
import { Shield, Brain, Link, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const { reduceMotion } = useMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const focusAreas = [
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Specialized in vulnerability assessment, penetration testing, and building resilient security architectures.',
      color: 'text-primary',
    },
    {
      icon: Brain,
      title: 'Artificial Intelligence',
      description: 'Developing machine learning models for threat detection, anomaly analysis, and intelligent automation.',
      color: 'text-node-secondary',
    },
    {
      icon: Link,
      title: 'Blockchain',
      description: 'Blockchain development with smart contracts, DApps, and secure transaction systems.',
      color: 'text-accent',
    },
    {
      icon: Server,
      title: 'Systems Engineering',
      description: 'Systems engineering with focus on network architecture, cloud computing, and backend development.',
      color: 'text-node-safe',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="section-container"
    >
      <div 
        ref={contentRef}
        className="section-content"
        style={{ opacity: reduceMotion ? 1 : 0 }}
      >
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary" />
            <span className="font-mono text-sm text-primary tracking-wider uppercase">
              About
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Building at the Intersection of
            <br />
            <span className="text-gradient-primary">Security & Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            I'm a Computer Science student specializing in cybersecurity, AI, and blockchain technologies. 
            With hands-on experience in vulnerability assessment, network analytics, and secure system development, 
            I focus on creating robust solutions that address real-world security challenges.
          </p>
        </div>

        {/* Focus areas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {focusAreas.map((area, index) => (
            <div 
              key={area.title}
              className="card-interactive p-8 rounded-xl group card-pop gradient-border"
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-lg bg-secondary/50 ${area.color} group-hover:glow-soft transition-shadow duration-300`}>
                  <area.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {area.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
