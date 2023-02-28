const fs = require('fs')

const expressAsyncHandler = require("express-async-handler");

const UserService = require("../services/userService");

const fetchAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await UserService.getUsers();
    res.status(200).json({ message: "success", users });
});

const fetchcustomUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    res.status(200).json({ message: "success", user });
});

const fetchUserProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const userProfile = await (await UserService.getUser(id)).populate("posts");
    res.status(200).json({ message: "success", userProfile });
});

const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, bio, profilePhoto } = req?.body;

    const user = await UserService.updateUserProfile(id, {
        firstName,
        lastName,
        email,
        bio,
        profilePhoto,
    });
    res.status(200).json({ message: "sucess", user });
});

const updateUserPassword = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const newPassword = req?.body?.password;
    let user = await UserService.getUser(id);
    const userPassowrd = user.password;
    user = await UserService.updatePassword(id, newPassword, userPassowrd);
    res.status(200).json({ message: "sucess", user });
});

const deleteUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.sendStatus(204);
});

const followUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const { followedUser, loginUser } = await UserService.followUser(
        req?.user?.id,
        id
    );
    res.status(200).json({ message: "sucess", loginUser, followedUser });
});

const unfollowUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    const { unfollowedUser, loginUser } = await UserService.unfollowUser(
        req?.user?.id,
        id
    );
    res.status(200).json({ message: "sucess", loginUser, unfollowedUser });
});

const blockUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await UserService.blockUser(id);
    res.status(200).json({ message: "sucess", user });
});

const unblockUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await UserService.unblockUser(id);
    res.status(200).json({ message: "sucess", user });
});

const uploadProfilePhoto = expressAsyncHandler(async (req, res) => {
    const { id } = req?.user;
    if (!req.file) {
        const error = new Error(
            "you don’t upload a profile photo yet ,please upload one"
        );
        error.status = 400
        throw error;
    }

    const localPath = `public/images/profile/${req?.file?.filename}`;
    const user = await UserService.uploadProfilePhoto(id, localPath);
    fs.unlinkSync(localPath)
    res.status(200).json({ message: "sucess", user });
});

// const sendEmail = expressAsyncHandler(async (req, res) => {
//     try {
//         // let user = req.user
//         // const token = await generateToken(user.id)
//         // user = await User.findByIdAndUpdate(
//         //     user.id,
//         //     {
//         //         accountVerificationToken: token,

//         //     },
//         //     {
//         //         new: true,
//         //     })

//         const mailTransporter = nodemailer.createTransport({
//             service: "gmail",
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user,
//                 pass
//             }
//         })
//         const msg = {
//             to: "nadaayesh10@gmail.com",
//             from: user,
//             subject: "test nodemailer",
//             text: "Hey check me out for this email",
//         };

//         await mailTransporter.sendMail(msg);
//         res.json("emai sent");
//     } catch (error) {
//         console.log(error)
//     }
// });

const userController = {
    fetchAllUsers,
    fetchcustomUser,
    fetchUserProfile,
    updateUserProfile,
    updateUserPassword,
    deleteUser,
    followUser,
    unfollowUser,
    blockUser,
    unblockUser,
    uploadProfilePhoto
};
module.exports = userController;
