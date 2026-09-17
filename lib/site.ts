export const site = {
  name: "Devesh Kumar Singh",
  shortName: "Devesh Singh",
  handle: "deveshkumarsingh",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://deveshkumarsingh.com",
  title:
    "Devesh Kumar Singh | React Native, Mobile Apps, ESG & Sustainability",
  description:
    "Devesh Kumar Singh is a React Native and mobile app developer from Jaunpur, Uttar Pradesh, now working in Gurugram. He ships Android and iOS apps across AI, FinTech, EdTech, ERP, vendor procurement, ESG, and sustainability.",
  jobTitle: "React Native Developer",
  worksFor: "GreensTurn",
  location: "Gurugram, India",
  hometown: "Jaunpur, Uttar Pradesh",
  region: "Varanasi, Uttar Pradesh",
  givenName: "Devesh",
  additionalName: "Kumar",
  familyName: "Singh",
  alternateNames: [
    "Devesh Singh",
    "Devesh Kumar",
    "Devesh Thakur",
    "Devesh Kumar Singh Thakur",
  ],
  email: "hello@deveshkumarsingh.com",
  locale: "en_IN",
  language: "en-IN",
  keywords: [
    "Devesh Kumar Singh",
    "Devesh Singh",
    "Devesh Kumar",
    "Devesh Thakur",
    "Devesh Kumar Singh Thakur",
    "Devesh Kumar Singh Rajput",
    "Devesh Kumar Singh Jaunpur",
    "Devesh Kumar Singh Varanasi",
    "React Native developer",
    "React Native developer India",
    "React Native engineer Gurugram",
    "mobile app developer",
    "AI React Native",
    "React Native AI apps",
    "ESG software",
    "sustainability engineering",
    "vendor procurement software",
    "ERP mobile app",
    "EdTech app",
    "FinTech app",
    "carbon emissions software",
    "carbon accounting",
    "GHG Protocol",
    "contextual intelligence engine",
    "TypeScript",
    "Next.js",
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
  {
    slug: "fintech",
    label: "FinTech",
    description:
      "React Native FinTech apps, payments, privacy, and App Store shipping.",
  },
  {
    slug: "edtech",
    label: "EdTech",
    description:
      "EdTech mobile apps for learning, teachers, and students on Android and iOS.",
  },
  {
    slug: "erp",
    label: "ERP",
    description:
      "ERP and vendor procurement mobile apps for operations, purchase, and suppliers.",
  },
] as const;

export const topicClusters: Record<string, readonly CategorySlug[]> = {
  climate: ["esg", "sustainability", "carbon", "contextual-intelligence"],
  engineering: ["react-native", "ai", "backend", "typescript", "web"],
  products: ["fintech", "edtech", "erp"],
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
  "FinTech apps",
  "EdTech apps",
  "ERP",
  "Vendor procurement",
] as const;

export const faqs = [
  {
    question: "Who is Devesh Kumar Singh?",
    answer:
      "Devesh Kumar Singh is a React Native and mobile app developer from Jaunpur, Uttar Pradesh, with family roots around Varanasi. He now lives in Gurugram and ships Android and iOS apps. He writes about React Native, AI, backend, ESG, sustainability, FinTech, EdTech, ERP, and vendor procurement.",
  },
  {
    question: "Is Devesh Kumar Singh from Jaunpur or Varanasi?",
    answer:
      "Yes. Devesh Kumar Singh is from Jaunpur, Uttar Pradesh, near Varanasi. He works as a React Native developer in Gurugram.",
  },
  {
    question: "What does Devesh Kumar Singh work on now?",
    answer:
      "He is a Mobile Application Developer at GreensTurn, working on sustainability and ESG product surfaces while shipping React Native mobile apps.",
  },
  {
    question: "Does Devesh Kumar Singh build FinTech, EdTech, and ERP apps?",
    answer:
      "Yes. He has shipped a live FinTech iOS app, Debt Relief India, and writes about React Native for EdTech, ERP, and vendor procurement mobile apps as well as AI in React Native.",
  },
  {
    question: "Where can I read Devesh Kumar Singh React Native writing?",
    answer:
      "On this site at deveshkumarsingh.com/blog, including /blog/category/react-native and /blog/category/ai.",
  },
] as const;
