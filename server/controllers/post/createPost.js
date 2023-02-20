const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");

const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const ValidateID = require("../../utils/ValidateMongoID");

const createPost = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.user;
        ValidateID(id);

        const isProfane = new Filter().isProfane(
            req.body.title,
            req.body.description
        );

        if (isProfane) {
            req.user.isBlocked = true;
            await req.user.save();
            throw new Error(
                "creating faild because post containes profane words and you have been blocked"
            );
        }

        else {
            const post = await Post.create(req.body);
            await User.findByIdAndUpdate(
                id,
                {
                    $inc: { postCount: 1 },
                },
                { new: true }
            );

            res.status(201).json({
                message: "success",
                post
            });
        }
    }

    catch (error) {
        res.json({
            message: error.message,
        });
    }
});

module.exports = createPost;
