import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-base leading-7 text-ink/80">
        That URL does not exist. The writing lives under /blog.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-sm bg-accent px-5 text-sm font-medium text-white"
      >
        Back home
      </Link>
    </Container>
  );
}
