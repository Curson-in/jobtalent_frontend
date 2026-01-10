import "../../assets/css/public-pages.css";

export default function About() {
  return (
    <><Helmet>
        <title>About Curson – Global Job & Talent Platform</title>
        <meta
          name="description"
          content="Learn about Curson, a modern job and talent platform built to help professionals find better opportunities and employers hire smarter."
        />
        <link rel="canonical" href="https://www.curson.in/about" />
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

        <h1 className="public-title">About Curson</h1>
        <p className="public-subtitle">
          Curson is a modern career platform built to help ambitious professionals
          discover opportunities, apply smarter, and grow faster.
        </p>

        <div className="public-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: remove friction from the hiring process and give
            individuals the tools they need to compete in a rapidly evolving job market.
            We believe talent should be recognized based on skill, effort, and clarity —
            not noise.
          </p>
          <p>
            Curson exists to bridge the gap between candidates and employers by using
            technology responsibly, transparently, and effectively.
          </p>
        </div>

        <div className="public-section">
          <h2>Why We Built Curson</h2>
          <p>
            Job searching is broken. Candidates apply blindly, resumes are filtered by
            algorithms, and opportunities are often missed due to lack of visibility.
            Curson was created to change that.
          </p>
          <p>
            We focus on intelligent matching, clear communication, and AI-assisted tools
            that actually help users improve — not overwhelm them.
          </p>
        </div>

        <div className="public-section">
          <h2>What Makes Us Different</h2>
          <ul>
            <li>Privacy-first platform design</li>
            <li>No dark patterns or misleading paywalls</li>
            <li>Real value from premium features</li>
            <li>Clear, honest product decisions</li>
          </ul>
        </div>

        <div className="public-divider" />

        <p className="footer-note">
          Curson is independently built and continuously improved with user feedback at
          its core.
        </p>
      </div>
    </div>
    </>
  );
}
