import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";
import "../assets/css/landing.css"; // ← updated CSS file
import { Helmet } from "react-helmet-async";
import logo from '../assets/images/logo.jpeg';

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const queryParams = location.search;
      if (user.role === 'employer') {
        navigate(`/employer/dashboard${queryParams}`);
      } else {
        navigate(`/talent/dashboard${queryParams}`);
      }
    }
  }, [user, navigate, location.search]);

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

        
        <header className="navbar">
          <div className="container">
            
            {/* ✅ UPDATED BRAND SECTION */}
            <Link className="navbar-brand" to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={logo} 
                alt="Curson Logo" 
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '50%', // Makes it circular
                  objectFit: 'cover' 
                }} 
              />
              <span>Curson</span>
            </Link>

            <div className="landing-nav-right">
              <Link to="/discover" className="btn-hero-primary nav-ghost">
                Browse Jobs
              </Link>
              <Link to="/signup" className="btn-nav-signup">
                Get Started
              </Link>
            </div>
          </div>
        </header>

        
        {/* ========== HERO ========== */}
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-badge">
              <span></span>
              Now live across India &amp; globally
            </div>

            <h1>
              Get hired <em>faster</em>,<br />
              hire smarter.
            </h1>

            <p>
              AI-powered job matching and resume insights that connect the right
              talent with the right opportunities - every time.
            </p>

            <div className="hero-buttons">
              <Link to="/signup?role=talent" className="btn-primary-hero">
                Start Applying
              </Link>
              <Link to="/signup?role=employer" className="btn-ghost-hero">
                Start Hiring →
              </Link>
            </div>
          </div>
        </section>

          

        {/* ========== STATS ========== */}
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

        {/* ========== FOR CANDIDATES ========== */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">For Candidates</span>
              <h2 className="section-title">Built for serious professionals</h2>
              <p className="section-subtitle">
                Tools designed to help you get hired faster - not just apply more.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h5 className="feature-title">Smart Job Discovery</h5>
                <p className="feature-text">
                  Discover global and local job opportunities tailored to your skills,
                  experience, and preferences with our AI-powered matching algorithm.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 className="feature-title">Skill Verification</h5>
                <p className="feature-text">
                  Validate your skills through comprehensive assessments and gain
                  verified badges that employers actually trust.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h5 className="feature-title">Application Tracking</h5>
                <p className="feature-text">
                  Track applications, interviews, and employer responses from a
                  single intuitive dashboard with real-time updates.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                </div>
                <h5 className="feature-title">Verified Job Listings</h5>
                <p className="feature-text">
                  Stop wasting time on ghost jobs. Every listing is verified for
                  authenticity - apply with full confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== FOR EMPLOYERS ========== */}
        <section className="employer-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">For Employers</span>
              <h2 className="section-title">Hire smarter, not harder</h2>
              <p className="section-subtitle">
                Streamline your hiring process with advanced tools and verified talent.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <h5 className="feature-title">Easy Job Posting</h5>
                <p className="feature-text">
                  Create job listings in minutes and reach qualified candidates across
                  multiple locations with intelligent distribution.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h5 className="feature-title">Advanced Candidate Search</h5>
                <p className="feature-text">
                  Filter candidates by skills, experience, availability, and
                  verification status with powerful, precise filters.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 className="feature-title">Direct Communication</h5>
                <p className="feature-text">
                  Communicate directly with candidates and manage your entire
                  hiring pipeline from one centralized platform.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <svg className="feature-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <h5 className="feature-title">Invite to Interview</h5>
                <p className="feature-text">
                  Invite shortlisted candidates directly to interviews. Send
                  interview requests instantly with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="how-it-works">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">How It Works</span>
              <h2 className="section-title">Up and running in 3 steps</h2>
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
                  Sign up and build a professional profile that highlights your
                  skills or company - takes under five minutes.
                </p>
              </div>

              <div className="how-card">
                <div className="how-icon-wrapper">
                  <span className="how-step">02</span>
                </div>
                <h5 className="how-title">Get Matched</h5>
                <p className="how-text">
                  Our smart system connects the right talent with the right
                  opportunities, automatically.
                </p>
              </div>

              <div className="how-card">
                <div className="how-icon-wrapper">
                  <span className="how-step">03</span>
                </div>
                <h5 className="how-title">Grow Faster</h5>
                <p className="how-text">
                  Apply, hire, communicate, and track progress - all in one
                  clean, unified platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== PRICING ========== */}
        <section className="plans-section">
          <div className="plans-container">
            <div className="plans-header">
              <span className="plans-badge">Pricing</span>
              <h2 className="plans-title">Simple, transparent pricing</h2>
              <p className="plans-subtitle">
                No hidden fees. Start free, upgrade when you're ready.
              </p>
            </div>

            <div className="plans-grid">
              {/* TALENT */}
              <div className="plan-card plan-primary">
                <span className="plan-primary-badge">Popular</span>
                <div className="plan-top">
                  <p className="plan-name">Talent Premium</p>
                  <div className="plan-price">Pro <span>/ Features</span></div>
                </div>
                <ul className="plan-features">
                  <li>Profile boosting &amp; priority visibility</li>
                  <li>Resume enhancement &amp; optimization</li>
                  <li>Follow-up messages with employers</li>
                  <li>Job match score per application</li>
                  <li>Advanced job alerts</li>
                  <li>Application insights &amp; analytics</li>
                </ul>
                <Link to="/signup?role=talent" className="plan-btn">
                  Get Started
                </Link>
              </div>

              {/* EMPLOYER */}
              <div className="plan-card">
                <div className="plan-top">
                  <p className="plan-name">Employer Access</p>
                  <div className="plan-price">Premium</div>
                </div>
                <ul className="plan-features">
                  <li>Unlimited job postings</li>
                  <li>Advanced candidate search filters</li>
                  <li>Analytics dashboard &amp; reports</li>
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

        {/* ========== FAQ ========== */}
        <section className="faq-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">FAQ</span>
              <h2 className="section-title">Common questions</h2>
              <p className="section-subtitle">Everything you need to know about Curson.</p>
            </div>

            <div className="faq-container">
              <div className="faq-list">
                {[
                  {
                    q: 'Is Curson free to use?',
                    a: 'Yes, both talent and employers can get started for free. We also offer premium plans with additional features for those who want to unlock the full potential of the platform.',
                  },
                  {
                    q: 'How are candidates verified?',
                    a: 'Through comprehensive onboarding and profile checks. Employers can trust that verified candidates have been thoroughly vetted.',
                  },
                  {
                    q: 'Can startups hire on Curson?',
                    a: 'Absolutely! Curson is built for startups, enterprises, and agencies of all sizes. We offer flexible pricing that scales with your hiring needs.',
                  },
                  {
                    q: 'Is Curson available globally?',
                    a: 'Yes, we support global hiring and remote opportunities. Connect with talent and employers from around the world, all in one platform.',
                  },
                  {
                    q: 'How long does it take to get hired?',
                    a: 'On average, candidates with complete profiles and verified skills receive interview requests within 1–2 weeks. Premium members often see even faster results.',
                  },
                ].map(({ q, a }) => (
                  <details className="faq-item" key={q}>
                    <summary className="faq-question">
                      {q}
                      <svg className="faq-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="faq-answer">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== CTA ========== */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to transform<br /><em>your career?</em>
            </h2>
            <p className="cta-subtitle">
              Join thousands of professionals and employers building their future
              on Curson. Sign up today and discover your next opportunity.
            </p>
            <div className="cta-buttons">
              <Link to="/signup?role=talent" className="btn-cta-light">
                Join as Talent
              </Link>
              <Link to="/signup?role=employer" className="btn-cta-outline">
                Join as Employer →
              </Link>
            </div>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand-section">
                <h5 className="footer-logo">Curson</h5>
                <p className="footer-tagline">
                  Your personal career vault for verified jobs and talent.
                  Never miss an opportunity.
                </p>
              </div>

              <div className="footer-section">
                <h5 className="footer-heading">Product</h5>
                <ul className="footer-links">
                  <li><Link to="/features">Features</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                </ul>
              </div>

              <div className="footer-section">
                <h5 className="footer-heading">Company</h5>
                <ul className="footer-links">
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </div>

              <div className="footer-section">
                <h5 className="footer-heading">Legal</h5>
                <ul className="footer-links">
                  <li><Link to="/privacy">Privacy</Link></li>
                  <li><Link to="/terms">Terms</Link></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2026 Curson. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}