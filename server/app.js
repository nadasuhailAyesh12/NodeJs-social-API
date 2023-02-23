const express = require("express");

const route = require("./routes")
const { notFoundError, errorHandler } = require("./middlewars/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", route);

app.use(notFoundError);
app.use(errorHandler);

module.exports = app;

