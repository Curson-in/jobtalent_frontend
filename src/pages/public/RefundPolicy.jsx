// RefundPolicy.jsx
import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund & Cancellation Policy - Curson</title>
        <meta
          name="description"
          content="Refund and cancellation policy for Curson subscriptions."
        />
        <link
          rel="canonical"
          href="https://www.curson.in/refund-policy"
        />
      </Helmet>

      <div className="public-page">
        <div className="public-container">
          <h1 className="public-title">Refund & Cancellation Policy</h1>

          <p className="public-subtitle">
            Curson provides digital subscription-based services.
          </p>

          <div className="public-section">
            <p>
              Once a subscription is activated, refunds are generally not provided.
            </p>

            <p>
              If a user faces a technical issue that prevents access to paid features,
              they may contact us within <strong>48 hours</strong> of payment for review.
            </p>

            <p>
              Approved refunds will be processed within
              <strong> 1-2 business days</strong> to the original payment method.
            </p>

            <p>
              For support, contact:
              <strong> support@curson.in</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
