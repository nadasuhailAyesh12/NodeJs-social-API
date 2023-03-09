const Comment = require("../models/Comment");

const createComment = (options) => Comment.create(options);

const getComment = (id) => Comment.findById(id);

const getAllComments = () => Comment.find({})

const updateComment = (id) => Comment.findByIdAndUpdate(id, options, {
    new: true,
    runValidators: true
})

const deleteComment = (id) => Comment.findByIdAndDelete(id)

const CommentRepository = { createComment, getComment, getAllComments, updateComment, deleteComment }
module.exports = CommentRepository