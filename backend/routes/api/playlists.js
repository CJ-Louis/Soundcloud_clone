const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, Album, User, Playlist, PlaylistSong } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', restoreUser, async (req, res) => {
    const { user } = req;

    const userPlaylists = await User.findOne({
      include: [{
          model: Playlist,
      }],
      where: {id: user.id}
  });

    if (userPlaylists.Playlists) {
      return res.json({
        playlists: userPlaylists.Playlists
      });
    } else return res.json({songs: "You currently have no playlists made"});
  }
);

router.post('playlists/:playlistId/songs', requireAuth, async(req, res, next) => {
    const { user } = req;
    const playlistId = req.params.playlistId
    const { songId } = req.body
    
    const playlistSong = await PlaylistSong.create({
        playlistId,
        songId
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

    return res.json({
        playlist
    })
})



module.exports = router;
