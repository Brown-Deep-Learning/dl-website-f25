// src/app/components/CourseCalendar.tsx
import React, { useState, useEffect } from "react";
import styles from "./CourseCalendar.module.css";
import { useSectionSensor } from "../hooks/useSectionSensor";
import { LAYERS } from "../contexts/LayerContext";
import { FaHammer } from "react-icons/fa";
import { GiMiningHelmet } from "react-icons/gi";

const CourseCalendar = () => {
  const sectionRef = useSectionSensor<HTMLDivElement>(LAYERS.OUTER_CORE);
  const [semesterProgress, setSemesterProgress] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [, setTotalDays] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const startDate = new Date("2025-09-03"); // September 3rd, 2025
      const endDate = new Date("2025-12-10"); // December 10th, 2025
      const currentDate = new Date();

      const totalSemesterDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysElapsed = Math.ceil(
        (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysRemaining = Math.max(0, totalSemesterDays - daysElapsed);

      let progress = 0;
      if (currentDate >= startDate && currentDate <= endDate) {
        progress = Math.min(
          100,
          Math.max(0, (daysElapsed / totalSemesterDays) * 100)
        );
      } else if (currentDate > endDate) {
        progress = 100;
      }

      setSemesterProgress(progress);
      setDaysLeft(daysRemaining);
      setTotalDays(totalSemesterDays);
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="calendar" className={styles.calendarSection}>
      <div className={styles.calendarContainer}>
        <h2 className={styles.heading}>
          <FaHammer className={styles.shuttleIcon} />
          Course Timeline
          <FaHammer className={styles.shuttleIcon} />
        </h2>

        {/* Semester Progress Bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <GiMiningHelmet className={styles.progressIcon} />
            <span className={styles.progressTitle}>Semester Progress</span>
            <GiMiningHelmet className={styles.progressIcon} />
          </div>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarTrack}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${semesterProgress}%` }}
              >
                <div className={styles.progressDrill}></div>
              </div>
            </div>
            <div className={styles.progressStats}>
              <span className={styles.progressText}>
                {Math.round(semesterProgress)}% Complete
              </span>
              <span className={styles.daysText}>
                {daysLeft > 0 ? `${daysLeft} days left` : "Semester Complete!"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.calendarWrapper}>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=c_677de32c837199a48dcc87d48ec0232d010b51b1460811e74deca227e73270db%40group.calendar.google.com&ctz=America%2FNew_York"
            className={styles.calendarFrame}
            frameBorder="0"
            scrolling="no"
            title="Course Calendar"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default CourseCalendar;
