import { Link } from "react-router";
import type { Route } from "./+types/_index";
import { HOME_ABOUT_TEASE } from "../config/about";
import { WHAT_WE_DO } from "../config/format";
import {
  MEETINGS_LAST_UPDATED,
  ONE_OFF_MEETINGS,
  REGISTERING,
  REGULAR_MEETING,
} from "../config/meetings";
import {
  DISCORD_INVITE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  pageMeta,
} from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/logo.png"),
      description: SITE_DESCRIPTION,
      ...(DISCORD_INVITE_URL ? { sameAs: [DISCORD_INVITE_URL] } : {}),
    },
  });
}

function MeetingsNotice({ text }: { text: string }): React.ReactNode {
  const [before, after] = text.split("Discord");
  if (after === undefined) return text;
  return (
    <>
      {before}
      <Link to="/discord">Discord</Link>
      {after}
    </>
  );
}

export default function Home(): React.ReactNode {
  const upcoming = ONE_OFF_MEETINGS.slice(0, 2);

  return (
    <>
      <section className="home-hero" aria-label="Mission">
        <img
          className="home-hero-media"
          src="/hero-debate.webp"
          alt=""
          width={1408}
          height={768}
        />
        <div className="home-hero-scrim" aria-hidden="true" />
        <div className="home-hero-content">
          <img
            className="home-hero-logo"
            src="/logo-mark.svg"
            alt=""
            width={160}
            height={110}
          />
          <h1 className="home-hero-brand font-brand">{SITE_NAME}</h1>
          <p className="home-hero-text">
            America is politically polarized, let’s fix that.
            <br />
            <br />
            Join Common Ground Davis to debate better & more civilly with
            your peers at UC Davis, even when you disagree.
          </p>
          <div className="home-hero-actions">
            <Link to="/join" className="home-hero-link home-hero-link-primary">
              Join us
            </Link>
            <a href="#about" className="home-hero-link">
              Learn more
            </a>
          </div>
        </div>
        <a
          className="home-hero-scroll"
          href="#about"
          aria-label="Scroll to about"
        >
          <span className="home-hero-scroll-icon" aria-hidden="true" />
        </a>
      </section>

      <section id="about" className="home-section">
        <h1>About us</h1>
        <div className="home-about-row">
          <div className="home-lead home-lead-stack">
            {HOME_ABOUT_TEASE.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <p>
              <Link className="brand-link" to="/about">
                Read More →
              </Link>
            </p>
          </div>
          <div className="home-about-marks">
            <span className="home-about-mark home-about-mark-cgd">
              <img src="/logo-on-white.svg" alt="" width={176} height={176} />
            </span>
          </div>
        </div>
      </section>

      <section id="meetings" className="home-section">
        <h1>Meetings</h1>
        {REGISTERING ? null : (
          <p className="home-meetings-when">
            {REGULAR_MEETING?.summary ?? "TBD"}
          </p>
        )}
        {REGULAR_MEETING?.notes ? (
          <p
            className="home-meetings-status"
            style={REGISTERING ? { marginTop: "1.5rem" } : undefined}
          >
            <MeetingsNotice text={REGULAR_MEETING.notes} />
          </p>
        ) : null}
        {REGULAR_MEETING?.location ? (
          <p className="home-meetings-note">{REGULAR_MEETING.location}</p>
        ) : null}
        {upcoming.length > 0 ? (
          <ul className="one-off-list">
            {upcoming.map((m) => (
              <li key={m.id}>
                <strong>{m.title}</strong>
                <br />
                {m.when}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="home-meetings-note">
          Last updated {MEETINGS_LAST_UPDATED}.
          {REGISTERING ? null : (
            <>
              <br />
              Join our <Link to="/discord">Discord</Link> for the latest updates.
            </>
          )}
        </p>
      </section>

      <section id="what-we-do" className="home-section">
        <h1>What we do</h1>
        <p className="home-lead" style={{ marginTop: "1.25rem" }}>
          Every debate comes down to four things:
        </p>
        <ul className="do-list">
          {WHAT_WE_DO.map((item, i) => (
            <li key={item.title} className={i % 2 === 1 ? "do-row do-flip" : "do-row"}>
              <div>
                <h3 className="do-title">{item.title}</h3>
                <p className="do-body">{item.body}</p>
              </div>
              <div className="do-mark">
                <img src={item.icon} alt="" />
              </div>
            </li>
          ))}
        </ul>
        <p className="home-lead" style={{ marginTop: "1.5rem" }}>
          <Link className="brand-link" to="/debate-format">
            Full Debate Format →
          </Link>
        </p>
      </section>

      <section className="home-section home-join">
        <h1>Become a member</h1>
        <p className="home-lead">
          Interested in joining? Learn how to get involved👇
        </p>
        <Link to="/join" className="button-brand">
          Join the Club
        </Link>
      </section>
    </>
  );
}
