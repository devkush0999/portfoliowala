import { NextResponse } from "next/server";
import { deletePost, upsertPost } from "@/lib/cms/store";
import { prepareCmsPost, revalidateCms } from "@/lib/cms/content";
import type { CmsPost } from "@/lib/cms/types";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = (await request.json()) as CmsPost;
  const post = prepareCmsPost(body);
  await upsertPost(slug, {
    ...post,
    slug: post.slug || slug,
    updated: new Date().toISOString().slice(0, 10),
  });
  revalidateCms();
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  await deletePost(slug);
  revalidateCms();
  return NextResponse.json({ ok: true });
}
