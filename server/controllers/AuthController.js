const expressAsyncHandler = require("express-async-handler");

const AuthService = require("../services/AuthService")

const register = expressAsyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const { user, token } = await AuthService.register({ firstName, lastName, email, password })
        res.status(201).json({ message: "success", user, token });
    }

    catch (error) {
        res.json({
            message: error.message,
        });
    }
});

const login = expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await AuthService.login({ email, password })
        res.status(200).json({ message: "success", user, token });
    }

    catch (error) {
        res.json({
            message: error.message,
        });
    }
});

module.exports = { login, register };
