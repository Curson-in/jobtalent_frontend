import { useState } from "react";
import { Link } from "react-router-dom";
import ManagePlanModal from "./ManagePlanModal";
import axios from "../../services/api";

export default function SubscriptionCard({ subscription }) {
  const [open, setOpen] = useState(false);

  const toggleRenew = async (value) => {
    await axios.patch("/subscription/auto-renew", {
      auto_renew: value
    });
    window.location.reload();
  };

  /* ============================
     🆕 FREE USER CARD
  ============================ */
  if (!subscription || subscription.plan === "Free") {
    return (
      <div className="subscription-card premium-upgrade-card">
        <div className="premium-badge">⭐ Premium</div>

        <h3 className="premium-title">Upgrade to Premium</h3>

        <p className="premium-desc">
          Boost your profile, increase recruiter visibility,
          and unlock premium features.
        </p>

        <ul className="premium-list">
          <li>✔ Job Match Score</li>
          <li>✔ Profile Boost Priority</li>
          <li>✔ Higher Recruiter Reach</li>
        </ul>

        <Link to="/pricing" className="btn-premium">
          View Plans
        </Link>
      </div>
    );
  }

  /* ============================
     ✅ ACTIVE SUBSCRIPTION CARD
  ============================ */
  return (
    <>
      <div className="subscription-card active-subscription-card">
        <div className="active-header">
          <h3 className="active-plan">
            ⭐ {subscription.plan}
          </h3>
          <span className={`status-pill ${subscription.status}`}>
            {subscription.status}
          </span>
        </div>

        <div className="active-details">
          <p>
            <span>Valid till</span>
            <strong>
              {subscription.end_date
                ? new Date(subscription.end_date).toDateString()
                : "Unlimited"}
            </strong>
          </p>

          
        </div>

        
      </div>

      {open && (
        <ManagePlanModal
          subscription={subscription}
          onClose={() => setOpen(false)}
          onToggle={toggleRenew}
        />
      )}
    </>
  );
}