const commentRoute = require("express").Router();

const CommentController = require('../controllers/CommentController');
const authMiddleware = require("../middlewars/authMiddleware");
const validator = require("../middlewars/validator")
const commentValidationSchema = require("../validation/CommentValidation");

commentRoute.post("/", authMiddleware, validator(commentValidationSchema), CommentController.createComment);
commentRoute.get("/", authMiddleware, CommentController.fetchAllComments)
commentRoute.get("/:id", authMiddleware, CommentController.fetchComment)

module.exports = commentRoute;
