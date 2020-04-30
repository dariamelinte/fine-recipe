const dotenv = require('dotenv')
const { Enums } = require('../enums')

const ENV = process.env.NODE_ENV || Enums.DEVELOPMENT

const config = dotenv.config({
  path: `./config/${ENV}.env`
}).parsed

module.exports = config