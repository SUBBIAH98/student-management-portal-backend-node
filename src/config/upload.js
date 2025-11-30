// const multer = require('multer');
// const storage = multer.memoryStorage(); // for storing in DB
// const upload = multer({ storage });

// module.exports = upload;

// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/'); // folder must exist
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage });

// // route
// router.put('/:id', upload.single('avatar'), studentController.updateStudent);


const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads/students');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only JPEG and PNG images are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

// ✅ Optional middleware wrapper (doesn’t throw error if no file)
const optionalUpload = (fieldName) => {
    return (req, res, next) => {
        const handler = upload.single(fieldName);
        handler(req, res, (err) => {
            if (err && err.code !== 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({ message: err.message });
            }
            next(); // continue even if no file uploaded
        });
    };
};

module.exports = { upload, optionalUpload };
