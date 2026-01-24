import "../../assets/css/PricingCard.css";
import {
  createRazorpayOrder,
  verifyRazorpayPayment
} from "../../services/paymentService";

export default function PricingCard({ plan }) {
  const handlePay = async () => {
    try {
      const order = await createRazorpayOrder(plan.key);

      const options = {
        key: order.key,
        amount: order.amount,
        currency: "INR",
        order_id: order.orderId,
        name: "Curson",
        description: `${plan.title} Plan`,
        handler: async (response) => {
          await verifyRazorpayPayment(response);
          window.location.href = "/talent/dashboard";
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className={`pricing-card ${plan.popular ? "popular" : ""}`}>
      {plan.popular && <div className="badge">Most Popular</div>}

      <h3>{plan.title}</h3>

      <div className="price">
        <span className="amount">{plan.price}</span>
        <span className="duration">{plan.duration}</span>
      </div>

      <ul>
        {plan.features.map((f, i) => (
          <li key={i}>✓ {f}</li>
        ))}
      </ul>

      <button className="cta-btn" onClick={handlePay}>
        Get Started
      </button>
    </div>
  );
}
