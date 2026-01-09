import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
  const refresh = async () => {
    await fetch("/profile/talent", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    window.location.href = "/talent/dashboard";
  };

  setTimeout(refresh, 2000);
}, []);


  return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <h1>🎉 Payment Successful</h1>
      <p>Your premium plan is now active.</p>
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
