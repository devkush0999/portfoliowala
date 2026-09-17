import { pageMetadata } from "@/lib/seo";
import { Container, SectionHeading } from "@/components/ui";
import { CategoryPills } from "@/components/CategoryPills";
import { PostList } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { blogJsonLd, breadcrumbJsonLd, collectionJsonLd } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/cms/content";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Writing on React Native, carbon, ESG and software",
  description:
    "Long-form writing by Devesh Kumar Singh on React Native, TypeScript, AI, backend systems, carbon emissions, GHG accounting, ESG, and sustainability software.",
  path: "/blog",
  keywords: [
    "Devesh Kumar Singh blog",
    "React Native blog",
    "carbon emissions blog",
    "ESG software blog",
    "sustainability engineering blog",
  ],
});

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <JsonLd data={blogJsonLd(posts)} />
      <JsonLd
        data={collectionJsonLd({
          name: "Writing",
          description:
            "Technical writing on software, carbon emissions, and sustainability.",
          path: "/blog",
          posts,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
        ])}
      />
      <Container className="py-16">
        <SectionHeading
          as="h1"
          eyebrow="Writing"
          title="Notes from shipping software and climate systems"
          description="Production writing on React Native, TypeScript, AI, and backend, plus carbon emissions, GHG accounting, ESG, and sustainability products. Written to be indexed, cited, and useful."
        />
        <div className="mt-8">
          <CategoryPills />
        </div>
        <div className="mt-12">
          <PostList posts={posts} />
        </div>
      </Container>
    </>
  );
}
