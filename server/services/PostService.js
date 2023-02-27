const fs = require('fs');

const Filter = require('bad-words');

const UserService = require('./userService');
const cloudinaryUploadImg = require('../utils/cloudinary');
const PostRepository = require('../repositories/postRepository');
const UserRepository = require('../repositories/userRepository');
const AuthUtil = require('../utils/Auth');

const createPost = async ({ title, description, category }, id, localPath) => {

    const isProfane = new Filter().isProfane(
        title,
        description,

    );

    if (isProfane) {
        await UserService.blockUser(id)
        throw new Error(
            "creating faild because post containes profane words and you have been blocked"
        );
    }

    const uploadedImage = await cloudinaryUploadImg(localPath)

    const post = await PostRepository.createPost({
        title,
        description,
        image: uploadedImage?.url,
        category,
        user: id
    })
    await UserRepository.updateUser(id, {
        $inc: { postCount: 1 },
    })

    fs.unlinkSync(localPath)
    return post
}

const checkIfPost = async (id) => {
    AuthUtil.validateID(id)
    const isExistPost = await PostRepository.getPost(id)
    if (!isExistPost) {
        throw new Error('post not found')
    }

    return isExistPost
}

const getPost = async (id) => {
    await checkIfPost(id)
    const post = await PostRepository.updatePost(id, {
        $inc: { numOfViews: 1 },
    })
    return post
}

const getPosts = async () => await PostRepository.getPosts()

const checkIfPostOwner = async (UserOwnerID, loginUserID) => {
    if (UserOwnerID.toString() !== (loginUserID.toString()))
        throw new Error(" unauthorized to modify this post ")
}
const updatePost = async (
    id,
    { title, description, image, category }
) => {
    AuthUtil.validateID(id)
    const post = await PostRepository.updatePost(id, {
        title,
        description,
        image,
        category,
    })
    return post
}

const PostService = { createPost, getPosts, getPost, checkIfPostOwner, checkIfPost, updatePost }
module.exports = PostService
