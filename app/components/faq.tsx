import type { FaqItem } from "../config/faq";

/**
 * Reusable FAQ accordion (native <details>, no JS). Drop into any page:
 *   <Faq items={JOIN_FAQ} title="Questions" />
 */
export function Faq({
  items,
  title = "FAQ",
  className,
}: {
  items: FaqItem[];
  title?: string | null;
  className?: string;
}): React.ReactNode {
  if (items.length === 0) return null;
  return (
    <div className={className ? `faq ${className}` : "faq"}>
      {title ? <h2 className="section-kicker title-plain">{title}</h2> : null}
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>
              <span>{item.q}</span>
              <span className="faq-chevron" aria-hidden="true" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
