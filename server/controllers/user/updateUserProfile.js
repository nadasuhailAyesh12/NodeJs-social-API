const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const validateID = require("../../utils/ValidateMongoID");

const updateUserProfile = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        validateID(id)

        try {
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            else if (req?.user?.firstName === req?.body?.firstName && req.user.lastName === req.body.lastName && req.user.email === req.body.email && req.user.bio === req.body.bio && req.user.profilePhoto === req.body.profilePhoto) {
                throw new Error("nothing changed please update one of the required fields")
            }

            else {
                const user = await User.findByIdAndUpdate(
                    id,
                    {
                        firstName: req?.body?.firstName,
                        lastName: req?.body?.lastName,
                        email: req?.body?.email,
                        bio: req?.body?.bio,
                        profilePhoto: req?.body?.profilePhoto
                    },
                    {
                        new: true,
                        runValidators: true
                    })
                res.status(200).json({ message: "sucess", user });
            }

        }
        catch (err) {
            res.json({ message: err.message });
        }

    })

module.exports = updateUserProfile;