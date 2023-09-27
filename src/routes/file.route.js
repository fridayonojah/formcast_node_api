const express = require('express')
const fileController = require('../controllers/fileController')
const asyncMiddleware = require('../middleware/asyncHandler.middlware')
const upload = require('../middleware/multer.middleware')
const check = require('../middleware/check.middleware')

const router = express.Router()

router.all('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Formcast API v1.0',
  })
})

router.get(
  '/:order_code',
  [check.orderCodeExist],
  asyncMiddleware(fileController.getClientFiles),
)

router.get(
  '/download_design/:order_code',
  [check.orderCodeExist],
  asyncMiddleware(fileController.downloadDesign),
)

router.post(
  '/store',
  [upload],
  asyncMiddleware(fileController.uploadDownloadableFiles),
)

router.post(
  '/client',

  asyncMiddleware(fileController.createDetails),
)
module.exports = router
