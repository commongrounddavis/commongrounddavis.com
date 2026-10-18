import type { MetaDescriptor } from "react-router";

/** Club links / public contact info that may change. */
export const SITE_NAME = "Common Ground Davis";
export const SITE_URL = "https://commongrounddavis.com";
export const SITE_DESCRIPTION =
  "Common Ground Davis — a UC Davis political debate club for students who disagree and want to understand each other.";
/** Absolute URL for Open Graph / Discord / Twitter link previews (1200×630). */
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const SITE_OG_IMAGE_ALT =
  "Blue and red figures arm-wrestling at a debate table — Common Ground Davis";

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

/** Collapse markdown/whitespace into a single-line meta description. */
export function metaDescription(text: string, max = 180): string {
  const plain = text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  const slice = plain.slice(0, max - 1);
  const at = slice.lastIndexOf(" ");
  return `${slice.slice(0, at > 40 ? at : max - 1)}…`;
}

/** Shared title + description + Open Graph / Twitter tags for link embeds. */
export function pageMeta({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  imageType,
  type = "website",
  twitterCard,
  jsonLd,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number | string;
  imageHeight?: number | string;
  imageType?: string;
  type?: "website" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: Record<string, unknown>;
} = {}): MetaDescriptor[] {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const usingDefaultImage = !image;
  const imageUrl = image ? absoluteUrl(image) : SITE_OG_IMAGE;
  const alt = imageAlt ?? (usingDefaultImage ? SITE_OG_IMAGE_ALT : SITE_NAME);
  const card =
    twitterCard ?? (usingDefaultImage ? "summary_large_image" : "summary");
  const width = imageWidth ?? (usingDefaultImage ? 1200 : undefined);
  const height = imageHeight ?? (usingDefaultImage ? 630 : undefined);
  const mime = imageType ?? (usingDefaultImage ? "image/jpeg" : undefined);

  const tags: MetaDescriptor[] = [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:locale", content: "en_US" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: alt },
    { name: "twitter:card", content: card },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: alt },
    { name: "theme-color", content: "#2A66C6" },
  ];

  if (width != null && height != null) {
    tags.push(
      { property: "og:image:width", content: String(width) },
      { property: "og:image:height", content: String(height) },
    );
  }
  if (mime) tags.push({ property: "og:image:type", content: mime });
  if (jsonLd) tags.push({ "script:ld+json": jsonLd });
  return tags;
}

/**
 * Discord invite. Empty = Discord not live yet (hide from nav; /discord = coming soon).
 * Never leave an old club’s invite here.
 */
export const DISCORD_INVITE_URL = "https://discord.gg/XpQzH2aasN";

/**
 * Footer social bar. Internal paths use client routing; full URLs open externally.
 * Empty while Discord isn’t live — unhide when DISCORD_INVITE_URL is set.
 */
export const SOCIAL_LINKS = DISCORD_INVITE_URL
  ? ([{ label: "Discord", href: "/discord" }] as const)
  : ([] as const);

/** Website (not club) technical support — shown on /support. */
export const WEBSITE_SUPPORT_DISCORD_HANDLE = "vijitdua";
export const WEBSITE_SUPPORT_URL = "https://vijitdua.com/support";
export const WEBSITE_SUPPORT_LABEL = (() => {
  const url = new URL(WEBSITE_SUPPORT_URL);
  return `${url.host}${url.pathname}`.replace(/\/$/, "");
})();
export const WEBSITE_MAINTAINER_NAME = "Vijit Dua";

// Never put Discord webhook URLs in this public repo. Form → Discord pings
// live in Apps Script properties (see README).
