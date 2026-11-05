'use client';

import { useEffect } from "react";

// Replaces the root layout when it fails, so it can't rely on the app's styles or fonts.
// Prerendered routes with no cached copy show src/pages/500.js instead.
export default function GlobalError({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <title>Temporarily unavailable | Albina Community Archive</title>
        <main style={{ fontFamily: "sans-serif", textAlign: "center", padding: "20vh 1rem" }}>
          <h1>The archive is temporarily unavailable</h1>
          <p>We&apos;re having trouble loading this page. Please try again in a few minutes.</p>
          <button onClick={() => window.location.reload()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
