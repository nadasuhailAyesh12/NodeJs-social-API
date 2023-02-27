const Post = require("../models/Post")

const createPost = (options) => Post.create(options)

const getPost = (id) => Post.findById(id)
const getPosts = () => Post.find({})

const updatePost = async (id, options) => await Post.findByIdAndUpdate(id, options, {
    new: true,
    runValidators: true
})

const deletePost = (id) => Post.findByIdAndDelete(id)

const PostRepository = { createPost, getPost, getPosts, updatePost, deletePost }
module.exports = PostRepository