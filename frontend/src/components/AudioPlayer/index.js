import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(songActions.retrieveSongs())
  },[dispatch])

  const { songId } = useParams()


  const song = useSelector(state => {
    return state.songs[songId]
  });





   console.log('This is the songs variable', song)

  return (
  <div>
  <AudioPlayer
    autoPlay
    src={song?.url}
    onPlay={e => console.log("onPlay")}
    // other props here
  />
  <NavLink to={`/songs/${songId}`}>Back to the songs page</NavLink>
  </div>
  )
};

export default Player;
