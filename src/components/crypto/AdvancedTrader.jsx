import advancedImg from "../../assets/Advanced.png";

export default function AdvancedTrader() {
  return (
    <section
      className="home-section"
      style={{
        background: "#ffffff",
        backgroundImage: "none",
        padding: "5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div
        className="home-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "0.8fr 1.2fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Left — dark card with trading screenshot */}
        <div
          className="advancedtrader-img"
          style={{
            background: "#111827",
            borderRadius: "1.75rem",
            overflow: "hidden",
            aspectRatio: "4 / 3",
            maxWidth: "420px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={advancedImg}
            alt="Advanced trading interface"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Right — text */}
        <div className="advancedtrader-text">
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Powerful tools, designed for the advanced trader.
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#6b7280", marginBottom: "2rem", lineHeight: 1.7 }}>
            Powerful analytical tools with the safety and security of Coinbase deliver the ultimate
            trading experience. Tap into sophisticated charting capabilities, real-time order books,
            and deep liquidity across hundreds of markets.
          </p>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              border: "none",
              background: "#111827",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            Start trading
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
