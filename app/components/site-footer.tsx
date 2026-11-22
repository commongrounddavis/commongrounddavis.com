import { Link } from "react-router";
import { hasConstitution } from "../config/constitution";
import { FOOTER_ICONS, LINKS, isInternal, type ClubLink } from "../config/links";
import { SITE_NAME } from "../config/site";
import { LinkIcon } from "./link-icon";

type NavItem = { to: string; label: string };

const MAIN_LINKS: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/leadership", label: "Team" },
  { to: LINKS.join, label: "Join Us" },
  { to: "/contact", label: "Contact" },
  { to: "/support", label: "Support" },
];

const SECONDARY_LINKS: NavItem[] = [
  { to: "/directory", label: "Site Directory" },
  { to: LINKS.sourceCode, label: "Source Code" },
  ...(hasConstitution() ? [{ to: "/constitution", label: "Constitution" }] : []),
];

/** A few key accounts (see FOOTER_ICONS), then "All links" → /links for the rest. */
const ICON_LINKS: ClubLink[] = [
  ...FOOTER_ICONS,
  { label: "All links", href: "/links", icon: "link" },
];

function SmartLink({
  to,
  className,
  ariaLabel,
  children,
}: {
  to: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}): React.ReactNode {
  return isInternal(to) ? (
    <Link to={to} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  ) : (
    <a href={to} className={className} aria-label={ariaLabel} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

function DotNav({
  items,
  ariaLabel,
  className,
}: {
  items: readonly NavItem[];
  ariaLabel: string;
  className?: string;
}): React.ReactNode {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {items.map(({ to, label }, index) => (
        <span key={to} className="site-footer-dot-item">
          {index > 0 ? (
            <span className="site-footer-dot" aria-hidden="true">
              ·
            </span>
          ) : null}
          <SmartLink to={to}>{label}</SmartLink>
        </span>
      ))}
    </nav>
  );
}

function SocialIcons(): React.ReactNode {
  return (
    <ul className="site-footer-social" aria-label="Club accounts">
      {ICON_LINKS.map(({ label, href, icon }) => (
        <li key={href}>
          <SmartLink to={href} className="site-footer-icon" ariaLabel={label}>
            <LinkIcon name={icon} size={20} />
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter(): React.ReactNode {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-left">
          <div className="site-footer-credits">
            <p>
              © {SITE_NAME} {year}
            </p>
            <p className="site-footer-muted">All rights reserved.</p>
          </div>
          <DotNav
            className="site-footer-secondary"
            ariaLabel="About this site"
            items={SECONDARY_LINKS}
          />
        </div>

        <div className="site-footer-right">
          <SocialIcons />
          <DotNav className="site-footer-reach" ariaLabel="Site pages" items={MAIN_LINKS} />
        </div>
      </div>
    </footer>
  );
}
