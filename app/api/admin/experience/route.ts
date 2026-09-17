import { NextResponse } from "next/server";
import { readExperience, writeExperience } from "@/lib/cms/cloudinary";
import { revalidateCms } from "@/lib/cms/content";
import { seedExperience } from "@/lib/cms/seed";
import type { CmsExperience } from "@/lib/cms/types";

export async function GET() {
  const remote = await readExperience();
  return NextResponse.json(remote && remote.length > 0 ? remote : seedExperience);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as CmsExperience[];
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a list" }, { status: 400 });
  }
  await writeExperience(body);
  revalidateCms();
  return NextResponse.json({ ok: true });
}
