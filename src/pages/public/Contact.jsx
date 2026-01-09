import "../../assets/css/public-pages.css";

export default function Contact() {
  return (
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

        <h1 className="public-title">Contact Us</h1>
        
        <p className="public-subtitle">
          We’re here to help. Reach out for support, feedback, or business inquiries.
        </p>

        <div className="public-section">
          <h2>Get in Touch</h2>
          <p>
            If you have questions about your account, subscriptions, or platform features,
            feel free to contact us. We aim to respond within 24–48 hours.
          </p>
        </div>

        <div className="contact-box">
          <p>Email: support@curson.app</p>
          
        </div>

        <div className="public-section">
          <h2>Feedback</h2>
          <p>
            We actively listen to user feedback. If you have suggestions, feature ideas,
            or improvements, we encourage you to share them.
          </p>
        </div>

        <p className="footer-note">
          Please do not share sensitive personal information over email.
        </p>
      </div>
    </div>
  );
}
