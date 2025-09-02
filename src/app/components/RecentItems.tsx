// components/RecentItems.tsx
import React from "react";
import styles from "./RecentItems.module.css";
import { lectureGroups } from "../data/lectureData";
import { assignments } from "../data/assignmentData";
import { FaFire, FaMountain } from "react-icons/fa";
import { Assignment } from "../types";

// Helper to get the max inDate from conceptual or programming
function getMaxInDate(assignment: Assignment): number {
  // If there's no date, treat it as 0 (or -Infinity).
  const conceptualDate = assignment.conceptual?.inDate
    ? new Date(assignment.conceptual.inDate).getTime()
    : 0;
  const programmingDate = assignment.programming?.inDate
    ? new Date(assignment.programming.inDate).getTime()
    : 0;
  return Math.max(conceptualDate, programmingDate);
}

const getMostRecentLecture = () => {
  const allLectures = lectureGroups.flatMap((group) => group.lectures);
  // Filter or sort by date
  const lecturesWithLinks = allLectures.filter(
    (lecture) => lecture.slidesLink || lecture.recordingLink
  );
  return lecturesWithLinks.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
};

const getMostRecentAssignment = () => {
  // Sort assignments by the largest in-date among their parts
  const sorted = [...assignments].sort(
    (a, b) => getMaxInDate(b) - getMaxInDate(a)
  );
  return sorted[0];
};

const RecentItems = () => {
  const recentLecture = getMostRecentLecture();
  const recentAssignment = getMostRecentAssignment();

  // If no assignment found, you might want to handle that case gracefully
  if (!recentAssignment) {
    return (
      <section className={styles.container}>
        <div className={styles.recentItem}>
          <h3 className={styles.title}>Most Recent Lecture</h3>
          <p>No lectures found.</p>
        </div>
        <div className={styles.recentItem}>
          <h3 className={styles.title}>Most Recent Assignment</h3>
          <p>No assignments found.</p>
        </div>
      </section>
    );
  }

  // Render the assignment carefully, depending on whether conceptual/programming exist:
  const hasConceptual = !!recentAssignment.conceptual;
  const hasProgramming = !!recentAssignment.programming;

  return (
    <section className={styles.container}>
      {/* Recent Lecture */}
      <div className={styles.recentItem}>
        <h3 className={styles.title}>Most Recent Lecture</h3>
        {recentLecture ? (
          <div className={styles.itemContent}>
            <span className={styles.itemTitle}>{recentLecture.title}</span>
            <span className={styles.itemDate}>{recentLecture.date}</span>
            <div className={styles.links}>
              {recentLecture.slidesLink && (
                <a
                  href={recentLecture.slidesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <FaFire className={styles.linkIcon} /> Slides
                </a>
              )}
              {recentLecture.recordingLink && (
                <a
                  href={recentLecture.recordingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  <FaMountain className={styles.linkIcon} /> Recording
                </a>
              )}
            </div>
          </div>
        ) : (
          <p>No lectures found.</p>
        )}
      </div>

      {/* Recent Assignment */}
      <div className={styles.recentItem}>
        <h3 className={styles.title}>Most Recent Assignment</h3>
        <div className={styles.itemContent}>
          <span className={styles.itemTitle}>{recentAssignment.name}</span>

          {/* Display out date */}
          <span className={styles.itemDate}>
            <strong>Out Date:</strong> {recentAssignment.outDate}
          </span>

          {/* If both conceptual & programming exist, show both in-dates, etc. */}
          {hasConceptual && hasProgramming && (
            <span className={styles.itemDate}>
              <strong>In Dates:</strong> Conceptual:{" "}
              {recentAssignment.conceptual?.inDate}, Programming:{" "}
              {recentAssignment.programming?.inDate}
            </span>
          )}
          {hasConceptual && !hasProgramming && (
            <span className={styles.itemDate}>
              <strong>In Date:</strong> {recentAssignment.conceptual?.inDate}
            </span>
          )}
          {!hasConceptual && hasProgramming && (
            <span className={styles.itemDate}>
              <strong>In Date:</strong> {recentAssignment.programming?.inDate}
            </span>
          )}
          {!hasConceptual && !hasProgramming && (
            <span className={styles.itemDate}>
              <strong>In Date:</strong> N/A
            </span>
          )}

          {/* Buttons for conceptual vs. programming */}
          <div className={styles.links}>
            {recentAssignment.conceptual && (
              <a
                href={recentAssignment.conceptual.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkButton}
              >
                <FaFire className={styles.linkIcon} />{" "}
                {recentAssignment.conceptual.title}
              </a>
            )}
            {recentAssignment.programming && (
              <a
                href={recentAssignment.programming.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkButton}
              >
                <FaMountain className={styles.linkIcon} />{" "}
                {recentAssignment.programming.title}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentItems;
