const postRouter = require("express").Router();

const createPost = require("../../controllers/post/CreatePost");
const fetchAllPosts = require("../../controllers/post/fetchAllPosts");
const fetchPost = require("../../controllers/post/fetchPost");
const authMiddleware = require("../../middlewars/auth/authMiddleware");

postRouter.get("/", fetchAllPosts)
postRouter.post("/", authMiddleware, createPost);
postRouter.get("/:id", fetchPost)

module.exports = postRouter;
