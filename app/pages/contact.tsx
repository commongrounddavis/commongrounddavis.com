import { Link } from "react-router";
import type { Route } from "./+types/contact";
import { currentOfficers } from "../config/leadership";
import { Avatar, PersonLinks } from "../components/team-member";
import { DISCORD_INVITE_URL, OFFICERS_EMAIL } from "../config/links";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  const leads = currentOfficers()
    .filter((o) => o.role === "Co-Lead / President")
    .map((o) => o.person.name);
  const who = leads.length ? leads.join(" or ") : "a co-lead";
  return pageMeta({
    title: "Contact",
    description: OFFICERS_EMAIL
      ? `Email ${OFFICERS_EMAIL} to reach every Common Ground Davis officer, or email ${who} directly.`
      : `Email ${who} — Common Ground Davis co-leads — about membership, meetings, and general questions.`,
    path: "/contact",
  });
}

/**
 * Shared inbox + a quick "is this reply really from us?" check.
 * Real senders = current officers' own emails, read from app/config/leadership.ts.
 */
function OfficersInbox({ email }: { email: string }): React.ReactNode {
  const realSenders = currentOfficers()
    .map((o) => o.person.email)
    .filter((e): e is string => Boolean(e));

  return (
    <>
      <p className="home-lead" style={{ marginTop: "1rem" }}>
        Reach out to us by email:{" "}
        <a className="brand-link contact-inbox" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
      <p className="contact-reach">Reaches every current officer.</p>

      <section className="reply-check" aria-labelledby="reply-check-title">
        <h2 id="reply-check-title" className="reply-check-title title-plain">
          Is a reply really from us?
        </h2>

        <div className="reply-check-row is-real">
          <span className="reply-check-label">
            <span className="reply-check-mark" aria-hidden="true">✓</span>
            Real
          </span>
          <ul className="reply-check-chips" aria-label="Officer emails that can reply">
            {realSenders.map((addr) => (
              <li key={addr}>{addr}</li>
            ))}
          </ul>
        </div>

        <div className="reply-check-row is-fake">
          <span className="reply-check-label">
            <span className="reply-check-mark" aria-hidden="true">✕</span>
            Not us
          </span>
          <ul className="reply-check-chips" aria-label="Addresses that are not us">
            <li>
              <span className="reply-check-addr">{email}</span>
              <span className="reply-check-why"> can’t send</span>
            </li>
            <li>any other address</li>
          </ul>
        </div>

        <p className="reply-check-foot">
          Current officers are always on our <Link to="/leadership">Team page</Link> →
        </p>
      </section>
    </>
  );
}

export default function Contact(): React.ReactNode {
  const leads = currentOfficers().filter((o) => o.role === "Co-Lead / President");

  return (
    <section className="home-section page-narrow">
      <h1>Contact</h1>

      {OFFICERS_EMAIL ? (
        <OfficersInbox email={OFFICERS_EMAIL} />
      ) : (
        <>
          {/* Fallback while officersEmail is "" — the original co-lead directory. */}
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
        </>
      )}

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
