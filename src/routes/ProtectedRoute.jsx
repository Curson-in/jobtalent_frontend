import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, token, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return null;

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  /* ================= TALENT ONBOARDING LOGIC ================= */

  // ✅ ALLOW talent onboarding page ALWAYS
  if (
    user.role === 'talent' &&
    location.pathname === '/talent/onboarding'
  ) {
    return children;
  }

  // 🚫 Prevent onboarded talent from going back to onboarding
  if (
    user.role === 'talent' &&
    user.isOnboarded &&
    location.pathname === '/talent/onboarding'
  ) {
    return <Navigate to="/talent/dashboard" replace />;
  }

  // 🚫 Force onboarding if talent is NOT onboarded
  if (
    user.role === 'talent' &&
    user.isOnboarded === false &&
    (
      location.pathname === '/talent/dashboard' ||
      location.pathname === '/talent/profile' ||
      location.pathname === '/profile/edit'
    )
  ) {
    return <Navigate to="/talent/onboarding" replace />;
  }

  /* =========================================================== */

  return children;
}
