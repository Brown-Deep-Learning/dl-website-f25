// hooks/useSectionSensor.ts
import { useLayer } from '../contexts/LayerContext';
import { useEffect, useRef, RefObject } from 'react';
import { LayerKey } from '../contexts/LayerContext';

interface UseSectionSensorOptions extends IntersectionObserverInit {}

export const useSectionSensor = <T extends HTMLElement = HTMLElement>(
  layerKey: LayerKey, 
  options?: UseSectionSensorOptions
): RefObject<T | null> => { // <-- Use generic T and include null
  const ref = useRef<T>(null);
  const { changeLayer } = useLayer();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          changeLayer(layerKey);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-25% 0px -25% 0px',
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
      }
    };
  }, [layerKey, changeLayer, options]);

  return ref;
};