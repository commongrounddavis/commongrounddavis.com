import type { Route } from "./+types/join";
import { Faq } from "../components/faq";
import { JOIN_FAQ } from "../config/faq";
import { INTEREST_FORM_EMBED_URL, INTEREST_FORM_URL } from "../config/forms";
import { CLUB_STATUS } from "../config/meetings";
import { currentOfficers } from "../config/leadership";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Join",
    description:
      "Join Common Ground Davis, a UC Davis political debate club for students who disagree. Interest form for the founding cohort.",
    path: "/join",
  });
}

export default function Join(): React.ReactNode {
  const coLeads = currentOfficers().filter(
    (o) => o.role === "Co-Lead / President" && o.person.email,
  );

  return (
    <section className="home-section join-page">
      <h1>Join</h1>

      {INTEREST_FORM_URL ? (
        <>
          <p className="join-lead">
            We will be an official registered student organization by Winter
            Quarter 2027.
            <br />
            We plan to open up our Discord server &amp; start accepting
            applications to join by mid-December.
          </p>

          <div className="join-cta">
            <a
              href={INTEREST_FORM_URL}
              target="_blank"
              rel="noopener"
              className="button-brand"
            >
              Open in a new tab
            </a>
            <p className="join-embed-note">Form not loading? Use the button.</p>
          </div>

          <iframe
            src={INTEREST_FORM_EMBED_URL}
            title="Common Ground Davis interest form"
            className="join-embed"
            loading="lazy"
          >
            Loading…
          </iframe>
        </>
      ) : (
        <div className="prose-stack" style={{ marginTop: "1.5rem" }}>
          <p>Interest form coming soon. Meanwhile, email a co-lead:</p>
          <div className="contact-row">
            {coLeads.map(({ person }) => (
              <a key={person.slug} href={`mailto:${person.email}`} target="_blank" rel="noopener">
                {person.name} ({person.email})
              </a>
            ))}
          </div>
        </div>
      )}

      <Faq items={JOIN_FAQ} title="Questions" />
    </section>
  );
}
