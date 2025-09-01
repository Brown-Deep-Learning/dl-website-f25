// components/Lectures.tsx
import React from "react";
import styles from "./Lectures.module.css";
import { lectureGroups } from "../data/lectureData";
import { FaFire, FaMountain } from "react-icons/fa"; // Updated icons
// import { IoPlanet } from "react-icons/io5";

const Lectures = () => {
  return (
    <section id="lectures" className={styles.container}>
      <div className={styles.headingContainer}>
        {/* <IoPlanet className={styles.groupIcon} /> */}
        <h2 className={styles.heading}>Lectures</h2>
        {/* <IoPlanet className={styles.groupIcon} /> */}
      </div>
      <div className={styles.groups}>
        {lectureGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.group}>
            {group.title && (
              <h3 className={styles.groupTitle}>{group.title}</h3>
            )}
            <ul className={styles.lectureList}>
              {group.lectures.map((lecture) => (
                <li key={lecture.id} className={styles.lectureItem}>
                  <div className={styles.lectureInfo}>
                    <span className={styles.lectureDate}>{lecture.date}</span>
                    <span className={styles.lectureTitle}>{lecture.title}</span>
                  </div>
                  <div className={styles.lectureLinks}>
                    {lecture.slidesLink && (
                      <a
                        href={lecture.slidesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                      >
                        <FaFire className={styles.linkIcon} /> Slides
                      </a>
                    )}
                    {lecture.recordingLink && (
                      <a
                        href={lecture.recordingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                      >
                        <FaMountain className={styles.linkIcon} /> Recording
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Lectures;
