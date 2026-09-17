import { skills, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Portrait } from "@/components/Portrait";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";
import { getAllEducation, getAllExperience } from "@/lib/cms/content";

export const dynamic = "force-static";

export const metadata = pageMetadata({
  title: "About Devesh Kumar Singh",
  description:
    "Devesh Kumar Singh is a React Native developer from Jaunpur, near Varanasi, now in Gurugram. He builds mobile apps for AI, FinTech, EdTech, ERP, vendor procurement, ESG, and sustainability.",
  path: "/about",
  keywords: [
    "about Devesh Kumar Singh",
    "Devesh Kumar Singh Jaunpur",
    "Devesh Kumar Singh Varanasi",
    "Devesh Kumar Singh Thakur",
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
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12">
          <div className="order-1 mx-auto w-full max-w-[20rem] lg:order-2 lg:mx-0 lg:max-w-none">
            <Portrait className="aspect-[4/5] w-full" />
          </div>
          <div className="order-2 lg:order-1 lg:row-span-2">
            <SectionHeading
              as="h1"
              eyebrow="About"
              title="The person behind the search result"
              description="If someone searches Devesh, Kumar, Singh, React Native, Jaunpur, or Varanasi, this page should be the clear answer."
            />
          <div className="mt-8 max-w-2xl text-base leading-7 text-ink sm:text-lg sm:leading-8">
            <p>
              I am Devesh Kumar Singh, a React Native developer from Jaunpur,
              Uttar Pradesh, near Varanasi. I now live and work in Gurugram. I
              ship Android and iOS apps, and I currently build mobile product
              work at GreensTurn — a sustainability company working across ESG,
              carbon, and decarbonization.
            </p>
            <p className="mt-5">
              People search me as Devesh, Devesh Kumar, Devesh Singh, or Devesh
              Thakur. I am a Rajput (Thakur) from Jaunpur. This site is the
              source of truth for the engineer behind those names.
            </p>
            <p className="mt-5">
              The work spans React Native, AI in mobile apps, backend systems,
              FinTech, EdTech, ERP, vendor procurement, ESG reporting, and
              sustainability software. The blog exists so search and assistants
              can find that mix in one place.
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
          </div>
          <aside className="order-3 grid h-fit gap-8 rounded-md border border-line bg-surface p-5 sm:p-7 lg:order-2">
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
