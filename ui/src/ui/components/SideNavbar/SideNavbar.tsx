// Import package
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import react icons
import {
  AiOutlineHome,
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';

// Import components
import showToast from '../showToast';

// Import rtk query
import { useLogoutUserMutation } from '../../../store/api';

// Import css
import './SideNavbar.css';

const SideNavbar = () => {
  const navigate = useNavigate();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    setIsMobileScreen(window.innerWidth < 500);
  }, []);

  /**
   * Function logout user
   */
  const onLogout = async () => {
    const res = await logoutUser(null);
    const response =
      'data' in res ? res.data : 'data' in res.error ? res.error.data : null;

    if (response.success) {
      showToast({ message: `${response.message}`, type: 'success' });
      navigate('/signin');
    } else {
      showToast({ message: `${response.message}`, type: 'error' });
    }
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
