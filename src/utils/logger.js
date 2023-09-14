const winston = require('winston')

module.exports = function () {
  winston.add(
    new winston.transports.File({
      filename: 'uncaughtExceptions.log',
      handleExceptions: true,
    }),
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
  )

  //Terminate the process pipeline on an error
  process.on('unhandledRejection', (ex) => {
    throw ex
  })

  winston.add(new winston.transports.File({ filename: 'logfile.log' }))
}