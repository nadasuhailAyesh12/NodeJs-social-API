const fs = require('fs');

const expressAsyncHandler = require("express-async-handler");

const Post = require("../models/Post");
const { validateID } = require("../utils/Auth");
const PostService = require('../services/PostService');
const { Console } = require('console');

const createPost = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.user
        const { title, description, category } = req.body
        const localPath = `public/images/post/${req.file.filename}`

        const post = await PostService.createPost({
            title, description, category
        }, id, localPath)

        res.status(201).json({
            message: "success",
            post
        })
    }

    catch (error) {
        res.json({
            message: error.message,
        });
    }
});

const fetchAllPosts = expressAsyncHandler(
    async (req, res) => {
        try {
            const posts = await PostService.getPosts()

            res.json({
                message: "sucess",
                posts
            });
        }

        catch (err) {
            res.json({
                message: err.message
            });
        }

    })

const fetchCustomPost = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const post = await (await (await (await PostService.getPost(id)).populate("user")).populate("likes")).populate("dislikes")
        res.status(200).json({ message: "success", post });
    }

    catch (err) {
        res.json({ message: err.message });
    }
});

const updatePost = expressAsyncHandler(async (req, res) => {

    try {
        const { id } = req.params;
        const { title, description, category, image } = req.body
        const isExistPost = await PostService.checkIfPost(id)
        const postOwnerID = isExistPost.user
        const loginUserID = req?.user?.id
        await PostService.checkIfPostOwner(postOwnerID, loginUserID)

        const post = await PostService.updatePost(
            id,
            {
                title,
                description,
                category,
                image
            })
        res.status(200).json({ message: "success", post });
    }

    catch (err) {
        res.json({ message: err.message });

    }
});

const deletePost = expressAsyncHandler(
    async (req, res) => {
        try {
            const { id } = req.params
            const isExistPost = await PostService.checkIfPost(id)
            const postOwnerID = isExistPost.user
            const loginUserID = req?.user?.id
            await PostService.checkIfPostOwner(postOwnerID, loginUserID)

            await PostService.deletePost(postOwnerID, id)
            res.sendStatus(204)
        }

        catch (err) {
            res.json({ message: err.message })
        }
    })

const likePost = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        const userID = req.user.id;
        const post = await PostService.checkIfPost(id)
        const dislikes = post?.dislikes
        const isLiked = post?.isLiked
        const likedPost = await PostService.likePost(id, dislikes, isLiked, userID)

        res.status(200).json({ message: "success", post: likedPost });
    }

    catch (err) {
        res.json({ message: err.message });
    }
});

const dislikePost = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        const userID = req.user.id;
        const post = await PostService.checkIfPost(id)
        const likes = post?.likes
        const isDisLiked = post?.isDisliked
        const dislikedPost = await PostService.dislikePost(id, likes, isDisLiked, userID)

        res.status(200).json({ message: "success", post: dislikedPost });
    }

    catch (err) {
        res.json({ message: err.message });
    }
});


const postController = { createPost, fetchCustomPost, fetchAllPosts, updatePost, deletePost, likePost, dislikePost }
module.exports = postController





