import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'






function SingleSong({setPlayingSong}) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(songActions.retrieveSongs())
  },[dispatch])

  const { songId } = useParams()


  const song = useSelector(state => {
    return state.songs[songId]
  });
  const user = useSelector(state => {
    return state.session.user
  });

  const listen = (e) => {
    e.preventDefault()
    setPlayingSong(song?.url)
  }




   console.log('This is the songs variable', song)
   console.log('This is our current user', user)

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(songActions.songDeleter(song.id))
    history.push(`/songs`);
  };


   let userOptions;
   if (!user) {
    userOptions = ( <div />)
   }
   else if (user.id === song?.userId) {
   userOptions = (
      <div>
        <p>Click here to
            <NavLink to={`/songs/${song?.id}/edit`} song={song} >Edit</NavLink>
        </p>
        <button type="button" onClick={handleDelete}>Delete</button>
        <div></div>
      </div>
    )
   } else {
      userOptions = (<div />)
   }






  return (
    <div>
        <div className="topimg homie"></div>
        <ul>
            <li>

                <div><img src={song?.imageUrl}  alt='Song image not found' className="cover"/></div>
                <span>Title: {song?.title}</span>
                <p>     description: {song?.description}</p>
                <p>     By: {song?.userId}</p>

                <p> PLAY:
                    <button onClick={listen}>
                        Play
                    </button>
                </p>
            </li>
        </ul>
        {userOptions}
        <NavLink to='/songs'>Back to Songs</NavLink>
    </div>
  );
}

export default SingleSong;
