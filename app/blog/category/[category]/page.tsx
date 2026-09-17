import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPills } from "@/components/CategoryPills";
import { JsonLd } from "@/components/JsonLd";
import { PostList } from "@/components/PostCard";
import { Container, SectionHeading } from "@/components/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getPostsByCategory } from "@/lib/cms/content";
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
    title: `${category.label} writing`,
    description: `${category.description} Writing by Devesh Kumar Singh.`,
    path: `/blog/category/${category.slug}`,
    keywords: [category.label, `Devesh Kumar Singh ${category.label}`],
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

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
          { name: category.label, path: `/blog/category/${category.slug}` },
        ])}
      />
      <Container className="py-16">
        <SectionHeading
          eyebrow="Category"
          title={category.label}
          description={category.description}
        />
        <div className="mt-8">
          <CategoryPills active={category.slug} />
        </div>
        <div className="mt-12">
          <PostList posts={posts} />
        </div>
      </Container>
    </>
  );
}
