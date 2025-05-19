"use client";

import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-bitcoin-orange/5 blur-3xl"
        initial={{ x: -100, y: -100 }}
        animate={{ 
          x: [100, -100, 100], 
          y: [-100, 200, -100] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-bitcoin-orange/5 blur-3xl"
        initial={{ x: 100, y: 100 }}
        animate={{ 
          x: [-100, 100, -100], 
          y: [100, -200, 100] 
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px),
                           linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;