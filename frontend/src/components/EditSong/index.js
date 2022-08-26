import { useState,  useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editSongForm, retrieveSongs } from "../../store/songs";

const EditSongForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(retrieveSongs())
    },[dispatch])

    const { songId } = useParams()
    
    const song = useSelector(state => {
      return state.songs[songId]
      });



  const [title, setTitle] = useState(song?.title);
  const [description, setDescription] = useState(song?.description);
  const [url, setUrl] = useState(song?.url);
  const [imageUrl, setImageUrl] = useState(song?.imageUrl);
  const [albumId, setAlbumId] = useState(song?.albumId ? song.albumId : 'released as single');


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId,
    };
    let editedSong = await dispatch(editSongForm(song.id, payload))

    if (editedSong) {
      history.push(`/songs/${song.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/songs')
  };

  return (
    <section className="new-form-holder centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="string"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle} />
        <input
          type="string"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription} />
        <input
          type="text"
          placeholder="Audio Url"
          required
          value={url}
          onChange={updateUrl} />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <input
          type="text"
          placeholder="Album"
          value={albumId}
          onChange={updateAlbumId} />
        <button type="submit">Edit song</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default EditSongForm;
