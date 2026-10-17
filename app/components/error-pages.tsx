function StatusShell({
  code,
  message,
  showStatusLink = false,
}: {
  code: string;
  message: string;
  showStatusLink?: boolean;
}): React.ReactNode {
  return (
    <div className="error-page">
      <img
        className="logo-bounce"
        src="/logo.svg"
        alt=""
        width={80}
        height={80}
      />
      <h1>{code}</h1>
      <p>{message}</p>
      <a href="/" className="brand-link">
        Back to home
      </a>
      {showStatusLink && (
        <p className="status-footer">
          Check{" "}
          <a
            href="https://services.vijitdua.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            services.vijitdua.com
          </a>{" "}
          if the issue persists.
        </p>
      )}
    </div>
  );
}

export function NotFoundPage(): React.ReactNode {
  return (
    <StatusShell
      code="404"
      message="The page you’re looking for doesn’t exist."
    />
  );
}

export function ServerErrorPage(): React.ReactNode {
  return (
    <StatusShell
      code="5xx"
      message="Something went wrong on our end."
      showStatusLink
    />
  );
}
