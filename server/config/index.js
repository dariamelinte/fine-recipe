const dotenv = require('dotenv')
const { DEVELOPMENT } = require('../enums')

const ENV = process.env.NODE_ENV || DEVELOPMENT

const config = dotenv.config({
  path: `./config/${ENV}.env`
}).parsed

module.exports = config