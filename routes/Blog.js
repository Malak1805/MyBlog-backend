const router = require('express').Router()
const Blog = require('../controllers/Blog')
const middlewares = require('../middlewares')

router.get('/', Blog.getAllPosts)

router.get('/:id', Blog.getPostById)

router.post(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.createPost
)

router.get(
  '/:id/edit',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.editPost
)

router.put(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.updatePost
)

router.delete(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.deletePost
)

module.exports = router
