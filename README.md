# soundCloud_clone

SpoofCloud is an attempt at cloning the popular website Soundcloud. Please see my link to it here [CJ's soundcloud clone](https://soundcloud-clone-by-cj.herokuapp.com/)
This app was created using express and redux, and is being hosted on Heroku.

### Home page

![This is an image](https://github.com/CJ-Louis/soundCloud_clone/blob/main/assets/snip-for-readme.png)


### Songs page

![This is an image](https://github.com/CJ-Louis/soundCloud_clone/blob/main/assets/snip-for-readme-2.png)

## Technical details:

As well as connecting a media player to the website regardless of route change, one of the more technical parts of this clone was implementing the albums and songs to connect with each other. In the albums directory you will see that any song linked with that album will be able to connect you to that specific songs individual webpage, it was a lot of fun to learn. See below:

```
  const { albumId } = useParams()


  const album = useSelector(state => {
    return state.albums[albumId]
  });

  const songs = useSelector(state => {
    return state.songs.songlist
  });


  const albumsSongs = songs.filter(song =>{
    return song.albumId == albumId
  })

  const songList = (songArr) => {
    console.log(songArr)
    let list = songArr.map(song =>{
        return(
        <li key={song.id}>
            <span>
                <img className='imgs' src={song.imageUrl} alt='image not found' />
            </span>
        <div></div>
            <span>Title:
                <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
            </span>
            <p></p>
        </li>
        )
    })

    return list
  }
```

The media player to my case was fairly simple to implement but it was difficult to get it to play across the site regardless of route. i learned that by using State I was able to manipulate the playing link url wherever I was on the site.

```
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


function App() {
...
  const [playingSong, setPlayingSong] = useState('')
...

  return (
    <>
          ...
          ...
          <AudioPlayer
          src={playingSong}
        />
    </>
  );
}
```
now let's get to the features

## Features

 - Sign up/ login using an email
 - Full CRUD on songs (a.e the ability for a logged in user to create, update and delete their songs, but allow any user (logged in or not the ability to read and interact with them))
 - Full CRUD on albums (same explanation given above)
 - The ability to create real songs and play them on whatever page in the app
 
 ## Home Set Up
 In order to run this app locally, I reccoment cloning this repo, going into the main directory, run npm install in your terminal, then just to be sure you have all the packages neccassary, run npm install in both the frontend and backend directory. This should not be needed as the root connect to install both in the front and the back, but if you run into issues, I reccomend doing that. Next you will want to start the backend server. Navigate to the backend directory and in your terminal put in npm start. Follow this step for the frontend after you get the backend running. The backend should be running on localhost:3000 (you may need to change this if you are a mac user) and the frontend should be running on localhost:8000.
 
 
 Thank you for taking the time to look at this app and have fun with it!
