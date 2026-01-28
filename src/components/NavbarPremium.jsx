import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavbarPremium({ active = "", onTabChange }) {
  const { logout, subscription, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* BRAND */}
          <div
            className="brand-logo"
            onClick={() => {
              setMobileOpen(false);
              navigate("/talent/dashboard");
            }}
          >
            <span className="brand-text">Curson</span>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(p => !p)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* NAV LINKS */}
          <div className={`navbar-actions navbar-links ${mobileOpen ? "open" : ""}`}>

            <button
  className={`nav-btn ${active === "blogs" ? "nav-btn-active" : ""}`}
  onClick={() => {
    setMobileOpen(false);
    navigate("/blogs");
  }}
>
  DevHouse
</button>

<button
  className="nav-btn"
  onClick={() => {
    setMobileOpen(false);
    navigate("/blogs/write");
  }}
>
   Write
</button>

  


           <button
  className={`nav-btn ${active === "applications" ? "nav-btn-active" : ""}`}
  onClick={() => {
    setMobileOpen(false);

    if (onTabChange) {
      onTabChange("applications"); // ✅ TAB SWITCH
    } else {
      navigate("/talent/dashboard"); // fallback
    }
  }}
>
  Applied Jobs
</button>


            <button
              className={`nav-btn ${active === "resume" ? "nav-btn-active" : ""}`}
              onClick={() => {
                setMobileOpen(false);
                navigate("/talent/ai-resume");
              }}
            >
               AI Resume
            </button>

           
           {isFreePlan && (
              <button
                className={`nav-btn ${active === "job-match" ? "nav-btn-active" : ""}`}
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/talent/job-match");
                }}
              >
                Job Match
              </button>
            )}

            {/* ✅ ONLY FREE USERS */}
            {isFreePlan && (
              <button
                className="nav-btn nav-btn-upgrade"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/pricing");
                }}
              >
                ⭐ Upgrade
              </button>
            )}

            {/* PROFILE DROPDOWN */}
            <div className="profile-dropdown">
              <button
                className="profile-trigger"
                onClick={() => setShowProfileMenu(p => !p)}
              >
                Profile
              </button>

              {showProfileMenu && (
                <div className="dropdown-content">
                  <Link
                    to="/talent/profile"
                    className="dropdown-link"
                    onClick={() => {
                      setShowProfileMenu(false);
                      setMobileOpen(false);
                    }}
                  >
                    View Profile
                  </Link>

                  <button
                    className="dropdown-link dropdown-danger"
                    onClick={() => {
                      setShowProfileMenu(false);
                      setMobileOpen(false);
                      logout();
                    }}
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
