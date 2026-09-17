import { projects, skills } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Container, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

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

export default function WorkPage() {
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
          eyebrow="Work"
          title="Shipped products, not mockups"
          description="A short record of apps and systems that made it to users. I will keep adding case studies as I publish deeper write-ups."
        />
        <div className="mt-12 grid gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="grid gap-6 rounded-md border border-line bg-surface p-7 md:grid-cols-[200px_1fr] md:p-8"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  {project.year}
                </p>
                <p className="mt-3 text-sm text-muted">{project.role}</p>
              </div>
              <div>
                <h2 className="font-display text-3xl text-ink">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-ink/80">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-bg px-3 py-1 text-xs text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
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
