export const site = {
  name: "Devesh Kumar Singh",
  shortName: "Devesh Singh",
  handle: "deveshkumarsingh",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://deveshkumarsingh.com",
  title:
    "Devesh Kumar Singh | React Native, Carbon, ESG & Sustainability Engineer",
  description:
    "Devesh Kumar Singh writes production notes on React Native, TypeScript, AI, backend systems, carbon emissions, GHG accounting, ESG, and sustainability software. Mobile engineer at GreensTurn, Gurugram.",
  jobTitle: "React Native Developer",
  worksFor: "GreensTurn",
  location: "Gurugram, India",
  email: "hello@deveshkumarsingh.com",
  locale: "en_IN",
  language: "en-IN",
  keywords: [
    "Devesh Kumar Singh",
    "Devesh Kumar Singh React Native",
    "React Native developer",
    "React Native engineer Gurugram",
    "carbon emissions software",
    "carbon accounting",
    "GHG Protocol",
    "Scope 1 2 3 emissions",
    "ESG software",
    "sustainability engineering",
    "decarbonization software",
    "contextual intelligence engine",
    "TypeScript",
    "Next.js",
    "mobile app developer India",
    "AI mobile apps",
    "backend for React Native",
  ],
  sameAs: [
    "https://www.linkedin.com/in/devesh-kumar-singh-mobile-app",
    "https://dev.to/iamdeveshsingh",
    "https://github.com/devkush0999",
  ],
  linkedin: "https://www.linkedin.com/in/devesh-kumar-singh-mobile-app",
  github: "https://github.com/devkush0999",
  twitter: "",
  ogImage: "/og.png",
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const categories = [
  {
    slug: "react-native",
    label: "React Native",
    description:
      "Production React Native, Expo, App Store shipping, and mobile architecture.",
  },
  {
    slug: "ai",
    label: "AI",
    description:
      "Practical AI in mobile products, not demo chatbots.",
  },
  {
    slug: "backend",
    label: "Backend",
    description:
      "APIs, auth, and data layers that keep mobile apps stable.",
  },
  {
    slug: "esg",
    label: "ESG",
    description:
      "ESG reporting, BRSR, and the software behind sustainability disclosures.",
  },
  {
    slug: "sustainability",
    label: "Sustainability",
    description:
      "Decarbonization, carbon accounting, and green product systems.",
  },
  {
    slug: "contextual-intelligence",
    label: "Contextual Intelligence",
    description:
      "Contextual intelligence engines that turn messy ESG data into decisions.",
  },
  {
    slug: "carbon",
    label: "Carbon",
    description:
      "Carbon emissions, GHG Protocol, Scope 1/2/3, and carbon accounting software.",
  },
  {
    slug: "typescript",
    label: "TypeScript",
    description:
      "Typed JavaScript for production mobile and web systems.",
  },
  {
    slug: "web",
    label: "Web",
    description:
      "React, Next.js, and the web surfaces around mobile products.",
  },
] as const;

export const topicClusters: Record<string, readonly CategorySlug[]> = {
  climate: ["esg", "sustainability", "carbon", "contextual-intelligence"],
  engineering: ["react-native", "ai", "backend", "typescript", "web"],
};

export type CategorySlug = (typeof categories)[number]["slug"];

export const projects = [
  {
    title: "Debt Relief India",
    year: "2025",
    role: "React Native · iOS App Store",
    summary:
      "A live FinTech iOS app built with React Native. Shipping it meant privacy, payments, App Store review, and production iOS edge cases — not just UI.",
    tags: ["React Native", "FinTech", "iOS", "App Store"],
  },
  {
    title: "Pluse",
    year: "2024",
    role: "React Native · Product",
    summary:
      "A medicine tracker built for real daily use: reminders, API consumption, and a clean mobile workflow for patients.",
    tags: ["React Native", "Healthcare", "APIs"],
  },
  {
    title: "Amrutam Forum",
    year: "2024",
    role: "React Native · Community",
    summary:
      "A community forum product with authentication, feeds, and the unglamorous work of making lists, search, and state feel instant.",
    tags: ["React Native", "Community", "Auth"],
  },
  {
    title: "GreensTurn platform work",
    year: "2026",
    role: "Mobile · Sustainability systems",
    summary:
      "Building mobile and product surfaces around ESG, carbon, and sustainability intelligence at GreensTurn.",
    tags: ["ESG", "Sustainability", "React Native"],
  },
] as const;

export const experience = [
  {
    company: "GreensTurn",
    role: "Mobile Application Developer",
    period: "Present",
    detail:
      "Building mobile products in sustainability, ESG, and carbon intelligence.",
  },
  {
    company: "QURILO TECHNOLOGIES LLC",
    role: "React Native Developer",
    period: "Previous",
    detail: "Android and iOS app development with React Native.",
  },
  {
    company: "ZOZUK",
    role: "Software Developer",
    period: "Previous",
    detail: "Product engineering across mobile and web.",
  },
  {
    company: "Doneship",
    role: "Frontend Developer",
    period: "Previous",
    detail: "Frontend interfaces and product UI.",
  },
] as const;

export const skills = [
  "React Native",
  "Expo",
  "TypeScript",
  "React",
  "Redux Saga",
  "Node.js",
  "Firebase",
  "Supabase",
  "AWS",
  "Laravel",
  "REST APIs",
  "App Store",
  "Play Store",
  "ESG systems",
  "Sustainability tech",
] as const;

export const faqs = [
  {
    question: "Who is Devesh Kumar Singh?",
    answer:
      "Devesh Kumar Singh is a React Native and full-stack mobile engineer based in Gurugram, India. He builds production Android and iOS apps and writes about React Native, AI, backend systems, ESG, sustainability, and contextual intelligence.",
  },
  {
    question: "What does Devesh Kumar Singh work on now?",
    answer:
      "He is a Mobile Application Developer at GreensTurn, working on sustainability and ESG-related product surfaces while continuing to ship React Native apps.",
  },
  {
    question: "What technologies does Devesh Kumar Singh use?",
    answer:
      "React Native, Expo, TypeScript, React, Redux Saga, Node.js, Firebase, Supabase, AWS, Laravel, and REST APIs. He also ships apps to the Apple App Store and Google Play Store.",
  },
  {
    question: "Where can I read Devesh Kumar Singh's React Native writing?",
    answer:
      "On this site at deveshkumarsingh.com/blog, with a dedicated React Native category at /blog/category/react-native.",
  },
  {
    question: "Does Devesh Kumar Singh write about carbon emissions?",
    answer:
      "Yes. He writes about carbon accounting, GHG Protocol, Scope 1, 2 and 3 emissions, and the software used to measure and reduce them, at /blog/category/carbon and /blog/category/sustainability.",
  },
] as const;
