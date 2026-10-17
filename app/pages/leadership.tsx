import type { Route } from "./+types/leadership";
import { LEADERSHIP_LAST_UPDATED } from "../config/leadership";
import { LeadershipTimeline } from "../components/leadership-timeline";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Team",
    description: "The people running Common Ground Davis.",
    path: "/leadership",
  });
}

export default function Leadership(): React.ReactNode {
  return (
    <section className="home-section team-page">
      <h1>The Common Ground Davis Team</h1>
      <LeadershipTimeline />
      <p className="home-meetings-note" style={{ marginTop: "2rem" }}>
        Last updated {LEADERSHIP_LAST_UPDATED}.
      </p>
    </section>
  );
}
