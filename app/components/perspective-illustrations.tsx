import { ImageSet } from "./image-set";
import {
  ABOUT_ILLUSTRATIONS,
  type MisinformationIllustration,
} from "../config/about";

/** Tappable illustration tile(s). Home passes both; about sections pass one. */
export function PerspectiveIllustrations({
  images = ABOUT_ILLUSTRATIONS,
  className,
}: {
  images?: readonly MisinformationIllustration[];
  className?: string;
}): React.ReactNode {
  return <ImageSet images={images} className={className} />;
}
