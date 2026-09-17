import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";
import { getCategory } from "@/lib/posts";

export function PostCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const category = getCategory(post.category);

  return (
    <article className={featured ? "border-b border-line pb-10" : ""}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.16em] text-muted">
          <span className="text-accent">{category?.label}</span>
          <span>{formatDate(post.date)}</span>
          <span>{post.readingTime}</span>
        </div>
        {post.cover ? (
          <img
            src={post.cover}
            alt=""
            className={`mt-4 w-full rounded-md border border-line object-cover ${
              featured ? "h-56" : "h-40"
            }`}
          />
        ) : null}
        <h3
          className={`mt-3 font-display tracking-tight text-ink transition group-hover:text-accent ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink/80">
          {post.description}
        </p>
      </Link>
    </article>
  );
}

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-base text-ink/80">No writing in this category yet.</p>
    );
  }

  return (
    <div className="grid gap-10">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
