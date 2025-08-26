import multer from "multer";
import path from "path";

// Save files temporarily before uploading to Cloudinary
const storage = multer.diskStorage({
    destination: "/tmp",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

export default upload;
