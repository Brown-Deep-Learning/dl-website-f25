// components/EarthLayerProgress.tsx
"use client";

import React from 'react';
import styles from './EarthLayerProgress.module.css';
import { FaCircle } from 'react-icons/fa';

const EarthLayerProgress: React.FC = () => {
  const layersInOrder = [
    { 
      theme: 'sea-level-theme',
      label: 'Sea Level', 
      bubbleColor: 'var(--sea-level-bubble)',
      targetId: 'landing-page',
      sectionName: 'Home'
    },
    { 
      theme: 'crust-theme',
      label: 'Crust', 
      bubbleColor: 'var(--crust-bubble)',
      targetId: 'lectures',
      sectionName: 'Lectures'
    },
    { 
      theme: 'upper-mantle-theme',
      label: 'Upper Mantle', 
      bubbleColor: 'var(--upper-mantle-bubble)',
      targetId: 'assignments',
      sectionName: 'Assignments'
    },
    { 
      theme: 'lower-mantle-theme',
      label: 'Lower Mantle', 
      bubbleColor: 'var(--lower-mantle-bubble)',
      targetId: 'calendar',
      sectionName: 'Calendar'
    },
    { 
      theme: 'outer-core-theme',
      label: 'Outer Core', 
      bubbleColor: 'var(--outer-core-bubble)',
      targetId: 'resources',
      sectionName: 'Resources'
    },
    { 
      theme: 'inner-core-theme',
      label: 'Inner Core', 
      bubbleColor: 'var(--inner-core-bubble)',
      targetId: 'staff',
      sectionName: 'Staff'
    },
  ];

  const handleNodeClick = (targetId: string, theme: string) => {
    document.documentElement.className = theme;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCurrentTheme = () => {
    return document.documentElement.className;
  };

  return (
    <div className={styles.nodeContainer}>
      <div className={styles.verticalLine} />
      
      {layersInOrder.map((layer) => {
        const isActive = getCurrentTheme() === layer.theme;
        const isCompleted = layersInOrder.findIndex(l => l.theme === getCurrentTheme()) > 
                          layersInOrder.findIndex(l => l.theme === layer.theme);
        
        return (
          <div key={layer.theme} className={styles.nodeGroup}>
            <button
              className={`${styles.node} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
              onClick={() => handleNodeClick(layer.targetId, layer.theme)}
              style={{ 
                borderColor: layer.bubbleColor,
                backgroundColor: isActive ? layer.bubbleColor : isCompleted ? layer.bubbleColor : 'transparent',
              }}
              aria-label={`Navigate to ${layer.sectionName}`}
            >
              {isCompleted && <FaCircle className={styles.completedCheck} />}
            </button>

            <div className={styles.hoverContent}>
              <div className={styles.layerInfo}>
                <span className={styles.layerLabel} style={{ color: layer.bubbleColor }}>
                  {layer.label}
                </span>
                <h4 className={styles.layerName}>
                  {layer.sectionName}
                </h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EarthLayerProgress;