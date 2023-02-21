const expressAsyncHandler = require("express-async-handler");

const Post = require("../../models/post/Post");

const likePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const userId = req.user.id;

    try {
        const post = await Post.findById(id)
        const alreadyDisliked = post.dislikes.includes(userId)
        const alreadyLiked = post.likes.includes(userId)

        if (alreadyDisliked) {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { dislikes: userId },
                    isDisliked: false
                },
                {

                    $push: { likes: userId },
                    isLiked: true
                },
                { new: true }
            );

            res.status(200).json({ message: "success", post });
        }

        if (alreadyLiked) {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: userId },
                    isLiked: false
                },
                { new: true }
            );

            res.status(200).json({ message: "success", post });
        }

        else {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $push: { likes: userId },
                    isLiked: true
                },
                { new: true }
            );

            res.status(200).json({ message: "success", post });
        }

    }

    catch (err) {
        res.json({ message: err.message });
    }
});

module.exports = likePost;
