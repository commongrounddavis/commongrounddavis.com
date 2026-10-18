import type { Route } from "./+types/debate-format";
import { Faq } from "../components/faq";
import { FORMAT_FAQ } from "../config/faq";
import {
  AUDIENCE,
  AUDIENCE_QUESTIONS,
  BEFORE_DEBATE,
  CLOSINGS,
  EXCHANGE,
  FORMAT_GLANCE,
  FORMAT_INTRO,
  FORMAT_NOTE,
  MODERATOR,
  MOTION,
  OPENING,
  ROUND_SWAP,
  ROUND_TITLE,
} from "../config/format";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Debate format",
    description:
      "How a Common Ground Davis debate runs: steelman the other side before you disagree. No winner, 1–2 hours.",
    path: "/debate-format",
  });
}

export default function DebateFormat(): React.ReactNode {
  return (
    <section className="home-section format-page">
      <h1>Debate format</h1>
      <p className="format-intro">{FORMAT_INTRO}</p>
      <ul className="format-glance">
        {FORMAT_GLANCE.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Before the debate</h2>
      <ol className="format-steps">
        {BEFORE_DEBATE.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2>The debate</h2>
      <ol className="format-timeline">
        <li>
          <p className="format-phase">Motion</p>
          <p>{MOTION}</p>
        </li>
        <li>
          <p className="format-phase">Openings</p>
          <p>{OPENING}</p>
        </li>
        <li className="format-step-rounds">
          <div className="format-rounds">
            <p className="format-rounds-title">{ROUND_TITLE}</p>
            <ol>
              {EXCHANGE.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="format-rounds-note">{ROUND_SWAP}</p>
          </div>
        </li>
        <li>
          <p className="format-phase">Audience questions</p>
          <p>{AUDIENCE_QUESTIONS}</p>
        </li>
        <li>
          <p className="format-phase">Closings</p>
          <p>{CLOSINGS}</p>
        </li>
      </ol>

      <h2>The moderator</h2>
      <p className="format-body">{MODERATOR}</p>

      <h2>After each debate</h2>
      <ol className="format-steps">
        {AUDIENCE.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <Faq items={FORMAT_FAQ} title="FAQ" />
      <p className="format-note">{FORMAT_NOTE}</p>
    </section>
  );
}
