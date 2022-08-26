import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'


function SongsPage() {
  const dispatch = useDispatch();

  const songs = useSelector(state => {
    return state.songs.songlist;
  });

  useEffect(() => {
    dispatch(songActions.retrieveSongs())
  },[dispatch])

  const songList = (songArr) => {
    console.log(songArr)
    let list = songArr.map(song =>{
        return(
        <li key={song.id}>
            <span>Title:
                <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
            </span>
            <p>     description: {song.description}</p>
            <p>     By: {song.userId}</p>
            <span>     img: no current working img urls</span>
            <p></p>
        </li>
        )
    })

    return list
  }

  if (!songs){
    return <div>Loading</div>
  }

  return (
    <div>
        <ul>
            {songList(songs)}
        </ul>
        <div>
        <span>Add:
            <NavLink to={`/songs/create`}> Make a new song</NavLink>
        </span>
        </div>
    </div>
  );
}

export default SongsPage;
