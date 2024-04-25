const express = require('express');
const router = express.Router();
const cors = require('cors'); // Add this line to import cors
const RecipeModel = require('../models/recipeModel');

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173' // Update with your front-end origin
    })
);

// Test route for checking if recipes are accessible
router.get('/test', (req, res) => {
    res.send('Recipe Route is working!');
});

// Get all recipes
router.get('/api/recipe_list', async (req, res) => {
    try {
        const recipes = await RecipeModel.find(); // Fetch recipes from MongoDB
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new recipe
router.post('/api/recipes/create', async (req, res) => {
    const { name, productNames, instructions } = req.body; // Change ingredients to productNames
    try {
        const newRecipe = await RecipeModel.create({ name, productNames, instructions }); // Change ingredients to productNames
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get recipe by ID
router.get('/api/recipes/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    try {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
