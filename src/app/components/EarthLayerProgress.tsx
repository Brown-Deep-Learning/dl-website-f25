// src/app/components/EarthLayerProgress.tsx
"use client";

import React from 'react';
import { useLayer } from '../contexts/LayerContext';
import { useScrollProgress } from '../page';
import styles from './EarthLayerProgress.module.css';
import { FaCircle } from 'react-icons/fa';

const EarthLayerProgress: React.FC = () => {
  const { currentLayer, LAYERS, changeLayer } = useLayer();
  const { sectionProgress } = useScrollProgress();

  const layersInOrder = [
    { 
      key: LAYERS.SEA_LEVEL, 
      label: 'Sea Level', 
      color: '#0a9396',
      depth: '0 km',
      sections: ['landing-page'],
      targetId: 'landing-page'
    },
    { 
      key: LAYERS.CRUST, 
      label: 'Crust', 
      color: '#bb3e03',
      depth: '0-35 km',
      sections: ['lectures'],
      targetId: 'lectures'
    },
    { 
      key: LAYERS.UPPER_MANTLE, 
      label: 'Upper Mantle', 
      color: '#ee9b00',
      depth: '35-410 km',
      sections: ['assignments'],
      targetId: 'assignments'
    },
    { 
      key: LAYERS.LOWER_MANTLE, 
      label: 'Lower Mantle', 
      color: '#ca6702',
      depth: '410-2891 km',
      sections: ['calendar'],
      targetId: 'calendar'
    },
    { 
      key: LAYERS.OUTER_CORE, 
      label: 'Outer Core', 
      color: '#9b2226',
      depth: '2891-5150 km',
      sections: ['resources'],
      targetId: 'resources'
    },
    { 
      key: LAYERS.INNER_CORE, 
      label: 'Inner Core', 
      color: '#001219',
      depth: '5150-6371 km',
      sections: ['staff'],
      targetId: 'staff'
    },
  ];

  const handleNodeClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSectionName = (sectionId: string): string => {
    const sectionNames: Record<string, string> = {
      'landing-page': 'Home',
      'lectures': 'Lectures',
      'assignments': 'Assignments',
      'calendar': 'Calendar',
      'resources': 'Resources',
    //   'final-project': 'Project',
      'staff': 'Staff'
    };
    return sectionNames[sectionId] || sectionId;
  };

  return (
    <div className={styles.nodeContainer}>
      {/* Vertical connecting line */}
      <div className={styles.verticalLine} />
      
      {layersInOrder.map((layer, index) => {
        const isActive = layer.key === currentLayer;
        const isCompleted = layersInOrder.findIndex(l => l.key === currentLayer) > index;
        
        return (
          <div key={layer.key} className={styles.nodeGroup}>
            {/* Node */}
            <button
              className={`${styles.node} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
              onClick={() => handleNodeClick(layer.targetId)}
              style={{ 
                borderColor: layer.color,
                backgroundColor: isActive ? layer.color : 'transparent'
              }}
              aria-label={`Navigate to ${layer.label}`}
            >
              {isCompleted && (
                <FaCircle className={styles.completedCheck} />
              )}
            </button>

            {/* Hover Content */}
            <div className={styles.hoverContent}>
              <div className={styles.layerInfo}>
                <h4 
                  className={styles.layerName}
                  style={{ color: layer.color }}
                >
                  {layer.label}
                </h4>
                <span className={styles.layerDepth}>{layer.depth}</span>
                
                {/* Sections List */}
                <div className={styles.sectionsList}>
                  {layer.sections.map(sectionId => (
                    <div 
                      key={sectionId} 
                      className={`${styles.sectionItem} ${
                        sectionProgress[sectionId] === 100 ? styles.completed : ''
                      }`}
                    >
                      <span className={styles.sectionName}>
                        {getSectionName(sectionId)}
                      </span>
                      {sectionProgress[sectionId] > 0 && (
                        <span className={styles.sectionProgress}>
                          {sectionProgress[sectionId]}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EarthLayerProgress;