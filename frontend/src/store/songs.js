import { csrfFetch } from './csrf';

const GET_SONGS = 'song/getSong'
const MAKE_SONG = 'song/makeSong';
// const EDIT_SONG = 'song/editSong'
const DELETE_SONG = 'song/deleteSong';

const getSongs = (songlist) => {
    return {
        type: GET_SONGS,
        songlist
    }
}



const makeSong = (song) => {
  return {
    type: MAKE_SONG,
    song,
  };
};


const deleteSong = (song) => {
  return {
    type: DELETE_SONG,
    song
  };
};

export const retrieveSongs = () => async dispatch => {
        const response = await csrfFetch('/api/songs');
        const data = await response.json();
        dispatch(getSongs(data.songs));
        return response;
      };

// export const retrieveSingle = (songId) => async dispatch => {
//         const response = await csrfFetch(`/api/songs/${songId}`);
//         const data = await response.json();
//         dispatch(getSongs(data.song));
//         return response;
// };

export const createSong = (song) => async (dispatch) => {
    if (!song.albumId) song.albumId = null
    const response = await csrfFetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(song),
    });
    const data = await response.json();
    console.log('This is our data:   ', data)
    dispatch(makeSong(data.song));
    return data.song;
  };

  export const editSongForm = (id, song) => async (dispatch) => {
    if (!song.albumId || song.albumId === 'released as single') song.albumId = null
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(song),
      });
      const data = await response.json()
      dispatch(makeSong(data.song))
      return data.song
  }

  export const songDeleter = (songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
      method: 'DELETE',
    });
    dispatch(deleteSong(songId));
    return response
  };



const initialState = { songlist: [] };

// const sortList = (songlist) => {
//     return songlist.sort((songA, songB) => {
//       return songA.id - songB.id;
//     }).map((song) => song.id);
//   };


const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SONGS:
          const allSongs = {};
          action.songlist.forEach(song => {
            allSongs[song.id] = song;
          });
          return {
            ...allSongs,
            ...state,
            songlist: action.songlist
          };
        case MAKE_SONG:
          if (!state[action.song.id]){
            const newState = {
                ...state,
                [action.song.id]: action.song
            }
            const songList = newState.songlist.map(id => newState[id])
            songList.push(action.song)
            newState.songlist = songList
            return newState
          }
          return {
            ...state,
            [action.song.id]: {
                ...state[action.song.id],
                ...action.songs
            }
          }
          case DELETE_SONG:
            const newState = {
                ...state,
            }
            return newState
    default:
      return state;
  }
};

export default songReducer;
