const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  firstName: {
    required: [true, 'You should provide a first name'],
    type: String,
    default: null,
    trim: true
  },
  lastName: {
    required: [true, 'You should provide a last name'],
    type: String,
    default: null,
    trim: true
  },
  email: {
    required: [true, 'You should provide an email'],
    type: String,
    validate: (value) => {
      const validEmail = validator.isEmail(value)
      if (!validEmail) {
        throw new Error('The email provided is not valid.')
      }
    }
  },
  password: {
    required: [true, 'You should provide a password'],
    type: String,
    trim: true,
    minlength: [6, 'The password must contain at least 6 characters'],
    validate: (value) => {
      const valueIncludesPassword = value.toLowerCase().includes('password')
      const valueIsAlphanumeric = validator.isAlphanumeric(value)

      if (valueIncludesPassword) {
        throw new Error('The password must not contain the word "password".')
      } else if (!valueIsAlphanumeric) {
        throw Error('The password must only contain letters and numbers.')
      }
    }
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  const user = this

  console.log('just before saving')

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = model('users', userSchema)

module.exports = User