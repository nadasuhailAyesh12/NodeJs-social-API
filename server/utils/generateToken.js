const jwt = require('jsonwebtoken');

const { secretKey } = require('../config/enviroment').jwt;

const generateToken = (id) => {
    const token = jwt.sign({ id }, secretKey, { expiresIn: '14d' })
    return token;
}
module.exports = generateToken;