const expressAsyncHandler = require('express-async-handler');

const Post = require('../../models/post/Post');
const validateID = require("../../utils/ValidateMongoID");

const deletePost = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        try {
            validateID(id)
            const isExistPost = await Post.findById(id)

            if (!isExistPost) {
                throw new Error("post not found")
            }

            await Post.findByIdAndDelete(id)
            res.status(204).json({ message: "success" })
        }

        catch (err) {
            res.json({ message: err.message })
        }

    })

module.exports = deletePost