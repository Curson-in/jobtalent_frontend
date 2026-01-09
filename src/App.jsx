import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import TalentDashboard from './pages/TalentDashboard.jsx';
import EmployerDashboard from './pages/EmployerDashboard.jsx';
import TalentProfile from './pages/TalentProfile.jsx';

import TalentOnboarding from './onboarding/TalentOnboarding';

import ProtectedRoute from './routes/ProtectedRoute';
import EditTalentProfile from './pages/EditTalentProfile';
import About from './pages/public/About.jsx';
import Contact from './pages/public/Contact.jsx';
import PrivacyPolicy from './pages/public/PrivacyPolicy.jsx';
import Terms from './pages/public/Terms.jsx';



import OAuthSuccess from './pages/OAuthSuccess.jsx';
import LoginRedirect from './pages/LoginRedirect.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import VerifyOTP from './pages/VerifyOTP.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

import EmployerProfile from './pages/employer/EmployerProfile.jsx';
import EmployerOnboarding from './pages/employer/EmployerOnboarding.jsx';
import Pricing from "./pages/premium/Pricing.jsx";
import PaymentSuccess from "./pages/premium/PaymentSuccess.jsx";
import ResumeEnhance from './pages/premium/ResumeEnhance.jsx';






import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />


      {/* OAuth */}
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/login-redirect" element={<LoginRedirect />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<Terms />} />


       
<Route path="/employer/profile" element={<EmployerProfile />} />



          {/* Google OAuth */}
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/login-redirect" element={<LoginRedirect />} />


      {/* Talent Onboarding */}
      <Route
        path="/talent/onboarding"
        element={
          <ProtectedRoute role="talent">
            <TalentOnboarding />
          </ProtectedRoute>
        }
      />

      {/* Employer Onboarding */}
      <Route
  path="/employer/onboarding"
  element={
    <ProtectedRoute role="employer">
      <EmployerOnboarding />
    </ProtectedRoute>
  }
/>

<Route
  path="*"
  element={
    <div style={{ padding: 50 }}>
      <h1>Route Not Found</h1>
      <p>Current path not matched</p>
    </div>
  }
/>


      {/* Talent */}
      <Route
        path="/talent/dashboard"
        element={
          <ProtectedRoute role="talent">
            <TalentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/pricing"
  element={
    <ProtectedRoute role="talent">
      <Pricing />
    </ProtectedRoute>
  }
/>

<Route
  path="/talent/ai-resume"
  element={
    <ProtectedRoute>
      <ResumeEnhance />
    </ProtectedRoute>
  }
/>

<Route
  path="/payment/success"
  element={
    <ProtectedRoute role="talent">
      <PaymentSuccess />
    </ProtectedRoute>
  }
/>


      <Route
        path="/talent/profile"
        element={
          <ProtectedRoute role="talent">
            <TalentProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute role="talent">
            <EditTalentProfile />
          </ProtectedRoute>
        }
      />
       <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/profile"
        element={
          <ProtectedRoute role="employer">
            <EmployerProfile />
          </ProtectedRoute>
        }
      />

      {/* Employer */}
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
