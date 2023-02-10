const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User')
const generateToken = require('../../utils/generateToken');
const hashPassword = require('../../utils/hashPassword');

const register = expressAsyncHandler(
    async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body
            const hashedPassword = await hashPassword(password)

            const userExists = await User.findOne({ email })

            if (userExists) {
                throw new Error('User already exists')
            }

            const user = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })


            const userId = user._id
            const token = generateToken(userId)

            res.status(201).json({ message: 'success', user, token })
        }

        catch (error) {
            res.json({
                message: error.message,
                status: res.statusCode
            })
        }

    })

module.exports = register