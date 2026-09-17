import { NextResponse } from "next/server";
import { insertPost, readPosts } from "@/lib/cms/store";
import {
  asCmsPost,
  getAdminPosts,
  prepareCmsPost,
  revalidateCms,
} from "@/lib/cms/content";
import type { CmsPost } from "@/lib/cms/types";

export async function GET() {
  const posts = await getAdminPosts();
  return NextResponse.json(posts.map(asCmsPost));
}

export async function POST(request: Request) {
  const body = (await request.json()) as CmsPost;
  const post = prepareCmsPost(body);
  if (!post.slug || !post.title) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!post.draft && !post.content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const posts = await readPosts();
  if (posts.some((item) => item.slug === post.slug)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  await insertPost({
    ...post,
    date: post.date || new Date().toISOString().slice(0, 10),
  });
  revalidateCms();
  return NextResponse.json({ ok: true });
}
