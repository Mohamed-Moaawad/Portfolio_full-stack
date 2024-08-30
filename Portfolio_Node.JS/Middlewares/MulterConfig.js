const multer = require('multer');
const path = require('path');
const fs = require('fs');

const BaseUploadFilePath = path.join(__dirname, '../Controllers/uploads');


if (!fs.existsSync(BaseUploadFilePath)) {
  fs.mkdirSync(BaseUploadFilePath, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pageName = req.params.pageName;
    const uploadDir = path.join(BaseUploadFilePath, pageName);

    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const uploadHandler = multer({ storage });

module.exports = uploadHandler;
