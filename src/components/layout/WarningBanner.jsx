export default function WarningBanner() {
  return (
    <div
      style={{
        width: "100%",
        background: "#fefce8",
        borderBottom: "1px solid #fde047",
        padding: "0.55rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        zIndex: 60,
        position: "relative",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <p style={{ fontSize: "0.8rem", color: "#713f12", margin: 0, textAlign: "center", lineHeight: 1.4 }}>
        <strong>Student project</strong> — This app is not affiliated with, endorsed by, or connected to Coinbase in any way.
      </p>
    </div>
  );
}
