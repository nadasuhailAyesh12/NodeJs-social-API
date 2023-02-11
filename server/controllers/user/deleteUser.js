const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const validateID = require("../../utils/ValidateMongoID");

const deleteUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        try {
            validateID(id)
            const isExistuser = await User.findById(req?.user?.id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            await User.findByIdAndDelete(id)
            res.status(204).json({ message: "success" })
        }

        catch (err) {
            res.json({ message: err.message })
        }

    })

module.exports = deleteUser