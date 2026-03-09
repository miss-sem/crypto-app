import { useNavigate } from "react-router-dom";
import Sparkline from "./Sparkline";

function fmtBig(val) {
  if (val == null) return "—";
  if (val >= 1e12) return `GHS ${(val / 1e12).toFixed(2)}T`;
  if (val >= 1e9) return `GHS ${(val / 1e9).toFixed(2)}B`;
  if (val >= 1e6) return `GHS ${(val / 1e6).toFixed(2)}M`;
  return `GHS ${val.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function fmtPrice(val) {
  if (val == null) return "—";
  if (val >= 1000) return `GHS ${val.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (val >= 1) return `GHS ${val.toFixed(4)}`;
  return `GHS ${val.toFixed(6)}`;
}

const thStyle = {
  textAlign: "left",
  padding: "0.65rem 0.75rem",
  fontSize: "0.78rem",
  color: "#6b7280",
  fontWeight: 500,
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "0.85rem 0.75rem",
  verticalAlign: "middle",
};

export default function CryptoTable({ coins, loading, error }) {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div style={{ padding: "3rem 0", textAlign: "center", color: "#6b7280", fontSize: "0.875rem" }}>
        Loading market data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "3rem 0", textAlign: "center" }}>
        <p style={{ color: "#dc2626", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Failed to load market data.
        </p>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>{error}</p>
      </div>
    );
  }

  if (coins.length === 0) {
    return (
      <div style={{ padding: "3rem 0", textAlign: "center", color: "#6b7280", fontSize: "0.875rem" }}>
        No assets found.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}></th>
            <th style={thStyle}>Asset ↕</th>
            <th style={thStyle}>Market price ↕</th>
            <th style={thStyle}>Chart</th>
            <th style={thStyle}>Change ↕</th>
            <th style={{ ...thStyle, color: "#1652f0" }}>Mkt cap ↕</th>
            <th style={thStyle}>Volume ↕</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const change = coin.price_change_percentage_24h ?? 0;
            const pos = change >= 0;
            return (
              <tr
                key={coin.id}
                onClick={() => navigate(`/assets/${coin.id}`)}
                style={{ borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={tdStyle}>
                  <span style={{ color: "#d1d5db", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1 }}>☆</span>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      style={{ width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0 }}
                      onError={(e) => { e.target.style.visibility = "hidden"; }}
                    />
                    <div>
                      <p style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem", margin: 0 }}>{coin.name}</p>
                      <p style={{ color: "#9ca3af", fontSize: "0.72rem", margin: 0 }}>{coin.symbol?.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontSize: "0.875rem", color: "#111827" }}>{fmtPrice(coin.current_price)}</span>
                </td>
                <td style={tdStyle}>
                  <Sparkline prices={coin.sparkline_in_7d?.price} positive={pos} width={80} height={32} />
                </td>
                <td style={tdStyle}>
                  <span style={{ fontSize: "0.875rem", color: pos ? "#16a34a" : "#dc2626" }}>
                    {pos ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontSize: "0.875rem", color: "#111827" }}>{fmtBig(coin.market_cap)}</span>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontSize: "0.875rem", color: "#111827" }}>{fmtBig(coin.total_volume)}</span>
                </td>
                <td style={tdStyle} onClick={(e) => e.stopPropagation()}>
                  {coin.market_cap > 0 && (
                    <button
                      onClick={() => navigate(`/assets/${coin.id}`)}
                      style={{
                        background: "#1652f0",
                        color: "white",
                        border: "none",
                        borderRadius: "9999px",
                        padding: "0.35rem 1rem",
                        fontWeight: 600,
                        fontSize: "0.78rem",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Trade
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
