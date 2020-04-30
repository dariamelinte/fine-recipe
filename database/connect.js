const mongoose = require('mongoose')
const config = require('../config')

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to database'))
  .catch((error) => console.log('Could not connect to database because of error ' + error))
