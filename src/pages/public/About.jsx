import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";
import { Target, Flag, Shield, Eye, Zap, Heart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";


export default function About() {
  return (
    <>
      <Helmet>
        <title>About Curson - Global Job & Talent Platform</title>
        <meta
          name="description"
          content="Learn about Curson, a modern job and talent platform built to help professionals find better opportunities and employers hire smarter."
        />
        <link rel="canonical" href="https://www.curson.in/about" />
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
            <h1 className="page-heading">About Curson</h1>
            <p className="page-subheading">
              Curson is a modern career platform built to help ambitious professionals
              discover opportunities, apply smarter, and grow faster.
            </p>
          </div>

          {/* About Grid */}
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Target size={24} />
              </div>
              <h3 className="feature-title">Our Mission</h3>
              <p className="feature-desc">
                Remove friction from the hiring process. We believe talent should be 
                recognized based on skill, effort, and clarity—not noise. We strive 
                to bridge the gap between candidates and employers responsibly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Flag size={24} />
              </div>
              <h3 className="feature-title">Why We Built This</h3>
              <p className="feature-desc">
                Job searching is broken. Candidates apply blindly, and resumes get 
                buried by algorithms. Curson was created to change that with intelligent 
                matching and tools that actually help users improve.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Shield size={24} />
              </div>
              <h3 className="feature-title">Privacy First</h3>
              <p className="feature-desc">
                Your data belongs to you. We do not sell user data to third-party 
                marketing agencies. Our platform is designed with privacy and data 
                sovereignty at its core.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Eye size={24} />
              </div>
              <h3 className="feature-title">No Dark Patterns</h3>
              <p className="feature-desc">
                We believe in honest product design. No misleading paywalls, no 
                hidden subscriptions, and no tricks to keep you locked in. 
                Everything is transparent.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Zap size={24} />
              </div>
              <h3 className="feature-title">Tangible Value</h3>
              <p className="feature-desc">
                Our premium features aren't just gates—they are utilities. From AI 
                resume enhancement to priority visibility, every paid feature is 
                built to give you a measurable advantage.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Heart size={24} />
              </div>
              <h3 className="feature-title">Built for You</h3>
              <p className="feature-desc">
                Curson is independently built and continuously improved based on real 
                user feedback. We build what helps you get hired, not what drives 
                our engagement metrics.
              </p>
            </div>

          </div>

          <div className="public-footer-note">
            <p>
              Curson is built for the community. <a href="/contact">Get in touch.</a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}