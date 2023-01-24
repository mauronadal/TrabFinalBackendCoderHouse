import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(process.cwd(), '/src/public/img'));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
