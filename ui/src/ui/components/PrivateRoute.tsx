// Import packages
import React from 'react';
import { Navigate } from 'react-router-dom';

// Import custom hooks
import { useAuthStatus } from '../../hooks/useAuthStatus';


export default function PrivateRoute({ Component }: {Component: () => JSX.Element}) {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (window.location.pathname === '/') return <Navigate to="/dashboard" />;
  if (checkingStatus) {
    return <div>Loading...</div>;
  }
  return loggedIn? <Component />:<Navigate to="/signin" />;
}
