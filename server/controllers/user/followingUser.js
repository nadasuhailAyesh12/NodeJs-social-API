const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const validateID = require("../../utils/ValidateMongoID");

const followingUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.body
        validateID(id)

        try {
            const followedUser = await User.findById(id)

            if (!followedUser) {
                throw new Error(" the user that you are trying to follow is not found")
            }

            else if (followedUser.followers.includes(req?.user?.id)) {
                throw new Error("you are already following this user")
            }

            else {
                const followedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        $push: { followers: req?.user?.id }
                    },
                    {
                        new: true,

                    })

                const loginUser = await User.findByIdAndUpdate(
                    req?.user?.id,
                    {
                        $push: { following: id }
                    },
                    {
                        new: true,

                    })

                res.status(200).json({ message: "sucess", loginUser, followedUser });
            }

        }

        catch (err) {
            res.json({ message: err.message });
        }

    })

module.exports = followingUser;