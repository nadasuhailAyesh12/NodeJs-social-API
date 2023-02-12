const userRouter = require('express').Router()

const fetchAllUsers = require('../../controllers/user/fetchAllUsers')
const authMiddleware = require('../../middlewars/auth/authMiddleware')
const fetchUser = require('../../controllers/user/fetchUser')
const deleteUser = require('../../controllers/user/deleteUser')
const userProfile = require('../../controllers/user/fetchUserProfile')
const updateUserProfile = require('../../controllers/user/updateUserProfile')
const updateProfileValidationSchema = require('../../validation/profileUpdateValidation')
const { passwordValidationSchema } = require('../../validation/authValidation')
const validator = require('../../middlewars/validation/validator')
const updateUserPassword = require('../../controllers/user/updatePassword')

userRouter.get('/', authMiddleware, fetchAllUsers)
userRouter.get('/:id', fetchUser)
userRouter.delete('/:id', deleteUser)
userRouter.get('/profile/:id', authMiddleware, userProfile)
userRouter.put('/:id', authMiddleware, validator(updateProfileValidationSchema), updateUserProfile)
userRouter.put('/password/:id', authMiddleware, validator(passwordValidationSchema), updateUserPassword)

module.exports = userRouter