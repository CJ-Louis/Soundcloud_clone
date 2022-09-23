import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'
import './songs.css'


function SongsPage() {
  const dispatch = useDispatch();

  const songs = useSelector(state => {
    return state.songs.songlist;
  });
  const user = useSelector(state => {
    return state.session.user
  });


  useEffect(() => {
    dispatch(songActions.retrieveSongs())
  },[dispatch])

  const songList = (songArr) => {
    console.log(songArr)
    let list = songArr.map(song =>{
        return(
        <li key={song.id} className='songcard'>
            <span>
                <img className='imgs' src={song.imageUrl} alt='image not found' />
            </span>
        <div>
            <span>
                <NavLink to={`/songs/${song.id}`} className='songlink'>{song.title}</NavLink>
            </span>
            <p></p>
        </div>
        </li>
        )
    })

    return list
  }

  if (!songs){
    return <div>Loading</div>
  }

  let userCreate;
  if (!user) {
   userCreate = ( <div>Sign up or log in in order to produce some songs</div>)
  }
  else {
    userCreate = (<i class="fa-solid fa-cloud-arrow-up">
      <NavLink to={`/songs/create`} className='edittext'> Make a new song</NavLink>
      </i>)

  }

  return (
    <div className="songlistdiv">
        <div className="topimg homie"></div>
        <h1>Top Songs</h1>
        <ul className="songs">
            {songList(songs)}
        </ul>
        <div>
        <span>
            {userCreate}
        </span>
        </div>
    </div>
  );
}

export default SongsPage;
