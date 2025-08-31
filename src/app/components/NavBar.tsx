// src/app/components/NavBar.tsx

"use client";

import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import {
  FaHome,
  FaBook,
  FaVideo,
  FaTasks,
  FaCalendarAlt,
  FaFolderOpen,
  FaUsers,
  FaRocket,
  FaProjectDiagram,
} from "react-icons/fa";

const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Trigger the fade-in effect after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to ensure the animation starts after initial render

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${
        isVisible ? styles.fadeIn : styles.hidden
      }`}
    >
      <div className={styles.logo}>
        {/* Replace with your logo image if available */}
        <FaRocket className={styles.logoIcon} />
        <h1>CSCI1470</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <button onClick={() => goToSection("landing-page")}>
            <FaHome className={styles.icon} /> Home
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("course-description")}>
            <FaBook className={styles.icon} /> Course
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("lectures")}>
            <FaVideo className={styles.icon} /> Lectures
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("assignments")}>
            <FaTasks className={styles.icon} /> Assignments
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("calendar")}>
            <FaCalendarAlt className={styles.icon} /> Calendar
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("resources")}>
            <FaFolderOpen className={styles.icon} /> Resources
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("final-project")}>
            <FaProjectDiagram className={styles.icon} /> Final Project
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("staff")}>
            <FaUsers className={styles.icon} /> Staff
          </button>
        </li>
      </ul>
      {/* Optional: Add decorative stars or cosmic elements */}
    </nav>
  );
};

export default NavBar;
