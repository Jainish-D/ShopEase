const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, registerStoreOwner, loginUser, logoutUser, getStoreOwnerProfile, createStore, addProductToStore } = require('../controllers/authController');

// Import the product route
const productRoutes = require('./productRoutes');

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/store-owner-profile', getStoreOwnerProfile);
router.post('/register-store-owner', registerStoreOwner);
router.post('/create-store', createStore);
router.post('/add-product-to-store', addProductToStore); 

// Use the product route
router.use('/product', productRoutes); 

module.exports = router;
