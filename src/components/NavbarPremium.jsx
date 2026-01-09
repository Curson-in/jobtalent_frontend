import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavbarPremium({ active = "" }) {
  const { logout, subscription, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // ⛔ Prevent flash while loading
  if (loading) return null;

  const isFreePlan =
    !subscription ||
    !subscription.plan ||
    subscription.plan.toLowerCase() === "free";

  return (
    <nav className="navbar-premium">
      <div className="container-premium">
        <div className="navbar-content">

          <div className="brand-logo" onClick={() => navigate("/talent/dashboard")}>
            <span className="brand-text">Curson</span>
          </div>

          <div className="navbar-actions">

            <button
              className={`nav-btn ${active === "applications" ? "nav-btn-active" : ""}`}
              onClick={() => navigate("/talent/dashboard")}
            >
              Applications
            </button>

            <button
              className={`nav-btn ${active === "resume" ? "nav-btn-active" : ""}`}
              onClick={() => navigate("/talent/ai-resume")}
            >
              ✨ AI Resume
            </button>

            {/* ✅ ONLY FREE USERS */}
            {isFreePlan && (
              <button
                className="nav-btn nav-btn-upgrade"
                onClick={() => navigate("/pricing")}
              >
                ⭐ Upgrade
              </button>
            )}

            <div className="profile-dropdown">
              <button
                className="profile-trigger"
                onClick={() => setShowProfileMenu(p => !p)}
              >
                Profile
              </button>

              {showProfileMenu && (
                <div className="dropdown-content">
                  <Link to="/talent/profile" className="dropdown-link">
                    View Profile
                  </Link>
                  <button
                    className="dropdown-link dropdown-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
