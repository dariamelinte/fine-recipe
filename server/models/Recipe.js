const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'Every recipe should have a user Id'],
    default: null,
  },
  title: {
    type: String,
    required: [true, 'Every recipe should have a title'],
    default: null,
    trim: true
  },
  description: {
    type: String,
    default: null,
    trim: true,
  },
  ingredients: {
    type: [{
      name: {
        type: String,
        required: [true, 'Every ingredient should have a name'],
        default: null,
        trim: true,
      },
      quantity: {
        type: String,
        required: [true, 'Every ingredient should have a quantity'],
        default: null,
        trim: true,
      }
    }],
    default: undefined,
    required: [true, 'Every recipe should have ingredients'],
  },
  preparationSteps: {
    type: String,
    required: [true, 'Every recipe should have preparation steps'],
    default: null,
    trim: true
  },
  status: {
    type: String,
    required: [true, 'Every recipe should have a status: private / public'],
    default: 'public',
    trim: true,
    validate: (value) => {
      const notValid = !(value === 'public' || value === 'private')

      if (notValid) {
        throw Error("The status should be of type 'public' or 'private")
      }
    }
  },
  comments: [{
    userId: {
      type: String,
      required: [true, 'Every comment should have a userId'],
      default: null,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Every comment should have a content'],
      default: null,
      trim: true,
    }
  }],
  image: Object
}, {
  timestamps: true,
})

const Recipe = model('recipes', recipeSchema)

module.exports = Recipe
