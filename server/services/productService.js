// server/services/productService.js
const Product = require('../models/productModel.js');

const getAllProducts = async () => {
  try {
    console.log('Fetching all products...');
    const products = await Product.find();
    console.log('Fetched products:', products);
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

const getProductsByCategory = async (category) => {
  try {
    console.log(`Fetching products in category: ${category}`);
    const products = await Product.find({ category });
    console.log(`Fetched products in category ${category}:`, products);
    return products;
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};

module.exports = { getAllProducts, getProductsByCategory };
