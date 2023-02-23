const userRouter = require('express').Router()

const authMiddleware = require('../middlewars/authMiddleware')
const updateProfileValidationSchema = require('../validation/profileUpdateValidation')
const { passwordValidationSchema } = require('../validation/authValidation')
const validator = require('../middlewars/validator')
const userController = require("../controllers/UserController");
const { photoUpload, profilePhotoResize } = require('../middlewars/photoUpload')

userRouter.get('/', authMiddleware, userController.fetchAllUsers)
userRouter.get('/:id', userController.fetchcustomUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.get('/profile/:id', authMiddleware, userController.fetchUserProfile)
userRouter.put('/profile/:id', authMiddleware, validator(updateProfileValidationSchema), userController.updateUserProfile)
userRouter.put('/profilephoto-upload', authMiddleware, photoUpload.single("image"), profilePhotoResize, userController.uploadProfilePhoto)
userRouter.put('/password/:id', authMiddleware, validator(passwordValidationSchema), userController.updateUserPassword)
userRouter.put('/follow', authMiddleware, userController.followUser)
userRouter.put('/unfollow', authMiddleware, userController.unfollowUser)
userRouter.put('/block/:id', authMiddleware, userController.blockUser)
userRouter.put('/unblock/:id', authMiddleware, userController.unblockUser)

module.exports = userRouter