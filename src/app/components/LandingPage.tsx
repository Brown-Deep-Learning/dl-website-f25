// src/app/components/LandingPage.tsx
"use client";

import React, { useRef } from "react";
import styles from "./LandingPage.module.css";
import TypewriterText from "./TypewriterText";
import { useSectionSensor } from "../hooks/useSectionSensor";
import { LAYERS } from "../contexts/LayerContext";

// SVG Fry Basket Icon Component
const BasketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 64 64"
  >
    {/* Basket mesh/grid */}
    <rect x="12" y="8" width="40" height="32" fill="none" stroke="currentColor" strokeWidth="2" rx="2" />

    {/* Vertical lines for mesh */}
    <line x1="20" y1="8" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" />
    <line x1="28" y1="8" x2="28" y2="40" stroke="currentColor" strokeWidth="1.5" />
    <line x1="36" y1="8" x2="36" y2="40" stroke="currentColor" strokeWidth="1.5" />
    <line x1="44" y1="8" x2="44" y2="40" stroke="currentColor" strokeWidth="1.5" />

    {/* Horizontal lines for mesh */}
    <line x1="12" y1="16" x2="52" y2="16" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="24" x2="52" y2="24" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1.5" />

    {/* Handle */}
    <path d="M 10 8 Q 8 8 8 10 L 8 14 Q 8 16 10 16" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M 54 8 Q 56 8 56 10 L 56 14 Q 56 16 54 16" fill="none" stroke="currentColor" strokeWidth="2" />

    {/* Some fries inside the basket */}
    <rect x="18" y="12" width="3" height="16" fill="currentColor" opacity="0.5" rx="1" />
    <rect x="26" y="14" width="3" height="14" fill="currentColor" opacity="0.5" rx="1" />
    <rect x="34" y="13" width="3" height="15" fill="currentColor" opacity="0.5" rx="1" />
    <rect x="42" y="11" width="3" height="17" fill="currentColor" opacity="0.5" rx="1" />

    {/* Oil drips */}
    <circle cx="16" cy="42" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="32" cy="43" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="48" cy="42" r="1.5" fill="currentColor" opacity="0.3" />
  </svg>
);

const LandingPage = () => {
  const basketRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useSectionSensor<HTMLDivElement>(LAYERS.CRUST);

  const handleButtonClick = () => {
    if (basketRef.current) {
      basketRef.current.classList.add(styles.plunging);

      const nextSection = document.getElementById("course-description");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }

      basketRef.current.addEventListener(
        "animationend",
        () => {
          if (basketRef.current) {
            basketRef.current.classList.remove(styles.plunging);
          }
        },
        { once: true }
      );
    }
  };

  return (
    <div ref={sectionRef} className={styles.container}>
      <TypewriterText
        text="Welcome to Deep Learning"
        speed={150}
        className={styles.title}
      />
      <TypewriterText
        text="BROWN UNIVERSITY'S CRISPIEST COURSE"
        speed={150}
        className={styles.subTitle}
      />

      <button
        ref={basketRef}
        className={styles.basketButton}
        onClick={handleButtonClick}
        aria-label="Plunge into the deep fryer"
      >
        <BasketIcon />
      </button>
    </div>
  );
};

export default LandingPage;
