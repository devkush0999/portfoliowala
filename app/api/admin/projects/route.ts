import { NextResponse } from "next/server";
import { readProjects, writeProjects } from "@/lib/cms/cloudinary";
import { revalidateCms } from "@/lib/cms/content";
import { seedProjects } from "@/lib/cms/seed";
import type { CmsProject } from "@/lib/cms/types";

export async function GET() {
  const remote = await readProjects();
  return NextResponse.json(remote && remote.length > 0 ? remote : seedProjects);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as CmsProject[];
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a list" }, { status: 400 });
  }
  await writeProjects(body);
  revalidateCms();
  return NextResponse.json({ ok: true });
}
