import type { CategorySlug } from "@/lib/site";
import type { FaqItem } from "@/lib/posts";

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
};

export type CmsProject = {
  id: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  image?: string;
  href?: string;
  github?: string;
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
