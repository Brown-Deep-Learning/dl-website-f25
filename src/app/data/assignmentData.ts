// data/assignmentData.ts
export const assignments = [
  {
    id: 1,
    name: "Assignment 1: Introduction and Setup",
    outDate: "2025-01-22",
    // Since this only has a conceptual part, we put the due date in conceptual:
    conceptual: {
      title: "Conceptual",
      link: "https://hackmd.io/@BDLS25/S1dv0oLDkx",
      inDate: "2025-01-29",
    },
  },
  {
    id: 2,
    name: "Mini-Project 1: Deep Learning with Tensorflow and Optimizers",
    outDate: "2025-01-29",
    // This one only has a programming part:
    programming: {
      title: "Stencil Notebook",
      link: "https://colab.research.google.com/drive/1G-REdGzp-pyxlqXSXOftmPL3iRO5Rt2x#scrollTo=dB-a3rs6gpa1",
      inDate: "2025-02-05",
    },
  },
  {
    id: 3,
    name: "Assignment 2: BERAS",
    outDate: "2025-02-05",
    // This one has both conceptual and programming:
    conceptual: {
      title: "Conceptual",
      link: "https://hackmd.io/@BDLS25/rkKjOKSDJe",
      inDate: "2025-02-19",
    },
    programming: {
      title: "Programming",
      link: "https://hackmd.io/@BDLS25/r1K-41_Okl",
      inDate: "2025-02-26",
    },
  },
  {
    id: 4,
    name: "Assignment 3: CNNS",
    outDate: "2025-02-28",
    // This one has both conceptual and programming:
    conceptual: {
      title: "Conceptual",
      link: "https://hackmd.io/@BDLS25/HyAwuKrwkg",
      inDate: "2025-03-12",
    },
    programming: {
      title: "Programming",
      link: "https://hackmd.io/@BDLS25/ryKtzEkj1g",
      inDate: "2025-03-14",
    },
  },
  {id: 5,
   name: "Assignment 4: Image Captioning",
   outDate: "2025-03-17",
   conceptual: {
     title: "Conceptual",
     link: "https://hackmd.io/@BDLS25/HyTyFKHv1g",
     inDate: "2025-03-21",
   },
   programming: {
     title: "Programming",
     link: "https://hackmd.io/@BDLS25/r1SvCgX3ke",
     inDate: "2025-04-04",
   },
  },
  {id: 5,
   name: "Assignment 5: Reinforcement Learning",
   outDate: "2025-04-14",
   conceptual: {
     title: "Conceptual",
     link: "https://hackmd.io/@BDLS25/r1l0sljAkg",
     inDate: "2025-04-25",
   },
   programming: {
     title: "Programming",
     link: "https://hackmd.io/@BDLS25/HJudUydCJe",
     inDate: "2025-04-25",
   },
  }
];
