import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";

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

      <div className="public-page">
        <div className="public-container">
          <button className="public-back" onClick={() => window.history.back()}>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>

          <h1 className="public-title">Privacy Policy</h1>
          <p className="public-subtitle">
            Your privacy matters. This policy explains how Curson collects and uses data.
          </p>

          <div className="public-section">
            <h2>Information We Collect</h2>
            <p>
              We collect only the information necessary to operate the platform, including
              account details, usage data, and uploaded content such as resumes.
            </p>
          </div>

          <div className="public-section">
            <h2>How We Use Your Data</h2>
            <ul>
              <li>To provide and improve our services</li>
              <li>To personalize user experience</li>
              <li>To maintain platform security</li>
            </ul>
          </div>

          <div className="public-section">
            <h2>Data Protection</h2>
            <p>
              We use industry-standard security practices to protect user data. We do not
              sell personal data to third parties.
            </p>
          </div>

          <div className="public-section">
            <h2>Your Rights</h2>
            <p>
              You may request access, correction, or deletion of your data at any time by
              contacting support.
            </p>
          </div>

          <p className="footer-note">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </>
  );
}