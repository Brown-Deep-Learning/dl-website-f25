// components/AnimatedEarthBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLayer } from '../contexts/LayerContext';
import { LayerKey } from '../contexts/LayerContext';

// Define type for layer themes
interface LayerTheme {
  color: string;
}

// Map layer keys to their themes with type safety
const layerThemes: Record<LayerKey, LayerTheme> = {
  sea_level: { color: '#0a9396' },      // Ocean Blue
  crust: { color: '#bb3e03' },          // Rust / Rock
  upper_mantle: { color: '#ee9b00' },   // Amber
  lower_mantle: { color: '#ca6702' },   // Deep Orange
  outer_core: { color: '#9b2226' },     // Molten Red
  inner_core: { color: '#001219' },     // Metallic Grey
};

export const AnimatedEarthBackground: React.FC = () => {
  const { currentLayer } = useLayer();
  const currentTheme = layerThemes[currentLayer];

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundColor: currentTheme.color,
      }}
      initial={false}
      animate={{ backgroundColor: currentTheme.color }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
  );
};