import { cmsSrc, isCloudinaryUrl } from "@/lib/cms/image";

export function ResponsiveImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px",
  priority = false,
  fill = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  const cloudinary = isCloudinaryUrl(src);
  const imageClass = fill
    ? `absolute inset-0 h-full w-full ${className}`
    : className;
  const url = cloudinary ? cmsSrc(src, 960) : src;
  const srcSet = cloudinary
    ? [480, 768, 1024, 1280, 1600]
        .map((width) => `${cmsSrc(src, width)} ${width}w`)
        .join(", ")
    : undefined;

  return (
    <img
      src={url}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={imageClass}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
