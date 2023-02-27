const fs = require('fs');

const expressAsyncHandler = require("express-async-handler");

const Post = require("../models/Post");
const { validateID } = require("../utils/Auth");
const PostService = require('../services/PostService');

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
        console.log(error)
    }
});

const fetchAllPosts = expressAsyncHandler(
    async (req, res) => {
        try {
            const posts = await Post.find({}).populate('user');

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
    const { id } = req.params;
    try {
        validateID(id);
        const isExistPost = await Post.findById(id)

        if (!isExistPost) {
            throw new Error("post not found")
        }

        const post = await Post.findById(id).populate("user").populate("dislikes").populate("likes");
        await Post.findByIdAndUpdate(
            id,
            {
                $inc: { numOfViews: 1 },
            },
            { new: true }
        );

        res.status(200).json({ message: "success", post });
    }

    catch (err) {
        res.json({ message: err.message });
    }
});

const updatePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        validateID(id);
        const isExistPost = await Post.findById(id)

        if (!isExistPost) {
            throw new Error("post not found")
        }

        const post = await Post.findByIdAndUpdate(
            id,
            {
                ...req.body,
                user: req.user
            },
            { new: true }
        );

        res.status(200).json({ message: "success", post });
    }

    catch (err) {
        res.json({ message: err.message });
    }
});

const deletePost = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        try {
            validateID(id)
            const isExistPost = await Post.findById(id)

            if (!isExistPost) {
                throw new Error("post not found")
            }

            await Post.findByIdAndDelete(id)
            res.status(204).json({ message: "success" })
        }

        catch (err) {
            res.json({ message: err.message })
        }
    })

const likePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const userId = req.user.id;

    try {
        let post = await Post.findById(id)
        const alreadyDisliked = post?.dislikes?.includes(userId)
        const isLiked = post?.isLiked

        if (alreadyDisliked) {
            post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { dislikes: userId },
                    isDisliked: false,


                },

                { new: true }
            );
        }

        if (isLiked) {
            post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: userId },
                    isLiked: false
                },
                { new: true }
            );
        }

        else {
            post = await Post.findByIdAndUpdate(
                id,
                {
                    $push: { likes: userId },
                    isLiked: true
                },
                { new: true }
            );
        }

        res.status(200).json({ message: "success", post });
    }

    catch (err) {
        res.json({ message: err.message });
    }
});

const dislikePost = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const userId = req.user.id;

    try {
        let post = await Post.findById(id)
        const isDisliked = post?.isDisliked
        const alreadyLiked = post?.likes?.includes(userId)

        if (alreadyLiked) {
            post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: userId },
                    isLiked: false

                },
                { new: true }
            );
        }

        if (isDisliked) {
            post = await Post.findByIdAndUpdate(
                id,
                {
                    $pull: { dislikes: userId },
                    isDisliked: false
                },
                { new: true }
            );
        }

        else {
            post = await Post.findByIdAndUpdate(
                id,
                {
                    $push: { dislikes: userId },
                    isDisliked: true
                },
                { new: true }
            );
        }
        res.status(200).json({ message: "success", post });
    }

    catch (err) {
        res.json({ message: err.message });
    }
});

const postController = { createPost, fetchCustomPost, fetchAllPosts, updatePost, deletePost, likePost, dislikePost }
module.exports = postController





