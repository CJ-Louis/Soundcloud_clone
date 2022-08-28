import { useState,  useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editAlbumForm, retrieveAlbums } from '../../store/albums'

const EditAlbumForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(retrieveAlbums())
    },[dispatch])
    const { albumId } = useParams()
    const album = useSelector(state => {
      return state.albums[albumId]
      });


  const [title, setTitle] = useState(album?.title);
  const [description, setDescription] = useState(album?.description);
  const [imageUrl, setImageUrl] = useState(album?.imageUrl);


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      imageUrl,
    };
    let editedAlbum = await dispatch(editAlbumForm(album.id, payload))

    if (editedAlbum) {
      history.push(`/albums/${album.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/albums')
  };

  return (
    <section className="new-form-holder centered middled">
        <div className="topimg homie"></div>
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
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <button type="submit">Edit album</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default EditAlbumForm;
