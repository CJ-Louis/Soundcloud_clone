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
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);



  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);


  useEffect(() => {
    const errors = [];
    if (!title?.length) errors.push("Album must have a title");
    if (!description?.length) errors.push("Album must have a description");
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
            let editedAlbum = await dispatch(editAlbumForm(album.id, payload))

        if (editedAlbum) {
            history.push(`/albums/${album.id}`);
        }
        };
    }


  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/albums/${album?.id}`)
  };

  return (
      <div>
      <div className="topimg homie"></div>
      <section className="new-form-holder centered middled">

        {/* <div className='songlistdiv'></div> */}
            {/* <img className='editlogo' src='https://cdn4.vectorstock.com/i/thumb-large/45/68/happy-sun-hiding-behind-cloud-vector-1284568.jpg' />
            <span className='suntext'>Change is good!</span> */}



      <form onSubmit={handleSubmit} className='songlistdiv'>
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
        <button type="submit" className='submitnew'>Edit album</button>
        <button type="button" className='revertcan' onClick={handleCancelClick}>Cancel</button>
        </div>

      </form>

    </section>
    </div>
  );
};

export default EditAlbumForm;
