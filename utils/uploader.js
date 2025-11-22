// path
const path = require("path");
// multer
const multer = require("multer");
// crypto for generate hash
const crypto = require("crypto");

// exports
module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "courses", "covers"))
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + String(Math.random() * 999);
        // const hashedFileName = crypto
        //     .createHash()
        //     .update(file.originalname)
        //     .digest("hex");
        const ext = path.extname(file.originalname);
        cb(null, fileName + ext)
    }
});
