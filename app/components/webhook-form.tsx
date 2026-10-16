import { useState } from "react";
import { postDiscordWebhook } from "../lib/discord";
import { SITE_NAME, SITE_URL } from "../config/site";

export type WebhookField = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  placeholder?: string;
};

type Props = {
  webhookUrl: string;
  title: string;
  blurb: string;
  fields: WebhookField[];
  embedTitle: string;
  submitLabel: string;
};

export function WebhookForm({
  webhookUrl,
  title,
  blurb,
  fields,
  embedTitle,
  submitLabel,
}: Props): React.ReactNode {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const lines = fields.map((field) => {
      const raw = String(form.get(field.name) ?? "").trim();
      return `**${field.label}:** ${raw || "—"}`;
    });

    const content = [
      `**:envelope_with_arrow: ${embedTitle}**`,
      "",
      ...lines,
      "",
      `-# Sent via [${SITE_NAME}](<${SITE_URL}>)`,
      "---",
    ].join("\n");

    if (content.length > 1900) {
      setStatus("error");
      setError("Message is a bit long — trim it and try again.");
      return;
    }

    setStatus("sending");
    const result = await postDiscordWebhook(webhookUrl, content);
    if (!result.ok) {
      setStatus("error");
      setError(result.error);
      return;
    }

    setStatus("sent");
    event.currentTarget.reset();
  }

  if (!webhookUrl) return null;

  if (status === "sent") {
    return (
      <div className="webhook-success" role="status">
        <h2>Message sent</h2>
        <p>
          We’ve forwarded your message directly to {SITE_NAME} on Discord — the
          club will see it there.
        </p>
        <button
          type="button"
          className="brand-link webhook-reset"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="webhook-form" onSubmit={onSubmit}>
      <div className="webhook-form-intro">
        <h1>{title}</h1>
        <p>{blurb}</p>
      </div>

      {fields.map((field) => (
        <label key={field.name} className="webhook-field">
          <span>
            {field.label}
            {field.required ? "" : " (optional)"}
          </span>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={5}
            />
          ) : (
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
            />
          )}
        </label>
      ))}

      {error ? (
        <p className="webhook-error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="webhook-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
