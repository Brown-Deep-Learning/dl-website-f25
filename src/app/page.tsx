// src/app/page.tsx
"use client";

// app/layout.tsx
import "../styles/earth-themes.css";

import LandingPage from "./components/LandingPage";
import CourseDescription from "./components/CourseDescription";
import styles from "./page.module.css";
import Lectures from "./components/Lectures";
import Assignments from "./components/Assignments";
import CourseCalendar from "./components/CourseCalendar";
import Resources from "./components/Resources";
import Staff from "./components/Staff";
import NavBar from "./components/NavBar";
import EarthLayers from "./components/EarthLayers";
import { LayerProvider } from "./contexts/LayerContext";

export default function Home() {
  return (
    <LayerProvider>
      <main className={styles.main}>
        {/* <ThemeManager /> */}
        <EarthLayers />
        <NavBar />
        {/* <EarthLayerProgr ess /> */}

        <div className={styles.scrollContainer}>
          <section id="landing-page" className={styles.section}>
            <LandingPage />
            <CourseDescription />
          </section>

          <section id="lectures" className={styles.section}>
            <Lectures />
          </section>

          <section id="assignments" className={styles.section}>
            <Assignments />
          </section>

          <section id="calendar" className={styles.section}>
            <CourseCalendar />
          </section>

          <section id="resources" className={styles.section}>
            <Resources />
          </section>

          <section id="staff" className={styles.section}>
            <Staff />
            {/* <FinalProject /> */}
          </section>

          {/* <Analytics /> */}
        </div>
      </main>
    </LayerProvider>
  );
}
