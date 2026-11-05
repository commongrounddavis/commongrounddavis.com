import { useRef, useState } from "react";
import {
  MISINFORMATION_ILLUSTRATIONS,
  type MisinformationIllustration,
} from "../config/about";

function IllustrationTile({
  item,
  onOpen,
}: {
  item: MisinformationIllustration;
  onOpen: () => void;
}): React.ReactNode {
  return (
    <div className="perspective-tile">
      <button
        type="button"
        className="perspective-tile-button"
        onClick={onOpen}
        aria-label="View larger"
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
    </div>
  );
}

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

  const rootClass = ["perspective-pair", className].filter(Boolean).join(" ");

  return (
    <>
      <div className={rootClass}>
        <div className="perspective-pair-grid">
          {MISINFORMATION_ILLUSTRATIONS.map((item) => (
            <IllustrationTile key={item.src} item={item} onOpen={() => open(item)} />
          ))}
        </div>
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
