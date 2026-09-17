import type { CmsEducation, CmsExperience, CmsProject } from "@/lib/cms/types";

export const seedExperience: CmsExperience[] = [
  {
    id: "exp-greensturn",
    company: "GreensTurn",
    role: "Mobile Application Developer",
    period: "Present",
    detail:
      "Building mobile products in sustainability, ESG, and carbon intelligence.",
  },
  {
    id: "exp-qurilo",
    company: "QURILO TECHNOLOGIES LLC",
    role: "React Native Developer",
    period: "Previous",
    detail: "Android and iOS app development with React Native.",
  },
  {
    id: "exp-zozuk",
    company: "ZOZUK, Post Mayor MediaTech Private Limited",
    role: "Fullstack Engineering Intern",
    period: "May 2024 - Present",
    detail:
      "Working on Zozuk platforms, managing the website, and streamlining maintenance with Docker, AWS, Nginx, TypeScript, and Next.js.",
  },
  {
    id: "exp-doneship",
    company: "Doneship",
    role: "Frontend Engineer Intern",
    period: "June 2023 - 2024",
    detail:
      "Frontend of the web application using ReactJS, Redux, and Material UI.",
  },
  {
    id: "exp-flipr",
    company: "Flipr",
    role: "Web Developer",
    period: "June 2022 - May 2023",
    detail:
      "Collaborated with the technical team to create responsive web pages and assist in UI/UX improvements, including front-end troubleshooting and cross-browser work.",
  },
];

export const seedEducation: CmsEducation[] = [
  {
    id: "edu-aktu",
    school: "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
    degree: "Bachelor of Technology - BTech, Computer Science and Engineering",
    period: "Oct 2021 - Sep 2025",
    detail:
      "Courses in Data Structures, Algorithms, OOP, DBMS, Operating Systems, and Computer Networks. Member of the Freelancer Developers Student Club (FDSC) at AKTU.",
  },
  {
    id: "edu-bteup",
    school: "BTEUP, Polytechnic College Lucknow",
    degree: "Diploma, Electrical Engineer",
    period: "Apr 2019 - Apr 2021",
    grade: "74.2%",
    detail:
      "Diploma education at Polytechnic College, Lucknow, studying science with electrical engineering.",
  },
  {
    id: "edu-rnps",
    school: "R N Public School, Varanasi",
    degree: "CBSE (XII), Science with Computer",
    period: "Apr 2017 - Apr 2019",
    grade: "92.3%",
    detail:
      "Class 12 education at R N Public School, Varanasi, with science and computer applications.",
  },
];

export const seedProjects: CmsProject[] = [
  {
    id: "proj-debt-relief",
    title: "Debt Relief India",
    year: "2025",
    role: "React Native · iOS App Store",
    summary:
      "A live FinTech iOS app built with React Native. Shipping it meant privacy, payments, App Store review, and production iOS edge cases — not just UI.",
    tags: ["React Native", "FinTech", "iOS", "App Store"],
  },
  {
    id: "proj-pluse",
    title: "Pluse",
    year: "2024",
    role: "React Native · Product",
    summary:
      "A medicine tracker built for real daily use: reminders, API consumption, and a clean mobile workflow for patients.",
    tags: ["React Native", "Healthcare", "APIs"],
  },
  {
    id: "proj-amrutam",
    title: "Amrutam Forum",
    year: "2024",
    role: "React Native · Community",
    summary:
      "A community forum product with authentication, feeds, and the unglamorous work of making lists, search, and state feel instant.",
    tags: ["React Native", "Community", "Auth"],
  },
  {
    id: "proj-greensturn",
    title: "GreensTurn platform work",
    year: "2026",
    role: "Mobile · Sustainability systems",
    summary:
      "Building mobile and product surfaces around ESG, carbon, and sustainability intelligence at GreensTurn.",
    tags: ["ESG", "Sustainability", "React Native"],
  },
  {
    id: "proj-dating",
    title: "Dating App UI",
    year: "2024",
    role: "React Native · Expo",
    summary:
      "A React Native dating app UI with profiles, photos, search, and a seamless swiping experience.",
    tags: ["React Native", "Expo", "UI"],
  },
  {
    id: "proj-news",
    title: "News App",
    year: "2021",
    role: "React Native · Product",
    summary:
      "A React Native news app with trending stories, article details, search, and bookmarks.",
    tags: ["React Native", "API", "Expo"],
  },
  {
    id: "proj-ecommerce",
    title: "E-commerce UI",
    year: "2024",
    role: "React · Storefront",
    summary:
      "A React e-commerce UI with category filters, search, and a checkout flow.",
    tags: ["React", "Tailwind", "UI"],
  },
  {
    id: "proj-agency",
    title: "Creative Agency Website",
    year: "2024",
    role: "Next.js · Marketing",
    summary:
      "A Next.js website to showcase a company's services and products.",
    tags: ["Next.js", "Tailwind"],
  },
];
