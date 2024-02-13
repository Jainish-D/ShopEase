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
router.get('/api/products', async (req, res) => {
    try {
        const products = await ProductModel.find(); // Fetch products from MongoDB
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Other product-related routes can be added here

module.exports = router;
