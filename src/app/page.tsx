// src/app/page.tsx
"use client";

// app/layout.tsx
import '../styles/earth-themes.css';

import { Analytics } from "@vercel/analytics/react";
import { AnimatedEarthBackground } from './components/AnimatedEarthBackground';
import ThemeManager from './components/ThemeManager';
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
import EarthLayerProgress from "./components/EarthLayerProgress";

export default function Home() {
  return (
    <main className={styles.main}>
      <ThemeManager />
      <AnimatedEarthBackground />
      <NavBar />
      <EarthLayerProgress />

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
          <FinalProject />
        </section>

        <Analytics />
      </div>
    </main>
  );
}