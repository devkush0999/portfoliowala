import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProjectBanner } from "@/components/ProjectCard";
import { Container } from "@/components/ui";
import { getAllProjects, getProject, projectPath } from "@/lib/cms/content";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ id: project.slug || project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) {
    return {};
  }

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: projectPath(project),
    keywords: [project.title, ...project.tags, "Devesh Kumar Singh projects"],
  });
}

function paragraphs(value?: string) {
  if (!value) {
    return [];
  }
  return value
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const gallery = project.images.filter(Boolean);
  const links = [
    project.href ? { href: project.href, label: "Live" } : null,
    project.github ? { href: project.github, label: "GitHub" } : null,
    project.appStore ? { href: project.appStore, label: "App Store" } : null,
    project.playStore ? { href: project.playStore, label: "Play Store" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: projectPath(project) },
        ])}
      />
      <Container className="py-12 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
          <Link href="/work" className="hover:text-accent">
            Work
          </Link>
          {" / "}
          <span className="text-accent">{project.year}</span>
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>
        <p id="answer" className="mt-5 max-w-2xl text-xl leading-8 text-ink/85">
          {project.summary}
        </p>
        <p className="mt-4 text-sm text-muted">{project.role}</p>
        {links.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="mt-10 overflow-hidden rounded-md border border-line">
          <ProjectBanner project={project} className="aspect-[16/9] max-h-[28rem]" />
        </div>
        {project.tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="max-w-[68ch]">
            {paragraphs(project.description).map((part) => (
              <p key={part} className="mt-6 text-lg leading-[1.8] text-ink first:mt-0">
                {part}
              </p>
            ))}
            {gallery.length > 0 ? (
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {gallery.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="w-full rounded-md border border-line object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>
          <aside className="grid h-fit gap-6">
            {project.problem ? (
              <div className="rounded-md border border-line bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  Problem
                </p>
                <p className="mt-3 text-base leading-7 text-ink/80">
                  {project.problem}
                </p>
              </div>
            ) : null}
            {project.features.length > 0 ? (
              <div className="rounded-md border border-line bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  Features
                </p>
                <ul className="mt-4 grid gap-3 text-base leading-7 text-ink/80">
                  {project.features.map((feature) => (
                    <li key={feature} className="border-l-2 border-accent pl-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.outcome ? (
              <div className="rounded-md border border-line bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  Outcome
                </p>
                <p className="mt-3 text-base leading-7 text-ink/80">
                  {project.outcome}
                </p>
              </div>
            ) : null}
          </aside>
        </div>
        <p className="mt-14 text-sm">
          <Link href="/work" className="text-accent hover:underline">
            All work
          </Link>
        </p>
      </Container>
    </>
  );
}
