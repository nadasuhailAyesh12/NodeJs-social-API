const expressAsyncHandler = require('express-async-handler');

const User = require('../models/User');
const { generateToken, hashPassword, comparePassword } = require('../utils/Auth');

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
            res.json({
                message: error.message,
                status: res.statusCode
            })
        }

    })


module.exports = { login, register }