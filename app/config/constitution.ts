/**
 * Club constitution — every version, past and current. Public forever.
 *
 * ADDING A NEW VERSION (after it's final in Google Docs; post within 7 days):
 *   1. Export the PDF and drop it in public/constitution/, named
 *      common-ground-davis-constitution-v<N>.pdf
 *   2. Add one entry to the TOP of CONSTITUTION_VERSIONS below with
 *      status: "current" and ended: null.
 *   3. On the entry that was current, set `ended` to the new version's
 *      effective date and `status` to "replaced" (or "reversed" if this
 *      change undoes it).
 *
 * Never delete an entry or a PDF. Old versions stay public.
 *
 * While this array is empty, /constitution says "being finalized" and nothing
 * on the site links to it. The first entry turns on the footer, header and
 * /links links automatically.
 *
 * Dates are ISO (YYYY-MM-DD).
 */

export type ConstitutionStatus = "current" | "replaced" | "reversed";

export type ConstitutionVersion = {
  /** "1", "2", "2.1" … shown as "Version 1". */
  version: string;
  /** Date this version took effect. */
  effective: string;
  /** Date it stopped being in effect. null for the current version. */
  ended: string | null;
  status: ConstitutionStatus;
  /** One line: what changed in this version. */
  summary: string;
  /** Path under public/, e.g. "/constitution/common-ground-davis-constitution-v1.pdf". */
  pdf: string;
};

export const CONSTITUTION_VERSIONS: ConstitutionVersion[] = [
  // TODO: fill in when the first constitution is adopted. Example entry (every field):
  // {
  //   version: "1",
  //   effective: "2027-01-15",
  //   ended: null,
  //   status: "current",
  //   summary: "First constitution, adopted by the founding officers.",
  //   pdf: "/constitution/common-ground-davis-constitution-v1.pdf",
  // },
];

/* ----------------------------------------------------------------------- */
/* Derived — don't edit below for content changes.                          */
/* ----------------------------------------------------------------------- */

export function hasConstitution(): boolean {
  return CONSTITUTION_VERSIONS.length > 0;
}

function newestFirst(a: ConstitutionVersion, b: ConstitutionVersion): number {
  return b.effective.localeCompare(a.effective);
}

/** The version marked current; falls back to the newest one if none is marked. */
export function currentConstitution(): ConstitutionVersion | undefined {
  const sorted = [...CONSTITUTION_VERSIONS].sort(newestFirst);
  return sorted.find((v) => v.status === "current") ?? sorted[0];
}

/** Everything except the current version, newest first. */
export function pastConstitutions(): ConstitutionVersion[] {
  const current = currentConstitution();
  return [...CONSTITUTION_VERSIONS].filter((v) => v !== current).sort(newestFirst);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2027-01-15" → "Jan 15, 2027". */
export function fmtShortDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1].slice(0, 3)} ${d}, ${y}`;
}

/** "2027-01-15" → "January 15, 2027" (no timezone shifts). */
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${d}, ${y}`;
}
