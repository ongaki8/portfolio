// src/app/components/shared/educationData.tsx
export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description: string;
  attachment?: string;
  skills?: string[];
  summary?: string;
}

export interface PublicationItem {
  title: string;
  journal: string;
  year: string;
  authors: string;
  attachment: string;
}

export interface AwardItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  attachment: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
  attachment: string;
  responsibilities?: string[];
}

export const educationData: EducationItem[] = [
  {
    institution: "Technische Universität München",
    degree: "Master of Science (M.Sc.) - Aerospace Engineering",
    period: "2019 - 2023",
    description: "",
    attachment: "/certificates/masters.pdf",
    summary: "Developed strong proficiency in Python and MATLAB, specializing in structural analysis and computational methods; built a custom Python tool for stress analysis of carbon fiber composites as part of my thesis work.",
    skills: [
      "Python",
      "MATLAB",
      "Finite Element Analysis",
      "CAD Modeling",
      "Data Analysis & Visualization",
      "Technical Documentation"
    ]
  },
  {
    institution: "Shenyang Aerospace University",
    degree: "BEng. - Aeronautical Engineering",
    period: "2014 - 2018",
    description: "",
    attachment: "/certificates/bachelors.jpeg",
    summary: "Acquired practical experience with C++ and Java by developing an Android-based stock management system tailored for aerospace applications as part of my thesis project.",
    skills: [
      "JAVA",
      "C++",
      "Debugging & Testing",
      "SQLite",
      "Engineering Mathematics",
      "CAD Modeling"
    ]
  }
];

export const publications: PublicationItem[] = [
  {
    title: "Influence of the Binder on Compaction, Shear, and Friction for Carbon Fiber Preforms in the RTM-Process",
    journal: "SAMPE - Composites and Advanced Materials Expo",
    year: "2022",
    authors: "Authors: Carina Schauer, Brian Ongaki, Dennis Bublitz, Klaus Drechsler",
    attachment: "/certificates/publication.pdf"
  }
];

export const awards: AwardItem[] = [
  {
    title: "TUM Asia-DAAD Scholarship",
    organization: "German Academic Exchange Service (DAAD)",
    year: "2021",
    description: "",
    attachment: ""
  },
  {
    title: "Scholarship Award",
    organization: "Shenyang Aerospace University",
    year: "2018",
    description: "Silver Prize",
    attachment: "/certificates/SP-2018.jpeg"
  },
  {
    title: "Scholarship Award",
    organization: "Shenyang Aerospace University",
    year: "2017",
    description: "Bronze Prize",
    attachment: "/certificates/BP-2017.png"
  },
  {
    title: "Scholarship Award",
    organization: "Shenyang Aerospace University",
    year: "2016",
    description: "Bronze Prize",
    attachment: "/certificates/BP-2016.png"
  }
];

export const certificates: CertificateItem[] = [
  {
    title: "Digital Technology Virtual Experience Program",
    issuer: "GE Aerospace",
    year: "2025",
    description: "Vue UI development and alignment strategies",
    attachment: "/certificates/GE_Digital_Technology_Certificate.jpg",
    responsibilities: [
      "Completed a Vue.js UI development simulation for the Frontend Development Team, demonstrating proficiency in Vue SFC Playground.",
      "Applied Vue.js skills by adding features like headings, images, and dynamic variable displays. Implemented a compute button for efficient user interactions.",
      "Drafted clear technical requirements for a feature, suggesting optimal order times for plane parts.",
      "Explored strategies to align technical specifications with business requirements, ensuring effective solutions."
    ]
  }
];