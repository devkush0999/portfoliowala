import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Container, SectionHeading, TextLink } from "@/components/ui";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Devesh Kumar Singh for React Native, mobile apps, ESG product work, or writing collaborations.",
  path: "/contact",
  keywords: ["contact Devesh Kumar Singh", "hire React Native developer"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Write to me"
            description="Apps, writing, React Native help, or sustainability product work. I read everything that is specific."
          />
          <div className="mt-8 grid gap-3 text-base leading-7 text-ink/80">
            <p>
              Email:{" "}
              <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
            </p>
            <p>
              LinkedIn:{" "}
              <TextLink href={site.linkedin}>
                Devesh Kumar Singh
              </TextLink>
            </p>
            <p>Based in {site.location}</p>
          </div>
        </div>
        <div className="rounded-md border border-line bg-surface p-7">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
