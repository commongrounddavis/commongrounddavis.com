/** Club links / public contact info that may change. */
export const SITE_NAME = "Common Ground Davis";
export const SITE_URL = "https://commongrounddavis.com";
export const SITE_DESCRIPTION =
  "Common Ground Davis — a UC Davis political debate club for students who disagree and want to understand each other.";
/** Absolute URL for Open Graph / Discord / Twitter link previews. */
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

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
    { name: "theme-color", content: "#c41230" },
  ];
}

export const DISCORD_INVITE_URL = "https://discord.gg/7npZ52GmUQ";

/** Statewide affiliation — linked from About. */
export const CCR_NAME = "California College Republicans";
export const CCR_URL = "https://cacollegegop.org/";

/** Public inbox. Leave empty to hide email on /contact. */
export const CLUB_EMAIL = "";

/** Footer social bar. Internal paths use client routing; full URLs open externally. */
export const SOCIAL_LINKS = [{ label: "Discord", href: "/discord" }] as const;

/** Website (not club) technical support — shown on /support. */
export const WEBSITE_SUPPORT_DISCORD_HANDLE = "vijitdua";
export const WEBSITE_SUPPORT_URL = "https://vijitdua.com/support";
export const WEBSITE_SUPPORT_LABEL = (() => {
  const url = new URL(WEBSITE_SUPPORT_URL);
  return `${url.host}${url.pathname}`.replace(/\/$/, "");
})();

/**
 * Technical Maintainers block on /support (webpage, domain, source).
 * AGENT NOTE / HUMAN NOTE: bump TECHNICAL_OWNERS_LAST_UPDATED when any field below changes.
 */
export const WEBSITE_MAINTAINER_NAME = "Vijit Dua";
export const WEBSITE_MAINTAINER_URL = "https://vijitdua.com";
export const DOMAIN_OWNER_NAME = "Vijit Dua";
export const DOMAIN_OWNER_DISCORD_HANDLE = "vijitdua";
export const GITHUB_REPO_URL =
  "https://github.com/commongrounddavis/commongrounddavis.com";
export const GITHUB_REPO_LABEL = (() => {
  const url = new URL(GITHUB_REPO_URL);
  return `${url.host}${url.pathname}`.replace(/\/$/, "");
})();
export const TECHNICAL_OWNERS_LAST_UPDATED = "Oct 15, 2026";

/**
 * Discord webhooks for /contact and /join.
 * These ship in the client bundle on a static/SSG host — use dedicated
 * webhooks you can rotate. Leave empty to hide the form.
 */
export const DISCORD_CONTACT_WEBHOOK_URL = "";
export const DISCORD_JOIN_WEBHOOK_URL = "";

/** Shown on the Meetings section — bump when the schedule changes. */
export const MEETINGS_LAST_UPDATED = "October 6, 2026";

export const MEETINGS_SUMMARY = "Wednesdays · Wellman 226 · 7:00 PM";
