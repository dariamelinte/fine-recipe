const fileFilter = (req, file, cb) => {
  const fileIsPhoto = file.originalname.match(/\.(jpg|jpeg|png)$/i)

  if (!fileIsPhoto) {
    return cb(new Error('File must be of time JPG, JPEG or PNG'))
  }

  cb(undefined, true)
}

module.exports = fileFilter
