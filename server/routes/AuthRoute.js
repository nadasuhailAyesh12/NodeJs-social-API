const express = require('express')

const { register, login } = require('../controllers/AuthController')
const { registerValidationSchema, loginValidationSchema } = require('../validation/authValidation')
const validator = require('../middlewars/validator')

const authRoute = express.Router()

authRoute.post('/register', validator(registerValidationSchema), register)
authRoute.post('/login', validator(loginValidationSchema), login)

module.exports = authRoute