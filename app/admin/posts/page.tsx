import Link from "next/link";
import { Container } from "@/components/ui";
import { getAdminPosts } from "@/lib/cms/content";

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink">Posts</h1>
          <p className="mt-2 text-ink/80">Markdown in, live site out.</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex h-11 items-center rounded-sm bg-accent px-5 text-sm font-medium text-white"
        >
          New post
        </Link>
      </div>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/admin/posts/${post.slug}`}
            className="flex items-center justify-between gap-4 py-4 hover:text-accent"
          >
            <span>
              <span className="block font-medium text-ink">{post.title}</span>
              <span className="text-sm text-muted">
                {post.date} · {post.category}
                {post.draft ? " · draft" : ""}
              </span>
            </span>
            <span className="text-sm text-accent">Edit</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
