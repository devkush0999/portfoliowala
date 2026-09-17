import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";
import { getCategory } from "@/lib/posts";
import { site } from "@/lib/site";

export function PostCard({
  post,
  featured = false,
  heading: Heading = "h3",
}: {
  post: Post;
  featured?: boolean;
  heading?: "h2" | "h3";
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
            alt={post.title}
            loading={featured ? "eager" : "lazy"}
            decoding="async"
            className={`mt-4 w-full rounded-md border border-line object-cover ${
              featured ? "h-56" : "h-40"
            }`}
          />
        ) : null}
        <Heading
          className={`mt-3 font-display tracking-tight text-ink transition group-hover:text-accent ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {post.title}
        </Heading>
        {post.description ? (
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink/80">
            {post.description}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-muted">
          {post.author || site.name}
        </p>
      </Link>
    </article>
  );
}

export function PostList({
  posts,
  heading = "h2",
}: {
  posts: Post[];
  heading?: "h2" | "h3";
}) {
  if (posts.length === 0) {
    return (
      <p className="text-base text-ink/80">No writing in this category yet.</p>
    );
  }

  const Heading = heading;

  return (
    <div className="grid gap-12">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} heading={Heading} />
      ))}
    </div>
  );
}
