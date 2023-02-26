const User = require("../models/User");

const getUser = (options) => User.findOne({ ...options });
const getUserBYId = (id) => User.findById(id)

const getUsers = () => User.find({})

const createUser = (options) => User.create(options);

const updateUser = async (id, options) => await User.findByIdAndUpdate(id, options, {
    new: true,
    runValidators: true
})

const deleteUser = (id) => User.findByIdAndDelete(id)

const UserRepository = { getUser, createUser, updateUser, deleteUser, getUserBYId, getUsers }
module.exports = UserRepository