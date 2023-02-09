const express = require('express');

const userRoute = require('./user/AuthRoute')
const route = express.Router();

route.use('/users', userRoute)

module.exports = route;
