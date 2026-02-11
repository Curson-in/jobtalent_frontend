import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";
import { Shield, Lock, FileText, UserCheck, Server, Eye } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Curson</title>
        <meta
          name="description"
          content="Read the Curson Privacy Policy. Learn how we collect, use, and protect your personal data and resume information securely."
        />
        <link rel="canonical" href="https://www.curson.in/privacy" />
        <meta property="og:title" content="Privacy Policy | Curson" />
        <meta property="og:url" content="https://www.curson.in/privacy" />
      </Helmet>

      <header className="navbar">
                                          <div className="container">
                                            <Link className="navbar-brand" to="/">
                                              Curson
                                            </Link>
                                            <div className="landing-nav-right">
                                              <Link to="/login" className="nav-link-simple">
                                                Login
                                              </Link>
                                              <Link to="/signup" className="btn btn-nav-signup">
                                                Sign up
                                              </Link>
                                            </div>
                                          </div>
                                        </header>

      <div className="public-page-wrapper">
        <div className="public-content-container">
          
          {/* Header */}
          <div className="public-header">
            <button className="btn-back-text" onClick={() => window.history.back()}>
              ← Back
            </button>
            <h1 className="page-heading">Privacy Policy</h1>
            <p className="page-subheading">
              Your privacy matters. This policy explains how Curson collects, uses, and protects your data.
            </p>
          </div>

          {/* Privacy Grid */}
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FileText size={24} />
              </div>
              <h3 className="feature-title">Information We Collect</h3>
              <p className="feature-desc">
                We collect only the information necessary to operate the platform, including 
                account details, usage data, and uploaded content such as resumes and portfolios.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Server size={24} />
              </div>
              <h3 className="feature-title">How We Use Data</h3>
              <p className="feature-desc">
                Your data is used to provide and improve our services, personalize your 
                user experience, and maintain platform security. We never use data for 
                unauthorized advertising.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Lock size={24} />
              </div>
              <h3 className="feature-title">Data Protection</h3>
              <p className="feature-desc">
                We use industry-standard security practices, including encryption and 
                secure storage, to protect your data. We do not sell personal data to 
                third parties.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <UserCheck size={24} />
              </div>
              <h3 className="feature-title">Your Rights</h3>
              <p className="feature-desc">
                You retain full ownership of your information. You may request access, 
                correction, or complete deletion of your data at any time by contacting support.
              </p>
            </div>

          </div>

          <div className="public-footer-note">
            <p>
              Last updated: <strong>January 2026</strong>. For privacy inquiries, email  <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@curson.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ep-btn-support"
                >
                  admin@curson.in
                </a>.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}