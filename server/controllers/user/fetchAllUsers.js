const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');

const fetchAllUsers = expressAsyncHandler(
    async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).json({ message: 'success', users })
        }

        catch (err) {
            res.json({ message: err.message })
        }

    })

module.exports = fetchAllUsers