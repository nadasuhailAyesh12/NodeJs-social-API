const postRouter = require("express").Router();

const authMiddleware = require("../middlewars/authMiddleware");
const postValidationSchema = require("../validation/postValidation");
const validator = require("../middlewars/validator");
const { photoUpload, postPhotoResize } = require("../middlewars/photoUpload");
const postController = require("../controllers/PostController")

postRouter.get("/", postController.fetchAllPosts)
postRouter.post("/", authMiddleware, validator(postValidationSchema), photoUpload.single("image"), postPhotoResize, postController.createPost);
postRouter.put("/like", authMiddleware, postController.likePost);
postRouter.put("/dislike", authMiddleware, postController.dislikePost);
postRouter.get("/:id", postController.fetchCustomPost)
postRouter.put("/:id", authMiddleware, validator(postValidationSchema), postController.updatePost);
postRouter.delete("/:id", authMiddleware, postController.deletePost);

module.exports = postRouter;
