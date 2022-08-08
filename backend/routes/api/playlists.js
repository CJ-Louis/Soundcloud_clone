const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, Album, User, Playlist, PlaylistSong } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
    const { name, imageUrl } = req.body;

    const {user} = req;


    const playlist = await Playlist.create({
        userId: user.id,
        name,
        imageUrl,
    })

    return res.json({
        playlist
      });
})


router.get('/current', restoreUser, async (req, res) => {
    const { user } = req;

    const userPlaylists = await User.findOne({
      include: [{
          model: Playlist,
      }],
      where: {id: user.id}
    });

    if (!userPlaylists){
        res.status(404).json({
            message: "Playlist couldn't be found",
            statusCode: 404
        })
    }

    if (userPlaylists.Playlists) {
      return res.json({
        playlists: userPlaylists.Playlists
      });
    } else return res.json({songs: "You currently have no playlists made"});
  }
);

router.post('/:playlistId/songs', requireAuth, async(req, res) => {
    const { user } = req;
    let playlistId = req.params.playlistId
    const { songId } = req.body

    playlist = await Playlist.findByPk(playlistId)
    song = await Song.findByPk(songId)

    if (!song){
        res.status(404).json({
            message: "Song couldn't be found",
            statusCode: 404
          })
    }

    if (!playlist){
        res.status(404).json({
            message: "Playlist couldn't be found",
            statusCode: 404
          })
    }

    if (user.id !== playlist.userId){
        res.status(404).json({
            message: "You do not have permission to add to this playlist",
            statusCode: 404
          })
    }
    playlistId = parseInt(playlistId)
    const playlistSong = await PlaylistSong.create({
        playlistId,
        songId
    })

    res.json({
        playlistSong: {
            id: playlistSong.id,
            playlistId: playlistSong.playlistId,
            songId: playlistSong.songId,
        }
    })


})

router.get('/:playlistId', async(req, res, next) => {

    const playlist = await Playlist.findOne({
        include: [{
            model: Song,
            attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'imageUrl']
        }],
        where: {id: req.params.playlistId}
    })
    if (!playlist){
        res.status(404).json({
            message: "Playlist couldn't be found",
            statusCode: 404
          })
    }

    return res.json({
        playlist
    })
})


router.put('/:playlistId', async (req, res, next) => {
    const { user } = req
    const { name, imageUrl } =req.body

    const id = req.params.playlistId
    const playlist = await Playlist.findByPk(id)

    if (!playlist){
        res.status(404).json({
            message: "Playlist couldn't be found",
            statusCode: 404
          })
    }

    if (playlist.userId !== user.id){
        throw new Error ("You do not have permission to edit this playlist's features")
    }
    if (name) playlist.name = name
    if (imageUrl) playlist.imageUrl = imageUrl

    await playlist.save()

    return res.json({
        playlist
    })


})




module.exports = router;
