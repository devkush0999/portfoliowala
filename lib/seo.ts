import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { Post } from "@/lib/posts";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

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
    keywords: [...site.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function postMetadata(post: Post): Metadata {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const published = new Date(`${post.date}T00:00:00`).toISOString();
  const modified = new Date(
    `${post.updated ?? post.date}T00:00:00`,
  ).toISOString();

  return {
    title: post.title,
    description: post.description,
    keywords: [post.category, ...post.tags, ...site.keywords],
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "article",
      publishedTime: published,
      modifiedTime: modified,
      authors: [site.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}
