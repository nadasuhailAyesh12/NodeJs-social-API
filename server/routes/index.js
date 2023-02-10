const express = require('express');

const authRoute = require('./auth/AuthRoute')
const usersRoute = require('./user/userRoute')
const route = express.Router();


route.use('/auth', authRoute);
route.use("/users", usersRoute)

module.exports = route;
