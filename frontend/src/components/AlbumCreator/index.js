import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAlbum } from "../../store/albums";

const CreateAlbumForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');


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

    let createdAlbum = await dispatch(createAlbum(payload))

    if (createdAlbum) {

      history.push(`/albums/${createdAlbum.id}`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/albums')
  };

  return (
    <section className="new-form-holder centered middled">
        <div className="topimg homie"></div>
      <form onSubmit={handleSubmit} className='songlistdiv'>
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
        <button type="submit">Post album to SpoofCloud</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default CreateAlbumForm;
