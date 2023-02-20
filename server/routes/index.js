const express = require('express');
const route = express.Router();

const authRoute = require('./auth/AuthRoute');
const postRouter = require('./post/postRoute');
const usersRoute = require('./user/userRoute')

route.use('/auth', authRoute);
route.use("/users", usersRoute)
route.use("/posts", postRouter)

module.exports = route;
