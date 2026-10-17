import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { AGGIELIFE_URL } from "../config/forms";
import { DISCORD_INVITE_URL, SITE_NAME } from "../config/site";

type NavLink = { to: string; label: string };

const PRIMARY: NavLink[] = [
  { to: "/about", label: "About" },
  { to: "/leadership", label: "Team" },
  { to: "/#meetings", label: "Meetings" },
];

const RESOURCES: NavLink[] = [
  { to: "/debate-format", label: "Debate format" },
  { to: "/contact", label: "Contact" },
  ...(DISCORD_INVITE_URL ? [{ to: "/discord", label: "Discord" }] : []),
  ...(AGGIELIFE_URL ? [{ to: AGGIELIFE_URL, label: "AggieLife" }] : []),
];

function isActive(pathname: string, hash: string, to: string) {
  if (to.startsWith("/#")) return pathname === "/" && hash === to.slice(1);
  if (!to.startsWith("/")) return false;
  return pathname === to;
}

export function SiteHeader(): React.ReactNode {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reveal, setReveal] = useState(false);
  const location = useLocation();
  const groupRef = useRef<HTMLDivElement>(null);
  const onHero = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!groupRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!onHero) {
      setReveal(true);
      return;
    }
    const update = () => setReveal(window.scrollY > 40);
    update();
    const timers = [0, 50, 200].map((ms) => window.setTimeout(update, ms));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      for (const id of timers) window.clearTimeout(id);
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, [onHero, location.pathname, location.hash]);

  const resourcesActive = RESOURCES.some((l) =>
    isActive(location.pathname, location.hash, l.to),
  );

  const className = [
    "site-header",
    onHero && "is-overlay",
    onHero && !reveal && !open && "is-hidden",
    open && "is-open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className}>
      <div className="site-header-inner">
        <Link to="/" className="site-header-branding">
          <span className="site-header-logo">
            <img src="/logo.svg" alt="" width={42} height={42} />
          </span>
          <span className="site-header-brand font-brand">{SITE_NAME}</span>
        </Link>

        <button
          type="button"
          className="site-menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="site-menu-bar" aria-hidden="true" />
          <span className="site-menu-bar" aria-hidden="true" />
          <span className="site-menu-bar" aria-hidden="true" />
        </button>

        <nav id="site-nav" className="site-nav" aria-label="Primary">
          {PRIMARY.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={
                isActive(location.pathname, location.hash, to)
                  ? "site-nav-link is-active"
                  : "site-nav-link"
              }
            >
              {label}
            </Link>
          ))}

          <div
            ref={groupRef}
            className={menuOpen ? "site-nav-group is-open" : "site-nav-group"}
          >
            <button
              type="button"
              className={
                resourcesActive
                  ? "site-nav-link site-nav-trigger is-active"
                  : "site-nav-link site-nav-trigger"
              }
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              Resources
              <span className="site-nav-caret" aria-hidden="true" />
            </button>
            <ul className="site-nav-menu" role="menu">
              {RESOURCES.map(({ to, label }) => (
                <li key={to} role="none">
                  {to.startsWith("/") ? (
                    <Link
                      role="menuitem"
                      to={to}
                      className={
                        isActive(location.pathname, location.hash, to)
                          ? "is-active"
                          : undefined
                      }
                    >
                      {label}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/join"
            className={
              location.pathname === "/join"
                ? "site-nav-link is-active"
                : "site-nav-link"
            }
          >
            Join
          </Link>
        </nav>
      </div>
    </header>
  );
}
