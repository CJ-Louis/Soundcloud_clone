import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS





function SingleSong() {
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




  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(songActions.songDeleter(song.id))
    history.push(`/songs`);
  };


  return (
    <div>
        <ul>
            <li>

                <div><img src={song?.imageUrl}  alt='Song image not found' /></div>
                <span>Title: {song?.title}</span>
                <p>     description: {song?.description}</p>
                <p>     By: {song?.userId}</p>

                <p> PLAY:
                    <AudioPlayer
                        // autoPlay
                        src={song?.url}
                        onPlay={e => console.log("onPlay")}
                        // other props here
                    />
                </p>
            </li>
        </ul>
        <p>Click here to
            <NavLink to={`/songs/${song?.id}/edit`} song={song} >Edit</NavLink>
        </p>
        <button type="button" onClick={handleDelete}>Delete</button>
        <div></div>
        <NavLink to='/songs'>Back to Songs</NavLink>
    </div>
  );
}

export default SingleSong;
