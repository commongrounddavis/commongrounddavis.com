import { useId, useRef, useState } from "react";
import {
  MISINFORMATION_ILLUSTRATIONS,
  type MisinformationIllustration,
} from "../config/about";

type Variant = "compact" | "full";

function IllustrationTile({
  item,
  variant,
  onOpen,
}: {
  item: MisinformationIllustration;
  variant: Variant;
  onOpen: () => void;
}): React.ReactNode {
  return (
    <figure className="perspective-tile">
      <button
        type="button"
        className="perspective-tile-button"
        onClick={onOpen}
        aria-label={`View larger: ${item.title}. ${item.summary}`}
      >
        <img
          className="perspective-tile-img"
          src={item.src}
          alt=""
          width={item.width}
          height={item.height}
          loading="lazy"
          decoding="async"
        />
      </button>
      <figcaption className="perspective-tile-caption">
        <span className="perspective-tile-title">{item.title}</span>
        {variant === "full" ? (
          <span className="perspective-tile-summary">{item.summary}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function PerspectiveIllustrations({
  variant = "full",
  className,
}: {
  variant?: Variant;
  className?: string;
}): React.ReactNode {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [active, setActive] = useState<MisinformationIllustration | null>(
    null,
  );

  function open(item: MisinformationIllustration): void {
    setActive(item);
    dialogRef.current?.showModal();
  }

  function close(): void {
    dialogRef.current?.close();
    setActive(null);
  }

  const rootClass = [
    "perspective-pair",
    variant === "compact" ? "perspective-pair-compact" : "perspective-pair-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={rootClass} aria-label="Examples of perspective and framing">
        <p className="perspective-pair-lead">
          {variant === "compact"
            ? "Two familiar examples — tap to enlarge."
            : "Two familiar examples of talking past each other online:"}
        </p>
        <div className="perspective-pair-grid">
          {MISINFORMATION_ILLUSTRATIONS.map((item) => (
            <IllustrationTile
              key={item.src}
              item={item}
              variant={variant}
              onOpen={() => open(item)}
            />
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="perspective-lightbox"
        aria-labelledby={titleId}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {active ? (
          <div className="perspective-lightbox-inner">
            <button
              type="button"
              className="perspective-lightbox-close"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={active.src}
              alt=""
              width={active.width}
              height={active.height}
            />
            <p id={titleId} className="perspective-lightbox-caption">
              <strong>{active.title}</strong> — {active.summary}
            </p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
