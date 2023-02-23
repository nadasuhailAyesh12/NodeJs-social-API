const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const { secretKey } = require('../config/enviroment').jwt;

const validateID = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)

    if (!isValid) {
        throw new Error('The id is invalid ')
    }
}

const generateToken = (id) => {
    const token = jwt.sign({ id }, secretKey, { expiresIn: '14d' })
    return token;
}

const hashPassword = async (password) => {
    return (await bcrypt.hash(password, 10))
}

const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

module.exports = { generateToken, hashPassword, comparePassword, validateID }

