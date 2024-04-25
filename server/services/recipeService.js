const Recipe = require('../models/recipeModel.js');

const getAllRecipes = async () => {
  try {
    console.log('Fetching all recipes...');
    const recipes = await Recipe.find();
    console.log('Fetched recipes:', recipes);
    return recipes;
  } catch (error) {
    console.error('Error getting recipes:', error);
    throw error;
  }
};

const getRecipesByCategory = async (category) => {
  try {
    console.log(`Fetching recipes in category: ${category}`);
    const recipes = await Recipe.find({ ethnicCategory: category });
    console.log(`Fetched recipes in category ${category}:`, recipes);
    return recipes;
  } catch (error) {
    console.error('Error getting recipes by category:', error);
    throw error;
  }
};

module.exports = { getAllRecipes, getRecipesByCategory };
