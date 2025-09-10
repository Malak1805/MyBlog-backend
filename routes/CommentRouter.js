const router = require('express').Router()
const Comment = require('../controllers/Comment')
const middleWares = require('../middlewares')


// get all comments
router.get(
  '',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.getAllComments
)

// get comment
router.get(
  '/:id',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.getComment
)

// update comment
router.put(
  '/:id',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.updateComment
)

// post comment
router.post(
  '',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.postComment
)

// delete a comment
router.delete(
  '/:id',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.deleteComment
)

module.exports = router