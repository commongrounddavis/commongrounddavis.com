import { Link } from "react-router";
import type { Route } from "./+types/join";
import { WebhookForm } from "../components/webhook-form";
import {
  DISCORD_JOIN_WEBHOOK_URL,
  MEETINGS_SUMMARY,
  pageMeta,
} from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Join",
    description:
      "Join Common Ground Davis at UC Davis — Discord, weekly meetings, and how to get involved.",
    path: "/join",
  });
}

export default function Join(): React.ReactNode {
  if (!DISCORD_JOIN_WEBHOOK_URL) {
    return (
      <section className="home-section">
        <h1>Join</h1>
        <p className="home-lead">
          The easiest way to get involved is to join our{" "}
          <Link className="brand-link" to="/discord">
            Discord
          </Link>{" "}
          and come to a meeting.
        </p>
        <p className="home-meetings-when">{MEETINGS_SUMMARY}</p>
      </section>
    );
  }

  return (
    <section className="home-section page-narrow">
      <WebhookForm
        webhookUrl={DISCORD_JOIN_WEBHOOK_URL}
        title="Join"
        blurb="Tell us a bit about yourself. Your answers are forwarded straight to the club officers inboxes on Discord."
        embedTitle="New join interest"
        submitLabel="Submit interest"
        fields={[
          {
            name: "name",
            label: "Name",
            required: true,
            placeholder: "Your name",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            placeholder: "you@ucdavis.edu",
          },
          {
            name: "year",
            label: "Year / major",
            required: true,
            placeholder: "e.g. 2nd year, Political Science",
          },
          {
            name: "why",
            label: "Why do you want to join?",
            type: "textarea",
            required: true,
            placeholder: "A sentence or two is plenty.",
          },
          {
            name: "extra",
            label: "Anything else we should know?",
            type: "textarea",
            placeholder: "Optional",
          },
        ]}
      />
    </section>
  );
}
