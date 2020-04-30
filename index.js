const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const config = require('./config')

require('./database/connect')

const { models : db } = require('./database')
const router = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.use((req, res, next) => {
  req.db = db
  next()
})

app.use('/', router)

app.listen(config.PORT, () => console.log(`App listening on ${config.PORT}`))