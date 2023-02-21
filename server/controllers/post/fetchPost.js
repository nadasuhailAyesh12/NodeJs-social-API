const expressAsyncHandler = require("express-async-handler");

const Post = require("../../models/post/Post");
const validateID = require("../../utils/ValidateMongoID");

const fetchPost = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        validateID(id);
        const isExistPost = await Post.findById(id)

        if (!isExistPost) {
            throw new Error("post not found")
        }

        const post = await Post.findById(id).populate("user").populate("dislikes").populate("likes");
        await Post.findByIdAndUpdate(
            id,
            {
                $inc: { numOfViews: 1 },
            },
            { new: true }
        );

        res.status(200).json({ message: "success", post });
    }

    catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = fetchPost;
