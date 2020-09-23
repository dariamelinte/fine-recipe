const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const config = require('./config')
require('./database/connect')
const models = require('./models')
const router = require('./routes')
const fileupload = require('express-fileupload')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(fileupload({
  useTempFiles: true
}))

app.use((req, res, next) => {
  req.db = models
  next()
})

app.use('/', router)

app.listen(config.PORT, () => console.log(`App listening on ${config.PORT}`))
