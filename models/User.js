const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

      if (valueIncludesPassword) {
        throw new Error('The password must not contain the word "password".')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  favoriteIds: [String],
  skills: {
    type: String,
    required: [true, 'Every user should have a skill status: No skills / Amateur / Chef'],
    default: 'Amateur',
    trim: true,
    validate: (value) => {
      const notValid = !(value === 'No skills' || value === 'Amateur' || value === 'Chef')

      if (notValid) {
        throw Error("The skill status should be one of No skills / Amateur / Chef")
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

userSchema.methods.generateAuthToken = async function () {
  const user = this

  const token = jwt.sign({ id: user._id.toString() }, process.env.TOKEN)

  user.tokens = [...user.tokens, { token }]
  await user.save()
  
  return token
}

const User = model('users', userSchema)

module.exports = User
