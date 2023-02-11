const mongoose = require('mongoose')
const User = require('../models/user/User');


const ValidateID = (id) => {

    const isValid = mongoose.Types.ObjectId.isValid(id)


    if (!isValid) {
        throw new Error(' user id is invalid or not found')
    }
}






module.exports = ValidateID