const fs = require('fs');

const expressAsyncHandler = require('express-async-handler');

const User = require('../../models/user/User');
const cloudinaryUploadImg = require('../../utils/cloudinary');

const uploadProfilePhoto = expressAsyncHandler(
    async (req, res) => {
        try {
            const localPath = `public/images/profile/${req.file.filename}`
            const image = await cloudinaryUploadImg(localPath)
            const { id } = req.user
            const isExistuser = await User.findById(id)

            if (!isExistuser) {
                throw new Error("user not found")
            }

            else {
                const user = await User.findByIdAndUpdate(
                    id,
                    {
                        profilePhoto: image?.url
                    },
                    {
                        new: true,
                    })
                fs.unlinkSync(localPath)
                res.status(200).json({ message: "sucess", user });
            }

        }

        catch (err) {
            res.json({ message: err.message });
        }
    })

module.exports = uploadProfilePhoto;
