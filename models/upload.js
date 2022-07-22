const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./img");
    },
    filename: (req, file, cb) => {
        const data = new Date().toISOString().replace(/:/g,'-') + '-';
        cb(null, data + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/png"){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
 });


module.exports = upload;
