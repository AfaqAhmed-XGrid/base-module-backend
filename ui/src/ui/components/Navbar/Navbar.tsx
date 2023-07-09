// Import packages
import React, { useEffect, useState } from 'react';

// Import react icons
import { FaUserCircle } from 'react-icons/fa';

// Import css
import './Navbar.css';

// Import custom hook
import { useAuthStatus } from '../../../hooks/useAuthStatus';

// Import type
import { User } from '../../../app.types';

const Navbar = () => {
  // const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const authStatus = useAuthStatus();

  useEffect(() => {
    const fetchProfileData = () => {
      const { user } = authStatus;
      setUser(user);
    };
    fetchProfileData();
  }, [authStatus]);

  return (
    <div className="nav-main-container">
      <div style={{ backgroundColor: '#01645F' }}>
        <img src="/assets/logo.png" alt="" className="logo" />
      </div>
      <h2 className='nav-title'>
      Cine-Info:  Connecting You to the Movie Universe
      </h2>
      {user?.profilePicture ? (
          <div onClick={() => setShowProfile(!showProfile)}>
            <img src={user?.profilePicture} alt="" className="profile-image" />
          </div>
        ) : (
          <FaUserCircle
            className='profile-icon'
            onClick={() => setShowProfile(!showProfile)}
          />
        )}
    </div>
  );
};

export default Navbar;
