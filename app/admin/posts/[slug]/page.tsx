import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { PostEditor } from "@/components/admin/PostEditor";
import { asCmsPost, getAllPosts } from "@/lib/cms/content";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <Container className="py-16">
      <h1 className="mb-8 font-display text-4xl text-ink">Edit post</h1>
      <PostEditor mode="edit" initial={asCmsPost(post)} />
    </Container>
  );
}
