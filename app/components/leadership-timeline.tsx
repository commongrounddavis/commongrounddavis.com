import { fmtRange, timeline } from "../config/leadership";
import { TeamMember } from "./team-member";

/** Newest roster first. Heading is the date range. */
export function LeadershipTimeline(): React.ReactNode {
  const segments = timeline();
  if (segments.length === 0) return null;

  return (
    <div className="leadership-history">
      {segments.map((segment) => (
        <section key={segment.start} className="history-term">
          <h2 className="history-range title-plain">
            {fmtRange(segment.start, segment.end)}
          </h2>
          <ul className="team-list history-team-list">
            {segment.officers.map(({ person, role, csiTitle, tenure }) => (
              <TeamMember
                key={`${person.slug}-${tenure.start}`}
                person={person}
                role={role}
                csiTitle={csiTitle}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
