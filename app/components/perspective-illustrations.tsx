import { ImageFan } from "./image-fan";
import { ABOUT_ILLUSTRATIONS } from "../config/about";

/** About / home problem illustrations: six-or-nine and media framing. */
export function PerspectiveIllustrations({
  className,
}: {
  className?: string;
}): React.ReactNode {
  return <ImageFan images={ABOUT_ILLUSTRATIONS} className={className} />;
}
