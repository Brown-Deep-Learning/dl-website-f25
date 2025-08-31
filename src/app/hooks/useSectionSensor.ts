// hooks/useSectionSensor.ts
import { useLayer } from '../contexts/LayerContext';
import { useEffect, useRef, RefObject } from 'react';
import { LayerKey } from '../contexts/LayerContext';

interface UseSectionSensorOptions extends IntersectionObserverInit {}

// Track all visible sections and their ratios
const visibleSections = new Map<LayerKey, number>();

export const useSectionSensor = (
  layerKey: LayerKey, 
  options?: UseSectionSensorOptions
): RefObject<HTMLElement | null> => {
  const ref = useRef<HTMLElement>(null);
  const { changeLayer } = useLayer();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Update the visibility ratio for this section
          visibleSections.set(layerKey, entry.intersectionRatio);
        });

        // Find the section with the highest visibility ratio
        let maxRatio = 0;
        let mostVisibleLayer: LayerKey | null = null;

        visibleSections.forEach((ratio, key) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleLayer = key;
          }
        });

        // Only change layer if a section has significant visibility
        if (mostVisibleLayer && maxRatio > 0.1) {
          console.log(`Changing to ${mostVisibleLayer} with ratio ${maxRatio}`);
          changeLayer(mostVisibleLayer);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        // Remove or adjust rootMargin based on your needs
        // rootMargin: '-25% 0px -25% 0px',
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
        visibleSections.delete(layerKey);
      }
    };
  }, [layerKey, changeLayer, options]);

  return ref;
};