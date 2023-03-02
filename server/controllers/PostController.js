const expressAsyncHandler = require("express-async-handler");

const PostService = require("../services/PostService");

const createPost = expressAsyncHandler(async (req, res) => {
    const { id } = req.user;
    const { title, description, category } = req.body;
    if (!req.file) {
        const error = new Error("you don’t upload a photo,please upload one");
        error.status = 400;
        throw error;
    }

    const localPath = `public/images/post/${req.file.filename}`;

    const post = await PostService.createPost(
        {
            title,
            description,
            category,
        },
        id,
        localPath
    );

    res.status(201).json({
        message: "success",
        post,
    });
});

const fetchAllPosts = expressAsyncHandler(async (req, res) => {
    const posts = await PostService.getPosts();
    res.json({
        message: "sucess",
        posts,
    });
});

const fetchCustomPost = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await (
        await (
            await (await PostService.getPost(id)).populate("user")
        ).populate("likes")
    ).populate("dislikes");
    res.status(200).json({ message: "success", post });
});

const updatePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, category, image } = req.body;
    const isExistPost = await PostService.checkIfPost(id);
    const postOwnerID = isExistPost.user;
    const loginUserID = req?.user?.id;
    await PostService.checkIfPostOwner(postOwnerID, loginUserID);
    const post = await PostService.updatePost(id, {
        title,
        description,
        category,
        image,
    });
    res.status(200).json({ message: "success", post });
});

const deletePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const isExistPost = await PostService.checkIfPost(id);
    const postOwnerID = isExistPost.user;
    const loginUserID = req?.user?.id;
    await PostService.checkIfPostOwner(postOwnerID, loginUserID);
    await PostService.deletePost(postOwnerID, id);
    res.sendStatus(204);
});

const likePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const userID = req.user.id;
    const post = await PostService.checkIfPost(id);
    const dislikes = post?.dislikes;
    const isLiked = post?.isLiked;
    const likedPost = await PostService.likePost(id, dislikes, isLiked, userID);
    res.status(200).json({ message: "success", post: likedPost });
});

const dislikePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const userID = req.user.id;
    const post = await PostService.checkIfPost(id);
    const likes = post?.likes;
    const isDisLiked = post?.isDisliked;
    const dislikedPost = await PostService.dislikePost(
        id,
        likes,
        isDisLiked,
        userID
    );
    res.status(200).json({ message: "success", post: dislikedPost });
});

const postController = {
    createPost,
    fetchCustomPost,
    fetchAllPosts,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
};
module.exports = postController;
