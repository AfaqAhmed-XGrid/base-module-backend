// Import packages
import React from 'react';
import { Navigate } from 'react-router-dom';

// Import custom hooks
import { useAuthStatus } from '../../hooks/useAuthStatus';

// Import constants
import constants from '../../app.constants';


const PrivateRoute = ({ Component }: {Component: () => JSX.Element}) => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (window.location.pathname === '/') return <Navigate to="/dashboard" />;
  if (checkingStatus) {
    return <div>Loading...</div>;
  }
  return loggedIn? <Component />:<Navigate to={constants.pagelinks.signin} />;
};

export default PrivateRoute;
