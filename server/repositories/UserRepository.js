const User = require("../models/User");
const { options } = require("../routes/userRoute");

const getUser = (options) => User.findOne({ ...options });

const getUsers = () => User.find({})

const createUser = (options) => User.create(user);

const updateUser = (id, options) => User.findByIdAndUpdate({ id, options })

const deleteUser = (id) => User.findByIdAndDelete(id)

const userRepository = { getUser, getUsers, createUser, updateUser, deleteUser }
module.exports = userRepository