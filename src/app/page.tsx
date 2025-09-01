// src/app/page.tsx
"use client";

import { Analytics } from "@vercel/analytics/react";
import { LayerProvider } from './contexts/LayerContext';
import { AnimatedEarthBackground } from './components/AnimatedEarthBackground';
import LandingPage from "./components/LandingPage";
import CourseDescription from "./components/CourseDescription";
import styles from "./page.module.css";
import Lectures from "./components/Lectures";
import Assignments from "./components/Assignments";
import CourseCalendar from "./components/CourseCalendar";
import Resources from "./components/Resources";
import Staff from "./components/Staff";
import NavBar from "./components/NavBar";
import FinalProject from "./components/FinalProject";
import EarthLayerProgress from "./components/EarthLayerProgress"; // Add this import

// Import your custom hook for each section
import { useSectionSensor } from './hooks/useSectionSensor';
import { LAYERS } from './contexts/LayerContext';
import { useState, useCallback, useEffect } from 'react';
import React from "react";

// Define the layer mapping for your sections
const sectionLayers = {
  "landing-page": LAYERS.SEA_LEVEL,
  // "course-description": LAYERS.CRUST,
  "lectures": LAYERS.CRUST,
  "assignments": LAYERS.UPPER_MANTLE,
  "calendar": LAYERS.LOWER_MANTLE,
  "resources": LAYERS.OUTER_CORE,
  // "final-project": LAYERS.INNER_CORE,
  "staff": LAYERS.INNER_CORE,
};

// Create a type for scroll progress context
interface ScrollProgressContextType {
  sectionProgress: Record<string, number>;
  updateSectionProgress: (sectionId: string, progress: number) => void;
}

// Create a context for scroll progress
const ScrollProgressContext = React.createContext<ScrollProgressContextType | undefined>(undefined);

export const useScrollProgress = () => {
  const context = React.useContext(ScrollProgressContext);
  if (!context) {
    throw new Error('useScrollProgress must be used within a ScrollProgressProvider');
  }
  return context;
};

export default function Home() {
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});

  const updateSectionProgress = useCallback((sectionId: string, progress: number) => {
    setSectionProgress(prev => ({
      ...prev,
      [sectionId]: progress
    }));
  }, []);

  return (
    <LayerProvider>
      <ScrollProgressContext.Provider value={{ sectionProgress, updateSectionProgress }}>
        <main className={styles.main}>
          <AnimatedEarthBackground />
          <NavBar />

          {/* progress indicator bar */}
          <EarthLayerProgress />

          <div className={styles.scrollContainer}>
            <SectionWithSensor id="landing-page" updateProgress={updateSectionProgress}>
              <LandingPage />
              <CourseDescription />
            </SectionWithSensor>

            <SectionWithSensor id="lectures" updateProgress={updateSectionProgress}>
              <Lectures />
            </SectionWithSensor>

            <SectionWithSensor id="assignments" updateProgress={updateSectionProgress}>
              <Assignments />
            </SectionWithSensor>

            <SectionWithSensor id="calendar" updateProgress={updateSectionProgress}>
              <CourseCalendar />
            </SectionWithSensor>

            <SectionWithSensor id="resources" updateProgress={updateSectionProgress}>
              <Resources />
            </SectionWithSensor>

            {/* <SectionWithSensor id="final-project" updateProgress={updateSectionProgress}>
              <FinalProject />
            </SectionWithSensor> */}

            <SectionWithSensor id="staff" updateProgress={updateSectionProgress}>
              <Staff />
            </SectionWithSensor>

            <Analytics />
          </div>
        </main>
      </ScrollProgressContext.Provider>
    </LayerProvider>
  );
}

// Enhanced wrapper component with scroll progress tracking
function SectionWithSensor({ 
  id, 
  children, 
  updateProgress 
}: { 
  id: keyof typeof sectionLayers; 
  children: React.ReactNode;
  updateProgress: (sectionId: string, progress: number) => void;
}) {
  const sectionRef = useSectionSensor(sectionLayers[id]);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Track scroll progress within this section
  useEffect(() => {
    const calculateScrollProgress = () => {
      const element = document.getElementById(id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate how much of the element is visible
      const visibleHeight = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
      const progress = visibleHeight / elementHeight;
      
      // Calculate scroll percentage through the element
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + elementHeight)
      ));
      
      const percentage = Math.round(scrollProgress * 100);
      setCurrentProgress(percentage);
      updateProgress(id, percentage);
    };

    // Calculate initially
    calculateScrollProgress();

    // Add event listeners
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    window.addEventListener('resize', calculateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, [id, updateProgress]);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={styles.section}
      data-scroll-progress={currentProgress}
    >
      {children}
    </section>
  );
}