import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/landing.css";
import { Helmet } from "react-helmet-async";

export default function Landing() {
  return (
    <>
   <Helmet>
        <title>Curson - Find Jobs Faster. Hire Talent Smarter.</title>
        <meta
          name="description"
          content="Curson is a global job and talent platform connecting verified candidates with employers. Discover remote jobs, local hiring, and smarter recruitment."
        />
        <link rel="canonical" href="https://www.curson.in/" />
      </Helmet>
    <div className="landing-container">
      {/* ================= NAVBAR ================= */}
     <header className="navbar navbar-expand-lg">
  <div className="container">
    <Link className="navbar-brand" to="/">
      Curson
    </Link>

    <nav className="navbar-nav ms-auto d-flex align-items-center gap-3">
     

      <Link to="/signup" className="btn btn-nav-signup">
        Sign up
      </Link>
    </nav>
  </div>
</header>


      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="container">
          <h1>
  Increase your chances of getting hired
</h1>

<p>
  Smart job matching and resume insights that lead to better hiring outcomes.
</p>

          <div className="d-flex justify-content-center gap-3 hero-buttons flex-wrap">
            <Link
  to="/signup?role=talent"
  className="btn btn-hero-primary btn-lg"
>
  Explore Jobs
</Link>

<Link
  to="/signup?role=employer"
  className="btn btn-outline-primary btn-lg"
>
  Start Hiring
</Link>

          </div>
        </div>
      </section>

      
      {/* ================= STATS ================= */}
      <section className="stats-section">
  <div className="container">
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">2K+</div>
        <div className="stat-label">Live Job Openings</div>
      </div>

      <div className="stat-card">
        <div className="stat-number">10K+</div>
        <div className="stat-label">Verified Professionals</div>
      </div>

      <div className="stat-card">
        <div className="stat-number">1K+</div>
        <div className="stat-label">Hiring Companies</div>
      </div>
    </div>
  </div>
</section>


      {/* ================= FOR TALENT ================= */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">For Candidates</span>
            <h2 className="section-title">Built for Serious Professionals</h2>
<p className="section-subtitle">
  Tools designed to help you get hired faster - not just apply more.
</p>

          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h5 className="feature-title">Smart Job Discovery</h5>
              <p className="feature-text">
                Discover global and local job opportunities tailored to
                your skills, experience, and preferences with our AI-powered matching algorithm.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h5 className="feature-title">Skill Verification</h5>
              <p className="feature-text">
                Validate your skills through comprehensive assessments and improve
                visibility with verified badges that employers trust.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h5 className="feature-title">Application Tracking</h5>
              <p className="feature-text">
                Track applications, interviews, and employer responses
                from a single intuitive dashboard with real-time updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOR EMPLOYERS ================= */}
      <section className="employer-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">For Employers</span>
            <h2 className="section-title">Hire Smarter, Not Harder</h2>
            <p className="section-subtitle">
              Streamline your hiring process with advanced tools and verified talent
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h5 className="feature-title">Easy Job Posting</h5>
              <p className="feature-text">
                Create job listings in minutes and reach qualified candidates
                across multiple locations with intelligent distribution.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h5 className="feature-title">Advanced Candidate Search</h5>
              <p className="feature-text">
                Search and filter candidates by skills, experience,
                availability, and verification status with powerful filters.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h5 className="feature-title">Direct Communication</h5>
              <p className="feature-text">
                Communicate directly with candidates and manage your entire hiring
                pipeline efficiently from one centralized platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header ">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Get Started in 3 Simple Steps</h2>
            <p className="section-subtitle">
  Designed to help talent get hired and employers hire faster.
</p>
          </div>

          <div className="how-grid">
            <div className="how-card">
              <div className="how-icon-wrapper">
                <span className="how-step">01</span>
              </div>
              <h5 className="how-title">Create Your Profile</h5>
              <p className="how-text">
                Sign up and build a professional profile that highlights your skills or company.
              </p>
            </div>

            <div className="how-card">
              <div className="how-icon-wrapper">
                <span className="how-step">02</span>
              </div>
              <h5 className="how-title">Get Matched</h5>
              <p className="how-text">
                Our smart system connects the right talent with the right opportunities.
              </p>
            </div>

            <div className="how-card">
              <div className="how-icon-wrapper">
                <span className="how-step">03</span>
              </div>
              <h5 className="how-title">Grow Faster</h5>
              <p className="how-text">
                Apply, hire, communicate, and track progress - all in one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
    


      {/* ================= PRICING ================= */}
     <section className="plans-section">
  <div className="plans-container">
    <div className="plans-header">
      <span className="plans-badge">Pricing</span>
      <h2 className="plans-title">Choose Your Plan</h2>
      <p className="plans-subtitle">
        Transparent pricing with no hidden fees. Start free, upgrade anytime.
      </p>
    </div>

    <div className="plans-grid">
      {/* TALENT */}
      <div className="plan-card plan-primary">
        <div className="plan-top">
          <h5 className="plan-name">Talent Premium</h5>
          <div className="plan-price">
            Pro <span>/ Features</span>
          </div>
        </div>

        <ul className="plan-features">
          <li>Profile boosting (priority visibility)</li>
          <li>Resume enhancement & optimization</li>
          <li>Follow-up messages with employers</li>
          <li>Job match score for every application</li>
          <li>Advanced job alerts</li>
          <li>Application insights & analytics</li>
        </ul>

        <Link to="/signup?role=talent" className="plan-btn">
          Get Started
        </Link>
      </div>

      {/* EMPLOYER */}
      <div className="plan-card">
        <div className="plan-top">
          <h5 className="plan-name">Employer Access</h5>
          <div className="plan-price">Custom</div>
        </div>

        <ul className="plan-features">
          <li>Unlimited job postings</li>
          <li>Advanced candidate search filters</li>
          <li>Analytics dashboard & reports</li>
          
          <li>Dedicated account manager</li>
          <li>Priority employer support</li>
        </ul>

        <Link to="/signup?role=employer" className="plan-btn">
          Get Started
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* ================= FAQ ================= */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header ">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about Curson
            </p>
          </div>

          <div className="faq-container">
            <div className="faq-list">
              <details className="faq-item">
                <summary className="faq-question">
                  Is Curson free to use?
                  <svg className="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="faq-answer">
                  Yes, both talent and employers can get started for free. We also offer premium plans with additional features for those who want to unlock the full potential of the platform.
                </p>
              </details>

              <details className="faq-item">
                <summary className="faq-question">
                  How are candidates verified?
                  <svg className="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="faq-answer">
                  Through comprehensive onboarding, and profile checks. Employers can trust that verified candidates have been thoroughly vetted.
                </p>
              </details>

              <details className="faq-item">
                <summary className="faq-question">
                  Can startups hire on Curson?
                  <svg className="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="faq-answer">
                  Absolutely! Curson is built for startups, enterprises, and agencies of all sizes. We offer flexible pricing and features that scale with your hiring needs.
                </p>
              </details>

              <details className="faq-item">
                <summary className="faq-question">
                  Is Curson available globally?
                  <svg className="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="faq-answer">
                  Yes, we support global hiring and remote opportunities. Connect with talent and employers from around the world, all in one platform.
                </p>
              </details>

              <details className="faq-item">
                <summary className="faq-question">
                  How long does it take to get hired?
                  <svg className="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="faq-answer">
                  On average, candidates with complete profiles and verified skills get interview requests within 1-2 weeks. Premium members often see even faster results with priority visibility.
                </p>
              </details>

             
            </div>
          </div>
        </div>
      </section>

      
      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Career?</h2>
            <p className="cta-subtitle">
              Join thousands of professionals and employers building their future on Curson.
              Sign up today and discover your next opportunity.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/signup?role=talent" className="btn btn-light btn-lg">
                Join as Talent
              </Link>
              <Link
                to="/signup?role=employer"
                className="btn btn-outline-light btn-lg"
              >
                Join as Employer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h5>Curson</h5>
              <p className="mb-0">
                Connecting talent with opportunity worldwide.
              </p>
            </div>
            
            
            <div className="footer-section">
              <h5>Company</h5>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                 <li><Link to="/terms">Terms</Link></li>
                 

              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="mb-0">© 2026 Curson. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}