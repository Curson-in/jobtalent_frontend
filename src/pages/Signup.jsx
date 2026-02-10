import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import '../assets/css/auth.css';
import registerImg from '../assets/images/register.png';
import logo from '../assets/images/logo.jpeg';


export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: searchParams.get('role') || 'talent',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (loading) return;
    
    setError('');

    // 🔐 PASSWORD RULE: min 6 chars, letters + numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(formData.password)) {
      setError(
        'Password must be at least 6 characters and include letters and numbers'
      );
      return;
    }

    // 🔐 CONFIRM PASSWORD CHECK
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // 🔐 ROLE VALIDATION
    if (!['talent', 'employer'].includes(formData.role)) {
      setError('Invalid role selected');
      return;
    }

    setLoading(true);

    try {
      const user = await signup(
        formData.email,
        formData.password,
        formData.role,
        formData.firstName,
        formData.lastName
      );

      if (user.role === 'talent') {
        navigate('/talent/dashboard');
        return;
      }

      if (user.role === 'employer') {
        navigate('/employer/onboarding');
        return;
      }

      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Unable to create your account'
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="auth-brand">
            <img
              src={logo}
              alt="Curson Logo"
              className="auth-logo-image"
            />
            <span>CURSON</span>
          </div>

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Join Curson to discover curated jobs and exceptional talent.
          </p>

          {error && <div className="auth-alert" role="alert">{error}</div>}

          {/* ROLE SELECTOR */}
          <div className="role-selector">
            <button
              type="button"
              className={
                'role-pill' +
                (formData.role === 'talent' ? ' role-pill-active' : '')
              }
              onClick={() =>
                setFormData((p) => ({ ...p, role: 'talent' }))
              }
              aria-pressed={formData.role === 'talent'}
            >
              <span>Candidate</span>
            </button>

            <button
              type="button"
              className={
                'role-pill' +
                (formData.role === 'employer' ? ' role-pill-active' : '')
              }
              onClick={() =>
                setFormData((p) => ({ ...p, role: 'employer' }))
              }
              aria-pressed={formData.role === 'employer'}
            >
              <span>Recruiter</span>
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} autoComplete="on">
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <label className="auth-label" htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  className="auth-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  aria-label="First name"
                  aria-required="true"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="auth-label" htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  className="auth-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  aria-label="Last name"
                  aria-required="true"
                  required
                />
              </div>
            </div>

            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="auth-input"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email address"
              aria-required="true"
              required
            />

            <label className="auth-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="auth-input"
              placeholder="Min 6 chars, letters & numbers"
              value={formData.password}
              onChange={handleChange}
              aria-label="Password"
              aria-required="true"
              minLength={6}
              required
            />

            <label className="auth-label" htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="auth-input"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-label="Confirm password"
              aria-required="true"
              minLength={6}
              required
            />

            {/* Password match indicator */}
            {formData.confirmPassword && (
              <div style={{
                fontSize: '0.72rem',
                marginTop: '-6px',
                marginBottom: '6px',
                color: formData.password === formData.confirmPassword ? '#10b981' : '#ef4444'
              }}>
                {formData.password === formData.confirmPassword 
                  ? '✓ Passwords match' 
                  : '✗ Passwords do not match'}
              </div>
            )}

            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
              aria-label={loading ? "Creating account" : "Create account"}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="auth-footer">
            Already using Curson?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="auth-right">
        <div className="auth-visual">
          <img
            src={registerImg}
            alt="Professional working on laptop"
            className="auth-visual-img"
            loading="lazy"
          />
          <div className="auth-visual-overlay">
            <h2>Build your career with Curson</h2>
            <p>Where ambitious talent meets trusted recruiters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}