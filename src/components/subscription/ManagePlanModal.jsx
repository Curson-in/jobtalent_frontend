export default function ManagePlanModal({ subscription, onClose, onToggle }) {
  return (
    <div className="manage-modal-overlay">
      <div className="manage-modal">
        <h3>Manage Subscription</h3>
        <p>
          Your plan will renew on{" "}
          <strong>{new Date(subscription.end_date).toDateString()}</strong>
        </p>

        <div className="renew-row">
          <input
            type="checkbox"
            checked={subscription.auto_renew}
            onChange={(e) => onToggle(e.target.checked)}
          />
          Auto-renew
        </div>

        <div className="info-text">
          ⚠️ You will be notified 2-3 days before expiry
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}