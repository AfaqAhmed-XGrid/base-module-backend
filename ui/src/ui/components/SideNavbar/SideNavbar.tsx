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

// Import package
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import react icons
import {
  AiOutlineHome,
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';

// Import components
import showToast from '../showToast';

// Import css
import './SideNavbar.css';

const SideNavbar = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  useEffect(() => {
    setIsMobileScreen(window.innerWidth < 500);
  }, []);
  /**
   * Function logout user
   */
  const onLogout = async () => {
    showToast({ message: 'You are logged out successfully', type: 'success' });
  };

  const data = [
    {
      mainLink: '/dashboard',
      Icon: AiOutlineHome,
      title: 'dashboard',
    },
    {
      subLinks: [
        { link: '/edit-profile', title: 'edit profile' },
        { link: '/change-password', title: 'change password' },
        { onClick: onLogout, title: 'logout' },
      ],
      Icon: AiOutlineUser,
      title: 'profile',
    },
    {
      mainLink: '/charts',
      Icon: AiOutlinePieChart,
      title: 'charts',
    },
    {
      mainLink: '/users',
      Icon: AiOutlineUsergroupAdd,
      title: 'users',
    },
  ];

  return (
    <div className="side-nav-main-container">
      {data &&
        data.map((navItem, ind) => (
          <div key={ind} className="side-nav-items-list">
            {navItem?.mainLink ? (
              <Link to={navItem.mainLink} className="side-nav-item">
                <div className='test'>
                  <navItem.Icon className="side-nav-item-icon" />
                  <p className="side-nav-item-title">{navItem.title}</p>
                </div>
              </Link>
            ) : (
              <div className="side-nav-item">
                <div className='test'>
                  <navItem.Icon className="side-nav-item-icon" />
                  <p className="side-nav-item-title">{navItem.title}</p>
                </div>
                <div className={`${isMobileScreen? 'side-nav-sub-menu-mobile' : 'side-nav-sub-menu'}`}>
                  {navItem?.subLinks?.map((navSubItem, subInd) => (
                    <div key={subInd}>
                      {navSubItem?.link ? (
                        <Link
                          to={navSubItem?.link}
                          className={`${isMobileScreen? 'side-nav-sub-menu-item-mobile' : 'side-nav-sub-menu-item'}`}
                        >
                          {navSubItem.title}
                        </Link>
                      ) : (
                        <button
                          onClick={navSubItem?.onClick}
                          className={`${isMobileScreen? 'side-nav-sub-menu-item-mobile' : 'side-nav-sub-menu-item'}`}
                        >
                          {navSubItem.title}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default SideNavbar;
