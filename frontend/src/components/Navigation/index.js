import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
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
        <NavLink exact to="/">Home</NavLink>
        <img src='https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Top img' className='topimg'></img>
        <div>{isLoaded && sessionLinks}</div>

      </li>
    </ul>
  );
}

export default Navigation;
