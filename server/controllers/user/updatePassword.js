const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const comparePassword = require('../../utils/comparePassword');
const hashPassword = require('../../utils/hashPassword');
const validateID = require("../../utils/ValidateMongoID");

const updateUserPassword = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        validateID(id)
        const password = req?.body?.password

        try {
            const user = await User.findById(id)

            if (!user) {
                throw new Error("user not found")
            }

            else if (password) {
                if (await comparePassword(password, user.password)) {
                    throw new Error("password doesn’t change")
                }

                user.password = await hashPassword(password)
                const updatedUser = await user.save()

                res.status(200).json({ message: "sucess", user: updatedUser });
            }

            else {
                res.status(200).json({ message: "sucess", user });
            }

        }

        catch (err) {
            res.json({ message: err.message });
        }

    })

module.exports = updateUserPassword;