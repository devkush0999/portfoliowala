import { pageMetadata } from "@/lib/seo";
import { Container, SectionHeading } from "@/components/ui";
import { CategoryPills } from "@/components/CategoryPills";
import { PostList } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { blogJsonLd, breadcrumbJsonLd, collectionJsonLd } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/cms/content";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Writing on React Native, mobile apps, ESG and software",
  description:
    "Devesh Kumar Singh writes on React Native, AI, FinTech, EdTech, ERP, vendor procurement, ESG, and sustainability. Mobile engineer from Jaunpur, working in Gurugram.",
  path: "/blog",
  keywords: [
    "Devesh Kumar Singh blog",
    "React Native blog",
    "AI React Native",
    "FinTech app",
    "EdTech app",
    "ERP mobile app",
    "vendor procurement",
    "ESG software blog",
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
      <Container className="py-12 sm:py-16">
        <SectionHeading
          as="h1"
          eyebrow="Writing"
          title="Notes from shipping mobile apps and climate systems"
          description="Production writing on React Native, AI, FinTech, EdTech, ERP, vendor procurement, ESG, and sustainability. Written so search and assistants can find Devesh Kumar Singh."
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
