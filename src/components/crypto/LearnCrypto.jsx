import { useState } from "react";
import usdcImg from "../../assets/usdc.png";
import replaceBankImg from "../../assets/Replace_Bank.png";
import bitcoinImg from "../../assets/Learn_Illustration_Ultimate_Guide_Bitcoin.png";

const ARTICLES = [
  {
    img: usdcImg,
    bg: "#000000",
    title: "USDC: The digital dollar for the global crypto economy",
    excerpt:
      "Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more...",
  },
  {
    img: replaceBankImg,
    bg: "#1d4ed8",
    title: "Can crypto really replace your bank account?",
    excerpt:
      "If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that...",
  },
  {
    img: bitcoinImg,
    bg: "#94a3b8",
    title: "When is the best time to invest in crypto?",
    excerpt:
      "Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...",
  },
];

export default function LearnCrypto() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      className="home-section"
      style={{
        background: "#f3f4f6",
        backgroundImage: "none",
        padding: "5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div>

        {/* Top row — heading left, description + button right */}
        <div
          className="learn-header-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "flex-end",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.15,
            }}
          >
            New to crypto? Learn some crypto basics
          </h2>
          <div>
            <p style={{ fontSize: "0.95rem", color: "#6b7280", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              Beginner guides, practical tips, and market updates for first-timers,
              experienced investors, and everyone in between
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
              Read More
            </button>
          </div>
        </div>

        {/* Article cards */}
        <div
          className="learn-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
        >
          {ARTICLES.map((article, i) => (
            <div
              key={i}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card image area */}
              <div
                style={{
                  background: article.bg,
                  borderRadius: "1rem",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src={article.img}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.3,
                  marginBottom: "0.75rem",
                  textDecoration: hoveredIndex === i ? "underline" : "none",
                  transition: "text-decoration 0.15s ease",
                }}
              >
                {article.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6 }}>
                {article.excerpt}
              </p>
            </div>
          ))}
        </div>

      </div>
      </div>
    </section>
  );
}
