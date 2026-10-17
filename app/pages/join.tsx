import type { Route } from "./+types/join";
import { Faq } from "../components/faq";
import { JOIN_FAQ } from "../config/faq";
import { INTEREST_FORM_URL } from "../config/forms";
import { CLUB_STATUS } from "../config/meetings";
import { currentOfficers } from "../config/leadership";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Join",
    description:
      "Join Common Ground Davis — UC Davis interest form for the founding cohort.",
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
          <p className="home-lead" style={{ marginTop: "1rem" }}>
            {CLUB_STATUS} Fill out the interest form and you’ll be first to hear
            when meetings start.
          </p>

          <div className="join-cta">
            <a
              href={INTEREST_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-brand"
            >
              Click to join
            </a>
          </div>
        </>
      ) : (
        <div className="prose-stack" style={{ marginTop: "1.5rem" }}>
          <p>Interest form coming soon. Meanwhile, email a co-lead:</p>
          <div className="contact-row">
            {coLeads.map(({ person }) => (
              <a key={person.slug} href={`mailto:${person.email}`} target="_blank" rel="noopener noreferrer">
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
