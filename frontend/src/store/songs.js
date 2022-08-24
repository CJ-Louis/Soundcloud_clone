import { csrfFetch } from './csrf';

const GET_SONGS = 'song/getSong'
// const MAKE_SONG = 'song/makeSong';
// const DELETE_SONG = 'song/deleteSong';

const getSongs = (songlist) => {
    return {
        type: GET_SONGS,
        songlist
    }
}

    //   const load = list => ({
    //     type: LOAD,
    //     list
    //   });

// const makeSong = (song) => {
//   return {
//     type: MAKE_SONG,
//     payload: song,
//   };
// };

// const deleteSong = () => {
//   return {
//     type: DELETE_SONG,
//   };
// };

export const retrieveSongs = () => async dispatch => {
        const response = await csrfFetch('/api/songs');
        const data = await response.json();
        dispatch(getSongs(data.songs));
        return response;
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
    default:
      return state;
  }
};

export default songReducer;
