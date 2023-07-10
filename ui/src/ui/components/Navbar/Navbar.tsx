// Import packages
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Import react icons
import { FaUserCircle } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

// Import rtk query
import { useLogoutUserMutation } from '../../../store/api';

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
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    const fetchProfileData = () => {
      const { user } = authStatus;
      setUser(user);
    };
    fetchProfileData();
  }, [authStatus]);

  /**
   * Function logout user
   */
  const onLogout = async () => {
    const res = await logoutUser(null);
    const response =
      'data' in res ? res.data : 'data' in res.error ? res.error.data : null;

    if (response.success) {
      toast.success(`${response.message}`, {
        duration: 3000,
        position: 'bottom-center',
        ariaProps: {
          'role': 'status',
          'aria-live': 'polite',
        },
      });
      navigate('/signin');
    } else {
      toast.error(`${response.message}`, {
        duration: 3000,
        position: 'bottom-center',
        ariaProps: {
          'role': 'status',
          'aria-live': 'polite',
        },
      });
    }
  };

  return (
    <div className="nav-main-container">
      <div style={{ backgroundColor: '#01645F' }}>
        <img src="/assets/logo.png" alt="" className="logo" />
      </div>
      <h2 className="nav-title">
        Cine-Info: Connecting You to the Movie Universe
      </h2>
      {user?.profilePicture ? (
        <div onClick={() => setShowProfile(!showProfile)}>
          <img
            src={user?.profilePicture}
            alt=""
            className="nav-profile-image"
          />
        </div>
      ) : (
        <FaUserCircle
          className="nav-profile-icon"
          onClick={() => setShowProfile(!showProfile)}
        />
      )}
      {showProfile && (
        <>
          <div
            className="nav-profile-main-container"
            onClick={() => setShowProfile(false)}
          ></div>
          <div className="nav-profile-container">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                alt=""
                className="profile-image"
              />
            ) : (
              <FaUserCircle
                className="profile-icon"
                onClick={() => setShowProfile(!showProfile)}
              />
            )}
            <p className="profile-displayName">{user?.displayName}</p>
            <div className="hover">
              <div className="profile-info-button">
                <BsFillInfoCircleFill className="profile-info-button-icon" />
                Info
              </div>
              <div className="profile-info-container">
                <table className='info-table'>
                  <tr className='table-head-column'>
                    <td className='table-heading'>Email: </td>
                    <td className='table-content'>{user?.email}</td>
                  </tr>
                  <tr className='table-content-column'>
                    <td className='table-heading'>Name: </td>
                    <td className='table-content'>{user?.displayName}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="profile-info-button" onClick={onLogout}>
              <AiOutlineLogout
                className="profile-info-button-icon"
              />
              logout
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
