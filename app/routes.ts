import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { AGGIELIFE_URL } from "./config/links";

export default flatRoutes({
  rootDirectory: "pages",
  // /aggie-life only exists once LINKS.aggieLife is set in app/config/links.ts.
  // Until then the file is skipped and the URL is a normal 404.
  ignoredRouteFiles: AGGIELIFE_URL ? [] : ["**/aggie-life.tsx"],
}) satisfies RouteConfig;
