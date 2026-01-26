import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:support@curson.app";
  };

  return (
    <>
      <Helmet>
        <title>Contact Curson - Support & Feedback</title>
        <meta
          name="description"
          content="Get in touch with the Curson team. Contact support for account issues, billing help, or feature suggestions. We respond within 24-48 hours."
        />
        <link rel="canonical" href="https://www.curson.in/contact" />
        <meta property="og:title" content="Contact Curson - Support & Feedback" />
        <meta property="og:description" content="Need help? Reach out to Curson support for assistance with your job search or hiring account." />
        <meta property="og:url" content="https://www.curson.in/contact" />
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

          <h1 className="public-title">Contact Us</h1>
          
          <p className="public-subtitle">
            We're here to help. Reach out for support, feedback, or business inquiries.
          </p>

          <div className="public-section">
            <h2>Get in Touch</h2>
            <p>
              If you have questions about your account, subscriptions, or platform features,
              feel free to contact us. We aim to respond within 24–48 hours.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-box">
              <h3>Support</h3>
              <p>Technical issues, account help, billing questions</p>
              <button className="contact-button" onClick={handleEmailClick}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2.25 8.16191C2.5836 7.78115 3.09627 7.66479 3.56958 7.8409L11.7472 11.6071C12.1067 11.7726 12.5203 11.6585 12.7692 11.2994L20.4304 3.23858C20.8038 2.85882 21.3164 2.74246 21.7897 2.91857C22.263 3.09468 22.62 3.52872 22.62 4.02044V19.9796C22.62 20.4713 22.62 20.9054 21.7897 21.0815C21.3164 21.2576 20.8038 21.1412 20.4304 20.7615L13.2528 14.9943C12.8933 14.8288 12.4797 14.9429 12.2308 15.302L4.56958 23.3628C4.19618 23.7426 3.68352 23.8589 3.21021 23.6828C2.73689 23.5067 2.38 23.0727 2.38 22.5809V8.16191Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                support@curson.app
              </button>
            </div>
          </div>

          <div className="public-section">
            <h2>Feedback</h2>
            <p>
              We actively listen to user feedback. If you have suggestions, feature ideas,
              or improvements, we encourage you to share them.
            </p>
          </div>

          <p className="footer-note">
            Please do not share sensitive personal information over email. Response time: 24-48 hours.
          </p>
        </div>
      </div>
    </>
  );
}