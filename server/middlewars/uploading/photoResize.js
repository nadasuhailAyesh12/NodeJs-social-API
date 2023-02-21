const path = require("path");

const sharp = require("sharp");

const profilePhotoResize = async (req, res, next) => {
    if (!req.file) next();
    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer)
        .resize(250, 250)
        .toFormat("jpeg")
        .jpeg({
            quality: 90,
        })
        .toFile(path.join(`public/images/profile/${req.file.filename}`));
    next();
};

const postPhotoResize = async (req, res, next) => {
    if (!req.file) next();
    req.file.filename = `post-${Date.now()}-${req.file.originalname}`;
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({
            quality: 90,
        })
        .toFile(path.join(`public/images/post/${req.file.filename}`));
    next();
};

module.exports = { postPhotoResize, profilePhotoResize }
