const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, Album, User, Comment } = require('../../db/models');
const { Op } = require("sequelize");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { query } = require('express');

const router = express.Router();


const validateQuery = [
    check('page')
      .isLength({ min: 0 })
      .withMessage('Page must be greater than or equal to 0.'),
    check('page')
      .isLength({ max: 10 })
      .withMessage('Page must be less than or equal to 10.'),
    check('size')
      .isLength({ min: 0 })
      .withMessage('Size must be greater than or equal to 0.'),
    check('size')
      .isLength({ max: 20 })
      .withMessage('Size must be less than or equal to 20.'),
    handleValidationErrors
  ];
  const validateSong = [
    check('title')
      .notEmpty()
      .withMessage('Song title is required.'),
    check('url')
      .notEmpty()
      .withMessage('Audio is required.'),
    handleValidationErrors
  ];

  const validateComment = [
    check('body')
      .notEmpty()
      .withMessage('Comment body text is required.'),
    handleValidationErrors
  ];

router.get('/', validateQuery, async(req, res, next) => {

    let errorResult = { errors: [], count: 0, pageCount: 0 };

    let { page, size, title, createdAt } = req.query;

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



    const where = {};

    if(title){
        const titleCheck = await Song.findOne({
            where: {title}
        })
        if (!titleCheck){
            res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    title: "Title is invalid"
                }
            })
        }
        where.title = {[Op.like]: '%'+ title + '%'};
    }
    if(createdAt){
        const createdCheck = await Song.findOne({
            where: {createdAt}
        })
        if (!createdCheck){
            res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    createdAt: "CreatedAt is invalid"
                }
            })
        }
        where.createdAt = {[Op.like]: createdAt};
    }

    const songs = await Song.findAll({
        ...pagination,
        where: {...where}
    })

    return res.json({
        songs,
        page: page,
        size: size

    })
})

router.post('/', requireAuth, validateSong ,async(req, res) => {


    const { title, description, url, imageUrl, albumId } = req.body;

    const {user} = req;

    if (albumId){
        const album = await Album.findByPk(albumId)
        if (!album){
            res.status(404).json({
                message: "Album couldn't be found",
                statusCode: 404
              })
        }
    }


    const song = await Song.create({
        userId: user.id,
        albumId,
        title,
        description,
        url,
        imageUrl,
    })

    return res.status(201).json({
        song
      });
})

router.get('/current', requireAuth, async (req, res) => {
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



router.get('/:songId', async(req, res) => {
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





router.put('/:songId', requireAuth, validateSong ,async (req, res, next) => {
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

router.delete('/:songId', requireAuth, async (req, res, next) => {

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


router.post('/:songId/comments', requireAuth, validateComment, async(req, res) => {


    const { body } = req.body;

    const {user} = req;

    let id = req.params.songId
    id = parseInt(id)
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

    return res.status(201).json({
        comment
      });
})



module.exports = router;
