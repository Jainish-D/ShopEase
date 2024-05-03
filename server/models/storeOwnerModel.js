const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeOwnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isStoreOwner: {
        type: Boolean,
        default: true
    }
});

const StoreOwnerModel = mongoose.model('StoreOwner', storeOwnerSchema);

module.exports = StoreOwnerModel;
