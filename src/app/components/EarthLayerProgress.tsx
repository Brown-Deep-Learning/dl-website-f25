// components/EarthLayerProgress.tsx
"use client";

import React from 'react';
import styles from './EarthLayerProgress.module.css';
import { FaCircle } from 'react-icons/fa';

const EarthLayerProgress: React.FC = () => {
  const layersInOrder = [
    { 
      theme: 'sea-level',
      label: 'Sea Level', 
      textColor: 'var(--sea-level-background)',
      bubbleColor: 'var(--sea-level-bubble)',
      targetId: 'landing-page',
      sectionName: 'Home'
    },
    { 
      theme: 'crust',
      label: 'Crust', 
      textColor: 'var(--crust-background)',
      bubbleColor: 'var(--crust-bubble)',
      targetId: 'lectures',
      sectionName: 'Lectures'
    },
    { 
      theme: 'upper-mantle',
      label: 'Upper Mantle', 
      textColor: 'var(--upper-mantle-background)',
      bubbleColor: 'var(--upper-mantle-bubble)',
      targetId: 'assignments',
      sectionName: 'Assignments'
    },
    { 
      theme: 'lower-mantle',
      label: 'Lower Mantle', 
      textColor: 'var(--lower-mantle-background)',
      bubbleColor: 'var(--lower-mantle-bubble)',
      targetId: 'calendar',
      sectionName: 'Calendar'
    },
    { 
      theme: 'outer-core',
      label: 'Outer Core', 
      TextColor: 'var(--outer-core-background)',
      bubbleColor: 'var(--outer-core-bubble)',
      targetId: 'resources',
      sectionName: 'Resources'
    },
    { 
      theme: 'inner-core',
      label: 'Inner Core', 
      textColor: 'var(--inner-core-background)',
      bubbleColor: 'var(--inner-core-bubble)',
      targetId: 'staff',
      sectionName: 'Staff'
    },
  ];

  const handleNodeClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.nodeContainer}>
      <div className={styles.verticalLine} />
      
      {layersInOrder.map((layer) => (
        <div key={layer.theme} className={styles.nodeGroup}>
          <button
            className={styles.node}
            onClick={() => handleNodeClick(layer.targetId)}
            style={{ 
              borderColor: layer.bubbleColor,
              backgroundColor: 'transparent',
            }}
            aria-label={`Navigate to ${layer.sectionName}`}
          >
            <FaCircle className={styles.completedCheck} />
          </button>

          <div className={styles.hoverContent}>
            <div className={styles.layerInfo}>
              <h4 style={{ color: layer.textColor, margin: '0 0 8px 0' }}>
                {layer.sectionName}
              </h4>
              <span className={styles.layerLabel} style={{ color: layer.textColor }}>
                {layer.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EarthLayerProgress;