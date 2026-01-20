// Legal.jsx
import "../../assets/css/public-pages.css";
import { Helmet } from "react-helmet-async";

export default function Legal() {
  return (
    <>
      <Helmet>
        <title>Legal Information - Curson</title>
        <meta
          name="description"
          content="Legal information and business details for Curson."
        />
        <link rel="canonical" href="https://www.curson.in/legal" />
      </Helmet>

      <div className="public-page">
        <div className="public-container">
          <h1 className="public-title">Legal Information</h1>

          <p style={{ fontSize: "12px", color: "#9aa0a6", marginTop: "16px" }}>
            Curson is a brand operated by
            <strong> Shrawan Rajendra Wandhekar</strong>,
            a sole proprietorship registered in India.
          </p>

          <p style={{ fontSize: "13px", color: "#9aa0a6", marginTop: "8px" }}>
            Business activity: Online job and talent platform (digital services).
          </p>
        </div>
      </div>
    </>
  );
}
