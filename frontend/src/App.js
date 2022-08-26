import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink, useParams } from 'react-router-dom';
import SignupFormPage from './components/SignUpFormPage';
import SongsPage from './components/SongsPage';
import SingleSong from './components/IndividualSong';
import SongCreater from './components/SongCreater'
import EditSongForm from './components/EditSong';
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
        </Switch>
      )}
    </>
  );
}

export default App;
