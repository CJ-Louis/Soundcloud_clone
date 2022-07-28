// backend/routes/api/index.js
const router = require('express').Router();         //const express = require('express');
                                                    //const router = express.Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const { restoreUser, requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);
// backend/routes/api/index.js
// ...

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body});
// });

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
