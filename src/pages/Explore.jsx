import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalData, useCoinsMarkets, fetchSparkline } from "../hooks/useCryptoData";
import Sparkline from "../components/crypto/Sparkline";
import CryptoTable from "../components/crypto/CryptoTable";

function fmtBig(val) {
  if (val == null) return "—";
  if (val >= 1e12) return `GHS ${(val / 1e12).toFixed(2)}T`;
  if (val >= 1e9) return `GHS ${(val / 1e9).toFixed(2)}B`;
  if (val >= 1e6) return `GHS ${(val / 1e6).toFixed(2)}M`;
  return `GHS ${val.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function StatCard({ label, value, change, sparkline, loading }) {
  if (loading) {
    return (
      <div style={{ background: "#f9fafb", borderRadius: "0.75rem", padding: "1rem", border: "1px solid #e5e7eb" }}>
        <div style={{ height: "10px", background: "#e5e7eb", borderRadius: "4px", width: "55%", marginBottom: "0.5rem" }} />
        <div style={{ height: "18px", background: "#e5e7eb", borderRadius: "4px", width: "75%", marginBottom: "0.4rem" }} />
        <div style={{ height: "10px", background: "#e5e7eb", borderRadius: "4px", width: "40%" }} />
      </div>
    );
  }
  const pos = (change ?? 0) >= 0;
  return (
    <div style={{ background: "#f9fafb", borderRadius: "0.75rem", padding: "1rem", border: "1px solid #e5e7eb" }}>
      <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: "0 0 0.2rem" }}>{label}</p>
      <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", margin: "0 0 0.15rem" }}>{value}</p>
      {change != null && (
        <p style={{ fontSize: "0.75rem", color: pos ? "#16a34a" : "#dc2626", margin: "0 0 0.5rem" }}>
          {pos ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%
        </p>
      )}
      <Sparkline prices={sparkline} positive={pos} width={150} height={40} />
    </div>
  );
}

const ASSET_OPTIONS = [
  { value: "all", label: "All assets" },
  { value: "tradeable", label: "Tradeable" },
  { value: "new", label: "New" },
  { value: "gainers", label: "Gainers" },
  { value: "losers", label: "Losers" },
];

const TIMEFRAME_OPTIONS = ["1H", "1D", "1W", "1M", "1Y"];
const ROWS_OPTIONS = [10, 30, 50];

const CURRENCIES = [
  { code: "AED", name: "UAE Dirham" }, { code: "AUD", name: "Australian Dollar" },
  { code: "BRL", name: "Brazilian Real" }, { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" }, { code: "CNY", name: "Chinese Yuan" },
  { code: "CZK", name: "Czech Koruna" }, { code: "DKK", name: "Danish Krone" },
  { code: "EUR", name: "Euro" }, { code: "GBP", name: "British Pound" },
  { code: "GHS", name: "Ghanaian Cedi" }, { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HUF", name: "Hungarian Forint" }, { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli Shekel" }, { code: "INR", name: "Indian Rupee" },
  { code: "JPY", name: "Japanese Yen" }, { code: "KES", name: "Kenyan Shilling" },
  { code: "KRW", name: "South Korean Won" }, { code: "MXN", name: "Mexican Peso" },
  { code: "MYR", name: "Malaysian Ringgit" }, { code: "NGN", name: "Nigerian Naira" },
  { code: "NOK", name: "Norwegian Krone" }, { code: "NZD", name: "New Zealand Dollar" },
  { code: "PHP", name: "Philippine Peso" }, { code: "PKR", name: "Pakistani Rupee" },
  { code: "PLN", name: "Polish Zloty" }, { code: "RON", name: "Romanian Leu" },
  { code: "SAR", name: "Saudi Riyal" }, { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" }, { code: "THB", name: "Thai Baht" },
  { code: "TRY", name: "Turkish Lira" }, { code: "TWD", name: "Taiwan Dollar" },
  { code: "UAH", name: "Ukrainian Hryvnia" }, { code: "USD", name: "US Dollar" },
  { code: "VND", name: "Vietnamese Dong" }, { code: "ZAR", name: "South African Rand" },
  { code: "ZMW", name: "Zambian Kwacha" },
];

const ddMenu = {
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  zIndex: 200,
  background: "white",
  borderRadius: "0.75rem",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  minWidth: "160px",
  overflow: "hidden",
};

function ddItem(active) {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0.6rem 0.85rem",
    background: active ? "#f0f4ff" : "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.85rem",
    color: active ? "#1652f0" : "#111827",
    fontWeight: active ? 600 : 400,
    textAlign: "left",
    whiteSpace: "nowrap",
  };
}

function FilterPill({ children, onClick, open }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.4rem 0.85rem",
        border: `1px solid ${open ? "#1652f0" : "#e5e7eb"}`,
        borderRadius: "9999px",
        background: open ? "#f0f4ff" : "white",
        fontSize: "0.78rem",
        color: open ? "#1652f0" : "#374151",
        cursor: "pointer",
        whiteSpace: "nowrap",
        fontWeight: 500,
      }}
    >
      {children}
    </button>
  );
}

const arrowBtn = {
  background: "none",
  border: "1px solid #e5e7eb",
  borderRadius: "50%",
  width: "28px",
  height: "28px",
  cursor: "pointer",
  fontSize: "0.8rem",
  color: "#6b7280",
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Explore() {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [assetFilter, setAssetFilter] = useState("all");
  const [timeframe, setTimeframe] = useState("1D");
  const [currencySearch, setCurrencySearch] = useState("");
  const filtersRef = useRef(null);

  const { data: globalData, loading: globalLoading } = useGlobalData();
  const { coins, loading: coinsLoading, error: coinsError, ghsRate } = useCoinsMarkets(50);
  const [sparklines, setSparklines] = useState({});

  // Lazily fetch sparklines for top 12 coins after data loads
  useEffect(() => {
    if (coins.length === 0) return;
    const targets = coins.slice(0, 12);
    targets.forEach((coin, i) => {
      setTimeout(async () => {
        const prices = await fetchSparkline(coin.id, ghsRate);
        if (prices.length > 0) {
          setSparklines((prev) => ({ ...prev, [coin.id]: prices }));
        }
      }, i * 350);
    });
  }, [coins.length]); // eslint-disable-line

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    function handle(e) {
      if (filtersRef.current && !filtersRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setCurrencySearch("");
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openDropdown]);

  const filteredCoins = useMemo(() => {
    let list = [...coins];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
    }
    if (assetFilter === "gainers") {
      list = list.filter((c) => (c.price_change_percentage_24h ?? 0) > 0)
                 .sort((a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0));
    } else if (assetFilter === "losers") {
      list = list.filter((c) => (c.price_change_percentage_24h ?? 0) < 0)
                 .sort((a, b) => (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0));
    }
    return list.slice(0, rowsPerPage);
  }, [coins, search, assetFilter, rowsPerPage]);

  const topMovers = useMemo(
    () =>
      [...coins]
        .sort((a, b) => Math.abs(b.price_change_percentage_24h ?? 0) - Math.abs(a.price_change_percentage_24h ?? 0))
        .slice(0, 4),
    [coins]
  );

  const totalMarketCap = globalData?.total_market_cap?.ghs;
  const totalVolume = globalData?.total_volume?.ghs;
  const btcDominance = globalData?.market_cap_percentage?.btc;
  const marketCapChange = globalData?.market_cap_change_percentage_24h_usd;

  const btcCoin = coins.find((c) => c.id === "bitcoin");
  const ethCoin = coins.find((c) => c.id === "ethereum");
  const btcSparkline = sparklines["bitcoin"] || [];
  const ethSparkline = sparklines["ethereum"] || [];

  const buySellRatio = totalMarketCap && totalVolume ? totalVolume / totalMarketCap : null;
  const marketUp = (marketCapChange ?? 0) >= 0;

  // Top gainers for "New on Coinbase" sidebar
  const topGainers = useMemo(
    () => [...coins].sort((a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0)).slice(0, 4),
    [coins]
  );

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 2.5rem" }} className="page-pad">
        <div className="two-col-layout" style={{ gridTemplateColumns: "1fr 300px" }}>

          {/* ===== MAIN CONTENT ===== */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 style={{ fontSize: "1.85rem", fontWeight: 700, color: "#111827", margin: "0 0 0.25rem" }}>
                Explore crypto
              </h1>
              {!globalLoading && marketCapChange != null && (
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0 }}>
                  Coinbase 50 Index is {marketUp ? "up" : "down"}{" "}
                  <span style={{ color: marketUp ? "#16a34a" : "#dc2626" }}>
                    {marketUp ? "↑" : "↓"}{Math.abs(marketCapChange).toFixed(2)}% (24hrs)
                  </span>{" "}
                  <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>ⓘ</span>
                </p>
              )}

              {/* Search bar */}
              <div style={{ position: "relative", marginTop: "1rem" }}>
                <svg
                  style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for an asset"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 1rem 0.7rem 2.5rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "9999px",
                    background: "white",
                    fontSize: "0.875rem",
                    color: "#111827",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Market Stats */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", margin: "0 0 0.4rem" }}>Market stats</h2>
              <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0 0 0.3rem", lineHeight: 1.6 }}>
                The overall crypto market is {marketUp ? "growing" : "declining"} this week.{" "}
                {totalMarketCap && `As of today, the total crypto market capitalization is ${fmtBig(totalMarketCap)}.`}
              </p>
              <a href="#" style={{ fontSize: "0.8rem", color: "#1652f0", textDecoration: "none" }}>Read more</a>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.4rem", margin: "0.75rem 0" }}>
                <button style={arrowBtn}>←</button>
                <button style={arrowBtn}>→</button>
              </div>

              <div className="stat-grid-4">
                <StatCard
                  label="Total market cap"
                  value={fmtBig(totalMarketCap)}
                  change={marketCapChange}
                  sparkline={btcSparkline}
                  loading={globalLoading || coinsLoading}
                />
                <StatCard
                  label="Trade volume"
                  value={fmtBig(totalVolume)}
                  change={marketCapChange != null ? marketCapChange * 1.4 : null}
                  sparkline={ethSparkline}
                  loading={globalLoading || coinsLoading}
                />
                <StatCard
                  label="Buy-sell ratio"
                  value={buySellRatio != null ? `GHS ${buySellRatio.toFixed(2)}` : "—"}
                  change={marketCapChange != null ? marketCapChange * 0.7 : null}
                  sparkline={btcSparkline ? btcSparkline.slice(0, 80) : null}
                  loading={globalLoading}
                />
                <StatCard
                  label="BTC dominance"
                  value={btcDominance != null ? `${btcDominance.toFixed(2)}%` : "—"}
                  change={btcCoin?.price_change_percentage_24h}
                  sparkline={btcSparkline}
                  loading={globalLoading || coinsLoading}
                />
              </div>
            </div>

            {/* Crypto Market Prices */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", margin: 0 }}>Crypto market prices</h2>
                {coins.length > 0 && (
                  <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{coins.length.toLocaleString()} assets</span>
                )}
              </div>
              <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0 0 0.3rem", lineHeight: 1.6 }}>
                The overall crypto market is {marketUp ? "growing" : "declining"} this week.{" "}
                {totalMarketCap && `Total market cap: ${fmtBig(totalMarketCap)}.`}
              </p>
              <a href="#" style={{ fontSize: "0.8rem", color: "#1652f0", textDecoration: "none" }}>Read more</a>

              {/* Filters */}
              <div ref={filtersRef} style={{ display: "flex", gap: "0.5rem", margin: "1rem 0", flexWrap: "wrap" }}>

                {/* All assets */}
                <div style={{ position: "relative" }}>
                  <FilterPill open={openDropdown === "assets"} onClick={() => setOpenDropdown((o) => o === "assets" ? null : "assets")}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /></svg>
                    {ASSET_OPTIONS.find((o) => o.value === assetFilter)?.label ?? "All assets"} {openDropdown === "assets" ? "▴" : "▾"}
                  </FilterPill>
                  {openDropdown === "assets" && (
                    <div style={ddMenu}>
                      {ASSET_OPTIONS.map((opt) => (
                        <button key={opt.value} style={ddItem(assetFilter === opt.value)} onClick={() => { setAssetFilter(opt.value); setOpenDropdown(null); }}>
                          {opt.label}
                          {assetFilter === opt.value && <span style={{ color: "#1652f0" }}>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timeframe */}
                <div style={{ position: "relative" }}>
                  <FilterPill open={openDropdown === "timeframe"} onClick={() => setOpenDropdown((o) => o === "timeframe" ? null : "timeframe")}>
                    {timeframe} {openDropdown === "timeframe" ? "▴" : "▾"}
                  </FilterPill>
                  {openDropdown === "timeframe" && (
                    <div style={ddMenu}>
                      {TIMEFRAME_OPTIONS.map((t) => (
                        <button key={t} style={ddItem(timeframe === t)} onClick={() => { setTimeframe(t); setOpenDropdown(null); }}>
                          {t}
                          {timeframe === t && <span style={{ color: "#1652f0" }}>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Currency */}
                <div style={{ position: "relative" }}>
                  <FilterPill open={openDropdown === "currency"} onClick={() => setOpenDropdown((o) => o === "currency" ? null : "currency")}>
                    GHS {openDropdown === "currency" ? "▴" : "▾"}
                  </FilterPill>
                  {openDropdown === "currency" && (
                    <div style={{ ...ddMenu, minWidth: "260px" }}>
                      <div style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                        <div style={{ position: "relative" }}>
                          <svg style={{ position: "absolute", left: "0.55rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          <input
                            autoFocus
                            placeholder="Search"
                            value={currencySearch}
                            onChange={(e) => setCurrencySearch(e.target.value)}
                            style={{ width: "100%", padding: "0.4rem 0.5rem 0.4rem 1.8rem", border: "1px solid #e5e7eb", borderRadius: "0.375rem", fontSize: "0.8rem", outline: "none", boxSizing: "border-box" }}
                          />
                        </div>
                      </div>
                      <div style={{ maxHeight: "220px", overflowY: "auto" }}>
                        {CURRENCIES.filter((c) =>
                          c.code.includes(currencySearch.toUpperCase()) ||
                          c.name.toLowerCase().includes(currencySearch.toLowerCase())
                        ).map((c) => (
                          <button key={c.code} style={{ ...ddItem(c.code === "GHS"), display: "block", width: "100%", textAlign: "left" }} onClick={() => setOpenDropdown(null)}>
                            <span style={{ fontWeight: 600, fontSize: "0.82rem", display: "block" }}>{c.code}</span>
                            <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rows */}
                <div style={{ position: "relative" }}>
                  <FilterPill open={openDropdown === "rows"} onClick={() => setOpenDropdown((o) => o === "rows" ? null : "rows")}>
                    {rowsPerPage} rows {openDropdown === "rows" ? "▴" : "▾"}
                  </FilterPill>
                  {openDropdown === "rows" && (
                    <div style={ddMenu}>
                      {ROWS_OPTIONS.map((r) => (
                        <button key={r} style={ddItem(rowsPerPage === r)} onClick={() => { setRowsPerPage(r); setOpenDropdown(null); }}>
                          {r} rows
                          {rowsPerPage === r && <span style={{ color: "#1652f0" }}>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              <CryptoTable
                coins={filteredCoins.map((c) => ({ ...c, sparkline_in_7d: { price: sparklines[c.id] || [] } }))}
                loading={coinsLoading}
                error={coinsError}
              />
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Get started card */}
            <div
              style={{
                background: "#1652f0",
                borderRadius: "1rem",
                padding: "1.25rem",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: "1rem", margin: "0 0 0.2rem" }}>Get started</p>
                <p style={{ fontSize: "0.78rem", opacity: 0.85, margin: "0 0 1rem" }}>Create your account today</p>
                <Link
                  to="/signup"
                  style={{
                    display: "inline-block",
                    background: "white",
                    color: "#111827",
                    borderRadius: "9999px",
                    padding: "0.45rem 1.25rem",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                  }}
                >
                  Sign up
                </Link>
              </div>
              {/* Coin illustration */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="32" cy="32" r="26" fill="rgba(255,255,255,0.15)" />
                <circle cx="32" cy="32" r="18" fill="white" opacity="0.92" />
                <path
                  d="M32 18c-7.73 0-14 6.27-14 14s6.27 14 14 14 14-6.27 14-14-6.27-14-14-14zm0 5.6c4.63 0 8.4 3.77 8.4 8.4s-3.77 8.4-8.4 8.4-8.4-3.77-8.4-8.4 3.77-8.4 8.4-8.4z"
                  fill="#1652f0"
                />
                <circle cx="50" cy="18" r="6" fill="#22c55e" opacity="0.85" />
                <circle cx="14" cy="48" r="4" fill="#94a3b8" opacity="0.7" />
              </svg>
            </div>

            {/* Top Movers */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.25rem", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", margin: 0 }}>Top movers</h3>
                <div style={{ display: "flex", gap: "0.35rem" }}>
                  <button style={arrowBtn}>←</button>
                  <button style={arrowBtn}>→</button>
                </div>
              </div>
              <p style={{ fontSize: "0.72rem", color: "#9ca3af", margin: "0 0 0.75rem" }}>24hr change</p>

              {coinsLoading ? (
                <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Loading...</p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {topMovers.map((coin) => {
                    const pos = (coin.price_change_percentage_24h ?? 0) >= 0;
                    return (
                      <div key={coin.id} style={{ background: "#f9fafb", borderRadius: "0.5rem", padding: "0.75rem" }}>
                        <img
                          src={coin.image}
                          alt={coin.name}
                          style={{ width: "24px", height: "24px", borderRadius: "50%", marginBottom: "0.35rem", display: "block" }}
                        />
                        <p style={{ fontSize: "0.68rem", color: "#9ca3af", margin: "0 0 0.1rem" }}>{coin.symbol?.toUpperCase()}</p>
                        <p style={{ fontSize: "0.875rem", fontWeight: 700, color: pos ? "#16a34a" : "#dc2626", margin: "0 0 0.1rem" }}>
                          {pos ? "↑" : "↓"}{Math.abs(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                        </p>
                        <p style={{ fontSize: "0.72rem", color: "#6b7280", margin: 0 }}>
                          GHS {coin.current_price?.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* New on Coinbase — top gainers */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.25rem", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", margin: 0 }}>New on Coinbase</h3>
                <div style={{ display: "flex", gap: "0.35rem" }}>
                  <button style={arrowBtn}>←</button>
                  <button style={arrowBtn}>→</button>
                </div>
              </div>

              {coinsLoading ? (
                <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Loading...</p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {topGainers.map((coin) => {
                    const pos = (coin.price_change_percentage_24h ?? 0) >= 0;
                    return (
                      <div key={coin.id} style={{ background: "#f9fafb", borderRadius: "0.5rem", padding: "0.75rem" }}>
                        <img
                          src={coin.image}
                          alt={coin.name}
                          style={{ width: "24px", height: "24px", borderRadius: "50%", marginBottom: "0.35rem", display: "block" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <p style={{ fontSize: "0.68rem", color: "#9ca3af", margin: "0 0 0.1rem" }}>{coin.symbol?.toUpperCase()}</p>
                        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827", margin: "0 0 0.1rem" }}>{coin.name}</p>
                        <p style={{ fontSize: "0.72rem", color: pos ? "#16a34a" : "#dc2626", margin: 0 }}>
                          {pos ? "↑" : "↓"}{Math.abs(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
