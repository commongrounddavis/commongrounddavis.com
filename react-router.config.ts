import type { Config } from "@react-router/dev/config";
import { allPersonSlugs } from "./app/config/leadership";
import { AGGIELIFE_URL } from "./app/config/links";

export default {
  // GitHub Pages is static files only.
  ssr: false,
  prerender: [
    "/",
    "/about",
    "/debate-format",
    "/leadership",
    "/team",
    ...allPersonSlugs().map((slug) => `/leadership/${slug}`),
    "/join",
    "/contact",
    "/support",
    "/discord",
    "/links",
    "/directory",
    "/constitution",
    // Redirect page only exists once LINKS.aggieLife is set (see app/routes.ts).
    ...(AGGIELIFE_URL ? ["/aggie-life"] : []),
  ],
} satisfies Config;
