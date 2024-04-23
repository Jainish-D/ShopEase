// storeService.js

const Store = require('../models/storeModel.js');

const getAllStores = async () => {
  try {
    console.log('Fetching all stores...');
    const stores = await Store.find();
    console.log('Fetched stores:', stores);
    return stores;
  } catch (error) {
    console.error('Error getting stores:', error);
    throw error;
  }
};

module.exports = { getAllStores };
