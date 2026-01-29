import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function JobLinkHandler() {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();

  if (loading) return <div className="loading-spinner"></div>; 

  if (user) {
    // ✅ Logged in? Go to dashboard with highlight param
    return <Navigate to={`/talent/dashboard?highlight=${id}`} replace />;
  } else {
    // ❌ Not Logged in? Go to signup, then redirect to dashboard with highlight
    // We encode the URL so the ?highlight=123 part survives the signup process
    const targetUrl = encodeURIComponent(`/talent/dashboard?highlight=${id}`);
    return <Navigate to={`/signup?redirect=${targetUrl}`} replace />;
  }
}