const {Schema, model} = require('mongoose');

const User = new Schema({
    name: String,
    famuly: String,
    email: String,
    tell: Number,
    password: String
});

module.exports = model('User', User);