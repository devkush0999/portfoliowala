import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPills } from "@/components/CategoryPills";
import { JsonLd } from "@/components/JsonLd";
import { PostList } from "@/components/PostCard";
import { Container, SectionHeading } from "@/components/ui";
import { breadcrumbJsonLd, collectionJsonLd } from "@/lib/jsonld";
import { getClusterPosts, getPostsByCategory } from "@/lib/cms/content";
import { getCategory } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { categories } from "@/lib/site";

export const revalidate = 60;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return {};
  }

  return pageMetadata({
    title: `${category.label} writing by Devesh Kumar Singh`,
    description: `${category.description} Essays and production notes by Devesh Kumar Singh.`,
    path: `/blog/category/${category.slug}`,
    keywords: [
      category.label,
      `${category.label} blog`,
      `Devesh Kumar Singh ${category.label}`,
    ],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.slug);
  const cluster = posts.length === 0 ? await getClusterPosts(category.slug) : [];

  return (
    <>
      <JsonLd
        data={collectionJsonLd({
          name: category.label,
          description: category.description,
          path: `/blog/category/${category.slug}`,
          posts: posts.length > 0 ? posts : cluster,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
          { name: category.label, path: `/blog/category/${category.slug}` },
        ])}
      />
      <Container className="py-16">
        <SectionHeading
          as="h1"
          eyebrow="Category"
          title={category.label}
          description={category.description}
        />
        <div className="mt-8">
          <CategoryPills active={category.slug} />
        </div>
        <div className="mt-12">
          {posts.length > 0 ? (
            <PostList posts={posts} />
          ) : (
            <>
              <p className="text-base text-ink/80">
                No {category.label.toLowerCase()} essays yet. Related writing from
                the same cluster is below.
              </p>
              <div className="mt-10">
                <PostList posts={cluster} />
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
