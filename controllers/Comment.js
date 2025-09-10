const Comment = require('../models/Comment')
const User = require('../models/User')

// get a comment
const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    res.send(comment)
  } catch (error) {
    throw error
  }
}

// get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
    res.send(comments)
  } catch (error) {
    throw error
  }
}

// post a comment
const postComment = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const user = await User.findById(id)

    if (user) {
      const comment = await Comment.create({
        ...req.body,
        userId: id
      })
      await comment.populate('userId', 'first_name last_name')
      return res.send(comment)
    } else {
      res.status(404).send({ msg: 'User not found' })
    }
  } catch (error) {
    throw error
  }
}

// update comment 
const updateComment = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const comment = await Comment.findById(req.params.id)

    if (comment.userId.toString() === id) {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      return res.send(updatedComment)
    }

    res.status(403).send({ msg: 'Not authorized to update this comment' })
  } catch (error) {
    throw error
  }
}

// delete comment 
const deleteComment = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const comment = await Comment.findById(req.params.id)

    if (comment.userId.toString() === id) {
      await Comment.deleteOne({ _id: req.params.id })
      return res.status(200).send({ msg: 'Comment deleted' })
    }

    res.status(403).send({ msg: 'Not authorized to delete this comment' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getComment,
  getAllComments,
  postComment,
  updateComment,
  deleteComment
}
