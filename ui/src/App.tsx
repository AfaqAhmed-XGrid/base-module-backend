// Import packages
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import components
import PrivateRoute from './ui/components/PrivateRoute';
import Navbar from './ui/components/Navbar/Navbar';

// Import pages
import Signin from './ui/pages/Signin/Signin';
import Signup from './ui/pages/Signup/Signup';
import Dashboard from './ui/pages/Dashboard/Dashboard';
import SideNavbar from './ui/components/SideNavbar/SideNavbar';

const App = () => {
  const location = useLocation();
  const showNavbar = ['/dashboard', '/charts', '/user', '/edit-profile', '/change-password'].includes(location.pathname);
  return (
    <section>
      {showNavbar && <Navbar />}
      {showNavbar && <SideNavbar />}
      <Routes>
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
        <Route
          path="/"
          element={<PrivateRoute Component={Dashboard} />}
        />
        <Route path="/signin" element=<Signin /> />
        <Route path="/signup" element=<Signup /> />
      </Routes>
      <Toaster />
    </section>
  );
};

export default App;
