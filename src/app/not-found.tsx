export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ marginBottom: "2rem" }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          background: "#007bff",
          color: "white",
          padding: "12px 24px",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Go Home
      </a>
    </div>
  );
}
