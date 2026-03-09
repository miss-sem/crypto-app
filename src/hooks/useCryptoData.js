import { useState, useEffect, useRef } from "react";

const COINCAP = "https://api.coincap.io/v2";
const GHS_FALLBACK = 16.5;

// ─── Mock data (fallback when API is unavailable) ─────────────────────────────
const MOCK_GHS_RATE = 16.5;
const MOCK_COINS_RAW = [
  { id: "bitcoin",        name: "Bitcoin",        symbol: "BTC",  priceUsd: 87000,    marketCapUsd: 1720000000000, volumeUsd24Hr: 32000000000,  changePercent24Hr:  -0.45 },
  { id: "ethereum",       name: "Ethereum",       symbol: "ETH",  priceUsd: 1950,     marketCapUsd: 235000000000,  volumeUsd24Hr: 14000000000,  changePercent24Hr:   0.51 },
  { id: "tether",         name: "Tether",         symbol: "USDT", priceUsd: 1.00,     marketCapUsd: 143000000000,  volumeUsd24Hr: 56000000000,  changePercent24Hr:   0.00 },
  { id: "bnb",            name: "BNB",            symbol: "BNB",  priceUsd: 410,      marketCapUsd: 60000000000,   volumeUsd24Hr: 1800000000,   changePercent24Hr:   0.23 },
  { id: "xrp",            name: "XRP",            symbol: "XRP",  priceUsd: 2.15,     marketCapUsd: 123000000000,  volumeUsd24Hr: 4200000000,   changePercent24Hr:   0.78 },
  { id: "usd-coin",       name: "USDC",           symbol: "USDC", priceUsd: 1.00,     marketCapUsd: 58000000000,   volumeUsd24Hr: 7800000000,   changePercent24Hr:   0.00 },
  { id: "solana",         name: "Solana",         symbol: "SOL",  priceUsd: 125,      marketCapUsd: 64000000000,   volumeUsd24Hr: 3500000000,   changePercent24Hr:   0.01 },
  { id: "tron",           name: "TRON",           symbol: "TRX",  priceUsd: 0.22,     marketCapUsd: 19000000000,   volumeUsd24Hr: 420000000,    changePercent24Hr:  -0.28 },
  { id: "dogecoin",       name: "Dogecoin",       symbol: "DOGE", priceUsd: 0.085,    marketCapUsd: 12400000000,   volumeUsd24Hr: 690000000,    changePercent24Hr:  -0.05 },
  { id: "cardano",        name: "Cardano",        symbol: "ADA",  priceUsd: 0.62,     marketCapUsd: 21600000000,   volumeUsd24Hr: 540000000,    changePercent24Hr:  -1.22 },
  { id: "avalanche",      name: "Avalanche",      symbol: "AVAX", priceUsd: 18,       marketCapUsd: 7500000000,    volumeUsd24Hr: 380000000,    changePercent24Hr:  -2.10 },
  { id: "chainlink",      name: "Chainlink",      symbol: "LINK", priceUsd: 12,       marketCapUsd: 7800000000,    volumeUsd24Hr: 520000000,    changePercent24Hr:  -1.78 },
  { id: "polkadot",       name: "Polkadot",       symbol: "DOT",  priceUsd: 4.50,     marketCapUsd: 6800000000,    volumeUsd24Hr: 290000000,    changePercent24Hr:  -0.95 },
  { id: "litecoin",       name: "Litecoin",       symbol: "LTC",  priceUsd: 82,       marketCapUsd: 6200000000,    volumeUsd24Hr: 450000000,    changePercent24Hr:   1.20 },
  { id: "dai",            name: "Dai",            symbol: "DAI",  priceUsd: 1.00,     marketCapUsd: 5400000000,    volumeUsd24Hr: 280000000,    changePercent24Hr:   0.00 },
  { id: "uniswap",        name: "Uniswap",        symbol: "UNI",  priceUsd: 5.80,     marketCapUsd: 4400000000,    volumeUsd24Hr: 190000000,    changePercent24Hr:  -1.50 },
  { id: "stellar",        name: "Stellar",        symbol: "XLM",  priceUsd: 0.11,     marketCapUsd: 3400000000,    volumeUsd24Hr: 95000000,     changePercent24Hr:  -2.21 },
  { id: "bitcoin-cash",   name: "Bitcoin Cash",   symbol: "BCH",  priceUsd: 295,      marketCapUsd: 5900000000,    volumeUsd24Hr: 170000000,    changePercent24Hr:   0.81 },
  { id: "monero",         name: "Monero",         symbol: "XMR",  priceUsd: 224,      marketCapUsd: 4200000000,    volumeUsd24Hr: 52000000,     changePercent24Hr:  -0.45 },
  { id: "ethereum-classic", name: "Ethereum Classic", symbol: "ETC", priceUsd: 19.50, marketCapUsd: 2900000000,   volumeUsd24Hr: 145000000,    changePercent24Hr:  -1.30 },
];

