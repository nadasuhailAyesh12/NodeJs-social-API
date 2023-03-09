const CommentRepository = require("../repositories/CommentRepository");
const AuthUtil = require("../utils/Auth");

const fetchAllComments = async () => {
    const comments = await CommentRepository.getAllComments()
    return comments;
}

const createComment = async ({
    description,
    post
}, userID) => {
    AuthUtil.validateID(post)
    const comment = await CommentRepository.createComment({ description, post, user: userID })
    return comment;
}

const fetchComment = async (id) => {
    AuthUtil.validateID(id)
    const comment = await CommentRepository.getComment(id)
    if (!comment) {
        const error = new Error("comment not found ");
        error.status = 400;
        throw error
    }
    return comment
}

const CommentService = { fetchAllComments, createComment, fetchComment }
module.exports = CommentService