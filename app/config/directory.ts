/**
 * Site directory (/directory) — every public page, vijitdua.com/directory style.
 *
 * Each entry: a name, every path that reaches it (first one is the main link),
 * and optional sub-pages (shown with a "+" toggle).
 * Adding a page? Add one entry. An entry with no paths is hidden, so AggieLife
 * and Constitution appear on their own once they're turned on.
 */

import { CONSTITUTION_VERSIONS } from "./constitution";
import { PEOPLE } from "./leadership";
import { AGGIELIFE_URL, DISCORD_INVITE_URL, LINKS } from "./links";

export type DirectoryChild = { name: string; path: string };

export type DirectoryEntry = {
  name: string;
  paths: string[];
  children?: DirectoryChild[];
};

const ENTRIES: DirectoryEntry[] = [
  { name: "Home", paths: ["/"] },
  { name: "About", paths: ["/about"] },
  { name: "Debate format", paths: ["/debate-format"] },
  {
    name: "Team",
    paths: ["/leadership", "/team"],
    children: PEOPLE.map((p) => ({ name: p.name, path: `/leadership/${p.slug}` })),
  },
  { name: "Join", paths: [LINKS.join] },
  { name: "Contact", paths: ["/contact"] },
  { name: "Support", paths: ["/support"] },
  { name: "Links", paths: ["/links"] },
  { name: "Site directory", paths: ["/directory"] },
  { name: "Discord invite", paths: DISCORD_INVITE_URL ? ["/discord", DISCORD_INVITE_URL] : [] },
  { name: "AggieLife", paths: AGGIELIFE_URL ? ["/aggie-life", AGGIELIFE_URL] : [] },
  {
    name: "Constitution",
    paths: CONSTITUTION_VERSIONS.length ? ["/constitution"] : [],
    children: CONSTITUTION_VERSIONS.map((v) => ({ name: `Version ${v.version} (PDF)`, path: v.pdf })),
  },
  { name: "Sitemap", paths: ["/sitemap.xml"] },
  { name: "Source code", paths: [LINKS.sourceCode] },
];

export function directoryEntries(): DirectoryEntry[] {
  return ENTRIES.filter((e) => e.paths.length > 0 && e.paths[0] !== "");
}
