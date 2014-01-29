var mongoose = require('mongoose');

module.exports = mongoose.model('Rooms', {
    roomname: String,
    password: String,
    author: String
});