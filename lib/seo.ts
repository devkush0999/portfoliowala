import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { Post } from "@/lib/posts";
import { getCategory } from "@/lib/posts";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

const defaultImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: site.name,
};

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...keywords, ...site.keywords],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage.url],
    },
  };
}

export function postMetadata(post: Post): Metadata {
  const pathUrl = absoluteUrl(`/blog/${post.slug}`);
  const url = post.canonicalUrl || pathUrl;
  const published = new Date(`${post.date}T00:00:00`).toISOString();
  const modified = new Date(
    `${post.updated ?? post.date}T00:00:00`,
  ).toISOString();
  const category = getCategory(post.category);
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.description;
  const image = post.cover
    ? { url: post.cover, alt: post.title }
    : defaultImage;
  const author = post.author || site.name;

  return {
    title,
    description,
    keywords: [
      post.title,
      category?.label ?? post.category,
      ...post.tags,
      ...site.keywords,
    ],
    authors: [{ name: author, url: site.url }],
    creator: author,
    publisher: site.name,
    category: category?.label ?? post.category,
    robots: {
      index: !post.draft,
      follow: true,
      googleBot: {
        index: !post.draft,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "article",
      publishedTime: published,
      modifiedTime: modified,
      authors: [author],
      tags: post.tags,
      section: category?.label ?? post.category,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
