import { useEffect } from "react";
import type { Route } from "./+types/discord";
import { DISCORD_INVITE_URL, pageMeta } from "../config/site";

export const handle = { bare: true };

export function meta(_: Route.MetaArgs) {
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

export default function DiscordRedirect(): React.ReactNode {
  useEffect(() => {
    window.location.replace(DISCORD_INVITE_URL);
  }, []);

  return (
    <main className="error-page">
      <img
        className="logo-bounce"
        src="/DCR.webp"
        alt=""
        width={80}
        height={80}
      />
      <p>Redirecting to Discord…</p>
      <a href={DISCORD_INVITE_URL} className="brand-link">
        Continue to Discord
      </a>
    </main>
  );
}
