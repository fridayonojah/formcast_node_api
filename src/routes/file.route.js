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
  '/:user_id/:design_id',
  [check.designExist],
  asyncMiddleware(fileController.getClientFiles),
)

router.post(
  '/store',
  [upload, check.designExist],
  asyncMiddleware(fileController.uploadDownloadableFiles),
)

router.post(
  '/client',
  [check.designExist],
  asyncMiddleware(fileController.createDetails),
)
module.exports = router
