const createError = require('http-errors')
const DownloaderModel = require('../models/downloaderModel')

module.exports = {
  async designExist(req, res, next) {
    const { design_id } = req.body
    console.log(design_id)

    // check if design id exist
    const checkDesignId = await DownloaderModel.findOne(
      { design_id: design_id },
      'buildings',
    )

    if (!checkDesignId) {
      return next(
        createError.NotFound('Design Id is not associated to any design!'),
      )
    }
    next()
  },
}
