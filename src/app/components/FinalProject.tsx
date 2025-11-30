"use client";

import React, { useState } from "react";
import styles from "./FinalProject.module.css";
import {
  projectSummary,
  timeline,
  importantLinks,
} from "../data/finalProjectData";
import {
  FaCalendarAlt,
  FaLink,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import { GiEarthAfricaEurope, GiMineWagon, GiPositionMarker } from "react-icons/gi";
import { useSectionSensor } from "../hooks/useSectionSensor";
import { LAYERS } from "../contexts/LayerContext";
import SessionModal from "./SessionModal";
import { session1Groups, session2Groups } from "../data/dlDaySessionData";

const FinalProject = () => {
  const sectionRef = useSectionSensor(LAYERS.OUTER_CORE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<1 | 2 | null>(null);

  const openModal = (sessionNumber: 1 | 2) => {
    setActiveSession(sessionNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSession(null);
  };

  return (
    <section ref={sectionRef} id="final-project" className={styles.container}>
      <div className={styles.bgGradient}></div>
      <div className={styles.earthOrb}></div>

      {/* Header */}
      <div className={styles.headerSection}>
        <h2 className={styles.heading}>
          <GiEarthAfricaEurope className={styles.headerIcon} />
          {projectSummary.title}
          <GiEarthAfricaEurope className={styles.headerIcon} />
        </h2>
        <p className={styles.tagline}>{projectSummary.shortDescription}</p>
      </div>

      {/* Deep Learning Day Section */}
      <div className={styles.dlDaySection}>
        <div className={styles.dlDayHeader}>
          <h3 className={styles.dlDayTitle}>
            <FaCalendarAlt className={styles.dlDayTitleIcon} />
            Deep Learning Day 2025
            <FaCalendarAlt className={styles.dlDayTitleIcon} />
          </h3>
          <p className={styles.dlDaySubtitle}>
            Celebrate Your Hard Work and Present Your Research!
          </p>
        </div>

        <div className={styles.dlDayGrid}>
          {/* Date Card */}
          <div className={styles.dlDayCard}>
            <div className={styles.dlDayIconWrapper}>
              <FaCalendarAlt className={styles.dlDayIcon} />
            </div>
            <h4 className={styles.dlDayCardTitle}>Date</h4>
            <p className={styles.dlDayCardContent}>December 11, 2025</p>
          </div>

          {/* Time Card */}
          <div className={styles.dlDayCard}>
            <div className={styles.dlDayIconWrapper}>
              <FaClock className={styles.dlDayIcon} />
            </div>
            <h4 className={styles.dlDayCardTitle}>Duration</h4>
            <p className={styles.dlDayCardContent}>9:15 AM - 12:15 PM</p>
          </div>

          {/* Location Card */}
          <div className={styles.dlDayCard}>
            <div className={styles.dlDayIconWrapper}>
              <FaMapMarkerAlt className={styles.dlDayIcon} />
            </div>
            <h4 className={styles.dlDayCardTitle}>Location</h4>
            <p className={styles.dlDayCardContent}>
              Third Floor Atrium
              <br />
              <span className={styles.buildingName}>
                Watson Sr. Center for Information Technology (CIT)
              </span>
            </p>
          </div>
        </div>

        {/* Sessions Info */}
        <div className={styles.sessionsContainer}>
          <div className={styles.sessionsHeader}>
            <FaUsers className={styles.sessionsIcon} />
            <h4 className={styles.sessionsTitle}>Two Presentation Sessions</h4>
          </div>
          <p className={styles.sessionsDescription}>
            Click on a session to view group assignments and search for your team
          </p>
          <div className={styles.sessionsGrid}>
            <button
              className={styles.sessionCard}
              onClick={() => openModal(1)}
              aria-label="View Session 1 group assignments"
            >
              <div className={styles.sessionBadge}>Session 1</div>
              <div className={styles.sessionTime}>9:15 AM - 10:45 AM</div>
              <div className={styles.clickHint}>Click to view groups →</div>
            </button>
            <button
              className={styles.sessionCard}
              onClick={() => openModal(2)}
              aria-label="View Session 2 group assignments"
            >
              <div className={styles.sessionBadge}>Session 2</div>
              <div className={styles.sessionTime}>11:00 AM - 12:15 PM</div>
              <div className={styles.clickHint}>Click to view groups →</div>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className={styles.timelineSection}>
        <h3 className={styles.sectionTitle}>
          <FaCalendarAlt className={styles.sectionIcon} />
          Project Timeline
        </h3>

        <div className={styles.timeline}>
          {timeline.map((item, index) => (
            <div key={item.id} className={styles.timelineItem}>
              {/* Timeline marker */}
              <div className={styles.timelineMarker}>
                <div className={styles.dot}></div>
                {index !== timeline.length - 1 && (
                  <div className={styles.line}></div>
                )}
              </div>

              {/* Timeline content */}
              <div className={styles.timelineContent}>
                <div className={styles.card}>
                  <div className={styles.dateBox}>{item.date}</div>
                  <div className={styles.contentBox}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemDescription}>
                      {item.description}
                    </p>

                    {/* Links for this timeline item */}
                    {item.links && item.links.length > 0 && (
                      <div className={styles.itemLinks}>
                        {item.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.timelineLink}
                          >
                            <FaLink className={styles.linkIcon} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Links Section */}
      <div className={styles.linksSection}>
        <h3 className={styles.sectionTitle}>
          <GiMineWagon className={styles.sectionIcon} />
          Important Resources
        </h3>

        <div className={styles.resourceLinks}>
          {importantLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resourceLink}
            >
              <span className={styles.linkLabel}>{link.label}</span>
              <FaLink className={styles.resourceIcon} />
            </a>
          ))}
        </div>
      </div>

      {/* Session Modal */}
      <SessionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        sessionTitle={activeSession === 1 ? "Session 1" : "Session 2"}
        sessionTime={
          activeSession === 1 ? "9:15 AM - 10:45 AM" : "11:00 AM - 12:15 PM"
        }
        groups={activeSession === 1 ? session1Groups : session2Groups}
      />
    </section>
  );
};

export default FinalProject;
