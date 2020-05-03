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
  ingredients: [{
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
  preparationSteps: {
    type: String,
    required: [true, 'Every recipe should have a title'],
    default: null,
    trim: true
  },
  // image: {
  //   type: Object,
  //   required: true
  // }
}, {
  timestamps: true,
})

const Recipe = model('recipes', recipeSchema)

module.exports = Recipe
