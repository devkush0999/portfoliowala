import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/cms/content";
import { categories, site, topicClusters } from "@/lib/site";

export const revalidate = 60;

const climate = new Set(topicClusters.climate);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projects = (await getAllProjects()).map((project) => ({
    url: `${site.url}/work/${project.slug || project.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    images: project.image ? [project.image] : undefined,
  }));
  const posts = (await getAllPosts()).map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "weekly" as const,
    priority: climate.has(post.category) ? 0.9 : 0.8,
    images: post.cover ? [post.cover] : undefined,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${site.url}/blog/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: climate.has(category.slug) ? 0.85 : 0.7,
  }));

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${site.url}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...categoryPages,
    ...projects,
    ...posts,
  ];
}
