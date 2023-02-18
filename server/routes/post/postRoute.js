const postRouter = require("express").Router();

const createPost = require("../../controllers/post/CreatePost");
const authMiddleware = require("../../middlewars/auth/authMiddleware");

postRouter.post("/", authMiddleware, createPost);

module.exports = postRouter;
