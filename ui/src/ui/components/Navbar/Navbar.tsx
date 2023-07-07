// Import packages
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Import react icons
import { FaUserCircle } from "react-icons/fa";

// Import components
import IconButton from "../IconButton/IconButton";
import ProfileBar from "../ProfileBar/ProfileBar";

// Import css
import "./Navbar.css";

// Import custom hook
import { useAuthStatus } from "../../../hooks/useAuthStatus";

const Navbar = ({auth}: any) => {
  // const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  const authStatus = useAuthStatus()

  useEffect(() => {
    const fetchProfileData = () => {
      const {user} = authStatus;
      setUser(user)
    };
    fetchProfileData();
  }, [authStatus])

    return (
      <div className="nav-main-container">
        <div className="nav-box">
          <div>
            <img src="/assets/logo.png" alt="" className="logo"/>
          </div>
          <div>
            <ul className="normal-nav">
              <li>
                <NavLink
                  to="/dashboard"
                  className='nav-link'
                  >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/charts"
                  className='nav-link'
                  >
                  Charts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className='nav-link'
                >
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
          {
            user?.profilePicture ? <div onClick={() => setShowProfile(!showProfile)}><img src={user?.profilePicture} alt="" className="profile-image"/></div> : <IconButton id="profileBtn" Icon={FaUserCircle} color={'black'} borderColor={'transparent'} onClick={() => setShowProfile(!showProfile)}/>
          }
        </div>
        <ul className="mobile-nav">
              <li>
                <NavLink
                  to="/dashboard"
                  className='nav-link'
                  >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/charts"
                  className='nav-link'
                  >
                  Charts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className='nav-link'
                >
                  Users
                </NavLink>
              </li>
            </ul>
        {
          showProfile && <ProfileBar user={user} />
        }
      </div>
    );
};

export default Navbar;
