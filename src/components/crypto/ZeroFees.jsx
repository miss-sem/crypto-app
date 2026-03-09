import zeroFeesImg from "../../assets/zero_fees_us.png";
import coinbaseLogo from "../../assets/coinbaseLogoNavigation-4.svg";

export default function ZeroFees() {
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
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Left — text */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              border: "1px solid #d1d5db",
              borderRadius: "9999px",
              padding: "0.3rem 0.85rem",
              marginBottom: "1.25rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            <img
              src={coinbaseLogo}
              alt="Coinbase"
              style={{ width: "1rem", height: "1rem", filter: "brightness(0)", display: "block" }}
            />
            COINBASE ONE
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Zero trading fees,<br />more rewards.
          </h2>

          <p style={{ fontSize: "0.95rem", color: "#6b7280", marginBottom: "2rem", lineHeight: 1.7 }}>
            Get more out of crypto with one membership: zero trading fees,
            boosted rewards, priority support, and more.
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
            Claim free trial
          </button>
        </div>

        {/* Right — light card with phone screenshot */}
        <div
          style={{
            background: "#f3f4f6",
            borderRadius: "1.75rem",
            overflow: "hidden",
            maxWidth: "420px",
            width: "100%",
          }}
        >
          <div style={{ padding: "2rem 1.5rem 0" }}>
            <img
              src={zeroFeesImg}
              alt="Zero trading fees with Coinbase One"
              style={{ width: "100%", display: "block", borderRadius: "1rem 1rem 0 0" }}
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
