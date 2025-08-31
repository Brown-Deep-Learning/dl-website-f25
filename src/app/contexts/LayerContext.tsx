// contexts/LayerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a type for the layer keys
export type LayerKey = 
  | 'sea_level' 
  | 'crust' 
  | 'upper_mantle' 
  | 'lower_mantle' 
  | 'outer_core' 
  | 'inner_core';

// Define the Layer object with type safety
export const LAYERS: Record<string, LayerKey> = {
  SEA_LEVEL: 'sea_level',
  CRUST: 'crust',
  UPPER_MANTLE: 'upper_mantle',
  LOWER_MANTLE: 'lower_mantle',
  OUTER_CORE: 'outer_core',
  INNER_CORE: 'inner_core',
} as const;

// Define the shape of our context
interface LayerContextType {
  currentLayer: LayerKey;
  changeLayer: (newLayer: LayerKey) => void;
  LAYERS: Record<string, LayerKey>;
}

// Create the context with a default value
const LayerContext = createContext<LayerContextType | undefined>(undefined);

// Props type for the provider
interface LayerProviderProps {
  children: ReactNode;
}

export const LayerProvider: React.FC<LayerProviderProps> = ({ children }) => {
  const [currentLayer, setCurrentLayer] = useState<LayerKey>(LAYERS.SEA_LEVEL);

  const changeLayer = (newLayer: LayerKey) => {
    setCurrentLayer(newLayer);
  };

  const value: LayerContextType = {
    currentLayer,
    changeLayer,
    LAYERS,
  };

  return (
    <LayerContext.Provider value={value}>
      {children}
    </LayerContext.Provider>
  );
};

// Custom hook to use the layer context
export const useLayer = (): LayerContextType => {
  const context = useContext(LayerContext);
  if (context === undefined) {
    throw new Error('useLayer must be used within a LayerProvider');
  }
  return context;
};