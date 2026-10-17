import { useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/discord";
import { DISCORD_INVITE_URL, pageMeta } from "../config/site";

export const handle = { bare: Boolean(DISCORD_INVITE_URL) };

export function meta(_: Route.MetaArgs) {
  if (!DISCORD_INVITE_URL) {
    return pageMeta({
      title: "Discord",
      description: "Common Ground Davis Discord — coming soon.",
      path: "/discord",
    });
  }

  return [
    ...pageMeta({
      title: "Discord",
      description: "Join the Common Ground Davis Discord server.",
      path: "/discord",
    }),
    // GitHub Pages has no custom HTTP 3xx; browser refresh + JS replace below.
    { "http-equiv": "refresh", content: `0;url=${DISCORD_INVITE_URL}` },
  ];
}

export default function DiscordPage(): React.ReactNode {
  useEffect(() => {
    if (DISCORD_INVITE_URL) {
      window.location.replace(DISCORD_INVITE_URL);
    }
  }, []);

  if (!DISCORD_INVITE_URL) {
    return (
      <section className="home-section page-narrow">
        <h1>Discord</h1>
        <p className="home-lead">
          Our server isn’t live yet. Join the interest list and we’ll ping you
          when it is.
        </p>
        <div className="page-actions">
          <Link to="/join" className="button-brand">
            Interest form
          </Link>
          <Link className="brand-link" to="/contact">
            Contact →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="error-page">
      <img
        className="logo-bounce"
        src="/logo.svg"
        alt=""
        width={80}
        height={80}
      />
      <p>Redirecting to Discord…</p>
      <a href={DISCORD_INVITE_URL} className="brand-link" target="_blank" rel="noopener">
        Continue to Discord
      </a>
    </main>
  );
}
