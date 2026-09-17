import { NextResponse } from "next/server";
import { readPosts, writePosts } from "@/lib/cms/cloudinary";
import { asCmsPost, getAllPosts, revalidateCms } from "@/lib/cms/content";
import type { CmsPost } from "@/lib/cms/types";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts.map(asCmsPost));
}

export async function POST(request: Request) {
  const body = (await request.json()) as CmsPost;
  if (!body.slug || !body.title || !body.content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const posts = await readPosts();
  if (posts.some((post) => post.slug === body.slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const next = [
    ...posts,
    {
      ...body,
      date: body.date || new Date().toISOString().slice(0, 10),
      tags: body.tags ?? [],
    },
  ];
  await writePosts(next);
  revalidateCms();
  return NextResponse.json({ ok: true });
}
