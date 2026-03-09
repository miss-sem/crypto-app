import baseAppImg from "../../assets/CB_LOLP__1_.png";
import coinbaseLogo from "../../assets/coinbaseLogoNavigation-4.svg";

export default function BaseApp() {
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
          gridTemplateColumns: "auto 1fr",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* Left — light card with phone screenshot */}
        <div
          className="baseapp-img"
          style={{
            borderRadius: "1.75rem",
            overflow: "hidden",
            width: "100%",
            maxWidth: "460px",
          }}
        >
          <img
            src={baseAppImg}
            alt="Base App interface"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        {/* Right — text */}
        <div className="baseapp-text">
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
            BASE APP
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
            Countless ways to earn crypto with the Base App.
          </h2>

          <p style={{ fontSize: "0.95rem", color: "#6b7280", marginBottom: "2rem", lineHeight: 1.7 }}>
            An everything app to trade, create, discover, and chat, all in one place.
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
            Learn more
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
