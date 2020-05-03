
const schemaErrorHandler = (error) => {
  console.log(error)

  if (error && error.name === 'ValidationError') {
    return error.errors
  }
}

module.exports = schemaErrorHandler
