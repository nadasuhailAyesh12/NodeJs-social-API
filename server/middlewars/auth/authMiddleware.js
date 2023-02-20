const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler')

const { secretKey } = require('../../config/enviroment').jwt
const User = require('../../models/user/User')

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
                throw new Error("Not authorized token expired, login again");
            }
        }
        else {
            throw new Error("There is no token attached to the header");
        }

    })

module.exports = authMiddleware