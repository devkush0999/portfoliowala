import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { TableOfContents } from "@/components/TableOfContents";
import { MDXContent } from "@/components/MDXContent";
import { FaqList } from "@/components/FaqList";
import { Container } from "@/components/ui";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/jsonld";
import { getPost, getAllPosts, getRelatedPosts } from "@/lib/cms/content";
import { formatDate, getCategory } from "@/lib/posts";
import { postMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }
  return postMetadata(post);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const category = getCategory(post.category);
  const related = await getRelatedPosts(post);
  const author = post.author || site.name;

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {post.faq && post.faq.length > 0 ? (
        <JsonLd data={faqJsonLd(post.faq)} />
      ) : null}
      <Container className="py-12 sm:py-16">
        <article>
          <header className="mx-auto max-w-[72ch]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              <Link href="/blog" className="hover:text-accent">
                Writing
              </Link>
              {category ? (
                <>
                  {" / "}
                  <Link
                    href={`/blog/category/${post.category}`}
                    className="text-accent"
                  >
                    {category.label}
                  </Link>
                </>
              ) : null}
            </p>
            <h1 className="mt-4 font-display text-[1.85rem] leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.description ? (
              <p
                id="answer"
                className="mt-5 text-lg leading-7 text-ink/85 sm:text-xl sm:leading-8"
              >
                {post.description}
              </p>
            ) : null}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-line py-4 text-sm text-muted">
              <Link href="/about" rel="author" className="text-ink hover:text-accent">
                {author}
              </Link>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && post.updated !== post.date ? (
                <span>Updated {formatDate(post.updated)}</span>
              ) : null}
              <span>{post.readingTime}</span>
            </div>
          </header>
          {post.cover ? (
            <figure className="mx-auto mt-8 max-w-4xl">
              <img
                src={post.cover}
                alt={post.title}
                fetchPriority="high"
                className="aspect-[16/9] w-full rounded-md border border-line object-cover"
              />
            </figure>
          ) : null}
          {post.tags.length > 0 ? (
            <ul className="mx-auto mt-6 flex max-w-[72ch] flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,72ch)_minmax(200px,1fr)] lg:gap-14">
            <TableOfContents headings={post.headings} />
            <div className="min-w-0 lg:order-first">
              <div className="max-w-[72ch]">
                <MDXContent source={post.content} />
              </div>
              {post.faq && post.faq.length > 0 ? (
                <section className="mt-16 max-w-[72ch] border-t border-line pt-12">
                  <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                    Questions people ask
                  </h2>
                  <p className="mt-3 text-base leading-7 text-ink/80">
                    Short answers for search, assistants, and anyone skimming.
                  </p>
                  <div className="mt-8">
                    <FaqList items={post.faq} />
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </article>
        {related.length > 0 ? (
          <section className="mt-16 border-t border-line pt-12">
            <h2 className="font-display text-2xl text-ink">Keep reading</h2>
            <div className="mt-8 grid gap-10 md:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}
