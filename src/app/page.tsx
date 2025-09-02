// src/app/page.tsx
"use client";

import { Analytics } from "@vercel/analytics/react";
import LandingPage from "./components/LandingPage";
import CourseDescription from "./components/CourseDescription";
import styles from "./page.module.css";
import Lectures from "./components/Lectures";
import Assignments from "./components/Assignments";
import CourseCalendar from "./components/CourseCalendar";
import Resources from "./components/Resources";
import Staff from "./components/Staff";
import NavBar from "./components/NavBar";
// import FinalProject from "./components/FinalProject";

// theme related imports
import "../styles/earth-themes.css";
import { AnimatedEarthBackground } from './components/AnimatedEarthBackground';
import EarthLayerProgress from "./components/EarthLayerProgress";

const BackgroundOverlay: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--current-bg, #26667F)',
      transition: 'background-color 1.5s ease-in-out',
      zIndex: -2,
    }} />
  );
};

export default function Home() {
  return (
    <main className={styles.main}>
      <AnimatedEarthBackground />
      <NavBar />
      <EarthLayerProgress />

      <div className={styles.scrollContainer}>
        <section 
          id="landing-page" 
          className={styles.section}
          data-earth-theme="sea-level"
        >
          <LandingPage />
          <CourseDescription />
        </section>

        <section 
          id="lectures" 
          className={styles.section}
          data-earth-theme="crust"
        >
          <Lectures />
        </section>

        <section 
          id="assignments" 
          className={styles.section}
          data-earth-theme="upper-mantle"
        >
          <Assignments />
        </section>

        <section 
          id="calendar" 
          className={styles.section}
          data-earth-theme="lower-mantle"
        >
          <CourseCalendar />
        </section>

        <section 
          id="resources" 
          className={styles.section}
          data-earth-theme="outer-core"
        >
          <Resources />
        </section>

        <section 
          id="staff" 
          className={styles.section}
          data-earth-theme="inner-core"        
        >
          <Staff />

          {/* hide the final project section for now  */}
          {/* <FinalProject /> */}
        </section>

        <Analytics />
      </div>
    </main>
  );
}