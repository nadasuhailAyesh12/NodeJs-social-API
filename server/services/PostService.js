const fs = require('fs');

const Filter = require('bad-words');

const UserService = require('./userService');
const cloudinaryUploadImg = require('../utils/cloudinary');
const PostRepository = require('../repositories/postRepository');
const UserRepository = require('../repositories/userRepository');


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

const PostService = { createPost }
module.exports = PostService
