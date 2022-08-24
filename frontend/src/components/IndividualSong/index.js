import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'


function SingleSong() {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const songs = useSelector(state => state.songs.songlist);
  console.log('This is the song', songs)
  console.log('This is the parameter ID',songId)
  useEffect(() => {
    
  },[songId])

  const songArr = Object.values(songs)

  let song = songArr.filter(song => {
    return song.id === +songId
  })
  song = song[0]

  if (!songs){
    return <div>Loading</div>
  }

  return (
    <div>
        <ul>
            <li>
                <span>Title: {song.title}</span>
                <p>     description: {song.description}</p>
                <p>     By: {song.userId}</p>
                <span>     img: no current working img urls</span>
                <p> PLAY: {song.url}</p>
            </li>
        </ul>
        <p>This page can connect</p>
        <NavLink to='/songs'>Back to Songs</NavLink>
    </div>
  );
}

export default SingleSong;
