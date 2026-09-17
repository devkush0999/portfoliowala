export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level?: 2 | 3 | 4 }[];
}) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-md border border-line bg-surface p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Contents
        </p>
        <nav className="mt-4 flex flex-col gap-2.5 text-sm">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`leading-6 text-ink transition hover:text-accent ${
                heading.level === 3
                  ? "pl-3"
                  : heading.level === 4
                    ? "pl-6"
                    : ""
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
