import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cryptoCluster from "../../assets/image.png";

export default function TakeControl() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email) navigate("/signup");
  };

  return (
    <section style={{ background: "#ffffff", padding: "5rem 8rem" }} className="home-section">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

        {/* Left — text + form */}
        <div className="w-full lg:w-1/2">
          <h2
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Take control of your money
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#374151", marginBottom: "1.5rem" }}>
            Start your portfolio today and discover crypto
          </p>
          <form onSubmit={handleSignUp} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="selormsem48@gmail.com"
              style={{
                flex: 1,
                padding: "0.75rem 1.25rem",
                border: "1px solid #d1d5db",
                borderRadius: "9999px",
                fontSize: "0.9rem",
                color: "#111827",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                background: "#1652f0",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                color: "white",
                whiteSpace: "nowrap",
              }}
            >
              Sign up
            </button>
          </form>
        </div>

        {/* Right — crypto coins cluster image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={cryptoCluster}
            alt="Crypto coins"
            style={{ width: "100%", maxWidth: "480px", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
