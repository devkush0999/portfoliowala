import Link from "next/link";
import type { CmsProject } from "@/lib/cms/types";

function hrefFor(project: CmsProject) {
  return `/work/${project.slug || project.id}`;
}

export function ProjectBanner({
  project,
  className = "aspect-[16/9]",
}: {
  project: CmsProject;
  className?: string;
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className={`w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-end bg-surface-2 ${className}`}
      aria-hidden="true"
    >
      <div className="w-full bg-gradient-to-t from-ink/80 to-transparent p-6">
        <p className="font-display text-2xl tracking-tight text-white">
          {project.title}
        </p>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: CmsProject }) {
  const href = hrefFor(project);

  return (
    <article className="overflow-hidden rounded-md border border-line bg-surface">
      <Link href={href} className="block">
        <ProjectBanner project={project} className="aspect-[16/9] max-h-72" />
      </Link>
      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[200px_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-accent">
            {project.year}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">{project.role}</p>
        </div>
        <div>
          <h2 className="font-display text-3xl tracking-tight text-ink">
            <Link href={href} className="hover:text-accent">
              {project.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-ink/80">
            {project.summary}
          </p>
          {project.tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-bg px-3 py-1 text-xs text-ink"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href={href} className="text-accent hover:underline">
              Case study
            </Link>
            {project.href ? (
              <Link
                href={project.href}
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
              </Link>
            ) : null}
            {project.github ? (
              <Link
                href={project.github}
                className="text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
