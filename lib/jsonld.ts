import type { CmsProject } from "@/lib/cms/types";
import { getPortraitSrc } from "@/lib/portrait";
import { faqs, site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import type { Post } from "@/lib/posts";
import { getCategory } from "@/lib/posts";

export function personJsonLd() {
  const portrait = getPortraitSrc();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: site.name,
    givenName: site.givenName,
    additionalName: site.additionalName,
    familyName: site.familyName,
    alternateName: [...site.alternateNames],
    url: site.url,
    jobTitle: site.jobTitle,
    description: site.description,
    email: site.email,
    image: portrait ? absoluteUrl(portrait) : undefined,
    nationality: "IN",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    homeLocation: [
      {
        "@type": "Place",
        name: site.hometown,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jaunpur",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
      },
      {
        "@type": "Place",
        name: site.region,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Varanasi",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: site.worksFor,
      url: "https://greensturn.com",
    },
    knowsAbout: [
      "React Native",
      "Expo",
      "TypeScript",
      "Next.js",
      "Mobile app development",
      "AI React Native",
      "FinTech apps",
      "EdTech apps",
      "ERP",
      "Vendor procurement",
      "Carbon emissions",
      "Carbon accounting",
      "GHG Protocol",
      "ESG",
      "Sustainability",
      "Decarbonization",
      "Contextual intelligence",
      "Artificial intelligence",
      "Backend engineering",
    ],
    sameAs: site.sameAs,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: site.language,
    publisher: {
      "@id": absoluteUrl("/#person"),
    },
    hasPart: {
      "@type": "Blog",
      "@id": absoluteUrl("/blog#blog"),
      name: `${site.name} writing`,
      url: absoluteUrl("/blog"),
    },
  };
}

export function faqJsonLd(
  items: readonly { question: string; answer: string }[] = faqs,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(post: Post) {
  const category = getCategory(post.category);
  const image = post.cover || absoluteUrl("/opengraph-image");
  const url = post.canonicalUrl || absoluteUrl(`/blog/${post.slug}`);
  const author = post.author || site.name;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    image: [image],
    thumbnailUrl: image,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: site.language,
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: author,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: site.name,
      url: site.url,
    },
    isPartOf: {
      "@id": absoluteUrl("/blog#blog"),
    },
    about: post.tags,
    articleSection: category?.label ?? post.category,
    keywords: [category?.label, ...post.tags].filter(Boolean).join(", "),
    wordCount: post.content.split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${Math.max(1, Number.parseInt(post.readingTime, 10) || 1)}M`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#answer", "h1"],
    },
  };
}

export function blogJsonLd(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    name: `${site.name} writing`,
    description:
      "Writing by Devesh Kumar Singh on React Native, mobile apps, AI, FinTech, EdTech, ERP, vendor procurement, ESG, and sustainability.",
    url: absoluteUrl("/blog"),
    inLanguage: site.language,
    publisher: {
      "@id": absoluteUrl("/#person"),
    },
    blogPost: posts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}#article`),
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
    })),
  };
}

export function collectionJsonLd({
  name,
  description,
  path,
  posts,
}: {
  name: string;
  description: string;
  path: string;
  posts: Post[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": absoluteUrl("/blog#blog"),
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
    },
  };
}

export function projectJsonLd(project: CmsProject) {
  const url = absoluteUrl(`/work/${project.slug || project.id}`);
  const image = project.image || project.images[0];

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#app`,
    name: project.title,
    description: project.summary,
    url,
    image: image ? [image] : undefined,
    applicationCategory: project.tags[0] || "MobileApplication",
    operatingSystem: project.tags.includes("iOS")
      ? "iOS"
      : project.tags.includes("Android")
        ? "Android"
        : "iOS, Android",
    author: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: site.name,
      url: site.url,
    },
    datePublished: project.year,
    sameAs: [
      project.href,
      project.github,
      project.appStore,
      project.playStore,
    ].filter((item): item is string => Boolean(item)),
  };
}
