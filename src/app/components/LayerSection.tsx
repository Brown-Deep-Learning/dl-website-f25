// components/LayerSection.tsx
"use client";

import React, { useEffect } from 'react';
import { useLayer } from '../contexts/LayerContext';
import { LayerKey } from '../contexts/LayerContext';

interface LayerSectionProps {
  layer: LayerKey;
  children: React.ReactNode;
  className?: string;
}

export const LayerSection: React.FC<LayerSectionProps> = ({ 
  layer, 
  children, 
  className = '' 
}) => {
  const { setCurrentLayer } = useLayer();

  useEffect(() => {
    setCurrentLayer(layer);
  }, [layer, setCurrentLayer]);

  return (
    <div className={className}>
      {children}
    </div>
  );
};