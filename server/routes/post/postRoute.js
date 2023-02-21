const postRouter = require("express").Router();

const createPost = require("../../controllers/post/CreatePost");
const fetchAllPosts = require("../../controllers/post/fetchAllPosts");
const fetchPost = require("../../controllers/post/fetchPost");
const authMiddleware = require("../../middlewars/auth/authMiddleware");
const postValidationSchema = require("../../validation/postValidation");
const validator = require("../../middlewars/validation/validator");
const updatePost = require("../../controllers/post/updatePost");
const deletePost = require("../../controllers/post/deletePost");
const likePost = require("../../controllers/post/likePost");
const dislikePost = require("../../controllers/post/dislikePost");

postRouter.get("/", fetchAllPosts)
postRouter.post("/", authMiddleware, validator(postValidationSchema), createPost);
postRouter.put("/like", authMiddleware, likePost);
postRouter.put("/dislike", authMiddleware, dislikePost);
postRouter.get("/:id", fetchPost)
postRouter.put("/:id", authMiddleware, validator(postValidationSchema), updatePost);
postRouter.delete("/:id", authMiddleware, deletePost);

module.exports = postRouter;
