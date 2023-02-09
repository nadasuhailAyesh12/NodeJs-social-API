const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User')
const generateToken = require('../../utils/generateToken');

const register = expressAsyncHandler(
    async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body

            const userExists = await User.findOne({ email })

            if (userExists) {
                throw new Error('User already exists')
            }

            const user = await User.create({
                firstName,
                lastName,
                email,
                password
            })

            const userId = user._id
            const token = generateToken(userId)

            res.status(201).json({ message: 'success', user, token })
        }

        catch (error) {
            throw new Error(error)
        }

    })

module.exports = register