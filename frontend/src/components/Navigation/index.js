import React, {useEffect, useState} from 'react';
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

        <div className='linkybox'>
        <NavLink exact to="/" >
            <img className='logo' src={logo} alt='' />
        </NavLink>
        <NavLink to='/songs' className='uploadtxt'>
          {/* <img className='songslogo' src={songLogo} /> */}
          <div className='navlinktopbar'>
            Songs
          </div>
        </NavLink>
        <NavLink to='/albums' className='uploadtxt'>
          {/* <img className='albumslogo' src={albumLogo} /> */}
          <div className='navlinktopbar' >
            Albums
          </div>
        </NavLink>
      {sessionUser && (
        <div className='navlinktopbar' onClick={openMenu}>
          Upload
          {showMenu && (
          <ul className="upload-dropdown">
          <li className="uploadstats">
          <NavLink to='/albums/create' className='uploadtxt'>
          {/* <img className='albumslogo' src={albumLogo} /> */}
          <div >
            Make an Album
          </div>
        </NavLink>
          </li>
          <li className="uploadstats">
          <NavLink to='/songs/create' className='uploadtxt'>
          {/* <img className='albumslogo' src={albumLogo} /> */}
          <div >
            Post a song
          </div>
        </NavLink>
          </li>
          {/* <img src="https://c.tenor.com/GwhDgXiOYC0AAAAC/patrick-star-evil-laugh.gif" alt="CJ's dum" /> */}
        </ul>
          )}

        </div>
      )}


        </div>

        <div className='userbuttons'>{isLoaded && sessionLinks}</div>
      </li>
    </ul>
  );
}

export default Navigation;
