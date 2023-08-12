const express = require('express')
const fileController = require('../controllers/fileController')
const asyncMiddleware = require('../middleware/asyncHandler.middlware')

const router = express.Router()

router.post('/', asyncMiddleware(fileController.createDetails))
router.get(
  '/:user_id/:design_id',
  asyncMiddleware(fileController.getClientFiles),
)

module.exports = router
