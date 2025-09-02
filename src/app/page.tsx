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
import SimpleThemeController from './components/SimpleThemeController';
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
      <SimpleThemeController />
      <AnimatedEarthBackground />
      <NavBar />
      <EarthLayerProgress />

      <div className={styles.scrollContainer}>
        <section 
          id="landing-page" 
          className={styles.section}
          data-earth-theme="sea-level"
          // style={{ minHeight: '100vh' }}
        >
          <LandingPage />
          <CourseDescription />
        </section>

        <section 
          id="lectures" 
          className={styles.section}
          data-earth-theme="crust"
          // style={{ minHeight: '100vh' }}
        >
          <Lectures />
        </section>

        <section 
          id="assignments" 
          className={styles.section}
          data-earth-theme="upper-mantle"
          // style={{ minHeight: '100vh' }}
        >
          <Assignments />
        </section>

        <section 
          id="calendar" 
          className={styles.section}
          data-earth-theme="lower-mantle"
          // style={{ minHeight: '100vh' }}
        >
          <CourseCalendar />
        </section>

        <section 
          id="resources" 
          className={styles.section}
          data-earth-theme="outer-core"
          // style={{ minHeight: '100vh' }}
        >
          <Resources />
        </section>

        <section 
          id="staff" 
          className={styles.section}
          data-earth-theme="inner-core"
          // style={{ minHeight: '100vh' }}
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