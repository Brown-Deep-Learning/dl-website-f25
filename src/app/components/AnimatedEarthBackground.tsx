// components/AnimatedEarthBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLayer } from '../contexts/LayerContext';
import { LayerKey } from '../contexts/LayerContext';

interface LayerTheme {
  color: string;
  bubbleColor: string;
}

const layerThemes: Record<LayerKey, LayerTheme> = {
  sea_level: { color: '#26667F', bubbleColor: '#94d2bd' },
  crust: { color: '#B99470', bubbleColor: '#e6ccb2' },
  upper_mantle: { color: '#E7CCCC', bubbleColor: '#8A2D3B' },
  lower_mantle: { color: '#FF7D29', bubbleColor: '#ffb4a2' },
  outer_core: { color: '#FFBF78', bubbleColor: '#ff8fa3' },
  inner_core: { color: '#FFEEA9', bubbleColor: '#0a9396' },
};

// Fixed bubble component that definitely floats up
const Bubbles: React.FC<{ 
  density: number; 
  color: string;
  maxSize: number;
  minSize?: number;
}> = ({ density, color, maxSize, minSize = 2 }) => {
  const bubbles = Array.from({ length: density }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: minSize + Math.random() * (maxSize - minSize),
    delay: Math.random() * 6,
    duration: 8 + Math.random() * 12, // Longer duration for slower rise
    horizontalDrift: (Math.random() - 0.5) * 20,
    opacity: 0.5 + Math.random() * 0.3,
  }));

  return (
    <>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            position: 'fixed', // Use fixed positioning to ensure they're above everything
            left: `${bubble.left}%`,
            bottom: '0px', // Start from very bottom
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: 0,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${bubble.size * 1.5}px ${bubble.size}px ${color}60`,
            zIndex: -1, // Stay in background but above the base color
            pointerEvents: 'none', // Don't interfere with clicks
          }}
          animate={{
            y: '-120vh', // Rise all the way up past the viewport
            x: `${bubble.horizontalDrift}%`,
            opacity: [0, bubble.opacity, 0],
            scale: [0.3, 1.1, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 4, // Random pause between bubbles
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      ))}
    </>
  );
};

export const AnimatedEarthBackground: React.FC = () => {
  const { currentLayer } = useLayer();
  const currentTheme = layerThemes[currentLayer];

  return (
    <>
      {/* Base Background */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: currentTheme.color,
          zIndex: -2, // Behind everything
        }}
        initial={false}
        animate={{ backgroundColor: currentTheme.color }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      
      {/* Bubbles - Multiple sizes for depth */}
      <Bubbles density={15} color={currentTheme.bubbleColor} maxSize={8} minSize={3} />
      <Bubbles density={8} color={currentTheme.bubbleColor} maxSize={14} minSize={6} />
      <Bubbles density={4} color={currentTheme.bubbleColor} maxSize={20} minSize={10} />

      {/* Additional bubble set with slightly different color for variety */}
      <Bubbles density={5} color={layerThemes.sea_level.bubbleColor} maxSize={10} minSize={4} />
    </>
  );
};