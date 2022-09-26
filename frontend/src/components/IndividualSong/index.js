import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import * as songActions from '../../store/songs'
import playdasong from '../../SiteImages/playdasong.png'






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
  const songArr = useSelector(state => {
    return state.songs.songlist
  })
  const user = useSelector(state => {
    return state.session.user
  });

  const listen = (e) => {
    e.preventDefault()
    setPlayingSong(song?.url)
  }


  let songArtist = songArr.find(onesong => {
    return onesong.id === song.id
  })
  console.log('THIS IS SONG ARTIST ', songArtist)
  songArtist = songArtist?.User?.username
  console.log('THIS IS SONG ARTIST ', songArtist)
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
        <i class="fa-solid fa-pencil">
          <NavLink to={`/songs/${song?.id}/edit`} song={song} className='edittext' >Edit</NavLink>
        </i>
        <i className="fa-solid fa-trash" onClick={handleDelete}>Delete</i>
      </div>
    )
   } else {
      userOptions = (<div />)
   }






  return (
    <div className="songlistdiv">
        <div className="topimg homie"></div>
        <ul className="songback">
            <li className="songyboy">

                <div className="imageplace">
                  <img src={song?.imageUrl}  alt='Song image not found' className="cover"/>
                </div>
                <span className="songtext title">{song?.title}</span>

                <p className="songtext artist">{songArtist}</p>
                <p className="songtext description">{song?.description}</p>
                <img className='playonsong' src={playdasong} alt='playbutton' onClick={listen}/>
                {/* <p> PLAY:
                    <button onClick={listen}>
                        Play
                    </button>
                </p> */}
            </li>
        </ul>
        {userOptions}
    </div>
  );
}

export default SingleSong;
