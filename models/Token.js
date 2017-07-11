const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let TokenSchema = new Schema({
    userId: {type: String, required: true},
    accessToken: {type: String, required: true}
});

module.exports = mongoose.model('tokens', TokenSchema);
