import { Link } from "react-router";
import { discordProfileUrl, type Person } from "../config/leadership";
import {
  DiscordIcon,
  InstagramIcon,
  LinkIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from "./icons";

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function handleOf(url: string): string {
  try {
    const last = new URL(url).pathname.split("/").filter(Boolean).pop();
    return last ? `@${decodeURIComponent(last)}` : hostOf(url);
  } catch {
    return url;
  }
}

function Bio({ text }: { text: string }): React.ReactNode {
  return text.split(/\n\s*\n/).map((paragraph) => (
    <p key={paragraph.slice(0, 32)} className="team-bio">
      <BioInline text={paragraph} />
    </p>
  ));
}

function BioInline({ text }: { text: string }): React.ReactNode {
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0;
    const href = match[2];
    if (index > last) nodes.push(text.slice(last, index));
    nodes.push(
      href.startsWith("/") ? (
        <Link key={href} className="brand-link" to={href}>
          {match[1]}
        </Link>
      ) : (
        <a
          key={href}
          className="brand-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[1]}
        </a>
      ),
    );
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Avatar({
  person,
  size = "md",
}: {
  person: Person;
  size?: "sm" | "md";
}): React.ReactNode {
  return (
    <div className={`team-avatar team-avatar-${size}`} aria-hidden="true">
      {person.photoSrc ? (
        <img src={person.photoSrc} alt="" width={72} height={72} />
      ) : (
        initials(person.name)
      )}
    </div>
  );
}

export function PersonLinks({
  person,
  compact = false,
  emailOnly = false,
}: {
  person: Person;
  compact?: boolean;
  /** Contact page: email only. A Discord @ only reaches people already in member channels. */
  emailOnly?: boolean;
}): React.ReactNode {
  const discordUrl = discordProfileUrl(person);
  return (
    <div className="team-links">
      {person.email ? (
        <a href={`mailto:${person.email}`} target="_blank" rel="noopener noreferrer">
          <MailIcon />
          {person.email}
        </a>
      ) : null}
      {!emailOnly && person.discordHandle ? (
        discordUrl ? (
          <a href={discordUrl} target="_blank" rel="noopener noreferrer">
            <DiscordIcon />@{person.discordHandle}
          </a>
        ) : (
          <span>
            <DiscordIcon />@{person.discordHandle}
          </span>
        )
      ) : null}
      {emailOnly || compact ? null : (
        <>
          {person.twitter ? (
            <a href={person.twitter} target="_blank" rel="noopener noreferrer">
              <XIcon />
              {handleOf(person.twitter)}
            </a>
          ) : null}
          {person.linkedin ? (
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              {handleOf(person.linkedin)}
            </a>
          ) : null}
          {person.instagram ? (
            <a
              href={person.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
              {handleOf(person.instagram)}
            </a>
          ) : null}
          {person.url ? (
            <a href={person.url} target="_blank" rel="noopener noreferrer">
              <LinkIcon />
              {hostOf(person.url)}
            </a>
          ) : null}
        </>
      )}
    </div>
  );
}

/** Avatar, name, club title, CSI line, bio, links. */
export function TeamMember({
  person,
  role,
  csiTitle,
  range,
  linkName = true,
  heading = "h2",
}: {
  person: Person;
  role: string;
  csiTitle?: string;
  range?: string;
  linkName?: boolean;
  heading?: "h1" | "h2";
}): React.ReactNode {
  const Heading = heading;
  const bio = person.bio.trim();

  return (
    <li className="team-member">
      <Avatar person={person} />
      <div className="team-body">
        <Heading>
          {linkName ? (
            <Link to={`/leadership/${person.slug}`}>{person.name}</Link>
          ) : (
            person.name
          )}
        </Heading>
        <p className="team-role">{role}</p>
        {csiTitle ? <p className="team-csi">AggieLife: {csiTitle}</p> : null}
        {range ? <p className="team-csi">{range}</p> : null}

        {bio ? <Bio text={bio} /> : null}

        <PersonLinks person={person} />
      </div>
    </li>
  );
}
