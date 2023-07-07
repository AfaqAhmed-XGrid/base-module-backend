// Import packages
import React from 'react';
import { Toaster } from 'react-hot-toast';

// Import components
import Navbar from './ui/components/Navbar/Navbar';
import SideNavbar from './ui/components/SideNavbar/SideNavbar';

const App = () => {
  return (
    <section>
      <Navbar />
      <SideNavbar />
      <Toaster />
    </section>
  );
};

export default App;
