import React from 'react';
import { useMotion } from '@/contexts/MotionContext';
import { Sparkles, Pause } from 'lucide-react';

const MotionToggle: React.FC = () => {
  const { reduceMotion, toggleReduceMotion } = useMotion();

  return (
    <button
      onClick={toggleReduceMotion}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
      aria-label={reduceMotion ? 'Enable animations' : 'Reduce animations'}
      title={reduceMotion ? 'Enable animations' : 'Reduce animations'}
    >
      {reduceMotion ? (
        <Pause className="w-5 h-5" />
      ) : (
        <Sparkles className="w-5 h-5" />
      )}
    </button>
  );
};

export default MotionToggle;
