const dotenv = require('dotenv')

dotenv.config()

const {
    DATABASE_URL,
    PORT,
    SECRET_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY
} = process.env

const config = {
    database: {
        uri: DATABASE_URL || ''
    },
    port: PORT || 5000,

    jwt: {
        secretKey: SECRET_KEY || ''
    },
    cloudinary: {
        cloudName: CLOUDINARY_CLOUD_NAME,
        cloudApiKey: CLOUDINARY_API_KEY,
        cloudSecretKey: CLOUDINARY_SECRET_KEY
    }

}
module.exports = config

