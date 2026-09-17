import Link from "next/link";
import { categories, site } from "@/lib/site";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl text-ink">{site.name}</p>
          <p className="mt-3 max-w-md text-base leading-7 text-ink/80">
            React Native, TypeScript, AI, backend, carbon emissions, ESG,
            sustainability, and contextual intelligence. Written from production
            work, not tutorial recaps.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Write</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="text-ink hover:text-accent"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Find</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/about" className="text-ink hover:text-accent">
              About
            </Link>
            <Link href="/work" className="text-ink hover:text-accent">
              Work
            </Link>
            <Link href="/contact" className="text-ink hover:text-accent">
              Contact
            </Link>
            <Link href="/feed.xml" className="text-ink hover:text-accent">
              RSS
            </Link>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              className="text-ink hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.location}.
          </p>
          <p>{site.url.replace("https://", "")}</p>
        </Container>
      </div>
    </footer>
  );
}
