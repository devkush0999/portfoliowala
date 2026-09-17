import Link from "next/link";
import { categories } from "@/lib/site";

export function CategoryPills({ active }: { active?: string }) {
  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      <Link
        href="/blog"
        className={`shrink-0 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.14em] ${
          !active
            ? "border-accent bg-accent text-white"
            : "border-line bg-surface text-ink hover:border-accent hover:text-accent"
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className={`shrink-0 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.14em] ${
            active === category.slug
              ? "border-accent bg-accent text-white"
              : "border-line bg-surface text-ink hover:border-accent hover:text-accent"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
