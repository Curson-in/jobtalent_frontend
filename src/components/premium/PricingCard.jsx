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

      <h3>{plan.title}</h3>
      <h2>{plan.price} <span>{plan.duration}</span></h2>

      <ul>
        {plan.features.map(f => <li key={f}>✔ {f}</li>)}
      </ul>

      <button onClick={handleUpgrade}>
        Get Started
      </button>
    </div>
  );
}
