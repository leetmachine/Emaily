const mongoose = require('mongoose');
const { Schema } = mongoose; //es6 syntax equivalent to const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);