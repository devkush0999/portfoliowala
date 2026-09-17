import Link from "next/link";
import { Container } from "@/components/ui";
import { getAllPosts, getAllProjects } from "@/lib/cms/content";

export default async function AdminHomePage() {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ]);

  const cards = [
    { href: "/admin/posts", label: "Posts", count: posts.length },
    { href: "/admin/projects", label: "Projects", count: projects.length },
  ];

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl text-ink">Content</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-ink/80">
        Write a post, upload images to Cloudinary, and add projects. Changes
        show on the public site after save.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-md border border-line bg-surface p-6 hover:border-accent"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-accent">
              {card.label}
            </p>
            <p className="mt-3 font-display text-4xl text-ink">{card.count}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
