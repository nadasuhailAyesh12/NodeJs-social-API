const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const validateID = require("../../utils/ValidateMongoID");

const unfollowingUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.body
        validateID(id)

        try {
            const unfollowedUser = await User.findById(id)

            if (!unfollowedUser) {
                throw new Error(" the user that you are trying to unfollow is not found")
            }

            else {
                const unfollowedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        $pull: { followers: req?.user?.id }
                    },
                    {
                        new: true,

                    })

                const loginUser = await User.findByIdAndUpdate(
                    req?.user?.id,
                    {
                        $pull: { following: id }
                    },
                    {
                        new: true,

                    })

                res.status(200).json({ message: "sucess", loginUser, unfollowedUser });
            }

        }

        catch (err) {
            res.json({ message: err.message });
        }

    })

module.exports = unfollowingUser;