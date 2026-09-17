export type CmsSection = {
  id: string;
  title: string;
  body: string;
};

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function headingRank(hashes: number) {
  if (hashes <= 1) {
    return 2;
  }
  if (hashes >= 5) {
    return 4;
  }
  return hashes;
}

export function normalizeHeadings(markdown: string) {
  return markdown.replace(/^(#{1,6})\s+(.*)$/gm, (_, hashes: string, text: string) => {
    return `${"#".repeat(headingRank(hashes.length))} ${text}`;
  });
}

export function compileSections(sections: CmsSection[]) {
  return sections
    .map((section) => {
      const title = section.title.trim();
      const body = normalizeHeadings(section.body.trim());
      if (title && body) {
        return `## ${title}\n\n${body}`;
      }
      if (title) {
        return `## ${title}`;
      }
      return body;
    })
    .filter(Boolean)
    .join("\n\n");
}

export function extractHeadings(markdown: string) {
  const seen = new Map<string, number>();
  const matches = normalizeHeadings(markdown).matchAll(/^(#{2,4})\s+(.*)$/gm);
  return [...matches].map((match) => {
    const text = match[2].replace(/[*`#]/g, "").trim();
    const base = slugifyHeading(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return {
      text,
      id: count === 0 ? base : `${base}-${count + 1}`,
      level: match[1].length as 2 | 3 | 4,
    };
  });
}

export function sectionsFromContent(content: string, sections?: CmsSection[]) {
  if (sections && sections.length > 0) {
    return sections;
  }
  return [
    {
      id: "section-1",
      title: "",
      body: content ?? "",
    },
  ];
}
