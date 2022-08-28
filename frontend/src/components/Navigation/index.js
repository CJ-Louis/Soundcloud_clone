import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logo from '../../SiteImages/logo.png'
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
        <NavLink to="/signup" className='user signup'>Creat an Account</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li className='topbar'>
        <NavLink exact to="/" >
            <img className='logo' src={logo} alt='' />
        </NavLink>
        <div className='userbuttons'>{isLoaded && sessionLinks}</div>
      </li>
    </ul>
  );
}

export default Navigation;
