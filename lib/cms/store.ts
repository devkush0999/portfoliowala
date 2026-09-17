import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  education as educationTable,
  experience as experienceTable,
  posts as postsTable,
  projects as projectsTable,
} from "@/lib/db/schema";
import {
  seedEducation,
  seedExperience,
  seedProjects,
} from "@/lib/cms/seed";
import type {
  CmsEducation,
  CmsExperience,
  CmsPost,
  CmsProject,
} from "@/lib/cms/types";

async function cloudinaryJson<T>(publicId: string): Promise<T | null> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud) {
    return null;
  }
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${cloud}/raw/upload/${publicId}.json`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function postRow(post: CmsPost) {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated ?? null,
    category: post.category,
    tags: post.tags ?? [],
    featured: Boolean(post.featured),
    draft: Boolean(post.draft),
    faq: post.faq ?? [],
    content: post.content,
    cover: post.cover || null,
  };
}

function fromPostRow(row: typeof postsTable.$inferSelect): CmsPost {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date,
    updated: row.updated ?? undefined,
    category: row.category as CmsPost["category"],
    tags: row.tags ?? [],
    featured: row.featured,
    draft: row.draft,
    faq: row.faq ?? [],
    content: row.content,
    cover: row.cover ?? undefined,
  };
}

export async function readPosts() {
  const rows = await db.select().from(postsTable);
  if (rows.length > 0) {
    return rows.map(fromPostRow);
  }

  const migrated = await cloudinaryJson<CmsPost[]>("dks-cms/posts");
  if (migrated && migrated.length > 0) {
    await writePosts(migrated);
    return migrated;
  }

  return [];
}

export async function writePosts(posts: CmsPost[]) {
  await db.transaction(async (tx) => {
    await tx.delete(postsTable);
    if (posts.length === 0) {
      return;
    }
    await tx.insert(postsTable).values(posts.map(postRow));
  });
}

export async function insertPost(post: CmsPost) {
  await db.insert(postsTable).values(postRow(post));
}

export async function upsertPost(slug: string, post: CmsPost) {
  const row = postRow(post);
  await db.transaction(async (tx) => {
    if (slug !== row.slug) {
      await tx.delete(postsTable).where(eq(postsTable.slug, slug));
    }
    await tx
      .insert(postsTable)
      .values(row)
      .onConflictDoUpdate({
        target: postsTable.slug,
        set: {
          title: row.title,
          description: row.description,
          date: row.date,
          updated: row.updated,
          category: row.category,
          tags: row.tags,
          featured: row.featured,
          draft: row.draft,
          faq: row.faq,
          content: row.content,
          cover: row.cover,
        },
      });
  });
}

export async function deletePost(slug: string) {
  await db.delete(postsTable).where(eq(postsTable.slug, slug));
}

export async function readProjects() {
  const rows = await db
    .select()
    .from(projectsTable)
    .orderBy(projectsTable.position);
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      year: row.year,
      role: row.role,
      summary: row.summary,
      tags: row.tags ?? [],
      image: row.image ?? undefined,
      href: row.href ?? undefined,
      github: row.github ?? undefined,
    }));
  }

  const migrated = await cloudinaryJson<CmsProject[]>("dks-cms/projects");
  const data =
    migrated && migrated.length > 0 ? migrated : seedProjects;
  await writeProjects(data);
  return data;
}

export async function writeProjects(items: CmsProject[]) {
  await db.transaction(async (tx) => {
    await tx.delete(projectsTable);
    if (items.length === 0) {
      return;
    }
    await tx.insert(projectsTable).values(
      items.map((item, position) => ({
        id: item.id,
        title: item.title,
        year: item.year,
        role: item.role,
        summary: item.summary,
        tags: item.tags ?? [],
        image: item.image || null,
        href: item.href || null,
        github: item.github || null,
        position,
      })),
    );
  });
}

export async function readExperience() {
  const rows = await db
    .select()
    .from(experienceTable)
    .orderBy(experienceTable.position);
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: row.id,
      company: row.company,
      role: row.role,
      period: row.period,
      detail: row.detail,
    }));
  }

  const migrated = await cloudinaryJson<CmsExperience[]>("dks-cms/experience");
  const data =
    migrated && migrated.length > 0 ? migrated : seedExperience;
  await writeExperience(data);
  return data;
}

export async function writeExperience(items: CmsExperience[]) {
  await db.transaction(async (tx) => {
    await tx.delete(experienceTable);
    if (items.length === 0) {
      return;
    }
    await tx.insert(experienceTable).values(
      items.map((item, position) => ({
        id: item.id,
        company: item.company,
        role: item.role,
        period: item.period,
        detail: item.detail,
        position,
      })),
    );
  });
}

export async function readEducation() {
  const rows = await db
    .select()
    .from(educationTable)
    .orderBy(educationTable.position);
  if (rows.length > 0) {
    return rows.map((row) => ({
      id: row.id,
      school: row.school,
      degree: row.degree,
      period: row.period,
      grade: row.grade ?? undefined,
      detail: row.detail,
    }));
  }

  const migrated = await cloudinaryJson<CmsEducation[]>("dks-cms/education");
  const data =
    migrated && migrated.length > 0 ? migrated : seedEducation;
  await writeEducation(data);
  return data;
}

export async function writeEducation(items: CmsEducation[]) {
  await db.transaction(async (tx) => {
    await tx.delete(educationTable);
    if (items.length === 0) {
      return;
    }
    await tx.insert(educationTable).values(
      items.map((item, position) => ({
        id: item.id,
        school: item.school,
        degree: item.degree,
        period: item.period,
        grade: item.grade || null,
        detail: item.detail,
        position,
      })),
    );
  });
}
