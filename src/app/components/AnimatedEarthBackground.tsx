// components/AnimatedEarthBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLayer } from '../contexts/LayerContext';
import { LayerKey } from '../contexts/LayerContext';

interface LayerTheme {
  color: string;
  waveColor: string;
  bubbleColor: string;
}

const layerThemes: Record<LayerKey, LayerTheme> = {
  sea_level: { color: '#082567', waveColor: '#4ecdc4', bubbleColor: '#94d2bd' },
  crust: { color: '#bb3e03', waveColor: '#e07a5f', bubbleColor: '#e6ccb2' },
  upper_mantle: { color: '#ee9b00', waveColor: '#ffb74d', bubbleColor: '#ffddd2' },
  lower_mantle: { color: '#ca6702', waveColor: '#e68a2e', bubbleColor: '#ffb4a2' },
  outer_core: { color: '#9b2226', waveColor: '#d62828', bubbleColor: '#ff8fa3' },
  inner_core: { color: '#001219', waveColor: '#005f73', bubbleColor: '#0a9396' },
};

// Improved Wave component that covers full width with multiple waves
const SinuousWave: React.FC<{ 
  amplitude: number; 
  speed: number; 
  color: string;
  opacity: number;
  blendMode?: 'screen' | 'overlay' | 'soft-light' | 'color-dodge' | 'multiply';
  waveCount?: number;
}> = ({ amplitude, speed, color, opacity, blendMode = 'overlay', waveCount = 3 }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity,
      mixBlendMode: blendMode,
      overflow: 'hidden',
    }}>
      {/* Multiple wave layers for full coverage */}
      {Array.from({ length: waveCount }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${(i / waveCount) * 100}%`,
            left: 0,
            width: '200%', // Double width for seamless looping
            height: `${100 / waveCount}%`,
            background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
            mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50'%3E%3Cpath fill='white' d='M0,25 C50,${25 - amplitude} 150,${25 + amplitude} 200,25 L200,50 L0,50 Z'/%3E%3C/svg%3E")`,
            maskSize: '100% 100%',
          }}
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: speed * (1 + i * 0.3), // Stagger speeds
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

// Bubble component (replacing mineral flecks)
const Bubbles: React.FC<{ 
  density: number; 
  color: string;
  maxSize: number;
}> = ({ density, color, maxSize }) => {
  const bubbles = Array.from({ length: density }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * (maxSize - 2),
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 6,
    riseHeight: 20 + Math.random() * 60,
  }));

  return (
    <>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            position: 'absolute',
            left: `${bubble.left}%`,
            bottom: '-10%', // Start below viewport
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: 0,
            filter: 'blur(1px)',
            boxShadow: `0 0 ${bubble.size * 0.5}px ${bubble.size * 0.3}px ${color}40`,
          }}
          animate={{
            y: `-${100 + bubble.riseHeight}%`, // Rise up and beyond
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.8],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeOut',
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
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1,
      overflow: 'hidden',
    }}>
      {/* Base Animated Background */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: currentTheme.color,
        }}
        initial={false}
        animate={{ backgroundColor: currentTheme.color }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      
      {/* Primary Wave Layer - More prominent */}
      <SinuousWave
        amplitude={12}
        speed={25}
        color={currentTheme.waveColor}
        opacity={0.6} // Increased opacity
        blendMode="overlay"
        waveCount={4}
      />
      
      {/* Secondary Wave Layer - different timing */}
      <SinuousWave
        amplitude={8}
        speed={35}
        color={currentTheme.waveColor}
        opacity={0.4}
        blendMode="soft-light"
        waveCount={3}
      />
      
      {/* Tertiary Wave Layer - subtle contrast */}
      <SinuousWave
        amplitude={6}
        speed={45}
        color={currentTheme.bubbleColor}
        opacity={0.3}
        blendMode="screen"
        waveCount={2}
      />

      {/* Small Bubbles */}
      <Bubbles 
        density={15} 
        color={currentTheme.bubbleColor} 
        maxSize={8} 
      />
      
      {/* Medium Bubbles */}
      <Bubbles 
        density={8} 
        color={currentTheme.waveColor} 
        maxSize={12} 
      />

      {/* Large Occasional Bubbles */}
      <Bubbles 
        density={3} 
        color={currentTheme.waveColor} 
        maxSize={20} 
      />

      {/* Subtle noise texture */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.05,
        mixBlendMode: 'overlay' as const,
      }} />
    </div>
  );
};