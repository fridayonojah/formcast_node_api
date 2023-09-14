require('dotenv').config()
const express = require('express')
const cors = require('cors')
const createError = require('http-errors')
const errorMiddleware = require('./middleware/error.middleware')
const fileRouter = require('./routes/file.route')
const { error } = require('winston')

const app = express()

require('./utils/logger')()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.SERVER_URL],
}
app.use(cors(corsOptions))

app.use(`/api/v1/file`, fileRouter)
app.use(async (req, res, next) => {
  next(createError.NotFound('Route not Found'))
})

app.use(errorMiddleware)

const port = Number(process.env.PORT || 4000)
app.listen(port, () => {
  console.log(`App is listen on port localhost:${port}`)
})

module.exports = app
