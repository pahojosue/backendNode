import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/upload');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.slice(file.originalname.lastIndexOf("."));
        const fileFinalName = file.fieldname + '-' + uniqueSuffix + fileExtension;
        cb(null, fileFinalName);
    },
});
const multerUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)){
            cb(new Error("Only images must be sent"));
        }
        else {
            cb(null, true);
        }
    }
});

export default multerUpload;