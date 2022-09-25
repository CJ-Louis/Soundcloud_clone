import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import profile from '../../SiteImages/profile-img.png'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      {/* <button className='userbutton' > */}
        {/* <i className="fa-duotone fa-cloud"></i>
         */}
         <img className='cloudprofile' src={profile} alt='user-profile' onClick={openMenu}/>
      {/* </button> */}
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="userstats">{user.username}</li>
          <li className="userstats">
            <button className="logout" onClick={logout}>Log Out</button>
          </li>
          {/* <img src="https://c.tenor.com/GwhDgXiOYC0AAAAC/patrick-star-evil-laugh.gif" alt="CJ's dum" /> */}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
