import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";
import { HelpCircle, ShieldCheck, Cpu, Briefcase, UserX, CircleDollarSign } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";


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
            <h1 className="page-heading">Frequently Asked Questions</h1>
            <p className="page-subheading">
              Answers to common questions about using Curson to find jobs or hire talent.
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="features-grid"> {/* Reusing grid layout */}
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <CircleDollarSign size={24} />
              </div>
              <h3 className="feature-title">Is Curson free to use?</h3>
              <p className="feature-desc">
                Yes. You can search for jobs, create a profile, and apply to listings
                completely for free. We believe access to opportunity should not be
                gated. We do offer optional premium features for advanced tools.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
              <h3 className="feature-title">How do you verify jobs?</h3>
              <p className="feature-desc">
                We use a combination of automated domain verification and manual review. 
                We check company registration details and official email domains to ensure 
                listings are legitimate before they appear on your dashboard.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Cpu size={24} />
              </div>
              <h3 className="feature-title">What is the AI Resume tool?</h3>
              <p className="feature-desc">
                Our AI tool is an enhancement engine. It analyzes the gap between your 
                resume and a target job description, providing specific improvements 
                (keywords, formatting) to help you match that specific role.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Briefcase size={24} />
              </div>
              <h3 className="feature-title">I am an employer. How do I post?</h3>
              <p className="feature-desc">
                Employers must pass a verification check to post. Once verified, you 
                can post jobs directly from your employer dashboard. We prioritize 
                detailed, transparent job descriptions with clear salary ranges.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <HelpCircle size={24} />
              </div>
              <h3 className="feature-title">Other Questions?</h3>
              <p className="feature-desc">
                If you have a specific question not answered here, please reach out 
                to our support team. We generally respond within 24 hours.
              </p>
            </div>

          </div>

          <div className="public-footer-note">
            <p>Still have questions? Email us at <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@curson.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ep-btn-support"
                >
                  admin@curson.in
                </a></p>
          </div>

        </div>
      </div>
    </>
  );
}