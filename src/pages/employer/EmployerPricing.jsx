import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import EmployerNavbar from '../../components/EmployerNavbar.jsx'; // Import Navbar
import { createRazorpayOrder, verifyRazorpayPayment } from '../../services/paymentService'; 
import '../../assets/css/employer.css'; 

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div 
      className={`toast show align-items-center text-white border-0 position-fixed top-0 end-0 m-4 shadow-lg`} 
      style={{ zIndex: 1060, backgroundColor: type === 'error' ? '#ef4444' : '#10b981', borderRadius: '10px' }}
    >
      <div className="d-flex">
        <div className="toast-body px-4 py-3 fw-medium">
          {type === 'success' ? <i className="bi bi-check-circle-fill me-2"></i> : <i className="bi bi-exclamation-circle-fill me-2"></i>}
          {message}
        </div>
        <button type="button" className="btn-close btn-close-white me-3 m-auto" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default function EmployerPricing() {
  const navigate = useNavigate();

  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Hide after 3 seconds
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };
  

  const plans = [
    {
      key: 'monthly_499', 
      name: 'Starter',
      price: '₹499',
      duration: '/ month',
      color: 'border-primary',
      badgeColor: 'bg-primary',
      btnClass: 'btn-outline-primary',
      features: [
        '3 Job Posts / month',
        '5 Invites',
        '10 Candidate Searches',
        '5 Saved Profiles',
        'Smart Sorting'
      ]
    },
    {
      key: 'quarterly_1399', 
      name: 'Growth',
      price: '₹1399',
      duration: '/ 3 months',
      tag: 'MOST POPULAR',
      color: 'border-success',
      badgeColor: 'bg-success',
      btnClass: 'btn-success text-white',
      features: [
        '10 Job Posts / quarter',
        '15 Invites',
        '30 Candidate Searches',
        '15 Saved Profiles',
        'Smart Sorting',
        'Priority Support'
      ]
    },
    {
      key: 'yearly_4999', 
      name: 'Pro',
      price: '₹4999',
      duration: '/ year',
      color: 'border-warning',
      badgeColor: 'bg-warning text-dark',
      btnClass: 'btn-outline-warning text-dark',
      features: [
        'Unlimited Job Posts',
        '60 Invites',
        '120 Candidate Searches',
        '60 Saved Profiles',
        'Smart Sorting',
        'Priority Support'
        
      ]
    }
  ];

const handlePurchase = async (plan) => {
    try {
      const order = await createRazorpayOrder(plan.key);

      const options = {
        key: order.key, 
        amount: order.amount,
        currency: "INR",
        order_id: order.orderId, 
        name: "Curson Hiring",
        description: `${plan.name} Employer Plan`,
        
        // --- SUCCESS HANDLER ---
        handler: async (response) => {
          try {
            await verifyRazorpayPayment(response);
            // 🔥 Custom Notification
            showToast(`Upgrade Successful! Welcome to ${plan.name}.`, 'success');
            
            // Redirect after 2 seconds so user sees the toast
            setTimeout(() => {
                navigate("/employer/dashboard");
            }, 2000);

          } catch (err) {
            console.error(err);
            showToast("Payment verification failed. Please contact support.", "error");
          }
        },
        prefill: {
          name: "Employer", 
          email: "employer@example.com" // You can inject actual user email here if available
        },
        theme: { color: "#0d6efd" }
      };

      const rzp = new window.Razorpay(options);
      
      // --- FAILURE HANDLER ---
      rzp.on('payment.failed', function (response){
        showToast(response.error.description || "Payment Failed", "error");
      });
      
      rzp.open();

    } catch (err) {
      console.error("Payment Start Error:", err);
      showToast("Could not initiate payment. Please try again.", "error");
    }
  };

  const handleTabChange = () => {
    navigate('/employer/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100 font-sans">

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({message:'', type:''})} 
      />
      
      {/* --- NAVBAR --- */}
      <EmployerNavbar 
        activeTab="" // No specific tab active on pricing page
        setActiveTab={handleTabChange} 
        handleLogout={handleLogout} 
      />

      {/* --- HERO SECTION --- */}
      <div className="container text-center py-5">
        <h1 className="display-5 fw-bold text-dark mb-3">Upgrade Your Hiring Power</h1>
        
      </div>

      {/* --- PRICING CARDS --- */}
      <div className="container pb-5">
        <div className="row justify-content-center align-items-center">
          {plans.map((plan, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div 
                className={`card h-100 border-0 shadow-lg position-relative ${plan.tag ? 'transform-scale-105 z-index-1' : ''}`} 
                style={{ 
                  borderRadius: '16px', 
                  transition: 'transform 0.3s ease',
                  transform: plan.tag ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {/* Popular Tag */}
                {plan.tag && (
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <span className="badge bg-success rounded-pill px-3 py-2 shadow-sm text-uppercase tracking-wider">
                      {plan.tag}
                    </span>
                  </div>
                )}

                <div className={`card-header bg-transparent border-0 text-center pt-4 ${plan.tag ? 'mt-2' : ''}`}>
                  <h4 className="fw-bold text-muted text-uppercase small tracking-widest mb-0">{plan.name}</h4>
                </div>

                <div className="card-body text-center d-flex flex-column px-4">
                  <div className="my-3">
                    <span className="display-4 fw-bold text-dark">{plan.price}</span>
                    <span className="text-muted fs-6 ms-1">{plan.duration}</span>
                  </div>

                  <hr className="text-muted opacity-25 my-4" />

                  <ul className="list-unstyled text-start mb-5 mx-auto w-100">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="mb-3 d-flex align-items-start">
                        <span className="me-2 text-success">
                          <i className="bi bi-check-circle-fill"></i>
                        </span>
                        <span className="text-secondary">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto mb-3">
                    <button 
                      className={`btn ${plan.btnClass} w-100 py-3 rounded-pill fw-bold shadow-sm`}
                      onClick={() => handlePurchase(plan)}
                      style={{ letterSpacing: '0.5px' }}
                    >
                      Select {plan.name} Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust/Footer Note */}
        <div className="text-center mt-5 text-muted">
          <small>
            Secure payment via Razorpay • Upgrade Anytime • 24/7 Support
          </small>
        </div>
      </div>
    </div>
  );
}