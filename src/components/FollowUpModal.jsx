import React, { useState } from "react";
import { sendFollowUp } from "../services/messageService";
import "../assets/css/followup-modal.css";

export default function FollowUpModal({ job, onClose }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) {
      setStatus("error");
      setErrorMessage("Message cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(""); // Clear previous errors

      await sendFollowUp({
        jobId: job.jobId,
        messageText: message
      });

      // Switch to Success View
      setStatus("success");

      // Auto-close modal after 1.5 seconds
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      setStatus("error");
      setErrorMessage(err.response?.data?.message || "Failed to send follow-up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="followup-overlay">
      <div className="followup-modal">
        
        {/* --- SUCCESS VIEW --- */}
        {status === "success" ? (
          <div className="followup-success">
            <div className="success-icon">✅</div>
            <h3>Sent Successfully!</h3>
            <p>Your follow-up message has been delivered.</p>
          </div>
        ) : (
          /* --- FORM VIEW --- */
          <>
            <h3>Send Follow-Up</h3>
            <p className="followup-job">
              {job.position} at <strong>{job.company}</strong>
            </p>

            <textarea
              placeholder="Write a short professional follow-up message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status === 'error') setStatus('idle'); // Clear error when typing
              }}
              className={status === "error" ? "input-error" : ""}
              disabled={loading}
            />

            {/* Inline Error Message */}
            {status === "error" && (
              <p className="error-text">⚠️ {errorMessage}</p>
            )}

            <div className="followup-actions">
              <button 
                className="btn-secondary" 
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="btn-primary"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}