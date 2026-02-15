import PricingCard from "../../components/premium/PricingCard";
import NavbarPremium from "../../components/NavbarPremium";
import "./Pricing.css";

export default function Pricing() {
  const plans = [
    {
      key: "monthly_99",
      title: "Starter",
      price: "₹99",
      duration: "/ month",
      popular: false,
      features: [
        
        "28 follow-ups per month",
        "7 days profile boost",
        "Basic Support"
        
      ]
    },
    {
      key: "quarterly_149",
      title: "Pro",
      price: "₹149",
      duration: "/ 4 months",
      popular: true,
      features: [
        "Everything in Starter",
        "Follow-up messages",
        "60 days Profile boost",
        "Resume enhancement and tips",
        "Higher recruiter visibility"
      ]
    },
    {
      key: "yearly_399",
      title: "Elite",
      price: "₹399",
      duration: "/ year",
      popular: false,
      features: [
        "Everything in Pro",
        "Premium Support",
        "Future premium features"
      ]
    }
  ];

  return (
    <>
      <NavbarPremium active="pricing" />

      <div className="pricing-page">
        <div className="pricing-header">
          <h1>Plans that work for your career</h1>
          <p>Upgrade to stand out and get hired faster.</p>
        </div>

        <div className="pricing-grid">
          {plans.map(plan => (
            <PricingCard key={plan.key} plan={plan} />
          ))}
        </div>

        <div className="pricing-footer">
          Secure payments • No auto-renew
        </div>
      </div>
    </>
  );
}
