// components/AnimatedEarthBackground.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Bubbles: React.FC<{ 
  density: number; 
  maxSize: number;
  minSize?: number;
}> = ({ density, maxSize, minSize = 2 }) => {
  const bubbles = Array.from({ length: density }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: minSize + Math.random() * (maxSize - minSize),
    delay: Math.random() * 6,
    duration: 8 + Math.random() * 12,
    horizontalDrift: (Math.random() - 0.5) * 20,
    opacity: 0.5 + Math.random() * 0.3,
  }));

  return (
    <>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            position: 'fixed',
            left: `${bubble.left}%`,
            bottom: '0px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: '50%',
            backgroundColor: 'var(--current-bubble)',
            opacity: 0,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${bubble.size * 1.5}px ${bubble.size}px var(--current-bubble)60`,
            zIndex: -1,
            pointerEvents: 'none',
          }}
          animate={{
            y: '-120vh',
            x: `${bubble.horizontalDrift}%`,
            opacity: [0, bubble.opacity, 0],
            scale: [0.3, 1.1, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 4,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      ))}
    </>
  );
};

export const AnimatedEarthBackground: React.FC = () => {
  return (
    <>
      {/* Base Background using CSS variable */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--current-bg)',
          zIndex: -2,
          transition: 'background-color 1.5s ease-in-out',
        }}
      />
      
      {/* Bubbles using CSS variable for color */}
      <Bubbles density={15} maxSize={8} minSize={3} />
      <Bubbles density={8} maxSize={14} minSize={6} />
      <Bubbles density={4} maxSize={20} minSize={10} />
    </>
  );
};