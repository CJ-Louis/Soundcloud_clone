const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



router.put('/:commentId', requireAuth, async (req, res) => {
    const {user} = req;
    const commentId = req.params.commentId
    const { body } = req.body

    const comment = await Comment.findByPk(commentId)

    if (!comment){
        res.status(404).json({
            message: "Comment couldn't be found",
            statusCode: 404
          })
    }

    if (user.id !== comment.userId){
        res.status(404).json({
            message: "You do not have permission to change this comment",
            statusCode: 404
          })
    }

    if (body) comment.body = body


    await comment.save()

    return res.json({
        comment
    })

})



module.exports = router
