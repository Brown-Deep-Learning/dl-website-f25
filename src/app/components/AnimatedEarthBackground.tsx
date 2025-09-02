// components/AnimatedEarthBackground.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Theme to bubble color mapping
const themeColors = {
  'landing-page': '#94d2bd',
  'lectures': '#e6ccb2',
  'assignments': '#FF7D29',
  'calendar': '#8A2D3B',
  'resources': '#FFBF78',
  'staff': '#EBE5C2'
};

const getCurrentTheme = (): string => {
  const sections = Object.keys(themeColors);
  const viewportMiddle = window.scrollY + (window.innerHeight / 2);
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementBottom = elementTop + rect.height;

      if (viewportMiddle >= elementTop && viewportMiddle <= elementBottom) {
        return sectionId;
      }
    }
  }
  return 'landing-page';
};

const Bubbles: React.FC<{ 
  density: number; 
  maxSize: number;
  minSize?: number;
}> = ({ density, maxSize, minSize = 2 }) => {
  const [currentTheme, setCurrentTheme] = useState('landing-page');

  useEffect(() => {
    const handleScroll = () => {
      const theme = getCurrentTheme();
      setCurrentTheme(theme);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial theme

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bubbleColor = themeColors[currentTheme as keyof typeof themeColors] || '#94d2bd';

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
            zIndex: -1,
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
    <>
      <Bubbles density={25} maxSize={10} minSize={4} />
      <Bubbles density={15} maxSize={16} minSize={8} />
      <Bubbles density={8} maxSize={22} minSize={12} />
    </>
  );
};