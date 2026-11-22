import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/directory";
import { directoryEntries, type DirectoryEntry } from "../config/directory";
import { isInternal } from "../config/links";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Site directory",
    description: "Every public page on the Common Ground Davis website.",
    path: "/directory",
  });
}

type SortKey = "name" | "path";
type Sort = { key: SortKey; asc: boolean };

/** Files (sitemap.xml, PDFs) skip client routing. */
function isFile(path: string): boolean {
  return /\.[a-z0-9]+$/i.test(path.split("?")[0] ?? "");
}

function pathLabel(path: string): string {
  return isInternal(path) ? path : path.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function SmartLink({
  to,
  className,
  title,
  children,
}: {
  to: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
}): React.ReactNode {
  if (isInternal(to) && !isFile(to)) {
    return (
      <Link className={className} to={to} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <a
      className={className}
      href={to}
      title={title}
      {...(isInternal(to) ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

function sortEntries(entries: DirectoryEntry[], sort: Sort): DirectoryEntry[] {
  const value = (e: DirectoryEntry) =>
    sort.key === "name" ? e.name.toLowerCase() : (e.paths[0] ?? "");
  const sorted = [...entries].sort((a, b) => value(a).localeCompare(value(b)));
  return sort.asc ? sorted : sorted.reverse();
}

export default function Directory(): React.ReactNode {
  const [sort, setSort] = useState<Sort>({ key: "path", asc: true });
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const entries = useMemo(() => sortEntries(directoryEntries(), sort), [sort]);
  const parents = entries.filter((e) => e.children?.length).map((e) => e.name);

  // "+" toggles every sub-page list at once (ignored while typing).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "+" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      setOpen((prev) => (prev.size === parents.length ? new Set() : new Set(parents)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [parents.length]);

  const toggle = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const sortBy = (key: SortKey) =>
    setSort((prev) => ({ key, asc: prev.key === key ? !prev.asc : true }));

  const arrow = (key: SortKey) => (sort.key === key ? (sort.asc ? " ↑" : " ↓") : "");

  return (
    <section className="home-section directory-page">
      <h1>Site directory</h1>
      <div className="directory-intro">
        <p>Every public page on this site.</p>
        <p>
          Press <kbd>+</kbd> to expand sub-pages.
        </p>
        <p>
          Prefer a machine-readable index? See the{" "}
          <a className="brand-link" href="/sitemap.xml">
            sitemap
          </a>
          .
        </p>
      </div>

      <div className="directory-table" role="table" aria-label="Site directory">
        <div className="directory-head" role="row">
          <button type="button" role="columnheader" onClick={() => sortBy("name")}>
            Name{arrow("name")}
          </button>
          <button type="button" role="columnheader" onClick={() => sortBy("path")}>
            Path{arrow("path")}
          </button>
        </div>

        {entries.map((entry) => {
          const hasChildren = Boolean(entry.children?.length);
          const isOpen = open.has(entry.name);
          const childId = `dir-${entry.name.toLowerCase().replace(/\W+/g, "-")}`;
          return (
            <div key={entry.name} className="directory-group" role="rowgroup">
              <div className="directory-row" role="row">
                <span className="directory-name" role="cell">
                  {hasChildren ? (
                    <button
                      type="button"
                      className="directory-toggle"
                      aria-expanded={isOpen}
                      aria-controls={childId}
                      aria-label={`${isOpen ? "Hide" : "Show"} ${entry.name} sub-pages`}
                      onClick={() => toggle(entry.name)}
                    >
                      {isOpen ? "−" : "+"}
                    </button>
                  ) : null}
                  <SmartLink to={entry.paths[0] ?? "/"}>{entry.name}</SmartLink>
                </span>
                <span className="directory-paths" role="cell">
                  {entry.paths.map((path, index) => (
                    <span key={path}>
                      {index > 0 ? ", " : null}
                      <SmartLink to={path} title={path}>
                        {pathLabel(path)}
                      </SmartLink>
                    </span>
                  ))}
                </span>
              </div>

              {hasChildren && isOpen ? (
                <div id={childId} className="directory-children">
                  {entry.children!.map((child) => (
                    <div key={child.path} className="directory-row is-child" role="row">
                      <span className="directory-name" role="cell">
                        <SmartLink to={child.path}>{child.name}</SmartLink>
                      </span>
                      <span className="directory-paths" role="cell">
                        <SmartLink to={child.path} title={child.path}>
                          {pathLabel(child.path)}
                        </SmartLink>
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
