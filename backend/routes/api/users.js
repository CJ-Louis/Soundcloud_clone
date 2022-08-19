const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song, Playlist } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//this makes sure no invalid users can be created
const validateSignup = [
    check('firstName')
      .notEmpty()
      .withMessage('First Name is required.'),
    check('lastName')
      .notEmpty()
      .withMessage('Last Name is required.'),
    check('email')
      .notEmpty()
      .withMessage('Email is required.'),
    check('username')
      .notEmpty()
      .withMessage('Username is required.'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];
// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;

      const uniqueEmail = await User.findAll({
        where: {
          email,
        }
      })
      const uniqueUser = await User.findAll({
        where: {
          username,
        }
      })

      if (uniqueEmail == false && uniqueUser == false){
        const user = await User.signup({ firstName, lastName, email, username, password });

        await setTokenCookie(res, user);

        return res.json({
          // user,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
          }

        });
      } else if (uniqueEmail != false){
        return res.status(403).json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            "email": "User with that email already exists"
          },
        });
      } else if (uniqueUser != false){
        return res.status(403).json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            "username": "User with that username already exists"
          },
        });
      }


    }
  );


  router.get('/:userId', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findOne({
      where: {id: userId},
      attributes: ['id', 'username']
    })

    if (!user){
      res.status(404).json({
        message: "Artist couldn't be found",
        statusCode: 404
      })
    }

    const songCount = await Song.findAndCountAll({
      where: { userId }
    })
    const albumCount = await Album.findAndCountAll({
      where: { userId }
    })

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        totalSongs: songCount.count,
        totalAlbums: albumCount.count,
        imgUrl: albumCount.rows[0].imageUrl
      }

    });

  })

  router.get('/:userId/songs', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findOne({
      include: [{
        model: Song,
        attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'imageUrl']
    }],
      attributes: ['id', 'username'],
      where: {id: userId}
    })

    if (!user){
      res.status(404).json({
        message: "Artists song couldn't be found",
        statusCode: 404
      })
    }



    return res.json({
      user
    });

  })

  router.get('/:userId/playlists', async (req, res) => {
    const userId = req.params.userId
    const user = await User.findOne({
      include: [{
        model: Playlist
    }],
      attributes: ['id', 'username'],
      where: {id: userId}
    })

    if (!user){
      res.status(404).json({
        message: "Artists playlist couldn't be found",
        statusCode: 404
      })
    }



    return res.json({
      user
    });

  })

module.exports = router;
