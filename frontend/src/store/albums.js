import { csrfFetch } from './csrf';

const GET_ALBUMS = 'song/getAlbum'
const MAKE_ALBUMS = 'song/makeAlbum';
// const DELETE_ALBUMS = 'song/deleteAlbum';

const getAlbums = (albumlist) => {
    return {
        type: GET_ALBUMS,
        albumlist
    }
}



const makeAlbum = (album) => {
  return {
    type: MAKE_ALBUMS,
    album,
  };
};


// const deleteSong = (album) => {
//   return {
//     type: DELETE_ALBUMS,
//     album
//   };
// };

export const retrieveAlbums = () => async dispatch => {
        const response = await csrfFetch('/api/albums');
        const data = await response.json();
        dispatch(getAlbums(data.albums));
        return response;
      };



export const createAlbum = (album) => async (dispatch) => {
    const response = await csrfFetch("/api/albums", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(album),
    });
    const data = await response.json();
    console.log('This is our data:   ', data)
    dispatch(makeAlbum(data.album));
    return data.album;
  };

  export const editAlbumForm = (id, album) => async (dispatch) => {

    const response = await csrfFetch(`/api/albums/${id}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(album),
      });
      const data = await response.json()
      dispatch(makeAlbum(data.album))
      return data.album
  }

//   export const songDeleter = (songId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/songs/${songId}`, {
//       method: 'DELETE',
//     });
//     dispatch(deleteSong());
//     return response
//   };



const initialState = { albumlist: [] };

// const sortList = (songlist) => {
//     return songlist.sort((songA, songB) => {
//       return songA.id - songB.id;
//     }).map((song) => song.id);
//   };


    // case GET_SONGS:
    //   const allSongs = {};
    //   action.songlist.forEach(song => {
    //     allSongs[song.id] = song;
    //   });
    //   return {
    //     ...allSongs,
    //     ...state,
    //     songlist: action.songlist
    //   };


const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS:
          const allAlbums = {};
          action.albumlist.forEach(album => {
            allAlbums[album.id] = album;
          });
          return {
            ...allAlbums,
            ...state,
            albumlist: action.albumlist
          };
        case MAKE_ALBUMS:
          if (!state[action.album.id]){
            const newState = {
                ...state,
                [action.album.id]: action.album
            }
            const albumList = newState.albumlist.map(id => newState[id])
            albumList.push(action.album)
            newState.albumlist = albumList
            return newState
          }
          return {
            ...state,
            [action.album.id]: {
                ...state[action.album.id],
                ...action.album
            }
          }
        //   case DELETE_SONG:
        //     const newState = {
        //         ...state,
        //     }
        //     const songList = newState.songlist.map(id => newState[id])
        //     const slicedList = action.songs.id > 1 ? songList.slice(0, action.songs.id).concat(songList.slice(action.songs.id++)) : songList.slice(1)
        //     newState[action.songs.id] = null
        //     newState.songlist = slicedList
        //     return newState
    default:
      return state;
  }
};

export default albumReducer;
