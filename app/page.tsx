import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { Container, SectionHeading } from "@/components/ui";
import { faqJsonLd } from "@/lib/jsonld";
import { getAllPosts, getAllProjects } from "@/lib/cms/content";
import { categories, site } from "@/lib/site";

export const revalidate = 60;

export default async function Home() {
  const [posts, projectList] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ]);
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured?.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {site.hometown} · {site.location} · {site.worksFor}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Devesh Kumar Singh
            </h1>
            <p id="answer" className="mt-6 max-w-xl text-lg leading-8 text-ink">
              React Native developer from Jaunpur, working in Gurugram. I ship
              mobile apps and write so that searches for Devesh Kumar Singh,
              React Native, AI, ESG, FinTech, EdTech, ERP, and vendor
              procurement land here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex h-11 items-center rounded-sm bg-accent px-5 text-sm font-medium text-white"
              >
                Read the writing
              </Link>
              <Link
                href="/work"
                className="inline-flex h-11 items-center rounded-sm border border-line bg-surface px-5 text-sm text-ink hover:border-accent"
              >
                See the work
              </Link>
            </div>
          </div>
          <div className="grid content-end gap-6 border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-base leading-7 text-ink/80">
              Search for <strong className="text-ink">Devesh Kumar Singh</strong>,
              React Native, Jaunpur, Varanasi, or a mobile app in FinTech,
              EdTech, or ERP. This is the source of truth.
            </p>
            <dl className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="text-muted">From</dt>
                <dd className="mt-1 text-ink">Jaunpur · Varanasi</dd>
              </div>
              <div>
                <dt className="text-muted">Now</dt>
                <dd className="mt-1 text-ink">Gurugram · GreensTurn</dd>
              </div>
              <div>
                <dt className="text-muted">Builds</dt>
                <dd className="mt-1 text-ink">RN · AI · ESG</dd>
              </div>
              <div>
                <dt className="text-muted">Shipped</dt>
                <dd className="mt-1 text-ink">FinTech on iOS</dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16">
        <Container>
          <SectionHeading
            eyebrow="Topics"
            title="What this site is for"
            description="A home for long-form writing across the work I actually do, so people searching my name find the engineer, not a parked domain."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="rounded-md border border-line bg-surface p-6 transition hover:border-accent"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  {category.label}
                </p>
                <p className="mt-3 text-base leading-7 text-ink/80">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {featured ? (
        <section className="border-b border-line py-16">
          <Container>
            <SectionHeading eyebrow="Writing" title="Latest notes" />
            <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
              <PostCard post={featured} featured />
              <div className="grid gap-8">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
                <Link href="/blog" className="text-sm text-accent hover:underline">
                  All writing →
                </Link>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-line py-16">
        <Container>
          <SectionHeading
            eyebrow="Work"
            title="Selected products"
            description="Apps and systems that left the laptop and reached real users."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {projectList.slice(0, 4).map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-md border border-line bg-surface"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    className="h-44 w-full object-cover"
                  />
                ) : null}
                <div className="p-7">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    {project.year} · {project.role}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-ink/80">
                    {project.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="/work"
            className="mt-8 inline-block text-sm text-accent hover:underline"
          >
            All projects →
          </Link>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="If someone asks an engine about me"
          />
          <div className="mt-10">
            <FaqList />
          </div>
        </Container>
      </section>
    </>
  );
}
