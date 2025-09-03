// src/app/components/Staff.tsx
import React from "react";
import styles from "./Staff.module.css";
import { FaHardHat, FaGem, FaEnvelope } from "react-icons/fa";
import staffData from "../data/staffData";
import Image from "next/image";
import { useSectionSensor } from "../hooks/useSectionSensor";
import { LAYERS } from "../contexts/LayerContext";
import { useAssetPath } from "../hooks/useAssetPath";

interface StaffMember {
  name: string;
  pronouns: string;
  image: string;
  // spaceCreature: string;
  role?: string;
}

const StaffCard: React.FC<StaffMember> = ({
  name,
  pronouns,
  image,
  // spaceCreature,
}) => {
  const getAssetPath = useAssetPath();
  return (
    <div className={styles.staffCard}>
      <div className={styles.imageContainer}>
        <div className={styles.stars}></div>
        <Image
          src={getAssetPath(image)}
          alt={name}
          className={styles.staffImage}
          width={500}
          height={300}
        />
        <div className={styles.constellation}></div>
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.staffName}>{name}</h4>
        <p className={styles.pronouns}>{pronouns}</p>
        {/* <p className={styles.spaceCreature}>{spaceCreature}</p> */}
      </div>
    </div>
  );
};

const Staff = () => {
  const sectionRef = useSectionSensor(LAYERS.INNER_CORE);

  return (
    <section ref={sectionRef} id="staff" className={styles.container}>
      <div className={styles.starsBackground}></div>
      <h2 className={styles.heading}>
        <FaHardHat className={styles.headerIcon} />
        Expedition Team
        <FaHardHat className={styles.headerIcon} />
      </h2>

      <div className={styles.contactInfo}>
        <div className={styles.emailBlock}>
          <div className={styles.emailItem}>
            <FaEnvelope className={styles.emailIcon} />
            <span className={styles.emailLabel}>Professor:</span>
            <a href={`mailto:${staffData.professor.email}`}>
              {staffData.professor.email}
            </a>
          </div>
          <div className={styles.emailItem}>
            <FaEnvelope className={styles.emailIcon} />
            <span className={styles.emailLabel}>Professor and HTAs:</span>
            <a href={`mailto:${staffData.emails.profAndHTAs}`}>
              {staffData.emails.profAndHTAs}
            </a>
          </div>
          <div className={styles.emailItem}>
            <FaEnvelope className={styles.emailIcon} />
            <span className={styles.emailLabel}>All TAs:</span>
            <a href={`mailto:${staffData.emails.allTAs}`}>
              {staffData.emails.allTAs}
            </a>
          </div>
        </div>
        <p className={styles.disclaimer}>
          Do not email sensitive information, including Health Services &
          Dean&apos;s Notes, to any HTAs, UTAs, or STAs.
        </p>
      </div>

      <div className={styles.staffSection}>
        <h3 className={styles.roleHeading}>
          <FaGem className={styles.roleIcon} />
          Lead Geologist
        </h3>
        <div className={styles.staffGrid}>
          <StaffCard {...staffData.professor} />
        </div>
      </div>

      <div className={styles.staffSection}>
        <h3 className={styles.roleHeading}>
          <FaGem className={styles.roleIcon} />
          Senior Excavators
        </h3>
        <div className={styles.staffGrid}>
          {staffData.htas.map((hta, index) => (
            <StaffCard key={index} {...hta} />
          ))}
        </div>
      </div>

      <div className={styles.staffSection}>
        <h3 className={styles.roleHeading}>
          <FaGem className={styles.roleIcon} />
          Mining Specialists
        </h3>
        <div className={styles.staffGrid}>
          {staffData.utas.map((uta, index) => (
            <StaffCard key={index} {...uta} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Staff;
