const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const comparePassword = require('../../utils/comparePassword');
const generateToken = require('../../utils/generateToken');

const login = expressAsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        try {
            if (user && (await comparePassword(password, user.password))) {
                const userId = user._id
                const token = generateToken(userId)

                res.status(200).json({ message: 'success', user, token })

            } else {
                res.status(401);
                throw new Error("Invalid Login Credentials");
            }
        }

        catch (error) {
            throw new Error(error)
        }

    })


module.exports = login