import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import * as albumActions from '../../store/albums'
import playdasong from '../../SiteImages/playdasong.png'

function SingleAlbum({setPlayingSong}) {
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
  let songnum = 0
  const songList = (songArr) => {
    console.log(songArr)


    let list = songArr.map(song =>{
        songnum++
        const albumListen = (e) => {
          e.preventDefault()
          setPlayingSong(song?.url)
        }
        return(
        <ul>
        <li key={song.id} className='albumsongs' onClick={albumListen}>
            <span>
              <NavLink to={`/songs/${song.id}`}>
                <img className='albumimgs' src={song.imageUrl} alt='image not found' />
              </NavLink>
            </span>
        <span className="songnumalbum">{songnum}</span>
            <span>
                <NavLink to={`/songs/${song.id}`} className='albumsongtext'>{song.title}</NavLink>
            </span>
            <p></p>
        </li>
        </ul>

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
    /*
          <div>
        <i class="fa-solid fa-pencil">
          <NavLink to={`/songs/${song?.id}/edit`} song={song} className='edittext' >Edit</NavLink>
        </i>
        <i className="fa-solid fa-trash" onClick={handleDelete}>Delete</i>
      </div>
    */
  userOptions = (
     <div className="albumuserop">
       <i class="fa-solid fa-pencil" id="albumpencil">
           <NavLink to={`/albums/${album?.id}/edit`} className='edittext'>Edit</NavLink>
       </i>
       <i className="fa-solid fa-trash" id="albumpencil" onClick={handleDelete}>Delete</i>
       <div></div>
     </div>
   )
  } else {
     userOptions = (<div />)
  }

  const listen = (e) => {
    e.preventDefault()
    setPlayingSong(albumsSongs[0]?.url)
  }


  return (
    <div className="albumlistdiv">
        <div className="topimg homie"></div>
        <ul className="albumback">
          <li className="songyboy">
              <div className="imageplace" >
          <img src={album?.imageUrl}  alt='Album image not found' className="cover"/>
        </div>
                <span className="songtext title">{album?.title}</span>
                <p className="songtext artist">{album?.User.username}</p>
                <p className="songtext description">{album?.description}</p>
                <img className='playonsong' src={playdasong} alt='playbutton' onClick={listen}/>


          </li>
        </ul>
        {userOptions}
        {/* <p> Songs: </p> */}
        {songList(albumsSongs)}

    </div>
  );
}

export default SingleAlbum;
