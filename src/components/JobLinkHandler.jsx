import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function JobLinkHandler() {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();

  // ⏳ Wait for Auth check to finish
  if (loading) return <div className="loading-spinner"></div>; 

  if (user) {
    // ✅ User IS logged in -> Go to Dashboard
    return <Navigate to="/talent/dashboard" replace />;
  } else {
    // ❌ User is NOT logged in -> Go to Signup
    // We add '?redirect=' so they come back to the dashboard after signing up
    return <Navigate to={`/signup?redirect=/talent/dashboard`} replace />;
  }
}