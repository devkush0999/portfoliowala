"use client";

import { Container } from "@/components/ui";
import { PostEditor } from "@/components/admin/PostEditor";

export default function NewPostPage() {
  return (
    <Container className="py-16">
      <h1 className="mb-8 font-display text-4xl text-ink">New post</h1>
      <PostEditor mode="create" />
    </Container>
  );
}
