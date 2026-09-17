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
import type { CmsPost, CmsProject } from "@/lib/cms/types";
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
  try {
    const remote = await readProjects();
    const data = remote && remote.length > 0 ? remote : seedProjects;
    return data.map(hydrateProject);
  } catch {
    return seedProjects.map(hydrateProject);
  }
}

export async function getProject(slug: string) {
  const projects = await getAllProjects();
  return (
    projects.find(
      (project) => project.slug === slug || project.id === slug,
    ) ?? null
  );
}

function filled(value?: string) {
  return Boolean(value && value.trim());
}

export function projectPath(project: CmsProject) {
  return `/work/${project.slug || project.id}`;
}

function hydrateProject(project: CmsProject): CmsProject {
  const seed = seedProjects.find((item) => item.id === project.id);
  if (!seed) {
    return {
      ...project,
      features: project.features ?? [],
      images: project.images ?? [],
      slug: project.slug || project.id,
    };
  }

  return {
    ...seed,
    ...project,
    summary: filled(project.summary) ? project.summary : seed.summary,
    description: filled(project.description)
      ? project.description
      : seed.description,
    problem: filled(project.problem) ? project.problem : seed.problem,
    outcome: filled(project.outcome) ? project.outcome : seed.outcome,
    features: project.features?.length ? project.features : seed.features,
    images: project.images?.length ? project.images : seed.images,
    image: project.image || seed.image,
    href: project.href || seed.href,
    github: project.github || seed.github,
    appStore: project.appStore || seed.appStore,
    playStore: project.playStore || seed.playStore,
    slug: project.slug || seed.slug || project.id,
    tags: project.tags?.length ? project.tags : seed.tags,
  };
}

export const getAllExperience = unstable_cache(
  async () => {
    try {
      const remote = await readExperience();
      return remote && remote.length > 0 ? remote : seedExperience;
    } catch {
      return seedExperience;
    }
  },
  ["cms-experience"],
  { tags: ["cms-experience"] },
);

export const getAllEducation = unstable_cache(
  async () => {
    try {
      const remote = await readEducation();
      return remote && remote.length > 0 ? remote : seedEducation;
    } catch {
      return seedEducation;
    }
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
  revalidatePath("/work/[id]", "page");
  revalidatePath("/about");
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  revalidatePath("/llms.txt");
}
