const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, Album, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/', async(req, res, next) => {
    const albums = await Album.findAll()

    return res.json({
        albums
    })
})

router.post('/', async(req, res, next) => {
    const albums = await Album.findAll()

    return res.json({
        albums
    })
})

router.get('/current', async(req, res, next) => {
    const albums = await Album.findAll()

    return res.json({
        albums
    })
})

module.exports = router;
