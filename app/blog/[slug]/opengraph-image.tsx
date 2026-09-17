import { ImageResponse } from "next/og";
import { getPost, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f6f3",
          color: "#1c1b19",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1a5f46",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 48 : 60,
            lineHeight: 1.1,
            fontWeight: 600,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>
    ),
    size,
  );
}
