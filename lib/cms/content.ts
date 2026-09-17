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
  getLocalPosts,
  getPostFrom,
  getPostsByCategoryFrom,
  getRelatedPostsFrom,
  toPost,
  type Post,
} from "@/lib/posts";
import type { CategorySlug } from "@/lib/site";
import { topicClusters } from "@/lib/site";
import { revalidatePath } from "next/cache";

export async function getCmsPosts() {
  try {
    return await readPosts();
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<Post[]> {
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

  return [...bySlug.values()]
    .filter((post) => !(post.draft && process.env.NODE_ENV === "production"))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
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

export async function getAllExperience() {
  const remote = await readExperience();
  return remote && remote.length > 0 ? remote : seedExperience;
}

export async function getAllEducation() {
  const remote = await readEducation();
  return remote && remote.length > 0 ? remote : seedEducation;
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
  };
}

export function revalidateCms() {
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
