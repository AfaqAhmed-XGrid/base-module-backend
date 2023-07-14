/*
Copyright (c) 2023, Xgrid Inc, http://xgrid.co

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Import packages
import React, { useState } from 'react';

// Import react icons
import { FaUserCircle } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';

// Import constants
import constants from '../../../app.constants';

// Import components
import showToast from '../showToast';

// Import css
import './Navbar.css';

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const user: { email: string; displayName: string; profilePicture?: string } =
    {
      email: constants.dummyUser.email,
      displayName: constants.dummyUser.displayName,
    };

  /**
   * Function logout user
   */
  const onLogout = async () => {
    showToast({ message: 'You are logged out successfully', type: 'success' });
  };

  return (
    <div className="nav-main-container">
      <div className='logo-container'>
        <img src={constants.paths.logo} alt="" className="logo" />
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
