import { ImageSet } from "./image-set";
import { MISINFORMATION_ILLUSTRATIONS } from "../config/about";

/** About / home problem illustrations: six-or-nine and media framing. */
export function PerspectiveIllustrations({
  className,
}: {
  className?: string;
}): React.ReactNode {
  return <ImageSet images={MISINFORMATION_ILLUSTRATIONS} className={className} />;
}
