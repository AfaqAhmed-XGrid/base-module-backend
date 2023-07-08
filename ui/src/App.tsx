// Import packages
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import components
import PrivateRoute from './ui/components/PrivateRoute';

// Import pages
import Signin from './ui/pages/Signin/Signin';
import Signup from './ui/pages/Signup/Signup';
import Dashboard from './ui/pages/Dashboard/Dashboard';

const App = () => {
  return (
    <section>
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
