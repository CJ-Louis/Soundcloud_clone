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





   console.log('This is the album variable', album)




  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(albumActions.albumDeleter(album.id))

    history.push(`/albums`);
  };


  return (
    <div>
        <ul>
            <li>
                <span>Title: {album?.title}</span>
                <p>     description: {album?.description}</p>
                <p>     By: {album?.userId}</p>
                <span>     img: no current working img urls</span>
                <p> Songs: </p>
            </li>
        </ul>
        <p>Click here to
            <NavLink to={`/albums/${album?.id}/edit`}>Edit</NavLink>
        </p>
        <button type="button" onClick={handleDelete}>Delete</button>
        <div></div>
        <NavLink to='/albums'>Back to Albums</NavLink>
    </div>
  );
}

export default SingleAlbum;
