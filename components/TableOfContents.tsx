export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string }[];
}) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="lg:sticky lg:top-28">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Contents</p>
      <nav className="mt-4 flex flex-col gap-2 text-sm">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className="text-ink transition hover:text-accent"
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
