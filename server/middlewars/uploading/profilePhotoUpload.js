const multer = require("multer");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(
            {
                message: "unsupported  file format",
            },
            false
        );
    }
};
const profilePhotoUpload = multer({ storage: multerStorage, fileFilter: multerFilter, limits: { fileSize: 1000000 } });

module.exports = { profilePhotoUpload }
