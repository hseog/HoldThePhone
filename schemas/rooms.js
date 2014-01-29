var mongoose = require('mongoose');

module.exports = mongoose.model('Rooms', {
    room: String,
    total: Number,
    count: Number
});