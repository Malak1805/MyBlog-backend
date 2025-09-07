const router = require('express').Router()
const Comment = require('../controllers/Comment')
const middleWares = require('../middlewares')

router.get(
  '',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.getAllComments
)
router.get(
  '/:id',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.getComment
)
router.put(
  '/:id',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.updateComment
)
router.post(
  '',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.postComment
)
router.delete(
  '/:id',
  middleWares.stripToken,
  middleWares.verifyToken,
  Comment.deleteComment
)

module.exports = router