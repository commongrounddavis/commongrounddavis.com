/** Club links / public contact info that may change. */
export const SITE_NAME = "Common Ground Davis";
export const SITE_URL = "https://commongrounddavis.com";
export const SITE_DESCRIPTION =
  "Common Ground Davis — a UC Davis political debate club for students who disagree and want to understand each other.";
/** Absolute URL for Open Graph / Discord / Twitter link previews. */
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Shared title + description + Open Graph / Twitter tags for link embeds. */
export function pageMeta({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: SITE_OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SITE_OG_IMAGE },
    { name: "theme-color", content: "#2A66C6" },
  ];
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
