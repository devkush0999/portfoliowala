import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-14 scroll-mt-28 font-display text-2xl tracking-tight text-ink sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 scroll-mt-28 font-display text-xl tracking-tight text-ink sm:text-2xl"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <img className="mt-6 w-full rounded-md border border-line" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-6 text-lg leading-[1.8] text-ink" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-[1.8] text-ink" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-[1.8] text-ink" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-[1.8]" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-8 border-l-2 border-accent pl-5 text-lg leading-[1.8] text-ink/80 italic"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-sm bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-clay"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-md border border-line bg-surface-2 p-4 font-mono text-sm leading-7 text-ink"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-base" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-line px-3 py-2 text-left font-medium text-ink"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-line/70 px-3 py-2 text-ink/80" {...props} />
  ),
};
