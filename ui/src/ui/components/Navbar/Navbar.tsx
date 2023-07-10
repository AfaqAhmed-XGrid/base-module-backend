// Import packages
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

// Import react icons
import { FaUserCircle } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

// Import css
import './Navbar.css';

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const user: { email: string; displayName: string; profilePicture?: string } =
    {
      email: 'afaq.ahmed@xgrid.co',
      displayName: 'Afaq Ahmed',
    };

  /**
   * Function logout user
   */
  const onLogout = async () => {
    toast.success('You are logged out successfully', {
      duration: 3000,
      position: 'bottom-center',
      ariaProps: {
        'role': 'status',
        'aria-live': 'polite',
      },
    });
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
          />
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
            <div className="nav-info-hover">
              <div className="nav-info-button">
                <BsFillInfoCircleFill className="nav-info-button-icon" />
                Info
              </div>
              <div className="nav-info-container">
                <table className='nav-info-table'>
                  <tr>
                    <td className='nav-info-table-heading'>Email</td>
                    <td className='nav-info-table-content'>{user.email}</td>
                  </tr>
                  <tr>
                    <td className='nav-info-table-heading'>Name</td>
                    <td className='nav-info-table-content'>{user.displayName}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="nav-info-button" onClick={onLogout}>
              <AiOutlineLogout className="nav-info-button-icon" />
              logout
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
