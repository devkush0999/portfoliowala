import { NextResponse } from "next/server";
import { readPosts, writePosts } from "@/lib/cms/cloudinary";
import { revalidateCms } from "@/lib/cms/content";
import type { CmsPost } from "@/lib/cms/types";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = (await request.json()) as CmsPost;
  const posts = await readPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  const nextPost = {
    ...body,
    slug: body.slug || slug,
    updated: new Date().toISOString().slice(0, 10),
    tags: body.tags ?? [],
  };

  const next =
    index >= 0
      ? posts.map((post, i) => (i === index ? nextPost : post))
      : [...posts, nextPost];

  await writePosts(next);
  revalidateCms();
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const posts = await readPosts();
  await writePosts(posts.filter((post) => post.slug !== slug));
  revalidateCms();
  return NextResponse.json({ ok: true });
}
