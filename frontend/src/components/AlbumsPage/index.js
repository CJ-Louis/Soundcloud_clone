import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as albumActions from '../../store/albums'


function AlbumsPage() {
  const dispatch = useDispatch();

  const albums = useSelector(state => {
    return state.albums.albumlist;
  });
  console.log('This is songs state in /albums    ', albums)
  useEffect(() => {
    dispatch(albumActions.retrieveAlbums())
  },[dispatch])

  const albumList = (albumArr) => {
    console.log(albumArr)
    let list = albumArr.map(album =>{
        return(
        <li key={album.id}>
            <span>Title:
                <NavLink to={`/albums/${album.id}`}>{album.title}</NavLink>
            </span>
            <p>     description: {album.description}</p>
            <p>     By: {album.userId}</p>
            <span>     img: no current working img urls</span>
            <p></p>
        </li>
        )
    })
    console.log('this is the list',list)
    return list
  }
  console.log(albumList(albums))
  if (!albums){
    return <div>Loading</div>
  }

  return (
    <div>
        <ul>
            {albumList(albums)}
        </ul>
        <div>
        <span>Title:
            <NavLink to={`/albums/create`}>Make a new album</NavLink>
        </span>
        </div>
    </div>
  );
}

export default AlbumsPage;
