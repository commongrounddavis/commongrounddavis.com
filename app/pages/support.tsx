import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/support";
import {
  DISCORD_INVITE_URL,
  SITE_NAME,
  WEBSITE_MAINTAINER_NAME,
  WEBSITE_SUPPORT_DISCORD_HANDLE,
  WEBSITE_SUPPORT_LABEL,
  WEBSITE_SUPPORT_URL,
  pageMeta,
} from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Support",
    description:
      "Website and technical support for commongrounddavis.com — maintainers and how to get help.",
    path: "/support",
  });
}

type Step = "start" | "website" | "discord" | "external";

const DISCORD_LIVE = Boolean(DISCORD_INVITE_URL);

export default function Support(): React.ReactNode {
  const [step, setStep] = useState<Step>("start");

  // Discord not live → skip the "are you in the Discord?" question.
  const goWebsite = () => setStep(DISCORD_LIVE ? "website" : "external");
  const goBack = () =>
    setStep(step === "website" || !DISCORD_LIVE ? "start" : "website");

  return (
    <section className="home-section page-narrow support-page">
      <div className="support-router" aria-live="polite">
        {step === "start" ? (
          <>
            <h1 className="title-plain">What do you need?</h1>
            <div className="support-choices">
              <Link className="support-choice" to="/contact">
                <span>
                  <strong>Contact the club</strong>
                  <small>
                    Membership, meetings, events, or anything else about Common Ground Davis.
                  </small>
                </span>
                <span aria-hidden="true">→</span>
              </Link>

              <button
                type="button"
                className="support-choice"
                onClick={goWebsite}
              >
                <span>
                  <strong>Something wrong with the website?</strong>
                  <small>
                    Broken links, bugs, typos, security issues, or confusing UI.
                  </small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        ) : null}

        {step === "website" ? (
          <>
            <h1 className="title-plain">
              Something wrong with the website?
            </h1>
            <p>Are you currently in the Common Ground Davis Discord?</p>
            <div className="support-choices">
              <button
                type="button"
                className="support-choice"
                onClick={() => setStep("discord")}
              >
                <span>
                  <strong>Yes</strong>
                  <small>I’m in the Common Ground Davis Discord.</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                className="support-choice"
                onClick={() => setStep("external")}
              >
                <span>
                  <strong>No</strong>
                  <small>I need another way to report it.</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </>
        ) : null}

        {step === "discord" ? (
          <>
            <h1 className="title-plain">Website problem</h1>
            <p>
              Ping @{WEBSITE_SUPPORT_DISCORD_HANDLE} in the Discord with the
              issue. He is the current club website maintainer.
            </p>
            <Link className="support-action" to="/discord">
              Open Discord →
            </Link>
          </>
        ) : null}

        {step === "external" ? (
          <>
            <h1 className="title-plain">Website problem</h1>
            <p>
              Send your technical issue to {WEBSITE_MAINTAINER_NAME}, the
              current {SITE_NAME} website maintainer, through:
            </p>
            <a className="support-action" href={WEBSITE_SUPPORT_URL} target="_blank" rel="noopener">
              Visit {WEBSITE_SUPPORT_LABEL} →
            </a>
          </>
        ) : null}

        {step !== "start" ? (
          <button type="button" className="support-back" onClick={goBack}>
            ← Back
          </button>
        ) : null}
      </div>
    </section>
  );
}
