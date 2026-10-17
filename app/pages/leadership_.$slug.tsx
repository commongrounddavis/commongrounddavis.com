import { Link, data } from "react-router";
import type { Route } from "./+types/leadership_.$slug";
import {
  fmtRange,
  getPerson,
  isCurrent,
  tenuresFor,
} from "../config/leadership";
import { TeamMember } from "../components/team-member";
import { pageMeta } from "../config/site";

export function meta({ params }: Route.MetaArgs) {
  const person = getPerson(params.slug ?? "");
  const name = person?.name ?? "Team";
  return pageMeta({
    title: name,
    description: `${name} — Common Ground Davis.`,
    path: person ? `/leadership/${person.slug}` : "/leadership",
  });
}

export default function LeadershipPerson({
  params,
}: Route.ComponentProps): React.ReactNode {
  const person = getPerson(params.slug ?? "");
  if (!person) {
    throw data("Not Found", { status: 404 });
  }

  const history = tenuresFor(person.slug);
  const now = history.find((h) => h.tenure.end === null);
  const latest = now ?? history[0];
  const current = isCurrent(person.slug);

  const earlier = latest ? history.filter((h) => h !== latest) : history;

  return (
    <section className="home-section">
      <p className="home-meetings-note">
        <Link className="brand-link" to="/leadership">
          ← Team
        </Link>
      </p>

      <ul className="team-list" style={{ marginTop: "1rem" }}>
        <TeamMember
          person={person}
          role={
            latest
              ? current
                ? latest.role
                : `Former ${latest.role}`
              : "Member"
          }
          csiTitle={latest?.csiTitle}
          range={
            latest ? fmtRange(latest.tenure.start, latest.tenure.end) : undefined
          }
          linkName={false}
          heading="h1"
        />
      </ul>

      {earlier.length > 0 ? (
        <ul className="role-history">
          {earlier.map(({ role, tenure }) => (
            <li key={`${tenure.start}-${role}`}>
              {role}
              {" · "}
              {fmtRange(tenure.start, tenure.end)}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
