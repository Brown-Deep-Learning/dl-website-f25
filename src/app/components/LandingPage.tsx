// components/LandingPage.tsx
"use client";

import React, { useRef } from "react";
import styles from "./LandingPage.module.css";
import TypewriterText from "./TypewriterText";

// SVG Drill Icon Component
const DrillIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="48" 
    height="48" 
    viewBox="0 0 8 8"
    className={styles.drillIcon}
  >
    <path fill="currentColor" d="M3 6v1l2-2M3 4v1l2-2M3 2v1l2-2m0 6L4 8L3 7V1L1 0h6L5 1"/>
  </svg>
);

const LandingPage = () => {
  const drillButtonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    if (drillButtonRef.current) {
      drillButtonRef.current.classList.add(styles.drillDown);

      const nextSection = document.getElementById("course-description");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }

      drillButtonRef.current.addEventListener(
        "animationend",
        () => {
          if (drillButtonRef.current) {
            drillButtonRef.current.classList.remove(styles.drillDown);
          }
        },
        { once: true }
      );
    }
  };

  return (
    <section id="landing-page" className={styles.section}>
      <div className={styles.container}>
        {/* Content on top of the star background */}
        <TypewriterText
          text="WELCOME TO DEEP LEARNING"
          speed={150}
          className={styles.title}
        />
        <TypewriterText
          text="BROWN UNIVERSITY'S CSCI1470"
          speed={150}
          className={styles.subTitle}
        />

        <button
          ref={drillButtonRef}
          className={styles.drillButton}
          onClick={handleButtonClick}
          aria-label="Drill down to next section"
        >
          <DrillIcon />
        </button>
      </div>
    </section>
  );
};

export default LandingPage;