const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

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

      // console.log("This is the email checker" + uniqueEmail + (uniqueEmail === false))
      // console.log("This is the username checker" + uniqueUser)
      // if (uniqueEmail){
      //   console.log('here I am')
      // }

      if (uniqueEmail == false && uniqueUser == false){
        const user = await User.signup({ firstName, lastName, email, username, password });

        await setTokenCookie(res, user);

        return res.json({
          user
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


module.exports = router;
