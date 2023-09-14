const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { mkdir, rm } = require('fs/promises')
const AdmZip = require('adm-zip')
const { PDFNet } = require('@pdftron/pdfnet-node')
const createError = require('http-errors')
const DownloaderModel = require('../models/downloaderModel')
const response = require('../utils/response')

class FileService {
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
        `${pathname}/uploads/${data.file}`,
      )

      // Archeive Folder will be extracted into this extractArchivePathname
      const customFilename = `Formcast_House_Plan_${
        data.design_id
      }_[${crypto.randomBytes(3).toString('hex')}]`

      // Note: archive is extracted into this dir
      const extractArchivePathname = `${pathname}/downloads/${customFilename}`

      const extractFile = await FileService.extractArchive(
        res,
        getRequestedFilepath,
        extractArchivePathname,
      )

      const downloaderContext = {
        client: `${data.client}`,
        project: `${data.project}`,
        user_id: `${data.user_id}`,
        design_id: `${data.design_id}`,
      }

      let saveFilePathname = ''
      const main = async () => {
        for (let filename = 0; filename < extractFile.length; filename++) {
          if (path.parse(extractFile[filename]).ext !== '.pdf') {
            continue
          } else {
            saveFilePathname = path.resolve(
              __dirname,
              `${extractArchivePathname}/formcast/pdfs/`,
              extractFile[filename],
            )

            const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(
              saveFilePathname,
            )
            await pdfdoc.initSecurityHandler()
            const replacer = await PDFNet.ContentReplacer.create()
            const page = await pdfdoc.getPage(1)

            await replacer.addString('CLIENT', downloaderContext['client'])
            await replacer.addString('PROJECT', downloaderContext['project'])
            await replacer.process(page)

            pdfdoc.save(
              saveFilePathname,
              PDFNet.SDFDoc.SaveOptions.e_linearized,
            )
          }
        }
      }

      await FileService.PDFNetEndpoint(
        main,
        extractArchivePathname,
        downloaderContext,
        res,
      )
    })
  }

  /**
   * This method convert cad files to pdf example Rivt, dwg etc
   * @param {[namesOflistOfFilenamesTOConvert]} cadFiles
   */
  static async runCAD2PDFExecultor(
    listOfFilenames,
    customFilename,
    subpathname,
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

    const pathname = `${customFilename}/${subpathname}/cad_files`
    const main = async () => {
      try {
        await PDFNet.addResourceSearchPath(
          path.resolve(__dirname, '../../public/CADModuleWindows/Lib/'),
        )
        if (!(await PDFNet.CADModule.isModuleAvailable())) {
          return
        }

        for (let filename = 0; filename < listOfFilenames.length; filename++) {
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
        throw createError.InternalServerError('Error proessing cad files')
      }
    }

    PDFNet.runWithCleanup(main, process.env.PDFNET_KEY)
      .catch(function (error) {})
      .then(function () {
        return PDFNet.shutdown()
      })
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

      return storeFilenames
    } catch (e) {
      throw createError.InternalServerError(`Reading Archive went wrong. ${e}`)
    }
  }

  /**
   * Here this function takes path where an archive live, extract all content inside
   * into a new diename
   * @param {*} ArchivePathname Path where archive file is located
   * @param {*} storeExtractDirName dirname where extracted archive file will be store
   * @returns create custom name for extracted files and passes control to the readArchive method
   */
  static async extractArchive(res, archivepathname, storeExtractDirName = '') {
    try {
      const zip = new AdmZip(archivepathname)

      // zip file will be extracted into this dir name
      const storeExtractFiles = path.resolve(__dirname, storeExtractDirName)

      if (fs.existsSync(storeExtractFiles) === false) {
        await mkdir(storeExtractFiles)
        zip.extractAllTo(storeExtractFiles)
      } else {
        zip.extractAllTo(storeExtractFiles)
      }

      // call file reader handler
      return await FileService.readZipArchive(archivepathname)
    } catch (e) {
      res.json({
        status: false,
        message: 'Something went wrong. Download can not be process right now!',
      })
      throw createError.InternalServerError(
        `Error occured when trying to extract archive file. ${e}`,
      )
    }
  }

  /**
   * This method proccess pdf text manipulation and enable force download
   * of client request file.
   * @param {*} main cb for pdf_text_editing
   * @param {*} pathname file to be download by client
   * @param {*} res force download of requested file
   */
  static async PDFNetEndpoint(main, pathname, downloaderContext, res) {
    try {
      await PDFNet.runWithCleanup(main, process.env.PDFNET_KEY)
      await PDFNet.shutdown()

      const filePath = path.resolve(__dirname, pathname)
      const outputFile = path.resolve(
        __dirname,
        `../../public/downloads/${path.parse(pathname).name}.zip`,
      )

      const zip = new AdmZip()
      zip.addLocalFolder(filePath)
      zip.writeZip(outputFile)

      if (fs.existsSync(outputFile)) {
        // delete folder from playground folder [download]
        await rm(filePath, { recursive: true })

        // store downloader record in db for admin management
        downloaderContext.file_download_name = `${
          path.parse(outputFile).name
        }.zip`
        const store_downloader_info = await DownloaderModel.downloadedItems(
          downloaderContext,
        )

        if (store_downloader_info) {
          await DownloaderModel.delete(downloaderContext['user_id'])
          return res.json({
            status: true,
            message: 'Download is proccessing!',
            file: outputFile,
          })
        }
        throw createError.InternalServerError(
          'Connection failed to be reached!',
        )
      }
    } catch (error) {
      res.json({
        status: false,
        message: 'Some thing went wrong. please try again later',
      })
      throw createError.InternalServerError(
        `Something went wrong. please try again later ${error}`,
      )
    }
  }
}

module.exports = FileService
