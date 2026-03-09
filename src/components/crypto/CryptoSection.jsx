import { useState } from "react";

const CRYPTO_TABS = [
  { id: "tradable", label: "Tradable" },
  { id: "topGainers", label: "Top gainers" },
  { id: "newOnCoinbase", label: "New on Coinbase" },
];

const CRYPTO_DATA = {
  tradable: [
    { name: "Bitcoin",   price: "GHS 748,947.17", change: "+4.22%",  positive: true,  color: "#f7931a", letter: "₿" },
    { name: "Ethereum",  price: "GHS 22,236.39",  change: "+3.42%",  positive: true,  color: "#627eea", letter: "Ξ" },
    { name: "Tether",    price: "GHS 10.72",       change: "+0.00%",  positive: true,  color: "#26a17b", letter: "T" },
    { name: "BNB",       price: "GHS 6,978.48",    change: "+3.52%",  positive: true,  color: "#f0b90b", letter: "B" },
    { name: "XRP",       price: "GHS 15.18",       change: "+2.31%",  positive: true,  color: "#346aa9", letter: "X" },
    { name: "USDC",      price: "GHS 10.72",       change: "--",      positive: null,  color: "#2775ca", letter: "$" },
  ],
  topGainers: [
    { name: "Perpetual Protocol",  price: "GHS 0.38",   change: "+95.82%", positive: true,  color: "#00d395", letter: "P" },
    { name: "Syndicate",           price: "GHS 0.55",   change: "-20.43%", positive: false, color: "#6b7280", letter: "S" },
    { name: "Kava",                price: "GHS 0.63",   change: "+16.80%", positive: true,  color: "#e84040", letter: "K" },
    { name: "Pirate Nation Token", price: "GHS 0.0627", change: "-18.75%", positive: false, color: "#f97316", letter: "P" },
    { name: "HOPR",                price: "GHS 0.25",   change: "+19.53%", positive: true,  color: "#1d4ed8", letter: "h" },
    { name: "Kyber Network",       price: "GHS 1.61",   change: "+10.74%", positive: true,  color: "#31cb9e", letter: "K" },
  ],
  newOnCoinbase: [
    { name: "Hyperliquid", price: "GHS 359.16", change: "+5.61%",  positive: true,  color: "#00d4ff", letter: "H" },
    { name: "Jupiter",     price: "GHS 1.93",   change: "+7.47%",  positive: true,  color: "#c084fc", letter: "J" },
    { name: "Lighter",     price: "GHS 14.75",  change: "-4.45%",  positive: false, color: "#6366f1", letter: "L" },
    { name: "Plasma",      price: "GHS 1.13",   change: "+5.59%",  positive: true,  color: "#64748b", letter: "P" },
    { name: "Walrus",      price: "GHS 0.82",   change: "-3.63%",  positive: false, color: "#3b82f6", letter: "W" },
    { name: "Raydium",     price: "GHS 6.18",   change: "-6.05%",  positive: false, color: "#38bdf8", letter: "R" },
  ],
};

export default function CryptoSection() {
  const [activeTab, setActiveTab] = useState("tradable");
  const coins = CRYPTO_DATA[activeTab];

  return (
    <section style={{ background: "#f3f4f6", padding: "5rem 8rem" }} className="home-section">
      <div
        className="home-grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Left — text */}
        <div>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            Explore crypto like Bitcoin, Ethereum, and Dogecoin.
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#6b7280", marginBottom: "2rem", lineHeight: 1.6 }}>
            Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
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
            See more assets
          </button>
        </div>

        {/* Right — dark crypto card */}
        <div
          style={{
            background: "#000000",
            borderRadius: "1.75rem",
            padding: "1.5rem",
            color: "white",
          }}
        >
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              gap: "0.15rem",
              marginBottom: "0.75rem",
              background: "#1a1a1a",
              borderRadius: "9999px",
              padding: "0.2rem",
            }}
          >
            {CRYPTO_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "0.45rem 0.75rem",
                  borderRadius: "9999px",
                  border: "none",
                  background: activeTab === tab.id ? "#2a2a2a" : "transparent",
                  color: activeTab === tab.id ? "white" : "#9ca3af",
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Coin rows */}
          {coins.map((coin, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.65rem 0.5rem",
                borderRadius: "0.75rem",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1a1a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "50%",
                    background: coin.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    flexShrink: 0,
                  }}
                >
                  {coin.letter}
                </div>
                <span style={{ fontSize: "1.05rem", fontWeight: 500, color: "white" }}>{coin.name}</span>
              </div>
              <div className="crypto-price-col" style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "white" }}>{coin.price}</p>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: coin.positive === null ? "#9ca3af" : coin.positive ? "#22c55e" : "#ef4444",
                    marginTop: "0.1rem",
                  }}
                >
                  {coin.positive !== null && (coin.positive ? "↑ " : "↓ ")}{coin.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
