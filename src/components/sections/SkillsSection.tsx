import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/contexts/MotionContext';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  color: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    color: 'primary',
    skills: [
      'Python',
      'Java',
      'JavaScript',
      'C / C++',
      'Solidity',
      'SQL',
    ],
  },
  {
    title: 'Web Development',
    color: 'node-secondary',
    skills: [
      'HTML',
      'CSS',
      'React.js',
      'Node.js',
      'Express.js',
      'REST APIs',
    ],
  },
  {
    title: 'Cybersecurity',
    color: 'accent',
    skills: [
      'Burp Suite',
      'Wireshark',
      'OWASP ZAP',
      'Threat Modeling',
      'Penetration Testing',
      'Vulnerability Assessment',
    ],
  },
  {
    title: 'Blockchain',
    color: 'node-safe',
    skills: [
      'Solidity',
      'Smart Contracts',
      'Web3.js',
      'DApp Integration',
      'Ethereum',
      'DeFi Protocols',
    ],
  },
  {
    title: 'AI / Machine Learning',
    color: 'node-safe',
    skills: [
      'Data Preprocessing',
      'Model Evaluation',
      'Predictive Analysis',
      'TensorFlow',
      'Scikit-learn',
      'NLP',
    ],
  },
  {
    title: 'Databases',
    color: 'primary',
    skills: [
      'MySQL',
      'SQLite',
      'MongoDB',
      'PostgreSQL',
      'Redis',
      'Elasticsearch',
    ],
  },
  {
    title: 'Tools & Platforms',
    color: 'node-secondary',
    skills: [
      'Git',
      'Docker',
      'Linux',
      'Postman',
      'AWS',
      'Azure',
    ],
  }
];

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index, reduceMotion]);

  const borderColor = `border-${category.color}/30`;
  const textColor = `text-${category.color}`;
  const bgColor = `bg-${category.color}/5`;

  return (
    <div 
      ref={cardRef}
      className={`card-elevated p-6 rounded-xl hover:border-${category.color}/50 transition-colors duration-300 card-pop gradient-border`}
      style={{ opacity: reduceMotion ? 1 : 0 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rounded-full bg-${category.color}`} />
        <h3 className={`font-semibold text-lg ${textColor}`}>
          {category.title}
        </h3>
      </div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span 
            key={skill}
            className="skill-badge"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
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
      id="skills"
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
              Skills
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Technical <span className="text-gradient-primary">Expertise</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
