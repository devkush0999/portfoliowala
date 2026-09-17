import Link from "next/link";
import type { CmsProject } from "@/lib/cms/types";

export function ProjectCard({ project }: { project: CmsProject }) {
  return (
    <article className="overflow-hidden rounded-md border border-line bg-surface">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="h-48 w-full object-cover"
        />
      ) : null}
      <div className="grid gap-4 p-6 md:grid-cols-[180px_1fr] md:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-accent">
            {project.year}
          </p>
          <p className="mt-3 text-sm text-muted">{project.role}</p>
        </div>
        <div>
          <h2 className="font-display text-3xl text-ink">{project.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-ink/80">
            {project.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-bg px-3 py-1 text-xs text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
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
