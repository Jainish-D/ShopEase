// recipeModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ethnicCategory: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  productNames: {
    type: [String],
    required: true,
  },
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = RecipeModel;
