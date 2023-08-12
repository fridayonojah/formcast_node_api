const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const axios = require('axios')
const AdmZip = require('adm-zip')
const { mkdir } = require('fs/promises')
const { PDFNet } = require('@pdftron/pdfnet-node')
const DownloaderModel = require('../models/downloaderModel')
const mimeType = require('../module/mimeType')

class FileController {
  /**
   * Get client record base on params
   * @param {*} req
   * @param {*} res
   * @returns passes control to @excultePdfnetReplacer
   */
  getClientFiles = async (req, res) => {
    const clientUserId = req.params.user_id
    const clientDesignId = req.params.design_id

    const clientDesignIdExist = await DownloaderModel.findOne({
      design_id: clientDesignId,
    })
    if (!clientDesignIdExist) {
      return res.json({ status: 404, message: 'Resource Not Found!' })
    }

    const getClientResource = await DownloaderModel.getClientDetails(
      clientUserId,
      clientDesignId,
    )
    await FileController.excultePdfnetReplacer(getClientResource, res)
  }

  /**
   * Create a new client records
   * @require clientName, proposedResidentialLocation, user_id and design_id
   * @returns clent record as json object
   */
  createDetails = async (req, res) => {
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
    return await FileController.excultePdfnetReplacer(clientDetail, res)
  }

  /**
   * Takes record that is to be used for pdf editing
   * @param {*} clientDetail client record
   * @param {*} res
   * passes control to @PDFNetEndpoint for proper conversion
   * and rendering a force download on client browser
   */
  static async excultePdfnetReplacer(clientDetail, res) {
    clientDetail.map(async (data) => {
      const pathname = '../../public'

      const getRequestedFilepath = path.resolve(
        __dirname,
        `${pathname}/files/${data.file}`,
      )

      // Getting Archeive filename for proper path mapping
      const folderName = path.parse(getRequestedFilepath).name

      // Archeive Folder will be extracted into this extractArchivePathname
      const customFilename = `Formcast_House_Plan_${
        data.design_id
      }_[${crypto.randomBytes(3).toString('hex')}]`
      const extractArchivePathname = `${pathname}/static/${customFilename}`

      const extractFile = await FileController.extractArchive(
        getRequestedFilepath,
        extractArchivePathname,
      )

      // await FileController.runCAD2PDFExecultor(
      //   extractFile,
      //   extractArchivePathname,
      //   folderName,
      // )

      let saveFilePathname = ''
      const main = async () => {
        for (let filename = 0; filename < extractFile.length; filename++) {
          if (path.parse(extractFile[filename]).ext !== '.pdf') {
            continue
          } else {
            saveFilePathname = path.resolve(
              __dirname,
              `${extractArchivePathname}/${folderName}`,
              extractFile[filename],
            )

            const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(
              saveFilePathname,
            )
            await pdfdoc.initSecurityHandler()
            const replacer = await PDFNet.ContentReplacer.create()
            const page = await pdfdoc.getPage(1)

            await replacer.addString('CLIENT', `${data.client}`)
            await replacer.addString('PROJECT', `${data.project}`)
            await replacer.process(page)

            pdfdoc.save(
              saveFilePathname,
              PDFNet.SDFDoc.SaveOptions.e_linearized,
            )
          }
        }
      }
      FileController.PDFNetEndpoint(main, extractArchivePathname, res)
    })
  }

