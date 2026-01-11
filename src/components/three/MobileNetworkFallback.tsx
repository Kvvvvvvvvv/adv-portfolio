import React from 'react';

const MobileNetworkFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      {/* Static nodes */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary/40 animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-node-secondary/40 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 left-1/3 w-4 h-4 rounded-full bg-primary/30 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-accent/40 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/4 left-1/2 w-3 h-3 rounded-full bg-node-safe/40 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(185, 80%, 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(185, 80%, 50%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(185, 80%, 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="25%" y1="25%" x2="75%" y2="33%" stroke="url(#line-gradient)" strokeWidth="1" />
        <line x1="33%" y1="50%" x2="67%" y2="67%" stroke="url(#line-gradient)" strokeWidth="1" />
        <line x1="25%" y1="25%" x2="33%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" />
      </svg>

      {/* Grid - responsive */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Additional responsive elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </div>
  );
};

export default MobileNetworkFallback;
