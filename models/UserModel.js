const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('users', UserSchema);