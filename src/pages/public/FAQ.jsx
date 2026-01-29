import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ - Curson</title>
        <meta
          name="description"
          content="Frequently asked questions about Curson, job verification, pricing, and account safety."
        />
        <link rel="canonical" href="https://www.curson.in/faq" />
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

          <h1 className="public-title">Frequently Asked Questions</h1>
          <p className="public-subtitle">
            Answers to common questions about using Curson to find jobs or hire talent.
          </p>

          <div className="public-section">
            <h2>Is Curson free to use?</h2>
            <p>
              Yes. You can search for jobs, create a profile, and apply to listings
              completely for free. We believe access to opportunity should not be
              gated. We do offer optional premium features for users who want advanced
              AI tools and priority visibility.
            </p>
          </div>

          <div className="public-section">
            <h2>How do you verify jobs?</h2>
            <p>
              We use a combination of automated domain verification and manual review.
              We check company registration details, official email domains, and cross-reference listings to ensure they are active and legitimate before they appear on your dashboard.
            </p>
          </div>

          <div className="public-section">
            <h2>What is the AI Resume tool?</h2>
            <p>
              Our AI tool is an enhancement engine. You upload your current resume and
              a target job description. The AI analyzes the gap between the two and
              provides a specific list of improvements—missing keywords, formatting
              issues, or weak bullet points—to help you match that specific role.
            </p>
          </div>

          <div className="public-section">
            <h2>I am an employer. How do I post?</h2>
            <p>
              Employers must pass a verification check to post. Once verified, you
              can post jobs directly from your employer dashboard. We prioritize detailed, transparent job descriptions with clear salary ranges.
            </p>
          </div>

          <div className="public-section">
            <h2>How do I delete my account?</h2>
            <p>
              You can delete your account and all associated data from your Profile
              settings page. We believe in data sovereignty—when you leave, your data
              leaves with you instantly.
            </p>
          </div>

          <div className="public-divider" />

          <p className="footer-note">
            Still have questions? Email us at{" "}
            <a href="mailto:support@curson.in" style={{ color: "inherit" }}>
              support@curson.in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}