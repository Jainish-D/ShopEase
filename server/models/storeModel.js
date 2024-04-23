// storeModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
  name: String,
  ethnicCategory: String,
  contact: String,
  location: String
});

const StoreModel = mongoose.model('Store', storeSchema);

module.exports = StoreModel;