  /**
   * This method convert cad files to pdf example Rivt, dwg etc
   * @param {[namesOflistOfFilenamesTOConvert]} cadFiles
   */
  static async runCAD2PDFExecultor(
    listOfFilenames,
    customFilename,
    innerFoldername,
  ) {
    const IsRVTFile = function (inputFile) {
      let rvt_input = false
      if (inputFile.length > 2) {
        if (inputFile.substr(inputFile.length - 3, 3) === 'rvt') {
          rvt_input = true
        }
      }
      return rvt_input
    }

    const pathname = `${customFilename}/${innerFoldername}/cad_files`
    const main = async () => {
      try {
        // await PDFNet.addResourceSearchPath('../../lib/')
        if (!(await PDFNet.CADModule.isModuleAvailable())) {
          console.log('using the PDFNet.addResourceSearchPath() function.\n')
          return
        }

        for (let filename = 0; filename < listOfFilenames.length; filename++) {
          console.log({
            log: 'logging some cad files here',
            data: listOfFilenames[filename],
          })
          if (
            path.parse(listOfFilenames[filename]).ext !== '.rvt' ||
            path.parse(listOfFilenames[filename]).ext !== '.dwg'
          ) {
            continue
          }

          const inputFilePath = path.resolve(
            __dirname,
            pathname,
            listOfFilenames[filename],
          )

          const input_filename = listOfFilenames[filename]
          const out_filename =
            path.parse(listOfFilenames[filename]).name + '.pdf'

          const doc = await PDFNet.PDFDoc.create()
          doc.initSecurityHandler()

          if (IsRVTFile(input_filename)) {
            const opts = new PDFNet.Convert.CADConvertOptions()
            opts.setPageWidth(800)
            opts.setPageHeight(600)
            opts.setRasterDPI(150)
            await PDFNet.Convert.fromCAD(doc, inputFilePath, opts)
          } else {
            await PDFNet.Convert.fromCAD(doc, inputFilePath)
          }

          const outFilePath = path.resolve(__dirname, pathname, out_filename)
          await doc.save(outFilePath, PDFNet.SDFDoc.SaveOptions.e_linearized)
        }
      } catch (err) {
        console.log(err)
      }
    }

    PDFNet.runWithCleanup(main, process.env.PDFNET_KEY)
      .catch(function (error) {
        console.log('Error: ' + JSON.stringify(error))
      })
      .then(function () {
        return PDFNet.shutdown()
      })
  }

  /**
   * @params(fileUrl, storePath, filename)
   * This method takes the params above
   * create a storePath if not exist
   * get requested zipfile from source url as a buffer and store it in local storePath
   */
  fileFromSourceHost = async (fileUrl, storePath, filename) => {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' })
    fs.watchFile(path.join(storePath, filename), response.data, (err) => {
      if (err) {
        res.json({
          status: 500,
          message: `Something went wrong from our end ${err.message}`,
        })
      }
      console.log('donwload successfully')
    })
    return await this.readZipArchive(storeFiles)
  }

  /**
   * This method takes an archive, returns an array names of
   * all files and dir in the archive
   * @param {Zipfile} archiveFilename
   * @returns [] filenames and dirnames
   */
  static async readZipArchive(archiveFilename) {
    try {
      const zip = new AdmZip(archiveFilename)
      let storeFilenames = []
      for (const zipEntry of zip.getEntries()) {
        storeFilenames.push(zipEntry.name)
      }
      // console.log(storeFilenames)
      return storeFilenames
    } catch (e) {
      console.log(`Reading Archive went wrong. ${e}`)
    }
  }

  /**
   * Here this function takes path where an archive live, extract all content inside
   * into a new diename
   * @param {*} ArchivePathname Path where archive file is located
   * @param {*} storeExtractDirName dirname where extracted archive file will be store
   * @returns create custom name for extracted files and passes control to the readArchive method
   */
  static async extractArchive(ArchivePathname, storeExtractDirName = '') {
    try {
      const zip = new AdmZip(ArchivePathname)

      const storeExtractFiles = path.resolve(__dirname, storeExtractDirName)

      if (fs.existsSync(storeExtractFiles) === false) {
        await mkdir(storeExtractFiles)
        zip.extractAllTo(storeExtractFiles)
      } else {
        zip.extractAllTo(storeExtractFiles)
      }
      console.log(`Extracted to "${storeExtractFiles}" successfully`)

      // call file reader handler
      return await FileController.readZipArchive(ArchivePathname)
    } catch (e) {
      console.log(`Extracting Archive went wrong. ${e}`)
    }
  }

  /**
   * This method proccess pdf text manipulation and enable force download
   * of client request file.
   * @param {*} main cb for pdf_text_editing
   * @param {*} pathname file to be download by client
   * @param {*} res force download of requested file
   */
  static PDFNetEndpoint(main, pathname, res) {
    PDFNet.runWithCleanup(main, process.env.PDFNET_KEY)
      .then(() => {
        PDFNet.shutdown()

        const filePath = path.resolve(__dirname, pathname)
        const outputFile = path.resolve(
          __dirname,
          `../../public/files/${path.parse(pathname).name}.zip`,
        )

        const zip = new AdmZip()
        zip.addLocalFolder(filePath)
        zip.writeZip(outputFile)
        console.log(`Created ${outputFile} successfully`)

        const filename = outputFile.split('/').pop()

        res.download(outputFile, filename, function (err) {
          if (err) {
            console.log(err)
          } else {
            console.log('Delete:', filePath)
            // fs.rmdir(filePath, { recursive: true })
          }
        })
      })
      .catch((error) => {
        res.statusCode = 500
        res.end(error)
      })
  }
}

module.exports = new FileController()
