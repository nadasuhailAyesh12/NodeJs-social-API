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
        const error = new Error(
            "creating faild because post containes profane words and you have been blocked"
        );
        error.status = 403;
        throw error;
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
        const error = new Error('post not found')
        error.status = 400
        throw error
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
    if ((UserOwnerID.toString()) !== loginUserID) {
        const error = new Error(" unauthorized to modify this post ")
        error.status = 403
        throw error
    }
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

const deletePost = async (ownerID, postID) => {
    await checkIfPost(postID)
    await PostRepository.deletePost(postID)
    await UserRepository.updateUser(ownerID, {
        $inc: { postCount: -1 },
    })
}

const likePost = async (id, dislikes, isLiked, userID) => {
    const alreadyDisliked = dislikes?.includes(userID)
    let post = await checkIfPost(id)

    if (alreadyDisliked) {
        post = await PostRepository.updatePost(
            id,
            {
                $pull: { dislikes: userID },
                isDisliked: false,
            }
        );
    }

    if (isLiked) {
        post = await PostRepository.updatePost(
            id,
            {
                $pull: { likes: userID },
                isLiked: false
            }
        );
    }

    else {
        post = await PostRepository.updatePost(
            id,
            {
                $push: { likes: userID },
                isLiked: true
            }
        );
    }

    return post;
}

const dislikePost = async (id, likes, isDisliked, userID) => {
    let post = await checkIfPost(id)
    const alreadyLiked = likes?.includes(userID)

    if (alreadyLiked) {
        post = await PostRepository.updatePost(
            id,
            {
                $pull: { likes: userID },
                isLiked: false

            }
        );
    }

    if (isDisliked) {
        post = await PostRepository.updatePost(
            id,
            {
                $pull: { dislikes: userID },
                isDisliked: false
            }
        );
    }

    else {
        post = await PostRepository.updatePost(
            id,
            {
                $push: { dislikes: userID },
                isDisliked: true
            }
        );
    }
    return post;
}

const PostService = { createPost, getPosts, getPost, checkIfPostOwner, checkIfPost, updatePost, deletePost, likePost, dislikePost }
module.exports = PostService
