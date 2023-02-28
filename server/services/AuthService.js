
const User = require("../models/User");
const UserRepository = require("../repositories/userRepository");
const userRepository = require("../repositories/userRepository");
const AuthUtil = require("../utils/Auth");

const register = async ({ firstName, lastName, email, password }) => {
    const userExists = await userRepository.getUser({ email });

    if (userExists) {
        const error = new Error("User already exists");
        error.status = 409;
        throw error;
    }
    const hashedPassword = await AuthUtil.hashPassword(password);
    const user = await UserRepository.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    const userId = user._id;
    const token = AuthUtil.generateToken(userId);

    return { user, token }
}

const login = async ({ email, password }) => {

    const user = await userRepository.getUser({ email })

    if (user && (await AuthUtil.comparePassword(password, user.password))) {
        const userId = user._id;
        const token = AuthUtil.generateToken(userId);
        return { user, token };
    }
    else {
        const error = new Error("Invalid Login Credentials");
        error.status = 401;
        throw error;
    }
};

const AuthService = { login, register }
module.exports = AuthService;