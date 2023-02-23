const fs = require('fs');

const expressAsyncHandler = require('express-async-handler');
const User = require('../models/User');
const cloudinaryUploadImg = require('../utils/cloudinary');

const { comparePassword, hashPassword, validateID } = require("../utils/Auth");

const fetchAllUsers = expressAsyncHandler(
    async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).json({ message: 'success', users })
        }

        catch (err) {
            res.json({ message: err.message })
        }
    })

const fetchcustomUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        try {
            validateID(id)
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            const user = await User.findById(id)
            res.status(200).json({ message: 'success', user });
        }

        catch (err) {
            res.json({ message: err.message })
        }
    })

const fetchUserProfile = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params

        try {
            validateID(id)
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            const userProfile = await User.findById(id).populate('posts')
            res.status(200).json({ message: 'success', userProfile });
        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

const updateUserProfile = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        validateID(id)

        try {
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            else if (req?.user?.firstName === req?.body?.firstName && req?.user?.lastName === req?.body?.lastName && req?.user?.email === req?.body?.email && req?.user?.bio === req?.body?.bio && req?.user?.profilePhoto === req?.body?.profilePhoto) {
                throw new Error("nothing changed please update one of the required fields")
            }

            else {
                const user = await User.findByIdAndUpdate(
                    req.user.id,
                    {
                        firstName: req?.body?.firstName,
                        lastName: req?.body?.lastName,
                        email: req?.body?.email,
                        bio: req?.body?.bio,
                        profilePhoto: req?.body?.profilePhoto
                    },
                    {
                        new: true,
                        runValidators: true
                    })

                res.status(200).json({ message: "sucess", user });
            }
        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

const updateUserPassword = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        validateID(id)
        const password = req?.body?.password

        try {
            const user = await User.findById(id)

            if (!user) {
                throw new Error("user not found")
            }

            else if (password) {
                if (await comparePassword(password, user.password)) {
                    throw new Error("password doesn’t change")
                }

                user.password = await hashPassword(password)
                const updatedUser = await user.save()

                res.status(200).json({ message: "sucess", user: updatedUser });
            }

            else {
                res.status(200).json({ message: "sucess", user });
            }
        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

const deleteUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        try {
            validateID(id)
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            await User.findByIdAndDelete(id)
            res.status(204).json({ message: "success" })
        }

        catch (err) {
            res.json({ message: err.message })
        }

    })

const followUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.body
        validateID(id)

        try {
            const followedUser = await User.findById(id)

            if (!followedUser) {
                throw new Error(" the user that you are trying to follow is not found")
            }

            else if (followedUser.followers.includes(req?.user?.id)) {
                throw new Error("you are already following this user")
            }

            else {
                const followedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        $push: { followers: req?.user?.id }
                    },
                    {
                        new: true,

                    })

                const loginUser = await User.findByIdAndUpdate(
                    req?.user?.id,
                    {
                        $push: { following: id }
                    },
                    {
                        new: true,

                    })

                res.status(200).json({ message: "sucess", loginUser, followedUser });
            }
        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

const unfollowUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.body
        validateID(id)

        try {
            const unfollowedUser = await User.findById(id)

            if (!unfollowedUser) {
                throw new Error(" the user that you are trying to unfollow is not found")
            }

            else {
                const unfollowedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        $pull: { followers: req?.user?.id }
                    },
                    {
                        new: true,

                    })

                const loginUser = await User.findByIdAndUpdate(
                    req?.user?.id,
                    {
                        $pull: { following: id }
                    },
                    {
                        new: true,

                    })

                res.status(200).json({ message: "sucess", loginUser, unfollowedUser });
            }
        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

const blockUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        validateID(id)

        try {
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            else {
                const user = await User.findByIdAndUpdate(
                    id,
                    {
                        isBlocked: true
                    },
                    {
                        new: true,
                    })

                res.status(200).json({ message: "sucess", user });
            }
        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

const unblockUser = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        validateID(id)

        try {
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            else {
                const user = await User.findByIdAndUpdate(
                    id,
                    {
                        isBlocked: false
                    },
                    {
                        new: true,
                    })

                res.status(200).json({ message: "sucess", user });
            }
        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

const uploadProfilePhoto = expressAsyncHandler(
    async (req, res) => {
        try {
            const localPath = `public/images/profile/${req.file.filename}`
            const image = await cloudinaryUploadImg(localPath)
            const { id } = req.user
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            else {
                const user = await User.findByIdAndUpdate(
                    id,
                    {
                        profilePhoto: image?.url
                    },
                    {
                        new: true,
                    })
                fs.unlinkSync(localPath)
                res.status(200).json({ message: "sucess", user });
            }

        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

const userController = { fetchAllUsers, fetchcustomUser, fetchUserProfile, updateUserProfile, updateUserPassword, deleteUser, followUser, unfollowUser, blockUser, unblockUser, uploadProfilePhoto }
module.exports = userController




