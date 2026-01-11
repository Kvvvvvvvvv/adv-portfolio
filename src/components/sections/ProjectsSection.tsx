import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/contexts/MotionContext';
import { ExternalLink, Github, X, Shield, Network, Link, Brain, FolderOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  icon: React.FC<{ className?: string }>;
  color: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 'web-vulnerability-scanner',
    title: 'Web Vulnerability Scanner',
    description: 'Flask-based automated detection tool with analytical reporting.',
    longDescription: 'A comprehensive security tool that performs automated vulnerability assessments on web applications. Detects common vulnerabilities including SQL injection, XSS, CSRF, and more. Features detailed reporting and remediation suggestions.',
    technologies: ['Python', 'Flask', 'SQLAlchemy', 'Requests', 'BeautifulSoup'],
    icon: Shield,
    color: 'primary',
    github: '#',
  },
  {
    id: 'network-traffic-analyzer',
    title: 'Network Traffic Analyzer (NTA)',
    description: 'Real-time packet analysis system for network anomaly visualization.',
    longDescription: 'Advanced network monitoring system that captures and analyzes network traffic in real-time. Uses statistical models to detect anomalies and potential threats. Provides visualization dashboards for network operations teams.',
    technologies: ['Python', 'Scapy', 'Pandas', 'Matplotlib', 'Socket'],
    icon: Network,
    color: 'node-secondary',
    github: '#',
  },
  {
    id: 'securechain-portal',
    title: 'SecureChain Portal',
    description: 'Blockchain-based identity and audit system using Solidity and Web3.js.',
    longDescription: 'Decentralized application for secure identity management and audit trails using blockchain technology. Implements smart contracts for immutable record-keeping and provides a user-friendly interface for identity verification.',
    technologies: ['Solidity', 'React', 'Web3.js', 'Ethereum', 'Truffle'],
    icon: Link,
    color: 'accent',
    github: '#',
    demo: '#',
  },
  {
    id: 'organ-donor-dapp',
    title: 'Organ Donor DApp',
    description: 'Smart contract-based donor–receiver mapping platform.',
    longDescription: 'A decentralized application that manages organ donation processes. Uses smart contracts to manage donor registrations, matching algorithms, and transplant tracking while ensuring privacy and data integrity.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Node.js', 'MongoDB'],
    icon: Link,
    color: 'node-safe',
    github: '#',
  },
  {
    id: 'ai-file-manager',
    title: 'AI File Manager',
    description: 'ML-powered file classification system for analytics and optimization.',
    longDescription: 'Smart file management system that uses machine learning to automatically categorize, tag, and organize files. Features predictive analysis for file management and optimization suggestions.',
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'React', 'FastAPI'],
    icon: Brain,
    color: 'primary',
    github: '#',
    demo: '#',
  },
  {
    id: 'cloudcatalyst',
    title: 'CloudCatalyst',
    description: 'Multi-model stock prediction engine integrating ML and cloud analytics.',
    longDescription: 'Advanced stock prediction platform that integrates multiple machine learning models with cloud analytics. Features real-time data processing and predictive modeling for financial markets.',
    technologies: ['Python', 'TensorFlow', 'AWS', 'Pandas', 'NumPy'],
    icon: FolderOpen,
    color: 'node-secondary',
    github: '#',
    demo: '#',
  },
];

// Project Modal Component
const ProjectModal: React.FC<{
  project: Project | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotion();

  useEffect(() => {
    if (!project) return;

    if (!reduceMotion) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project, reduceMotion]);

  if (!project) return null;

  const IconComponent = project.icon;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl card-glass rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-4 rounded-xl bg-${project.color}/10`}>
            <IconComponent className={`w-8 h-8 text-${project.color}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="skill-badge text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8">
          {project.longDescription}
        </p>

        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <a 
              href={project.github}
              className="btn-outline-glow px-6 py-2 rounded-lg text-sm flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo}
              className="btn-primary-glow px-6 py-2 rounded-lg text-sm flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onClick: () => void;
}> = ({ project, index, onClick }) => {
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

  const IconComponent = project.icon;

  return (
    <div 
      ref={cardRef}
      className="card-interactive p-6 rounded-xl cursor-pointer group card-pop gradient-border"
      onClick={onClick}
      style={{ opacity: reduceMotion ? 1 : 0 }}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg bg-${project.color}/10 group-hover:bg-${project.color}/20 transition-colors`}>
          <IconComponent className={`w-6 h-6 text-${project.color}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="skill-badge text-xs">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
      id="projects"
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
              Projects
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Featured <span className="text-gradient-primary">Work</span>
          </h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default ProjectsSection;
