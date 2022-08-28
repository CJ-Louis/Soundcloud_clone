import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink } from 'react-router-dom';
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
import Navigation from './components/Navigation';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [playingSong, setPlayingSong] = useState('')
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path exact='/'>
            <img  src='https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Top img' className='topimg'></img>
            
            <span className='community'>Hear what's trending in the SpoofCloud Community</span>
            <div>CLICK BELOW TO CHECKOUT SOME SONGS</div>
            <NavLink to="/songs">SpoofCloud-Songs</NavLink>
            <div>OR CHECK OUT SOME HOT ALBUMS!</div>
            <NavLink to="/albums">SpoofCloud-Albums</NavLink>
            <div className='songplayer'></ div>
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
            <SingleSong setPlayingSong={setPlayingSong}/>
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
      <div> </div>
      <div> </div>
      <div>
        <AudioPlayer
          // autoPlay
          src={playingSong}
          onPlay={e => console.log("onPlay")}
          // other props here
        />
      </div>
    </>
  );
}

export default App;
