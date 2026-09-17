import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { FaqItem } from "@/lib/posts";

export const posts = sqliteTable("cms_posts", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  updated: text("updated"),
  category: text("category").notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull().default([]),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  draft: integer("draft", { mode: "boolean" }).notNull().default(false),
  faq: text("faq", { mode: "json" }).$type<FaqItem[]>().notNull().default([]),
  content: text("content").notNull(),
  cover: text("cover"),
});

export const projects = sqliteTable("cms_projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  year: text("year").notNull(),
  role: text("role").notNull(),
  summary: text("summary").notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull().default([]),
  image: text("image"),
  href: text("href"),
  github: text("github"),
  position: integer("position").notNull().default(0),
});

export const experience = sqliteTable("cms_experience", {
  id: text("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  period: text("period").notNull(),
  detail: text("detail").notNull(),
  position: integer("position").notNull().default(0),
});

export const education = sqliteTable("cms_education", {
  id: text("id").primaryKey(),
  school: text("school").notNull(),
  degree: text("degree").notNull(),
  period: text("period").notNull(),
  grade: text("grade"),
  detail: text("detail").notNull(),
  position: integer("position").notNull().default(0),
});
