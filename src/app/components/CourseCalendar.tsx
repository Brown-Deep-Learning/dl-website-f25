// components/CourseCalendar.tsx
import React from "react";
import styles from "./CourseCalendar.module.css";
import { FaSpaceShuttle } from "react-icons/fa";

const CourseCalendar = () => {
  return (
    <section id="calendar" className={styles.calendarSection}>
      <div className={styles.calendarContainer}>
        <h2 className={styles.heading}>
          <FaSpaceShuttle className={styles.shuttleIcon} />
          Course Timeline
          <FaSpaceShuttle className={styles.shuttleIcon} />
        </h2>

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
