const fs = require('fs')

const UserRepository = require('../repositories/userRepository')
const AuthUtil = require('../utils/Auth')
const cloudinaryUploadImg = require('../utils/cloudinary')

const getUser = async (id) => {
    AuthUtil.validateID(id)
    const isExistuser = await UserRepository.getUserBYId(id)

    if (!isExistuser) {
        throw new Error('user not found')
    }
    return isExistuser
}

const getUsers = async () => await UserRepository.getUsers()

const updateUserProfile = async (
    id,
    { firstName, lastName, email, bio, profilePhoto },
) => {
    AuthUtil.validateID(id)

    const user = await UserRepository.updateUser(id, {
        firstName,
        lastName,
        email,
        bio,
        profilePhoto,
    })
    return user
}

const updatePassword = async (id, newPassword, userPassword) => {
    AuthUtil.validateID(id)
    const user = await UserRepository.getUserBYId(id)

    if (!user) {
        throw new Error('user not found')
    }

    else if (newPassword) {
        if (await AuthUtil.comparePassword(newPassword, userPassword)) {
            throw new Error(' your new password is the same as your old one')
        }

        const user = await UserRepository.updateUser(id, {
            password: await AuthUtil.hashPassword(newPassword),
        })

        return user
    }
}

const deleteUser = async (id) => {
    AuthUtil.validateID(id)
    const isExistuser = await UserRepository.getUserBYId(id)

    if (!isExistuser) {
        throw new Error('user not found')
    }

    await UserRepository.deleteUser(id)
}

const followUser = async (userID, userFollowedID) => {
    AuthUtil.validateID(userFollowedID)
    const followedUser = await UserRepository.getUserBYId(userFollowedID)

    if (!followedUser) {
        throw new Error(' the user that you are trying to follow is not found')
    }

    else if (followedUser.followers.includes(userID)) {
        throw new Error('you are already following this user')
    }

    else {
        const followedUser = await UserRepository.updateUser(userFollowedID, {
            $push: { followers: userID },
        })

        const loginUser = await UserRepository.updateUser(userID, {
            $push: { following: userFollowedID },
        })
        return { followedUser, loginUser }
    }
}

const unfollowUser = async (userID, userUnfollowedID) => {
    AuthUtil.validateID(userUnfollowedID)
    const followedUser = await UserRepository.getUserBYId(userUnfollowedID)

    if (!followedUser) {
        throw new Error(' the user that you are trying to unfollow is not found')
    }

    else {
        const unfollowedUser = await UserRepository.updateUser(userUnfollowedID, {
            $pull: { followers: userID },
        })

        const loginUser = await UserRepository.updateUser(userID, {
            $pull: { following: userUnfollowedID },
        })
        return { unfollowedUser, loginUser }
    }
}

const blockUser = async (id) => {
    AuthUtil.validateID(id)
    const isExistuser = await UserRepository.getUserBYId(id)

    if (!isExistuser) {
        throw new Error('user not found')
    }

    else {
        const user = await UserRepository.updateUser(id, {
            isBlocked: true,
        })
        return user
    }
}

const unblockUser = async (id) => {
    AuthUtil.validateID(id)
    const isExistuser = await UserRepository.getUserBYId(id)

    if (!isExistuser) {
        throw new Error('user not found')
    }

    else {
        const user = await UserRepository.updateUser(id, {
            isBlocked: false,
        })
        return user
    }
}

const uploadProfilePhoto = async (id, localPath) => {
    const image = await cloudinaryUploadImg(localPath)
    const isExistuser = await UserRepository.getUserBYId(id)

    if (!isExistuser) {
        throw new Error('user not found')
    }
    else {
        const user = await UserRepository.updateUser(id, {
            profilePhoto: image?.url,
        })

        fs.unlinkSync(localPath)
        return user
    }
}

const UserService = {
    getUser,
    getUsers,
    updateUserProfile,
    followUser,
    unfollowUser,
    blockUser,
    unblockUser,
    uploadProfilePhoto,
    updatePassword,
    deleteUser,
}
module.exports = UserService
