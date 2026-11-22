import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/links";
import { LinkIcon } from "../components/link-icon";
import { LINK_PAGE_ITEMS, isInternal } from "../config/links";
import { SITE_NAME, pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Links",
    description: `${SITE_NAME}, a UC Davis political debate club. Discord, membership, and every official club link in one place.`,
    path: "/links",
  });
}

/**
 * Carry incoming utm_* params (e.g. ?utm_source=instagram&utm_medium=bio) onto
 * our own pages so the click into /join keeps its source. Read after mount so
 * the prerendered HTML and first client render match.
 */
function useUtmSuffix(): string {
  const [suffix, setSuffix] = useState("");
  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const utm = new URLSearchParams();
    for (const [key, value] of incoming) {
      if (key.toLowerCase().startsWith("utm_")) utm.append(key, value);
    }
    const query = utm.toString();
    setSuffix(query ? `?${query}` : "");
  }, []);
  return suffix;
}

/** Layout follows daviscollegerepublicans.com/links: same site chrome, narrow centered list. */
export default function Links(): React.ReactNode {
  const utm = useUtmSuffix();

  return (
    <section className="home-section link-tree">
      <img className="link-tree-avatar" src="/logo.svg" alt="" width={96} height={96} />
      <h1 className="title-plain">{SITE_NAME}</h1>
      <p className="link-tree-tagline">A Political Debate Club</p>

      <ul className="link-tree-list">
        {LINK_PAGE_ITEMS.map(({ label, subtitle, href, icon }) => {
          const body = (
            <>
              <span className="link-tree-icon">
                <LinkIcon name={icon} />
              </span>
              <span className="link-tree-copy">
                <span className="link-tree-label">{label}</span>
                {subtitle ? <span className="link-tree-desc">{subtitle}</span> : null}
              </span>
            </>
          );
          return (
            <li key={href}>
              {isInternal(href) ? (
                <Link className="link-tree-row" to={`${href}${utm}`}>
                  {body}
                </Link>
              ) : (
                <a className="link-tree-row" href={href} target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
