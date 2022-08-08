const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Album, Song, Playlist, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/:userId/albums', async(req, res) => {
    const userId = req.params.userId

    const user = await User.findByPk(userId)

    console.log(user)

    if (!user){
        return res.status(404).json({
            message: "User not found",
            statusCode: 404,
          });
    }

    const albums = await Album.findAll({
        where: {userId}
    })

    return res.json({
        albums
    })
})



module.exports = router
