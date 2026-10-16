import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { SITE_NAME } from "../config/site";

const NAV = [
  { to: "/#about", label: "About" },
  { to: "/#meetings", label: "Meetings" },
  { to: "/contact", label: "Contact" },
  { to: "/join", label: "Join" },
  { to: "/discord", label: "Discord" },
] as const;

function isNavActive(pathname: string, hash: string, to: string) {
  if (to.startsWith("/#")) {
    return pathname === "/" && hash === to.slice(1);
  }
  return pathname === to;
}

export function SiteHeader(): React.ReactNode {
  const [open, setOpen] = useState(false);
  const [reveal, setReveal] = useState(false);
  const location = useLocation();
  const onHero = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!onHero) {
      setReveal(true);
      return;
    }

    const update = () => setReveal(window.scrollY > 40);
    update();

    // Hash jumps (#about) scroll after paint — recheck a couple times.
    const timers = [0, 50, 200].map((ms) => window.setTimeout(update, ms));

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      for (const id of timers) window.clearTimeout(id);
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, [onHero, location.pathname, location.hash]);

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
            <img src="/DCR.webp" alt="" width={48} height={48} />
          </span>
          <span className="site-header-brand font-brand">{SITE_NAME}</span>
        </Link>

        <button
          type="button"
          className="site-menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="site-menu-bar" aria-hidden="true" />
          <span className="site-menu-bar" aria-hidden="true" />
          <span className="site-menu-bar" aria-hidden="true" />
        </button>

        <nav id="site-nav" className="site-nav" aria-label="Primary">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={
                isNavActive(location.pathname, location.hash, to)
                  ? "site-nav-link is-active"
                  : "site-nav-link"
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
