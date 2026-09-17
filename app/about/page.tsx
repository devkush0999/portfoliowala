import { skills, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";
import { getAllEducation, getAllExperience } from "@/lib/cms/content";

export const dynamic = "force-static";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Devesh Kumar Singh, React Native developer at GreensTurn in Gurugram. Background across mobile apps, ESG, sustainability systems, AI, and backend work.",
  path: "/about",
  keywords: [
    "about Devesh Kumar Singh",
    "Devesh Kumar Singh GreensTurn",
    "React Native developer Gurugram",
  ],
});

export default async function AboutPage() {
  const [experience, education] = await Promise.all([
    getAllExperience(),
    getAllEducation(),
  ]);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Container className="py-16">
        <SectionHeading
          eyebrow="About"
          title="The person behind the search result"
          description="If someone types Devesh Kumar Singh React Native into Google, this page should be the unambiguous answer."
        />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl text-lg leading-8 text-ink">
            <p>
              I am Devesh Kumar Singh, a React Native developer based in
              Gurugram. I ship Android and iOS apps, and I currently build
              mobile product work at GreensTurn — a sustainability company
              working across ESG, carbon, and decarbonization.
            </p>
            <p className="mt-5">
              That mix is the point of this site. I want a place where I can
              write seriously about React Native and also about ESG reporting
              software, contextual intelligence engines, sustainability data,
              AI in products, and the backends that keep mobile apps alive.
            </p>
            <p className="mt-5">
              Before GreensTurn I built apps at QURILO TECHNOLOGIES LLC, ZOZUK,
              and Doneship. The through-line is the same: production mobile
              software, TypeScript, APIs, and getting the thing onto a real
              device in a real store.
            </p>
            <p className="mt-5">
              I have shipped a live FinTech iOS app, Debt Relief India, built
              with React Native. I have also worked on products like Pluse and
              Amrutam Forum. App Store review, privacy, payments, and messy
              APIs are part of the job, not extras.
            </p>
            <p className="mt-5">
              Find me on{" "}
              <TextLink href={site.linkedin}>LinkedIn</TextLink> or write to{" "}
              <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>.
            </p>
          </div>
          <aside className="grid h-fit gap-8 rounded-md border border-line bg-surface p-7">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Experience
              </p>
              <ul className="mt-4 grid gap-4">
                {experience.map((item) => (
                  <li key={item.id}>
                    <p className="text-ink">{item.role}</p>
                    <p className="text-sm text-muted">
                      {item.company} · {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Education
              </p>
              <ul className="mt-4 grid gap-4">
                {education.map((item) => (
                  <li key={item.id}>
                    <p className="text-ink">{item.degree}</p>
                    <p className="text-sm text-muted">
                      {item.school} · {item.period}
                      {item.grade ? ` · ${item.grade}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Stack
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
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
          </aside>
        </div>
      </Container>
    </>
  );
}
