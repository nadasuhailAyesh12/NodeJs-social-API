const expressAsyncHandler = require("express-async-handler")

const CommentService = require("../services/CommentService")

const createComment = expressAsyncHandler(
    async (req, res) => {
        const { description, post } = req.body
        const userID = req.user.id
        const comment = await CommentService.createComment({
            description,
            post
        }, userID)
        res.status(200).json({
            message: "success",
            comment
        })
    }
)

const fetchAllComments =
    expressAsyncHandler(
        async (req, res) => {
            const comments = await CommentService.fetchAllComments();
            res.status(200).json({
                message: "success",
                comments
            })
        })

const fetchComment = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params
        const comment = await CommentService.fetchComment(id)
        res.json({
            message: "sucess",
            comment
        })
    })

const CommentController = { createComment, fetchAllComments, fetchComment }
module.exports = CommentController;




