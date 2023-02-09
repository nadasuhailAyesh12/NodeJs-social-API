const bcrypt = require('bcryptjs')

const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}
module.exports = comparePassword





