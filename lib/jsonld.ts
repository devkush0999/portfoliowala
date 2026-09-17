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
      "Mobile app development",
      "ESG",
      "Sustainability",
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: site.language,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    url: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@id": absoluteUrl("/#person"),
    },
    publisher: {
      "@id": absoluteUrl("/#person"),
    },
    articleSection: category?.label ?? post.category,
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#answer", "h1"],
    },
  };
}
