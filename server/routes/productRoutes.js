const express = require('express');
const router = express.Router();
const cors = require('cors');
const ProductModel = require('../models/productModel'); // Adjust the path as needed

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173' // Update with your front-end origin
    })
);

// Test route for checking if products are accessible
router.get('/test', (req, res) => {
    res.send('Product Route is working!');
});

// Get all products
router.get('/api/product_list', async (req, res) => {
    try {
        const products = await ProductModel.find(); // Fetch products from MongoDB
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get prices for given product names
router.post('/api/prices', async (req, res) => {
    try {
        const productNames = req.body.productNames; // Extract product names from request body
        const prices = await ProductModel.find({ name: { $in: productNames } }).select('name price'); // Fetch prices from MongoDB based on product names
        res.json(prices);
    } catch (error) {
        console.error('Error fetching prices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add product to store endpoint
router.post('/api/add-product', async (req, res) => { // Use '/add-product' endpoint
    try {
        const { name, price, storeName } = req.body;

        // Check if all required fields are provided
        if (!name || !price || !storeName) {
            return res.status(400).json({ error: 'Name, price, and storeName are required' });
        }

        // Check if the authenticated user is a store owner
        const storeOwner = await StoreOwner.findOne({ storeName });
        if (!storeOwner) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Create a new product in the database and associate it with the store
        const product = await ProductModel.create({
            name,
            price,
            storeName
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product to store:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


module.exports = router;
