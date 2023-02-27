
const User = require("../models/User");
const UserRepository = require("../repositories/userRepository");
const userRepository = require("../repositories/userRepository");
const AuthUtil = require("../utils/Auth");

const register = async ({ firstName, lastName, email, password }) => {
    const userExists = await userRepository.getUser({ email });

    if (userExists) {
        throw new Error("User already exists");
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
        throw new Error("Invalid Login Credentials");
    }
};

const AuthService = { login, register }
module.exports = AuthService;