// productModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: {
    type: Number,
    min: 0, // Ensure price is non-negative
  },
  storeName: String, // Reference to the store's name
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
