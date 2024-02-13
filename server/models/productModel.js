const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  image: String,
  category_id: String, // Reference to the _id of the Category
  price: {
    type: Number,
    min: 0, // Ensure price is non-negative
  },
  rating: Number,
  description: String,
  // You can add more fields as needed
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
