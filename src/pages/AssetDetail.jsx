import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAssetDetail, useAssetHistory, useCoinsMarkets } from "../hooks/useCryptoData";

// ─── Formatters ───────────────────────────────────────────────────────────────
function fmtPrice(val) {
  if (val == null) return "—";
  if (val >= 1000) return `GHS ${val.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (val >= 1) return `GHS ${val.toFixed(4)}`;
  return `GHS ${val.toFixed(6)}`;
}

function fmtBig(val) {
  if (val == null) return "—";
  if (val >= 1e12) return `GHS ${(val / 1e12).toFixed(2)}T`;
  if (val >= 1e9)  return `GHS ${(val / 1e9).toFixed(2)}B`;
  if (val >= 1e6)  return `GHS ${(val / 1e6).toFixed(2)}M`;
  return `GHS ${val.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function fmtSupply(val, symbol) {
  if (!val) return "—";
  if (val >= 1e9)  return `${(val / 1e9).toFixed(2)}B ${symbol}`;
  if (val >= 1e6)  return `${(val / 1e6).toFixed(2)}M ${symbol}`;
  if (val >= 1e3)  return `${(val / 1e3).toFixed(2)}K ${symbol}`;
  return `${val.toLocaleString("en-US", { maximumFractionDigits: 0 })} ${symbol}`;
}

// ─── Coin descriptions ────────────────────────────────────────────────────────
const COIN_DESCRIPTIONS = {
  bitcoin: "Bitcoin (BTC) is the world's first decentralized cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto. It operates on a peer-to-peer network secured by proof-of-work, with a hard-capped supply of 21 million coins — making it the digital equivalent of gold.",
  ethereum: "Ethereum (ETH) is a decentralized blockchain platform enabling smart contracts and decentralized applications (dApps). Founded by Vitalik Buterin in 2015, it transitioned to proof-of-stake in 2022 and remains the leading platform for DeFi protocols and NFTs.",
  tether: "Tether (USDT) is the world's largest stablecoin by market cap, pegged 1:1 to the US Dollar. It provides a stable medium for traders and investors to move funds across exchanges without exposure to cryptocurrency price volatility.",
  bnb: "BNB is the native utility token of the BNB Chain ecosystem, originally launched by Binance. It is used for transaction fees on Binance's CEX and DEX, participation in token sales, and accessing various DeFi services on BNB Smart Chain.",
  xrp: "XRP is the native digital asset of the XRP Ledger, designed for fast and cost-efficient cross-border payments. Ripple Labs uses XRP to enable financial institutions to settle international transactions in seconds.",
  "usd-coin": "USD Coin (USDC) is a fully-reserved stablecoin backed 1:1 by US dollars held in regulated financial institutions. Developed by Circle and Coinbase, it offers transparency and compliance for digital dollar transactions.",
  solana: "Solana (SOL) is a high-performance blockchain supporting thousands of transactions per second at near-zero fees. Its unique proof-of-history consensus mechanism makes it one of the fastest smart contract platforms in existence.",
  tron: "TRON (TRX) is a blockchain platform designed for decentralized entertainment and content sharing. It aims to build a free, global digital content entertainment system with distributed storage technology.",
  dogecoin: "Dogecoin (DOGE) started as a meme-inspired cryptocurrency in 2013 but evolved into a widely-used tipping and micro-payment currency. Its active community and low transaction fees have given it lasting relevance.",
  cardano: "Cardano (ADA) is a proof-of-stake blockchain platform built on peer-reviewed research and formal verification methods. Founded by Ethereum co-founder Charles Hoskinson, it emphasizes security, scalability, and sustainability.",
  avalanche: "Avalanche (AVAX) is a high-throughput smart contract platform capable of processing thousands of TPS with sub-second finality. Its unique consensus mechanism supports multiple custom blockchains within the same ecosystem.",
  chainlink: "Chainlink (LINK) is a decentralized oracle network that connects smart contracts with real-world data, APIs, and payment systems. It is the industry standard for reliable, tamper-proof inputs and outputs for blockchain applications.",
  polkadot: "Polkadot (DOT) enables different blockchains to transfer messages and value in a trust-free fashion — sharing their unique features while pooling their security. It was founded by Ethereum co-creator Gavin Wood.",
  litecoin: "Litecoin (LTC) is one of the earliest altcoins, created in 2011 as a 'lighter' version of Bitcoin with faster block times and a different hashing algorithm. It continues to serve as a fast, low-cost payment network.",
  dai: "Dai (DAI) is a decentralized stablecoin soft-pegged to the US Dollar, generated through the MakerDAO protocol by over-collateralizing crypto assets. It remains one of the most widely used DeFi stablecoins.",
  uniswap: "Uniswap (UNI) is the governance token of the Uniswap protocol — the leading decentralized exchange on Ethereum. UNI holders vote on protocol upgrades and fee structures for the automated market maker.",
  stellar: "Stellar (XLM) is an open-source network designed to facilitate cross-asset transfers and payments, especially for the unbanked. The Stellar Development Foundation supports its mission of financial inclusion.",
  "bitcoin-cash": "Bitcoin Cash (BCH) is a fork of Bitcoin created in 2017 to increase the block size limit, enabling faster and cheaper transactions. It aims to serve as a peer-to-peer electronic cash system for everyday payments.",
  monero: "Monero (XMR) is a privacy-focused cryptocurrency that uses ring signatures, stealth addresses, and RingCT to obscure sender, recipient, and transaction amounts. It is the leading privacy coin by market capitalization.",
  "ethereum-classic": "Ethereum Classic (ETC) is the original Ethereum chain that continued after the 2016 DAO hack and subsequent hard fork. It maintains the principle of immutability — 'code is law' — on its unaltered blockchain.",
};

// ─── Area Chart ───────────────────────────────────────────────────────────────
function AreaChart({ prices, positive, loading }) {
  const W = 600;
  const H = 220;
  const PAD = { top: 12, right: 8, bottom: 28, left: 8 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  if (loading) {
    return (
      <div style={{ height: H, background: "linear-gradient(90deg, #f3f4f6 25%, #e9ecef 50%, #f3f4f6 75%)", backgroundSize: "200% 100%", borderRadius: "0.5rem", animation: "shimmer 1.5s infinite" }} />
    );
  }

  if (!prices || prices.length < 2) {
    return <div style={{ height: H, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: "0.85rem" }}>No chart data available</div>;
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const toX = (i) => PAD.left + (i / (prices.length - 1)) * innerW;
  const toY = (p) => PAD.top + innerH - ((p - min) / range) * innerH;

  const linePts = prices.map((p, i) => `${toX(i)},${toY(p)}`).join(" ");
  const areaPath = [
    `M ${toX(0)},${PAD.top + innerH}`,
    ...prices.map((p, i) => `L ${toX(i)},${toY(p)}`),
    `L ${toX(prices.length - 1)},${PAD.top + innerH}`,
    "Z",
  ].join(" ");

  const color = positive ? "#16a34a" : "#dc2626";
  const gradId = positive ? "area-grad-green" : "area-grad-red";
  const gradColor = positive ? "#16a34a" : "#dc2626";

  // Y-axis labels (min / max)
  const yMax = fmtPrice(max);
  const yMin = fmtPrice(min);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: `${H}px`, display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={gradColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={gradColor} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradId})`} />
      {/* Line */}
      <polyline points={linePts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {/* Y labels */}
      <text x={W - PAD.right} y={PAD.top + 10} textAnchor="end" fontSize="9" fill="#9ca3af">{yMax}</text>
      <text x={W - PAD.right} y={PAD.top + innerH - 4} textAnchor="end" fontSize="9" fill="#9ca3af">{yMin}</text>
    </svg>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ w = "100%", h = 16, mb = 8, radius = 4 }) {
  return (
    <div style={{ width: w, height: h, background: "#e5e7eb", borderRadius: radius, marginBottom: mb }} />
  );
}

function LoadingSkeleton() {
  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 2.5rem" }} className="page-pad">
        <Skeleton w={180} h={14} mb={24} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem" }}>
          <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
              <Skeleton w={48} h={48} radius={24} mb={0} />
              <div style={{ flex: 1 }}>
                <Skeleton w={160} h={22} mb={6} />
                <Skeleton w={80} h={14} mb={0} />
              </div>
            </div>
            <Skeleton w={260} h={40} mb={6} />
            <Skeleton w={100} h={18} mb={24} />
            <Skeleton w="100%" h={220} mb={24} radius={8} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
              {[1,2,3,4].map(i => <Skeleton key={i} w="100%" h={64} mb={0} radius={8} />)}
            </div>
          </div>
          <div>
            <Skeleton w="100%" h={200} mb={16} radius={16} />
            <Skeleton w="100%" h={160} mb={0} radius={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatItem({ label, value, sub }) {
  return (
    <div style={{ padding: "1rem", background: "#f9fafb", borderRadius: "0.75rem", border: "1px solid #e5e7eb" }}>
      <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: "0 0 0.25rem" }}>{label}</p>
      <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", margin: 0 }}>{value}</p>
      {sub && <p style={{ fontSize: "0.72rem", color: "#9ca3af", margin: "0.15rem 0 0" }}>{sub}</p>}
    </div>
  );
}

// ─── Timeframes ───────────────────────────────────────────────────────────────
const TIMEFRAMES = ["1H", "1D", "1W", "1M", "1Y"];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [timeframe, setTimeframe] = useState("1D");
  const [buyAmount, setBuyAmount] = useState("");
  const [activeTab, setActiveTab] = useState("buy");

  const { asset, loading: assetLoading } = useAssetDetail(id);
  const { prices, loading: histLoading } = useAssetHistory(id, timeframe);
  const { coins } = useCoinsMarkets(15);

  const relatedCoins = useMemo(
    () => coins.filter((c) => c.id !== id).slice(0, 4),
    [coins, id]
  );

  const estimatedCoins = useMemo(() => {
    if (!buyAmount || !asset?.current_price) return null;
    const amt = parseFloat(buyAmount);
    if (isNaN(amt) || amt <= 0) return null;
    return (amt / asset.current_price).toFixed(8);
  }, [buyAmount, asset?.current_price]);

  if (assetLoading) return <LoadingSkeleton />;
  if (!asset) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <p style={{ fontSize: "1.1rem", color: "#374151" }}>Asset not found.</p>
        <button onClick={() => navigate("/explore")} style={{ background: "#1652f0", color: "white", border: "none", borderRadius: "9999px", padding: "0.5rem 1.5rem", cursor: "pointer", fontWeight: 600 }}>
          Back to Explore
        </button>
      </div>
    );
  }

  const pos = (asset.price_change_percentage_24h ?? 0) >= 0;
  const changeColor = pos ? "#16a34a" : "#dc2626";
  const desc = COIN_DESCRIPTIONS[id] || `${asset.name} (${asset.symbol}) is a decentralized digital currency that enables secure and fast transactions on a distributed blockchain network.`;

  // Supply utilization %
  const supplyPct = asset.maxSupply && asset.supply ? (asset.supply / asset.maxSupply) * 100 : null;

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem 2.5rem" }} className="page-pad">

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "#6b7280", marginBottom: "1.5rem" }}>
          <Link to="/explore" style={{ color: "#1652f0", textDecoration: "none", fontWeight: 500 }}>Explore</Link>
          <span>›</span>
          <span style={{ color: "#374151" }}>{asset.name}</span>
          <span>›</span>
          <span>{asset.symbol} Price</span>
        </nav>

        {/* Two-column layout */}
        <div className="two-col-layout" style={{ gridTemplateColumns: "1fr 320px" }}>

          {/* ===== MAIN ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Header card */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #e5e7eb" }}>
              {/* Coin identity */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <img
                  src={asset.image}
                  alt={asset.name}
                  style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0 }}
                  onError={(e) => { e.target.style.visibility = "hidden"; }}
                />
                <div>
                  <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111827", margin: "0 0 0.15rem" }}>
                    {asset.name}
                  </h1>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.78rem", background: "#f3f4f6", color: "#6b7280", borderRadius: "0.375rem", padding: "0.1rem 0.5rem", fontWeight: 600 }}>
                      {asset.symbol}
                    </span>
                    {asset.rank && (
                      <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Rank #{asset.rank}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", margin: "0 0 0.2rem", letterSpacing: "-0.5px" }}>
                  {fmtPrice(asset.current_price)}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "0.2rem",
                    background: pos ? "#dcfce7" : "#fee2e2",
                    color: changeColor,
                    borderRadius: "9999px",
                    padding: "0.25rem 0.65rem",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}>
                    {pos ? "▲" : "▼"} {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>24h</span>
                </div>
              </div>

              {/* Timeframe selector */}
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    style={{
                      padding: "0.35rem 0.75rem",
                      border: "none",
                      borderRadius: "9999px",
                      background: timeframe === tf ? "#111827" : "transparent",
                      color: timeframe === tf ? "white" : "#6b7280",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Area chart */}
              <AreaChart prices={prices} positive={pos} loading={histLoading} />
            </div>

            {/* Stats card */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", margin: "0 0 1rem" }}>
                {asset.name} statistics
              </h2>
              <div className="stat-grid-2">
                <StatItem label="Market cap" value={fmtBig(asset.market_cap)} />
                <StatItem label="24h trading volume" value={fmtBig(asset.total_volume)} />
                <StatItem
                  label="Circulating supply"
                  value={fmtSupply(asset.supply, asset.symbol)}
                  sub={supplyPct ? `${supplyPct.toFixed(1)}% of max supply` : null}
                />
                <StatItem
                  label="Max supply"
                  value={asset.maxSupply ? fmtSupply(asset.maxSupply, asset.symbol) : "∞ Unlimited"}
                />
              </div>

              {/* Supply bar */}
              {supplyPct != null && (
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#9ca3af", marginBottom: "0.3rem" }}>
                    <span>Circulating supply</span>
                    <span>{supplyPct.toFixed(1)}%</span>
                  </div>
                  <div style={{ height: "6px", background: "#f3f4f6", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(supplyPct, 100)}%`, background: "#1652f0", borderRadius: "9999px" }} />
                  </div>
                </div>
              )}
            </div>

            {/* About card */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", margin: "0 0 0.75rem" }}>
                About {asset.name}
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.7, margin: 0 }}>
                {desc}
              </p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
                <a href="#" style={{ fontSize: "0.78rem", color: "#1652f0", textDecoration: "none", fontWeight: 500 }}>
                  Whitepaper ↗
                </a>
                <a href="#" style={{ fontSize: "0.78rem", color: "#1652f0", textDecoration: "none", fontWeight: 500 }}>
                  Official website ↗
                </a>
                <a href="#" style={{ fontSize: "0.78rem", color: "#1652f0", textDecoration: "none", fontWeight: 500 }}>
                  Block explorer ↗
                </a>
              </div>
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "sticky", top: "80px" }}>

            {/* Buy / Sell card */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.25rem", border: "1px solid #e5e7eb" }}>
              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", marginBottom: "1.25rem" }}>
                {["buy", "sell", "convert"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: "0.6rem 0",
                      border: "none",
                      background: "none",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      color: activeTab === tab ? "#111827" : "#9ca3af",
                      borderBottom: activeTab === tab ? "2px solid #111827" : "2px solid transparent",
                      marginBottom: "-1px",
                      textTransform: "capitalize",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Current price display */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.78rem", color: "#6b7280" }}>
                  {asset.symbol} price
                </span>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>
                    {fmtPrice(asset.current_price)}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: changeColor, marginLeft: "0.35rem" }}>
                    {pos ? "+" : ""}{asset.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Amount input */}
              <div style={{ marginBottom: "0.75rem" }}>
                <label style={{ fontSize: "0.75rem", color: "#6b7280", display: "block", marginBottom: "0.35rem" }}>
                  Amount (GHS)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#111827",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Estimated coins */}
              {estimatedCoins && (
                <div style={{ background: "#f9fafb", borderRadius: "0.5rem", padding: "0.65rem 0.75rem", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", color: "#6b7280" }}>You receive</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111827" }}>
                    {estimatedCoins} {asset.symbol}
                  </span>
                </div>
              )}

              {/* CTA */}
              <button
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "#1652f0",
                  color: "white",
                  border: "none",
                  borderRadius: "9999px",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                }}
              >
                {activeTab === "buy" ? `Buy ${asset.symbol}` : activeTab === "sell" ? `Sell ${asset.symbol}` : `Convert ${asset.symbol}`}
              </button>
              <p style={{ fontSize: "0.7rem", color: "#9ca3af", textAlign: "center", margin: 0 }}>
                By continuing you agree to our Terms of Service
              </p>
            </div>

            {/* Related assets */}
            {relatedCoins.length > 0 && (
              <div style={{ background: "white", borderRadius: "1rem", padding: "1.25rem", border: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827", margin: "0 0 0.75rem" }}>
                  More to explore
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {relatedCoins.map((coin, idx) => {
                    const p = (coin.price_change_percentage_24h ?? 0) >= 0;
                    return (
                      <div
                        key={coin.id}
                        onClick={() => navigate(`/assets/${coin.id}`)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem",
                          padding: "0.7rem 0",
                          borderBottom: idx < relatedCoins.length - 1 ? "1px solid #f3f4f6" : "none",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={coin.image}
                          alt={coin.name}
                          style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0 }}
                          onError={(e) => { e.target.style.visibility = "hidden"; }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#111827", margin: "0 0 0.05rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {coin.name}
                          </p>
                          <p style={{ fontSize: "0.72rem", color: "#9ca3af", margin: 0 }}>{coin.symbol?.toUpperCase()}</p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#111827", margin: "0 0 0.05rem" }}>
                            {fmtPrice(coin.current_price)}
                          </p>
                          <p style={{ fontSize: "0.72rem", color: p ? "#16a34a" : "#dc2626", margin: 0 }}>
                            {p ? "+" : ""}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link
                  to="/explore"
                  style={{ display: "block", textAlign: "center", fontSize: "0.8rem", color: "#1652f0", textDecoration: "none", fontWeight: 600, marginTop: "0.75rem" }}
                >
                  View all assets →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
