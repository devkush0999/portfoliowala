import { getAllPosts } from "@/lib/cms/content";
import { site } from "@/lib/site";

export const revalidate = 60;

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      return `<item>
  <title><![CDATA[${post.title}]]></title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(`${post.date}T00:00:00`).toUTCString()}</pubDate>
  <description><![CDATA[${post.description}]]></description>
  <category>${post.category}</category>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${site.name}</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
    <language>en-in</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
