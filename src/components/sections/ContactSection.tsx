import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/contexts/MotionContext';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
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

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Kvvvvvvvvv', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/keerthivasan-e-073211283', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:keerthivasaneofficial@gmail.com', label: 'Email' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="section-container"
    >
      <div 
        ref={contentRef}
        className="section-content text-center"
        style={{ opacity: reduceMotion ? 1 : 0 }}
      >
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary" />
            <span className="font-mono text-sm text-primary tracking-wider uppercase">
              Contact
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Let's <span className="text-gradient-primary">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Located in Chennai, Tamil Nadu, India. Feel free to reach out for collaborations, 
            opportunities, or just to connect.
          </p>
        </div>

        {/* Email CTA */}
        <a 
          href="mailto:keerthivasaneofficial@gmail.com"
          className="btn-primary-glow inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-medium mb-12 pulse-on-hover"
        >
          <Send className="w-5 h-5" />
          Get in Touch
        </a>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="p-3 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Keerthivasan E. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            Built with React, Three.js & GSAP
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;