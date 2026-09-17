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
    slug: "debt-relief-india",
    title: "Debt Relief India",
    year: "2025",
    role: "React Native · iOS App Store",
    summary:
      "A live FinTech iOS app for people dealing with debt. Shipped through App Store review, privacy, and payments.",
    description:
      "Debt Relief India is a production FinTech product on the Apple App Store, built with React Native. The work was not a UI kit. It was certificates, privacy nutrition labels, payment edge cases, and the iOS details that only appear on a real device.\n\nI owned the mobile engineering needed to take a money product from a codebase to a live listing that real users can install.",
    problem:
      "People looking for debt help in India should not have to trust a random web form. They need a store-listed app with a clear privacy story and a path that still works after App Store review.",
    outcome:
      "Shipped as a live iOS app. The public record is an App Store listing, not a mockup.",
    features: [
      "React Native iOS production build",
      "App Store review and privacy manifests",
      "Payments and sensitive-data handling",
      "Auth and session recovery on real devices",
    ],
    images: [],
    tags: ["React Native", "FinTech", "iOS", "App Store"],
  },
  {
    id: "proj-pluse",
    slug: "pluse",
    title: "Pluse",
    year: "2024",
    role: "React Native · Healthcare",
    summary:
      "A medicine tracker for daily use: reminders, API-backed records, and a calm mobile workflow.",
    description:
      "Pluse is a medicine-tracking app built for people who have to remember doses, not for a demo reel. The product lives in reminders, API consumption, and a workflow that still makes sense when someone opens the phone half-asleep.\n\nI built the React Native client around real daily use: lists that stay fast, reminders that actually fire, and API contracts that do not strand the user on a spinner.",
    problem:
      "Missed doses are a product failure. A healthcare tracker that looks pretty but drops notifications or loses sync is worse than a paper list.",
    outcome:
      "A working React Native healthcare workflow with reminders and API-backed records.",
    features: [
      "Dose reminders on device",
      "API-backed medicine records",
      "Simple daily tracking flow",
      "React Native lists built for repeat use",
    ],
    images: [],
    tags: ["React Native", "Healthcare", "APIs"],
  },
  {
    id: "proj-amrutam",
    slug: "amrutam-forum",
    title: "Amrutam Forum",
    year: "2024",
    role: "React Native · Community",
    summary:
      "A community forum with auth, feeds, search, and the unglamorous work of making lists feel instant.",
    description:
      "Amrutam Forum is a community product: people sign in, post, scroll, search, and come back. That is a hard mobile problem because feeds, auth, and empty states show every shortcut you took.\n\nI worked the React Native surface so authentication, lists, and search felt like a product instead of a prototype.",
    problem:
      "Community apps die when the feed stutters, search is fake, or auth dumps the user back to a login wall. The forum had to feel instant on a phone.",
    outcome:
      "A community React Native app with auth, feeds, and search wired for real use.",
    features: [
      "Authentication and session handling",
      "Feeds and post lists",
      "Search across community content",
      "State that survives backgrounding",
    ],
    images: [],
    tags: ["React Native", "Community", "Auth"],
  },
  {
    id: "proj-greensturn",
    slug: "greensturn",
    title: "GreensTurn platform work",
    year: "2026",
    role: "Mobile · ESG and sustainability",
    summary:
      "Mobile and product surfaces around ESG, carbon, and sustainability intelligence at GreensTurn.",
    description:
      "At GreensTurn I build mobile product work for sustainability systems: ESG reporting, carbon data, and the operational facts that sit next to vendor procurement and ERP.\n\nThe job is to put those systems on a phone without turning a desktop BI tool into a tiny unreadable grid.",
    problem:
      "Sustainability teams and plant operators do not live in a desktop dashboard. ESG and carbon data has to travel to the field, or it stays a PDF.",
    outcome:
      "Ongoing mobile engineering on live sustainability product surfaces at GreensTurn.",
    features: [
      "React Native surfaces for ESG workflows",
      "Carbon and sustainability data on mobile",
      "Product work tied to operations, not slides",
      "Same TypeScript discipline as shipped apps",
    ],
    images: [],
    tags: ["ESG", "Sustainability", "React Native", "Carbon"],
    href: "https://greensturn.com",
  },
  {
    id: "proj-dating",
    slug: "dating-app-ui",
    title: "Dating App UI",
    year: "2024",
    role: "React Native · Expo",
    summary:
      "A dating-app UI in React Native with profiles, photos, search, and a swiping flow.",
    description:
      "A React Native and Expo dating-app interface: profiles, photos, search, and swipe. Built to prove motion, cards, and photo-heavy lists can stay smooth without a native rewrite.",
    problem:
      "Dating products fail in the hand: cards stutter, images pop in late, and swipe feels fake. The UI had to feel like a thumb, not a web page.",
    outcome:
      "A complete Expo UI for profiles, search, and swipe interactions.",
    features: [
      "Profile and photo cards",
      "Search",
      "Swipe interactions",
      "Expo React Native UI",
    ],
    images: [],
    tags: ["React Native", "Expo", "UI"],
  },
  {
    id: "proj-news",
    slug: "news-app",
    title: "News App",
    year: "2021",
    role: "React Native · Product",
    summary:
      "A news app with trending stories, article detail, search, and bookmarks.",
    description:
      "An early React Native news reader: trending stories, article detail, search, and bookmarks. The point was a complete mobile loop against a real API, not a single list screen.",
    problem:
      "News apps are a test of lists, detail, search, and saved state. If any of those break, the product is a demo.",
    outcome:
      "A full React Native news loop with search and bookmarks.",
    features: [
      "Trending story lists",
      "Article detail",
      "Search",
      "Bookmarks",
    ],
    images: [],
    tags: ["React Native", "API", "Expo"],
  },
  {
    id: "proj-ecommerce",
    slug: "ecommerce-ui",
    title: "E-commerce UI",
    year: "2024",
    role: "React · Storefront",
    summary:
      "A React storefront UI with category filters, search, and a checkout flow.",
    description:
      "A React e-commerce interface covering browse, filter, search, and checkout. Built to show a storefront path that a shopper can actually finish, not a hero banner with no cart.",
    problem:
      "Storefront UIs often stop at a pretty catalog. The hard part is filters, search, and a checkout that still makes sense.",
    outcome:
      "A React storefront UI with catalog, search, and checkout.",
    features: [
      "Category filters",
      "Product search",
      "Checkout flow",
      "React and Tailwind UI",
    ],
    images: [],
    tags: ["React", "Tailwind", "UI"],
  },
  {
    id: "proj-agency",
    slug: "creative-agency-website",
    title: "Creative Agency Website",
    year: "2024",
    role: "Next.js · Marketing",
    summary:
      "A Next.js marketing site to present a company's services and products.",
    description:
      "A Next.js marketing website for an agency: services, products, and a public face that loads fast. Built as a real site, not a slide deck exported to the web.",
    problem:
      "Agencies often ship a site that cannot be indexed or maintained. This one needed pages, services, and a structure Next.js can actually host.",
    outcome:
      "A Next.js marketing site for services and products.",
    features: [
      "Service and product pages",
      "Next.js App Router structure",
      "Tailwind layout",
      "Public marketing surface",
    ],
    images: [],
    tags: ["Next.js", "Tailwind"],
  },
];
