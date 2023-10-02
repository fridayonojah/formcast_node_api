const path = require('path')
const DownloaderModel = require('../models/downloaderModel')
const FileService = require('../services/file_service')

class FileController {
  /**
   * Get client record base on params
   * @param {*} req
   * @param {*} res
   * @returns passes control to @excultePdfnetReplacer
   */
  static async getClientFiles(req, res, next) {
    const getClientResource = await DownloaderModel.getClientDetails(
      req.params.order_code,
    )

    if (getClientResource.length === 0)
      return res.json({
        status: false,
        message:
          'Resource cound not be proccessed now. Please try again later!',
      })
    await FileService.excultePdfnetReplacer(getClientResource, res)
  }

  /**
   * Create a new client records
   * @require clientName, proposedResidentialLocation, user_id and design_id
   * @returns clent record as json object
   */
  static async createDetails(req, res) {
    const downloader_credentials = req.body

    const insert_credentials = await DownloaderModel.create(
      downloader_credentials,
    )
    if (!insert_credentials) {
      res.json({
        status: 500,
        type: 'Error',
        message: `Sorry something went wrong couldn't insert datas!`,
      })
    }

    const clientDetail = await DownloaderModel.getClientDetails(
      downloader_credentials.user_id,
      downloader_credentials.design_id,
    )
    return await FileService.excultePdfnetReplacer(clientDetail, res)
  }

  static async uploadDownloadableFiles(req, res, next) {
    const formData = req.body
    console.log(formData)

    formData.file = req.file.filename
    const store_files = await DownloaderModel.store_files(formData)

    if (store_files) {
      return res.json({
        status: true,
        message: 'Data Uploaded Successfully!',
      })
    }
    return res.json({
      status: false,
      message: 'Error occured while trying to upload datas',
    })
  }

  static async downloadDesign(req, res, next) {
    const order_code = req.params.order_code

    // get file from download tb based on order_code
    const getFromDb = await DownloaderModel.findOne(
      { order_code: order_code },
      'downloads',
    )

    const getRequestDesign = path.resolve(
      __dirname,
      `../../public/downloads/${getFromDb.file_process_name}`,
    )

    res.download(getRequestDesign)
  }
}

module.exports = FileController
