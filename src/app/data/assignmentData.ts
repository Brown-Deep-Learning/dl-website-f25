// data/assignmentData.ts
export const assignments = [
  {
    id: 1,
    name: "Assignment 1: Introduction and Mathematical Foundations",
    outDate: "2025-09-04",
    // Since this only has a conceptual part, we put the due date in conceptual:
    conceptual: {
      title: "Conceptual",
      link: "https://hackmd.io/@dlf25/ryoL7fKOgl#Assignment-1-Setup-and-Mathematical-Foundations",
      inDate: "2025-09-18",
    },
  },
  {
    id: 2,
    name: "Assignment 2: Introduction to Numpy and Tensorflow",
    outDate: "2025-09-11",
    programming: {
      title: "Stencil Notebook",
      link: "https://colab.research.google.com/drive/15ziAhWDQMhn7X_KEsh_lP3hFnUjBrgOC?usp=sharing",
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
      link: "https://hackmd.io/@dlf25/ByxFEZMjgx",
      inDate: "2025-09-25",
    },
    programming: {
      title: "Programming",
      link: "https://hackmd.io/@dlf25/SkkpggRFxx",
      inDate: "2025-10-04",
    },
  },
  {
    id: 4,
    name: "Assignment 4: CNNS",
    outDate: "2025-10-02",
    // This one has both conceptual and programming:
    conceptual: {
      title: "Conceptual",
      link: "https://hackmd.io/@dlf25/HJ0Qx4k5ge",
      inDate: "2025-10-09",
    },
    programming: {
      title: "Programming",
      link: "https://hackmd.io/Rbm_2IsuRtu3bfz4U87QVA",
      inDate: "2025-10-16",
    },
  },
  {
    id: 5,
    name: "Assignment 5: Language Modeling",
    outDate: "2025-10-18",
    conceptual: {
      title: "Conceptual",
      link: "https://hackmd.io/@dlf25/BykLIlGRxl",
      inDate: "2025-10-30",
    },
    programming: {
      title: "Programming",
      link: "https://hackmd.io/@dlf25/r1r9H-Cpgx",
      inDate: "2025-11-06",
    },
  },
  {
    id: 6,
    name: "Assignment 6: Generative Modeling",
    outDate: "2025-11-10",
    programming: {
      title: "Programming",
      link: "https://colab.research.google.com/drive/1bMbPf0kT0DRsEsnWHk0vvNBQy1UEDwgm?usp=sharing",
      inDate: "2025-11-20",
    },
  },
  {
    id: 7,
    name: "Assignment 7: Reinforcement Learning",
    outDate: "2025-11-20",
    programming: {
      title: "Programming",
      link: "https://hackmd.io/@dlf25/By6CQzplbx",
      inDate: "2025-12-04",
    },
  },
  {
    id: 8,
    name: "Makeup Assignment: Workshops and SRCs",
    outDate: "2025-12-7",
    conceptual: {
      title: "Write-Up",
      link: "https://hackmd.io/@dlf25/SJjgRPXzZg",
      inDate: "2025-12-14",
    },
  },
];
