const Blog = require('../models/Blog')
const User = require('../models/User')
const Comment = require('../models/Comment')

// get a blog by id
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).send({ msg: 'Blog not found' })
    const comments = await Comment.find({ blogId: blog._id })
    res.send(blog, comments)
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching blog' })
  }
}

// get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.send(blogs)
  } catch (error) {
    throw error
  }
}

// post a blog
const postBlog = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const user = await User.findById(id)

    if (user) {
      const blog = await Blog.create({...req.body, userId: id})
      return res.send(blog)
    } else {
      res.status(404).send({ msg: 'User not found' })
    }
  } catch (error) {
    throw error
  }
}

// update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const blog = await Blog.findById(req.params.id)

    if (!blog) return res.status(404).send({ msg: 'Blog not found' })

    if (blog.userId.toString() === id) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      return res.send(updatedBlog)
    }

    res.status(403).send({ msg: 'Not authorized to update this blog' })
  } catch (error) {
    throw error
  }
}

// delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const blog = await Blog.findById(req.params.id)

    if (!blog) return res.status(404).send({ msg: 'Blog not found' })

    if (blog.userId.toString() === id) {
      await Blog.deleteOne({ _id: req.params.id })
      return res.status(200).send({ msg: 'Blog deleted' })
    }

    res.status(403).send({ msg: 'Not authorized to delete this blog' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getBlog,
  getAllBlogs,
  postBlog,
  updateBlog,
  deleteBlog
}
