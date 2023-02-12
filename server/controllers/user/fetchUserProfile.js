const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const validateID = require("../../utils/ValidateMongoID");

const userProfile = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params

        try {
            validateID(id)

            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            const userProfile = await User.findById(id)
            res.status(200).json({ message: 'success', userProfile });
        }

        catch (err) {
            res.json({ message: err.message });
        }

    })

module.exports = userProfile;;