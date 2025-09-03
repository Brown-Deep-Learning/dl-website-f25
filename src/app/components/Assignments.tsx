// src/app/components/Assignments.tsx
import React from "react";
import styles from "./Assignments.module.css";
import { assignments } from "../data/assignmentData";
import { FaHammer, FaGem } from "react-icons/fa";
import { GiCrystalGrowth } from "react-icons/gi";
import { useSectionSensor } from "../hooks/useSectionSensor";
import { LAYERS } from "../contexts/LayerContext";

const Assignments = () => {
  // const sectionRef = useSectionSensor(LAYERS.LOWER_MANTLE);
  // Sort by ID or whatever ordering you need
  const sortedAssignments = [...assignments].sort((a, b) => a.id - b.id);

  const sectionRef = useSectionSensor(LAYERS.LOWER_MANTLE);

  return (
    <section ref={sectionRef} id="assignments" className={styles.container}>
      <div className={styles.meteor}></div>
      <div className={styles.meteor2}></div>
      <h2 className={styles.heading}>
        <GiCrystalGrowth className={styles.headerStar} />
        Assignments
        <GiCrystalGrowth className={styles.headerStar} />
      </h2>
      <div className={styles.assignmentList}>
        {sortedAssignments.map((assignment) => {
          // Check if sections exist and have non-empty links
          const hasConceptualSection = assignment.conceptual !== undefined;
          const hasConceptualLink =
            hasConceptualSection &&
            assignment.conceptual.link &&
            assignment.conceptual.link.trim() !== "";

          const hasProgrammingSection = assignment.programming !== undefined;
          const hasProgrammingLink =
            hasProgrammingSection &&
            assignment.programming.link &&
            assignment.programming.link.trim() !== "";

          return (
            <div key={assignment.id} className={styles.assignmentItem}>
              <div className={styles.glowOrb}></div>
              <div className={styles.assignmentInfo}>
                <h3 className={styles.assignmentTitle}>
                  <span className={styles.titleText}>{assignment.name}</span>
                </h3>
                <div className={styles.assignmentDates}>
                  <span className={styles.assignmentDate}>
                    <span className={styles.dateLabel}>Out Date: </span>
                    {assignment.outDate}
                  </span>

                  {/* 
                    Display in dates for sections that exist, regardless of whether links are available
                  */}
                  {hasConceptualSection && hasProgrammingSection && (
                    <>
                      <span className={styles.assignmentDate}>
                        <span className={styles.dateLabel}>
                          Conceptual In Date:{" "}
                        </span>
                        {assignment.conceptual.inDate}
                      </span>
                      <span className={styles.assignmentDate}>
                        <span className={styles.dateLabel}>
                          Programming In Date:{" "}
                        </span>
                        {assignment.programming.inDate}
                      </span>
                    </>
                  )}

                  {hasConceptualSection && !hasProgrammingSection && (
                    <span className={styles.assignmentDate}>
                      <span className={styles.dateLabel}>
                        Conceptual In Date:{" "}
                      </span>
                      {assignment.conceptual.inDate}
                    </span>
                  )}

                  {!hasConceptualSection && hasProgrammingSection && (
                    <span className={styles.assignmentDate}>
                      <span className={styles.dateLabel}>
                        Programming In Date:{" "}
                      </span>
                      {assignment.programming.inDate}
                    </span>
                  )}

                  {/* If somehow an assignment had no conceptual/programming sections, fallback: */}
                  {!hasConceptualSection && !hasProgrammingSection && (
                    <span className={styles.assignmentDate}>
                      <span className={styles.dateLabel}>In Date: </span>
                      N/A
                    </span>
                  )}
                </div>

                {/* Render the link buttons only if sections exist and have non-empty links */}
                <div className={styles.assignmentParts}>
                  {hasConceptualLink && (
                    <a
                      href={assignment.conceptual!.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.linkButton} ${styles.conceptualButton}`}
                    >
                      <FaGem className={styles.linkIcon} />
                      {assignment.conceptual!.title}
                    </a>
                  )}
                  {hasProgrammingLink && (
                    <a
                      href={assignment.programming!.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.linkButton} ${styles.programmingButton}`}
                    >
                      <FaHammer className={styles.linkIcon} />
                      {assignment.programming!.title}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Assignments;
