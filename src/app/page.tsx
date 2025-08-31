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

// Import your custom hook for each section
import { useSectionSensor } from './hooks/useSectionSensor.ts';
import { LAYERS } from './contexts/LayerContext';

// Define the layer mapping for your sections
const sectionLayers = {
  "landing-page": LAYERS.SEA_LEVEL,
  "course-description": LAYERS.CRUST,
  "lectures": LAYERS.UPPER_MANTLE,
  "assignments": LAYERS.LOWER_MANTLE,
  "calendar": LAYERS.OUTER_CORE,
  "resources": LAYERS.OUTER_CORE, // You can reuse layers for multiple sections
  "final-project": LAYERS.INNER_CORE,
  "staff": LAYERS.INNER_CORE,
};

export default function Home() {
  return (
    <LayerProvider>
      <main className={styles.main}>
        <AnimatedEarthBackground />

        <NavBar />

        <div className={styles.scrollContainer}>
          <SectionWithSensor id="landing-page">
            <LandingPage />
          </SectionWithSensor>

          <SectionWithSensor id="course-description">
            <CourseDescription />
          </SectionWithSensor>

          <SectionWithSensor id="lectures">
            <Lectures />
          </SectionWithSensor>

          <SectionWithSensor id="assignments">
            <Assignments />
          </SectionWithSensor>

          <SectionWithSensor id="calendar">
            <CourseCalendar />
          </SectionWithSensor>

          <SectionWithSensor id="resources">
            <Resources />
          </SectionWithSensor>

          <SectionWithSensor id="final-project">
            <FinalProject />
          </SectionWithSensor>

          <SectionWithSensor id="staff">
            <Staff />
          </SectionWithSensor>

          <Analytics />
        </div>
      </main>
    </LayerProvider>
  );
}

// Create a wrapper component that adds the sensor to each section
function SectionWithSensor({ id, children }: { id: keyof typeof sectionLayers; children: React.ReactNode }) {
  const sectionRef = useSectionSensor(sectionLayers[id]);

  return (
    <section id={id} ref={sectionRef} className={styles.section}>
      {children}
    </section>
  );
}