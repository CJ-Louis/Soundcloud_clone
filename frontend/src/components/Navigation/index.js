import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logo from '../../SiteImages/logo.png'
import songLogo from '../../SiteImages/song-logo.png'
import albumLogo from '../../SiteImages/album-logo.png'

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal className='user'/>
        <NavLink to="/signup" className='usersignup'>Create Account</NavLink>
      </>
    );
  }

  return (
    <ul className='blacksheep'>
      <li className='topbar'>
        <NavLink exact to="/" >
            <img className='logo' src={logo} alt='' />
        </NavLink>
        <NavLink to='/songs'>
          <img className='songslogo' src={songLogo} />
        </NavLink>
        <NavLink to='/albums'>
          <img className='albumslogo' src={albumLogo} />
        </NavLink>
        <div className='userbuttons'>{isLoaded && sessionLinks}</div>
      </li>
    </ul>
  );
}

export default Navigation;
