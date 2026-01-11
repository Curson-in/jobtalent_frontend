import { createSubscription } from "../../services/paymentService";

export default function PricingCard({ plan }) {
  const handleUpgrade = async () => {
    try {
      const { checkoutUrl } = await createSubscription(plan.key);
      window.location.href = checkoutUrl; // 🚀 redirect to Dodo
    } catch (err) {
      console.error("BACKEND ERROR:", err.response?.data || err);
      alert("Payment failed");
    }
  };

  return (
  <div className={`pricing-card ${plan.popular ? "popular" : ""}`}>
    {plan.popular && <div className="popular-tag">Most Popular</div>}

    <h3 className="plan-title">{plan.title}</h3>

    <div className="plan-price">
      <span className="price">{plan.price}</span>
      <span className="duration">{plan.duration}</span>
    </div>

    <ul className="feature-list">
      {plan.features.map(f => (
        <li key={f}>
          <span className="check">✓</span>
          {f}
        </li>
      ))}
    </ul>

    <button
      className={`plan-btn ${plan.popular ? "btn-primary" : "btn-outline"}`}
      onClick={handleUpgrade}
    >
      Get Started
    </button>
  </div>
);

}
