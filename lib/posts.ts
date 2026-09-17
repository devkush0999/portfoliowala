import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { categories, type CategorySlug } from "@/lib/site";

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
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
  headings: { id: string; text: string }[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getHeadings(markdown: string) {
  const matches = markdown.matchAll(/^##\s+(.+)$/gm);
  return [...matches].map((match) => ({
    text: match[1].replace(/[*`]/g, "").trim(),
    id: slugify(match[1]),
  }));
}

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

function parsePost(filename: string): Post | null {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const date = toDateString(data.date);
  const updated = data.updated ? toDateString(data.updated) : undefined;

  if (!data.title || !data.description || !date || !isCategory(data.category)) {
    return null;
  }

  if (data.draft && process.env.NODE_ENV === "production") {
    return null;
  }

  return {
    slug,
    title: data.title,
    description: String(data.description),
    date,
    updated: updated || undefined,
    category: data.category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    faq: Array.isArray(data.faq) ? data.faq : [],
    content,
    readingTime: readingTime(content).text,
    headings: getHeadings(content),
  };
}

export function getPosts() {
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

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug) ?? null;
}

export function getPostsByCategory(category: CategorySlug) {
  return getPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(post: Post, limit = 3) {
  return getPosts()
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
