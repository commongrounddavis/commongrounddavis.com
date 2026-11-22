import { Link } from "react-router";
import type { Route } from "./+types/constitution";
import { LinkIcon } from "../components/link-icon";
import {
  currentConstitution,
  fmtDate,
  fmtShortDate,
  pastConstitutions,
  type ConstitutionStatus,
} from "../config/constitution";
import { DISCORD_INVITE_URL } from "../config/links";
import { pageMeta } from "../config/site";

export function meta(_: Route.MetaArgs) {
  const current = currentConstitution();
  return pageMeta({
    title: "Constitution",
    description: current
      ? `The official constitution of Common Ground Davis. Version ${current.version}, in effect since ${fmtDate(current.effective)}. Every past version is public.`
      : "The official constitution of Common Ground Davis is being finalized.",
    path: "/constitution",
  });
}

const STATUS_LABEL: Record<ConstitutionStatus, string> = {
  current: "Current",
  replaced: "Replaced",
  reversed: "Reversed",
};

function StatusPill({ status }: { status: ConstitutionStatus }): React.ReactNode {
  return <span className={`doc-pill is-${status}`}>{STATUS_LABEL[status]}</span>;
}

function fileName(pdf: string): string {
  return pdf.split("/").pop() ?? pdf;
}

export default function Constitution(): React.ReactNode {
  const current = currentConstitution();

  if (!current) {
    return (
      <section className="home-section page-narrow">
        <h1>Constitution</h1>
        <p className="home-lead" style={{ marginTop: "1rem" }}>
          Our constitution is being finalized. Once it’s adopted, every version
          will be posted here.
        </p>
      </section>
    );
  }

  const past = pastConstitutions();

  return (
    <section className="home-section page-narrow">
      <h1>Constitution</h1>
      <p className="home-lead" style={{ marginTop: "1rem" }}>
        This is the official constitution of Common Ground Davis. Every version
        is public. Changes are announced in our{" "}
        {DISCORD_INVITE_URL ? (
          <Link className="brand-link" to="/discord">
            Discord
          </Link>
        ) : (
          "Discord"
        )}
        .
      </p>

      <article className="doc-card" aria-label={`Current constitution, version ${current.version}`}>
        <span className="doc-icon">
          <LinkIcon name="constitution" />
        </span>
        <div className="doc-body">
          <h2 className="doc-title title-plain">
            Version {current.version} <StatusPill status="current" />
          </h2>
          <p className="doc-meta">In effect since {fmtDate(current.effective)}</p>
          {current.summary ? <p className="doc-summary">{current.summary}</p> : null}
        </div>
        <div className="doc-actions">
          <a className="button-brand" href={current.pdf} target="_blank" rel="noopener">
            Read
          </a>
          <a className="button-quiet" href={current.pdf} download={fileName(current.pdf)}>
            Download
          </a>
        </div>
      </article>

      {past.length > 0 ? (
        <>
          <h2 className="doc-history-title title-plain">Past versions</h2>
          <ol className="doc-history">
            {past.map((v) => (
              <li key={v.version}>
                <div className="doc-history-main">
                  <p className="doc-history-head">
                    <strong>Version {v.version}</strong> <StatusPill status={v.status} />
                  </p>
                  <p className="doc-meta">
                    {fmtShortDate(v.effective)} – {v.ended ? fmtShortDate(v.ended) : "now"}
                  </p>
                  {v.summary ? <p className="doc-summary">{v.summary}</p> : null}
                </div>
                <a
                  className="doc-history-pdf"
                  href={v.pdf}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Version ${v.version} PDF`}
                >
                  PDF <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ol>
        </>
      ) : null}
    </section>
  );
}
