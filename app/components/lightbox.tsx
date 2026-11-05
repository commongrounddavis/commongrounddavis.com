import { useEffect, useRef } from "react";

export type LightboxImage = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

/** Full-viewport image viewer. Pass `image` to open, `null` to close. */
export function Lightbox({
  image,
  onClose,
}: {
  image: LightboxImage | null;
  onClose: () => void;
}): React.ReactNode {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Full screen image"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {image ? (
        <>
          <button
            type="button"
            className="lightbox-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={image.src}
            alt={image.alt ?? ""}
            width={image.width}
            height={image.height}
          />
        </>
      ) : null}
    </dialog>
  );
}
