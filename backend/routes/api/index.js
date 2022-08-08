// backend/routes/api/index.js
const router = require('express').Router();         //const express = require('express');
                                                    //const router = express.Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');
const playlistsRouter = require('./playlists.js');
const commentsRouter = require('./comments.js');
const artistsRouter = require('./artists.js');

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth.js');


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.use('/playlists', playlistsRouter);

router.use('/comments', commentsRouter);

router.use('/artists', artistsRouter);

// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body});
});

// ...

// GET /api/set-token-cookie


// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });


// // GET /api/restore-user
// router.get('/restore-user',(req, res) => {
//       return res.json(req.user);
//     }
// );

// // GET /api/require-auth
// router.get('/require-auth',requireAuth,(req, res) => {
//       return res.json(req.user);
//     }
// );
module.exports = router;
