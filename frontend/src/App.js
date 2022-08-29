import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
import * as songActions from './store/songs'
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
    dispatch(songActions.retrieveSongs())
  }, [dispatch]);

  const songs = useSelector(state => {
    return state.songs.songlist;
  });

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path exact='/'>
            <img  src='https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Top img' className='topimg'></img>

            <span className='community'>Hear what's trending in the SpoofCloud Community</span>
            <div className='songlistdiv' >
              <span className='hometext'>CLICK BELOW TO CHECKOUT SOME SONGS</span>

              <div className='homedisplayelements'>
                <NavLink to={`/songs/${songs[2]?.id}`}>
                  <img className='songhomedisplay' src={songs[2]?.imageUrl} alt='Song 4' />
                </NavLink>
                <NavLink to={`/songs/${songs[3]?.id}`}>
                  <img className='songhomedisplay' src={songs[3]?.imageUrl} alt='Song 5' />
                </NavLink>
                <NavLink to={`/songs/${songs[4]?.id}`}>
                  <img className='songhomedisplay' src={songs[4]?.imageUrl} alt='Song 6' />
                </NavLink>
                <NavLink to={`/songs/${songs[5]?.id}`}>
                  <img className='songhomedisplay' src={songs[5]?.imageUrl} alt='Song 7' />
                </NavLink>
              </div>
            </div>

            <div className='songlistdiv'>
              <div className='hometext'>OR CHECK OUT SOME HOT ALBUMS!</div>
              <NavLink to="/albums">SpoofCloud-Albums</NavLink>
            </div>
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
      <div className='mediaplayer'>
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
