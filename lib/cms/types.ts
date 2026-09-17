import type { CategorySlug } from "@/lib/site";
import type { FaqItem } from "@/lib/posts";
import type { CmsSection } from "@/lib/cms/sections";

export type CmsPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: CategorySlug;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  faq?: FaqItem[];
  content: string;
  cover?: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  sections?: CmsSection[];
};

export type CmsProject = {
  id: string;
  slug?: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  description?: string;
  problem?: string;
  outcome?: string;
  features: string[];
  images: string[];
  tags: string[];
  image?: string;
  href?: string;
  github?: string;
  appStore?: string;
  playStore?: string;
};

export type CmsExperience = {
  id: string;
  company: string;
  role: string;
  period: string;
  detail: string;
};

export type CmsEducation = {
  id: string;
  school: string;
  degree: string;
  period: string;
  grade?: string;
  detail: string;
};
