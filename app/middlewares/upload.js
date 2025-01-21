const multer = require("multer");
const upload = multer({ dest: "./app/images" });

module.exports = upload;
