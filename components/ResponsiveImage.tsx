import Image from "next/image";
import { cloudinaryLoader, isCloudinaryUrl } from "@/lib/cms/image";

export function ResponsiveImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px",
  priority = false,
  fill = false,
  width = 1600,
  height = 900,
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
  const remote = src.startsWith("http://") || src.startsWith("https://");

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      loader={cloudinary ? cloudinaryLoader : undefined}
      unoptimized={remote && !cloudinary}
    />
  );
}
