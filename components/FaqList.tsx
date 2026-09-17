import { faqs } from "@/lib/site";

export function FaqList({
  items = faqs,
}: {
  items?: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="cursor-pointer list-none font-display text-xl text-ink">
            <span className="flex items-start justify-between gap-6">
              {item.question}
              <span className="text-accent transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-base leading-8 text-ink/80">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
