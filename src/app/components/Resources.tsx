// src/app/components/Resources.tsx
import React from "react";
import styles from "./Resources.module.css";
import { FaGem, FaHammer } from "react-icons/fa";
import { GiCrystalGrowth } from "react-icons/gi";

interface ResourceItem {
  title: string;
  link: string;
}

interface ResourceCategory {
  title: string;
  resources: ResourceItem[];
}

const resourceData: ResourceCategory[] = [
  {
    title: "Forms",
    resources: [
      {
        title: "Collaboration Form",
        link: "https://forms.gle/FjQ4yHcnJ7bkpMTa7",
      },
      {
        title: "Anonymous Feedback Form",
        link: "https://forms.gle/JgbBC4Fomtz4u6N67",
      },
    ],
  },
  {
    title: "Guides and Tutorials",
    resources: [
      {
        title: "GitHub Guide",
        link: "https://hackmd.io/gGOpcqoeTx-BOvLXQWRgQg",
      },
      {
        title: "Opening Up Labs",
        link: "https://hackmd.io/@BrownDeepLearningS24/BkIT3sW6s",
      },
      {
        title: "Google Colaboratory Tutorial",
        link: "https://hackmd.io/@BrownDeepLearningS24/BkIT3sW6s",
      },
    ],
  },
  {
    title: "Working Remotely",
    resources: [
      {
        title: "FastX Setup Guide",
        link: "https://cs.brown.edu/about/system/connecting/fastx/",
      },
      {
        title: "ssh Guide",
        link: "https://cs.brown.edu/about/system/connecting/ssh/",
      },
    ],
  },
  {
    title: "Department Resources",
    resources: [
      {
        title: "Capstone Information",
        link: "https://cs.brown.edu/degrees/undergrad/concentrating-in-cs/concentration-requirements-2020/capstone/",
      },
      {
        title: "Linux Cheat Sheet",
        link: "https://cheatography.com/davechild/cheat-sheets/linux-command-line/",
      },
      {
        title: "Setting Up Email",
        link: "http://cs.brown.edu/about/system/accounts/email/",
      },
      {
        title: "IT Services",
        link: "https://ithelp.brown.edu/",
      },
      {
        title: "IT Loaner Laptops",
        link: "https://ithelp.brown.edu/kb/articles/it-service-center-loaner-equipment-3",
      },
    ],
  },
  {
    title: "Organizations",
    resources: [
      {
        title: "CAPS",
        link: "https://www.brown.edu/campus-life/support/counseling-and-psychological-services/",
      },
      {
        title: "Women in Computer Science",
        link: "https://cs.brown.edu/people/orgs/wics/",
      },
      {
        title: "Mosaic+",
        link: "https://mosaicplus.github.io/",
      },
      {
        title: "Title IX",
        link: "https://www.brown.edu/about/administration/title-ix/",
      },
      {
        title: "Health and Wellness Advocates",
        link: "https://cs.brown.edu/about/diversity/health-wellness-student-advocates/",
      },
      {
        title: "Diversity and Inclusion",
        link: "https://cs.brown.edu/about/diversity/student-advocates-diversity-and-inclusion/",
      },
      {
        title: "CS DUG",
        link: "http://cs.brown.edu/people/orgs/dug/",
      },
    ],
  },
];

const Resources = () => {
  // const sectionRef = useSectionSensor(LAYERS.OUTER_CORE);

  return (
    <section id="resources" className={styles.container}>
      <div className={styles.backgroundPlanet}></div>
      <h2 className={styles.heading}>
        <FaGem className={styles.headerIcon} />
        Resources
        <FaGem className={styles.headerIcon} />
      </h2>
      <div className={styles.resourceCategories}>
        {resourceData.map((category, index) => (
          <div key={index} className={styles.category}>
            <div className={styles.categoryHeader}>
              <GiCrystalGrowth className={styles.categoryIcon} />
              <h3 className={styles.categoryTitle}>{category.title}</h3>
            </div>
            <div className={styles.resourcesList}>
              {category.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resourceLink}
                >
                  <div className={styles.linkIconWrapper}>
                    <FaHammer className={styles.linkIcon} />
                  </div>
                  <span className={styles.linkText}>{resource.title}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resources;
