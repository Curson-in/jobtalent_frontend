import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";

export default function Features() {
  return (
    <>
      <Helmet>
        <title>Features - Curson</title>
        <meta
          name="description"
          content="Explore the tools Curson offers: Verified job listings, AI resume enhancement, and smart application tracking."
        />
        <link rel="canonical" href="https://www.curson.in/features" />
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

          <h1 className="public-title">Platform Features</h1>
          <p className="public-subtitle">
            Tools designed to give you an unfair advantage in a crowded job market.
            Simple, effective, and built for results.
          </p>

          <div className="public-section">
            <h2>Verified Job Listings</h2>
            <p>
              Stop wasting time on ghost jobs and scams. Every listing on Curson is
              verified for authenticity. We validate employer domains and contact
              details so you can apply with confidence, knowing the opportunity is real.
            </p>
          </div>

          <div className="public-section">
            <h2>AI Resume Enhancement</h2>
            <p>
              Our AI doesn't just check for grammar—it analyzes your resume against
              specific job descriptions. It suggests keywords, formatting improvements,
              and highlights missing skills to ensure you pass ATS filters and catch
              recruiter attention.
            </p>
          </div>

          <div className="public-section">
            <h2>Smart Application Tracking</h2>
            <p>
              Never lose track of where you stand. Our dashboard organizes your
              applications automatically. See which companies have viewed your profile,
              track interview stages, and receive automated reminders to follow up.
            </p>
          </div>

          <div className="public-section">
            <h2>Direct Employer Connection</h2>
            <p>
              For verified talent, we open direct lines of communication. Send
              messages directly to hiring managers and skip the black hole of
              traditional application portals.
            </p>
          </div>

          <div className="public-divider" />

          <p className="footer-note">
            We are constantly shipping new features. Have a suggestion? Let us know.
          </p>
        </div>
      </div>
    </>
  );
}