import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'


function SingleSong() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(songActions.retrieveSongs())
  },[dispatch])


  const songs = useSelector(state => {
    return state.songs.songlist
    });

  const { songId } = useParams()

  const songArr = Object.values(songs)
  let song = songArr.filter(song => {
    return song.id === +songId
  })
  song = song[0]


  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(songActions.songDeleter(song.id))

    history.push(`/songs`);
  };


  return (
    <div>
        <ul>
            <li>
                <span>Title: {song?.title}</span>
                <p>     description: {song?.description}</p>
                <p>     By: {song?.userId}</p>
                <span>     img: no current working img urls</span>
                <p> PLAY: {song?.url}</p>
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
