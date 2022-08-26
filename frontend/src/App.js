import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink, useParams } from 'react-router-dom';
import SignupFormPage from './components/SignUpFormPage';
import SongsPage from './components/SongsPage';
import SingleSong from './components/IndividualSong';
import SongCreater from './components/SongCreater'
import EditSongForm from './components/EditSong';
import AlbumsPage from './components/AlbumsPage';
import SingleAlbum from './components/IndividualAlbum';
import AlbumCreator from './components/AlbumCreator';
import EditAlbumForm from './components/EditAlbum';
import * as sessionActions from "./store/session";
import * as songActions from './store/songs'
import Navigation from './components/Navigation';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const { songId } = useParams();
  useEffect(() => {
    dispatch(songActions.retrieveSongs())
  },[dispatch, songId])
  console.log('App hit')
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path exact='/'>
            <span className='community'>Hear what's trending in the SpoofCloud Community</span>
            <div>CLICK BELOW TO CHECKOUT SOME SONGS</div>
            <NavLink to="/songs">SpoofCloud-Songs</NavLink>
            <div>OR CHECK OUT SOME HOT ALBUMS!</div>
            <NavLink to="/albums">SpoofCloud-Albums</NavLink>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs/create">
            <SongCreater />
          </Route>
          <Route path={`/songs/:songId/edit`}>
            <EditSongForm />
          </Route>
          <Route path={`/songs/:songId`}>
            <SingleSong />
          </Route>
          <Route path="/songs">
            <SongsPage />
          </Route>
          <Route path="/albums/create">
            <AlbumCreator />
          </Route>
          <Route path={`/albums/:albumId/edit`}>
            <EditAlbumForm />
          </Route>
          <Route path={`/albums/:albumId`}>
            <SingleAlbum />
          </Route>
          <Route path="/albums">
            <AlbumsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
