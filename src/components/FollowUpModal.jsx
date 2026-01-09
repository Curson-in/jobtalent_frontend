import React, { useState } from "react";
import { sendFollowUp } from "../services/messageService";

export default function FollowUpModal({ job, onClose }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 

const handleSend = async () => {
  if (!message.trim()) {
    alert("Message cannot be empty");
    return;
  }

  try {
    setLoading(true);

    await sendFollowUp({
      jobId: job.jobId,        // ✅ CORRECT
      messageText: message
    });

    alert("Follow-up sent");
    onClose();
  } catch (err) {
    alert(err.response?.data?.message || "Failed to send follow-up");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="followup-overlay">
      <div className="followup-modal">
        <h3>Send Follow-Up</h3>

        <p className="followup-job">
          {job.position} at {job.company}
        </p>

        <textarea
          placeholder="Write a short professional follow-up message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="followup-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
