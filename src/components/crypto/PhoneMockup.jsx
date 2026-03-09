const ChartLine = () => (
  <svg viewBox="0 0 300 100" className="w-full h-24" preserveAspectRatio="none">
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1652f0" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#1652f0" stopOpacity="0" />
      </linearGradient>
      <pattern id="dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1" fill="#1652f0" opacity="0.2" />
      </pattern>
      <clipPath id="chartClip">
        <path d="M0,80 C20,78 30,72 50,68 C70,64 80,70 100,62 C120,54 130,50 150,44 C170,38 180,42 200,34 C220,26 240,20 260,14 C275,10 285,8 300,4 L300,100 L0,100 Z" />
      </clipPath>
    </defs>
    <path
      d="M0,80 C20,78 30,72 50,68 C70,64 80,70 100,62 C120,54 130,50 150,44 C170,38 180,42 200,34 C220,26 240,20 260,14 C275,10 285,8 300,4 L300,100 L0,100 Z"
      fill="url(#chartGrad)"
    />
    <rect x="0" y="0" width="300" height="100" fill="url(#dots)" clipPath="url(#chartClip)" />
    <path
      d="M0,80 C20,78 30,72 50,68 C70,64 80,70 100,62 C120,54 130,50 150,44 C170,38 180,42 200,34 C220,26 240,20 260,14 C275,10 285,8 300,4"
      fill="none"
      stroke="#1652f0"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="300" cy="4" r="9" fill="#1652f0" opacity="0.15" />
    <circle cx="300" cy="4" r="5" fill="#1652f0" />
  </svg>
);

const assetList = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#374151" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9.5h4a1.5 1.5 0 010 3H9m0 0h4.5a1.5 1.5 0 010 3H9M9 9.5V8m0 7.5V17" strokeLinecap="round" />
      </svg>
    ),
    name: "Crypto",
    amount: "$14,186.12",
    change: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#374151" strokeWidth="1.5">
        <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Stocks",
    amount: "$8,133.98",
    change: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#374151" strokeWidth="1.5">
        <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Derivatives",
    amount: "$148.84",
    change: "positive",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#374151" strokeWidth="1.5">
        <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Predictions",
    amount: "$42.69",
    change: "positive",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#374151" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 10h20" strokeLinecap="round" />
      </svg>
    ),
    name: "Cash",
    amount: "$10,124.22",
    change: null,
  },
];

export default function PhoneMockup() {
  return (
    /* Fill the full height of the blue card so phone touches the bottom */
    <div className="w-full h-full flex justify-center items-start">
      {/* Phone outer shell — fills full height, clipped at bottom by parent overflow:hidden */}
      <div
        style={{
          width: "88%",
          height: "100%",
          background: "#ffffff",
          borderRadius: "2.6rem 2.6rem 0 0",
          padding: "8px 8px 0 8px",
          boxShadow: "0 0 0 2px rgba(255,255,255,0.3), 0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Inner screen — also fills full height */}
        <div
          className="bg-white h-full overflow-hidden"
          style={{ borderRadius: "2.2rem 2.2rem 0 0" }}
        >
          {/* Top bar */}
          <div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
            <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 flex items-center gap-1.5 min-w-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="text-xs text-gray-400">Search</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">C</span>
              </div>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="18" y="3" width="4" height="18" rx="1" />
                <rect x="10" y="8" width="4" height="13" rx="1" />
                <rect x="2" y="13" width="4" height="8" rx="1" />
              </svg>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Portfolio balance */}
          <div className="px-4 pt-1 pb-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
                  $33,683.80
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs text-green-500 font-semibold">↗ $131.36 (1.38%)</span>
                  <span className="text-xs text-gray-400">1D</span>
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="px-2 pt-2">
            <ChartLine />
          </div>

          {/* Time filters */}
          <div className="px-3 pb-2 flex items-center justify-between">
            {["1H", "1D", "1W", "1M", "1Y", "ALL"].map((t) => (
              <button
                key={t}
                className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                  t === "1D" ? "bg-blue-600 text-white" : "text-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="h-px bg-gray-100 mx-3" />

          {/* Asset rows */}
          <div className="px-3 divide-y divide-gray-50">
            {assetList.map((asset) => (
              <div key={asset.name} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                    {asset.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-800">{asset.name}</span>
                </div>
                <span className={`text-xs font-semibold ${asset.change === "positive" ? "text-green-500" : "text-gray-800"}`}>
                  {asset.change === "positive" && "↗ "}
                  {asset.amount}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
