const createError = require('http-errors')
const DownloaderModel = require('../models/downloaderModel')

module.exports = {
  async orderCodeExist(req, res, next) {
    const order_code = req.params.order_code
    const checkOrderCode = await DownloaderModel.findOne(
      { order_code: order_code },
      'orders',
    )

    if (!checkOrderCode) {
      return next(
        createError.NotFound('Resource with order code can not be processed!'),
      )
    }
    next()
  },
}
