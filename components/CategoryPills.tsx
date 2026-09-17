import Link from "next/link";
import { categories } from "@/lib/site";

export function CategoryPills({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] ${
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
          className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] ${
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
