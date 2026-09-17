import Image from "next/image";
import { getPortraitSrc } from "@/lib/portrait";
import { site } from "@/lib/site";

export function Portrait({
  priority = false,
  className = "",
}: {
  priority?: boolean;
  className?: string;
}) {
  const src = getPortraitSrc();

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-line bg-surface-2 ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={site.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 380px"
          className="object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-end bg-gradient-to-br from-surface-2 to-line">
          <div className="w-full bg-gradient-to-t from-ink/75 to-transparent p-5">
            <p className="font-display text-4xl tracking-tight text-white">
              DS
            </p>
            <p className="mt-1 text-sm text-white/80">{site.shortName}</p>
          </div>
        </div>
      )}
    </div>
  );
}
