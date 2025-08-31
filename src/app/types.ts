// types.ts
export interface Lecture {
  id: number;
  title: string;
  date: string; // You can use Date type if you prefer
  slidesLink?: string;
  recordingLink?: string;
}

export interface LectureGroup {
  title?: string; // Optional group title (e.g., "Weeks 1-4")
  lectures: Lecture[];
}

export interface Assignment {
  id: number;
  name: string;
  outDate: string;
  conceptual?: {
    title: string;
    link: string;
    inDate: string;
  };
  programming?: {
    title: string;
    link: string;
    inDate: string;
  };
}
