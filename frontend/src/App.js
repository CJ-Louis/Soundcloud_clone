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
import * as albumActions from './store/albums'
import Navigation from './components/Navigation';
import AudioPlayer from 'react-h5-audio-player';
import playdasong from './SiteImages/playdasong.png'
import 'react-h5-audio-player/lib/styles.css';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [playingSong, setPlayingSong] = useState('')
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(songActions.retrieveSongs())
    dispatch(albumActions.retrieveAlbums())
  }, []);

  const user = useSelector(state => {
    return state.session.user;
  })

  const songs = useSelector(state => {
    return state.songs.songlist;
  });
  const albums = useSelector(state => {
    return state.albums.albumlist;
  });

  // if (!songs) return null



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path exact='/'>
            {!user && (
              <div>
              <img  src='https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Top img' className='topimg'></img>
              <span className='community'>Hear what's trending in the SpoofCloud Community</span>

              </div>
            )}
            {user && (<div className="topimg homie"></div>)}

            <span className='community'>Hear what's trending in the SpoofCloud Community</span>
            <div className='songlistdiv' >
              <span className='hometext'>CLICK BELOW TO CHECKOUT SOME SONGS</span>

              <div className='homedisplayelements'>
                <div>
                  <NavLink to={`/songs/${songs[2]?.id}`}>
                    <img className='songhomedisplay' src={songs[2]?.imageUrl} alt='Song 4' />
                  </NavLink>
                  <img className='playbutton' src={playdasong} alt='playbutton' onClick={(e) => setPlayingSong(songs[2]?.url) }/>
                  <span className='songtitle'>{songs[2]?.title}</span>
                </div>
                <div>
                  <NavLink to={`/songs/${songs[3]?.id}`}>
                    <img className='songhomedisplay' src={songs[3]?.imageUrl} alt='Song 5' />
                  </NavLink>
                  <img className='playbutton' src={playdasong} alt='playbutton' onClick={(e) => setPlayingSong(songs[3]?.url) }/>
                  <span className='songtitle'>{songs[3]?.title}</span>
                </div>
                <div>
                  <NavLink to={`/songs/${songs[4]?.id}`}>
                    <img className='songhomedisplay' src={songs[4]?.imageUrl} alt='Song 6' />
                  </NavLink>
                  <img className='playbutton' src={playdasong} alt='playbutton' onClick={(e) => setPlayingSong(songs[4]?.url) }/>
                  <span className='songtitle'>{songs[4]?.title}</span>
                </div>
                <div>
                  <NavLink to={`/songs/${songs[5]?.id}`}>
                    <img className='songhomedisplay' src={songs[5]?.imageUrl} alt='Song 7' />
                  </NavLink>
                  <img className='playbutton' src={playdasong} alt='playbutton' onClick={(e) => setPlayingSong(songs[5]?.url) }/>
                  <span className='songtitle'>{songs[5]?.title}</span>
                </div>

              </div>
            </div>

            <div className='songlistdiv'>
              <span className='hometext' id='albumls'>OR CHECK OUT SOME HOT ALBUMS</span>
              <div className='homedisplayelements' id='albumls'>
                <div className='appalbumset'>
                <NavLink to={`/albums/${albums[0]?.id}`}>
                  <img className='albumhomedisplay' src={albums[0]?.imageUrl} alt='Album 1' />
                </NavLink>
                <span className='frontalbumtitle'>{albums[0]?.title}</span>
                </div>
                <div className='appalbumset'>
                <NavLink to={`/albums/${albums[1]?.id}`}>
                  <img className='albumhomedisplay' src={albums[1]?.imageUrl} alt='Album 2' />
                </NavLink>
                <span className='frontalbumtitle'>{albums[1]?.title}</span>
                </div>
                <div className='appalbumset'>
                <NavLink to={`/albums/${albums[2]?.id}`}>
                  <img className='albumhomedisplay' src={albums[2]?.imageUrl} alt='Album 3' />
                </NavLink>
                <span className='frontalbumtitle'>{albums[2]?.title}</span>
                </div>

              </div>
              {/* <div className='homedisplayelements' id='albumls'> */}



              {/* </div> */}
              <div className='filler'></div>
            </div>
            {/* <div className='songplayer'></ div> */}
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
            <SongsPage setPlayingSong={setPlayingSong}/>
          </Route>
          <Route path="/albums/create">
            <AlbumCreator />
          </Route>
          <Route path={`/albums/:albumId/edit`}>
            <EditAlbumForm />
          </Route>
          <Route path={`/albums/:albumId`}>
            <SingleAlbum setPlayingSong={setPlayingSong}/>
          </Route>
          <Route path="/albums">
            <AlbumsPage setPlayingSong={setPlayingSong}/>
          </Route>
        </Switch>

      )}
      {/* <div> </div>
      <div> </div> */}
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
