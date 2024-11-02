const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure that the temp directory exists
const tempDir = path.join(__dirname, "../temp");
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir); // Set destination to temp directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-name-${file.originalname}`;
        cb(null, uniqueSuffix);
    }
});

// Configure multer with storage and limits options
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 15 // Limit file size to 5 MB
    },
});

module.exports = upload;
