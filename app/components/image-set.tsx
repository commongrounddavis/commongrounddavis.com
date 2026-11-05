import { useState } from "react";
import { Lightbox, type LightboxImage } from "./lightbox";

export type SetImage = LightboxImage;

/**
 * Equal tiles of tappable images. Desktop stacks them; mobile sits two-up.
 * Click opens a full-screen lightbox.
 *
 *   <ImageSet images={[{ src, width, height }]} />
 */
export function ImageSet({
  images,
  className,
}: {
  images: readonly SetImage[];
  className?: string;
}): React.ReactNode {
  const [active, setActive] = useState<SetImage | null>(null);
  if (images.length === 0) return null;

  const rootClass = ["image-set", className].filter(Boolean).join(" ");

  return (
    <>
      <div className={rootClass}>
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            className="image-set-card"
            onClick={() => setActive(image)}
            aria-label={image.alt ?? "View full screen"}
          >
            <img
              src={image.src}
              alt={image.alt ?? ""}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
      <Lightbox image={active} onClose={() => setActive(null)} />
    </>
  );
}
