import React, { useState } from 'react';
import api from '../../services/api';
import '../../assets/css/employer-boarding.css';

// --- Reuse Internal Toast Component ---
const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div 
      className={`toast show align-items-center text-white border-0 position-fixed top-0 end-0 m-4 shadow-lg`} 
      style={{ zIndex: 1060, backgroundColor: type === 'error' ? '#ef4444' : '#10b981', borderRadius: '10px' }}
    >
      <div className="d-flex">
        <div className="toast-body px-4 py-3 fw-medium">
          {type === 'success' ? <i className="bi bi-check-circle-fill me-2"></i> : <i className="bi bi-exclamation-circle-fill me-2"></i>}
          {message}
        </div>
        <button type="button" className="btn-close btn-close-white me-3 m-auto" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default function StepOTP({ data, next, back }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
        showToast("Please enter a complete 6-digit code", "error");
        return;
    }

    setLoading(true);
    try {
      await api.post('/onboarding/verify-otp', { 
        email: data.officialEmail, 
        otp 
      });
      
      showToast("Email Verified Successfully!", "success");
      setTimeout(() => {
          next();
      }, 1000);
    } catch (err) {
      showToast(err.response?.data?.message || "Invalid or Expired Code", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await api.post('/onboarding/send-otp', { email: data.officialEmail });
      showToast("Verification code resent!", "success");
    } catch (err) {
      showToast("Failed to resend code. Please try again.", "error");
    }
  };

  return (
    <div className="employer-onboarding-wrapper">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      <div className="employer-onboarding-card text-center">
        <span className="onboarding-step">Step 4 of 5</span>
        <h2>Enter Verification Code</h2>
        <p className="text-muted">
          We sent a code to <strong>{data.officialEmail}</strong>
        </p>

        <div className="onboarding-field" style={{maxWidth: '200px', margin: '2rem auto'}}>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            placeholder="123456"
            style={{textAlign: 'center', fontSize: '1.5rem', letterSpacing: '5px'}}
            maxLength={6}
          />
        </div>

        <div className="d-flex gap-3 justify-content-center mt-3">
          <button className="btn btn-link text-decoration-none" onClick={handleResend}>
            Resend Code
          </button>
        </div>

        <div className="onboarding-actions mt-4">
          <button className="onboarding-secondary-btn" onClick={back} disabled={loading}>
            Back
          </button>
          <button
            className="onboarding-primary-btn"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}