// components/AnimatedEarthBackground.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Bubbles: React.FC<{ 
  density: number; 
  maxSize: number;
  minSize?: number;
}> = ({ density, maxSize, minSize = 2 }) => {
  const [bubbleColor, setBubbleColor] = useState('#94d2bd');

  useEffect(() => {
    const getBubbleColorFromSection = () => {
      // Find which section is currently in view
      const sections = document.querySelectorAll('[data-earth-theme]');
      const viewportMiddle = window.scrollY + (window.innerHeight / 2);
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionBottom = sectionTop + rect.height;

        if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
          // Get the bubble color from this section's CSS variable
          const style = getComputedStyle(section);
          return style.getPropertyValue('--bubble-color').trim();
        }
      }
      return '#94d2bd'; // default
    };

    const updateBubbleColor = () => {
      const color = getBubbleColorFromSection();
      setBubbleColor(color);
    };

    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateBubbleColor();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateBubbleColor(); // Set initial color

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bubbles = Array.from({ length: density }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: minSize + Math.random() * (maxSize - minSize),
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    horizontalDrift: (Math.random() - 0.5) * 30,
    opacity: 0.7 + Math.random() * 0.3,
  }));

  return (
    <>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            position: 'fixed',
            left: `${bubble.left}%`,
            bottom: '-20px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: '50%',
            backgroundColor: bubbleColor,
            opacity: 0,
            filter: 'blur(2px)',
            boxShadow: `0 0 ${bubble.size * 2}px ${bubble.size}px ${bubbleColor}80`,
            zIndex: 3,
            pointerEvents: 'none',
          }}
          animate={{
            y: '-120vh',
            x: `${bubble.horizontalDrift}%`,
            opacity: [0, bubble.opacity, 0],
            scale: [0.3, 1.2, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

export const AnimatedEarthBackground: React.FC = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: 0, 
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <Bubbles density={30} maxSize={12} minSize={4} />
      <Bubbles density={20} maxSize={18} minSize={8} />
      <Bubbles density={10} maxSize={24} minSize={12} />
    </div>
  );
};