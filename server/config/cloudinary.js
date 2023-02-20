const config = require("./enviroment")

const cloudinaryConfig = {
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.cloudApiKey,
    api_secret: config.cloudinary.cloudSecretKey,
    secure: true
}

module.exports = cloudinaryConfig