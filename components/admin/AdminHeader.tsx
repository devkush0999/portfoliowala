"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
];

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/admin" className="text-sm font-medium text-ink">
          CMS
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? "font-medium text-accent"
                  : "text-ink/75 hover:text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-ink/75 hover:text-ink">
            Site
          </Link>
          <button
            type="button"
            className="text-ink/75 hover:text-ink"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.push("/admin/login");
              router.refresh();
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-line px-5 py-3 text-sm md:hidden">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
