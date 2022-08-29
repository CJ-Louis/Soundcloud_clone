import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as albumActions from '../../store/albums'


function AlbumsPage() {
  const dispatch = useDispatch();

  const albums = useSelector(state => {
    return state.albums.albumlist;
  });
  const user = useSelector(state => {
    return state.session.user
  });

  useEffect(() => {
    dispatch(albumActions.retrieveAlbums())
  },[dispatch])

  const albumList = (albumArr) => {
    console.log(albumArr)
    let list = albumArr.map(album =>{
        return(
        <li key={album.id}>
            <span>
                <img className='imgs' src={album.imageUrl} alt='image not found' />
            </span>
            <div></div>
            <span>Title:
                <NavLink to={`/albums/${album.id}`}>{album.title}</NavLink>
            </span>
            <p>     description: {album.description}</p>
            <p>     By: {album.userId}</p>

            <p></p>
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
    userCreate = (<NavLink to={`/albums/create`}> Make a new albums</NavLink>)
  }

  return (
    <div className="songlistdiv">
        <div className="topimg homie"></div>
        <ul className="songs">
            {albumList(albums)}
        </ul>
        <div>
        <span>Add:
            {userCreate}
        </span>
        </div>
    </div>
  );
}

export default AlbumsPage;
