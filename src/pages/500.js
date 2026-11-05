import Head from "next/head";

// Next.js serves this when a prerendered route fails to render and has no cached copy.
// App Router error boundaries don't run in that case, and the fallback is plain text.
export default function Custom500() {
  return (
    <>
      <Head>
        <title>Temporarily unavailable | Albina Community Archive</title>
      </Head>
      <main style={{ fontFamily: "sans-serif", textAlign: "center", padding: "20vh 1rem" }}>
        <h1>The archive is temporarily unavailable</h1>
        <p>We&apos;re having trouble loading this page. Please try again in a few minutes.</p>
        <a href="">Try again</a>
      </main>
    </>
  );
}
