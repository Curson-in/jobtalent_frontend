import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, Mail, Sparkles } from 'lucide-react';
import * as authService from '../services/authService.js';
import Forgot from '../assets/images/forgot_password.png';
import '../assets/css/auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await authService.sendResetOtp(email);
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading && email) {
      submit();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-reset">
        <div className="auth-card-inner">

          {/* Back Button */}
          

          {/* Brand Icon - Large & Centered */}
          <div className="auth-brand-icon-large">
            <KeyRound size={28} color="white" strokeWidth={2} />
            <div className="auth-brand-icon-badge">
              <Sparkles size={10} color="white" strokeWidth={3} />
            </div>
          </div>

          {/* Header */}
          <h1 className="auth-title" style={{ marginBottom: '8px' }}>
            Reset your password
          </h1>
          <p className="auth-subtitle" style={{ marginBottom: '28px', lineHeight: '1.5' }}>
            No worries! Enter your email and we'll send you a verification code.
          </p>

          {/* Error */}
          {error && (
            <div className="auth-alert" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>⚠️</span>
              {error}
            </div>
          )}

          {/* Email Input with Icon */}
          <div style={{ marginBottom: '20px' }}>
            <label className="auth-label" style={{ marginBottom: '8px', display: 'block' }}>
              Email address
            </label>
            <div className="auth-input-wrapper">
              <input
                type="email"
                className="auth-input with-icon"
                
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                disabled={loading}
                aria-label="Email address"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            className={`auth-primary-btn ${loading ? 'loading' : ''}`}
            onClick={submit}
            disabled={loading || !email}
            style={{ marginBottom: '20px' }}
          >
            {!loading && 'Send verification code'}
          </button>

          {/* Info Box */}
         

          {/* Footer */}
          <div className="auth-footer with-divider">
            <span style={{ color: '#6b7280' }}>Remember your password?</span>{' '}
            <Link to="/login" className="auth-link">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>

      {/* Right Visual */}
      <div className="auth-right">
        <img
          src={Forgot}
          alt="Account recovery illustration"
          className="auth-visual-img"
        />
        <div className="auth-visual-overlay">
          <div className="auth-glass-card">
            <h2 style={{ fontSize: '1.65rem', marginBottom: '10px' }}>
              Secure account recovery
            </h2>
            <p style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.6' }}>
              We take security seriously. Verify your identity and regain access in just a few steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}