'use client';

import { useEffect } from "react";

// Renders inside the root layout, so the nav and footer stay on screen.
export default function ErrorBoundary({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ textAlign: "center", padding: "20vh 1rem" }}>
      <h1>The archive is temporarily unavailable</h1>
      <p>Something went wrong loading this page. Please try again in a few minutes.</p>
      <button onClick={() => window.location.reload()}>Try again</button>
    </main>
  );
}
