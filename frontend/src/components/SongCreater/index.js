import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSong } from "../../store/songs";

const CreateSongForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);

  const albums = useSelector((state) => state.albums.albumlist)
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    const errors = [];
    if (!title.length) errors.push("Song must have a title");
    if (!description.length) errors.push("Song must have a description");
    if (!url.length) errors.push("Song must have a audio link");
    if (!url.includes('.mp3') && !url.includes(".wav") && !url.includes(".ogg")) errors.push("Url must end in .mp3, .wav or .ogg");
    if (imageUrl && (!imageUrl.includes('.jpeg') && !imageUrl.includes('.jpg') && !imageUrl.includes('.png'))) errors.push("Image url must end in .jpeg, .jpg or .png (or this field may be left blank for a default)");
    const checkAlbums = (albumArr, id) => {
        let checkAlbums = albumArr.filter(album => {
            return album.id == id
        })
        console.log(checkAlbums, albumArr)
        return checkAlbums[0]
    }
    if(albumId && (!checkAlbums(albums, albumId) || checkAlbums(albums, albumId).userId != user.id)) errors.push("Please enter a valid album owned by you")
    console.log('Checking checkAlbums and user id', checkAlbums(albums, albumId), user)
    setErrors(errors);
    if (!errors[0]) setHasSubmitted(true)
  }, [title, description, url, imageUrl, albumId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId,
    };

    if (hasSubmitted){
        let createdSong = await dispatch(createSong(payload))


        if (createdSong) {
        history.push(`/songs/${createdSong.id}`);
        ;
        }
    }

  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push('/songs')
    ;
  };

  return (
    <div>
    {/* <div className="topimg homie"></div> */}
    <section className="new-form-holder centered middled">
      <form onSubmit={handleSubmit} className="songlistdiv">
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
          placeholder="Audio Url"
          required
          value={url}
          onChange={updateUrl} />
        <input
          className='thefield'
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <input
          className='thefield'
          type="text"
          placeholder="Album"
          value={albumId}
          onChange={updateAlbumId} />
        <button type="submit" className='submitnew'>Post Song</button>
        <button type="button" className='revertcre' onClick={handleCancelClick}>Cancel</button>
        </div>

      </form>
    </section>
    </div>
  );
};

export default CreateSongForm;
