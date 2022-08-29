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
    if((albumId !== 'released as single' && albumId !== '') && (!checkAlbums(albums, albumId) || checkAlbums(albums, albumId).userId != user.id)) errors.push("Please enter a valid album owned by you")
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
        let editedSong = await dispatch(editSongForm(song.id, payload))

        if (editedSong) {
        history.push(`/songs/${song.id}`);
        }
  };
}

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/songs/${song?.id}`)
  };

  return (
    <section className="new-form-holder centered middled">
        <div className="topimg homie"></div>
        <div className='songlistdiv'>
        <img className='editlogo' src='https://cdn4.vectorstock.com/i/thumb-large/45/68/happy-sun-hiding-behind-cloud-vector-1284568.jpg' />
        {errors && (
                <ul >
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
        )}
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
      </div>
    </section>
  );
};

export default EditSongForm;
