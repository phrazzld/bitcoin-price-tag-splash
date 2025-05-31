'use client';

import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-bitcoin-orange/5 blur-3xl float-orb-one motion-reduce:[animation-play-state:paused]" />

      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-bitcoin-orange/5 blur-3xl float-orb-two motion-reduce:[animation-play-state:paused]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px),
                           linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
