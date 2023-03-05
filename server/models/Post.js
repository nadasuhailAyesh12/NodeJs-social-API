const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: 'Untitled',
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Post description is required"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
        isDisliked: {
            type: Boolean,
            default: false,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        numOfViews: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            default:
                "https://media.istockphoto.com/id/1334575819/photo/cyber-security-internet-security-online-businessman-touching-fingerprint-identification-to.jpg?s=2048x2048&w=is&k=20&c=1Rf9qDZrC2UXJxZ_im14JWFtKAut2wQn_z0I-RPieTk=",
        },
        category: {
            type: String,
            required: [true, "Post category is required"],
            default: "All",
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
