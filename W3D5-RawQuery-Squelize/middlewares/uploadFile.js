const multer = require('multer')

// preparation
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/uploads")
  },
  filename: (req, file, cb) => {
    cb(null,
     Date.now() + "-" + file.originalname)
  }
})

const upload = multer({
  storage: fileStorage
})

module.exports = upload