const express = require('express');
const route = express.Router();

const authRoute = require('./AuthRoute');
const postRouter = require('./postRoute');
const usersRoute = require('./UserRoute')
const commentRoute = require("./CommentRoute")

route.use('/auth', authRoute);
route.use("/users", usersRoute)
route.use("/posts", postRouter)
route.use("/comments", commentRoute)

module.exports = route;
