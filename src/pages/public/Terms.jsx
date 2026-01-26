import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Curson</title>
        <meta
          name="description"
          content="Review the Terms of Service for Curson. Understand the rules, user responsibilities, and legal agreements for using our job platform."
        />
        <link rel="canonical" href="https://www.curson.in/terms" />
        <meta property="og:title" content="Terms of Service | Curson" />
        <meta property="og:url" content="https://www.curson.in/terms" />
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

          <h1 className="public-title">Terms of Service</h1>
          <p className="public-subtitle">
            By using Curson, you agree to the following terms.
          </p>

          <div className="public-section">
            <h2>Use of Service</h2>
            <p>
              You agree to use Curson only for lawful purposes and in compliance with all
              applicable regulations.
            </p>
          </div>

          <div className="public-section">
            <h2>Accounts</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their accounts
              and ensuring accurate information.
            </p>
          </div>

          <div className="public-section">
            <h2>Subscriptions</h2>
            <p>
              Paid subscriptions provide access to premium features. Payments are handled
              securely and are subject to our billing terms.
            </p>
          </div>

          <div className="public-section">
            <h2>Limitation of Liability</h2>
            <p>
              Curson is provided “as is” without warranties. We are not responsible for
              hiring outcomes or third-party actions.
            </p>
          </div>

          <div className="public-section">
            <h2>Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these
              terms.
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