const mongoose = require('mongoose')

const ValidateID = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)

    if (!isValid) {
        throw new Error(' user id is invalid ')
    }
}

module.exports = ValidateID