const multer = require('multer')
const { promisify } = require('util')
const { GridFsStorage } = require('multer-gridfs-storage');

const MONGO_URL = 'mongodb://127.0.0.1:27017/';

// Create GridFs storage for multer middleware
const storage = new GridFsStorage({
  url: MONGO_URL + 'rom-car',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }


    return {
      bucketName: 'file',
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});

module.exports = multer({ storage });