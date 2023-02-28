const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler')

const { secretKey } = require('../config/enviroment').jwt
const User = require("../models/User")

const authMiddleware = expressAsyncHandler(
    async (req, res, next) => {
        let token;

        if (req?.headers?.authorization?.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(" ")[1];
                if (token) {
                    const decoded = jwt.verify(token, secretKey)
                    const user = await User.findById(decoded?.id).select("-password");
                    req.user = user
                    next()
                }
            }

            catch (error) {
                error = new Error("Not authorized token expired, login again");
                error.status = 401
                throw error
            }
        }

        else {
            const error = new Error("There is no token attached to the header");
            error.status = 401
            throw error
        }
    })

module.exports = authMiddleware