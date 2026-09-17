import { skills } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Container, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getAllProjects } from "@/lib/cms/content";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Selected work by Devesh Kumar Singh: React Native apps, App Store releases, and sustainability product engineering at GreensTurn.",
  path: "/work",
  keywords: [
    "Devesh Kumar Singh projects",
    "Debt Relief India React Native",
    "GreensTurn mobile developer",
  ],
});

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <Container className="py-16">
        <SectionHeading
          as="h1"
          eyebrow="Work"
          title="Shipped products, not mockups"
          description="Case studies with the problem, the product, and what actually shipped. Banner, screens, and links live on each project."
        />
        <div className="mt-12 grid gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-12 rounded-md border border-line bg-surface p-7">
          <h2 className="font-display text-2xl text-ink">How I work</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink/80">
            TypeScript, React Native, careful API contracts, and a bias for
            shipping. I care about App Store review, auth, payments, and the
            last 10% that makes a mobile product feel finished.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-line bg-bg px-3 py-1 text-xs text-ink"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
