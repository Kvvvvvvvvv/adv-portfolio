import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/contexts/MotionContext';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Cybersecurity Intern',
    company: 'Elevate Labs',
    period: 'June 2025 – August 2025',
    description: 'Remote cybersecurity internship focusing on developing vulnerability detection tools and automated reporting systems.',
    highlights: [
      'Developed Python-based scanners for XSS, SQL Injection, and CSRF',
      'Automated Flask-based vulnerability reports',
      'Built OWASP ZAP dashboards',
    ],
  },
  {
    id: 'exp-2',
    role: 'Network Analytics Intern',
    company: 'Department of Atomic Energy, Kalpakkam',
    period: 'May 2025 – June 2025',
    description: 'Designed monitoring modules for traffic metrics and identified anomalies using statistical network models.',
    highlights: [
      'Designed monitoring modules for traffic metrics',
      'Identified anomalies using statistical network models',
      'Created real-time visualization dashboards',
    ],
  },
  {
    id: 'exp-3',
    role: 'Inplant Trainee',
    company: 'Madras Atomic Power Station (MAPS), DAE, Kalpakkam',
    period: 'July 2025',
    description: 'Observed electrical network performance and studied optimization workflows in atomic plant systems.',
    highlights: [
      'Observed electrical network performance',
      'Studied optimization workflows in atomic plant systems',
      'Analyzed power distribution systems',
    ],
  },
  {
    id: 'exp-4',
    role: 'Data Engineering Intern',
    company: 'Edunet Foundation',
    period: 'February 2025 – March 2025',
    description: 'Built image encryption using LSB steganography and applied validation mechanisms for secure data handling.',
    highlights: [
      'Built image encryption using LSB steganography',
      'Applied validation mechanisms for secure data handling',
      'Developed secure data transmission protocols',
    ],
  },
];

const ExperienceItem: React.FC<{ 
  experience: Experience; 
  index: number;
  isLast: boolean;
}> = ({ experience, index, isLast }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [index, reduceMotion]);

  return (
    <div 
      ref={itemRef}
      className="relative pl-8 pb-12"
      style={{ opacity: reduceMotion ? 1 : 0 }}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[5px] top-3 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent" />
      )}
      
      {/* Timeline dot */}
      <div className="timeline-dot top-1.5" />

      {/* Content */}
      <div className="card-interactive p-6 rounded-xl card-pop gradient-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {experience.role}
            </h3>
            <p className="text-primary font-mono text-sm">
              {experience.company}
            </p>
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            {experience.period}
          </span>
        </div>
        
        <p className="text-muted-foreground mb-4">
          {experience.description}
        </p>

        <ul className="space-y-2">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-1">›</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="section-container"
    >
      <div className="section-content">
        {/* Section header */}
        <div 
          ref={headerRef}
          className="mb-16"
          style={{ opacity: reduceMotion ? 1 : 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary" />
            <span className="font-mono text-sm text-primary tracking-wider uppercase">
              Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Professional <span className="text-gradient-primary">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {experiences.map((exp, index) => (
            <ExperienceItem 
              key={exp.id} 
              experience={exp} 
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
