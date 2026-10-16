import { Link } from "react-router";
import type { Route } from "./+types/contact";
import { WebhookForm } from "../components/webhook-form";
import {
  CLUB_EMAIL,
  DISCORD_CONTACT_WEBHOOK_URL,
  pageMeta,
} from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Contact",
    description:
      "Contact Common Ground Davis — Discord, membership, and website questions.",
    path: "/contact",
  });
}

export default function Contact(): React.ReactNode {
  return (
    <section className="home-section page-narrow">
      <h1>Contact</h1>
      <p className="home-lead">
        Questions about the club? Discord is the fastest way to reach us.
      </p>

      <dl className="link-list">
        <div>
          <dt>Membership</dt>
          <dd>
            <Link className="brand-link" to="/join">
              Join the club
            </Link>
          </dd>
        </div>
        <div>
          <dt>Discord</dt>
          <dd>
            <Link className="brand-link" to="/discord">
              Join our Discord
            </Link>
          </dd>
        </div>
        {CLUB_EMAIL ? (
          <div>
            <dt>Email</dt>
            <dd>
              <a className="brand-link" href={`mailto:${CLUB_EMAIL}`}>
                {CLUB_EMAIL}
              </a>
            </dd>
          </div>
        ) : null}
        <div>
          <dt>Website issues</dt>
          <dd>
            <Link className="brand-link" to="/support">
              Webpage support
            </Link>
          </dd>
        </div>
      </dl>

      {DISCORD_CONTACT_WEBHOOK_URL ? (
        <div className="contact-form">
          <WebhookForm
            webhookUrl={DISCORD_CONTACT_WEBHOOK_URL}
            title="Send a message"
            blurb="We’ll get it on the club Discord."
            embedTitle="New contact message"
            submitLabel="Send message"
            fields={[
              { name: "name", label: "Name", placeholder: "Your name" },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "you@example.com",
              },
              {
                name: "message",
                label: "Message",
                type: "textarea",
                required: true,
                placeholder: "How can we help?",
              },
            ]}
          />
        </div>
      ) : null}
    </section>
  );
}
