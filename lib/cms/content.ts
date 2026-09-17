import {
  readEducation,
  readExperience,
  readPosts,
  readProjects,
} from "@/lib/cms/store";
import {
  seedEducation,
  seedExperience,
  seedProjects,
} from "@/lib/cms/seed";
import type { CmsPost } from "@/lib/cms/types";
import {
  compileSections,
  sectionsFromContent,
} from "@/lib/cms/sections";
import {
  getLocalPosts,
  getPostFrom,
  getPostsByCategoryFrom,
  getRelatedPostsFrom,
  toPost,
  type Post,
} from "@/lib/posts";
import { site, topicClusters, type CategorySlug } from "@/lib/site";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function getCmsPosts() {
  try {
    return await readPosts();
  } catch {
    return [];
  }
}

async function getMergedPosts(): Promise<Post[]> {
  const local = getLocalPosts();
  const remote = await getCmsPosts();
  const bySlug = new Map<string, Post>();

  for (const post of local) {
    bySlug.set(post.slug, post);
  }
  for (const item of remote) {
    const post = toPost(item);
    if (post) {
      bySlug.set(post.slug, post);
    }
  }

  return [...bySlug.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAdminPosts(): Promise<Post[]> {
  return getMergedPosts();
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getMergedPosts();
  return posts.filter(
    (post) => !(post.draft && process.env.NODE_ENV === "production"),
  );
}

export async function getPost(slug: string) {
  return getPostFrom(await getAllPosts(), slug);
}

export async function getPostsByCategory(category: CategorySlug) {
  return getPostsByCategoryFrom(await getAllPosts(), category);
}

export async function getRelatedPosts(post: Post) {
  return getRelatedPostsFrom(await getAllPosts(), post);
}

export async function getClusterPosts(category: CategorySlug) {
  const cluster =
    Object.values(topicClusters).find((group) => group.includes(category)) ??
    [];
  const posts = await getAllPosts();
  return posts.filter(
    (post) => post.category !== category && cluster.includes(post.category),
  );
}

export async function getAllProjects() {
  const remote = await readProjects();
  return remote && remote.length > 0 ? remote : seedProjects;
}

export const getAllExperience = unstable_cache(
  async () => {
    const remote = await readExperience();
    return remote && remote.length > 0 ? remote : seedExperience;
  },
  ["cms-experience"],
  { tags: ["cms-experience"] },
);

export const getAllEducation = unstable_cache(
  async () => {
    const remote = await readEducation();
    return remote && remote.length > 0 ? remote : seedEducation;
  },
  ["cms-education"],
  { tags: ["cms-education"] },
);

export function prepareCmsPost(body: CmsPost): CmsPost {
  const sections =
    Array.isArray(body.sections) && body.sections.length > 0
      ? body.sections
      : sectionsFromContent(body.content ?? "");
  const compiled = compileSections(sections);
  const faq = (body.faq ?? []).filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  );

  return {
    slug: body.slug,
    title: body.title,
    description: body.description ?? "",
    date: body.date,
    updated: body.updated,
    category: body.category,
    tags: body.tags ?? [],
    featured: Boolean(body.featured),
    draft: Boolean(body.draft),
    faq,
    content: compiled || body.content || "",
    cover: body.cover,
    author: body.author,
    seoTitle: body.seoTitle,
    seoDescription: body.seoDescription,
    canonicalUrl: body.canonicalUrl,
    sections,
  };
}

export function asCmsPost(post: Post): CmsPost {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    category: post.category,
    tags: post.tags,
    featured: post.featured,
    draft: post.draft,
    faq: post.faq,
    content: post.content,
    cover: post.cover,
    author: post.author || site.name,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    canonicalUrl: post.canonicalUrl,
    sections: sectionsFromContent(post.content, post.sections),
  };
}

export function revalidateCms() {
  revalidateTag("cms-experience", "max");
  revalidateTag("cms-education", "max");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/blog/category/[category]", "page");
  revalidatePath("/work");
  revalidatePath("/about");
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  revalidatePath("/llms.txt");
}
