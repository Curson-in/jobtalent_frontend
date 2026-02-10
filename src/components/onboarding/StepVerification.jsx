import React, { useState, useRef } from 'react';
import api from '../../services/api';
import '../../assets/css/employer-boarding.css';

// --- Internal Toast Component ---
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

export default function StepVerification({ data, update, next, back }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  
  // 🔒 Lock to prevent double-firing
  const isSubmitting = useRef(false);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const handleContinue = async () => {
    // 1. Validation
    if (!data.officialEmail) {
        showToast("Please enter a valid company email", "error");
        return;
    }

    // 2. 🔒 Check Lock: If already submitting, STOP.
    if (isSubmitting.current) return;
    
    // 3. Set Lock & Loading
    isSubmitting.current = true;
    setLoading(true);

    try {
      // 4. Send API Request
      await api.post('/onboarding/send-otp', { email: data.officialEmail });
      
      showToast("Verification code sent!", "success");
      
      // 5. Wait slightly so user sees success, then move next
      setTimeout(() => {
          next(); 
          // Note: We don't unlock (isSubmitting.current = false) here 
          // because we are navigating away. This prevents extra clicks during transition.
      }, 1000);

    } catch (err) {
      console.error("OTP Error:", err);
      showToast(err.response?.data?.message || "Failed to send verification code", "error");
      
      // 🔓 Unlock only on error so they can try again
      isSubmitting.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="employer-onboarding-wrapper">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      <div className="employer-onboarding-card">
        <span className="onboarding-step">Step 3 of 5</span>
        <h2>Verification</h2>

        <div className="onboarding-field">
          <label>Official Company Email</label>
          <input
            type="email"
            value={data.officialEmail || ''}
            onChange={(e) => update({ officialEmail: e.target.value })}
            placeholder="hr@company.com"
          />
        </div>

        <div className="onboarding-field">
          <label>LinkedIn Company Page</label>
          <input
            value={data.linkedin || ''}
            onChange={(e) => update({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/company/acme"
          />
        </div>

        <div className="onboarding-actions">
          <button className="onboarding-secondary-btn" onClick={back} disabled={loading}>
            Back
          </button>
          
          <button
            className="onboarding-primary-btn"
            onClick={handleContinue}
            disabled={loading} // Visual disable
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...</span>
            ) : (
              'Send Code'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}