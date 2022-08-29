import { csrfFetch } from './csrf';

const GET_ALBUMS = 'song/getAlbum'
const MAKE_ALBUMS = 'song/makeAlbum';
const DELETE_ALBUM = 'song/deleteAlbum';

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


const deleteAlbum = (album) => {
  return {
    type: DELETE_ALBUM,
    album
  };
};

export const retrieveAlbums = () => async dispatch => {
        const response = await csrfFetch('/api/albums');
        const data = await response.json();
        dispatch(getAlbums(data.albums));
        return response;
      };



export const createAlbum = (album) => async (dispatch) => {
    if (!album.imageUrl) album.imageUrl = 'http://dalelyles.com/musicmp3s/no_cover.jpg'
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
    if (!album.imageUrl) album.imageUrl = 'http://dalelyles.com/musicmp3s/no_cover.jpg'
    const response = await csrfFetch(`/api/albums/${id}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(album),
      });
      const data = await response.json()
      dispatch(makeAlbum(data.album))
      return data.album
  }

  export const albumDeleter = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
      method: 'DELETE',
    });
    dispatch(deleteAlbum());
    return response
  };



const initialState = { albumlist: [] };

const sortList = (albumlist) => {
    return albumlist.sort((albumA, albumB) => {
      return albumA.id - albumB.id;
    })
  };





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
            albumlist: sortList(action.albumlist)
          };
        case MAKE_ALBUMS:
          if (!state[action.album.id]){
            const newState = {
                ...state,
                [action.album.id]: action.album
            }
            const albumList = newState.albumlist.map(id => newState[id])
            albumList.push(action.album)
            newState.albumlist = sortList(albumList)
            return newState
          }
          return {
            ...state,
            [action.album.id]: {
                ...state[action.album.id],
                ...action.album
            }
          }
          case DELETE_ALBUM:
            const newState = {
                ...state,
            }
            return newState
    default:
      return state;
  }
};

export default albumReducer;
