/**
 * Leadership config — PEOPLE (bios) + TENURES (who held which role, when).
 *
 * You never write "terms" by hand. Each tenure is one person in one role for
 * one date range. The site computes the timeline: every date where someone
 * starts or stops becomes a boundary, and each stretch between boundaries is
 * shown with whoever was in office then. Overlaps, mid‑year swaps, and people
 * holding several roles over the years all fall out of that.
 *
 * Someone leaves / joins mid‑year:
 *   1. Set `end` on the outgoing tenure.
 *   2. Push a new tenure with `end: null` for the incoming person.
 *   3. Bump LEADERSHIP_LAST_UPDATED.
 *
 * Someone changes role: end the old tenure, add a new one.
 * Bio typo: edit PEOPLE. Don't touch TENURES.
 * Dates are ISO (YYYY-MM-DD). `end: null` = still serving.
 */

export type Person = {
  slug: string;
  name: string;
  bio: string;
  /** Shown as a "Founder" tag everywhere. */
  founder?: boolean;
  email?: string;
  discordHandle?: string;
  discordUserId?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  url?: string;
  photoSrc?: string;
};

export type Tenure = {
  personSlug: string;
  role: string;
  /** CSI / AggieLife title on paper (Primary / Secondary / Treasurer). */
  csiTitle?: string;
  start: string;
  end: string | null;
  /** Optional one‑liners shown in the timeline next to the join / leave event. */
  startNote?: string;
  endNote?: string;
};

export const PEOPLE: Person[] = [
  {
    slug: "vijit-dua",
    name: "Vijit Dua",
    founder: true,
    email: "vijdua@ucdavis.edu",
    discordHandle: "vijitdua",
    discordUserId: "933604018951974924",
    instagram: "https://www.instagram.com/vijitdua/",
    linkedin: "https://www.linkedin.com/in/vijitdua",
    twitter: "https://x.com/vijitdua",
    url: "https://vijitdua.com/links",
    photoSrc: "https://vijitdua.com/assets/pfp-40.webp",
    bio: `
    Vijit Dua is a Comp. Sci. student at UC Davis, an entrepreneurial engineer, a music producer, and co-founder of Common Ground Davis.
    He's outspoken about the lack of tolerance for opposing ideas and free speech at UC Davis, and about American Political polarization. 
    He wants people to find common ground so they can understand each other better.

    During the ASUCD election season, he published an [independent journal piece](https://vijitdua.com/blog/WBTZE6mR) on The California Aggie's reporting bias. 
    The controversy it sparked eventually led to this club's founding.
    `.trim(),
  },
  {
    slug: "joshua-harris",
    name: "Joshua Harris",
    founder: true,
    email: "jtdharris@ucdavis.edu",
    discordHandle: "thepainin",
    discordUserId: "1458353516409126935",
    photoSrc: "/team/joshua-harris.webp",
    instagram: "https://instagram.com/jtdharris/",
    linkedin: "https://linkedin.com/in/joshua-harris-748788425",
    bio: `
    Joshua is a pre-law student at UC Davis, a businessman, and co-founder of Common Ground Davis. A debater at heart, he’s spent years learning
    how to change minds, and he’s never been afraid to argue the unpopular side.

    A former valedictorian, class speaker, and class president, 
    he’s drawn to political and social discussion, and he believes real debate only happens when both sides are willing to listen.
    He’d rather beat an argument than ban it.
    `.trim(),
  },
  {
    slug: "joey-lee",
    name: "Joey Lee",
    email: "plslee@ucdavis.edu",
    photoSrc: "/team/joey-lee.webp",
    discordHandle: "sakurazaka_senya",
    discordUserId: "374054097793449987",
    bio: `
    Joey Lee is a Computer Science and Engineering student at UC Davis. 
    He doesn’t largely get involved in politics due to his personal philosophy of “Live and let live”. 
    He is interested in trying to resolve disagreements and minimize antagonization and radicalization in US politics, as well as improving political understanding overall.
    `.trim(),
  },
];

export const TENURES: Tenure[] = [
  { personSlug: "vijit-dua", role: "Co-Lead / President", csiTitle: "Primary Leader", start: "2026-09-23", end: null },
  { personSlug: "joshua-harris", role: "Co-Lead / President", csiTitle: "Secondary Leader", start: "2026-09-23", end: null },
  { personSlug: "joey-lee", role: "Financial Officer", csiTitle: "Treasurer/Financial Officer", start: "2026-09-23", end: null },
];

