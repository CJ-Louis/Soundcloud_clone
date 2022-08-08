const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, Album, User, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



router.get('/', async(req, res, next) => {

    let errorResult = { errors: [], count: 0, pageCount: 0 };

    let { page, size } = req.query;

    if (!page || isNaN(page)){
        page = 1;
        errorResult.errors.push({message: 'Requires valid page and size params'})
    }
    if (!size || isNaN(size)){
        size = 20;
        errorResult.errors.push({message: 'Requires valid page and size params'})
    }

    page = Number(page);
    size = Number(size);

    let pagination = {}
    if (page >= 1 || size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const songs = await Song.findAll({
        ...pagination
    })

    return res.json({
        songs,
        page: page,
        size: size

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

    const songId = req.params.songId
    const song = await Song.findByPk(songId)



    if (song){
        await song.destroy()
    } else {
        return res.status(404).json({
            message: `Song could not be found`,
            statusCode: 404
        })

    }

    deleted = await Song.findByPk(req.params.songId)
    if (!deleted){
        return res.json({
            message: `Successfully deleted`,
            statusCode: 200
        });
    }




})

router.get('/:songId/comments', async(req, res) =>{

    const id = req.params.songId
    const song = await Song.findByPk(id)

    if (!song){
        res.status(404).json({
            message: "Song couldn't be found",
            statusCode: 404
          })
    }

    const comments = await Comment.findAll({
        where: {songId: id}
    })

    return res.json({
        comments
    })
})


router.post('/:songId/comments', requireAuth, async(req, res) => {


    const { body } = req.body;

    const {user} = req;

    const id = req.params.songId
    const song = await Song.findByPk(id)

    if (!song){
        res.status(404).json({
            message: "Song couldn't be found",
            statusCode: 404
          })
    }

    const comment = await Comment.create({
        userId: user.id,
        songId: id,
        body
    })

    return res.json({
        comment
      });
})



module.exports = router;
