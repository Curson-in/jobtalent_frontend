import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import "../assets/css/auth.css";
import { getEmployerProfile } from "../services/employerService.js";
import logo from "../assets/images/logo.jpeg";

// Lucide Icons
import { Briefcase, Headphones } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      localStorage.setItem("userRole", user.role);

      if (user.role === "talent") {
        navigate("/talent/dashboard");
        return;
      }

      if (user.role === "employer") {
        const res = await getEmployerProfile();
        navigate(res?.data ? "/employer/dashboard" : "/employer/onboarding");
        return;
      }

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in right now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">

          {/* BRAND */}
          <div className="auth-brand" style={{ marginBottom: "12px" }}>
            <img src={logo} alt="Curson Logo" className="auth-logo-image" />
            <span>CURSON</span>
          </div>

          <h1 className="auth-title" style={{ marginBottom: "4px" }}>
            Welcome back
          </h1>
          <p className="auth-subtitle" style={{ marginBottom: "18px" }}>
            Sign in to access your Curson workspace.
          </p>

          {error && (
            <div className="auth-alert" role="alert">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} autoComplete="on">
            <div style={{ marginBottom: "12px" }}>
              <label className="auth-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  className="auth-link"
                  style={{
                    fontSize: "0.75rem",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              <input
                id="password"
                type="password"
                name="password"
                className="auth-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {/* FEATURES + CTA */}
          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              background:
                "linear-gradient(135deg, rgba(79,70,229,0.05), rgba(139,92,246,0.05))",
              borderRadius: "18px",
              border: "1px solid rgba(79,70,229,0.12)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Professional Platform */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <IconBadge>
                  <Briefcase size={16} color="#4f46e5" />
                </IconBadge>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Professional Platform
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#6b7280" }}>
                    Built for serious careers and recruiters
                  </div>
                </div>
              </div>

              {/* Dedicated Career Support */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <IconBadge green>
                  <Headphones size={16} color="#10b981" />
                </IconBadge>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Dedicated Career Support
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#6b7280" }}>
                    Guidance whenever you need it
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)",
                  margin: "6px 0",
                }}
              />

              {/* CTA */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "#6b7280",
                }}
              >
                New to Curson?{" "}
                <a href="/signup" className="auth-link" style={{ fontWeight: 500 }}>
                  Create an account
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* Small reusable icon badge */
function IconBadge({ children, green }) {
  return (
    <div
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "12px",
        background: green
          ? "rgba(16,185,129,0.12)"
          : "rgba(79,70,229,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}
