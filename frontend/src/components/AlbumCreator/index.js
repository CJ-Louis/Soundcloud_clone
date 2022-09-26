import { useState, useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAlbum } from "../../store/albums";

const CreateAlbumForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push("Album must have a title");
    if (!description.length) errors.push("Album must have a description");
    if (imageUrl && (!imageUrl.includes('.jpeg') && !imageUrl.includes('.jpg') && !imageUrl.includes('.png'))) errors.push("Image url must end in .jpeg, .jpg or .png (or this field may be left blank for a default)");
    setErrors(errors);
    if (!errors[0]) setHasSubmitted(true)
  }, [title, description, imageUrl]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      imageUrl,
    };

    if (hasSubmitted){
          let createdAlbum = await dispatch(createAlbum(payload))

            if (createdAlbum) {

            history.push(`/albums/${createdAlbum.id}`);
            }
        };
    }


  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/albums')
  };

  return (
    <section className="new-form-holder centered middled">
        {/* <div className="topimg homie"></div> */}
      <form onSubmit={handleSubmit} className='songlistdiv' id='editsonglistdiv'>
      {errors && (
                <ul className='ul-allign'>
                  {errors.map((error, idx) => <li key={idx} className='li-boyz'>{error}</li>)}
                </ul>
        )}
        <div className='editformdiv'>
        <input
          className='thefield'
          type="string"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle} />
        <input
          className='thefield'
          type="string"
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription} />
        <input
          className='thefield'
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <button type="submit" className='submitnew'>Create Album</button>
        <button type="button" className='revertcan' onClick={handleCancelClick}>Cancel</button>
        </div>

      </form>
    </section>
  );
};

export default CreateAlbumForm;
