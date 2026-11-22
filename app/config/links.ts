/**
 * External links — the ONE place club URLs live.
 *
 * The footer, header, /links, /contact, /aggie-life, /discord and /support all
 * read from here. Turning something on = fill in its value below. Anything left
 * "" is hidden everywhere: no icon, no card, no dead link.
 *
 * Only paste public URLs here. Never secrets (webhooks, API keys) — this repo is public.
 */

import { hasConstitution } from "./constitution";

export const LINKS = {
  /**
   * Real Discord invite. The site always links to /discord, which redirects here,
   * so swapping invites never breaks old links. Never leave an old club's invite here.
   */
  discordInvite: "https://discord.gg/XpQzH2aasN",

  join: "/join",

  /** Shared, receive-only inbox. Forwards to every current officer (confirmed working Nov 2026). */
  officersEmail: "officers@commongrounddavis.com",

  // TODO: fill in the AggieLife club page URL once CSI approves us (e.g. "https://aggielife.ucdavis.edu/organization/...").
  // Setting it turns on /aggie-life (redirect), the /links card and the header menu item.
  aggieLife: "",

  // Club social accounts. TODO: fill in each one when the account exists. Full URL, e.g. "https://www.instagram.com/<handle>/".
  instagram: "", // TODO: fill in when the club Instagram exists
  x: "", // TODO: fill in when the club X account exists
  facebook: "", // TODO: fill in when the club Facebook page exists
  tiktok: "", // TODO: fill in when the club TikTok exists
  youtube: "", // TODO: fill in when the club YouTube channel exists
  linkedin: "", // TODO: fill in when the club LinkedIn page exists

  /** Public repo for this site. */
  sourceCode: "https://github.com/commongrounddavis/commongrounddavis.com",
} satisfies Record<string, string>;

/* ----------------------------------------------------------------------- */
/* Derived — don't edit below for content changes.                          */
/* ----------------------------------------------------------------------- */

/** Kept for existing imports. Empty = Discord not live (hidden; /discord says "coming soon"). */
export const DISCORD_INVITE_URL: string = LINKS.discordInvite;
export const AGGIELIFE_URL: string = LINKS.aggieLife;
export const OFFICERS_EMAIL: string = LINKS.officersEmail;
export const GITHUB_REPO_URL: string = LINKS.sourceCode;

/** Icon names map to SVGs in app/components/icons.tsx. */
export type LinkIconName =
  | "discord"
  | "instagram"
  | "x"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "join"
  | "aggielife"
  | "constitution"
  | "mail"
  | "info"
  | "link";

export type ClubLink = {
  label: string;
  href: string;
  icon: LinkIconName;
  /** Optional second line on /links cards. */
  subtitle?: string;
};

function present(link: ClubLink): boolean {
  return link.href !== "";
}

/** Social accounts, in display order. Only the ones with a URL. */
export const SOCIALS: ClubLink[] = [
  { label: "Discord", href: DISCORD_INVITE_URL ? "/discord" : "", icon: "discord" as const },
  { label: "Instagram", href: LINKS.instagram, icon: "instagram" as const },
  { label: "X", href: LINKS.x, icon: "x" as const },
  { label: "Facebook", href: LINKS.facebook, icon: "facebook" as const },
  { label: "TikTok", href: LINKS.tiktok, icon: "tiktok" as const },
  { label: "YouTube", href: LINKS.youtube, icon: "youtube" as const },
  { label: "LinkedIn", href: LINKS.linkedin, icon: "linkedin" as const },
].filter(present);

/**
 * Footer icon row: a short, fixed set. Everything else lives on /links
 * (the footer always ends with an icon to /links). Hidden while empty.
 */
export const FOOTER_ICONS: ClubLink[] = [
  { label: "Discord", href: DISCORD_INVITE_URL ? "/discord" : "", icon: "discord" as const },
  { label: "X", href: LINKS.x, icon: "x" as const },
  { label: "LinkedIn", href: LINKS.linkedin, icon: "linkedin" as const },
  { label: "Instagram", href: LINKS.instagram, icon: "instagram" as const },
  { label: "AggieLife", href: AGGIELIFE_URL ? "/aggie-life" : "", icon: "aggielife" as const },
].filter(present);

/** Cards on /links, top to bottom. Hidden when href is empty. */
export const LINK_PAGE_ITEMS: ClubLink[] = [
  {
    label: "Join our Discord",
    subtitle: "Discord server · Free to join",
    href: DISCORD_INVITE_URL ? "/discord" : "",
    icon: "discord" as const,
  },
  {
    label: "Become a Member",
    subtitle: "Interest form · UC Davis students",
    href: LINKS.join,
    icon: "join" as const,
  },
  {
    label: "AggieLife",
    subtitle: "Official club page",
    href: AGGIELIFE_URL ? "/aggie-life" : "",
    icon: "aggielife" as const,
  },
  ...SOCIALS.filter((s) => s.icon !== "discord"),
  {
    label: "Constitution",
    subtitle: "Every version, public",
    href: hasConstitution() ? "/constitution" : "",
    icon: "constitution" as const,
  },
].filter(present);

/** True for same-site paths (client routing); false for full URLs (new tab). */
export function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}
