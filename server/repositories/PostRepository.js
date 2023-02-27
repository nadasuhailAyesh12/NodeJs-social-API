const Post = require("../models/Post")

const createPost = (options) => Post.create(options)

const PostRepository = { createPost }
module.exports = PostRepository