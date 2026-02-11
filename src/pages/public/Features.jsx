import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, ShieldCheck, FileText, Zap, MessageSquare, LayoutDashboard } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";


export default function Features() {
  return (
    <>
      <Helmet>
        <title>Platform Features - Curson</title>
        <meta
          name="description"
          content="Explore the tools Curson offers: Verified job listings, AI resume enhancement, and smart application tracking."
        />
        <link rel="canonical" href="https://www.curson.in/features" />
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


          
          
          {/* Header Section */}
          <div className="public-header">
            <button className="btn-back-text" onClick={() => window.history.back()}>
              ← Back
            </button>
            <h1 className="page-heading">Platform Features</h1>
            <p className="page-subheading">
              Tools designed to give you an unfair advantage in a crowded job market.
              Simple, effective, and built for results.
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
              <h3 className="feature-title">Verified Job Listings</h3>
              <p className="feature-desc">
                Stop wasting time on ghost jobs. Every listing is verified for authenticity. 
                We validate employer domains so you can apply with confidence.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Zap size={24} />
              </div>
              <h3 className="feature-title">AI Resume Enhancement</h3>
              <p className="feature-desc">
                Our AI analyzes your resume against specific job descriptions, suggesting 
                keywords and formatting improvements to pass ATS filters.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <LayoutDashboard size={24} />
              </div>
              <h3 className="feature-title">Smart Application Tracking</h3>
              <p className="feature-desc">
                Never lose track of where you stand. Our dashboard organizes your applications 
                automatically and sends reminders to follow up.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MessageSquare size={24} />
              </div>
              <h3 className="feature-title">Direct Employer Connection</h3>
              <p className="feature-desc">
                For verified talent, we open direct lines of communication. Send messages 
                directly to hiring managers and skip the application black hole.
              </p>
            </div>

          </div>

          <div className="public-footer-note">
            <p>We are constantly shipping new features. Have a suggestion? <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@curson.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ep-btn-support"
                >
                  Let Us Know
                </a></p>
          </div>

        </div>
      </div>
    </>
  );
}