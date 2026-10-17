import { Navigate } from "react-router";

export const handle = { bare: true };

export function meta() {
  return [
    { title: "Team — Common Ground Davis" },
    { "http-equiv": "refresh", content: "0;url=/leadership" },
    { name: "robots", content: "noindex" },
  ];
}

/** /team is the nav label. The page lives at /leadership. */
export default function TeamRedirect(): React.ReactNode {
  return <Navigate to="/leadership" replace />;
}
