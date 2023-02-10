const express = require('express')

const register = require('../../controllers/auth/userRegisterController')
const login = require('../../controllers/auth/userLoginController')
const { registerValidationSchema } = require('../../validation/userValidation')
const { loginValidationSchema } = require('../../validation/userValidation')
const validator = require('../../middlewars/validation/validator')

const authRoute = express.Router()

authRoute.post('/register', validator(registerValidationSchema), register)
authRoute.post('/login', validator(loginValidationSchema), login)

module.exports = authRoute