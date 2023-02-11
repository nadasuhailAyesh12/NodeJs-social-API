const userRouter = require('express').Router()

const fetchAllUsers = require('../../controllers/user/fetchAllUsers')
const authMiddleware = require('../../middlewars/auth/authMiddleware')
const fetchUser = require('../../controllers/user/fetchUser')
const deleteUser = require('../../controllers/user/deleteUser')
const userProfile = require('../../controllers/user/userProfile')
const updateUserProfile = require('../../controllers/user/updateUserProfile')
const updateProfileValidationSchema = require('../../validation/profileUpdateValidation')
const validator = require('../../middlewars/validation/validator')

userRouter.get('/', authMiddleware, fetchAllUsers)
userRouter.get('/:id', fetchUser)
userRouter.delete('/:id', deleteUser)
userRouter.get('/profile/:id', authMiddleware, userProfile)
userRouter.put('/:id', authMiddleware, validator(updateProfileValidationSchema), updateUserProfile)

module.exports = userRouter