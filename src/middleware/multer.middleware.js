const crypto = require('crypto')
const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads/')
  },
  filename: (req, file, callback) => {
    // const name = file.originalname.split(' ').join('_')
    const filename = `formcast_house_plan_${Math.random()
      .toString()
      .substring(2, 7)}.zip`
    callback(null, filename)
  },
})

module.exports = multer({ storage: storage }).single('file')
