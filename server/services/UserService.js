const fs = require('fs')

const UserRepository = require('../repositories/userRepository')
const AuthUtil = require('../utils/Auth')
const cloudinaryUploadImg = require('../utils/cloudinary')

const getUser = async (id) => {
    AuthUtil.validateID(id)
    const isExistuser = await UserRepository.getUserBYId(id)

    if (!isExistuser) {
        const error = new Error('user not found')
        error.status = 400;
        throw error
    }
    return isExistuser
}

const getUsers = async () => await UserRepository.getUsers()

const updateUserProfile = async (
    id,
    { firstName, lastName, email, bio, profilePhoto },
) => {
    AuthUtil.validateID(id)
    await getUser(id)

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
    await getUser(id)

    if (newPassword) {
        if (await AuthUtil.comparePassword(newPassword, userPassword)) {
            const error = new Error('your new password is the same as your old one')
            error.status = 400
            throw error
        }

        const user = await UserRepository.updateUser(id, {
            password: await AuthUtil.hashPassword(newPassword),
        })

        return user
    }
}

const deleteUser = async (id) => {
    AuthUtil.validateID(id)
    await getUser(id)
    await UserRepository.deleteUser(id)
}

const followUser = async (userID, userFollowedID) => {
    AuthUtil.validateID(userFollowedID)
    const followedUser = await getUser(userFollowedID)

    if (followedUser.followers.includes(userID)) {
        const error = new Error('you are already following this user')
        error.status = 409
        throw error
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
    await getUser(userUnfollowedID)

    const unfollowedUser = await UserRepository.updateUser(userUnfollowedID, {
        $pull: { followers: userID },
    })

    const loginUser = await UserRepository.updateUser(userID, {
        $pull: { following: userUnfollowedID },
    })
    return { unfollowedUser, loginUser }
}

const blockUser = async (id) => {
    AuthUtil.validateID(id)
    await getUser(id)

    const user = await UserRepository.updateUser(id, {
        isBlocked: true,
    })
    return user
}

const unblockUser = async (id) => {
    AuthUtil.validateID(id)
    await getUser(id)

    const user = await UserRepository.updateUser(id, {
        isBlocked: false,
    })
    return user
}

const uploadProfilePhoto = async (id, localPath) => {
    const image = await cloudinaryUploadImg(localPath)
    await getUser(id)

    const user = await UserRepository.updateUser(id, {
        profilePhoto: image?.url,
    })
    // fs.unlinkSync(localPath)
    return user
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
