const router = require('express').Router()
const Blog = require('../controllers/Blog')
const middlewares = require('../middlewares')



// Get all blogs
router.get(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.getAllBlogs
)

// Get single blog
router.get(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.getBlog
)

// Create a blog
router.post(
  '/',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.postBlog
)

// Update a blog
router.put(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.updateBlog
)

// Delete a blog
router.delete(
  '/:id',
  middlewares.stripToken,
  middlewares.verifyToken,
  Blog.deleteBlog
)

module.exports = router
