import type { Route } from "./+types/leadership";
import {
  LEADERSHIP_LAST_UPDATED,
  currentOfficers,
} from "../config/leadership";
import { LeadershipTimeline } from "../components/leadership-timeline";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  const roster = currentOfficers()
    .map((o) => `${o.person.name}, ${o.role}`)
    .join("; ");
  return pageMeta({
    title: "Team",
    description: roster
      ? `The people running Common Ground Davis: ${roster}.`
      : "The people running Common Ground Davis.",
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
