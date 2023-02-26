const expressAsyncHandler = require("express-async-handler");

const UserService = require("../services/userService");

const fetchAllUsers = expressAsyncHandler(async (req, res) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json({ message: "success", users });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const fetchcustomUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserService.getUser(id);
        res.status(200).json({ message: "success", user });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const fetchUserProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const userProfile = await UserService.getUser(id);
        res.status(200).json({ message: "success", userProfile });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, bio, profilePhoto } = req?.body;
    try {
        if (
            req?.user?.firstName === firstName &&
            req?.user?.lastName === lastName &&
            req?.user?.email === email &&
            req?.user?.bio === bio &&
            req?.user?.profilePhoto === profilePhoto
        ) {
            throw new Error(
                "nothing changed please update one of the required fields"
            );
        }

        const user = await UserService.updateUserProfile(id, {
            firstName,
            lastName,
            email,
            bio,
            profilePhoto,
        });
        res.status(200).json({ message: "sucess", user });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const updateUserPassword = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const newPassword = req?.body?.password;
        let user = await UserService.getUser(id);
        const userPassowrd = user.password;
        user = await UserService.updatePassword(id, newPassword, userPassowrd);
        res.status(200).json({ message: "sucess", user });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await UserService.deleteUser(id);
        res.sendStatus(204);
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const followUser = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        const { followedUser, loginUser } = await UserService.followUser(
            req?.user?.id,
            id
        );
        res.status(200).json({ message: "sucess", loginUser, followedUser });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const unfollowUser = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        const { unfollowedUser, loginUser } = await UserService.unfollowUser(
            req?.user?.id,
            id
        );
        res.status(200).json({ message: "sucess", loginUser, unfollowedUser });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const blockUser = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.blockUser(id);
        res.status(200).json({ message: "sucess", user });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const unblockUser = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.unblockUser(id);
        res.status(200).json({ message: "sucess", user });
    }
    catch (err) {
        res.json({ message: err.message });
    }
});

const uploadProfilePhoto = expressAsyncHandler(async (req, res) => {
    try {
        const { id } = req?.user;
        if (!req.file) {
            throw new Error(
                "you don’t upload a profile photo yet ,please upload one"
            );
        }

        const localPath = `public/images/profile/${req?.file?.filename}`;
        const user = await UserService.uploadProfilePhoto(id, localPath);
        res.status(200).json({ message: "sucess", user });
    }
    catch (err) {
        res.json({ message: err.message });
    }
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
