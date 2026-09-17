import { pageMetadata } from "@/lib/seo";
import { Container, SectionHeading } from "@/components/ui";
import { CategoryPills } from "@/components/CategoryPills";
import { PostList } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getPosts } from "@/lib/posts";

export const metadata = pageMetadata({
  title: "Writing",
  description:
    "Essays and production notes by Devesh Kumar Singh on React Native, AI, backend systems, ESG, sustainability, and contextual intelligence.",
  path: "/blog",
  keywords: ["Devesh Kumar Singh blog", "React Native blog"],
});

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
        ])}
      />
      <Container className="py-16">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from shipping"
          description="Long-form writing on React Native, AI, backend, ESG, sustainability, and contextual intelligence. Written to rank, to be cited, and to be useful."
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
