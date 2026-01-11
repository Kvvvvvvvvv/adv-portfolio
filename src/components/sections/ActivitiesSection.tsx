import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/contexts/MotionContext';
import { Users, Target, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Activity {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
}

const activities: Activity[] = [
  {
    id: 'activity-1',
    role: 'Cybersecurity and Blockchain Lead',
    organization: 'OSPC',
    period: 'Present',
    description: 'Manage student-driven projects including secure voting systems and blockchain-based certificate verification.',
    achievements: [
      'Led secure voting system development',
      'Implemented blockchain certificate verification',
      'Mentored junior members in cybersecurity',
    ],
  },
  {
    id: 'activity-2',
    role: 'Management Member',
    organization: 'ACM-VITC',
    period: 'Present',
    description: 'Enhanced device security protocols, managed CodePulse initiative, coordinated major tech events.',
    achievements: [
      'Improved device security protocols',
      'Managed CodePulse initiative',
      'Coordinated major tech events',
    ],
  },
  {
    id: 'activity-3',
    role: 'Content Member',
    organization: 'Cyscom',
    period: 'Present',
    description: 'Researched and drafted weekly insights on cybersecurity awareness and emerging technologies.',
    achievements: [
      'Published weekly cybersecurity insights',
      'Researched emerging threats',
      'Created awareness materials',
    ],
  },
];

const ActivityItem: React.FC<{ 
  activity: Activity; 
  index: number;
  isLast: boolean;
}> = ({ activity, index, isLast }) => {
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
              {activity.role}
            </h3>
            <p className="text-primary font-mono text-sm">
              {activity.organization}
            </p>
          </div>
          <span className="text-sm text-muted-foreground font-mono">
            {activity.period}
          </span>
        </div>
        
        <p className="text-muted-foreground mb-4">
          {activity.description}
        </p>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Key Achievements:</h4>
          <ul className="space-y-1">
            {activity.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">✓</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ActivitiesSection: React.FC = () => {
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
      id="activities"
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
              Activities
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Leadership & <span className="text-gradient-primary">Involvement</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {activities.map((activity, index) => (
            <ActivityItem 
              key={activity.id} 
              activity={activity} 
              index={index}
              isLast={index === activities.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;