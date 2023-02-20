const cloudinary = require('cloudinary')

const cloudinaryConfig = require('../config/cloudinary')

cloudinary.v2.config(cloudinaryConfig)

const cloudinaryUploadImg = async (file) => {
    try {
        const data = await cloudinary.v2.uploader.upload(file, {
            resource_type: 'auto'
        })
        return {
            url: data?.secure_url
        };
    }
    catch (error) {
        return error
    }

}

module.exports = cloudinaryUploadImg