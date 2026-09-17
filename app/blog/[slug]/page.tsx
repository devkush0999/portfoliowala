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
      <Container className="py-16 sm:py-20">
        <div className="max-w-[68ch]">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
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
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p id="answer" className="mt-5 text-xl leading-8 text-ink">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
            <span>{site.name}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && post.updated !== post.date ? (
              <span>Updated {formatDate(post.updated)}</span>
            ) : null}
            <span>{post.readingTime}</span>
          </div>
          {post.cover ? (
            <img
              src={post.cover}
              alt=""
              className="mt-8 w-full rounded-md border border-line object-cover"
            />
          ) : null}
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,68ch)_220px]">
          <article className="max-w-[68ch]">
            <MDXContent source={post.content} />
            {post.faq && post.faq.length > 0 ? (
              <div className="mt-14">
                <h2 className="font-display text-2xl text-ink">FAQ</h2>
                <div className="mt-6">
                  <FaqList items={post.faq} />
                </div>
              </div>
            ) : null}
          </article>
          <TableOfContents headings={post.headings} />
        </div>
        {related.length > 0 ? (
          <section className="mt-16 border-t border-line pt-12">
            <h2 className="font-display text-2xl text-ink">Related writing</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
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
