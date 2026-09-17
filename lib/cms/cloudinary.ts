import { v2 as cloudinary } from "cloudinary";
import type { CmsEducation, CmsExperience, CmsPost, CmsProject } from "@/lib/cms/types";

function configured() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) {
    return false;
  }
  cloudinary.config({ cloud_name, api_key, api_secret });
  return true;
}

function rawUrl(publicId: string) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloud}/raw/upload/v${Math.floor(Date.now() / 60_000)}/${publicId}.json`;
}

async function readJson<T>(publicId: string): Promise<T | null> {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return null;
  }
  try {
    const response = await fetch(rawUrl(publicId), {
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function writeJson(publicId: string, data: unknown) {
  if (!configured()) {
    throw new Error("Cloudinary is not configured");
  }
  const payload = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
  await cloudinary.uploader.upload(`data:application/json;base64,${payload}`, {
    resource_type: "raw",
    public_id: publicId,
    format: "json",
    overwrite: true,
    invalidate: true,
  });
}

export async function readPosts() {
  return (await readJson<CmsPost[]>("dks-cms/posts")) ?? [];
}

export async function writePosts(posts: CmsPost[]) {
  await writeJson("dks-cms/posts", posts);
}

export async function readProjects() {
  return (await readJson<CmsProject[]>("dks-cms/projects")) ?? null;
}

export async function writeProjects(projects: CmsProject[]) {
  await writeJson("dks-cms/projects", projects);
}

export async function readExperience() {
  return (await readJson<CmsExperience[]>("dks-cms/experience")) ?? null;
}

export async function writeExperience(items: CmsExperience[]) {
  await writeJson("dks-cms/experience", items);
}

export async function readEducation() {
  return (await readJson<CmsEducation[]>("dks-cms/education")) ?? null;
}

export async function writeEducation(items: CmsEducation[]) {
  await writeJson("dks-cms/education", items);
}

export async function uploadImage(file: Buffer, filename: string) {
  if (!configured()) {
    throw new Error("Cloudinary is not configured");
  }
  const ext = filename.split(".").pop()?.toLowerCase() ?? "jpg";
  const mime =
    ext === "png"
      ? "image/png"
      : ext === "webp"
        ? "image/webp"
        : ext === "gif"
          ? "image/gif"
          : "image/jpeg";
  const uploaded = await cloudinary.uploader.upload(
    `data:${mime};base64,${file.toString("base64")}`,
    {
      folder: "dks-cms/images",
      resource_type: "image",
    },
  );
  return uploaded.secure_url as string;
}
