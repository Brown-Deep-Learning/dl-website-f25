// src/app/components/NavBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import {
  FaMountain,
  FaLayerGroup,
  FaHammer,
  FaGem,
  FaCalendarAlt,
  FaHardHat,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { GiCrystalGrowth, GiMineWagon } from "react-icons/gi";

const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const goToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest(`.${styles.navbar}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`${styles.navbar} ${
        isVisible ? styles.fadeIn : styles.hidden
      }`}
    >
      <div className={styles.logo}>
        <FaMountain className={styles.logoIcon} />
        <h1>CSCI1470</h1>
      </div>

      {/* Desktop Navigation */}
      <ul className={styles.navLinks}>
        <li>
          <button onClick={() => goToSection("landing-page")}>
            <FaMountain className={styles.icon} /> Home
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("course-description")}>
            <FaLayerGroup className={styles.icon} /> Course
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("lectures")}>
            <GiMineWagon className={styles.icon} /> Lectures
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("assignments")}>
            <FaHammer className={styles.icon} /> Assignments
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("calendar")}>
            <FaCalendarAlt className={styles.icon} /> Calendar
          </button>
        </li>
        <li>
          <button onClick={() => goToSection("resources")}>
            <FaGem className={styles.icon} /> Resources
          </button>
        </li>
        {/* <li>
          <button onClick={() => goToSection("final-project")}>
            <GiCrystalGrowth className={styles.icon} /> Final Project
          </button>
        </li> */}
        <li>
          <button onClick={() => goToSection("staff")}>
            <FaHardHat className={styles.icon} /> Staff
          </button>
        </li>
      </ul>

      {/* Mobile Hamburger Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label={
          isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <FaTimes className={styles.hamburgerIcon} />
        ) : (
          <FaBars className={styles.hamburgerIcon} />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul className={styles.mobileNavLinks}>
          <li>
            <button onClick={() => goToSection("landing-page")}>
              <FaMountain className={styles.icon} /> Home
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("course-description")}>
              <FaLayerGroup className={styles.icon} /> Course
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("lectures")}>
              <GiMineWagon className={styles.icon} /> Lectures
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("assignments")}>
              <FaHammer className={styles.icon} /> Assignments
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("calendar")}>
              <FaCalendarAlt className={styles.icon} /> Calendar
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("resources")}>
              <FaGem className={styles.icon} /> Resources
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("final-project")}>
              <GiCrystalGrowth className={styles.icon} /> Final Project
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("staff")}>
              <FaHardHat className={styles.icon} /> Staff
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default NavBar;
