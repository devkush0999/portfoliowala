import Link from "next/link";
import { ResponsiveImage } from "@/components/ResponsiveImage";
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
          <div
            className={`relative mt-4 overflow-hidden rounded-md border border-line ${
              featured ? "h-44 sm:h-56" : "h-36 sm:h-40"
            }`}
          >
            <ResponsiveImage
              src={post.cover}
              alt={post.title}
              fill
              priority={featured}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
              className="object-cover"
            />
          </div>
        ) : null}
        <Heading
          className={`mt-3 font-display tracking-tight text-ink transition group-hover:text-accent ${
            featured ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
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
