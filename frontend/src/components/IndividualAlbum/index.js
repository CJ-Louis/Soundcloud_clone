import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import * as albumActions from '../../store/albums'


function SingleAlbum() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(albumActions.retrieveAlbums())
  },[dispatch])

  const { albumId } = useParams()


  const album = useSelector(state => {
    return state.albums[albumId]
  });
  const user = useSelector(state => {
    return state.session.user
  });
  const songs = useSelector(state => {
    return state.songs.songlist
  });


  const albumsSongs = songs.filter(song =>{
    return song.albumId == albumId
  })

  const songList = (songArr) => {
    console.log(songArr)
    let list = songArr.map(song =>{
        return(
        <li key={song.id}>
            <span>
                <img className='imgs' src={song.imageUrl} alt='image not found' />
            </span>
        <div></div>
            <span>Title:
                <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
            </span>
            <p></p>
        </li>
        )
    })

    return list
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(albumActions.albumDeleter(album.id))

    history.push(`/albums`);
  };


  let userOptions;
  if (!user) {
   userOptions = ( <div />)
  }
  else if (user.id === album?.userId) {
  userOptions = (
     <div>
       <p>Click here to
           <NavLink to={`/albums/${album?.id}/edit`}>Edit</NavLink>
       </p>
       <button type="button" onClick={handleDelete}>Delete</button>
       <div></div>
     </div>
   )
  } else {
     userOptions = (<div />)
  }

  return (
    <div className="songlistdiv">
        <div className="topimg homie"></div>
        <div><img src={album?.imageUrl}  alt='Album image not found' className="cover"/></div>
                <span>Title: {album?.title}</span>
                <p>     Description: {album?.description}</p>
                <p>     By: {album?.userId}</p>
                <p> Songs: </p>
                {songList(albumsSongs)}
        {userOptions}
        <NavLink to='/albums'>Back to Albums</NavLink>
    </div>
  );
}

export default SingleAlbum;
