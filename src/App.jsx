import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import "./assets/css/blogs.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// ... all your imports ...
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
import Legal from './pages/public/Legal.jsx';
import RefundPolicy from './pages/public/RefundPolicy.jsx';
import OAuthSuccess from './pages/OAuthSuccess.jsx';
import LoginRedirect from './pages/LoginRedirect.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import VerifyOTP from './pages/VerifyOTP.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import EmployerProfile from './pages/employer/EmployerProfile.jsx';
import EmployerOnboarding from './pages/employer/EmployerOnboarding.jsx';
import Pricing from "./pages/premium/Pricing.jsx";
import ResumeEnhance from './pages/premium/ResumeEnhance.jsx';
import Blogs from "./pages/Blogs";
import WriteBlog from "./pages/WriteBlog";
import BlogDetail from "./pages/BlogDetail";
import Discover from "./pages/Discover.jsx";
import JobMatchPage from './pages/premium/JobMatchPage';
import JobLinkHandler from './components/JobLinkHandler';
import Features from './pages/public/Features';
import FAQ from './pages/public/FAQ.jsx';
import EmployerPricing from './pages/employer/EmployerPricing.jsx';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* Public Static Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/features" element={<Features />} />
      <Route path="/faq" element={<FAQ />} />
      
      {/* Auth & Redirects */}
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/login-redirect" element={<LoginRedirect />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Blogs */}
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      <Route path="/blogs/write" element={<ProtectedRoute><WriteBlog /></ProtectedRoute>} />

      {/* Talent Routes */}
      <Route path="/talent/onboarding" element={<ProtectedRoute role="talent"><TalentOnboarding /></ProtectedRoute>} />
      <Route path="/talent/dashboard" element={<ProtectedRoute role="talent"><TalentDashboard /></ProtectedRoute>} />
      <Route path="/talent/profile" element={<ProtectedRoute role="talent"><TalentProfile /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute role="talent"><EditTalentProfile /></ProtectedRoute>} />
      <Route path="/pricing" element={<ProtectedRoute role="talent"><Pricing /></ProtectedRoute>} />
      <Route path="/talent/ai-resume" element={<ProtectedRoute><ResumeEnhance /></ProtectedRoute>} />
      <Route path="/talent/job-match" element={<ProtectedRoute><JobMatchPage /></ProtectedRoute>} />

      {/* Employer Routes */}
      <Route path="/employer/onboarding" element={<ProtectedRoute role="employer"><EmployerOnboarding /></ProtectedRoute>} />
      <Route path="/employer/dashboard" element={<ProtectedRoute role="employer"><EmployerDashboard /></ProtectedRoute>} />
      <Route path="/employer/profile" element={<ProtectedRoute role="employer"><EmployerProfile /></ProtectedRoute>} />
      <Route path="/employer/pricing" element={<ProtectedRoute role="employer"><EmployerPricing /></ProtectedRoute>} />

      {/* Utility */}
      <Route path="/job/:id" element={<JobLinkHandler />} />

      {/* ✅ SINGLE 404 CATCH-ALL AT THE BOTTOM */}
      <Route path="*" element={
        <div style={{ padding: 50, textAlign: 'center' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <a href="/" style={{ color: '#6366f1', textDecoration: 'underline' }}>Go Home</a>
        </div>
      } />
    </Routes>
  );
}

export default App;