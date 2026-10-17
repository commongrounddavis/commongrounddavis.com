import { Link } from "react-router";
import type { Route } from "./+types/about";
import {
  ABOUT_CONDENSED,
  ABOUT_FOUNDING,
  ABOUT_FULL,
  FOUNDING_ESSAY_URL,
} from "../config/about";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "About",
    description:
      "Who Common Ground Davis is, what we believe, and how the club started.",
    path: "/about",
  });
}

const SECTIONS = [
  { title: "The Problem", body: ABOUT_FULL[1] },
  { title: "What we believe", body: ABOUT_FULL[2] },
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
  const essayLabel = "an essay on political polarization at UC Davis";
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
        rel="noopener noreferrer"
      >
        {essayLabel}
      </a>
      {withNameLinks(italicSplit[0] ?? "")}
      <em>is</em>
      {withNameLinks(italicSplit[1] ?? "")}
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
            <p>{ABOUT_CONDENSED}</p>
            <p>{ABOUT_FULL[0]}</p>
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
