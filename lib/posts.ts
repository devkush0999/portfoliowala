import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { categories, type CategorySlug } from "@/lib/site";
import type { CmsPost } from "@/lib/cms/types";
import { extractHeadings, type CmsSection } from "@/lib/cms/sections";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type FaqItem = {
  question: string;
  answer: string;
};

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: CategorySlug;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  faq?: FaqItem[];
  cover?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
  headings: { id: string; text: string; level: 2 | 3 | 4 }[];
  sections?: CmsSection[];
};

function isCategory(value: unknown): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}

function toDateString(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim()) {
    return value.slice(0, 10);
  }
  return "";
}

export function toPost(data: CmsPost): Post | null {
  const date = toDateString(data.date);
  if (!data.title || !data.slug || !date || !isCategory(data.category)) {
    return null;
  }

  const content = data.content ?? "";

  return {
    slug: data.slug,
    title: data.title,
    description: String(data.description ?? ""),
    date,
    updated: data.updated ? toDateString(data.updated) : undefined,
    category: data.category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    faq: Array.isArray(data.faq) ? data.faq : [],
    cover: data.cover,
    author: data.author,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    canonicalUrl: data.canonicalUrl,
    sections: data.sections,
    content,
    readingTime: readingTime(content).text,
    headings: extractHeadings(content),
  };
}

function parsePost(filename: string): Post | null {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return toPost({
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated,
    category: data.category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    faq: Array.isArray(data.faq) ? data.faq : [],
    cover: data.cover,
    author: data.author,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    canonicalUrl: data.canonicalUrl,
    content,
  });
}

export function getLocalPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map(parsePost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostFrom(posts: Post[], slug: string) {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getPostsByCategoryFrom(posts: Post[], category: CategorySlug) {
  return posts.filter((post) => post.category === category);
}

export function getRelatedPostsFrom(posts: Post[], post: Post, limit = 3) {
  return posts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      const aScore =
        (a.category === post.category ? 2 : 0) +
        a.tags.filter((tag) => post.tags.includes(tag)).length;
      const bScore =
        (b.category === post.category ? 2 : 0) +
        b.tags.filter((tag) => post.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null;
}

export function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
