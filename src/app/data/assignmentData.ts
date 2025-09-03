// data/assignmentData.ts
export const assignments = [
  {
    id: 1,
    name: "Assignment 1: Introduction and Mathematical Foundations",
    outDate: "2025-09-04",
    // Since this only has a conceptual part, we put the due date in conceptual:
    conceptual: {
      title: "Conceptual",
      link: "",
      inDate: "2025-09-18",
    },
  },
  {
    id: 2,
    name: "Assignment 2: Introduction to Numpy and Tensorflow",
    outDate: "2025-09-11",
    programming: {
      title: "Stencil Notebook",
      link: "",
      inDate: "2025-09-18",
    },
  },
  {
    id: 3,
    name: "Assignment 3: BERAS",
    outDate: "2025-09-18",
    // This one has both conceptual and programming:
    conceptual: {
      title: "Conceptual",
      link: "",
      inDate: "2025-09-25",
    },
    programming: {
      title: "Programming",
      link: "",
      inDate: "2025-10-02",
    },
  },
  {
    id: 4,
    name: "Assignment 4: CNNS",
    outDate: "2025-10-02",
    // This one has both conceptual and programming:
    conceptual: {
      title: "Conceptual",
      link: "",
      inDate: "2025-10-09",
    },
    programming: {
      title: "Programming",
      link: "",
      inDate: "2025-10-16",
    },
  },
  {
    id: 5,
    name: "Assignment 5: Language Modeling",
    outDate: "2025-10-16",
    conceptual: {
      title: "Conceptual",
      link: "",
      inDate: "2025-10-23",
    },
    programming: {
      title: "Programming",
      link: "",
      inDate: "2025-10-30",
    },
  },
  {
    id: 6,
    name: "Assignment 6: Image Captioning",
    outDate: "2025-10-30",
    conceptual: {
      title: "Conceptual",
      link: "",
      inDate: "2025-11-06",
    },
    programming: {
      title: "Programming",
      link: "",
      inDate: "2025-11-13",
    },
  },
  {
    id: 7,
    name: "Assignment 7: Generative Modeling",
    outDate: "2025-11-13",
    programming: {
      title: "Programming",
      link: "",
      inDate: "2025-11-20",
    },
  },
  {
    id: 8,
    name: "Assignment 8: Reinforcement Learning",
    outDate: "2025-11-20",
    conceptual: {
      title: "Conceptual",
      link: "",
      inDate: "2025-12-04",
    },
    programming: {
      title: "Programming",
      link: "",
      inDate: "2025-12-04",
    },
  },
];
