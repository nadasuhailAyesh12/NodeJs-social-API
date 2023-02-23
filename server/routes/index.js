const express = require('express');
const route = express.Router();

const authRoute = require('./AuthRoute');
const postRouter = require('./postRoute');
const usersRoute = require('./UserRoute')

route.use('/auth', authRoute);
route.use("/users", usersRoute)
route.use("/posts", postRouter)

module.exports = route;
