// src/app/components/NavBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import {
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaUtensils,
} from "react-icons/fa";
import {
  GiCookingPot,
  GiChefToque,
  GiFrenchFries,
  GiHotMeal,
  GiKitchenKnives,
  GiCookingGlove,
  GiOpenedFoodCan,
  GiTrophy
} from "react-icons/gi";

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
        <GiFrenchFries className={styles.logoIcon} />
        <h1>CSCI1470</h1>
      </div>



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
              <FaUtensils className={styles.icon} /> Home
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("course-description")}>
              <GiHotMeal className={styles.icon} /> Today's Menu
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("lectures")}>
              <GiCookingPot className={styles.icon} /> Daily Specials
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("assignments")}>
              <GiKitchenKnives className={styles.icon} /> Orders Up!
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("calendar")}>
              <FaCalendarAlt className={styles.icon} /> Service Hours
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("resources")}>
              <GiOpenedFoodCan className={styles.icon} /> The Pantry
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("final-project")}>
              <GiTrophy className={styles.icon} /> Chef's Special
            </button>
          </li>
          <li>
            <button onClick={() => goToSection("staff")}>
              <GiChefToque className={styles.icon} /> Kitchen Crew
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
