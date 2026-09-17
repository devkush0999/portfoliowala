import { NextResponse } from "next/server";
import { writeProjects } from "@/lib/cms/store";
import { getAdminProjects, revalidateCms } from "@/lib/cms/content";
import type { CmsProject } from "@/lib/cms/types";

export async function GET() {
  return NextResponse.json(await getAdminProjects());
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
