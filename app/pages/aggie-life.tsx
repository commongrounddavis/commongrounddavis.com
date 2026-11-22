import { useEffect } from "react";
import { AGGIELIFE_URL } from "../config/links";
import { pageMeta } from "../config/site";

/**
 * /aggie-life → our AggieLife club page. Same pattern as /discord.
 *
 * This route only exists while LINKS.aggieLife (app/config/links.ts) is set —
 * app/routes.ts skips this file otherwise, so /aggie-life is a normal 404.
 */
export const handle = { bare: true };

// No `./+types/aggie-life` import: typegen skips this file while the route is off.
export function meta() {
  return [
    ...pageMeta({
      title: "AggieLife",
      description: "Common Ground Davis on AggieLife, the UC Davis student organization directory.",
      path: "/aggie-life",
    }),
    // GitHub Pages has no custom HTTP 3xx; browser refresh + JS replace below.
    { "http-equiv": "refresh", content: `0;url=${AGGIELIFE_URL}` },
  ];
}

export default function AggieLifePage(): React.ReactNode {
  useEffect(() => {
    // Guard: never replace() with "" (that reloads this page forever).
    if (AGGIELIFE_URL) window.location.replace(AGGIELIFE_URL);
  }, []);

  return (
    <main className="error-page">
      <img className="logo-bounce" src="/logo.svg" alt="" width={80} height={80} />
      <p>Redirecting to AggieLife…</p>
      <a href={AGGIELIFE_URL} className="brand-link" target="_blank" rel="noopener">
        Continue to AggieLife
      </a>
    </main>
  );
}
