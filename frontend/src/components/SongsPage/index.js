import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
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
        <li>
            <span>Title: {song.title}</span>
            <p>     description: {song.title}</p>
            <p>     By: {song.userId}</p>
            <span>     img: no current working img urls</span>
            <p></p>
        </li>
        )
    })
    console.log('this is the list',list)
    return list
  }
  console.log(songList(songs))
  if (!songs){
    return <div>Loading</div>
  }

  return (
    <div>
        <ul>
            {songList(songs)}
        </ul>
    </div>
  );
}

export default SongsPage;
