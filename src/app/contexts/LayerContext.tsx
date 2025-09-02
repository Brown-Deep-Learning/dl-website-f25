// contexts/LayerContext.ts
import React, { createContext, useContext, useState } from 'react';

// Use consistent naming - either all uppercase or all lowercase
export const LAYERS = {
  SEA_LEVEL: 'SEA_LEVEL',
  CRUST: 'CRUST',
  UPPER_MANTLE: 'UPPER_MANTLE', 
  LOWER_MANTLE: 'LOWER_MANTLE',
  OUTER_CORE: 'OUTER_CORE',
  INNER_CORE: 'INNER_CORE',
} as const;

export type LayerKey = keyof typeof LAYERS;

interface LayerTheme {
  color: string;
  bubbleColor: string;
  textColor: string;
  accentColor: string;
}

const layerThemes: Record<LayerKey, LayerTheme> = {
  SEA_LEVEL: { color: '#26667F', bubbleColor: '#94d2bd', textColor: '#e9f5db', accentColor: '#4ecdc4' },
  CRUST: { color: '#B99470', bubbleColor: '#e6ccb2', textColor: '#fff1e6', accentColor: '#e07a5f' },
  UPPER_MANTLE: { color: '#FFB4A2', bubbleColor: '#FF7D29', textColor: '#2d1e0d', accentColor: '#ffb74d' },
  LOWER_MANTLE: { color: '#E7CCCC', bubbleColor: '#8A2D3B', textColor: '#fff1e6', accentColor: '#e68a2e' },
  OUTER_CORE: { color: '#FFCDB2', bubbleColor: '#FFBF78', textColor: '#ffccd5', accentColor: '#d62828' },
  INNER_CORE: { color: '#FFECC8', bubbleColor: '#EBE5C2', textColor: '#e0fbfc', accentColor: '#0a9396' },
};

interface LayerContextType {
  currentLayer: LayerKey;
  setCurrentLayer: (layer: LayerKey) => void;
  currentTheme: LayerTheme;
  LAYERS: typeof LAYERS;
}

const LayerContext = createContext<LayerContextType | undefined>(undefined);

export const useLayer = () => {
  const context = useContext(LayerContext);
  if (!context) {
    throw new Error('useLayer must be used within a LayerProvider');
  }
  return context;
};

export const LayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLayer, setCurrentLayer] = useState<LayerKey>('SEA_LEVEL');

  const value = {
    currentLayer,
    setCurrentLayer,
    currentTheme: layerThemes[currentLayer],
    LAYERS,
  };

  return (
    <LayerContext.Provider value={value}>
      {children}
    </LayerContext.Provider>
  );
};