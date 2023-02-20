const expressAsyncHandler = require("express-async-handler");
const Post = require("../../models/post/Post");

const fetchAllPosts = expressAsyncHandler(
    async (req, res) => {
        try {
            const posts = await Post.find({}).populate('user');

            res.json({
                message: "sucess",
                posts
            });
        }

        catch (err) {
            res.json({
                message: err.message
            });
        }

    })

module.exports = fetchAllPosts 