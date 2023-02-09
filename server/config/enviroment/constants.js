const dotenv = require('dotenv')

dotenv.config()

const {
    DATABASE_URL,
    PORT,
    SECRET_KEY
} = process.env

const config = {
    database: {
        uri: DATABASE_URL || ''
    },
    port: PORT || 5000,

    jwt: {
        secretKey: SECRET_KEY || ''
    }

}
module.exports = config

