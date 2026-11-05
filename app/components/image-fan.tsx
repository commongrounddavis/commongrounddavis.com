import { useState } from "react";
import { Lightbox, type LightboxImage } from "./lightbox";

export type FanImage = LightboxImage;

type FanStyle = React.CSSProperties & {
  "--fan-count": number;
  "--fan-i": number;
};

/**
 * Overlapping photo fan. Both images are readable at rest; hover fans them
 * farther apart; click opens a full-screen lightbox.
 *
 *   <ImageFan images={[{ src, width, height }]} />
 */
export function ImageFan({
  images,
  className,
}: {
  images: readonly FanImage[];
  className?: string;
}): React.ReactNode {
  const [active, setActive] = useState<FanImage | null>(null);
  if (images.length === 0) return null;

  const rootClass = ["image-fan", className].filter(Boolean).join(" ");

  return (
    <>
      <div
        className={rootClass}
        style={{ "--fan-count": images.length } as FanStyle}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="image-fan-card"
            style={{ "--fan-i": index } as FanStyle}
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
