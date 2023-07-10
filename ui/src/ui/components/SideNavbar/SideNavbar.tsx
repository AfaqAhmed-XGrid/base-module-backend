// Import package
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Import react icons
import {
  AiOutlineHome,
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';

// Import css
import './SideNavbar.css';

const SideNavbar = () => {
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
                  <navItem.Icon className="side-nav-item-icon" />
                  <p className="side-nav-item-title">
                    {navItem.title}
                  </p>
                </Link>
            ) : (
              <div className="side-nav-item">
                <navItem.Icon className="side-nav-item-icon" />
                <p className="side-nav-item-title">{navItem.title}</p>
                <div className="side-nav-sub-menu">
                  {navItem?.subLinks?.map((navSubItem, subInd) => (
                    <div key={subInd}>
                      {navSubItem?.link ? (
                    <Link
                      to={navSubItem?.link}
                      className="side-nav-sub-menu-item"
                    >
                      {navSubItem.title}
                    </Link>
                  ) : (
                    <button
                      onClick={navSubItem?.onClick}
                      className="side-nav-sub-menu-item"
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
