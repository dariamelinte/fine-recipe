const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const config = require('./config')

const database = require('./database/connect')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))

// console.log(database)

app.use('/', (req, res) => {
  console.log('process env', process.env.NODE_ENV)
  res.write('Woohoo')
  res.end()
})

app.listen(config.PORT, () => console.log(`App listening on ${config.PORT}`))