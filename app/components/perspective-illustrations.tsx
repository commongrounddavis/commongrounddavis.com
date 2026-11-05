import { useRef, useState } from "react";
import {
  MISINFORMATION_ILLUSTRATIONS,
  type MisinformationIllustration,
} from "../config/about";

export function PerspectiveIllustrations({
  className,
}: {
  className?: string;
}): React.ReactNode {
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  const rootClass = ["perspective-stack", className].filter(Boolean).join(" ");

  return (
    <>
      <div className={rootClass}>
        {MISINFORMATION_ILLUSTRATIONS.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className={`perspective-card perspective-card-${index}`}
            onClick={() => open(item)}
            aria-label="View larger"
          >
            <img
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="perspective-lightbox"
        aria-label="Enlarged illustration"
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
          </div>
        ) : null}
      </dialog>
    </>
  );
}
