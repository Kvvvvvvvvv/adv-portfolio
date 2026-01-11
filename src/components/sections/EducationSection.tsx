import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/contexts/MotionContext';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EducationSection: React.FC = () => {
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

  const coursework = [
    'Computer Networks',
    'Design and Analysis of Algorithms',
    'Data Structures and Algorithms',
    'Computer Architecture',
    'Database Management Systems (DBMS)',
    'Machine Learning',
    'Operating Systems',
    'Artificial Intelligence',
    'Tools of Data Science',
    'Prompt Engineering',
    'Blockchain Technologies',
    'Cloud Computing',
  ];

  const certifications = [
    'IBM Cybersecurity Fundamentals',
    'Certified Network Engineer',
    'Java Programming',
    'Diploma in Python',
  ];

  return (
    <section 
      ref={sectionRef}
      id="education"
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
              Education
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Academic <span className="text-gradient-primary">Foundation</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coursework */}
          <div className="card-interactive p-6 rounded-xl card-pop gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-secondary/50 text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Coursework
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {coursework.map((subject, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="card-interactive p-6 rounded-xl card-pop gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-secondary/50 text-accent">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Certifications
              </h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;