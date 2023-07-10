// Import packages
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import components
import Navbar from './ui/components/Navbar/Navbar';
import SideNavbar from './ui/components/SideNavbar/SideNavbar';

const App = () => {
  const location = useLocation();
  const showNavbar = ['/dashboard', '/charts', '/user', '/edit-profile', '/change-password'].includes(location.pathname);
  return (
    <section>
      {showNavbar && <Navbar />}
      {showNavbar && <SideNavbar />}
      <Toaster />
    </section>
  );
};

export default App;
