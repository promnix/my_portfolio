"use client";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#10100f",
            color: "#f6f1e8",
            fontFamily: "Arial, sans-serif",
            padding: "24px",
          }}
        >
          <section
            style={{
              width: "min(100%, 640px)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.04)",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <title>Application error</title>
            <p
              style={{
                margin: 0,
                color: "#d6a14a",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Error
            </p>
            <h1 style={{ margin: "16px 0 0", fontSize: "40px", lineHeight: 1 }}>
              The site could not load.
            </h1>
            <p style={{ margin: "20px auto 0", maxWidth: "460px", color: "#b9b3a8", lineHeight: 1.7 }}>
              A root application error occurred. Try refreshing the page.
            </p>
            {error.digest ? (
              <p style={{ margin: "16px 0 0", color: "#8d867a", fontSize: "12px" }}>
                Error ID: {error.digest}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => unstable_retry()}
              style={{
                marginTop: "28px",
                border: "1px solid #d6a14a",
                borderRadius: "999px",
                background: "#d6a14a",
                color: "#10100f",
                fontWeight: 700,
                padding: "12px 22px",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
