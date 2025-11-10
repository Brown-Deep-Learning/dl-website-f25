"use client";

import React from "react";
import styles from "./FinalProject.module.css";
import {
  projectSummary,
  timeline,
  importantLinks,
} from "../data/finalProjectData";
import {
  FaCalendarAlt,
  FaLink,
  FaFileAlt,
  FaClipboardList,
} from "react-icons/fa";
import { GiEarthAfricaEurope, GiMineWagon } from "react-icons/gi";
import { useSectionSensor } from "../hooks/useSectionSensor";
import { LAYERS } from "../contexts/LayerContext";

// Icon mapping for links
const iconMap: { [key: string]: React.ReactNode } = {
  FaFileAlt: <FaFileAlt />,
  FaClipboardList: <FaClipboardList />,
  FaLink: <FaLink />,
};

const FinalProject = () => {
  const sectionRef = useSectionSensor(LAYERS.OUTER_CORE);

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

      {/* Additional Info */}
      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h4 className={styles.infoTitle}>Project Requirements</h4>
          <ul className={styles.infoList}>
            <li>Teams of 3-4 students</li>
            <li>
              Option 1: Re-implement a research paper OR Option 2: Solve a new
              problem
            </li>
            <li>Must involve training a deep learning model</li>
            <li>Submit code via GitHub repository</li>
            <li>Participate in Deep Learning Day presentations</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FinalProject;
