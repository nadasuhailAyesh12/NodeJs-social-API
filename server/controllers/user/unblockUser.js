const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const validateID = require("../../utils/ValidateMongoID");

const unblockUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        validateID(id)

        try {
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            else {
                const user = await User.findByIdAndUpdate(
                    id,
                    {
                        isBlocked: false
                    },
                    {
                        new: true,
                    })

                res.status(200).json({ message: "sucess", user });
            }

        }
        catch (err) {
            res.json({ message: err.message });
        }

    })

module.exports = unblockUser;