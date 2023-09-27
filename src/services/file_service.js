const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { mkdir, rm } = require('fs/promises')
const AdmZip = require('adm-zip')
const { PDFNet } = require('@pdftron/pdfnet-node')
const createError = require('http-errors')
const DownloaderModel = require('../models/downloaderModel')

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

      // zip file will be extracted into custom dirname this custom dir will be created inside the downloads dir
      const customFilename = `Formcast_House_Plan_${
        data.design_id
      }_[${crypto.randomBytes(3).toString('hex')}]`

      // Requested design zip file will be extracted into the custom filename dir inside downloads
      const pathToRequestedExtractZip = `${pathname}/downloads/${customFilename}`

      // Here we are ouputing all the filenames inside pathToRequestedExtractZip
      const getAllFilenameInDir = await FileService.extractArchive(
        res,
        getRequestedFilepath,
        pathToRequestedExtractZip,
      )

      let saveFilePathname = ''
      const main = async () => {
        for (
          let filename = 0;
          filename < getAllFilenameInDir.length;
          filename++
        ) {
          if (path.parse(getAllFilenameInDir[filename]).ext !== '.pdf') {
            continue
          } else {
            saveFilePathname = path.resolve(
              __dirname,
              `${pathToRequestedExtractZip}/formcast/pdfs/`,
              getAllFilenameInDir[filename],
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

      const file_payload = {
        pdfFun: main,
        pathToextractZip: pathToRequestedExtractZip,
        order_code: data.order_code,
        filenames: getAllFilenameInDir,
        customZipname: customFilename,
      }

      await FileService.PDFNetEndpoint(file_payload, res)
    })
  }

  /**
   * This method convert cad files to pdf example Rivt, dwg etc
   * @param {[namesOflistOfFilenamesTOConvert]} cadFiles
   */
  static async runCAD2PDFExecultor(
    listOfFilenames,
    customFilename,
    subdirname = 'formcast',
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

    const cadFilespathname = `${customFilename}/${subdirname}/cad_files`
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
            cadFilespathname,
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

          const outFilePath = path.resolve(
            __dirname,
            cadFilespathname,
            out_filename,
          )
          await doc.save(outFilePath, PDFNet.SDFDoc.SaveOptions.e_linearized)
        }
      } catch (err) {
        throw createError.InternalServerError('Error converting cad files')
      }
    }

    // PDFNet.runWithCleanup(main, process.env.PDFNET_KEY)
    PDFNet.runWithCleanup(main, process.env.PDFNET_KEY)
      .catch(function (error) {
        console.log('Error: ' + JSON.stringify(error))
      })
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
  static async PDFNetEndpoint(file_process_payload, res) {
    try {
      // This exculte cad files conversion
      // await this.runCAD2PDFExecultor(
      //   file_process_payload['filenames'],
      //   file_process_payload['customZipname'],
      // )

      // This is execute pdf conversions
      await PDFNet.runWithCleanup(
        file_process_payload['pdfFun'],
        process.env.PDFNET_KEY,
      )
      await PDFNet.shutdown()

      const filePath = path.resolve(
        __dirname,
        file_process_payload['pathToextractZip'],
      )
      const outputFile = path.resolve(
        __dirname,
        `../../public/downloads/${
          path.parse(file_process_payload['pathToextractZip']).name
        }.zip`,
      )

      const zip = new AdmZip()
      zip.addLocalFolder(filePath)
      zip.writeZip(outputFile)

      if (fs.existsSync(outputFile)) {
        await rm(filePath, { recursive: true }) // delete folder from playground folder [download]

        // store downloader record in db for admin management
        const store_downloader_info = await DownloaderModel.downloadedItems({
          order_code: file_process_payload['order_code'],
          file_process_name: `${path.parse(outputFile).name}.zip`,
        })

        if (store_downloader_info) {
          return res.json({
            status: true,
            message: `Paid Designs are ready for Download!`,
          })
        }
      }
    } catch (error) {
      res.json({
        status: false,
        message:
          'An error occured. Please contact our admin if you can not download Paid Design',
      })
      throw error.message
    }
  }
}

module.exports = FileService
