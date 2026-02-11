import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";
import { Scale, User, CreditCard, AlertTriangle, ShieldBan } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";


export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Curson</title>
        <meta
          name="description"
          content="Review the Terms of Service for Curson. Understand the rules, user responsibilities, and legal agreements for using our job platform."
        />
        <link rel="canonical" href="https://www.curson.in/terms" />
        <meta property="og:title" content="Terms of Service | Curson" />
        <meta property="og:url" content="https://www.curson.in/terms" />
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
            <h1 className="page-heading">Terms of Service</h1>
            <p className="page-subheading">
              By using Curson, you agree to the following terms regarding your use of the platform.
            </p>
          </div>

          {/* Terms Grid */}
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Scale size={24} />
              </div>
              <h3 className="feature-title">Use of Service</h3>
              <p className="feature-desc">
                You agree to use Curson only for lawful purposes. You must not use the 
                platform to post false information, scam other users, or violate any 
                applicable laws or regulations.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <User size={24} />
              </div>
              <h3 className="feature-title">Account Responsibilities</h3>
              <p className="feature-desc">
                You are responsible for maintaining the confidentiality of your account 
                credentials. You are liable for all activities that occur under your account. 
                Please notify us immediately of any unauthorized use.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <CreditCard size={24} />
              </div>
              <h3 className="feature-title">Subscriptions & Billing</h3>
              <p className="feature-desc">
                Paid subscriptions provide access to premium features. Payments are handled 
                securely via our payment partners. Subscriptions auto-renew unless cancelled 
                before the renewal date.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <AlertTriangle size={24} />
              </div>
              <h3 className="feature-title">Limitation of Liability</h3>
              <p className="feature-desc">
                Curson is provided “as is” without warranties. We are not responsible for 
                hiring outcomes, third-party actions, or the accuracy of user-generated content.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldBan size={24} />
              </div>
              <h3 className="feature-title">Termination</h3>
              <p className="feature-desc">
                We reserve the right to suspend or terminate accounts that violate these 
                terms, including posting fake jobs, spamming, or harassment of other users.
              </p>
            </div>

          </div>

        

        </div>
      </div>
    </>
  );
}