export const LEADERSHIP_LAST_UPDATED = "October 17, 2026";

/* ----------------------------------------------------------------------- */
/* Derived — don't edit below for content changes.                          */
/* ----------------------------------------------------------------------- */

const ROLE_ORDER = ["Co-Lead / President", "Treasurer"];

export function getPerson(slug: string): Person | undefined {
  return PEOPLE.find((p) => p.slug === slug);
}

export function allPersonSlugs(): string[] {
  return PEOPLE.map((p) => p.slug);
}

export function discordProfileUrl(person: Person): string | undefined {
  if (!person.discordUserId) return undefined;
  return `https://discord.com/users/${person.discordUserId}`;
}

export type Officer = {
  person: Person;
  role: string;
  csiTitle?: string;
  tenure: Tenure;
};

function toOfficer(t: Tenure): Officer | null {
  const person = getPerson(t.personSlug);
  if (!person) return null;
  return { person, role: t.role, csiTitle: t.csiTitle, tenure: t };
}

function byRole(a: Officer, b: Officer) {
  const ra = ROLE_ORDER.indexOf(a.role);
  const rb = ROLE_ORDER.indexOf(b.role);
  if (ra !== rb) return (ra === -1 ? 99 : ra) - (rb === -1 ? 99 : rb);
  return a.tenure.start.localeCompare(b.tenure.start);
}

/** Active on a given ISO date (default: today). */
export function officersOn(date = todayIso()): Officer[] {
  return TENURES.filter((t) => t.start <= date && (t.end === null || t.end > date))
    .map(toOfficer)
    .filter((o): o is Officer => o !== null)
    .sort(byRole);
}

/** Everyone with `end: null`. */
export function currentOfficers(): Officer[] {
  return TENURES.filter((t) => t.end === null)
    .map(toOfficer)
    .filter((o): o is Officer => o !== null)
    .sort(byRole);
}

/** Every tenure a person has had, newest first. */
export function tenuresFor(slug: string): Officer[] {
  return TENURES.filter((t) => t.personSlug === slug)
    .map(toOfficer)
    .filter((o): o is Officer => o !== null)
    .sort((a, b) => b.tenure.start.localeCompare(a.tenure.start));
}

export function isCurrent(slug: string): boolean {
  return TENURES.some((t) => t.personSlug === slug && t.end === null);
}

/** Set of slugs that have ever held a role. */
export function alumniSlugs(): string[] {
  return [...new Set(TENURES.map((t) => t.personSlug))].filter((s) => !isCurrent(s));
}

export type TimelineSegment = {
  start: string;
  /** null = ongoing */
  end: string | null;
  officers: Officer[];
  isFounding: boolean;
};

/**
 * Split history at every start/end date. Newest segment first.
 * Each segment lists who was in office during it and what changed at its start.
 */
export function timeline(): TimelineSegment[] {
  const bounds = new Set<string>();
  for (const t of TENURES) {
    bounds.add(t.start);
    if (t.end) bounds.add(t.end);
  }
  const dates = [...bounds].sort();
  if (dates.length === 0) return [];

  const segs: TimelineSegment[] = [];
  for (let i = 0; i < dates.length; i++) {
    const start = dates[i];
    const end = dates[i + 1] ?? null;
    const officers = TENURES.filter(
      (t) => t.start <= start && (t.end === null || t.end > start),
    )
      .map(toOfficer)
      .filter((o): o is Officer => o !== null)
      .sort(byRole);
    if (officers.length === 0) continue; // gap with nobody in office
    segs.push({ start, end, officers, isFounding: i === 0 });
  }
  // Drop zero-length segments (two boundaries on the same day can't happen
  // since bounds is a Set, but an `end` equal to the last `start` yields one).
  return segs.filter((s) => s.end === null || s.end > s.start).reverse();
}

/* Dates ---------------------------------------------------------------- */

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function fmtMonth(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${y}`;
}

export function fmtRange(start: string, end: string | null): string {
  return end ? `${fmtMonth(start)} – ${fmtMonth(end)}` : `${fmtMonth(start)} – Current`;
}
