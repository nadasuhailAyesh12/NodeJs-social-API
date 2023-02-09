const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');

const hashPassword = expressAsyncHandler(async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()

})

module.exports = hashPassword

