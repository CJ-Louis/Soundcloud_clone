const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, Album, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



router.get('/', async(req, res, next) => {
    const songs = await Song.findAll()

    return res.json({
        songs
    })
})

router.post('/', requireAuth, async(req, res) => {


    const { title, description, url, imageUrl, albumId } = req.body;

    const {user} = req;


    const song = await Song.create({
        userId: user.id,
        albumId,
        title,
        description,
        url,
        imageUrl,
    })

    return res.json({
        song
      });
})

router.get('/current', restoreUser, async (req, res) => {
      const { user } = req;

      const userSongs = await User.findOne({
        include: [{
            model: Song,
        }],
        where: {id: user.id}
    });

      if (userSongs.Songs) {
        return res.json({
          songs: userSongs.Songs
        });
      } else return res.json({songs: "You currently have no songs produced"});
    }
);

router.get('/:songId', async(req, res, next) => {
    const id = req.params.songId
    const song = await Song.findByPk(id)

    return res.json({
        song
    })
})





router.get('/:songId', async(req, res, next) => {
    const id = req.params.songId
    const song = await Song.findByPk(id)

    if (!song){
        res.status(404).json({
            message: "Song couldn't be found",
            statusCode: 404
          })
    }

    return res.json({
        song
    })
})





router.put('/:songId', async (req, res, next) => {
    const { user } = req
    const { title, description, url, imageUrl, albumId } =req.body

    const id = req.params.songId
    const song = await Song.findByPk(id)

    if (!song){
        res.status(404).json({
            message: "Song couldn't be found",
            statusCode: 404
          })
    }

    if (song.userId !== user.id){
        throw new Error ("You do not have permission to edit this song's features")
    }
    if (title) song.title = title
    if (description) song.description = description
    if (url) song.url = url
    if (imageUrl) song.imageUrl = imageUrl
    if (albumId) song.albumId = albumId

    await song.save()

    return res.json({
        song
    })


})

router.delete('/:songId', async (req, res, next) => {

})

module.exports = router;
