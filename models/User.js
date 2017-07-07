const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    admin: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('users', UserSchema);