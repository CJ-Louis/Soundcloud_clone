import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as albumActions from '../../store/albums'
import playdasong from '../../SiteImages/playdasong.png'


function AlbumsPage({setPlayingSong}) {
  const dispatch = useDispatch();

  const albums = useSelector(state => {
    return state.albums.albumlist;
  });
  const user = useSelector(state => {
    return state.session.user
  });
  const songs = useSelector(state => {
    return state.songs.songlist
  })

  useEffect(() => {
    dispatch(albumActions.retrieveAlbums())
  },[dispatch])

  const albumList = (albumArr) => {
    console.log(albumArr)
    let list = albumArr.map(album =>{
        let songInAlbum = songs.find(song => {
          return song.albumId === album.id
        })

        return(
        <li key={album.id} className='albumcard'>
            <span>
            <NavLink to={`/albums/${album.id}`}>
              <img className='imgs' src={album.imageUrl} alt='image not found' />
            </NavLink>


                <img className='playbutton' src={playdasong} alt='playbutton' onClick={(e) => setPlayingSong(songInAlbum?.url) }/>
            </span>
            <div>
              <span>
                  <NavLink to={`/albums/${album.id}`} className='albumlink'>{album.title}</NavLink>
              </span>
              <p></p>
            </div>

        </li>
        )
    })

    return list
  }

  if (!albums){
    return <div>Loading</div>
  }

  let userCreate;
  if (!user) {
   userCreate = ( <div>Sign up or log in in order to produce some albums</div>)
  }
  else {
    userCreate = (<i class="fa-solid fa-cloud-arrow-up">
      <NavLink to={`/albums/create`} className='edittext'> New Album</NavLink>
    </i>
    )
  }

  return (
    <div className="songlistdiv">
        <div className="topimg homie"></div>
        <h1>Top Albums</h1>
        <ul className="songs">
            {albumList(albums)}
        </ul>
        <div>
        <span>
            {userCreate}
        </span>
        </div>
    </div>
  );
}

export default AlbumsPage;
