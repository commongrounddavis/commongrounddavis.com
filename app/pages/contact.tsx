import { Link } from "react-router";
import type { Route } from "./+types/contact";
import { currentOfficers } from "../config/leadership";
import { Avatar, PersonLinks } from "../components/team-member";
import { DISCORD_INVITE_URL, pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  const leads = currentOfficers()
    .filter((o) => o.role === "Co-Lead / President")
    .map((o) => o.person.name);
  const who = leads.length ? leads.join(" or ") : "a co-lead";
  return pageMeta({
    title: "Contact",
    description: `Email ${who} — Common Ground Davis co-leads — about membership, meetings, and general questions.`,
    path: "/contact",
  });
}

export default function Contact(): React.ReactNode {
  const leads = currentOfficers().filter((o) => o.role === "Co-Lead / President");

  return (
    <section className="home-section page-narrow">
      <h1>Contact</h1>
      <p className="home-lead" style={{ marginTop: "1rem" }}>
        Questions? Email a co-lead.
      </p>

      <ul className="contact-leads">
        {leads.map(({ person, role }) => (
          <li key={person.slug} className="contact-lead">
            <Avatar person={person} size="sm" />
            <div>
              <Link className="contact-lead-name" to={`/leadership/${person.slug}`}>
                {person.name}
              </Link>
              <p className="team-role">{role}</p>
              <PersonLinks person={person} emailOnly />
            </div>
          </li>
        ))}
      </ul>

      <ul className="contact-else">
        {DISCORD_INVITE_URL ? (
          <li>
            Or, ask us in the club{" "}
            <Link className="brand-link" to="/discord">
              Discord
            </Link>
            .
          </li>
        ) : null}
        <li>
          Something wrong with the website?{" "}
          <Link className="brand-link" to="/support">
            Website support
          </Link>
        </li>
      </ul>
    </section>
  );
}
