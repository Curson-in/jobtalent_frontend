import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";
import { Mail, MessageSquare, LifeBuoy, Send } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Contact() {
  
  // ✅ Direct Gmail Link
  const handleEmailClick = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=admin@curson.in", 
      "_blank"
    );
  };

  return (
    <>
      <Helmet>
        <title>Contact Curson - Support & Feedback</title>
        <meta
          name="description"
          content="Get in touch with the Curson team. Contact support for account issues, billing help, or feature suggestions."
        />
        <link rel="canonical" href="https://www.curson.in/contact" />
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
            <h1 className="page-heading">Contact Us</h1>
            <p className="page-subheading">
              We're here to help. Reach out for support, feedback, or business inquiries.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="features-grid">
            
            {/* Support Card */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <LifeBuoy size={24} />
              </div>
              <h3 className="feature-title">Customer Support</h3>
              <p className="feature-desc">
                Facing issues with your account, billing, or job applications? 
                Our support team is ready to assist you.
              </p>
              <button 
                onClick={handleEmailClick} 
                className="btn-primary-text"
                style={{ 
                  marginTop: '16px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  background: '#0f172a',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Mail size={16} /> Email Support
              </button>
            </div>

            {/* Feedback Card */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MessageSquare size={24} />
              </div>
              <h3 className="feature-title">Product Feedback</h3>
              <p className="feature-desc">
                Have a feature request or suggestion? We build based on user needs. 
                Drop us a line and let us know how we can improve.
              </p>
            </div>

            {/* General Inquiries */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Send size={24} />
              </div>
              <h3 className="feature-title">General Inquiries</h3>
              <p className="feature-desc">
                For partnerships, press, or other general questions, you can reach 
                us at the same email address.
              </p>
            </div>

          </div>

          <div className="public-footer-note">
            <p>
              Response time: <strong>24-48 hours</strong>. Please do not share sensitive passwords via email.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}