// storeRoutes.js

const express = require('express');
const router = express.Router();
const cors = require('cors');
const StoreModel = require('../models/storeModel');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173' // Update with your front-end origin
    })
);

// Get all stores
router.get('/api/store_list', async (req, res) => {
    try {
        const stores = await StoreModel.find();
        res.json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
