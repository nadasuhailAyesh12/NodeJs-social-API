const expressAsyncHandler = require("express-async-handler");

const Post = require("../../models/post/Post");

const dislikePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const userId = req.user.id;

    try {
        const post = await Post.findById(id)
        const alreadyDisliked = post.dislikes.includes(userId)
        const alreadyLiked = post.likes.includes(userId)

        if (alreadyLiked) {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: userId },
                    isDisliked: false
                },
                {

                    $push: { dislikes: userId },
                    isDisliked: true
                },
                { new: true }
            );

            res.status(200).json({ message: "success", post });
        }

        if (alreadyDisliked) {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { dislikes: userId },
                    isDisliked: false
                },
                { new: true }
            );

            res.status(200).json({ message: "success", post });
        }

        else {
            const post = await Post.findByIdAndUpdate(
                id,
                {
                    $push: { dislikes: userId },
                    isDisliked: true
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

module.exports = dislikePost;
