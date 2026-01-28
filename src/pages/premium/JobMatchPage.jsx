import React from 'react';
import '../../assets/css/job-match.css';
import { useNavigate } from 'react-router-dom';
import NavbarPremium from '../../components/NavbarPremium';

export default function JobMatchPage() {
  const navigate = useNavigate();

  return (
    <>
      <NavbarPremium active="job-match" />

      <div className="match-page-container">
        
        <div className="match-hero">
          <h1>Stop Applying Blindly</h1>
          <p>Instantly see if you're a good fit for the job before you apply.</p>
        </div>

        <div className="comparison-section">
          
          {/* FREE CARD */}
          <div className="comparison-card-wrapper">
            <div className="comparison-label label-free">Free Plan</div>
            <div className="mock-card-inner">
              <div className="mock-header">
                <div className="mock-logo">S</div>
                <div className="mock-info">
                  <h3>Software Intern</h3>
                  <p>Stripe</p>
                </div>
              </div>
              <div className="match-area-free">
                <div className="blur-lines">
                  <div className="blur-line" style={{width: '60%'}}></div>
                  <div className="blur-line" style={{width: '80%'}}></div>
                  <div className="blur-line" style={{width: '40%'}}></div>
                </div>
                <div className="lock-btn" onClick={() => navigate('/pricing')}>
                  🔒 Upgrade to View Score
                </div>
              </div>
            </div>
          </div>

          {/* PREMIUM CARD */}
          <div className="comparison-card-wrapper">
            <div className="comparison-label label-pro">Premium Plan</div>
            <div className="mock-card-inner">
              <div className="mock-header">
                <div className="mock-logo" style={{background: '#dcfce7', color: '#16a34a'}}>S</div>
                <div className="mock-info">
                  <h3>Software Intern</h3>
                  <p>Stripe</p>
                </div>
              </div>
              <div className="match-area-premium">
                <div className="score-display">
                  <span className="score-big">85%</span>
                  <span className="score-badge">High Match</span>
                </div>
                <div className="missing-display">
                  <span>Missing Skills:</span><br/>
                  <span className="tag-miss">Typescript</span>
                  <span className="tag-miss">GraphQL</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="cta-banner">
          <h2>Apply Smarter, Not Harder</h2>
          <p>Get instant feedback on every single job post.</p>
          <button className="btn-cta-green" onClick={() => navigate('/pricing')}>
            Unlock Job Match Score
          </button>
        </div>

      </div>
    </>
  );
}