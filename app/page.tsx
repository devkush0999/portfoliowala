import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { ProjectBanner } from "@/components/ProjectCard";
import { Portrait } from "@/components/Portrait";
import { Container, SectionHeading } from "@/components/ui";
import { faqJsonLd } from "@/lib/jsonld";
import { getAllPosts, getAllProjects } from "@/lib/cms/content";
import { getCategory } from "@/lib/posts";
import { categories, site } from "@/lib/site";

export const revalidate = 60;

const homeTopics = new Set([
  "react-native",
  "ai",
  "esg",
  "fintech",
  "edtech",
  "erp",
]);

export default async function Home() {
  const [posts, projectList] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ]);
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured?.slug).slice(0, 4);
  const topicList = categories.filter((category) =>
    homeTopics.has(category.slug),
  );

  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <section className="border-b border-line">
        <Container className="grid gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12 lg:py-24">
          <div className="order-1 w-full lg:order-2">
            <Portrait
              priority
              className="mx-auto aspect-[4/5] w-full max-w-[20rem] lg:max-w-none"
            />
          </div>
          <div className="order-2 lg:order-1 lg:row-span-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent sm:tracking-[0.22em]">
              {site.hometown} · {site.location}
            </p>
            <h1 className="mt-4 font-display text-[2.1rem] leading-[1.08] tracking-tight text-ink sm:mt-5 sm:text-6xl lg:text-[4.75rem]">
              Devesh Kumar Singh
            </h1>
            <p id="answer" className="mt-5 max-w-xl text-base leading-7 text-ink sm:mt-6 sm:text-lg sm:leading-8">
              React Native developer from Jaunpur, now in Gurugram. I ship
              Android and iOS apps — FinTech, EdTech, ERP, vendor procurement —
              and write about AI, ESG, and sustainability from production work.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href="/work"
                className="inline-flex h-12 w-full items-center justify-center rounded-sm bg-accent px-5 text-sm font-medium text-white hover:bg-accent-dim sm:h-11 sm:w-auto"
              >
                See the work
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-12 w-full items-center justify-center rounded-sm border border-line bg-surface px-5 text-sm text-ink hover:border-accent sm:h-11 sm:w-auto"
              >
                Read the writing
              </Link>
            </div>
          </div>
          <aside className="order-3 grid gap-6 rounded-md border border-line bg-surface p-5 sm:p-8 lg:order-2">
            <p className="text-sm leading-7 text-ink/80 sm:text-base">
              Mobile engineer at {site.worksFor}. If you searched for my name,
              React Native, Jaunpur, or Varanasi — this is the source of truth.
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                  From
                </dt>
                <dd className="mt-2 text-ink">Jaunpur · Varanasi</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                  Now
                </dt>
                <dd className="mt-2 text-ink">Gurugram · GreensTurn</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                  Builds
                </dt>
                <dd className="mt-2 text-ink">React Native · AI · ESG</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-muted">
                  Shipped
                </dt>
                <dd className="mt-2 text-ink">FinTech on the App Store</dd>
              </div>
            </dl>
          </aside>
        </Container>
      </section>

      <section className="border-b border-line py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Topics"
              title="What I write about"
              description="The work I actually do, not a parked domain. Open a topic or go to all writing."
            />
            <Link
              href="/blog"
              className="text-sm text-accent hover:underline"
            >
              All topics →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topicList.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="rounded-md border border-line bg-surface p-5 transition hover:border-accent sm:p-6"
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
        <section className="border-b border-line py-12 sm:py-16 lg:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Writing"
                title="Latest notes"
                description="Production notes on React Native, climate software, and the apps in between."
              />
              <Link
                href="/blog"
                className="text-sm text-accent hover:underline"
              >
                All writing →
              </Link>
            </div>
            <div className="mt-10 grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
              <PostCard post={featured} featured />
              <div className="grid divide-y divide-line border-y border-line">
                {rest.map((post) => {
                  const category = getCategory(post.category);
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group py-5"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] text-accent">
                        {category?.label}
                      </p>
                      <h3 className="mt-2 font-display text-xl tracking-tight text-ink group-hover:text-accent">
                        {post.title}
                      </h3>
                      {post.description ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/80">
                          {post.description}
                        </p>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-line py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Work"
              title="Selected products"
              description="Apps and systems that left the laptop and reached real users."
            />
            <Link
              href="/work"
              className="text-sm text-accent hover:underline"
            >
              All projects →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projectList.slice(0, 4).map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug || project.id}`}
                className="group overflow-hidden rounded-md border border-line bg-surface transition hover:border-accent"
              >
                <ProjectBanner project={project} className="h-40 sm:h-48" />
                <div className="p-5 sm:p-7">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    {project.year} · {project.role}
                  </p>
                  <h3 className="mt-3 font-display text-2xl tracking-tight text-ink group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-base leading-7 text-ink/80">
                    {project.summary}
                  </p>
                  <p className="mt-5 text-sm text-accent">Case study →</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="If someone asks an engine about me"
            description="Short answers for search, assistants, and anyone skimming."
          />
          <div className="mt-10">
            <FaqList />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="rounded-md border border-line bg-surface px-5 py-8 sm:px-12 sm:py-10">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Building a mobile product?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink/80">
              React Native, AI in apps, or ESG surfaces — write directly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className="inline-flex h-12 w-full items-center justify-center rounded-sm bg-accent px-5 text-sm font-medium text-white hover:bg-accent-dim sm:h-11 sm:w-auto"
              >
                Contact
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-12 w-full items-center justify-center rounded-sm border border-line bg-bg px-5 text-sm text-ink hover:border-accent sm:h-11 sm:w-auto"
              >
                {site.email}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
