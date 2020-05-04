const url = require('url')

const urlStringParserMiddleware = async (req, res, next) => {

  const queryObject = url.parse(req.url,true).query;

  req.parsedUrl = queryObject

  next()
}

module.exports = urlStringParserMiddleware
