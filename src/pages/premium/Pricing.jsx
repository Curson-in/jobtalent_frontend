import PricingCard from "../../components/premium/PricingCard";
import "./Pricing.css";
import NavbarPremium from "../../components/NavbarPremium";


export default function Pricing() {
 const plans = [
  {
    key: "monthly_99",
    title: "Starter",
    price: "₹99",
    duration: "per month",
    popular: false,
    features: [
      "Apply to unlimited jobs",
      "7 days profile boosting",
      "Email notifications",
    ],
  },
  {
    key: "quarterly_149",
    title: "Pro",
    price: "₹149",
    duration: "for 4 months",
    popular: true,
    features: [
      "Follow-up messages",
      "Profile boost (Top 20%)",
      "Enhanced resume insights",
      "Higher recruiter visibility",
    ],
  },
  {
    key: "yearly_399",
    title: "Elite",
    price: "₹399",
    duration: "per year",
    popular: false,
    features: [
      "Everything in Pro",
      "Priority resume enhancement",
      "Future premium features",
    ],
  },
];




  return (
  <>
    {/* NAVBAR */}
    <NavbarPremium active="pricing" />

    {/* PAGE */}
    <div className="pricing-page">

      {/* HEADER */}
      <div className="pricing-header">
        <h1>Plans that work for your career</h1>
        <p>
          Upgrade to stand out, get noticed, and land jobs faster.
        </p>
      </div>

      {/* PLANS */}
      <div className="pricing-grid">
        {plans.map(plan => (
          <PricingCard key={plan.key} plan={plan} />
        ))}
      </div>

      {/* FOOTER */}
      <div className="pricing-footer">
        <p>Secure payments • Cancel anytime • No auto-renew</p>
      </div>

    </div>
  </>
);

}
