// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    role: String,
    visibility: String
});

module.exports = mongoose.model('User', userSchema);
