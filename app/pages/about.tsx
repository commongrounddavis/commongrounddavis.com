import { Link } from "react-router";
import type { Route } from "./+types/about";
import { PerspectiveIllustrations } from "../components/perspective-illustrations";
import {
  ABOUT_CONDENSED,
  ABOUT_FOUNDING,
  ABOUT_FULL,
  ABOUT_PROBLEM,
  FOUNDING_ESSAY_URL,
  ILLUSTRATION_MEDIA,
  ILLUSTRATION_SIX_NINE,
  PROBLEM_EXAMPLES,
} from "../config/about";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "About",
    description: `${ABOUT_FULL[0]} Founded and co-led by two students who disagree politically.`,
    path: "/about",
  });
}

const SECTIONS = [
  { title: "The Steelman argument", body: ABOUT_FULL[3] },
  { title: "Our goal", body: ABOUT_FULL[4] },
] as const;

const NAME_LINKS = [
  ["Vijit Dua", "vijit-dua"],
  ["Joshua Harris", "joshua-harris"],
] as const;

/** Underline founder names and send them to /leadership/:slug. */
function withNameLinks(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let key = 0;
  while (rest.length > 0) {
    let hit: { name: string; slug: string; index: number } | null = null;
    for (const [name, slug] of NAME_LINKS) {
      const index = rest.indexOf(name);
      if (index !== -1 && (hit === null || index < hit.index)) {
        hit = { name, slug, index };
      }
    }
    if (!hit) {
      nodes.push(rest);
      break;
    }
    if (hit.index > 0) nodes.push(rest.slice(0, hit.index));
    nodes.push(
      <Link key={key} className="brand-link" to={`/leadership/${hit.slug}`}>
        {hit.name}
      </Link>,
    );
    key += 1;
    rest = rest.slice(hit.index + hit.name.length);
  }
  return nodes;
}

/** Render README founding string with markdown-ish link + italics. */
function FoundingParagraph(): React.ReactNode {
  const essayLabel = "an independent journal piece";
  const parts = ABOUT_FOUNDING.split(
    `[${essayLabel}](${FOUNDING_ESSAY_URL})`,
  );
  const after = parts[1] ?? "";
  const italicSplit = after.split("*is*");

  return (
    <p>
      {withNameLinks(parts[0] ?? "")}
      <a
        className="brand-link"
        href={FOUNDING_ESSAY_URL}
        target="_blank"
        rel="noopener"
      >
        {essayLabel}
      </a>
      {withNameLinks(italicSplit[0] ?? "")}
      <em>is</em>
      {withNameLinks(italicSplit[1] ?? "")}
    </p>
  );
}

/** Underline "directly" and italicize "think" in the misinformation paragraph. */
function ProblemParagraph({ text }: { text: string }): React.ReactNode {
  const mark = "hear them directly from the other side, or are they what you think ";
  const at = text.indexOf(mark);
  if (at === -1) return <p>{text}</p>;
  const before = text.slice(0, at);
  const after = text.slice(at + mark.length);
  return (
    <p>
      {before}
      hear them <u>directly</u> from the other side, or are they what you <i>think</i>{" "}
      {after}
    </p>
  );
}

export default function About(): React.ReactNode {
  return (
    <>
      <section className="home-section">
        <h1>Mission statement</h1>
        <div className="home-about-row" style={{ marginTop: "1.5rem" }}>
          <div className="prose-stack" style={{ flex: 1, marginTop: 0 }}>
            {ABOUT_CONDENSED.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="home-about-marks">
            <span className="home-about-mark home-about-mark-cgd">
              <img src="/logo-on-white.svg" alt="" width={176} height={176} />
            </span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h1>How it started</h1>
        <div className="prose-stack">
          <FoundingParagraph />
        </div>
      </section>

      <section className="home-section">
        <h1>The Problem</h1>
        <div className="home-about-row home-about-row-align-start">
          <div className="prose-stack" style={{ marginTop: 0 }}>
            <p>{ABOUT_PROBLEM[0]}</p>
            {ABOUT_PROBLEM.slice(1).map((paragraph) => (
              <ProblemParagraph key={paragraph.slice(0, 24)} text={paragraph} />
            ))}
            <div className="problem-examples">
              <div className="problem-examples-label">Examples</div>
              {PROBLEM_EXAMPLES.map((example) => (
                <details key={example.topic} className="problem-example">
                  <summary>
                    <span>{example.topic}</span>
                    <span className="problem-chevron" aria-hidden="true" />
                  </summary>
                  <p>{example.body}</p>
                </details>
              ))}
            </div>
          </div>
          <aside className="home-about-aside home-about-aside-illustrations">
            <PerspectiveIllustrations images={[ILLUSTRATION_MEDIA]} />
          </aside>
        </div>
      </section>

      <section className="home-section">
        <h1>What we believe</h1>
        <div className="home-about-row home-about-row-align-start">
          <div className="prose-stack" style={{ marginTop: 0 }}>
            <p>{ABOUT_FULL[2]}</p>
          </div>
          <aside className="home-about-aside home-about-aside-illustrations">
            <PerspectiveIllustrations images={[ILLUSTRATION_SIX_NINE]} />
          </aside>
        </div>
      </section>

      {SECTIONS.map(({ title, body }) => (
        <section key={title} className="home-section">
          <h1>{title}</h1>
          <div className="prose-stack">
            <p>{body}</p>
          </div>
        </section>
      ))}
    </>
  );
}
