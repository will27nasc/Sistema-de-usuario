const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },

    filename: (req, file, cb) => {
        let fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname
        cb(null, file.fieldname + "-" + fileName);
    }
});

const uploadFile = multer({ storage });

module.exports = uploadFile;