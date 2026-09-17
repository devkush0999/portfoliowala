import { NextResponse } from "next/server";
import { readEducation, writeEducation } from "@/lib/cms/store";
import { revalidateCms } from "@/lib/cms/content";
import { seedEducation } from "@/lib/cms/seed";
import type { CmsEducation } from "@/lib/cms/types";

export async function GET() {
  const remote = await readEducation();
  return NextResponse.json(remote && remote.length > 0 ? remote : seedEducation);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as CmsEducation[];
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a list" }, { status: 400 });
  }
  await writeEducation(body);
  revalidateCms();
  return NextResponse.json({ ok: true });
}
