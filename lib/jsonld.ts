import { faqs, site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import type { Post } from "@/lib/posts";
import { getCategory } from "@/lib/posts";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: site.name,
    url: site.url,
    jobTitle: site.jobTitle,
    description: site.description,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurugram",
      addressCountry: "IN",
    },
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
      "Carbon emissions",
      "Carbon accounting",
      "GHG Protocol",
      "Scope 1 emissions",
      "Scope 2 emissions",
      "Scope 3 emissions",
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

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${post.slug}#article`),
    headline: post.title,
    description: post.description,
    image: [image],
    thumbnailUrl: image,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: site.language,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    url: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: site.name,
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
      "Technical writing on React Native, TypeScript, AI, backend, carbon emissions, ESG, and sustainability software.",
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
