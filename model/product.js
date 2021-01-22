const { Schema, model } = require('mongoose');

const Product = new Schema({
    name: String,
    price: Number,
    description: String
});

module.exports = model('Product', Product);