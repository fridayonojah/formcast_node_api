module.exports = async(res, status, message,) => {
    
  return res.json({
    status: status,
    message: message,
    file: outputFile,
  })
}