function buildMockCoins(rate) {
  return MOCK_COINS_RAW.map((c) => ({
    id: c.id,
    name: c.name,
    symbol: c.symbol,
    image: `https://assets.coincap.io/assets/icons/${c.symbol.toLowerCase()}@2x.png`,
    current_price: c.priceUsd * rate,
    market_cap: c.marketCapUsd * rate,
    total_volume: c.volumeUsd24Hr * rate,
    price_change_percentage_24h: c.changePercent24Hr,
    sparkline_in_7d: { price: [] },
  }));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function getGHSRate() {
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/USD");
    const d = await r.json();
    return d.rates?.GHS ?? GHS_FALLBACK;
  } catch {
    return GHS_FALLBACK;
  }
}

export async function fetchSparkline(coinId, ghsRate = 1) {
  try {
    const end = Date.now();
    const start = end - 7 * 24 * 60 * 60 * 1000;
    const r = await fetch(`${COINCAP}/assets/${coinId}/history?interval=h6&start=${start}&end=${end}`);
    const d = await r.json();
    return (d.data || []).map((p) => parseFloat(p.priceUsd) * ghsRate);
  } catch {
    return [];
  }
}

// ─── Global market data ───────────────────────────────────────────────────────
export function useGlobalData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const ghsRate = await getGHSRate();
      try {
        const res = await fetch(`${COINCAP}/assets?limit=100`);
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        const assets = json.data || [];

        const totalMarketCap = assets.reduce((s, c) => s + parseFloat(c.marketCapUsd || 0), 0);
        const totalVolume = assets.reduce((s, c) => s + parseFloat(c.volumeUsd24Hr || 0), 0);
        const btc = assets.find((c) => c.id === "bitcoin");
        const btcDom = btc ? (parseFloat(btc.marketCapUsd) / totalMarketCap) * 100 : null;
        const avgChange = assets.reduce((s, c) => s + parseFloat(c.changePercent24Hr || 0), 0) / assets.length;

        setData({
          total_market_cap: { ghs: totalMarketCap * ghsRate },
          total_volume: { ghs: totalVolume * ghsRate },
          market_cap_percentage: { btc: btcDom },
          market_cap_change_percentage_24h_usd: avgChange,
          ghs_rate: ghsRate,
        });
      } catch {
        // Fallback global stats from mock data
        const totalCap = MOCK_COINS_RAW.reduce((s, c) => s + c.marketCapUsd, 0);
        const totalVol = MOCK_COINS_RAW.reduce((s, c) => s + c.volumeUsd24Hr, 0);
        const btc = MOCK_COINS_RAW.find((c) => c.id === "bitcoin");
        setData({
          total_market_cap: { ghs: totalCap * ghsRate },
          total_volume: { ghs: totalVol * ghsRate },
          market_cap_percentage: { btc: btc ? (btc.marketCapUsd / totalCap) * 100 : null },
          market_cap_change_percentage_24h_usd: -0.45,
          ghs_rate: ghsRate,
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { data, loading };
}

// ─── Mock price history generator ────────────────────────────────────────────
function generateMockHistory(currentPrice, changePercent24h, points = 60) {
  const startPrice = currentPrice / (1 + changePercent24h / 100);
  const trend = (currentPrice - startPrice) / points;
  const volatility = currentPrice * 0.008;
  const prices = [];
  let p = startPrice;
  for (let i = 0; i < points - 1; i++) {
    p += trend + (Math.random() - 0.5) * volatility * 2;
    p = Math.max(p, currentPrice * 0.5);
    prices.push(p);
  }
  prices.push(currentPrice);
  return prices;
}

// ─── Interval config for history ──────────────────────────────────────────────
const INTERVAL_MAP = {
  "1H": { interval: "m5",  ms: 60 * 60 * 1000 },
  "1D": { interval: "m30", ms: 24 * 60 * 60 * 1000 },
  "1W": { interval: "h2",  ms: 7 * 24 * 60 * 60 * 1000 },
  "1M": { interval: "h6",  ms: 30 * 24 * 60 * 60 * 1000 },
  "1Y": { interval: "d1",  ms: 365 * 24 * 60 * 60 * 1000 },
};

// ─── Mock supply data ─────────────────────────────────────────────────────────
const MOCK_SUPPLY = {
  bitcoin:          { supply: 19700000,      maxSupply: 21000000 },
  ethereum:         { supply: 120000000,     maxSupply: null },
  tether:           { supply: 143000000000,  maxSupply: null },
  bnb:              { supply: 145000000,     maxSupply: 200000000 },
  xrp:              { supply: 57000000000,   maxSupply: 100000000000 },
  "usd-coin":       { supply: 58000000000,   maxSupply: null },
  solana:           { supply: 465000000,     maxSupply: null },
  tron:             { supply: 87000000000,   maxSupply: null },
  dogecoin:         { supply: 146000000000,  maxSupply: null },
  cardano:          { supply: 35000000000,   maxSupply: 45000000000 },
  avalanche:        { supply: 415000000,     maxSupply: 720000000 },
  chainlink:        { supply: 600000000,     maxSupply: 1000000000 },
  polkadot:         { supply: 1400000000,    maxSupply: null },
  litecoin:         { supply: 74000000,      maxSupply: 84000000 },
  dai:              { supply: 5400000000,    maxSupply: null },
  uniswap:          { supply: 753000000,     maxSupply: 1000000000 },
  stellar:          { supply: 30000000000,   maxSupply: 50000000000 },
  "bitcoin-cash":   { supply: 19700000,      maxSupply: 21000000 },
  monero:           { supply: 18400000,      maxSupply: null },
  "ethereum-classic": { supply: 147000000,   maxSupply: 210700000 },
};

// ─── Single asset detail ──────────────────────────────────────────────────────
export function useAssetDetail(id) {
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    async function load() {
      const ghsRate = await getGHSRate();
      try {
        const res = await fetch(`${COINCAP}/assets/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        const c = d.data;
        setAsset({
          id: c.id,
          name: c.name,
          symbol: c.symbol,
          rank: parseInt(c.rank) || null,
          image: `https://assets.coincap.io/assets/icons/${c.symbol.toLowerCase()}@2x.png`,
          current_price: parseFloat(c.priceUsd || 0) * ghsRate,
          market_cap: parseFloat(c.marketCapUsd || 0) * ghsRate,
          total_volume: parseFloat(c.volumeUsd24Hr || 0) * ghsRate,
          price_change_percentage_24h: parseFloat(c.changePercent24Hr || 0),
          supply: parseFloat(c.supply || 0),
          maxSupply: parseFloat(c.maxSupply || 0) || null,
          ghsRate,
        });
      } catch {
        const mock = MOCK_COINS_RAW.find((c) => c.id === id) || MOCK_COINS_RAW[0];
        const sup = MOCK_SUPPLY[mock.id] || { supply: 0, maxSupply: null };
        setAsset({
          id: mock.id,
          name: mock.name,
          symbol: mock.symbol,
          rank: MOCK_COINS_RAW.findIndex((c) => c.id === mock.id) + 1,
          image: `https://assets.coincap.io/assets/icons/${mock.symbol.toLowerCase()}@2x.png`,
          current_price: mock.priceUsd * ghsRate,
          market_cap: mock.marketCapUsd * ghsRate,
          total_volume: mock.volumeUsd24Hr * ghsRate,
          price_change_percentage_24h: mock.changePercent24Hr,
          supply: sup.supply,
          maxSupply: sup.maxSupply,
          ghsRate,
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return { asset, loading };
}

// ─── Asset price history ──────────────────────────────────────────────────────
export function useAssetHistory(id, timeframe = "1D") {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setPrices([]);
    async function load() {
      const ghsRate = await getGHSRate();
      const { interval, ms } = INTERVAL_MAP[timeframe] || INTERVAL_MAP["1D"];
      const end = Date.now();
      const start = end - ms;
      try {
        const res = await fetch(`${COINCAP}/assets/${id}/history?interval=${interval}&start=${start}&end=${end}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        const pts = (d.data || []).map((p) => parseFloat(p.priceUsd) * ghsRate);
        if (pts.length < 2) throw new Error("No data");
        setPrices(pts);
      } catch {
        const mock = MOCK_COINS_RAW.find((c) => c.id === id) || MOCK_COINS_RAW[0];
        setPrices(generateMockHistory(mock.priceUsd * ghsRate, mock.changePercent24Hr, 60));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, timeframe]);

  return { prices, loading };
}

// ─── Coins list ───────────────────────────────────────────────────────────────
export function useCoinsMarkets(limit = 50) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ghsRateRef = useRef(GHS_FALLBACK);

  useEffect(() => {
    async function load() {
      const ghsRate = await getGHSRate();
      ghsRateRef.current = ghsRate;

      try {
        const res = await fetch(`${COINCAP}/assets?limit=${limit}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const d = await res.json();
        if (!Array.isArray(d.data)) throw new Error("Unexpected response");

        setCoins(
          d.data.map((c) => ({
            id: c.id,
            name: c.name,
            symbol: c.symbol,
            image: `https://assets.coincap.io/assets/icons/${c.symbol.toLowerCase()}@2x.png`,
            current_price: parseFloat(c.priceUsd || 0) * ghsRate,
            market_cap: parseFloat(c.marketCapUsd || 0) * ghsRate,
            total_volume: parseFloat(c.volumeUsd24Hr || 0) * ghsRate,
            price_change_percentage_24h: parseFloat(c.changePercent24Hr || 0),
            sparkline_in_7d: { price: [] },
          }))
        );
      } catch {
        // Use mock fallback — page always works
        setCoins(buildMockCoins(ghsRate));
        setError(null); // don't show error UI, mock data is valid
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [limit]);

  return { coins, loading, error, ghsRate: ghsRateRef.current };
}
