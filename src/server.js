require('dotenv').config()
const express = require('express')
const cors = require('cors')
const HttpExecption = require('./utils/HttpExeception.utils')
const errorMiddleware = require('./middleware/error.middleware')
const fileRouter = require('./routes/file.route')

const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use(errorMiddleware)

app.use(`/api/v1/file`, fileRouter)
app.all('/', (req, res, next) => {
  const err = new HttpExecption(
    404,
    'Ooops it looks like you took a wrong turn!',
  )
  next(err)
  // res.send({data: "rre"})
})
const port = Number(process.env.PORT || 4000)
app.listen(port, () => {
  console.log(`App is listen on port localhost:${port}`)
})

module.exports = app
